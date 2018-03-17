'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _redux = require('redux');

var _action_types = require('../../action_types');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

function results() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];

    switch (action.type) {
        case _action_types.SearchTypes.RECEIVED_SEARCH_POSTS:
            {
                return action.data.order;
            }
        case _action_types.PostTypes.REMOVE_POST:
            {
                var postId = action.data ? action.data.id : null;
                var index = state.indexOf(postId);
                if (index !== -1) {
                    var newState = [].concat(_toConsumableArray(state));
                    newState.splice(index, 1);
                    return newState;
                }
                return state;
            }
        case _action_types.SearchTypes.REMOVE_SEARCH_POSTS:
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return [];

        default:
            return state;
    }
}

function recent() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];
    var data = action.data,
        type = action.type;


    switch (type) {
        case _action_types.SearchTypes.RECEIVED_SEARCH_TERM:
            {
                var nextState = _extends({}, state);
                var teamId = data.teamId,
                    terms = data.terms,
                    isOrSearch = data.isOrSearch;

                var team = [].concat(_toConsumableArray(nextState[teamId] || []));
                var index = team.findIndex(function (r) {
                    return r.terms === terms;
                });
                if (index === -1) {
                    team.push({ terms: terms, isOrSearch: isOrSearch });
                } else {
                    team[index] = { terms: terms, isOrSearch: isOrSearch };
                }
                return _extends({}, nextState, _defineProperty({}, teamId, team));
            }
        case _action_types.SearchTypes.REMOVE_SEARCH_TERM:
            {
                var _nextState = _extends({}, state);
                var _teamId = data.teamId,
                    _terms = data.terms;

                var _team = [].concat(_toConsumableArray(_nextState[_teamId] || []));
                var _index = _team.findIndex(function (r) {
                    return r.terms === _terms;
                });

                if (_index !== -1) {
                    _team.splice(_index, 1);

                    return _extends({}, _nextState, _defineProperty({}, _teamId, _team));
                }

                return _nextState;
            }
        case _action_types.UserTypes.LOGOUT_SUCCESS:
            return {};

        default:
            return state;
    }
}

exports.default = (0, _redux.combineReducers)({

    // An ordered array with posts ids from the search results
    results: results,

    // Object where every key is a team composed with
    // an object where the key is the term and the value indicates is "or" search
    recent: recent
});