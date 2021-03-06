'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.selectChannel = selectChannel;
exports.createChannel = createChannel;
exports.createDirectChannel = createDirectChannel;
exports.createGroupChannel = createGroupChannel;
exports.patchChannel = patchChannel;
exports.updateChannel = updateChannel;
exports.updateChannelNotifyProps = updateChannelNotifyProps;
exports.getChannelByNameAndTeamName = getChannelByNameAndTeamName;
exports.getChannel = getChannel;
exports.getChannelAndMyMember = getChannelAndMyMember;
exports.fetchMyChannelsAndMembers = fetchMyChannelsAndMembers;
exports.getMyChannelMembers = getMyChannelMembers;
exports.getChannelMembers = getChannelMembers;
exports.leaveChannel = leaveChannel;
exports.joinChannel = joinChannel;
exports.deleteChannel = deleteChannel;
exports.viewChannel = viewChannel;
exports.markChannelAsViewed = markChannelAsViewed;
exports.getChannels = getChannels;
exports.autocompleteChannels = autocompleteChannels;
exports.searchChannels = searchChannels;
exports.getChannelStats = getChannelStats;
exports.addChannelMember = addChannelMember;
exports.removeChannelMember = removeChannelMember;
exports.updateChannelMemberRoles = updateChannelMemberRoles;
exports.updateChannelHeader = updateChannelHeader;
exports.updateChannelPurpose = updateChannelPurpose;
exports.markChannelAsRead = markChannelAsRead;
exports.markChannelAsUnread = markChannelAsUnread;
exports.getChannelMembersByIds = getChannelMembersByIds;
exports.getChannelMember = getChannelMember;
exports.getMyChannelMember = getMyChannelMember;
exports.favoriteChannel = favoriteChannel;
exports.unfavoriteChannel = unfavoriteChannel;

var _reduxBatchedActions = require('redux-batched-actions');

var _client = require('../client');

var _constants = require('../constants');

var _action_types = require('../action_types');

var _preferences = require('./preferences');

var _channel_utils = require('../utils/channel_utils');

var _errors = require('./errors');

var _helpers = require('./helpers');

var _users = require('./users');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

function selectChannel(channelId) {
    var _this = this;

    return function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;

                            dispatch({
                                type: _action_types.ChannelTypes.SELECT_CHANNEL,
                                data: channelId
                            }, getState);
                            _context.next = 8;
                            break;

                        case 4:
                            _context.prev = 4;
                            _context.t0 = _context['catch'](0);

                            (0, _errors.logError)(_context.t0)(dispatch);
                            return _context.abrupt('return', { error: _context.t0 });

                        case 8:
                            return _context.abrupt('return', { data: true });

                        case 9:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[0, 4]]);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();
}

function createChannel(channel, userId) {
    var _this2 = this;

    return function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch, getState) {
            var created, member, actions, _getState$entities$ch, channels, myMembers;

            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.ChannelTypes.CREATE_CHANNEL_REQUEST
                            }, {
                                type: _action_types.ChannelTypes.CHANNEL_MEMBERS_REQUEST
                            }]), getState);

                            created = void 0;
                            _context2.prev = 2;
                            _context2.next = 5;
                            return _client.Client4.createChannel(channel);

                        case 5:
                            created = _context2.sent;
                            _context2.next = 13;
                            break;

                        case 8:
                            _context2.prev = 8;
                            _context2.t0 = _context2['catch'](2);

                            (0, _helpers.forceLogoutIfNecessary)(_context2.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.ChannelTypes.CREATE_CHANNEL_FAILURE,
                                error: _context2.t0
                            }, {
                                type: _action_types.ChannelTypes.CHANNEL_MEMBERS_FAILURE,
                                error: _context2.t0
                            }, (0, _errors.logError)(_context2.t0)(dispatch)]), getState);
                            return _context2.abrupt('return', { error: _context2.t0 });

                        case 13:
                            member = {
                                channel_id: created.id,
                                user_id: userId,
                                roles: _constants.General.CHANNEL_USER_ROLE + ' ' + _constants.General.CHANNEL_ADMIN_ROLE,
                                last_viewed_at: 0,
                                msg_count: 0,
                                mention_count: 0,
                                notify_props: { desktop: 'default', mark_unread: 'all' },
                                last_update_at: created.create_at
                            };
                            actions = [];
                            _getState$entities$ch = getState().entities.channels, channels = _getState$entities$ch.channels, myMembers = _getState$entities$ch.myMembers;


                            if (!channels[created.id]) {
                                actions.push({ type: _action_types.ChannelTypes.RECEIVED_CHANNEL, data: created });
                            }

                            if (!myMembers[created.id]) {
                                actions.push({ type: _action_types.ChannelTypes.RECEIVED_MY_CHANNEL_MEMBER, data: member });
                            }

                            dispatch((0, _reduxBatchedActions.batchActions)([].concat(actions, [{
                                type: _action_types.ChannelTypes.CREATE_CHANNEL_SUCCESS
                            }, {
                                type: _action_types.ChannelTypes.CHANNEL_MEMBERS_SUCCESS
                            }])), getState);

                            return _context2.abrupt('return', { data: created });

                        case 20:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2, [[2, 8]]);
        }));

        return function (_x3, _x4) {
            return _ref2.apply(this, arguments);
        };
    }();
}

function createDirectChannel(userId, otherUserId) {
    var _this3 = this;

    return function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dispatch, getState) {
            var created, member, preferences;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            dispatch({ type: _action_types.ChannelTypes.CREATE_CHANNEL_REQUEST }, getState);

                            created = void 0;
                            _context3.prev = 2;
                            _context3.next = 5;
                            return _client.Client4.createDirectChannel([userId, otherUserId]);

                        case 5:
                            created = _context3.sent;
                            _context3.next = 13;
                            break;

                        case 8:
                            _context3.prev = 8;
                            _context3.t0 = _context3['catch'](2);

                            (0, _helpers.forceLogoutIfNecessary)(_context3.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.ChannelTypes.CREATE_CHANNEL_FAILURE, error: _context3.t0 }, (0, _errors.logError)(_context3.t0)(dispatch)]), getState);
                            return _context3.abrupt('return', { error: _context3.t0 });

                        case 13:
                            member = {
                                channel_id: created.id,
                                user_id: userId,
                                roles: '' + _constants.General.CHANNEL_USER_ROLE,
                                last_viewed_at: 0,
                                msg_count: 0,
                                mention_count: 0,
                                notify_props: { desktop: 'default', mark_unread: 'all' },
                                last_update_at: created.create_at
                            };
                            preferences = [{ user_id: userId, category: _constants.Preferences.CATEGORY_DIRECT_CHANNEL_SHOW, name: otherUserId, value: 'true' }, { user_id: userId, category: _constants.Preferences.CATEGORY_CHANNEL_OPEN_TIME, name: created.id, value: new Date().getTime().toString() }];


                            (0, _preferences.savePreferences)(userId, preferences)(dispatch, getState);

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.ChannelTypes.RECEIVED_CHANNEL,
                                data: created
                            }, {
                                type: _action_types.ChannelTypes.RECEIVED_MY_CHANNEL_MEMBER,
                                data: member
                            }, {
                                type: _action_types.PreferenceTypes.RECEIVED_PREFERENCES,
                                data: preferences
                            }, {
                                type: _action_types.ChannelTypes.CREATE_CHANNEL_SUCCESS
                            }, {
                                type: _action_types.UserTypes.RECEIVED_PROFILES_LIST_IN_CHANNEL,
                                id: created.id,
                                data: [{ id: userId }, { id: otherUserId }]
                            }]), getState);

                            return _context3.abrupt('return', { data: created });

                        case 18:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this3, [[2, 8]]);
        }));

        return function (_x5, _x6) {
            return _ref3.apply(this, arguments);
        };
    }();
}

