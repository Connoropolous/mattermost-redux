'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.checkMfa = checkMfa;
exports.generateMfaSecret = generateMfaSecret;
exports.createUser = createUser;
exports.login = login;
exports.loginById = loginById;
exports.loadMe = loadMe;
exports.logout = logout;
exports.getProfiles = getProfiles;
exports.getMissingProfilesByIds = getMissingProfilesByIds;
exports.getProfilesByIds = getProfilesByIds;
exports.getProfilesByUsernames = getProfilesByUsernames;
exports.getProfilesInTeam = getProfilesInTeam;
exports.getProfilesNotInTeam = getProfilesNotInTeam;
exports.getProfilesWithoutTeam = getProfilesWithoutTeam;
exports.getProfilesInChannel = getProfilesInChannel;
exports.getProfilesNotInChannel = getProfilesNotInChannel;
exports.getMe = getMe;
exports.getUser = getUser;
exports.getUserByUsername = getUserByUsername;
exports.getUserByEmail = getUserByEmail;
exports.getStatusesByIdsBatchedDebounced = getStatusesByIdsBatchedDebounced;
exports.getStatusesByIds = getStatusesByIds;
exports.getStatus = getStatus;
exports.setStatus = setStatus;
exports.getSessions = getSessions;
exports.revokeSession = revokeSession;
exports.revokeAllSessionsForUser = revokeAllSessionsForUser;
exports.loadProfilesForDirect = loadProfilesForDirect;
exports.getUserAudits = getUserAudits;
exports.autocompleteUsers = autocompleteUsers;
exports.searchProfiles = searchProfiles;
exports.startPeriodicStatusUpdates = startPeriodicStatusUpdates;
exports.stopPeriodicStatusUpdates = stopPeriodicStatusUpdates;
exports.updateMe = updateMe;
exports.patchUser = patchUser;
exports.updateUserRoles = updateUserRoles;
exports.updateUserMfa = updateUserMfa;
exports.updateUserPassword = updateUserPassword;
exports.updateUserActive = updateUserActive;
exports.verifyUserEmail = verifyUserEmail;
exports.sendVerificationEmail = sendVerificationEmail;
exports.resetUserPassword = resetUserPassword;
exports.sendPasswordResetEmail = sendPasswordResetEmail;
exports.uploadProfileImage = uploadProfileImage;
exports.switchEmailToOAuth = switchEmailToOAuth;
exports.switchOAuthToEmail = switchOAuthToEmail;
exports.switchEmailToLdap = switchEmailToLdap;
exports.switchLdapToEmail = switchLdapToEmail;
exports.createUserAccessToken = createUserAccessToken;
exports.getUserAccessToken = getUserAccessToken;
exports.getUserAccessTokens = getUserAccessTokens;
exports.getUserAccessTokensForUser = getUserAccessTokensForUser;
exports.revokeUserAccessToken = revokeUserAccessToken;
exports.disableUserAccessToken = disableUserAccessToken;
exports.enableUserAccessToken = enableUserAccessToken;
exports.clearUserAccessTokens = clearUserAccessTokens;

var _reduxBatchedActions = require('redux-batched-actions');

var _client = require('../client');

var _constants = require('../constants');

var _action_types = require('../action_types');

var _emojis = require('./emojis');

var _teams = require('./teams');

var _channel_utils = require('../utils/channel_utils');

var _user_utils = require('../utils/user_utils');

var _helpers = require('../utils/helpers');

var _errors = require('./errors');

var _helpers2 = require('./helpers');

var _preferences = require('./preferences');

var _general = require('../selectors/entities/general');

var _users = require('../selectors/entities/users');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

function checkMfa(loginId) {
    var _this = this;

    return function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState) {
            var data;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            dispatch({ type: _action_types.UserTypes.CHECK_MFA_REQUEST }, getState);
                            _context.prev = 1;
                            _context.next = 4;
                            return _client.Client4.checkUserMfa(loginId);

                        case 4:
                            data = _context.sent;

                            dispatch({ type: _action_types.UserTypes.CHECK_MFA_SUCCESS }, getState);
                            return _context.abrupt('return', { data: data.mfa_required });

                        case 9:
                            _context.prev = 9;
                            _context.t0 = _context['catch'](1);

                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.UserTypes.CHECK_MFA_FAILURE, error: _context.t0 }, (0, _errors.logError)(_context.t0)(dispatch)]), getState);
                            return _context.abrupt('return', { error: _context.t0 });

                        case 13:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[1, 9]]);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();
}

function generateMfaSecret(userId) {
    return (0, _helpers2.bindClientFunc)(_client.Client4.generateMfaSecret, _action_types.UserTypes.MFA_SECRET_REQUEST, _action_types.UserTypes.MFA_SECRET_SUCCESS, _action_types.UserTypes.MFA_SECRET_FAILURE, userId);
}

function createUser(user, data, hash, inviteId) {
    var _this2 = this;

    return function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch, getState) {
            var created, profiles;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            dispatch({ type: _action_types.UserTypes.CREATE_USER_REQUEST }, getState);

                            created = void 0;
                            _context2.prev = 2;
                            _context2.next = 5;
                            return _client.Client4.createUser(user, data, hash, inviteId);

                        case 5:
                            created = _context2.sent;
                            _context2.next = 13;
                            break;

                        case 8:
                            _context2.prev = 8;
                            _context2.t0 = _context2['catch'](2);

                            (0, _helpers2.forceLogoutIfNecessary)(_context2.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.UserTypes.CREATE_USER_FAILURE,
                                error: _context2.t0
                            }, (0, _errors.logError)(_context2.t0)(dispatch)]), getState);
                            return _context2.abrupt('return', { error: _context2.t0 });

                        case 13:
                            profiles = {};

                            profiles[created.id] = created;
                            dispatch({ type: _action_types.UserTypes.RECEIVED_PROFILES, data: profiles });

                            return _context2.abrupt('return', { data: created });

                        case 17:
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

function login(loginId, password) {
    var _this3 = this;

    var mfaToken = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var ldapOnly = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    return function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dispatch, getState) {
            var deviceId, data;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            dispatch({ type: _action_types.UserTypes.LOGIN_REQUEST }, getState);

                            deviceId = getState().entities.general.deviceToken;
                            data = void 0;
                            _context3.prev = 3;
                            _context3.next = 6;
                            return _client.Client4.login(loginId, password, mfaToken, deviceId, ldapOnly);

                        case 6:
                            data = _context3.sent;

                            _client.Client.setToken(_client.Client4.getToken());
                            _context3.next = 14;
                            break;

                        case 10:
                            _context3.prev = 10;
                            _context3.t0 = _context3['catch'](3);

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.UserTypes.LOGIN_FAILURE,
                                error: _context3.t0
                            }, (0, _errors.logError)(_context3.t0)(dispatch)]), getState);
                            return _context3.abrupt('return', { error: _context3.t0 });

                        case 14:
                            _context3.next = 16;
                            return completeLogin(data)(dispatch, getState);

                        case 16:
                            return _context3.abrupt('return', _context3.sent);

                        case 17:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this3, [[3, 10]]);
        }));

        return function (_x7, _x8) {
            return _ref3.apply(this, arguments);
        };
    }();
}

function loginById(id, password) {
    var _this4 = this;

    var mfaToken = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    return function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(dispatch, getState) {
            var deviceId, data;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            dispatch({ type: _action_types.UserTypes.LOGIN_REQUEST }, getState);

                            deviceId = getState().entities.general.deviceToken;
                            data = void 0;
                            _context4.prev = 3;
                            _context4.next = 6;
                            return _client.Client4.loginById(id, password, mfaToken, deviceId);

                        case 6:
                            data = _context4.sent;
                            _context4.next = 13;
                            break;

                        case 9:
                            _context4.prev = 9;
                            _context4.t0 = _context4['catch'](3);

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.UserTypes.LOGIN_FAILURE,
                                error: _context4.t0
                            }, (0, _errors.logError)(_context4.t0)(dispatch)]), getState);
                            return _context4.abrupt('return', { error: _context4.t0 });

                        case 13:
                            _context4.next = 15;
                            return completeLogin(data)(dispatch, getState);

                        case 15:
                            return _context4.abrupt('return', _context4.sent);

                        case 16:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this4, [[3, 9]]);
        }));

        return function (_x10, _x11) {
            return _ref4.apply(this, arguments);
        };
    }();
}

