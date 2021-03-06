'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.systemEmojis = undefined;
exports.setSystemEmojis = setSystemEmojis;
exports.createCustomEmoji = createCustomEmoji;
exports.getCustomEmoji = getCustomEmoji;
exports.getCustomEmojiByName = getCustomEmojiByName;
exports.getCustomEmojisByName = getCustomEmojisByName;
exports.getCustomEmojisInText = getCustomEmojisInText;
exports.getCustomEmojis = getCustomEmojis;
exports.getAllCustomEmojis = getAllCustomEmojis;
exports.deleteCustomEmoji = deleteCustomEmoji;
exports.searchCustomEmojis = searchCustomEmojis;
exports.autocompleteCustomEmojis = autocompleteCustomEmojis;

var _action_types = require('../action_types');

var _constants = require('../constants');

var _reduxBatchedActions = require('redux-batched-actions');

var _client = require('../client');

var _users = require('./users');

var _emojis = require('../selectors/entities/emojis');

var _emoji_utils = require('../utils/emoji_utils');

var _helpers = require('../utils/helpers');

var _errors = require('./errors');

var _helpers2 = require('./helpers');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // Copyright (c) 2017-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

var systemEmojis = exports.systemEmojis = new Map();

function setSystemEmojis(emojis) {
    exports.systemEmojis = systemEmojis = emojis;
}

function createCustomEmoji(emoji, image) {
    return (0, _helpers2.bindClientFunc)(_client.Client4.createCustomEmoji, _action_types.EmojiTypes.CREATE_CUSTOM_EMOJI_REQUEST, [_action_types.EmojiTypes.RECEIVED_CUSTOM_EMOJI, _action_types.EmojiTypes.CREATE_CUSTOM_EMOJI_SUCCESS], _action_types.EmojiTypes.CREATE_CUSTOM_EMOJI_FAILURE, emoji, image);
}

function getCustomEmoji(emojiId) {
    return (0, _helpers2.bindClientFunc)(_client.Client4.getCustomEmoji, _action_types.EmojiTypes.GET_CUSTOM_EMOJI_REQUEST, [_action_types.EmojiTypes.RECEIVED_CUSTOM_EMOJI, _action_types.EmojiTypes.GET_CUSTOM_EMOJI_SUCCESS], _action_types.EmojiTypes.GET_CUSTOM_EMOJI_FAILURE, emojiId);
}

function getCustomEmojiByName(name) {
    var _this = this;

    return function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState) {
            var serverVersion, data, actions;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            serverVersion = _client.Client4.getServerVersion();

                            if ((0, _helpers.isMinimumServerVersion)(serverVersion, 4, 7)) {
                                _context.next = 3;
                                break;
                            }

                            return _context.abrupt('return', { data: {} });

                        case 3:

                            dispatch({ type: _action_types.EmojiTypes.GET_CUSTOM_EMOJI_REQUEST }, getState);

                            data = void 0;
                            _context.prev = 5;
                            _context.next = 8;
                            return _client.Client4.getCustomEmojiByName(name);

                        case 8:
                            data = _context.sent;
                            _context.next = 18;
                            break;

                        case 11:
                            _context.prev = 11;
                            _context.t0 = _context['catch'](5);

                            (0, _helpers2.forceLogoutIfNecessary)(_context.t0, dispatch, getState);

                            actions = [{ type: _action_types.EmojiTypes.GET_CUSTOM_EMOJI_FAILURE, error: _context.t0 }, (0, _errors.logError)(_context.t0)(dispatch)];


                            if (_context.t0.status_code === 404) {
                                actions.push({ type: _action_types.EmojiTypes.CUSTOM_EMOJI_DOES_NOT_EXIST, data: name });
                            }

                            dispatch((0, _reduxBatchedActions.batchActions)(actions), getState);
                            return _context.abrupt('return', { error: _context.t0 });

                        case 18:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.EmojiTypes.RECEIVED_CUSTOM_EMOJI,
                                data: data
                            }, {
                                type: _action_types.EmojiTypes.GET_CUSTOM_EMOJI_SUCCESS
                            }]));

                            return _context.abrupt('return', { data: data });

                        case 20:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[5, 11]]);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();
}

function getCustomEmojisByName(names) {
    var _this2 = this;

    return function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch, getState) {
            var promises;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            if (!(!names || names.length === 0)) {
                                _context2.next = 2;
                                break;
                            }

                            return _context2.abrupt('return', { data: true });

                        case 2:
                            promises = [];

                            names.forEach(function (name) {
                                return promises.push(getCustomEmojiByName(name)(dispatch, getState));
                            });

                            return _context2.abrupt('return', Promise.all(promises));

                        case 5:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }));

        return function (_x3, _x4) {
            return _ref2.apply(this, arguments);
        };
    }();
}