function createGroupChannel(userIds) {
    var _this4 = this;

    return function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(dispatch, getState) {
            var currentUserId, created, member, preferences, profilesInChannel;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            dispatch({ type: _action_types.ChannelTypes.CREATE_CHANNEL_REQUEST }, getState);

                            currentUserId = getState().entities.users.currentUserId;
                            created = void 0;
                            _context4.prev = 3;
                            _context4.next = 6;
                            return _client.Client4.createGroupChannel(userIds);

                        case 6:
                            created = _context4.sent;
                            _context4.next = 14;
                            break;

                        case 9:
                            _context4.prev = 9;
                            _context4.t0 = _context4['catch'](3);

                            (0, _helpers.forceLogoutIfNecessary)(_context4.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.ChannelTypes.CREATE_CHANNEL_FAILURE, error: _context4.t0 }, (0, _errors.logError)(_context4.t0)(dispatch)]), getState);
                            return _context4.abrupt('return', { error: _context4.t0 });

                        case 14:
                            member = {
                                channel_id: created.id,
                                user_id: currentUserId,
                                roles: '' + _constants.General.CHANNEL_USER_ROLE,
                                last_viewed_at: 0,
                                msg_count: 0,
                                mention_count: 0,
                                notify_props: { desktop: 'default', mark_unread: 'all' },
                                last_update_at: created.create_at
                            };
                            preferences = [{ user_id: currentUserId, category: _constants.Preferences.CATEGORY_GROUP_CHANNEL_SHOW, name: created.id, value: 'true' }, { user_id: currentUserId, category: _constants.Preferences.CATEGORY_CHANNEL_OPEN_TIME, name: created.id, value: new Date().getTime().toString() }];


                            (0, _preferences.savePreferences)(currentUserId, preferences)(dispatch, getState);

                            profilesInChannel = userIds.map(function (id) {
                                return { id: id };
                            });

                            profilesInChannel.push({ id: currentUserId }); // currentUserId is optionally in userIds, but the reducer will get rid of a duplicate

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.ChannelTypes.RECEIVED_CHANNEL,
                                data: created
                            }, {
                                type: _action_types.ChannelTypes.RECEIVED_MY_CHANNEL_MEMBER,
                                data: member
                            }, {
                                type: _action_types.PreferenceTypes.RECEIVED_PREFERENCES,
                                data: preferences
                            }, {
                                type: _action_types.ChannelTypes.CREATE_CHANNEL_SUCCESS
                            }, {
                                type: _action_types.UserTypes.RECEIVED_PROFILES_LIST_IN_CHANNEL,
                                id: created.id,
                                data: profilesInChannel
                            }]), getState);

                            return _context4.abrupt('return', { data: created });

                        case 21:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this4, [[3, 9]]);
        }));

        return function (_x7, _x8) {
            return _ref4.apply(this, arguments);
        };
    }();
}

function patchChannel(channelId, patch) {
    var _this5 = this;

    return function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(dispatch, getState) {
            var updated;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            dispatch({ type: _action_types.ChannelTypes.UPDATE_CHANNEL_REQUEST }, getState);

                            updated = void 0;
                            _context5.prev = 2;
                            _context5.next = 5;
                            return _client.Client4.patchChannel(channelId, patch);

                        case 5:
                            updated = _context5.sent;
                            _context5.next = 13;
                            break;

                        case 8:
                            _context5.prev = 8;
                            _context5.t0 = _context5['catch'](2);

                            (0, _helpers.forceLogoutIfNecessary)(_context5.t0, dispatch, getState);

                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.ChannelTypes.UPDATE_CHANNEL_FAILURE, error: _context5.t0 }, (0, _errors.logError)(_context5.t0)(dispatch)]), getState);
                            return _context5.abrupt('return', { error: _context5.t0 });

                        case 13:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.ChannelTypes.RECEIVED_CHANNEL,
                                data: updated
                            }, {
                                type: _action_types.ChannelTypes.UPDATE_CHANNEL_SUCCESS
                            }]), getState);

                            return _context5.abrupt('return', { data: updated });

                        case 15:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, _this5, [[2, 8]]);
        }));

        return function (_x9, _x10) {
            return _ref5.apply(this, arguments);
        };
    }();
}

function updateChannel(channel) {
    var _this6 = this;

    return function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(dispatch, getState) {
            var updated;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            dispatch({ type: _action_types.ChannelTypes.UPDATE_CHANNEL_REQUEST }, getState);

                            updated = void 0;
                            _context6.prev = 2;
                            _context6.next = 5;
                            return _client.Client4.updateChannel(channel);

                        case 5:
                            updated = _context6.sent;
                            _context6.next = 13;
                            break;

                        case 8:
                            _context6.prev = 8;
                            _context6.t0 = _context6['catch'](2);

                            (0, _helpers.forceLogoutIfNecessary)(_context6.t0, dispatch, getState);

                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.ChannelTypes.UPDATE_CHANNEL_FAILURE, error: _context6.t0 }, (0, _errors.logError)(_context6.t0)(dispatch)]), getState);
                            return _context6.abrupt('return', { error: _context6.t0 });

                        case 13:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.ChannelTypes.RECEIVED_CHANNEL,
                                data: updated
                            }, {
                                type: _action_types.ChannelTypes.UPDATE_CHANNEL_SUCCESS
                            }]), getState);

                            return _context6.abrupt('return', { data: updated });

                        case 15:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, _this6, [[2, 8]]);
        }));

        return function (_x11, _x12) {
            return _ref6.apply(this, arguments);
        };
    }();
}

function updateChannelNotifyProps(userId, channelId, props) {
    var _this7 = this;

    return function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(dispatch, getState) {
            var notifyProps, member, currentNotifyProps;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            dispatch({ type: _action_types.ChannelTypes.NOTIFY_PROPS_REQUEST }, getState);

                            notifyProps = _extends({
                                user_id: userId,
                                channel_id: channelId
                            }, props);
                            _context7.prev = 2;
                            _context7.next = 5;
                            return _client.Client4.updateChannelNotifyProps(notifyProps);

                        case 5:
                            _context7.next = 12;
                            break;

                        case 7:
                            _context7.prev = 7;
                            _context7.t0 = _context7['catch'](2);

                            (0, _helpers.forceLogoutIfNecessary)(_context7.t0, dispatch, getState);

                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.ChannelTypes.NOTIFY_PROPS_FAILURE, error: _context7.t0 }, (0, _errors.logError)(_context7.t0)(dispatch)]), getState);
                            return _context7.abrupt('return', { error: _context7.t0 });

                        case 12:
                            member = getState().entities.channels.myMembers[channelId] || {};
                            currentNotifyProps = member.notify_props || {};


                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.ChannelTypes.RECEIVED_CHANNEL_PROPS,
                                data: {
                                    channel_id: channelId,
                                    notifyProps: _extends({}, currentNotifyProps, notifyProps)
                                }
                            }, {
                                type: _action_types.ChannelTypes.NOTIFY_PROPS_SUCCESS
                            }]), getState);

                            return _context7.abrupt('return', { data: true });

                        case 16:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, _this7, [[2, 7]]);
        }));

        return function (_x13, _x14) {
            return _ref7.apply(this, arguments);
        };
    }();
}