function completeLogin(data) {
    var _this5 = this;

    return function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(dispatch, getState) {
            var teamMembers, membersRequest, unreadsRequest, teamUnreads, _loop, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, u, promises, state, serverVersion;

            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            dispatch({
                                type: _action_types.UserTypes.RECEIVED_ME,
                                data: data
                            });

                            _client.Client4.setUserId(data.id);

                            teamMembers = void 0;
                            _context5.prev = 3;
                            membersRequest = _client.Client4.getMyTeamMembers();
                            unreadsRequest = _client.Client4.getMyTeamUnreads();
                            _context5.next = 8;
                            return membersRequest;

                        case 8:
                            teamMembers = _context5.sent;
                            _context5.next = 11;
                            return unreadsRequest;

                        case 11:
                            teamUnreads = _context5.sent;

                            if (!teamUnreads) {
                                _context5.next = 33;
                                break;
                            }

                            _loop = function _loop(u) {
                                var index = teamMembers.findIndex(function (m) {
                                    return m.team_id === u.team_id;
                                });
                                var member = teamMembers[index];
                                member.mention_count = u.mention_count;
                                member.msg_count = u.msg_count;
                            };

                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context5.prev = 17;

                            for (_iterator = teamUnreads[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                u = _step.value;

                                _loop(u);
                            }
                            _context5.next = 25;
                            break;

                        case 21:
                            _context5.prev = 21;
                            _context5.t0 = _context5['catch'](17);
                            _didIteratorError = true;
                            _iteratorError = _context5.t0;

                        case 25:
                            _context5.prev = 25;
                            _context5.prev = 26;

                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }

                        case 28:
                            _context5.prev = 28;

                            if (!_didIteratorError) {
                                _context5.next = 31;
                                break;
                            }

                            throw _iteratorError;

                        case 31:
                            return _context5.finish(28);

                        case 32:
                            return _context5.finish(25);

                        case 33:
                            _context5.next = 39;
                            break;

                        case 35:
                            _context5.prev = 35;
                            _context5.t1 = _context5['catch'](3);

                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.UserTypes.LOGIN_FAILURE, error: _context5.t1 }, (0, _errors.logError)(_context5.t1)(dispatch)]), getState);
                            return _context5.abrupt('return', { error: _context5.t1 });

                        case 39:
                            promises = [(0, _preferences.getMyPreferences)()(dispatch, getState), (0, _teams.getMyTeams)()(dispatch, getState)];
                            state = getState();
                            serverVersion = _client.Client4.getServerVersion();

                            if (!(0, _helpers.isMinimumServerVersion)(serverVersion, 4, 7) && (0, _general.getConfig)(state).EnableCustomEmoji === 'true') {
                                dispatch((0, _emojis.getAllCustomEmojis)());
                            }

                            _context5.prev = 43;
                            _context5.next = 46;
                            return Promise.all(promises);

                        case 46:
                            _context5.next = 52;
                            break;

                        case 48:
                            _context5.prev = 48;
                            _context5.t2 = _context5['catch'](43);

                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.UserTypes.LOGIN_FAILURE, error: _context5.t2 }, (0, _errors.logError)(_context5.t2)(dispatch)]), getState);
                            return _context5.abrupt('return', { error: _context5.t2 });

                        case 52:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.TeamTypes.RECEIVED_MY_TEAM_MEMBERS,
                                data: teamMembers
                            }, {
                                type: _action_types.UserTypes.LOGIN_SUCCESS
                            }]), getState);

                            return _context5.abrupt('return', { data: true });

                        case 54:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, _this5, [[3, 35], [17, 21, 25, 33], [26,, 28, 32], [43, 48]]);
        }));

        return function (_x12, _x13) {
            return _ref5.apply(this, arguments);
        };
    }();
}

function loadMe() {
    var _this6 = this;

    return function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(dispatch, getState) {
            var state, deviceId, promises, serverVersion, currentUserId;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            state = getState();
                            deviceId = state.entities.general.deviceToken;

                            if (deviceId) {
                                _client.Client4.attachDevice(deviceId);
                            }

                            promises = [getMe()(dispatch, getState), (0, _preferences.getMyPreferences)()(dispatch, getState), (0, _teams.getMyTeams)()(dispatch, getState), (0, _teams.getMyTeamMembers)()(dispatch, getState), (0, _teams.getMyTeamUnreads)()(dispatch, getState)];

                            // Sometimes the server version is set in one or the other

                            serverVersion = _client.Client4.getServerVersion() || getState().entities.general.serverVersion;

                            if (!(0, _helpers.isMinimumServerVersion)(serverVersion, 4, 7) && (0, _general.getConfig)(state).EnableCustomEmoji === 'true') {
                                dispatch((0, _emojis.getAllCustomEmojis)());
                            }

                            _context6.next = 8;
                            return Promise.all(promises);

                        case 8:
                            currentUserId = getState().entities.users.currentUserId;

                            _client.Client4.setUserId(currentUserId);

                            return _context6.abrupt('return', { data: true });

                        case 11:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, _this6);
        }));

        return function (_x14, _x15) {
            return _ref6.apply(this, arguments);
        };
    }();
}

function logout() {
    var _this7 = this;

    return function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            dispatch({ type: _action_types.UserTypes.LOGOUT_REQUEST }, getState);

                            _context7.prev = 1;
                            _context7.next = 4;
                            return _client.Client4.logout();

                        case 4:
                            _context7.next = 8;
                            break;

                        case 6:
                            _context7.prev = 6;
                            _context7.t0 = _context7['catch'](1);

                        case 8:

                            _client.Client.setToken('');
                            dispatch({ type: _action_types.UserTypes.LOGOUT_SUCCESS }, getState);

                        case 10:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, _this7, [[1, 6]]);
        }));

        return function (_x16, _x17) {
            return _ref7.apply(this, arguments);
        };
    }();
}

function getProfiles() {
    var _this8 = this;

    var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var perPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.General.PROFILE_CHUNK_SIZE;

    return function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(dispatch, getState) {
            var currentUserId, profiles;
            return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            dispatch({ type: _action_types.UserTypes.PROFILES_REQUEST }, getState);

                            currentUserId = getState().entities.users.currentUserId;
                            profiles = void 0;
                            _context8.prev = 3;
                            _context8.next = 6;
                            return _client.Client4.getProfiles(page, perPage);

                        case 6:
                            profiles = _context8.sent;

                            (0, _user_utils.removeUserFromList)(currentUserId, profiles);
                            _context8.next = 15;
                            break;

                        case 10:
                            _context8.prev = 10;
                            _context8.t0 = _context8['catch'](3);

                            (0, _helpers2.forceLogoutIfNecessary)(_context8.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.UserTypes.PROFILES_FAILURE, error: _context8.t0 }, (0, _errors.logError)(_context8.t0)(dispatch)]), getState);
                            return _context8.abrupt('return', { error: _context8.t0 });

                        case 15:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.UserTypes.RECEIVED_PROFILES_LIST,
                                data: profiles
                            }, {
                                type: _action_types.UserTypes.PROFILES_SUCCESS
                            }]), getState);

                            return _context8.abrupt('return', { data: profiles });

                        case 17:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, _callee8, _this8, [[3, 10]]);
        }));

        return function (_x20, _x21) {
            return _ref8.apply(this, arguments);
        };
    }();
}

function getMissingProfilesByIds(userIds) {
    var _this9 = this;

    return function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(dispatch, getState) {
            var profiles, missingIds;
            return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            profiles = getState().entities.users.profiles;
                            missingIds = [];

                            userIds.forEach(function (id) {
                                if (!profiles[id]) {
                                    missingIds.push(id);
                                }
                            });

                            if (!(missingIds.length > 0)) {
                                _context9.next = 8;
                                break;
                            }

                            getStatusesByIds(missingIds)(dispatch, getState);
                            _context9.next = 7;
                            return getProfilesByIds(missingIds)(dispatch, getState);

                        case 7:
                            return _context9.abrupt('return', _context9.sent);

                        case 8:
                            return _context9.abrupt('return', { data: [] });

                        case 9:
                        case 'end':
                            return _context9.stop();
                    }
                }
            }, _callee9, _this9);
        }));

        return function (_x22, _x23) {
            return _ref9.apply(this, arguments);
        };
    }();
}

function getProfilesByIds(userIds) {
    var _this10 = this;

    return function () {
        var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(dispatch, getState) {
            var currentUserId, profiles;
            return regeneratorRuntime.wrap(function _callee10$(_context10) {
                while (1) {
                    switch (_context10.prev = _context10.next) {
                        case 0:
                            dispatch({ type: _action_types.UserTypes.PROFILES_REQUEST }, getState);

                            currentUserId = getState().entities.users.currentUserId;
                            profiles = void 0;
                            _context10.prev = 3;
                            _context10.next = 6;
                            return _client.Client4.getProfilesByIds(userIds);

                        case 6:
                            profiles = _context10.sent;

                            (0, _user_utils.removeUserFromList)(currentUserId, profiles);
                            _context10.next = 15;
                            break;

                        case 10:
                            _context10.prev = 10;
                            _context10.t0 = _context10['catch'](3);

                            (0, _helpers2.forceLogoutIfNecessary)(_context10.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.UserTypes.PROFILES_FAILURE, error: _context10.t0 }, (0, _errors.logError)(_context10.t0)(dispatch)]), getState);
                            return _context10.abrupt('return', { error: _context10.t0 });

                        case 15:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.UserTypes.RECEIVED_PROFILES_LIST,
                                data: profiles
                            }, {
                                type: _action_types.UserTypes.PROFILES_SUCCESS
                            }]), getState);

                            return _context10.abrupt('return', { data: profiles });

                        case 17:
                        case 'end':
                            return _context10.stop();
                    }
                }
            }, _callee10, _this10, [[3, 10]]);
        }));

        return function (_x24, _x25) {
            return _ref10.apply(this, arguments);
        };
    }();
}

function getProfilesByUsernames(usernames) {
    var _this11 = this;

    return function () {
        var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(dispatch, getState) {
            var currentUserId, profiles;
            return regeneratorRuntime.wrap(function _callee11$(_context11) {
                while (1) {
                    switch (_context11.prev = _context11.next) {
                        case 0:
                            dispatch({ type: _action_types.UserTypes.PROFILES_REQUEST }, getState);

                            currentUserId = getState().entities.users.currentUserId;
                            profiles = void 0;
                            _context11.prev = 3;
                            _context11.next = 6;
                            return _client.Client4.getProfilesByUsernames(usernames);

                        case 6:
                            profiles = _context11.sent;

                            (0, _user_utils.removeUserFromList)(currentUserId, profiles);
                            _context11.next = 15;
                            break;

                        case 10:
                            _context11.prev = 10;
                            _context11.t0 = _context11['catch'](3);

                            (0, _helpers2.forceLogoutIfNecessary)(_context11.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.UserTypes.PROFILES_FAILURE, error: _context11.t0 }, (0, _errors.logError)(_context11.t0)(dispatch)]), getState);
                            return _context11.abrupt('return', { error: _context11.t0 });

                        case 15:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.UserTypes.RECEIVED_PROFILES_LIST,
                                data: profiles
                            }, {
                                type: _action_types.UserTypes.PROFILES_SUCCESS
                            }]), getState);

                            return _context11.abrupt('return', { data: profiles });

                        case 17:
                        case 'end':
                            return _context11.stop();
                    }
                }
            }, _callee11, _this11, [[3, 10]]);
        }));

        return function (_x26, _x27) {
            return _ref11.apply(this, arguments);
        };
    }();
}