function getCustomEmojisInText(text) {
    var _this3 = this;

    return function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dispatch, getState) {
            var state, nonExistentEmoji, customEmojisByName, emojisToLoad;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            if (text) {
                                _context3.next = 2;
                                break;
                            }

                            return _context3.abrupt('return', { data: true });

                        case 2:
                            state = getState();
                            nonExistentEmoji = state.entities.emojis.nonExistentEmoji;
                            customEmojisByName = (0, _emojis.getCustomEmojisByName)(state);
                            emojisToLoad = (0, _emoji_utils.parseNeededCustomEmojisFromText)(text, systemEmojis, customEmojisByName, nonExistentEmoji);
                            _context3.next = 8;
                            return getCustomEmojisByName(Array.from(emojisToLoad))(dispatch, getState);

                        case 8:
                            return _context3.abrupt('return', _context3.sent);

                        case 9:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this3);
        }));

        return function (_x5, _x6) {
            return _ref3.apply(this, arguments);
        };
    }();
}

function getCustomEmojis() {
    var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var perPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.General.PAGE_SIZE_DEFAULT;

    var _this4 = this;

    var sort = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _constants.Emoji.SORT_BY_NAME;
    var loadUsers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    return function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(dispatch, getState) {
            var data, usersToLoad, userIds;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            dispatch({ type: _action_types.EmojiTypes.GET_CUSTOM_EMOJIS_REQUEST }, getState);

                            data = void 0;
                            _context4.prev = 2;
                            _context4.next = 5;
                            return _client.Client4.getCustomEmojis(page, perPage, sort);

                        case 5:
                            data = _context4.sent;
                            _context4.next = 13;
                            break;

                        case 8:
                            _context4.prev = 8;
                            _context4.t0 = _context4['catch'](2);

                            (0, _helpers2.forceLogoutIfNecessary)(_context4.t0, dispatch, getState);

                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.EmojiTypes.GET_CUSTOM_EMOJIS_FAILURE, error: _context4.t0 }, (0, _errors.logError)(_context4.t0)(dispatch)]), getState);
                            return _context4.abrupt('return', { error: _context4.t0 });

                        case 13:

                            if (loadUsers) {
                                usersToLoad = {};

                                Object.values(data).forEach(function (emoji) {
                                    if (!getState().entities.users.profiles[emoji.creator_id]) {
                                        usersToLoad[emoji.creator_id] = true;
                                    }
                                });

                                userIds = Object.keys(usersToLoad);


                                if (userIds.length > 0) {
                                    (0, _users.getProfilesByIds)(userIds)(dispatch, getState);
                                }
                            }

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.EmojiTypes.RECEIVED_CUSTOM_EMOJIS,
                                data: data
                            }, {
                                type: _action_types.EmojiTypes.GET_CUSTOM_EMOJIS_SUCCESS
                            }]));

                            return _context4.abrupt('return', { data: data });

                        case 16:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this4, [[2, 8]]);
        }));

        return function (_x11, _x12) {
            return _ref4.apply(this, arguments);
        };
    }();
}

function getAllCustomEmojis() {
    var _this5 = this;

    var perPage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.General.PAGE_SIZE_MAXIMUM;

    return function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(dispatch, getState) {
            var hasMore, page, allEmojis, serverVersion, emojis;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.EmojiTypes.GET_ALL_CUSTOM_EMOJIS_REQUEST }, { type: _action_types.EmojiTypes.CLEAR_CUSTOM_EMOJIS }]), getState);

                            hasMore = true;
                            page = 0;
                            allEmojis = [];
                            serverVersion = getState().entities.general.serverVersion;

                        case 5:
                            _context5.prev = 5;
                            emojis = [];

                            if (!(serverVersion.charAt(0) === '3')) {
                                _context5.next = 14;
                                break;
                            }

                            _context5.next = 10;
                            return _client.Client.getCustomEmojis();

                        case 10:
                            emojis = _context5.sent;

                            hasMore = false;
                            _context5.next = 19;
                            break;

                        case 14:
                            _context5.next = 16;
                            return _client.Client4.getCustomEmojis(page, perPage, _constants.Emoji.SORT_BY_NAME);

                        case 16:
                            emojis = _context5.sent;

                            if (emojis.length < perPage) {
                                hasMore = false;
                            } else {
                                page += 1;
                            }
                            allEmojis.push.apply(allEmojis, _toConsumableArray(emojis));

                        case 19:
                            _context5.next = 25;
                            break;

                        case 21:
                            _context5.prev = 21;
                            _context5.t0 = _context5['catch'](5);

                            (0, _helpers2.forceLogoutIfNecessary)(_context5.t0, dispatch, getState);

                            return _context5.abrupt('return', dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.EmojiTypes.GET_ALL_CUSTOM_EMOJIS_FAILURE, error: _context5.t0 }, (0, _errors.logError)(_context5.t0)(dispatch)]), getState));

                        case 25:
                            if (hasMore) {
                                _context5.next = 5;
                                break;
                            }

                        case 26:

                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.EmojiTypes.GET_ALL_CUSTOM_EMOJIS_SUCCESS }, {
                                type: _action_types.EmojiTypes.RECEIVED_CUSTOM_EMOJIS,
                                data: allEmojis
                            }]), getState);

                            return _context5.abrupt('return', { data: true });

                        case 28:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, _this5, [[5, 21]]);
        }));

        return function (_x14, _x15) {
            return _ref5.apply(this, arguments);
        };
    }();
}