function getChannelByNameAndTeamName(teamName, channelName) {
    var _this8 = this;

    return function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(dispatch, getState) {
            var data;
            return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            dispatch({ type: _action_types.ChannelTypes.CHANNEL_REQUEST }, getState);

                            data = void 0;
                            _context8.prev = 2;
                            _context8.next = 5;
                            return _client.Client4.getChannelByNameAndTeamName(teamName, channelName);

                        case 5:
                            data = _context8.sent;
                            _context8.next = 13;
                            break;

                        case 8:
                            _context8.prev = 8;
                            _context8.t0 = _context8['catch'](2);

                            (0, _helpers.forceLogoutIfNecessary)(_context8.t0, dispatch);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.ChannelTypes.CHANNELS_FAILURE, error: _context8.t0 }, (0, _errors.logError)(_context8.t0)(dispatch)]), getState);
                            return _context8.abrupt('return', { error: _context8.t0 });

                        case 13:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.ChannelTypes.RECEIVED_CHANNEL,
                                data: data
                            }, {
                                type: _action_types.ChannelTypes.CHANNEL_SUCCESS
                            }]), getState);

                            return _context8.abrupt('return', { data: data });

                        case 15:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, _callee8, _this8, [[2, 8]]);
        }));

        return function (_x15, _x16) {
            return _ref8.apply(this, arguments);
        };
    }();
}

function getChannel(channelId) {
    var _this9 = this;

    return function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(dispatch, getState) {
            var data;
            return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            dispatch({ type: _action_types.ChannelTypes.CHANNEL_REQUEST }, getState);

                            data = void 0;
                            _context9.prev = 2;
                            _context9.next = 5;
                            return _client.Client4.getChannel(channelId);

                        case 5:
                            data = _context9.sent;
                            _context9.next = 13;
                            break;

                        case 8:
                            _context9.prev = 8;
                            _context9.t0 = _context9['catch'](2);

                            (0, _helpers.forceLogoutIfNecessary)(_context9.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.ChannelTypes.CHANNELS_FAILURE, error: _context9.t0 }, (0, _errors.logError)(_context9.t0)(dispatch)]), getState);
                            return _context9.abrupt('return', { error: _context9.t0 });

                        case 13:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.ChannelTypes.RECEIVED_CHANNEL,
                                data: data
                            }, {
                                type: _action_types.ChannelTypes.CHANNEL_SUCCESS
                            }]), getState);

                            return _context9.abrupt('return', { data: data });

                        case 15:
                        case 'end':
                            return _context9.stop();
                    }
                }
            }, _callee9, _this9, [[2, 8]]);
        }));

        return function (_x17, _x18) {
            return _ref9.apply(this, arguments);
        };
    }();
}

function getChannelAndMyMember(channelId) {
    var _this10 = this;

    return function () {
        var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(dispatch, getState) {
            var channel, member, channelRequest, memberRequest;
            return regeneratorRuntime.wrap(function _callee10$(_context10) {
                while (1) {
                    switch (_context10.prev = _context10.next) {
                        case 0:
                            dispatch({ type: _action_types.ChannelTypes.CHANNEL_REQUEST }, getState);

                            channel = void 0;
                            member = void 0;
                            _context10.prev = 3;
                            channelRequest = _client.Client4.getChannel(channelId);
                            memberRequest = _client.Client4.getMyChannelMember(channelId);
                            _context10.next = 8;
                            return channelRequest;

                        case 8:
                            channel = _context10.sent;
                            _context10.next = 11;
                            return memberRequest;

                        case 11:
                            member = _context10.sent;
                            _context10.next = 19;
                            break;

                        case 14:
                            _context10.prev = 14;
                            _context10.t0 = _context10['catch'](3);

                            (0, _helpers.forceLogoutIfNecessary)(_context10.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.ChannelTypes.CHANNELS_FAILURE, error: _context10.t0 }, (0, _errors.logError)(_context10.t0)(dispatch)]), getState);
                            return _context10.abrupt('return', { error: _context10.t0 });

                        case 19:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.ChannelTypes.RECEIVED_CHANNEL,
                                data: channel
                            }, {
                                type: _action_types.ChannelTypes.CHANNEL_SUCCESS
                            }, {
                                type: _action_types.ChannelTypes.RECEIVED_MY_CHANNEL_MEMBER,
                                data: member
                            }]), getState);

                            return _context10.abrupt('return', { data: { channel: channel, member: member } });

                        case 21:
                        case 'end':
                            return _context10.stop();
                    }
                }
            }, _callee10, _this10, [[3, 14]]);
        }));

        return function (_x19, _x20) {
            return _ref10.apply(this, arguments);
        };
    }();
}

function fetchMyChannelsAndMembers(teamId) {
    var _this11 = this;

    return function () {
        var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(dispatch, getState) {
            var channelsRequest, channelMembersRequest, channels, channelMembers, currentUserId;
            return regeneratorRuntime.wrap(function _callee11$(_context11) {
                while (1) {
                    switch (_context11.prev = _context11.next) {
                        case 0:
                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.ChannelTypes.CHANNELS_REQUEST
                            }, {
                                type: _action_types.ChannelTypes.CHANNEL_MEMBERS_REQUEST
                            }]), getState);

                            channelsRequest = _client.Client4.getMyChannels(teamId);
                            channelMembersRequest = _client.Client4.getMyChannelMembers(teamId);
                            channels = void 0;
                            _context11.prev = 4;
                            _context11.next = 7;
                            return channelsRequest;

                        case 7:
                            channels = _context11.sent;
                            _context11.next = 15;
                            break;

                        case 10:
                            _context11.prev = 10;
                            _context11.t0 = _context11['catch'](4);

                            (0, _helpers.forceLogoutIfNecessary)(_context11.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.ChannelTypes.CHANNELS_FAILURE, error: _context11.t0 }, { type: _action_types.ChannelTypes.CHANNEL_MEMBERS_FAILURE, error: _context11.t0 }, (0, _errors.logError)(_context11.t0)(dispatch)]), getState);
                            return _context11.abrupt('return', { error: _context11.t0 });

                        case 15:
                            channelMembers = void 0;
                            _context11.prev = 16;
                            _context11.next = 19;
                            return channelMembersRequest;

                        case 19:
                            channelMembers = _context11.sent;
                            _context11.next = 27;
                            break;

                        case 22:
                            _context11.prev = 22;
                            _context11.t1 = _context11['catch'](16);

                            (0, _helpers.forceLogoutIfNecessary)(_context11.t1, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.ChannelTypes.CHANNELS_FAILURE, error: _context11.t1 }, { type: _action_types.ChannelTypes.CHANNEL_MEMBERS_FAILURE, error: _context11.t1 }, (0, _errors.logError)(_context11.t1)(dispatch)]), getState);
                            return _context11.abrupt('return', { error: _context11.t1 });

                        case 27:
                            currentUserId = getState().entities.users.currentUserId;


                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.ChannelTypes.RECEIVED_CHANNELS,
                                teamId: teamId,
                                data: channels
                            }, {
                                type: _action_types.ChannelTypes.CHANNELS_SUCCESS
                            }, {
                                type: _action_types.ChannelTypes.RECEIVED_MY_CHANNEL_MEMBERS,
                                data: channelMembers,
                                remove: (0, _channel_utils.getChannelsIdForTeam)(getState(), teamId),
                                currentUserId: currentUserId
                            }, {
                                type: _action_types.ChannelTypes.CHANNEL_MEMBERS_SUCCESS
                            }]), getState);

                            return _context11.abrupt('return', { data: { channels: channels, members: channelMembers } });

                        case 30:
                        case 'end':
                            return _context11.stop();
                    }
                }
            }, _callee11, _this11, [[4, 10], [16, 22]]);
        }));

        return function (_x21, _x22) {
            return _ref11.apply(this, arguments);
        };
    }();
}

