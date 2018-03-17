'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.searchPosts = searchPosts;
exports.clearSearch = clearSearch;
exports.removeSearchTerms = removeSearchTerms;

var _reduxBatchedActions = require('redux-batched-actions');

var _client = require('../client');

var _action_types = require('../action_types');

var _channels = require('./channels');

var _helpers = require('./helpers');

var _errors = require('./errors');

var _posts = require('./posts');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // Copyright (c) 2017-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

function getMissingChannelsFromPosts(posts) {
    var _this = this;

    return function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState) {
            var _getState$entities$ch, channels, membersInChannel, myMembers, promises;

            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _getState$entities$ch = getState().entities.channels, channels = _getState$entities$ch.channels, membersInChannel = _getState$entities$ch.membersInChannel, myMembers = _getState$entities$ch.myMembers;
                            promises = [];


                            Object.values(posts).forEach(function (post) {
                                var id = post.channel_id;
                                if (!channels[id] || !myMembers[id]) {
                                    promises.push((0, _channels.getChannelAndMyMember)(id)(dispatch, getState));
                                }

                                if (!membersInChannel[id]) {
                                    promises.push((0, _channels.getChannelMembers)(id)(dispatch, getState));
                                }
                            });

                            return _context.abrupt('return', Promise.all(promises));

                        case 4:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();
}

function searchPosts(teamId, terms) {
    var _this2 = this;

    var isOrSearch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    return function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch, getState) {
            var posts;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            dispatch({ type: _action_types.SearchTypes.SEARCH_POSTS_REQUEST }, getState);

                            posts = void 0;
                            _context2.prev = 2;
                            _context2.next = 5;
                            return _client.Client4.searchPosts(teamId, terms, isOrSearch);

                        case 5:
                            posts = _context2.sent;
                            _context2.next = 8;
                            return Promise.all([(0, _posts.getProfilesAndStatusesForPosts)(posts.posts, dispatch, getState), getMissingChannelsFromPosts(posts.posts)(dispatch, getState)]);

                        case 8:
                            _context2.next = 15;
                            break;

                        case 10:
                            _context2.prev = 10;
                            _context2.t0 = _context2['catch'](2);

                            (0, _helpers.forceLogoutIfNecessary)(_context2.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.SearchTypes.SEARCH_POSTS_FAILURE, error: _context2.t0 }, (0, _errors.logError)(_context2.t0)(dispatch)]), getState);
                            return _context2.abrupt('return', { error: _context2.t0 });

                        case 15:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.SearchTypes.RECEIVED_SEARCH_POSTS,
                                data: posts
                            }, {
                                type: _action_types.SearchTypes.RECEIVED_SEARCH_TERM,
                                data: {
                                    teamId: teamId,
                                    terms: terms,
                                    isOrSearch: isOrSearch
                                }
                            }, {
                                type: _action_types.SearchTypes.SEARCH_POSTS_SUCCESS
                            }], 'SEARCH_POST_BATCH'), getState);

                            return _context2.abrupt('return', { data: posts });

                        case 17:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2, [[2, 10]]);
        }));

        return function (_x4, _x5) {
            return _ref2.apply(this, arguments);
        };
    }();
}

function clearSearch() {
    var _this3 = this;

    return function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            dispatch({ type: _action_types.SearchTypes.REMOVE_SEARCH_POSTS }, getState);

                            return _context3.abrupt('return', { data: true });

                        case 2:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this3);
        }));

        return function (_x6, _x7) {
            return _ref3.apply(this, arguments);
        };
    }();
}

function removeSearchTerms(teamId, terms) {
    var _this4 = this;

    return function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            dispatch({
                                type: _action_types.SearchTypes.REMOVE_SEARCH_TERM,
                                data: {
                                    teamId: teamId,
                                    terms: terms
                                }
                            }, getState);

                            return _context4.abrupt('return', { data: true });

                        case 2:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this4);
        }));

        return function (_x8, _x9) {
            return _ref4.apply(this, arguments);
        };
    }();
}

exports.default = {
    clearSearch: clearSearch,
    removeSearchTerms: removeSearchTerms,
    searchPosts: searchPosts
};