function deleteCustomEmoji(emojiId) {
    var _this6 = this;

    return function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            dispatch({ type: _action_types.EmojiTypes.DELETE_CUSTOM_EMOJI_REQUEST }, getState);

                            _context6.prev = 1;
                            _context6.next = 4;
                            return _client.Client4.deleteCustomEmoji(emojiId);

                        case 4:
                            _context6.next = 11;
                            break;

                        case 6:
                            _context6.prev = 6;
                            _context6.t0 = _context6['catch'](1);

                            (0, _helpers2.forceLogoutIfNecessary)(_context6.t0, dispatch, getState);

                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.EmojiTypes.DELETE_CUSTOM_EMOJI_FAILURE, error: _context6.t0 }, (0, _errors.logError)(_context6.t0)(dispatch)]), getState);
                            return _context6.abrupt('return', { error: _context6.t0 });

                        case 11:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.EmojiTypes.DELETED_CUSTOM_EMOJI,
                                data: { id: emojiId }
                            }, {
                                type: _action_types.EmojiTypes.DELETE_CUSTOM_EMOJI_SUCCESS
                            }]), getState);

                            return _context6.abrupt('return', { data: true });

                        case 13:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, _this6, [[1, 6]]);
        }));

        return function (_x16, _x17) {
            return _ref6.apply(this, arguments);
        };
    }();
}

function searchCustomEmojis(term) {
    var _this7 = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(dispatch, getState) {
            var serverVersion, data;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            serverVersion = _client.Client4.getServerVersion();

                            if ((0, _helpers.isMinimumServerVersion)(serverVersion, 4, 7)) {
                                _context7.next = 3;
                                break;
                            }

                            return _context7.abrupt('return', { data: [] });

                        case 3:

                            dispatch({ type: _action_types.EmojiTypes.GET_CUSTOM_EMOJIS_REQUEST }, getState);

                            data = void 0;
                            _context7.prev = 5;
                            _context7.next = 8;
                            return _client.Client4.searchCustomEmoji(term, options);

                        case 8:
                            data = _context7.sent;
                            _context7.next = 16;
                            break;

                        case 11:
                            _context7.prev = 11;
                            _context7.t0 = _context7['catch'](5);

                            (0, _helpers2.forceLogoutIfNecessary)(_context7.t0, dispatch, getState);

                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.EmojiTypes.GET_CUSTOM_EMOJIS_FAILURE, error: _context7.t0 }, (0, _errors.logError)(_context7.t0)(dispatch)]), getState);
                            return _context7.abrupt('return', { error: _context7.t0 });

                        case 16:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.EmojiTypes.RECEIVED_CUSTOM_EMOJIS,
                                data: data
                            }, {
                                type: _action_types.EmojiTypes.GET_CUSTOM_EMOJIS_SUCCESS
                            }]), getState);

                            return _context7.abrupt('return', { data: data });

                        case 18:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, _this7, [[5, 11]]);
        }));

        return function (_x19, _x20) {
            return _ref7.apply(this, arguments);
        };
    }();
}

function autocompleteCustomEmojis(name) {
    var _this8 = this;

    return function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(dispatch, getState) {
            var serverVersion, data;
            return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            serverVersion = _client.Client4.getServerVersion();

                            if ((0, _helpers.isMinimumServerVersion)(serverVersion, 4, 7)) {
                                _context8.next = 3;
                                break;
                            }

                            return _context8.abrupt('return', { data: [] });

                        case 3:

                            dispatch({ type: _action_types.EmojiTypes.GET_CUSTOM_EMOJIS_REQUEST }, getState);

                            data = void 0;
                            _context8.prev = 5;
                            _context8.next = 8;
                            return _client.Client4.autocompleteCustomEmoji(name);

                        case 8:
                            data = _context8.sent;
                            _context8.next = 16;
                            break;

                        case 11:
                            _context8.prev = 11;
                            _context8.t0 = _context8['catch'](5);

                            (0, _helpers2.forceLogoutIfNecessary)(_context8.t0, dispatch, getState);

                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.EmojiTypes.GET_CUSTOM_EMOJIS_FAILURE, error: _context8.t0 }, (0, _errors.logError)(_context8.t0)(dispatch)]), getState);
                            return _context8.abrupt('return', { error: _context8.t0 });

                        case 16:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.EmojiTypes.RECEIVED_CUSTOM_EMOJIS,
                                data: data
                            }, {
                                type: _action_types.EmojiTypes.GET_CUSTOM_EMOJIS_SUCCESS
                            }]), getState);

                            return _context8.abrupt('return', { data: data });

                        case 18:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, _callee8, _this8, [[5, 11]]);
        }));

        return function (_x21, _x22) {
            return _ref8.apply(this, arguments);
        };
    }();
}