function getMyChannelMembers(teamId) {
    var _this12 = this;

    return function () {
        var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(dispatch, getState) {
            var channelMembers, channelMembersRequest, currentUserId;
            return regeneratorRuntime.wrap(function _callee12$(_context12) {
                while (1) {
                    switch (_context12.prev = _context12.next) {
                        case 0:
                            dispatch({ type: _action_types.ChannelTypes.CHANNEL_MY_MEMBERS_REQUEST }, getState);

                            channelMembers = void 0;
                            _context12.prev = 2;
                            channelMembersRequest = _client.Client4.getMyChannelMembers(teamId);
                            _context12.next = 6;
                            return channelMembersRequest;

                        case 6:
                            channelMembers = _context12.sent;
                            _context12.next = 14;
                            break;

                        case 9:
                            _context12.prev = 9;
                            _context12.t0 = _context12['catch'](2);

                            (0, _helpers.forceLogoutIfNecessary)(_context12.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.ChannelTypes.CHANNEL_MY_MEMBERS_FAILURE, error: _context12.t0 }, (0, _errors.logError)(_context12.t0)(dispatch)]), getState);
                            return _context12.abrupt('return', { error: _context12.t0 });

                        case 14:
                            currentUserId = getState().entities.users.currentUserId;


                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.ChannelTypes.RECEIVED_MY_CHANNEL_MEMBERS,
                                data: channelMembers,
                                remove: (0, _channel_utils.getChannelsIdForTeam)(getState(), teamId),
                                currentUserId: currentUserId
                            }, {
                                type: _action_types.ChannelTypes.CHANNEL_MY_MEMBERS_SUCCESS
                            }]), getState);

                            return _context12.abrupt('return', { data: channelMembers });

                        case 17:
                        case 'end':
                            return _context12.stop();
                    }
                }
            }, _callee12, _this12, [[2, 9]]);
        }));

        return function (_x23, _x24) {
            return _ref12.apply(this, arguments);
        };
    }();
}

function getChannelMembers(channelId) {
    var _this13 = this;

    var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var perPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _constants.General.CHANNELS_CHUNK_SIZE;

    return function () {
        var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(dispatch, getState) {
            var channelMembers, channelMembersRequest, userIds;
            return regeneratorRuntime.wrap(function _callee13$(_context13) {
                while (1) {
                    switch (_context13.prev = _context13.next) {
                        case 0:
                            dispatch({ type: _action_types.ChannelTypes.CHANNEL_MEMBERS_REQUEST }, getState);

                            channelMembers = void 0;
                            _context13.prev = 2;
                            channelMembersRequest = _client.Client4.getChannelMembers(channelId, page, perPage);
                            _context13.next = 6;
                            return channelMembersRequest;

                        case 6:
                            channelMembers = _context13.sent;
                            _context13.next = 14;
                            break;

                        case 9:
                            _context13.prev = 9;
                            _context13.t0 = _context13['catch'](2);

                            (0, _helpers.forceLogoutIfNecessary)(_context13.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.ChannelTypes.CHANNEL_MEMBERS_FAILURE, error: _context13.t0 }, (0, _errors.logError)(_context13.t0)(dispatch)]), getState);
                            return _context13.abrupt('return', { error: _context13.t0 });

                        case 14:
                            userIds = channelMembers.map(function (cm) {
                                return cm.user_id;
                            });

                            (0, _users.getMissingProfilesByIds)(userIds)(dispatch, getState);

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.ChannelTypes.RECEIVED_CHANNEL_MEMBERS,
                                data: channelMembers
                            }, {
                                type: _action_types.ChannelTypes.CHANNEL_MEMBERS_SUCCESS
                            }]), getState);

                            return _context13.abrupt('return', { data: channelMembers });

                        case 18:
                        case 'end':
                            return _context13.stop();
                    }
                }
            }, _callee13, _this13, [[2, 9]]);
        }));

        return function (_x27, _x28) {
            return _ref13.apply(this, arguments);
        };
    }();
}

function leaveChannel(channelId) {
    var _this14 = this;

    return function () {
        var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(dispatch, getState) {
            var state, currentUserId, _state$entities$chann, channels, myMembers, channel, member;

            return regeneratorRuntime.wrap(function _callee14$(_context14) {
                while (1) {
                    switch (_context14.prev = _context14.next) {
                        case 0:
                            state = getState();
                            currentUserId = state.entities.users.currentUserId;
                            _state$entities$chann = state.entities.channels, channels = _state$entities$chann.channels, myMembers = _state$entities$chann.myMembers;
                            channel = channels[channelId];
                            member = myMembers[channelId];


                            _client.Client4.trackEvent('action', 'action_channels_leave', { channel_id: channelId });

                            dispatch({
                                type: _action_types.ChannelTypes.LEAVE_CHANNEL,
                                data: {
                                    id: channelId,
                                    user_id: currentUserId,
                                    team_id: channel.team_id,
                                    type: channel.type
                                },
                                meta: {
                                    offline: {
                                        effect: function effect() {
                                            return _client.Client4.removeFromChannel(currentUserId, channelId);
                                        },
                                        commit: { type: _action_types.ChannelTypes.LEAVE_CHANNEL },
                                        rollback: function rollback() {
                                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                                type: _action_types.ChannelTypes.RECEIVED_CHANNEL,
                                                data: channel
                                            }, {
                                                type: _action_types.ChannelTypes.RECEIVED_MY_CHANNEL_MEMBER,
                                                data: member
                                            }]));
                                        }
                                    }
                                }
                            });

                            return _context14.abrupt('return', { data: true });

                        case 8:
                        case 'end':
                            return _context14.stop();
                    }
                }
            }, _callee14, _this14);
        }));

        return function (_x29, _x30) {
            return _ref14.apply(this, arguments);
        };
    }();
}

function joinChannel(userId, teamId, channelId, channelName) {
    var _this15 = this;

    return function () {
        var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(dispatch, getState) {
            var member, channel;
            return regeneratorRuntime.wrap(function _callee15$(_context15) {
                while (1) {
                    switch (_context15.prev = _context15.next) {
                        case 0:
                            dispatch({ type: _action_types.ChannelTypes.JOIN_CHANNEL_REQUEST }, getState);

                            member = void 0;
                            channel = void 0;
                            _context15.prev = 3;

                            if (!channelId) {
                                _context15.next = 13;
                                break;
                            }

                            _context15.next = 7;
                            return _client.Client4.addToChannel(userId, channelId);

                        case 7:
                            member = _context15.sent;
                            _context15.next = 10;
                            return _client.Client4.getChannel(channelId);

                        case 10:
                            channel = _context15.sent;
                            _context15.next = 26;
                            break;

                        case 13:
                            if (!channelName) {
                                _context15.next = 26;
                                break;
                            }

                            _context15.next = 16;
                            return _client.Client4.getChannelByName(teamId, channelName);

                        case 16:
                            channel = _context15.sent;

                            if (!(channel.type === _constants.General.GM_CHANNEL || channel.type === _constants.General.DM_CHANNEL)) {
                                _context15.next = 23;
                                break;
                            }

                            _context15.next = 20;
                            return _client.Client4.getChannelMember(channel.id, userId);

                        case 20:
                            member = _context15.sent;
                            _context15.next = 26;
                            break;

                        case 23:
                            _context15.next = 25;
                            return _client.Client4.addToChannel(userId, channel.id);

                        case 25:
                            member = _context15.sent;

                        case 26:
                            _context15.next = 33;
                            break;

                        case 28:
                            _context15.prev = 28;
                            _context15.t0 = _context15['catch'](3);

                            (0, _helpers.forceLogoutIfNecessary)(_context15.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.ChannelTypes.JOIN_CHANNEL_FAILURE, error: _context15.t0 }, (0, _errors.logError)(_context15.t0)(dispatch)]), getState);
                            return _context15.abrupt('return', { error: _context15.t0 });

                        case 33:

                            _client.Client4.trackEvent('action', 'action_channels_join', { channel_id: channelId });

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.ChannelTypes.RECEIVED_CHANNEL,
                                data: channel
                            }, {
                                type: _action_types.ChannelTypes.RECEIVED_MY_CHANNEL_MEMBER,
                                data: member
                            }, {
                                type: _action_types.ChannelTypes.JOIN_CHANNEL_SUCCESS
                            }]), getState);

                            return _context15.abrupt('return', { data: { channel: channel, member: member } });

                        case 36:
                        case 'end':
                            return _context15.stop();
                    }
                }
            }, _callee15, _this15, [[3, 28]]);
        }));

        return function (_x31, _x32) {
            return _ref15.apply(this, arguments);
        };
    }();
}