function getProfilesInTeam(teamId, page) {
    var _this12 = this;

    var perPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _constants.General.PROFILE_CHUNK_SIZE;
    var sort = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

    return function () {
        var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(dispatch, getState) {
            var currentUserId, profiles;
            return regeneratorRuntime.wrap(function _callee12$(_context12) {
                while (1) {
                    switch (_context12.prev = _context12.next) {
                        case 0:
                            dispatch({ type: _action_types.UserTypes.PROFILES_IN_TEAM_REQUEST }, getState);

                            currentUserId = getState().entities.users.currentUserId;
                            profiles = void 0;
                            _context12.prev = 3;
                            _context12.next = 6;
                            return _client.Client4.getProfilesInTeam(teamId, page, perPage, sort);

                        case 6:
                            profiles = _context12.sent;
                            _context12.next = 14;
                            break;

                        case 9:
                            _context12.prev = 9;
                            _context12.t0 = _context12['catch'](3);

                            (0, _helpers2.forceLogoutIfNecessary)(_context12.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.UserTypes.PROFILES_IN_TEAM_FAILURE, error: _context12.t0 }, (0, _errors.logError)(_context12.t0)(dispatch)]), getState);
                            return _context12.abrupt('return', { error: _context12.t0 });

                        case 14:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.UserTypes.RECEIVED_PROFILES_LIST_IN_TEAM,
                                data: profiles,
                                id: teamId
                            }, {
                                type: _action_types.UserTypes.RECEIVED_PROFILES_LIST,
                                data: (0, _user_utils.removeUserFromList)(currentUserId, [].concat(_toConsumableArray(profiles)))
                            }, {
                                type: _action_types.UserTypes.PROFILES_IN_TEAM_SUCCESS
                            }]), getState);

                            return _context12.abrupt('return', { data: profiles });

                        case 16:
                        case 'end':
                            return _context12.stop();
                    }
                }
            }, _callee12, _this12, [[3, 9]]);
        }));

        return function (_x30, _x31) {
            return _ref12.apply(this, arguments);
        };
    }();
}

function getProfilesNotInTeam(teamId, page) {
    var _this13 = this;

    var perPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _constants.General.PROFILE_CHUNK_SIZE;

    return function () {
        var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(dispatch, getState) {
            var profiles;
            return regeneratorRuntime.wrap(function _callee13$(_context13) {
                while (1) {
                    switch (_context13.prev = _context13.next) {
                        case 0:
                            dispatch({ type: _action_types.UserTypes.PROFILES_NOT_IN_TEAM_REQUEST }, getState);

                            profiles = void 0;
                            _context13.prev = 2;
                            _context13.next = 5;
                            return _client.Client4.getProfilesNotInTeam(teamId, page, perPage);

                        case 5:
                            profiles = _context13.sent;
                            _context13.next = 13;
                            break;

                        case 8:
                            _context13.prev = 8;
                            _context13.t0 = _context13['catch'](2);

                            (0, _helpers2.forceLogoutIfNecessary)(_context13.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.UserTypes.PROFILES_NOT_IN_TEAM_FAILURE, error: _context13.t0 }, (0, _errors.logError)(_context13.t0)(dispatch)]), getState);
                            return _context13.abrupt('return', { error: _context13.t0 });

                        case 13:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.UserTypes.RECEIVED_PROFILES_LIST_NOT_IN_TEAM,
                                data: profiles,
                                id: teamId
                            }, {
                                type: _action_types.UserTypes.RECEIVED_PROFILES_LIST,
                                data: profiles
                            }, {
                                type: _action_types.UserTypes.PROFILES_NOT_IN_TEAM_SUCCESS
                            }]), getState);

                            return _context13.abrupt('return', { data: profiles });

                        case 15:
                        case 'end':
                            return _context13.stop();
                    }
                }
            }, _callee13, _this13, [[2, 8]]);
        }));

        return function (_x33, _x34) {
            return _ref13.apply(this, arguments);
        };
    }();
}

function getProfilesWithoutTeam(page) {
    var _this14 = this;

    var perPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.General.PROFILE_CHUNK_SIZE;

    return function () {
        var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(dispatch, getState) {
            var profiles;
            return regeneratorRuntime.wrap(function _callee14$(_context14) {
                while (1) {
                    switch (_context14.prev = _context14.next) {
                        case 0:
                            dispatch({ type: _action_types.UserTypes.PROFILES_WITHOUT_TEAM_REQUEST }, getState);

                            profiles = void 0;
                            _context14.prev = 2;
                            _context14.next = 5;
                            return _client.Client4.getProfilesWithoutTeam(page, perPage);

                        case 5:
                            profiles = _context14.sent;
                            _context14.next = 13;
                            break;

                        case 8:
                            _context14.prev = 8;
                            _context14.t0 = _context14['catch'](2);

                            (0, _helpers2.forceLogoutIfNecessary)(_context14.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.UserTypes.PROFILES_WITHOUT_TEAM_FAILURE, error: _context14.t0 }, (0, _errors.logError)(_context14.t0)(dispatch)]), getState);
                            return _context14.abrupt('return', { error: _context14.t0 });

                        case 13:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.UserTypes.RECEIVED_PROFILES_LIST_WITHOUT_TEAM,
                                data: profiles
                            }, {
                                type: _action_types.UserTypes.RECEIVED_PROFILES_LIST,
                                data: profiles
                            }, {
                                type: _action_types.UserTypes.PROFILES_WITHOUT_TEAM_SUCCESS
                            }]), getState);

                            return _context14.abrupt('return', { data: profiles });

                        case 15:
                        case 'end':
                            return _context14.stop();
                    }
                }
            }, _callee14, _this14, [[2, 8]]);
        }));

        return function (_x36, _x37) {
            return _ref14.apply(this, arguments);
        };
    }();
}

function getProfilesInChannel(channelId, page) {
    var _this15 = this;

    var perPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _constants.General.PROFILE_CHUNK_SIZE;
    var sort = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

    return function () {
        var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(dispatch, getState) {
            var currentUserId, profiles;
            return regeneratorRuntime.wrap(function _callee15$(_context15) {
                while (1) {
                    switch (_context15.prev = _context15.next) {
                        case 0:
                            dispatch({ type: _action_types.UserTypes.PROFILES_IN_CHANNEL_REQUEST }, getState);

                            currentUserId = getState().entities.users.currentUserId;
                            profiles = void 0;
                            _context15.prev = 3;
                            _context15.next = 6;
                            return _client.Client4.getProfilesInChannel(channelId, page, perPage, sort);

                        case 6:
                            profiles = _context15.sent;
                            _context15.next = 14;
                            break;

                        case 9:
                            _context15.prev = 9;
                            _context15.t0 = _context15['catch'](3);

                            (0, _helpers2.forceLogoutIfNecessary)(_context15.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.UserTypes.PROFILES_IN_CHANNEL_FAILURE, error: _context15.t0 }, (0, _errors.logError)(_context15.t0)(dispatch)]), getState);
                            return _context15.abrupt('return', { error: _context15.t0 });

                        case 14:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.UserTypes.RECEIVED_PROFILES_LIST_IN_CHANNEL,
                                data: profiles,
                                id: channelId
                            }, {
                                type: _action_types.UserTypes.RECEIVED_PROFILES_LIST,
                                data: (0, _user_utils.removeUserFromList)(currentUserId, [].concat(_toConsumableArray(profiles)))
                            }, {
                                type: _action_types.UserTypes.PROFILES_IN_CHANNEL_SUCCESS
                            }]), getState);

                            return _context15.abrupt('return', { data: profiles });

                        case 16:
                        case 'end':
                            return _context15.stop();
                    }
                }
            }, _callee15, _this15, [[3, 9]]);
        }));

        return function (_x40, _x41) {
            return _ref15.apply(this, arguments);
        };
    }();
}

function getProfilesNotInChannel(teamId, channelId, page) {
    var _this16 = this;

    var perPage = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _constants.General.PROFILE_CHUNK_SIZE;

    return function () {
        var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(dispatch, getState) {
            var currentUserId, profiles;
            return regeneratorRuntime.wrap(function _callee16$(_context16) {
                while (1) {
                    switch (_context16.prev = _context16.next) {
                        case 0:
                            dispatch({ type: _action_types.UserTypes.PROFILES_NOT_IN_CHANNEL_REQUEST }, getState);

                            currentUserId = getState().entities.users.currentUserId;
                            profiles = void 0;
                            _context16.prev = 3;
                            _context16.next = 6;
                            return _client.Client4.getProfilesNotInChannel(teamId, channelId, page, perPage);

                        case 6:
                            profiles = _context16.sent;
                            _context16.next = 14;
                            break;

                        case 9:
                            _context16.prev = 9;
                            _context16.t0 = _context16['catch'](3);

                            (0, _helpers2.forceLogoutIfNecessary)(_context16.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.UserTypes.PROFILES_NOT_IN_CHANNEL_FAILURE, error: _context16.t0 }, (0, _errors.logError)(_context16.t0)(dispatch)]), getState);
                            return _context16.abrupt('return', { error: _context16.t0 });

                        case 14:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.UserTypes.RECEIVED_PROFILES_LIST_NOT_IN_CHANNEL,
                                data: profiles,
                                id: channelId
                            }, {
                                type: _action_types.UserTypes.RECEIVED_PROFILES_LIST,
                                data: (0, _user_utils.removeUserFromList)(currentUserId, [].concat(_toConsumableArray(profiles)))
                            }, {
                                type: _action_types.UserTypes.PROFILES_NOT_IN_CHANNEL_SUCCESS
                            }]), getState);

                            return _context16.abrupt('return', { data: profiles });

                        case 16:
                        case 'end':
                            return _context16.stop();
                    }
                }
            }, _callee16, _this16, [[3, 9]]);
        }));

        return function (_x43, _x44) {
            return _ref16.apply(this, arguments);
        };
    }();
}

