'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _action_types = require('../../action_types');

var _helpers = require('./helpers');

function searchPosts() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.initialRequestState)();
    var action = arguments[1];

    if (action.type === _action_types.SearchTypes.REMOVE_SEARCH_POSTS) {
        return (0, _helpers.initialRequestState)();
    }

    return (0, _helpers.handleRequest)(_action_types.SearchTypes.SEARCH_POSTS_REQUEST, _action_types.SearchTypes.SEARCH_POSTS_SUCCESS, _action_types.SearchTypes.SEARCH_POSTS_FAILURE, state, action);
} // Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

exports.default = (0, _redux.combineReducers)({
    searchPosts: searchPosts
});