function deleteChannel(channelId) {
    var _this16 = this;

    return function () {
        var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(dispatch, getState) {
            var entities, _entities$channels, channels, currentChannelId, channel, defaultChannelId, teamId;

            return regeneratorRuntime.wrap(function _callee16$(_context16) {
                while (1) {
                    switch (_context16.prev = _context16.next) {
                        case 0:
                            dispatch({ type: _action_types.ChannelTypes.DELETE_CHANNEL_REQUEST }, getState);

                            _context16.prev = 1;
                            _context16.next = 4;
                            return _client.Client4.deleteChannel(channelId);

                        case 4:
                            _context16.next = 11;
                            break;

                        case 6:
                            _context16.prev = 6;
                            _context16.t0 = _context16['catch'](1);

                            (0, _helpers.forceLogoutIfNecessary)(_context16.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.ChannelTypes.DELETE_CHANNEL_FAILURE, error: _context16.t0 }, (0, _errors.logError)(_context16.t0)(dispatch)]), getState);
                            return _context16.abrupt('return', { error: _context16.t0 });

                        case 11:
                            entities = getState().entities;
                            _entities$channels = entities.channels, channels = _entities$channels.channels, currentChannelId = _entities$channels.currentChannelId;

                            if (channelId === currentChannelId) {
                                channel = Object.keys(channels).filter(function (key) {
                                    return channels[key].name === _constants.General.DEFAULT_CHANNEL;
                                });
                                defaultChannelId = '';

                                if (channel.length) {
                                    defaultChannelId = channel[0];
                                }

                                dispatch({ type: _action_types.ChannelTypes.SELECT_CHANNEL, data: defaultChannelId }, getState);
                            }

                            teamId = channels[channelId] ? channels[channelId].team_id : '';


                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.ChannelTypes.RECEIVED_CHANNEL_DELETED,
                                data: { id: channelId, team_id: teamId }
                            }, {
                                type: _action_types.ChannelTypes.DELETE_CHANNEL_SUCCESS
                            }]), getState);

                            return _context16.abrupt('return', { data: true });

                        case 17:
                        case 'end':
                            return _context16.stop();
                    }
                }
            }, _callee16, _this16, [[1, 6]]);
        }));

        return function (_x33, _x34) {
            return _ref16.apply(this, arguments);
        };
    }();
}

function viewChannel(channelId) {
    var _this17 = this;

    var prevChannelId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    return function () {
        var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(dispatch, getState) {
            var currentUserId, myPreferences, viewTimePref, viewTime, preferences, actions, myMembers, member, prevMember;
            return regeneratorRuntime.wrap(function _callee17$(_context17) {
                while (1) {
                    switch (_context17.prev = _context17.next) {
                        case 0:
                            currentUserId = getState().entities.users.currentUserId;
                            myPreferences = getState().entities.preferences.myPreferences;
                            viewTimePref = myPreferences[_constants.Preferences.CATEGORY_CHANNEL_APPROXIMATE_VIEW_TIME + '--' + channelId];
                            viewTime = viewTimePref ? parseInt(viewTimePref.value, 10) : 0;

                            if (viewTime < new Date().getTime() - 3 * 60 * 60 * 1000) {
                                preferences = [{ user_id: currentUserId, category: _constants.Preferences.CATEGORY_CHANNEL_APPROXIMATE_VIEW_TIME, name: channelId, value: new Date().getTime().toString() }];

                                (0, _preferences.savePreferences)(currentUserId, preferences)(dispatch, getState);
                            }

                            dispatch({ type: _action_types.ChannelTypes.UPDATE_LAST_VIEWED_REQUEST }, getState);

                            _context17.prev = 6;
                            _context17.next = 9;
                            return _client.Client4.viewMyChannel(channelId, prevChannelId);

                        case 9:
                            _context17.next = 16;
                            break;

                        case 11:
                            _context17.prev = 11;
                            _context17.t0 = _context17['catch'](6);

                            (0, _helpers.forceLogoutIfNecessary)(_context17.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.ChannelTypes.UPDATE_LAST_VIEWED_FAILURE, error: _context17.t0 }, (0, _errors.logError)(_context17.t0)(dispatch)]), getState);
                            return _context17.abrupt('return', { error: _context17.t0 });

                        case 16:
                            actions = [{ type: _action_types.ChannelTypes.UPDATE_LAST_VIEWED_SUCCESS }];
                            myMembers = getState().entities.channels.myMembers;
                            member = myMembers[channelId];

                            if (member) {
                                actions.push({
                                    type: _action_types.ChannelTypes.RECEIVED_MY_CHANNEL_MEMBER,
                                    data: _extends({}, member, { last_viewed_at: new Date().getTime() })
                                });
                            }

                            prevMember = myMembers[prevChannelId];

                            if (prevMember) {
                                actions.push({
                                    type: _action_types.ChannelTypes.RECEIVED_MY_CHANNEL_MEMBER,
                                    data: _extends({}, prevMember, { last_viewed_at: new Date().getTime() })
                                });
                            }

                            dispatch((0, _reduxBatchedActions.batchActions)(actions), getState);

                            return _context17.abrupt('return', { data: true });

                        case 24:
                        case 'end':
                            return _context17.stop();
                    }
                }
            }, _callee17, _this17, [[6, 11]]);
        }));

        return function (_x36, _x37) {
            return _ref17.apply(this, arguments);
        };
    }();
}

function markChannelAsViewed(channelId) {
    var _this18 = this;

    var prevChannelId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    return function () {
        var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(dispatch, getState) {
            var actions, myMembers, member, prevMember;
            return regeneratorRuntime.wrap(function _callee18$(_context18) {
                while (1) {
                    switch (_context18.prev = _context18.next) {
                        case 0:
                            actions = [];
                            myMembers = getState().entities.channels.myMembers;
                            member = myMembers[channelId];

                            if (member) {
                                actions.push({
                                    type: _action_types.ChannelTypes.RECEIVED_MY_CHANNEL_MEMBER,
                                    data: _extends({}, member, { last_viewed_at: Date.now() })
                                });
                            }

                            prevMember = myMembers[prevChannelId];

                            if (prevMember) {
                                actions.push({
                                    type: _action_types.ChannelTypes.RECEIVED_MY_CHANNEL_MEMBER,
                                    data: _extends({}, prevMember, { last_viewed_at: Date.now() })
                                });
                            }

                            if (actions.length) {
                                dispatch((0, _reduxBatchedActions.batchActions)(actions), getState);
                            }

                            return _context18.abrupt('return', { data: true });

                        case 8:
                        case 'end':
                            return _context18.stop();
                    }
                }
            }, _callee18, _this18);
        }));

        return function (_x39, _x40) {
            return _ref18.apply(this, arguments);
        };
    }();
}