function getMe() {
    return (0, _helpers2.bindClientFunc)(_client.Client4.getMe, _action_types.UserTypes.USER_REQUEST, [_action_types.UserTypes.RECEIVED_ME, _action_types.UserTypes.USER_SUCCESS], _action_types.UserTypes.USER_FAILURE);
}

function getUser(id) {
    return (0, _helpers2.bindClientFunc)(_client.Client4.getUser, _action_types.UserTypes.USER_REQUEST, [_action_types.UserTypes.RECEIVED_PROFILE, _action_types.UserTypes.USER_SUCCESS], _action_types.UserTypes.USER_FAILURE, id);
}

function getUserByUsername(username) {
    return (0, _helpers2.bindClientFunc)(_client.Client4.getUserByUsername, _action_types.UserTypes.USER_BY_USERNAME_REQUEST, [_action_types.UserTypes.RECEIVED_PROFILE, _action_types.UserTypes.USER_BY_USERNAME_SUCCESS], _action_types.UserTypes.USER_BY_USERNAME_FAILURE, username);
}

function getUserByEmail(email) {
    return (0, _helpers2.bindClientFunc)(_client.Client4.getUserByEmail, _action_types.UserTypes.USER_REQUEST, [_action_types.UserTypes.RECEIVED_PROFILE, _action_types.UserTypes.USER_SUCCESS], _action_types.UserTypes.USER_FAILURE, email);
}

// We create an array to hold the id's that we want to get a status for. We build our
// debounced function that will get called after a set period of idle time in which
// the array of id's will be passed to the getStatusesByIds with a cb that clears out
// the array. Helps with performance because instead of making 75 different calls for
// statuses, we are only making one call for 75 ids.
// We could maybe clean it up somewhat by storing the array of ids in redux state possbily?
var ids = [];
var debouncedGetStatusesByIds = (0, _helpers2.debounce)(function () {
    var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(dispatch, getState) {
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
            while (1) {
                switch (_context17.prev = _context17.next) {
                    case 0:
                        getStatusesByIds([].concat(_toConsumableArray(new Set(ids))))(dispatch, getState);

                    case 1:
                    case 'end':
                        return _context17.stop();
                }
            }
        }, _callee17, undefined);
    }));

    return function (_x45, _x46) {
        return _ref17.apply(this, arguments);
    };
}(), 20, false, function () {
    ids = [];
});
function getStatusesByIdsBatchedDebounced(id) {
    ids = [].concat(_toConsumableArray(ids), [id]);
    return debouncedGetStatusesByIds;
}

function getStatusesByIds(userIds) {
    return (0, _helpers2.bindClientFunc)(_client.Client4.getStatusesByIds, _action_types.UserTypes.PROFILES_STATUSES_REQUEST, [_action_types.UserTypes.RECEIVED_STATUSES, _action_types.UserTypes.PROFILES_STATUSES_SUCCESS], _action_types.UserTypes.PROFILES_STATUSES_FAILURE, userIds);
}

function getStatus(userId) {
    return (0, _helpers2.bindClientFunc)(_client.Client4.getStatus, _action_types.UserTypes.PROFILE_STATUS_REQUEST, [_action_types.UserTypes.RECEIVED_STATUS, _action_types.UserTypes.PROFILE_STATUS_SUCCESS], _action_types.UserTypes.PROFILE_STATUS_FAILURE, userId);
}

function setStatus(status) {
    var _this17 = this;

    return function () {
        var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee18$(_context18) {
                while (1) {
                    switch (_context18.prev = _context18.next) {
                        case 0:
                            dispatch({ type: _action_types.UserTypes.SET_STATUS_REQUEST }, getState);

                            _context18.prev = 1;
                            _context18.next = 4;
                            return _client.Client4.updateStatus(status);

                        case 4:
                            _context18.next = 11;
                            break;

                        case 6:
                            _context18.prev = 6;
                            _context18.t0 = _context18['catch'](1);

                            (0, _helpers2.forceLogoutIfNecessary)(_context18.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.UserTypes.SET_STATUS_FAILURE, error: _context18.t0 }, (0, _errors.logError)(_context18.t0)(dispatch)]), getState);
                            return _context18.abrupt('return', { error: _context18.t0 });

                        case 11:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.UserTypes.RECEIVED_STATUS,
                                data: status
                            }, {
                                type: _action_types.UserTypes.SET_STATUS_SUCCESS
                            }]), getState);

                            return _context18.abrupt('return', { data: status });

                        case 13:
                        case 'end':
                            return _context18.stop();
                    }
                }
            }, _callee18, _this17, [[1, 6]]);
        }));

        return function (_x47, _x48) {
            return _ref18.apply(this, arguments);
        };
    }();
}

function getSessions(userId) {
    return (0, _helpers2.bindClientFunc)(_client.Client4.getSessions, _action_types.UserTypes.SESSIONS_REQUEST, [_action_types.UserTypes.RECEIVED_SESSIONS, _action_types.UserTypes.SESSIONS_SUCCESS], _action_types.UserTypes.SESSIONS_FAILURE, userId);
}

function revokeSession(userId, sessionId) {
    var _this18 = this;

    return function () {
        var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee19$(_context19) {
                while (1) {
                    switch (_context19.prev = _context19.next) {
                        case 0:
                            dispatch({ type: _action_types.UserTypes.REVOKE_SESSION_REQUEST }, getState);

                            _context19.prev = 1;
                            _context19.next = 4;
                            return _client.Client4.revokeSession(userId, sessionId);

                        case 4:
                            _context19.next = 11;
                            break;

                        case 6:
                            _context19.prev = 6;
                            _context19.t0 = _context19['catch'](1);

                            (0, _helpers2.forceLogoutIfNecessary)(_context19.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.UserTypes.REVOKE_SESSION_FAILURE, error: _context19.t0 }, (0, _errors.logError)(_context19.t0)(dispatch)]), getState);
                            return _context19.abrupt('return', { error: _context19.t0 });

                        case 11:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.UserTypes.RECEIVED_REVOKED_SESSION,
                                sessionId: sessionId
                            }, {
                                type: _action_types.UserTypes.REVOKE_SESSION_SUCCESS
                            }]), getState);

                            return _context19.abrupt('return', { data: true });

                        case 13:
                        case 'end':
                            return _context19.stop();
                    }
                }
            }, _callee19, _this18, [[1, 6]]);
        }));

        return function (_x49, _x50) {
            return _ref19.apply(this, arguments);
        };
    }();
}

function revokeAllSessionsForUser(userId) {
    var _this19 = this;

    return function () {
        var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(dispatch, getState) {
            var data;
            return regeneratorRuntime.wrap(function _callee20$(_context20) {
                while (1) {
                    switch (_context20.prev = _context20.next) {
                        case 0:
                            dispatch({ type: _action_types.UserTypes.REVOKE_ALL_USER_SESSIONS_REQUEST }, getState);

                            _context20.prev = 1;
                            _context20.next = 4;
                            return _client.Client4.revokeAllSessionsForUser(userId);

                        case 4:
                            _context20.next = 11;
                            break;

                        case 6:
                            _context20.prev = 6;
                            _context20.t0 = _context20['catch'](1);

                            (0, _helpers2.forceLogoutIfNecessary)(_context20.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.UserTypes.REVOKE_ALL_USER_SESSIONS_FAILURE, error: _context20.t0 }, (0, _errors.logError)(_context20.t0)(dispatch)]), getState);
                            return _context20.abrupt('return', { error: _context20.t0 });

                        case 11:
                            data = { isCurrentUser: userId === (0, _users.getCurrentUserId)(getState()) };

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.UserTypes.REVOKE_ALL_USER_SESSIONS_SUCCESS,
                                data: data
                            }]), getState);

                            return _context20.abrupt('return', { data: true });

                        case 14:
                        case 'end':
                            return _context20.stop();
                    }
                }
            }, _callee20, _this19, [[1, 6]]);
        }));

        return function (_x51, _x52) {
            return _ref20.apply(this, arguments);
        };
    }();
}

