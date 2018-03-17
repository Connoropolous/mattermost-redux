'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPing = getPing;
exports.resetPing = resetPing;
exports.getClientConfig = getClientConfig;
exports.getDataRetentionPolicy = getDataRetentionPolicy;
exports.getLicenseConfig = getLicenseConfig;
exports.logClientError = logClientError;
exports.setAppState = setAppState;
exports.setDeviceToken = setDeviceToken;
exports.setServerVersion = setServerVersion;
exports.setStoreFromLocalData = setStoreFromLocalData;
exports.getSupportedTimezones = getSupportedTimezones;
exports.setUrl = setUrl;

var _client = require('../client');

var _helpers = require('./helpers.js');

var _action_types = require('../action_types');

var _users = require('./users');

var _errors = require('./errors');

var _reduxBatchedActions = require('redux-batched-actions');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

function getPing() {
    var _this = this;

    var useV3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    return function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState) {
            var data, pingError;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            dispatch({ type: _action_types.GeneralTypes.PING_REQUEST }, getState);

                            data = void 0;
                            pingError = new _helpers.FormattedError('mobile.server_ping_failed', 'Cannot connect to the server. Please check your server URL and internet connection.');
                            _context.prev = 3;

                            if (!useV3) {
                                _context.next = 10;
                                break;
                            }

                            _context.next = 7;
                            return _client.Client.getPing();

                        case 7:
                            data = _context.sent;
                            _context.next = 13;
                            break;

                        case 10:
                            _context.next = 12;
                            return _client.Client4.ping();

                        case 12:
                            data = _context.sent;

                        case 13:
                            if (!(useV3 && !data.version || !useV3 && data.status !== 'OK')) {
                                _context.next = 16;
                                break;
                            }

                            // successful ping but not the right return {data}
                            dispatch({ type: _action_types.GeneralTypes.PING_FAILURE, error: pingError }, getState);
                            return _context.abrupt('return', { error: pingError });

                        case 16:
                            _context.next = 25;
                            break;

                        case 18:
                            _context.prev = 18;
                            _context.t0 = _context['catch'](3);

                            if (!(!useV3 && _context.t0.status_code === 404)) {
                                _context.next = 23;
                                break;
                            }

                            if (!_client.Client.getUrl()) {
                                _client.Client.setUrl(_client.Client4.getUrl());
                            }
                            return _context.abrupt('return', getPing(true)(dispatch, getState));

                        case 23:
                            dispatch({ type: _action_types.GeneralTypes.PING_FAILURE, error: pingError }, getState);
                            return _context.abrupt('return', { error: pingError });

                        case 25:

                            dispatch({ type: _action_types.GeneralTypes.PING_SUCCESS, data: data }, getState);
                            return _context.abrupt('return', { data: data });

                        case 27:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[3, 18]]);
        }));

        return function (_x2, _x3) {
            return _ref.apply(this, arguments);
        };
    }();
}

function resetPing() {
    var _this2 = this;

    return function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            dispatch({ type: _action_types.GeneralTypes.PING_RESET }, getState);

                            return _context2.abrupt('return', { data: true });

                        case 2:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }));

        return function (_x4, _x5) {
            return _ref2.apply(this, arguments);
        };
    }();
}

function getClientConfig() {
    var _this3 = this;

    return function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dispatch, getState) {
            var data;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            dispatch({ type: _action_types.GeneralTypes.CLIENT_CONFIG_REQUEST }, getState);

                            data = void 0;
                            _context3.prev = 2;
                            _context3.next = 5;
                            return _client.Client4.getClientConfigOld();

                        case 5:
                            data = _context3.sent;
                            _context3.next = 13;
                            break;

                        case 8:
                            _context3.prev = 8;
                            _context3.t0 = _context3['catch'](2);

                            (0, _helpers.forceLogoutIfNecessary)(_context3.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.GeneralTypes.CLIENT_CONFIG_FAILURE,
                                error: _context3.t0
                            }, (0, _errors.logError)(_context3.t0)(dispatch)]), getState);
                            return _context3.abrupt('return', { error: _context3.t0 });

                        case 13:

                            _client.Client4.setEnableLogging(data.EnableDeveloper === 'true');
                            _client.Client4.setDiagnosticId(data.DiagnosticId);

                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.GeneralTypes.CLIENT_CONFIG_RECEIVED, data: data }, { type: _action_types.GeneralTypes.CLIENT_CONFIG_SUCCESS }]));

                            return _context3.abrupt('return', { data: data });

                        case 17:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this3, [[2, 8]]);
        }));

        return function (_x6, _x7) {
            return _ref3.apply(this, arguments);
        };
    }();
}