function getChannels(teamId) {
    var _this19 = this;

    var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var perPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _constants.General.CHANNELS_CHUNK_SIZE;

    return function () {
        var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(dispatch, getState) {
            var channels;
            return regeneratorRuntime.wrap(function _callee19$(_context19) {
                while (1) {
                    switch (_context19.prev = _context19.next) {
                        case 0:
                            dispatch({ type: _action_types.ChannelTypes.GET_CHANNELS_REQUEST }, getState);

                            channels = void 0;
                            _context19.prev = 2;
                            _context19.next = 5;
                            return _client.Client4.getChannels(teamId, page, perPage);

                        case 5:
                            channels = _context19.sent;
                            _context19.next = 13;
                            break;

                        case 8:
                            _context19.prev = 8;
                            _context19.t0 = _context19['catch'](2);

                            (0, _helpers.forceLogoutIfNecessary)(_context19.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.ChannelTypes.GET_CHANNELS_FAILURE, error: _context19.t0 }, (0, _errors.logError)(_context19.t0)(dispatch)]), getState);
                            return _context19.abrupt('return', { error: _context19.t0 });

                        case 13:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.ChannelTypes.RECEIVED_CHANNELS,
                                teamId: teamId,
                                data: channels
                            }, {
                                type: _action_types.ChannelTypes.GET_CHANNELS_SUCCESS
                            }]), getState);

                            return _context19.abrupt('return', { data: channels });

                        case 15:
                        case 'end':
                            return _context19.stop();
                    }
                }
            }, _callee19, _this19, [[2, 8]]);
        }));

        return function (_x43, _x44) {
            return _ref19.apply(this, arguments);
        };
    }();
}

function autocompleteChannels(teamId, term) {
    var _this20 = this;

    return function () {
        var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(dispatch, getState) {
            var channels;
            return regeneratorRuntime.wrap(function _callee20$(_context20) {
                while (1) {
                    switch (_context20.prev = _context20.next) {
                        case 0:
                            dispatch({ type: _action_types.ChannelTypes.GET_CHANNELS_REQUEST }, getState);

                            channels = void 0;
                            _context20.prev = 2;
                            _context20.next = 5;
                            return _client.Client4.autocompleteChannels(teamId, term);

                        case 5:
                            channels = _context20.sent;
                            _context20.next = 13;
                            break;

                        case 8:
                            _context20.prev = 8;
                            _context20.t0 = _context20['catch'](2);

                            (0, _helpers.forceLogoutIfNecessary)(_context20.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.ChannelTypes.GET_CHANNELS_FAILURE, error: _context20.t0 }, (0, _errors.logError)(_context20.t0)(dispatch)]), getState);
                            return _context20.abrupt('return', { error: _context20.t0 });

                        case 13:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.ChannelTypes.RECEIVED_CHANNELS,
                                teamId: teamId,
                                data: channels
                            }, {
                                type: _action_types.ChannelTypes.GET_CHANNELS_SUCCESS
                            }]), getState);

                            return _context20.abrupt('return', { data: channels });

                        case 15:
                        case 'end':
                            return _context20.stop();
                    }
                }
            }, _callee20, _this20, [[2, 8]]);
        }));

        return function (_x45, _x46) {
            return _ref20.apply(this, arguments);
        };
    }();
}

function searchChannels(teamId, term) {
    var _this21 = this;

    return function () {
        var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(dispatch, getState) {
            var channels;
            return regeneratorRuntime.wrap(function _callee21$(_context21) {
                while (1) {
                    switch (_context21.prev = _context21.next) {
                        case 0:
                            dispatch({ type: _action_types.ChannelTypes.GET_CHANNELS_REQUEST }, getState);

                            channels = void 0;
                            _context21.prev = 2;
                            _context21.next = 5;
                            return _client.Client4.searchChannels(teamId, term);

                        case 5:
                            channels = _context21.sent;
                            _context21.next = 13;
                            break;

                        case 8:
                            _context21.prev = 8;
                            _context21.t0 = _context21['catch'](2);

                            (0, _helpers.forceLogoutIfNecessary)(_context21.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.ChannelTypes.GET_CHANNELS_FAILURE, error: _context21.t0 }, (0, _errors.logError)(_context21.t0)(dispatch)]), getState);
                            return _context21.abrupt('return', { error: _context21.t0 });

                        case 13:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.ChannelTypes.RECEIVED_CHANNELS,
                                teamId: teamId,
                                data: channels
                            }, {
                                type: _action_types.ChannelTypes.GET_CHANNELS_SUCCESS
                            }]), getState);

                            return _context21.abrupt('return', { data: channels });

                        case 15:
                        case 'end':
                            return _context21.stop();
                    }
                }
            }, _callee21, _this21, [[2, 8]]);
        }));

        return function (_x47, _x48) {
            return _ref21.apply(this, arguments);
        };
    }();
}

function getChannelStats(channelId) {
    var _this22 = this;

    return function () {
        var _ref22 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22(dispatch, getState) {
            var stat;
            return regeneratorRuntime.wrap(function _callee22$(_context22) {
                while (1) {
                    switch (_context22.prev = _context22.next) {
                        case 0:
                            dispatch({ type: _action_types.ChannelTypes.CHANNEL_STATS_REQUEST }, getState);

                            stat = void 0;
                            _context22.prev = 2;
                            _context22.next = 5;
                            return _client.Client4.getChannelStats(channelId);

                        case 5:
                            stat = _context22.sent;
                            _context22.next = 13;
                            break;

                        case 8:
                            _context22.prev = 8;
                            _context22.t0 = _context22['catch'](2);

                            (0, _helpers.forceLogoutIfNecessary)(_context22.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.ChannelTypes.CHANNEL_STATS_FAILURE, error: _context22.t0 }, (0, _errors.logError)(_context22.t0)(dispatch)]), getState);
                            return _context22.abrupt('return', { error: _context22.t0 });

                        case 13:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.ChannelTypes.RECEIVED_CHANNEL_STATS,
                                data: stat
                            }, {
                                type: _action_types.ChannelTypes.CHANNEL_STATS_SUCCESS
                            }]), getState);

                            return _context22.abrupt('return', { data: stat });

                        case 15:
                        case 'end':
                            return _context22.stop();
                    }
                }
            }, _callee22, _this22, [[2, 8]]);
        }));

        return function (_x49, _x50) {
            return _ref22.apply(this, arguments);
        };
    }();
}