function loadProfilesForDirect() {
    var _this20 = this;

    return function () {
        var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(dispatch, getState) {
            var state, config, _state$entities$chann, channels, myMembers, myPreferences, _state$entities$users, currentUserId, profiles, values, i, channel, member, otherUserId;

            return regeneratorRuntime.wrap(function _callee21$(_context21) {
                while (1) {
                    switch (_context21.prev = _context21.next) {
                        case 0:
                            state = getState();
                            config = state.entities.general.config;
                            _state$entities$chann = state.entities.channels, channels = _state$entities$chann.channels, myMembers = _state$entities$chann.myMembers;
                            myPreferences = state.entities.preferences.myPreferences;
                            _state$entities$users = state.entities.users, currentUserId = _state$entities$users.currentUserId, profiles = _state$entities$users.profiles;
                            values = Object.values(channels);
                            i = 0;

                        case 7:
                            if (!(i < values.length)) {
                                _context21.next = 16;
                                break;
                            }

                            channel = values[i];
                            member = myMembers[channel.id];

                            if (!(!(0, _channel_utils.isDirectChannel)(channel) && !(0, _channel_utils.isGroupChannel)(channel))) {
                                _context21.next = 12;
                                break;
                            }

                            return _context21.abrupt('continue', 13);

                        case 12:

                            if (member) {
                                if (member.mention_count > 0 && (0, _channel_utils.isDirectChannel)(channel)) {
                                    otherUserId = (0, _channel_utils.getUserIdFromChannelName)(currentUserId, channel.name);

                                    if (!(0, _channel_utils.isDirectChannelVisible)(profiles[otherUserId] || otherUserId, config, myPreferences, channel)) {
                                        (0, _preferences.makeDirectChannelVisibleIfNecessary)(otherUserId)(dispatch, getState);
                                    }
                                } else if ((member.mention_count > 0 || member.msg_count < channel.total_msg_count) && (0, _channel_utils.isGroupChannel)(channel) && !(0, _channel_utils.isGroupChannelVisible)(config, myPreferences, channel)) {
                                    (0, _preferences.makeGroupMessageVisibleIfNecessary)(channel.id)(dispatch, getState);
                                }
                            }

                        case 13:
                            i++;
                            _context21.next = 7;
                            break;

                        case 16:
                            return _context21.abrupt('return', { data: true });

                        case 17:
                        case 'end':
                            return _context21.stop();
                    }
                }
            }, _callee21, _this20);
        }));

        return function (_x53, _x54) {
            return _ref21.apply(this, arguments);
        };
    }();
}

function getUserAudits(userId) {
    var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var perPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _constants.General.AUDITS_CHUNK_SIZE;

    return (0, _helpers2.bindClientFunc)(_client.Client4.getUserAudits, _action_types.UserTypes.AUDITS_REQUEST, [_action_types.UserTypes.RECEIVED_AUDITS, _action_types.UserTypes.AUDITS_SUCCESS], _action_types.UserTypes.AUDITS_FAILURE, userId, page, perPage);
}

function autocompleteUsers(term) {
    var _this21 = this;

    var teamId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var channelId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    return function () {
        var _ref22 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22(dispatch, getState) {
            var currentUserId, data, users, actions;
            return regeneratorRuntime.wrap(function _callee22$(_context22) {
                while (1) {
                    switch (_context22.prev = _context22.next) {
                        case 0:
                            dispatch({ type: _action_types.UserTypes.AUTOCOMPLETE_USERS_REQUEST }, getState);

                            currentUserId = getState().entities.users.currentUserId;
                            data = void 0;
                            _context22.prev = 3;
                            _context22.next = 6;
                            return _client.Client4.autocompleteUsers(term, teamId, channelId);

                        case 6:
                            data = _context22.sent;
                            _context22.next = 14;
                            break;

                        case 9:
                            _context22.prev = 9;
                            _context22.t0 = _context22['catch'](3);

                            (0, _helpers2.forceLogoutIfNecessary)(_context22.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.UserTypes.AUTOCOMPLETE_USERS_FAILURE, error: _context22.t0 }, (0, _errors.logError)(_context22.t0)(dispatch)]), getState);
                            return _context22.abrupt('return', { error: _context22.t0 });

                        case 14:
                            users = [].concat(_toConsumableArray(data.users));

                            if (data.out_of_channel) {
                                users = [].concat(_toConsumableArray(users), _toConsumableArray(data.out_of_channel));
                            }
                            (0, _user_utils.removeUserFromList)(currentUserId, users);

                            actions = [{
                                type: _action_types.UserTypes.RECEIVED_PROFILES_LIST,
                                data: users
                            }, {
                                type: _action_types.UserTypes.AUTOCOMPLETE_USERS_SUCCESS
                            }];


                            if (channelId) {
                                actions.push({
                                    type: _action_types.UserTypes.RECEIVED_PROFILES_LIST_IN_CHANNEL,
                                    data: data.users,
                                    id: channelId
                                });
                                actions.push({
                                    type: _action_types.UserTypes.RECEIVED_PROFILES_LIST_NOT_IN_CHANNEL,
                                    data: data.out_of_channel,
                                    id: channelId
                                });
                            }

                            if (teamId) {
                                actions.push({
                                    type: _action_types.UserTypes.RECEIVED_PROFILES_LIST_IN_TEAM,
                                    data: users,
                                    id: teamId
                                });
                            }

                            dispatch((0, _reduxBatchedActions.batchActions)(actions), getState);

                            return _context22.abrupt('return', { data: data });

                        case 22:
                        case 'end':
                            return _context22.stop();
                    }
                }
            }, _callee22, _this21, [[3, 9]]);
        }));

        return function (_x59, _x60) {
            return _ref22.apply(this, arguments);
        };
    }();
}

function searchProfiles(term) {
    var _this22 = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return function () {
        var _ref23 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23(dispatch, getState) {
            var currentUserId, profiles, actions;
            return regeneratorRuntime.wrap(function _callee23$(_context23) {
                while (1) {
                    switch (_context23.prev = _context23.next) {
                        case 0:
                            dispatch({ type: _action_types.UserTypes.SEARCH_PROFILES_REQUEST }, getState);

                            currentUserId = getState().entities.users.currentUserId;
                            profiles = void 0;
                            _context23.prev = 3;
                            _context23.next = 6;
                            return _client.Client4.searchUsers(term, options);

                        case 6:
                            profiles = _context23.sent;
                            _context23.next = 14;
                            break;

                        case 9:
                            _context23.prev = 9;
                            _context23.t0 = _context23['catch'](3);

                            (0, _helpers2.forceLogoutIfNecessary)(_context23.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.UserTypes.SEARCH_PROFILES_FAILURE, error: _context23.t0 }, (0, _errors.logError)(_context23.t0)(dispatch)]), getState);
                            return _context23.abrupt('return', { error: _context23.t0 });

                        case 14:
                            actions = [{ type: _action_types.UserTypes.RECEIVED_PROFILES_LIST, data: (0, _user_utils.removeUserFromList)(currentUserId, [].concat(_toConsumableArray(profiles))) }];


                            if (options.in_channel_id) {
                                actions.push({
                                    type: _action_types.UserTypes.RECEIVED_PROFILES_LIST_IN_CHANNEL,
                                    data: profiles,
                                    id: options.in_channel_id
                                });
                            }

                            if (options.not_in_channel_id) {
                                actions.push({
                                    type: _action_types.UserTypes.RECEIVED_PROFILES_LIST_NOT_IN_CHANNEL,
                                    data: profiles,
                                    id: options.not_in_channel_id
                                });
                            }

                            if (options.team_id) {
                                actions.push({
                                    type: _action_types.UserTypes.RECEIVED_PROFILES_LIST_IN_TEAM,
                                    data: profiles,
                                    id: options.team_id
                                });
                            }

                            if (options.not_in_team_id) {
                                actions.push({
                                    type: _action_types.UserTypes.RECEIVED_PROFILES_LIST_NOT_IN_TEAM,
                                    data: profiles,
                                    id: options.not_in_team_id
                                });
                            }

                            dispatch((0, _reduxBatchedActions.batchActions)([].concat(actions, [{
                                type: _action_types.UserTypes.SEARCH_PROFILES_SUCCESS
                            }])), getState);

                            return _context23.abrupt('return', { data: profiles });

                        case 21:
                        case 'end':
                            return _context23.stop();
                    }
                }
            }, _callee23, _this22, [[3, 9]]);
        }));

        return function (_x62, _x63) {
            return _ref23.apply(this, arguments);
        };
    }();
}

var statusIntervalId = '';
function startPeriodicStatusUpdates() {
    var _this23 = this;

    return function () {
        var _ref24 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee24(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee24$(_context24) {
                while (1) {
                    switch (_context24.prev = _context24.next) {
                        case 0:
                            clearInterval(statusIntervalId);

                            statusIntervalId = setInterval(function () {
                                var statuses = getState().entities.users.statuses;


                                if (!statuses) {
                                    return;
                                }

                                var userIds = Object.keys(statuses);
                                if (!userIds.length) {
                                    return;
                                }

                                getStatusesByIds(userIds)(dispatch, getState);
                            }, _constants.General.STATUS_INTERVAL);

                            return _context24.abrupt('return', { data: true });

                        case 3:
                        case 'end':
                            return _context24.stop();
                    }
                }
            }, _callee24, _this23);
        }));

        return function (_x64, _x65) {
            return _ref24.apply(this, arguments);
        };
    }();
}

function stopPeriodicStatusUpdates() {
    var _this24 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee25() {
        return regeneratorRuntime.wrap(function _callee25$(_context25) {
            while (1) {
                switch (_context25.prev = _context25.next) {
                    case 0:
                        if (statusIntervalId) {
                            clearInterval(statusIntervalId);
                        }

                        return _context25.abrupt('return', { data: true });

                    case 2:
                    case 'end':
                        return _context25.stop();
                }
            }
        }, _callee25, _this24);
    }));
}