function getDataRetentionPolicy() {
    var _this4 = this;

    return function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(dispatch, getState) {
            var data;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            dispatch({ type: _action_types.GeneralTypes.DATA_RETENTION_POLICY_REQUEST }, getState);

                            data = void 0;
                            _context4.prev = 2;
                            _context4.next = 5;
                            return _client.Client4.getDataRetentionPolicy();

                        case 5:
                            data = _context4.sent;
                            _context4.next = 13;
                            break;

                        case 8:
                            _context4.prev = 8;
                            _context4.t0 = _context4['catch'](2);

                            (0, _helpers.forceLogoutIfNecessary)(_context4.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.GeneralTypes.DATA_RETENTION_POLICY_FAILURE,
                                error: _context4.t0
                            }, (0, _errors.logError)(_context4.t0)(dispatch)]), getState);
                            return _context4.abrupt('return', { error: _context4.t0 });

                        case 13:

                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.GeneralTypes.RECEIVED_DATA_RETENTION_POLICY, data: data }, { type: _action_types.GeneralTypes.DATA_RETENTION_POLICY_SUCCESS }]));

                            return _context4.abrupt('return', { data: data });

                        case 15:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this4, [[2, 8]]);
        }));

        return function (_x8, _x9) {
            return _ref4.apply(this, arguments);
        };
    }();
}

function getLicenseConfig() {
    return (0, _helpers.bindClientFunc)(_client.Client4.getClientLicenseOld, _action_types.GeneralTypes.CLIENT_LICENSE_REQUEST, [_action_types.GeneralTypes.CLIENT_LICENSE_RECEIVED, _action_types.GeneralTypes.CLIENT_LICENSE_SUCCESS], _action_types.GeneralTypes.CLIENT_LICENSE_FAILURE);
}

function logClientError(message) {
    var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ERROR';

    return (0, _helpers.bindClientFunc)(_client.Client4.logClientError, _action_types.GeneralTypes.LOG_CLIENT_ERROR_REQUEST, _action_types.GeneralTypes.LOG_CLIENT_ERROR_SUCCESS, _action_types.GeneralTypes.LOG_CLIENT_ERROR_FAILURE, message, level);
}

function setAppState(state) {
    var _this5 = this;

    return function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            dispatch({ type: _action_types.GeneralTypes.RECEIVED_APP_STATE, data: state }, getState);

                            return _context5.abrupt('return', { data: true });

                        case 2:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, _this5);
        }));

        return function (_x11, _x12) {
            return _ref5.apply(this, arguments);
        };
    }();
}

function setDeviceToken(token) {
    var _this6 = this;

    return function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            dispatch({ type: _action_types.GeneralTypes.RECEIVED_APP_DEVICE_TOKEN, data: token }, getState);

                            return _context6.abrupt('return', { data: true });

                        case 2:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, _this6);
        }));

        return function (_x13, _x14) {
            return _ref6.apply(this, arguments);
        };
    }();
}

function setServerVersion(serverVersion) {
    var _this7 = this;

    return function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            dispatch({ type: _action_types.GeneralTypes.RECEIVED_SERVER_VERSION, data: serverVersion }, getState);

                            return _context7.abrupt('return', { data: true });

                        case 2:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, _this7);
        }));

        return function (_x15, _x16) {
            return _ref7.apply(this, arguments);
        };
    }();
}

function setStoreFromLocalData(data) {
    var _this8 = this;

    return function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            _client.Client.setToken(data.token);
                            _client.Client.setUrl(data.url);
                            _client.Client4.setToken(data.token);
                            _client.Client4.setUrl(data.url);

                            return _context8.abrupt('return', (0, _users.loadMe)()(dispatch, getState));

                        case 5:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, _callee8, _this8);
        }));

        return function (_x17, _x18) {
            return _ref8.apply(this, arguments);
        };
    }();
}

function getSupportedTimezones() {
    return (0, _helpers.bindClientFunc)(_client.Client4.getTimezones, _action_types.GeneralTypes.SUPPORTED_TIMEZONES_REQUEST, [_action_types.GeneralTypes.SUPPORTED_TIMEZONES_RECEIVED, _action_types.GeneralTypes.SUPPORTED_TIMEZONES_SUCCESS], _action_types.GeneralTypes.SUPPORTED_TIMEZONES_FAILURE);
}

function setUrl(url) {
    _client.Client.setUrl(url);
    _client.Client4.setUrl(url);
    return true;
}

exports.default = {
    getPing: getPing,
    getClientConfig: getClientConfig,
    getDataRetentionPolicy: getDataRetentionPolicy,
    getSupportedTimezones: getSupportedTimezones,
    getLicenseConfig: getLicenseConfig,
    logClientError: logClientError,
    setAppState: setAppState,
    setDeviceToken: setDeviceToken,
    setServerVersion: setServerVersion,
    setStoreFromLocalData: setStoreFromLocalData,
    setUrl: setUrl
};