function addChannelMember(channelId, userId) {
    var _this23 = this;

    var postRootId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    return function () {
        var _ref23 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23(dispatch, getState) {
            var member;
            return regeneratorRuntime.wrap(function _callee23$(_context23) {
                while (1) {
                    switch (_context23.prev = _context23.next) {
                        case 0:
                            dispatch({ type: _action_types.ChannelTypes.ADD_CHANNEL_MEMBER_REQUEST }, getState);

                            member = void 0;
                            _context23.prev = 2;
                            _context23.next = 5;
                            return _client.Client4.addToChannel(userId, channelId, postRootId);

                        case 5:
                            member = _context23.sent;
                            _context23.next = 13;
                            break;

                        case 8:
                            _context23.prev = 8;
                            _context23.t0 = _context23['catch'](2);

                            (0, _helpers.forceLogoutIfNecessary)(_context23.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.ChannelTypes.ADD_CHANNEL_MEMBER_FAILURE, error: _context23.t0 }, (0, _errors.logError)(_context23.t0)(dispatch)]), getState);
                            return _context23.abrupt('return', { error: _context23.t0 });

                        case 13:

                            _client.Client4.trackEvent('action', 'action_channels_add_member', { channel_id: channelId });

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.UserTypes.RECEIVED_PROFILE_IN_CHANNEL,
                                data: { user_id: userId },
                                id: channelId
                            }, {
                                type: _action_types.ChannelTypes.RECEIVED_CHANNEL_MEMBER,
                                data: member
                            }, {
                                type: _action_types.ChannelTypes.ADD_CHANNEL_MEMBER_SUCCESS,
                                id: channelId
                            }], 'ADD_CHANNEL_MEMBER.BATCH'), getState);

                            return _context23.abrupt('return', { data: member });

                        case 16:
                        case 'end':
                            return _context23.stop();
                    }
                }
            }, _callee23, _this23, [[2, 8]]);
        }));

        return function (_x52, _x53) {
            return _ref23.apply(this, arguments);
        };
    }();
}

function removeChannelMember(channelId, userId) {
    var _this24 = this;

    return function () {
        var _ref24 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee24(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee24$(_context24) {
                while (1) {
                    switch (_context24.prev = _context24.next) {
                        case 0:
                            dispatch({ type: _action_types.ChannelTypes.REMOVE_CHANNEL_MEMBER_REQUEST }, getState);

                            _context24.prev = 1;
                            _context24.next = 4;
                            return _client.Client4.removeFromChannel(userId, channelId);

                        case 4:
                            _context24.next = 11;
                            break;

                        case 6:
                            _context24.prev = 6;
                            _context24.t0 = _context24['catch'](1);

                            (0, _helpers.forceLogoutIfNecessary)(_context24.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.ChannelTypes.REMOVE_CHANNEL_MEMBER_FAILURE, error: _context24.t0 }, (0, _errors.logError)(_context24.t0)(dispatch)]), getState);
                            return _context24.abrupt('return', { error: _context24.t0 });

                        case 11:

                            _client.Client4.trackEvent('action', 'action_channels_remove_member', { channel_id: channelId });

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.UserTypes.RECEIVED_PROFILE_NOT_IN_CHANNEL,
                                data: { user_id: userId },
                                id: channelId
                            }, {
                                type: _action_types.ChannelTypes.REMOVE_CHANNEL_MEMBER_SUCCESS,
                                id: channelId
                            }], 'REMOVE_CHANNEL_MEMBER.BATCH'), getState);

                            return _context24.abrupt('return', { data: true });

                        case 14:
                        case 'end':
                            return _context24.stop();
                    }
                }
            }, _callee24, _this24, [[1, 6]]);
        }));

        return function (_x54, _x55) {
            return _ref24.apply(this, arguments);
        };
    }();
}

function updateChannelMemberRoles(channelId, userId, roles) {
    var _this25 = this;

    return function () {
        var _ref25 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee25(dispatch, getState) {
            var actions, membersInChannel;
            return regeneratorRuntime.wrap(function _callee25$(_context25) {
                while (1) {
                    switch (_context25.prev = _context25.next) {
                        case 0:
                            dispatch({ type: _action_types.ChannelTypes.UPDATE_CHANNEL_MEMBER_REQUEST }, getState);

                            _context25.prev = 1;
                            _context25.next = 4;
                            return _client.Client4.updateChannelMemberRoles(channelId, userId, roles);

                        case 4:
                            _context25.next = 11;
                            break;

                        case 6:
                            _context25.prev = 6;
                            _context25.t0 = _context25['catch'](1);

                            (0, _helpers.forceLogoutIfNecessary)(_context25.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.ChannelTypes.UPDATE_CHANNEL_MEMBER_FAILURE, error: _context25.t0 }, (0, _errors.logError)(_context25.t0)(dispatch)]), getState);
                            return _context25.abrupt('return', { error: _context25.t0 });

                        case 11:
                            actions = [{
                                type: _action_types.ChannelTypes.UPDATE_CHANNEL_MEMBER_SUCCESS
                            }];
                            membersInChannel = getState().entities.channels.membersInChannel[channelId];

                            if (membersInChannel && membersInChannel[userId]) {
                                actions.push({
                                    type: _action_types.ChannelTypes.RECEIVED_CHANNEL_MEMBER,
                                    data: _extends({}, membersInChannel[userId], { roles: roles })
                                });
                            }

                            dispatch((0, _reduxBatchedActions.batchActions)(actions), getState);

                            return _context25.abrupt('return', { data: true });

                        case 16:
                        case 'end':
                            return _context25.stop();
                    }
                }
            }, _callee25, _this25, [[1, 6]]);
        }));

        return function (_x56, _x57) {
            return _ref25.apply(this, arguments);
        };
    }();
}

function updateChannelHeader(channelId, header) {
    var _this26 = this;

    return function () {
        var _ref26 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee26(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee26$(_context26) {
                while (1) {
                    switch (_context26.prev = _context26.next) {
                        case 0:
                            _client.Client4.trackEvent('action', 'action_channels_update_header', { channel_id: channelId });

                            dispatch({
                                type: _action_types.ChannelTypes.UPDATE_CHANNEL_HEADER,
                                data: {
                                    channelId: channelId,
                                    header: header
                                }
                            }, getState);

                            return _context26.abrupt('return', { data: true });

                        case 3:
                        case 'end':
                            return _context26.stop();
                    }
                }
            }, _callee26, _this26);
        }));

        return function (_x58, _x59) {
            return _ref26.apply(this, arguments);
        };
    }();
}

function updateChannelPurpose(channelId, purpose) {
    var _this27 = this;

    return function () {
        var _ref27 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee27(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee27$(_context27) {
                while (1) {
                    switch (_context27.prev = _context27.next) {
                        case 0:
                            _client.Client4.trackEvent('action', 'action_channels_update_purpose', { channel_id: channelId });

                            dispatch({
                                type: _action_types.ChannelTypes.UPDATE_CHANNEL_PURPOSE,
                                data: {
                                    channelId: channelId,
                                    purpose: purpose
                                }
                            }, getState);

                            return _context27.abrupt('return', { data: true });

                        case 3:
                        case 'end':
                            return _context27.stop();
                    }
                }
            }, _callee27, _this27);
        }));

        return function (_x60, _x61) {
            return _ref27.apply(this, arguments);
        };
    }();
}