function updateMe(user) {
    var _this25 = this;

    return function () {
        var _ref26 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee26(dispatch, getState) {
            var data;
            return regeneratorRuntime.wrap(function _callee26$(_context26) {
                while (1) {
                    switch (_context26.prev = _context26.next) {
                        case 0:
                            dispatch({ type: _action_types.UserTypes.UPDATE_ME_REQUEST }, getState);

                            data = void 0;
                            _context26.prev = 2;
                            _context26.next = 5;
                            return _client.Client4.patchMe(user);

                        case 5:
                            data = _context26.sent;
                            _context26.next = 12;
                            break;

                        case 8:
                            _context26.prev = 8;
                            _context26.t0 = _context26['catch'](2);

                            dispatch({ type: _action_types.UserTypes.UPDATE_ME_FAILURE, error: _context26.t0 }, getState);
                            return _context26.abrupt('return', { error: _context26.t0 });

                        case 12:

                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.UserTypes.RECEIVED_ME, data: data }, { type: _action_types.UserTypes.UPDATE_ME_SUCCESS }]), getState);

                            return _context26.abrupt('return', { data: data });

                        case 14:
                        case 'end':
                            return _context26.stop();
                    }
                }
            }, _callee26, _this25, [[2, 8]]);
        }));

        return function (_x66, _x67) {
            return _ref26.apply(this, arguments);
        };
    }();
}

function patchUser(user) {
    var _this26 = this;

    return function () {
        var _ref27 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee27(dispatch, getState) {
            var data;
            return regeneratorRuntime.wrap(function _callee27$(_context27) {
                while (1) {
                    switch (_context27.prev = _context27.next) {
                        case 0:
                            dispatch({ type: _action_types.UserTypes.UPDATE_USER_REQUEST }, getState);

                            data = void 0;
                            _context27.prev = 2;
                            _context27.next = 5;
                            return _client.Client4.patchUser(user);

                        case 5:
                            data = _context27.sent;
                            _context27.next = 12;
                            break;

                        case 8:
                            _context27.prev = 8;
                            _context27.t0 = _context27['catch'](2);

                            dispatch({ type: _action_types.UserTypes.UPDATE_USER_FAILURE, error: _context27.t0 }, getState);
                            return _context27.abrupt('return', { error: _context27.t0 });

                        case 12:

                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.UserTypes.RECEIVED_PROFILE, data: data }, { type: _action_types.UserTypes.UPDATE_USER_SUCCESS }]), getState);

                            return _context27.abrupt('return', { data: data });

                        case 14:
                        case 'end':
                            return _context27.stop();
                    }
                }
            }, _callee27, _this26, [[2, 8]]);
        }));

        return function (_x68, _x69) {
            return _ref27.apply(this, arguments);
        };
    }();
}

function updateUserRoles(userId, roles) {
    var _this27 = this;

    return function () {
        var _ref28 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee28(dispatch, getState) {
            var actions, profile;
            return regeneratorRuntime.wrap(function _callee28$(_context28) {
                while (1) {
                    switch (_context28.prev = _context28.next) {
                        case 0:
                            dispatch({ type: _action_types.UserTypes.UPDATE_USER_REQUEST }, getState);

                            _context28.prev = 1;
                            _context28.next = 4;
                            return _client.Client4.updateUserRoles(userId, roles);

                        case 4:
                            _context28.next = 10;
                            break;

                        case 6:
                            _context28.prev = 6;
                            _context28.t0 = _context28['catch'](1);

                            dispatch({ type: _action_types.UserTypes.UPDATE_USER_FAILURE, error: _context28.t0 }, getState);
                            return _context28.abrupt('return', { error: _context28.t0 });

                        case 10:
                            actions = [{ type: _action_types.UserTypes.UPDATE_USER_SUCCESS }];
                            profile = getState().entities.users.profiles[userId];

                            if (profile) {
                                actions.push({ type: _action_types.UserTypes.RECEIVED_PROFILE, data: _extends({}, profile, { roles: roles }) });
                            }

                            dispatch((0, _reduxBatchedActions.batchActions)(actions), getState);

                            return _context28.abrupt('return', { data: true });

                        case 15:
                        case 'end':
                            return _context28.stop();
                    }
                }
            }, _callee28, _this27, [[1, 6]]);
        }));

        return function (_x70, _x71) {
            return _ref28.apply(this, arguments);
        };
    }();
}

function updateUserMfa(userId, activate) {
    var _this28 = this;

    var code = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    return function () {
        var _ref29 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee29(dispatch, getState) {
            var actions, profile;
            return regeneratorRuntime.wrap(function _callee29$(_context29) {
                while (1) {
                    switch (_context29.prev = _context29.next) {
                        case 0:
                            dispatch({ type: _action_types.UserTypes.UPDATE_USER_REQUEST }, getState);

                            _context29.prev = 1;
                            _context29.next = 4;
                            return _client.Client4.updateUserMfa(userId, activate, code);

                        case 4:
                            _context29.next = 10;
                            break;

                        case 6:
                            _context29.prev = 6;
                            _context29.t0 = _context29['catch'](1);

                            dispatch({ type: _action_types.UserTypes.UPDATE_USER_FAILURE, error: _context29.t0 }, getState);
                            return _context29.abrupt('return', { error: _context29.t0 });

                        case 10:
                            actions = [{ type: _action_types.UserTypes.UPDATE_USER_SUCCESS }];
                            profile = getState().entities.users.profiles[userId];

                            if (profile) {
                                actions.push({ type: _action_types.UserTypes.RECEIVED_PROFILE, data: _extends({}, profile, { mfa_active: activate }) });
                            }

                            dispatch((0, _reduxBatchedActions.batchActions)(actions), getState);

                            return _context29.abrupt('return', { data: true });

                        case 15:
                        case 'end':
                            return _context29.stop();
                    }
                }
            }, _callee29, _this28, [[1, 6]]);
        }));

        return function (_x73, _x74) {
            return _ref29.apply(this, arguments);
        };
    }();
}

function updateUserPassword(userId, currentPassword, newPassword) {
    var _this29 = this;

    return function () {
        var _ref30 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee30(dispatch, getState) {
            var actions, profile;
            return regeneratorRuntime.wrap(function _callee30$(_context30) {
                while (1) {
                    switch (_context30.prev = _context30.next) {
                        case 0:
                            dispatch({ type: _action_types.UserTypes.UPDATE_USER_REQUEST }, getState);

                            _context30.prev = 1;
                            _context30.next = 4;
                            return _client.Client4.updateUserPassword(userId, currentPassword, newPassword);

                        case 4:
                            _context30.next = 10;
                            break;

                        case 6:
                            _context30.prev = 6;
                            _context30.t0 = _context30['catch'](1);

                            dispatch({ type: _action_types.UserTypes.UPDATE_USER_FAILURE, error: _context30.t0 }, getState);
                            return _context30.abrupt('return', { error: _context30.t0 });

                        case 10:
                            actions = [{ type: _action_types.UserTypes.UPDATE_USER_SUCCESS }];
                            profile = getState().entities.users.profiles[userId];

                            if (profile) {
                                actions.push({ type: _action_types.UserTypes.RECEIVED_PROFILE, data: _extends({}, profile, { last_password_update_at: new Date().getTime() }) });
                            }

                            dispatch((0, _reduxBatchedActions.batchActions)(actions), getState);

                            return _context30.abrupt('return', { data: true });

                        case 15:
                        case 'end':
                            return _context30.stop();
                    }
                }
            }, _callee30, _this29, [[1, 6]]);
        }));

        return function (_x75, _x76) {
            return _ref30.apply(this, arguments);
        };
    }();
}

function updateUserActive(userId, active) {
    var _this30 = this;

    return function () {
        var _ref31 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee31(dispatch, getState) {
            var actions, profile, deleteAt;
            return regeneratorRuntime.wrap(function _callee31$(_context31) {
                while (1) {
                    switch (_context31.prev = _context31.next) {
                        case 0:
                            dispatch({ type: _action_types.UserTypes.UPDATE_USER_REQUEST }, getState);

                            _context31.prev = 1;
                            _context31.next = 4;
                            return _client.Client4.updateUserActive(userId, active);

                        case 4:
                            _context31.next = 10;
                            break;

                        case 6:
                            _context31.prev = 6;
                            _context31.t0 = _context31['catch'](1);

                            dispatch({ type: _action_types.UserTypes.UPDATE_USER_FAILURE, error: _context31.t0 }, getState);
                            return _context31.abrupt('return', { error: _context31.t0 });

                        case 10:
                            actions = [{ type: _action_types.UserTypes.UPDATE_USER_SUCCESS }];
                            profile = getState().entities.users.profiles[userId];

                            if (profile) {
                                deleteAt = active ? 0 : new Date().getTime();

                                actions.push({ type: _action_types.UserTypes.RECEIVED_PROFILE, data: _extends({}, profile, { delete_at: deleteAt }) });
                            }

                            dispatch((0, _reduxBatchedActions.batchActions)(actions), getState);

                            return _context31.abrupt('return', { data: true });

                        case 15:
                        case 'end':
                            return _context31.stop();
                    }
                }
            }, _callee31, _this30, [[1, 6]]);
        }));

        return function (_x77, _x78) {
            return _ref31.apply(this, arguments);
        };
    }();
}

function verifyUserEmail(token) {
    return (0, _helpers2.bindClientFunc)(_client.Client4.verifyUserEmail, _action_types.UserTypes.VERIFY_EMAIL_REQUEST, _action_types.UserTypes.VERIFY_EMAIL_SUCCESS, _action_types.UserTypes.VERIFY_EMAIL_FAILURE, token);
}

function sendVerificationEmail(email) {
    return (0, _helpers2.bindClientFunc)(_client.Client4.sendVerificationEmail, _action_types.UserTypes.VERIFY_EMAIL_REQUEST, _action_types.UserTypes.VERIFY_EMAIL_SUCCESS, _action_types.UserTypes.VERIFY_EMAIL_FAILURE, email);
}

