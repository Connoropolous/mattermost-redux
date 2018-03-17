'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = configureServiceStore;

var _redux = require('redux');

var _reduxBatchedActions = require('redux-batched-actions');

var _remoteReduxDevtools = require('remote-redux-devtools');

var _remoteReduxDevtools2 = _interopRequireDefault(_remoteReduxDevtools);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _constants = require('redux-persist/constants');

var _reduxOffline = require('redux-offline');

var _defaults = require('redux-offline/lib/defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _reduxActionBuffer = require('redux-action-buffer');

var _reduxActionBuffer2 = _interopRequireDefault(_reduxActionBuffer);

var _constants2 = require('../constants');

var _reducers = require('../reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _deep_freeze = require('../utils/deep_freeze');

var _deep_freeze2 = _interopRequireDefault(_deep_freeze);

var _initial_state = require('./initial_state');

var _initial_state2 = _interopRequireDefault(_initial_state);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.
/* eslint-disable no-undefined */

var devToolsEnhancer = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ ? // eslint-disable-line no-underscore-dangle
window.__REDUX_DEVTOOLS_EXTENSION__ : // eslint-disable-line no-underscore-dangle
function () {
    return (0, _remoteReduxDevtools2.default)({
        name: 'Mattermost',
        hostname: 'localhost',
        port: 5678,
        realtime: true
    });
};

/***
clientOptions object - This param allows users to configure the store from the client side.
It has two properties currently:
enableBuffer - bool - default = true - If true the store will buffer all actions until offline state rehydration occurs.
additionalMiddleware - func | array - Allows for single or multiple additional middleware functions to be passed in from the client side.
***/
function configureServiceStore(preloadedState, appReducer, userOfflineConfig, getAppReducer) {
    var clientOptions = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

    var baseOfflineConfig = Object.assign({}, _defaults2.default, _helpers.offlineConfig, userOfflineConfig);
    var options = Object.assign({}, _helpers.defaultOptions, clientOptions);
    var baseState = Object.assign({}, _initial_state2.default, preloadedState);

    var additionalMiddleware = options.additionalMiddleware,
        enableBuffer = options.enableBuffer;


    var clientSideMiddleware = additionalMiddleware;

    if (typeof clientSideMiddleware === 'function') {
        clientSideMiddleware = [clientSideMiddleware];
    }

    var middleware = [_reduxThunk2.default].concat(_toConsumableArray(clientSideMiddleware));
    if (enableBuffer) {
        middleware.push((0, _reduxActionBuffer2.default)(_constants.REHYDRATE));
    }

    var store = (0, _redux.createStore)((0, _reduxOffline.createOfflineReducer)(createReducer(baseState, _reducers2.default, appReducer)), baseState,
    // eslint-disable-line - offlineCompose(config)(middleware, other funcs)
    (0, _reduxOffline.offlineCompose)(baseOfflineConfig)(middleware, [devToolsEnhancer()]));

    // launch store persistor
    if (baseOfflineConfig.persist) {
        baseOfflineConfig.persist(store, baseOfflineConfig.persistOptions, baseOfflineConfig.persistCallback);
    }

    if (baseOfflineConfig.detectNetwork) {
        baseOfflineConfig.detectNetwork(function (online) {
            store.dispatch((0, _reduxOffline.networkStatusChangedAction)(online));
        });
    }

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept(function () {
            var nextServiceReducer = require('../reducers').default; // eslint-disable-line global-require
            var nextAppReducer = void 0;
            if (getAppReducer) {
                nextAppReducer = getAppReducer(); // eslint-disable-line global-require
            }
            store.replaceReducer(createReducer(baseState, nextServiceReducer, nextAppReducer));
        });
    }

    return store;
}

function createReducer(baseState) {
    for (var _len = arguments.length, reducers = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        reducers[_key - 1] = arguments[_key];
    }

    var baseReducer = (0, _redux.combineReducers)(Object.assign.apply(Object, [{}].concat(reducers)));

    // Root reducer wrapper that listens for reset events.
    // Returns whatever is passed for the data property
    // as the new state.
    function offlineReducer() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var action = arguments[1];

        if (action.type === _constants2.General.OFFLINE_STORE_RESET) {
            return baseReducer(baseState, action);
        }

        return baseReducer(state, action);
    }

    return enableFreezing((0, _reduxBatchedActions.enableBatching)(offlineReducer));
}

function enableFreezing(reducer) {
    return function (state, action) {
        var nextState = reducer(state, action);

        if (nextState !== state) {
            (0, _deep_freeze2.default)(nextState);
        }

        return nextState;
    };
}