function markChannelAsRead(channelId, prevChannelId) {
    var updateLastViewedAt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    return function (dispatch, getState) {
        // Send channel last viewed at to the server
        if (updateLastViewedAt) {
            dispatch({ type: _action_types.ChannelTypes.UPDATE_LAST_VIEWED_REQUEST }, getState);

            _client.Client4.viewMyChannel(channelId, prevChannelId).then(function () {
                dispatch({ type: _action_types.ChannelTypes.UPDATE_LAST_VIEWED_SUCCESS }, getState);
            }).catch(function (error) {
                (0, _helpers.forceLogoutIfNecessary)(error, dispatch, getState);
                dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.ChannelTypes.UPDATE_LAST_VIEWED_FAILURE, error: error }, (0, _errors.logError)(error)(dispatch)]), getState);
                return { error: error };
            });
        }

        var state = getState();
        var _state$entities$chann2 = state.entities.channels,
            channels = _state$entities$chann2.channels,
            myMembers = _state$entities$chann2.myMembers;

        // Update channel member objects to set all mentions and posts as viewed

        var channel = channels[channelId];
        var prevChannel = channels[prevChannelId]; // May be null since prevChannelId is optional

        // Update team member objects to set mentions and posts in channel as viewed
        var channelMember = myMembers[channelId];
        var prevChannelMember = myMembers[prevChannelId]; // May also be null

        var actions = [];

        if (channel && channelMember) {
            actions.push({
                type: _action_types.ChannelTypes.DECREMENT_UNREAD_MSG_COUNT,
                data: {
                    teamId: channel.team_id,
                    channelId: channelId,
                    amount: channel.total_msg_count - channelMember.msg_count
                }
            });

            actions.push({
                type: _action_types.ChannelTypes.DECREMENT_UNREAD_MENTION_COUNT,
                data: {
                    teamId: channel.team_id,
                    channelId: channelId,
                    amount: channelMember.mention_count
                }
            });
        }

        if (prevChannel && prevChannelMember) {
            actions.push({
                type: _action_types.ChannelTypes.DECREMENT_UNREAD_MSG_COUNT,
                data: {
                    teamId: prevChannel.team_id,
                    channelId: prevChannelId,
                    amount: prevChannel.total_msg_count - prevChannelMember.msg_count
                }
            });

            actions.push({
                type: _action_types.ChannelTypes.DECREMENT_UNREAD_MENTION_COUNT,
                data: {
                    teamId: prevChannel.team_id,
                    channelId: prevChannelId,
                    amount: prevChannelMember.mention_count
                }
            });
        }

        if (actions.length > 0) {
            dispatch((0, _reduxBatchedActions.batchActions)(actions), getState);
        }

        return { data: true };
    };
}

// Increments the number of posts in the channel by 1 and marks it as unread if necessary
function markChannelAsUnread(teamId, channelId, mentions) {
    return function (dispatch, getState) {
        var state = getState();
        var myMembers = state.entities.channels.myMembers;
        var currentUserId = state.entities.users.currentUserId;


        var actions = [{
            type: _action_types.ChannelTypes.INCREMENT_TOTAL_MSG_COUNT,
            data: {
                channelId: channelId,
                amount: 1
            }
        }, {
            type: _action_types.ChannelTypes.INCREMENT_UNREAD_MSG_COUNT,
            data: {
                teamId: teamId,
                channelId: channelId,
                amount: 1,
                onlyMentions: myMembers[channelId] && myMembers[channelId].notify_props && myMembers[channelId].notify_props.mark_unread === _constants.General.MENTION
            }
        }];

        if (mentions && mentions.indexOf(currentUserId) !== -1) {
            actions.push({
                type: _action_types.ChannelTypes.INCREMENT_UNREAD_MENTION_COUNT,
                data: {
                    teamId: teamId,
                    channelId: channelId,
                    amount: 1
                }
            });
        }

        dispatch((0, _reduxBatchedActions.batchActions)(actions), getState);

        return { data: true };
    };
}

function getChannelMembersByIds(channelId, userIds) {
    return (0, _helpers.bindClientFunc)(_client.Client4.getChannelMembersByIds, _action_types.ChannelTypes.CHANNEL_MEMBERS_REQUEST, [_action_types.ChannelTypes.RECEIVED_CHANNEL_MEMBERS, _action_types.ChannelTypes.CHANNEL_MEMBERS_SUCCESS], _action_types.ChannelTypes.CHANNEL_MEMBERS_FAILURE, channelId, userIds);
}

function getChannelMember(channelId, userId) {
    return (0, _helpers.bindClientFunc)(_client.Client4.getChannelMember, _action_types.ChannelTypes.CHANNEL_MEMBERS_REQUEST, [_action_types.ChannelTypes.RECEIVED_CHANNEL_MEMBER, _action_types.ChannelTypes.CHANNEL_MEMBERS_SUCCESS], _action_types.ChannelTypes.CHANNEL_MEMBERS_FAILURE, channelId, userId);
}

function getMyChannelMember(channelId) {
    return (0, _helpers.bindClientFunc)(_client.Client4.getMyChannelMember, _action_types.ChannelTypes.CHANNEL_MEMBERS_REQUEST, [_action_types.ChannelTypes.RECEIVED_MY_CHANNEL_MEMBER, _action_types.ChannelTypes.CHANNEL_MEMBERS_SUCCESS], _action_types.ChannelTypes.CHANNEL_MEMBERS_FAILURE, channelId);
}

function favoriteChannel(channelId) {
    var _this28 = this;

    return function () {
        var _ref28 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee28(dispatch, getState) {
            var currentUserId, preference;
            return regeneratorRuntime.wrap(function _callee28$(_context28) {
                while (1) {
                    switch (_context28.prev = _context28.next) {
                        case 0:
                            currentUserId = getState().entities.users.currentUserId;
                            preference = {
                                user_id: currentUserId,
                                category: _constants.Preferences.CATEGORY_FAVORITE_CHANNEL,
                                name: channelId,
                                value: 'true'
                            };


                            _client.Client4.trackEvent('action', 'action_channels_favorite');

                            return _context28.abrupt('return', (0, _preferences.savePreferences)(currentUserId, [preference])(dispatch, getState));

                        case 4:
                        case 'end':
                            return _context28.stop();
                    }
                }
            }, _callee28, _this28);
        }));

        return function (_x63, _x64) {
            return _ref28.apply(this, arguments);
        };
    }();
}

function unfavoriteChannel(channelId) {
    var _this29 = this;

    return function () {
        var _ref29 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee29(dispatch, getState) {
            var currentUserId, preference;
            return regeneratorRuntime.wrap(function _callee29$(_context29) {
                while (1) {
                    switch (_context29.prev = _context29.next) {
                        case 0:
                            currentUserId = getState().entities.users.currentUserId;
                            preference = {
                                user_id: currentUserId,
                                category: _constants.Preferences.CATEGORY_FAVORITE_CHANNEL,
                                name: channelId
                            };


                            _client.Client4.trackEvent('action', 'action_channels_unfavorite');

                            return _context29.abrupt('return', (0, _preferences.deletePreferences)(currentUserId, [preference])(dispatch, getState));

                        case 4:
                        case 'end':
                            return _context29.stop();
                    }
                }
            }, _callee29, _this29);
        }));

        return function (_x65, _x66) {
            return _ref29.apply(this, arguments);
        };
    }();
}

exports.default = {
    selectChannel: selectChannel,
    createChannel: createChannel,
    createDirectChannel: createDirectChannel,
    updateChannel: updateChannel,
    patchChannel: patchChannel,
    updateChannelNotifyProps: updateChannelNotifyProps,
    getChannel: getChannel,
    fetchMyChannelsAndMembers: fetchMyChannelsAndMembers,
    getMyChannelMembers: getMyChannelMembers,
    getChannelMembersByIds: getChannelMembersByIds,
    leaveChannel: leaveChannel,
    joinChannel: joinChannel,
    deleteChannel: deleteChannel,
    viewChannel: viewChannel,
    markChannelAsViewed: markChannelAsViewed,
    getChannels: getChannels,
    autocompleteChannels: autocompleteChannels,
    searchChannels: searchChannels,
    getChannelStats: getChannelStats,
    addChannelMember: addChannelMember,
    removeChannelMember: removeChannelMember,
    updateChannelHeader: updateChannelHeader,
    updateChannelPurpose: updateChannelPurpose,
    markChannelAsRead: markChannelAsRead,
    markChannelAsUnread: markChannelAsUnread,
    favoriteChannel: favoriteChannel,
    unfavoriteChannel: unfavoriteChannel
};