function resetUserPassword(token, newPassword) {
    return (0, _helpers2.bindClientFunc)(_client.Client4.resetUserPassword, _action_types.UserTypes.PASSWORD_RESET_REQUEST, _action_types.UserTypes.PASSWORD_RESET_SUCCESS, _action_types.UserTypes.PASSWORD_RESET_FAILURE, token, newPassword);
}

function sendPasswordResetEmail(email) {
    return (0, _helpers2.bindClientFunc)(_client.Client4.sendPasswordResetEmail, _action_types.UserTypes.PASSWORD_RESET_REQUEST, _action_types.UserTypes.PASSWORD_RESET_SUCCESS, _action_types.UserTypes.PASSWORD_RESET_FAILURE, email);
}

function uploadProfileImage(userId, imageData) {
    var _this31 = this;

    return function () {
        var _ref32 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee32(dispatch, getState) {
            var actions, profile;
            return regeneratorRuntime.wrap(function _callee32$(_context32) {
                while (1) {
                    switch (_context32.prev = _context32.next) {
                        case 0:
                            dispatch({ type: _action_types.UserTypes.UPDATE_USER_REQUEST }, getState);

                            _context32.prev = 1;
                            _context32.next = 4;
                            return _client.Client4.uploadProfileImage(userId, imageData);

                        case 4:
                            _context32.next = 10;
                            break;

                        case 6:
                            _context32.prev = 6;
                            _context32.t0 = _context32['catch'](1);

                            dispatch({ type: _action_types.UserTypes.UPDATE_USER_FAILURE, error: _context32.t0 }, getState);
                            return _context32.abrupt('return', { error: _context32.t0 });

                        case 10:
                            actions = [{ type: _action_types.UserTypes.UPDATE_USER_SUCCESS }];
                            profile = getState().entities.users.profiles[userId];

                            if (profile) {
                                actions.push({ type: _action_types.UserTypes.RECEIVED_PROFILE, data: _extends({}, profile, { last_picture_update: new Date().getTime() }) });
                            }

                            dispatch((0, _reduxBatchedActions.batchActions)(actions), getState);

                            return _context32.abrupt('return', { data: true });

                        case 15:
                        case 'end':
                            return _context32.stop();
                    }
                }
            }, _callee32, _this31, [[1, 6]]);
        }));

        return function (_x79, _x80) {
            return _ref32.apply(this, arguments);
        };
    }();
}

function switchEmailToOAuth(service, email, password) {
    var mfaCode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

    return (0, _helpers2.bindClientFunc)(_client.Client4.switchEmailToOAuth, _action_types.UserTypes.SWITCH_LOGIN_REQUEST, _action_types.UserTypes.SWITCH_LOGIN_SUCCESS, _action_types.UserTypes.SWITCH_LOGIN_FAILURE, service, email, password, mfaCode);
}

function switchOAuthToEmail(currentService, email, password) {
    return (0, _helpers2.bindClientFunc)(_client.Client4.switchOAuthToEmail, _action_types.UserTypes.SWITCH_LOGIN_REQUEST, _action_types.UserTypes.SWITCH_LOGIN_SUCCESS, _action_types.UserTypes.SWITCH_LOGIN_FAILURE, currentService, email, password);
}

function switchEmailToLdap(email, emailPassword, ldapId, ldapPassword) {
    var mfaCode = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';

    return (0, _helpers2.bindClientFunc)(_client.Client4.switchEmailToLdap, _action_types.UserTypes.SWITCH_LOGIN_REQUEST, _action_types.UserTypes.SWITCH_LOGIN_SUCCESS, _action_types.UserTypes.SWITCH_LOGIN_FAILURE, email, emailPassword, ldapId, ldapPassword, mfaCode);
}

function switchLdapToEmail(ldapPassword, email, emailPassword) {
    var mfaCode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

    return (0, _helpers2.bindClientFunc)(_client.Client4.switchLdapToEmail, _action_types.UserTypes.SWITCH_LOGIN_REQUEST, _action_types.UserTypes.SWITCH_LOGIN_SUCCESS, _action_types.UserTypes.SWITCH_LOGIN_FAILURE, ldapPassword, email, emailPassword, mfaCode);
}

function createUserAccessToken(userId, description) {
    var _this32 = this;

    return function () {
        var _ref33 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee33(dispatch, getState) {
            var data, actions, currentUserId;
            return regeneratorRuntime.wrap(function _callee33$(_context33) {
                while (1) {
                    switch (_context33.prev = _context33.next) {
                        case 0:
                            dispatch({ type: _action_types.UserTypes.CREATE_USER_ACCESS_TOKEN_REQUEST });

                            data = void 0;
                            _context33.prev = 2;
                            _context33.next = 5;
                            return _client.Client4.createUserAccessToken(userId, description);

                        case 5:
                            data = _context33.sent;
                            _context33.next = 13;
                            break;

                        case 8:
                            _context33.prev = 8;
                            _context33.t0 = _context33['catch'](2);

                            (0, _helpers2.forceLogoutIfNecessary)(_context33.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.UserTypes.CREATE_USER_ACCESS_TOKEN_FAILURE, error: _context33.t0 }, (0, _errors.logError)(_context33.t0)(dispatch)]), getState);
                            return _context33.abrupt('return', { error: _context33.t0 });

                        case 13:
                            actions = [{
                                type: _action_types.UserTypes.CREATE_USER_ACCESS_TOKEN_SUCCESS
                            }, {
                                type: _action_types.AdminTypes.RECEIVED_USER_ACCESS_TOKEN,
                                data: _extends({}, data, { token: '' })
                            }];
                            currentUserId = getState().entities.users.currentUserId;

                            if (userId === currentUserId) {
                                actions.push({
                                    type: _action_types.UserTypes.RECEIVED_MY_USER_ACCESS_TOKEN,
                                    data: _extends({}, data, { token: '' })
                                });
                            }

                            dispatch((0, _reduxBatchedActions.batchActions)(actions));

                            return _context33.abrupt('return', { data: data });

                        case 18:
                        case 'end':
                            return _context33.stop();
                    }
                }
            }, _callee33, _this32, [[2, 8]]);
        }));

        return function (_x84, _x85) {
            return _ref33.apply(this, arguments);
        };
    }();
}

function getUserAccessToken(tokenId) {
    var _this33 = this;

    return function () {
        var _ref34 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee34(dispatch, getState) {
            var data, actions, currentUserId;
            return regeneratorRuntime.wrap(function _callee34$(_context34) {
                while (1) {
                    switch (_context34.prev = _context34.next) {
                        case 0:
                            dispatch({ type: _action_types.UserTypes.GET_USER_ACCESS_TOKEN_REQUEST });

                            data = void 0;
                            _context34.prev = 2;
                            _context34.next = 5;
                            return _client.Client4.getUserAccessToken(tokenId);

                        case 5:
                            data = _context34.sent;
                            _context34.next = 13;
                            break;

                        case 8:
                            _context34.prev = 8;
                            _context34.t0 = _context34['catch'](2);

                            (0, _helpers2.forceLogoutIfNecessary)(_context34.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.UserTypes.GET_USER_ACCESS_TOKEN_FAILURE, error: _context34.t0 }, (0, _errors.logError)(_context34.t0)(dispatch)]), getState);
                            return _context34.abrupt('return', { error: _context34.t0 });

                        case 13:
                            actions = [{
                                type: _action_types.UserTypes.GET_USER_ACCESS_TOKEN_SUCCESS
                            }, {
                                type: _action_types.AdminTypes.RECEIVED_USER_ACCESS_TOKEN,
                                data: data
                            }];
                            currentUserId = getState().entities.users.currentUserId;

                            if (data.user_id === currentUserId) {
                                actions.push({
                                    type: _action_types.UserTypes.RECEIVED_MY_USER_ACCESS_TOKEN,
                                    data: data
                                });
                            }

                            dispatch((0, _reduxBatchedActions.batchActions)(actions));

                            return _context34.abrupt('return', { data: data });

                        case 18:
                        case 'end':
                            return _context34.stop();
                    }
                }
            }, _callee34, _this33, [[2, 8]]);
        }));

        return function (_x86, _x87) {
            return _ref34.apply(this, arguments);
        };
    }();
}

function getUserAccessTokens() {
    var _this34 = this;

    var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var perPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.General.PROFILE_CHUNK_SIZE;

    return function () {
        var _ref35 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee35(dispatch, getState) {
            var data, actions;
            return regeneratorRuntime.wrap(function _callee35$(_context35) {
                while (1) {
                    switch (_context35.prev = _context35.next) {
                        case 0:
                            dispatch({ type: _action_types.UserTypes.GET_USER_ACCESS_TOKEN_REQUEST });
                            data = void 0;
                            _context35.prev = 2;
                            _context35.next = 5;
                            return _client.Client4.getUserAccessTokens(page, perPage);

                        case 5:
                            data = _context35.sent;
                            _context35.next = 13;
                            break;

                        case 8:
                            _context35.prev = 8;
                            _context35.t0 = _context35['catch'](2);

                            (0, _helpers2.forceLogoutIfNecessary)(_context35.t0, dispatch);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.UserTypes.GET_USER_ACCESS_TOKEN_FAILURE, error: _context35.t0 }, (0, _errors.logError)(_context35.t0)(dispatch)]), getState);
                            return _context35.abrupt('return', { error: _context35.t0 });

                        case 13:
                            actions = [{
                                type: _action_types.UserTypes.GET_USER_ACCESS_TOKEN_SUCCESS
                            }, {
                                type: _action_types.AdminTypes.RECEIVED_USER_ACCESS_TOKENS,
                                data: data
                            }];


                            dispatch((0, _reduxBatchedActions.batchActions)(actions));

                            return _context35.abrupt('return', { data: data });

                        case 16:
                        case 'end':
                            return _context35.stop();
                    }
                }
            }, _callee35, _this34, [[2, 8]]);
        }));

        return function (_x90, _x91) {
            return _ref35.apply(this, arguments);
        };
    }();
}

function getUserAccessTokensForUser(userId) {
    var _this35 = this;

    var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var perPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _constants.General.PROFILE_CHUNK_SIZE;

    return function () {
        var _ref36 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee36(dispatch, getState) {
            var data, actions, currentUserId;
            return regeneratorRuntime.wrap(function _callee36$(_context36) {
                while (1) {
                    switch (_context36.prev = _context36.next) {
                        case 0:
                            dispatch({ type: _action_types.UserTypes.GET_USER_ACCESS_TOKEN_REQUEST });

                            data = void 0;
                            _context36.prev = 2;
                            _context36.next = 5;
                            return _client.Client4.getUserAccessTokensForUser(userId, page, perPage);

                        case 5:
                            data = _context36.sent;
                            _context36.next = 13;
                            break;

                        case 8:
                            _context36.prev = 8;
                            _context36.t0 = _context36['catch'](2);

                            (0, _helpers2.forceLogoutIfNecessary)(_context36.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.UserTypes.GET_USER_ACCESS_TOKEN_FAILURE, error: _context36.t0 }, (0, _errors.logError)(_context36.t0)(dispatch)]), getState);
                            return _context36.abrupt('return', { error: _context36.t0 });

                        case 13:
                            actions = [{
                                type: _action_types.UserTypes.GET_USER_ACCESS_TOKEN_SUCCESS
                            }, {
                                type: _action_types.AdminTypes.RECEIVED_USER_ACCESS_TOKENS_FOR_USER,
                                data: data,
                                userId: userId
                            }];
                            currentUserId = getState().entities.users.currentUserId;

                            if (userId === currentUserId) {
                                actions.push({
                                    type: _action_types.UserTypes.RECEIVED_MY_USER_ACCESS_TOKENS,
                                    data: data
                                });
                            }

                            dispatch((0, _reduxBatchedActions.batchActions)(actions));

                            return _context36.abrupt('return', { data: data });

                        case 18:
                        case 'end':
                            return _context36.stop();
                    }
                }
            }, _callee36, _this35, [[2, 8]]);
        }));

        return function (_x94, _x95) {
            return _ref36.apply(this, arguments);
        };
    }();
}

function revokeUserAccessToken(tokenId) {
    var _this36 = this;

    return function () {
        var _ref37 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee37(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee37$(_context37) {
                while (1) {
                    switch (_context37.prev = _context37.next) {
                        case 0:
                            dispatch({ type: _action_types.UserTypes.REVOKE_USER_ACCESS_TOKEN_REQUEST });

                            _context37.prev = 1;
                            _context37.next = 4;
                            return _client.Client4.revokeUserAccessToken(tokenId);

                        case 4:
                            _context37.next = 11;
                            break;

                        case 6:
                            _context37.prev = 6;
                            _context37.t0 = _context37['catch'](1);

                            (0, _helpers2.forceLogoutIfNecessary)(_context37.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.UserTypes.REVOKE_USER_ACCESS_TOKEN_FAILURE, error: _context37.t0 }, (0, _errors.logError)(_context37.t0)(dispatch)]), getState);
                            return _context37.abrupt('return', { error: _context37.t0 });

                        case 11:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.UserTypes.REVOKE_USER_ACCESS_TOKEN_SUCCESS
                            }, {
                                type: _action_types.UserTypes.REVOKED_USER_ACCESS_TOKEN,
                                data: tokenId
                            }]));

                            return _context37.abrupt('return', { data: true });

                        case 13:
                        case 'end':
                            return _context37.stop();
                    }
                }
            }, _callee37, _this36, [[1, 6]]);
        }));

        return function (_x96, _x97) {
            return _ref37.apply(this, arguments);
        };
    }();
}

function disableUserAccessToken(tokenId) {
    var _this37 = this;

    return function () {
        var _ref38 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee38(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee38$(_context38) {
                while (1) {
                    switch (_context38.prev = _context38.next) {
                        case 0:
                            dispatch({ type: _action_types.UserTypes.DISABLE_USER_ACCESS_TOKEN_REQUEST });

                            _context38.prev = 1;
                            _context38.next = 4;
                            return _client.Client4.disableUserAccessToken(tokenId);

                        case 4:
                            _context38.next = 11;
                            break;

                        case 6:
                            _context38.prev = 6;
                            _context38.t0 = _context38['catch'](1);

                            (0, _helpers2.forceLogoutIfNecessary)(_context38.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.UserTypes.DISABLE_USER_ACCESS_TOKEN_FAILURE, error: _context38.t0 }, (0, _errors.logError)(_context38.t0)(dispatch)]), getState);
                            return _context38.abrupt('return', { error: _context38.t0 });

                        case 11:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.UserTypes.DISABLE_USER_ACCESS_TOKEN_SUCCESS
                            }, {
                                type: _action_types.UserTypes.DISABLED_USER_ACCESS_TOKEN,
                                data: tokenId
                            }]));

                            return _context38.abrupt('return', { data: true });

                        case 13:
                        case 'end':
                            return _context38.stop();
                    }
                }
            }, _callee38, _this37, [[1, 6]]);
        }));

        return function (_x98, _x99) {
            return _ref38.apply(this, arguments);
        };
    }();
}

function enableUserAccessToken(tokenId) {
    var _this38 = this;

    return function () {
        var _ref39 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee39(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee39$(_context39) {
                while (1) {
                    switch (_context39.prev = _context39.next) {
                        case 0:
                            dispatch({ type: _action_types.UserTypes.ENABLE_USER_ACCESS_TOKEN_REQUEST });

                            _context39.prev = 1;
                            _context39.next = 4;
                            return _client.Client4.enableUserAccessToken(tokenId);

                        case 4:
                            _context39.next = 11;
                            break;

                        case 6:
                            _context39.prev = 6;
                            _context39.t0 = _context39['catch'](1);

                            (0, _helpers2.forceLogoutIfNecessary)(_context39.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.UserTypes.ENABLE_USER_ACCESS_TOKEN_FAILURE, error: _context39.t0 }, (0, _errors.logError)(_context39.t0)(dispatch)]), getState);
                            return _context39.abrupt('return', { error: _context39.t0 });

                        case 11:

                            dispatch((0, _reduxBatchedActions.batchActions)([{
                                type: _action_types.UserTypes.ENABLE_USER_ACCESS_TOKEN_SUCCESS
                            }, {
                                type: _action_types.UserTypes.ENABLED_USER_ACCESS_TOKEN,
                                data: tokenId
                            }]));

                            return _context39.abrupt('return', { data: true });

                        case 13:
                        case 'end':
                            return _context39.stop();
                    }
                }
            }, _callee39, _this38, [[1, 6]]);
        }));

        return function (_x100, _x101) {
            return _ref39.apply(this, arguments);
        };
    }();
}

function clearUserAccessTokens() {
    var _this39 = this;

    return function () {
        var _ref40 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee40(dispatch) {
            return regeneratorRuntime.wrap(function _callee40$(_context40) {
                while (1) {
                    switch (_context40.prev = _context40.next) {
                        case 0:
                            dispatch({ type: _action_types.UserTypes.CLEAR_MY_USER_ACCESS_TOKENS });
                            return _context40.abrupt('return', { data: true });

                        case 2:
                        case 'end':
                            return _context40.stop();
                    }
                }
            }, _callee40, _this39);
        }));

        return function (_x102) {
            return _ref40.apply(this, arguments);
        };
    }();
}

exports.default = {
    checkMfa: checkMfa,
    generateMfaSecret: generateMfaSecret,
    login: login,
    logout: logout,
    getProfiles: getProfiles,
    getProfilesByIds: getProfilesByIds,
    getProfilesInTeam: getProfilesInTeam,
    getProfilesInChannel: getProfilesInChannel,
    getProfilesNotInChannel: getProfilesNotInChannel,
    getUser: getUser,
    getMe: getMe,
    getUserByUsername: getUserByUsername,
    getStatus: getStatus,
    getStatusesByIds: getStatusesByIds,
    getSessions: getSessions,
    loadProfilesForDirect: loadProfilesForDirect,
    revokeSession: revokeSession,
    revokeAllSessionsForUser: revokeAllSessionsForUser,
    getUserAudits: getUserAudits,
    searchProfiles: searchProfiles,
    startPeriodicStatusUpdates: startPeriodicStatusUpdates,
    stopPeriodicStatusUpdates: stopPeriodicStatusUpdates,
    updateMe: updateMe,
    updateUserRoles: updateUserRoles,
    updateUserMfa: updateUserMfa,
    updateUserPassword: updateUserPassword,
    updateUserActive: updateUserActive,
    verifyUserEmail: verifyUserEmail,
    sendVerificationEmail: sendVerificationEmail,
    resetUserPassword: resetUserPassword,
    sendPasswordResetEmail: sendPasswordResetEmail,
    uploadProfileImage: uploadProfileImage,
    switchEmailToOAuth: switchEmailToOAuth,
    switchOAuthToEmail: switchOAuthToEmail,
    switchEmailToLdap: switchEmailToLdap,
    switchLdapToEmail: switchLdapToEmail,
    createUserAccessToken: createUserAccessToken,
    getUserAccessToken: getUserAccessToken,
    getUserAccessTokensForUser: getUserAccessTokensForUser,
    revokeUserAccessToken: revokeUserAccessToken,
    disableUserAccessToken: disableUserAccessToken,
    enableUserAccessToken: enableUserAccessToken
};