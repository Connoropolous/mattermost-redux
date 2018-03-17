'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

var _event_emitter = require('../utils/event_emitter');

var _event_emitter2 = _interopRequireDefault(_event_emitter);

var _constants = require('../constants');

var _fetch_etag = require('./fetch_etag');

var _fetch_etag2 = _interopRequireDefault(_fetch_etag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormData = require('form-data');

var HEADER_AUTH = 'Authorization';
var HEADER_BEARER = 'BEARER';
var HEADER_REQUESTED_WITH = 'X-Requested-With';
var HEADER_TOKEN = 'Token';
var HEADER_X_VERSION_ID = 'X-Version-Id';
var HEADER_USER_AGENT = 'User-Agent';
var HEADER_ACCEPT_LANGUAGE = 'Accept-Language';

var Client = function () {
    function Client() {
        var _this = this;

        _classCallCheck(this, Client);

        this.getClientConfig = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            return _context.abrupt('return', _this.doFetch(_this.getGeneralRoute() + '/client_props', { method: 'get' }));

                        case 1:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));
        this.getLicenseConfig = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            return _context2.abrupt('return', _this.doFetch(_this.getLicenseRoute() + '/client_config', { method: 'get' }));

                        case 1:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this);
        }));
        this.getPing = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            return _context3.abrupt('return', _this.doFetch(_this.getGeneralRoute() + '/ping?time=' + Date.now(), { method: 'get' }));

                        case 1:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this);
        }));

        this.logClientError = function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(message) {
                var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ERROR';
                var body;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                body = {
                                    message: message,
                                    level: level
                                };
                                return _context4.abrupt('return', _this.doFetch(_this.getGeneralRoute() + '/log_client', { method: 'post', body: JSON.stringify(body) }));

                            case 2:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, _this);
            }));

            return function (_x) {
                return _ref4.apply(this, arguments);
            };
        }();

        this.createUser = function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(user) {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                return _context5.abrupt('return', _this.createUserWithInvite(user));

                            case 1:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, _this);
            }));

            return function (_x3) {
                return _ref5.apply(this, arguments);
            };
        }();

        this.createUserWithInvite = function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(user, data, emailHash, inviteId) {
                var url;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                url = _this.getUsersRoute() + '/create';


                                url += '?d=' + encodeURIComponent(data);

                                if (emailHash) {
                                    url += '&h=' + encodeURIComponent(emailHash);
                                }

                                if (inviteId) {
                                    url += '&iid=' + encodeURIComponent(inviteId);
                                }

                                return _context6.abrupt('return', _this.doFetch(url, { method: 'post', body: JSON.stringify(user) }));

                            case 5:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, _this);
            }));

            return function (_x4, _x5, _x6, _x7) {
                return _ref6.apply(this, arguments);
            };
        }();

        this.checkMfa = function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(loginId) {
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                return _context7.abrupt('return', _this.doFetch(_this.getUsersRoute() + '/mfa', { method: 'post', body: JSON.stringify({ login_id: loginId }) }));

                            case 1:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, _this);
            }));

            return function (_x8) {
                return _ref7.apply(this, arguments);
            };
        }();

        this.login = function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(loginId, password) {
                var token = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
                var deviceId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

                var body, _ref9, headers, data;

                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                body = {
                                    device_id: deviceId,
                                    login_id: loginId,
                                    password: password,
                                    token: token
                                };
                                _context8.next = 3;
                                return _this.doFetchWithResponse(_this.getUsersRoute() + '/login', { method: 'post', body: JSON.stringify(body) });

                            case 3:
                                _ref9 = _context8.sent;
                                headers = _ref9.headers;
                                data = _ref9.data;


                                if (headers.has(HEADER_TOKEN)) {
                                    _this.token = headers.get(HEADER_TOKEN);
                                }

                                return _context8.abrupt('return', data);

                            case 8:
                            case 'end':
                                return _context8.stop();
                        }
                    }
                }, _callee8, _this);
            }));

            return function (_x9, _x10) {
                return _ref8.apply(this, arguments);
            };
        }();

        this.logout = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
            var _ref11, response;

            return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            _context9.next = 2;
                            return _this.doFetchWithResponse(_this.getUsersRoute() + '/logout', { method: 'post' });

                        case 2:
                            _ref11 = _context9.sent;
                            response = _ref11.response;

                            if (response.ok) {
                                _this.token = '';
                            }
                            _this.serverVersion = '';
                            return _context9.abrupt('return', response);

                        case 7:
                        case 'end':
                            return _context9.stop();
                    }
                }
            }, _callee9, _this);
        }));

        this.attachDevice = function () {
            var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(deviceId) {
                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                return _context10.abrupt('return', _this.doFetch(_this.getUsersRoute() + '/attach_device', { method: 'post', body: JSON.stringify({ device_id: deviceId }) }));

                            case 1:
                            case 'end':
                                return _context10.stop();
                        }
                    }
                }, _callee10, _this);
            }));

            return function (_x13) {
                return _ref12.apply(this, arguments);
            };
        }();

        this.updateUser = function () {
            var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(user) {
                return regeneratorRuntime.wrap(function _callee11$(_context11) {
                    while (1) {
                        switch (_context11.prev = _context11.next) {
                            case 0:
                                return _context11.abrupt('return', _this.doFetch(_this.getUsersRoute() + '/update', { method: 'post', body: JSON.stringify(user) }));

                            case 1:
                            case 'end':
                                return _context11.stop();
                        }
                    }
                }, _callee11, _this);
            }));

            return function (_x14) {
                return _ref13.apply(this, arguments);
            };
        }();

        this.updatePassword = function () {
            var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(userId, currentPassword, newPassword) {
                var data;
                return regeneratorRuntime.wrap(function _callee12$(_context12) {
                    while (1) {
                        switch (_context12.prev = _context12.next) {
                            case 0:
                                data = {
                                    user_id: userId,
                                    current_password: currentPassword,
                                    new_password: newPassword
                                };
                                return _context12.abrupt('return', _this.doFetch(_this.getUsersRoute() + '/newpassword', { method: 'post', body: JSON.stringify(data) }));

                            case 2:
                            case 'end':
                                return _context12.stop();
                        }
                    }
                }, _callee12, _this);
            }));

            return function (_x15, _x16, _x17) {
                return _ref14.apply(this, arguments);
            };
        }();

        this.updateUserNotifyProps = function () {
            var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(notifyProps) {
                return regeneratorRuntime.wrap(function _callee13$(_context13) {
                    while (1) {
                        switch (_context13.prev = _context13.next) {
                            case 0:
                                return _context13.abrupt('return', _this.doFetch(_this.getUsersRoute() + '/update_notify', { method: 'post', body: JSON.stringify(notifyProps) }));

                            case 1:
                            case 'end':
                                return _context13.stop();
                        }
                    }
                }, _callee13, _this);
            }));

            return function (_x18) {
                return _ref15.apply(this, arguments);
            };
        }();

        this.updateUserRoles = function () {
            var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(userId, newRoles) {
                return regeneratorRuntime.wrap(function _callee14$(_context14) {
                    while (1) {
                        switch (_context14.prev = _context14.next) {
                            case 0:
                                return _context14.abrupt('return', _this.doFetch(_this.getUserNeededRoute(userId) + '/update_roles', { method: 'post', body: JSON.stringify({ new_roles: newRoles }) }));

                            case 1:
                            case 'end':
                                return _context14.stop();
                        }
                    }
                }, _callee14, _this);
            }));

            return function (_x19, _x20) {
                return _ref16.apply(this, arguments);
            };
        }();

        this.getMe = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
            return regeneratorRuntime.wrap(function _callee15$(_context15) {
                while (1) {
                    switch (_context15.prev = _context15.next) {
                        case 0:
                            return _context15.abrupt('return', _this.doFetch(_this.getUsersRoute() + '/me', { method: 'get' }));

                        case 1:
                        case 'end':
                            return _context15.stop();
                    }
                }
            }, _callee15, _this);
        }));

        this.getProfiles = function () {
            var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(offset, limit) {
                return regeneratorRuntime.wrap(function _callee16$(_context16) {
                    while (1) {
                        switch (_context16.prev = _context16.next) {
                            case 0:
                                return _context16.abrupt('return', _this.doFetch(_this.getUsersRoute() + '/' + offset + '/' + limit, { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context16.stop();
                        }
                    }
                }, _callee16, _this);
            }));

            return function (_x21, _x22) {
                return _ref18.apply(this, arguments);
            };
        }();

        this.getProfilesByIds = function () {
            var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(userIds) {
                return regeneratorRuntime.wrap(function _callee17$(_context17) {
                    while (1) {
                        switch (_context17.prev = _context17.next) {
                            case 0:
                                return _context17.abrupt('return', _this.doFetch(_this.getUsersRoute() + '/ids', { method: 'post', body: JSON.stringify(userIds) }));

                            case 1:
                            case 'end':
                                return _context17.stop();
                        }
                    }
                }, _callee17, _this);
            }));

            return function (_x23) {
                return _ref19.apply(this, arguments);
            };
        }();

        this.getProfilesInTeam = function () {
            var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(teamId, offset, limit) {
                return regeneratorRuntime.wrap(function _callee18$(_context18) {
                    while (1) {
                        switch (_context18.prev = _context18.next) {
                            case 0:
                                return _context18.abrupt('return', _this.doFetch(_this.getTeamNeededRoute(teamId) + '/users/' + offset + '/' + limit, { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context18.stop();
                        }
                    }
                }, _callee18, _this);
            }));

            return function (_x24, _x25, _x26) {
                return _ref20.apply(this, arguments);
            };
        }();

        this.getProfilesInChannel = function () {
            var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(teamId, channelId, offset, limit) {
                return regeneratorRuntime.wrap(function _callee19$(_context19) {
                    while (1) {
                        switch (_context19.prev = _context19.next) {
                            case 0:
                                return _context19.abrupt('return', _this.doFetch(_this.getChannelNeededRoute(teamId, channelId) + '/users/' + offset + '/' + limit, { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context19.stop();
                        }
                    }
                }, _callee19, _this);
            }));

            return function (_x27, _x28, _x29, _x30) {
                return _ref21.apply(this, arguments);
            };
        }();

        this.getProfilesNotInChannel = function () {
            var _ref22 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(teamId, channelId, offset, limit) {
                return regeneratorRuntime.wrap(function _callee20$(_context20) {
                    while (1) {
                        switch (_context20.prev = _context20.next) {
                            case 0:
                                return _context20.abrupt('return', _this.doFetch(_this.getChannelNeededRoute(teamId, channelId) + '/users/not_in_channel/' + offset + '/' + limit, { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context20.stop();
                        }
                    }
                }, _callee20, _this);
            }));

            return function (_x31, _x32, _x33, _x34) {
                return _ref22.apply(this, arguments);
            };
        }();

        this.getUser = function () {
            var _ref23 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(userId) {
                return regeneratorRuntime.wrap(function _callee21$(_context21) {
                    while (1) {
                        switch (_context21.prev = _context21.next) {
                            case 0:
                                return _context21.abrupt('return', _this.doFetch(_this.getUserNeededRoute(userId) + '/get', { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context21.stop();
                        }
                    }
                }, _callee21, _this);
            }));

            return function (_x35) {
                return _ref23.apply(this, arguments);
            };
        }();

        this.getUserByUsername = function () {
            var _ref24 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22(username) {
                return regeneratorRuntime.wrap(function _callee22$(_context22) {
                    while (1) {
                        switch (_context22.prev = _context22.next) {
                            case 0:
                                return _context22.abrupt('return', _this.doFetch(_this.getUsersRoute() + '/name/' + username, { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context22.stop();
                        }
                    }
                }, _callee22, _this);
            }));

            return function (_x36) {
                return _ref24.apply(this, arguments);
            };
        }();

        this.getStatusesByIds = function () {
            var _ref25 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23(userIds) {
                return regeneratorRuntime.wrap(function _callee23$(_context23) {
                    while (1) {
                        switch (_context23.prev = _context23.next) {
                            case 0:
                                return _context23.abrupt('return', _this.doFetch(_this.getUsersRoute() + '/status/ids', { method: 'post', body: JSON.stringify(userIds) }));

                            case 1:
                            case 'end':
                                return _context23.stop();
                        }
                    }
                }, _callee23, _this);
            }));

            return function (_x37) {
                return _ref25.apply(this, arguments);
            };
        }();

        this.getSessions = function () {
            var _ref26 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee24(userId) {
                return regeneratorRuntime.wrap(function _callee24$(_context24) {
                    while (1) {
                        switch (_context24.prev = _context24.next) {
                            case 0:
                                return _context24.abrupt('return', _this.doFetch(_this.getUserNeededRoute(userId) + '/sessions', { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context24.stop();
                        }
                    }
                }, _callee24, _this);
            }));

            return function (_x38) {
                return _ref26.apply(this, arguments);
            };
        }();

        this.revokeSession = function () {
            var _ref27 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee25(id) {
                return regeneratorRuntime.wrap(function _callee25$(_context25) {
                    while (1) {
                        switch (_context25.prev = _context25.next) {
                            case 0:
                                return _context25.abrupt('return', _this.doFetch(_this.getUsersRoute() + '/revoke_session', { method: 'post', body: JSON.stringify({ id: id }) }));

                            case 1:
                            case 'end':
                                return _context25.stop();
                        }
                    }
                }, _callee25, _this);
            }));

            return function (_x39) {
                return _ref27.apply(this, arguments);
            };
        }();

        this.getAudits = function () {
            var _ref28 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee26(userId) {
                return regeneratorRuntime.wrap(function _callee26$(_context26) {
                    while (1) {
                        switch (_context26.prev = _context26.next) {
                            case 0:
                                return _context26.abrupt('return', _this.doFetch(_this.getUserNeededRoute(userId) + '/audits', { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context26.stop();
                        }
                    }
                }, _callee26, _this);
            }));

            return function (_x40) {
                return _ref28.apply(this, arguments);
            };
        }();

        this.getProfilePictureUrl = function (userId, lastPictureUpdate) {
            var params = '';
            if (lastPictureUpdate) {
                params = '?_=' + lastPictureUpdate;
            }

            return _this.getUsersRoute() + '/' + userId + '/image' + params;
        };

        this.autocompleteUsersInChannel = function (teamId, channelId, term) {
            return _this.doFetch(_this.getChannelNeededRoute(teamId, channelId) + '/users/autocomplete?term=' + encodeURIComponent(term), { method: 'get' });
        };

        this.searchProfiles = function (term, options) {
            return _this.doFetch(_this.getUsersRoute() + '/search', { method: 'post', body: JSON.stringify(_extends({ term: term }, options)) });
        };

        this.createTeam = function () {
            var _ref29 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee27(team) {
                return regeneratorRuntime.wrap(function _callee27$(_context27) {
                    while (1) {
                        switch (_context27.prev = _context27.next) {
                            case 0:
                                return _context27.abrupt('return', _this.doFetch(_this.getTeamsRoute() + '/create', { method: 'post', body: JSON.stringify(team) }));

                            case 1:
                            case 'end':
                                return _context27.stop();
                        }
                    }
                }, _callee27, _this);
            }));

            return function (_x41) {
                return _ref29.apply(this, arguments);
            };
        }();

        this.updateTeam = function () {
            var _ref30 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee28(team) {
                return regeneratorRuntime.wrap(function _callee28$(_context28) {
                    while (1) {
                        switch (_context28.prev = _context28.next) {
                            case 0:
                                return _context28.abrupt('return', _this.doFetch(_this.getTeamNeededRoute(team.id) + '/update', { method: 'post', body: JSON.stringify(team) }));

                            case 1:
                            case 'end':
                                return _context28.stop();
                        }
                    }
                }, _callee28, _this);
            }));

            return function (_x42) {
                return _ref30.apply(this, arguments);
            };
        }();

        this.getAllTeams = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee29() {
            return regeneratorRuntime.wrap(function _callee29$(_context29) {
                while (1) {
                    switch (_context29.prev = _context29.next) {
                        case 0:
                            return _context29.abrupt('return', _this.doFetch(_this.getTeamsRoute() + '/all', { method: 'get' }));

                        case 1:
                        case 'end':
                            return _context29.stop();
                    }
                }
            }, _callee29, _this);
        }));
        this.getMyTeamMembers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee30() {
            return regeneratorRuntime.wrap(function _callee30$(_context30) {
                while (1) {
                    switch (_context30.prev = _context30.next) {
                        case 0:
                            return _context30.abrupt('return', _this.doFetch(_this.getTeamsRoute() + '/members', { method: 'get' }));

                        case 1:
                        case 'end':
                            return _context30.stop();
                    }
                }
            }, _callee30, _this);
        }));
        this.getAllTeamListings = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee31() {
            return regeneratorRuntime.wrap(function _callee31$(_context31) {
                while (1) {
                    switch (_context31.prev = _context31.next) {
                        case 0:
                            return _context31.abrupt('return', _this.doFetch(_this.getTeamsRoute() + '/all_team_listings', { method: 'get' }));

                        case 1:
                        case 'end':
                            return _context31.stop();
                    }
                }
            }, _callee31, _this);
        }));

        this.getTeamMember = function () {
            var _ref34 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee32(teamId, userId) {
                return regeneratorRuntime.wrap(function _callee32$(_context32) {
                    while (1) {
                        switch (_context32.prev = _context32.next) {
                            case 0:
                                return _context32.abrupt('return', _this.doFetch(_this.getTeamNeededRoute(teamId) + '/members/' + userId, { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context32.stop();
                        }
                    }
                }, _callee32, _this);
            }));

            return function (_x43, _x44) {
                return _ref34.apply(this, arguments);
            };
        }();

        this.getTeamMemberByIds = function () {
            var _ref35 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee33(teamId, userIds) {
                return regeneratorRuntime.wrap(function _callee33$(_context33) {
                    while (1) {
                        switch (_context33.prev = _context33.next) {
                            case 0:
                                return _context33.abrupt('return', _this.doFetch(_this.getTeamNeededRoute(teamId) + '/members/ids', { method: 'post', body: JSON.stringify(userIds) }));

                            case 1:
                            case 'end':
                                return _context33.stop();
                        }
                    }
                }, _callee33, _this);
            }));

            return function (_x45, _x46) {
                return _ref35.apply(this, arguments);
            };
        }();

        this.getTeamStats = function () {
            var _ref36 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee34(teamId) {
                return regeneratorRuntime.wrap(function _callee34$(_context34) {
                    while (1) {
                        switch (_context34.prev = _context34.next) {
                            case 0:
                                return _context34.abrupt('return', _this.doFetch(_this.getTeamNeededRoute(teamId) + '/stats', { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context34.stop();
                        }
                    }
                }, _callee34, _this);
            }));

            return function (_x47) {
                return _ref36.apply(this, arguments);
            };
        }();

        this.addUserToTeam = function () {
            var _ref37 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee35(teamId, userId) {
                return regeneratorRuntime.wrap(function _callee35$(_context35) {
                    while (1) {
                        switch (_context35.prev = _context35.next) {
                            case 0:
                                return _context35.abrupt('return', _this.doFetch(_this.getTeamNeededRoute(teamId) + '/add_user_to_team', { method: 'post', body: JSON.stringify({ user_id: userId }) }));

                            case 1:
                            case 'end':
                                return _context35.stop();
                        }
                    }
                }, _callee35, _this);
            }));

            return function (_x48, _x49) {
                return _ref37.apply(this, arguments);
            };
        }();

        this.joinTeamFromInvite = function () {
            var _ref38 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee36(inviteId) {
                return regeneratorRuntime.wrap(function _callee36$(_context36) {
                    while (1) {
                        switch (_context36.prev = _context36.next) {
                            case 0:
                                return _context36.abrupt('return', _this.doFetch(_this.getTeamsRoute() + '/add_user_to_team_from_invite', { method: 'post', body: JSON.stringify({ invite_id: inviteId }) }));

                            case 1:
                            case 'end':
                                return _context36.stop();
                        }
                    }
                }, _callee36, _this);
            }));

            return function (_x50) {
                return _ref38.apply(this, arguments);
            };
        }();

        this.removeUserFromTeam = function () {
            var _ref39 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee37(teamId, userId) {
                return regeneratorRuntime.wrap(function _callee37$(_context37) {
                    while (1) {
                        switch (_context37.prev = _context37.next) {
                            case 0:
                                return _context37.abrupt('return', _this.doFetch(_this.getTeamNeededRoute(teamId) + '/remove_user_from_team', { method: 'post', body: JSON.stringify({ user_id: userId }) }));

                            case 1:
                            case 'end':
                                return _context37.stop();
                        }
                    }
                }, _callee37, _this);
            }));

            return function (_x51, _x52) {
                return _ref39.apply(this, arguments);
            };
        }();

        this.createChannel = function () {
            var _ref40 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee38(channel) {
                return regeneratorRuntime.wrap(function _callee38$(_context38) {
                    while (1) {
                        switch (_context38.prev = _context38.next) {
                            case 0:
                                return _context38.abrupt('return', _this.doFetch(_this.getChannelsRoute(channel.team_id) + '/create', { method: 'post', body: JSON.stringify(channel) }));

                            case 1:
                            case 'end':
                                return _context38.stop();
                        }
                    }
                }, _callee38, _this);
            }));

            return function (_x53) {
                return _ref40.apply(this, arguments);
            };
        }();

        this.createDirectChannel = function () {
            var _ref41 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee39(teamId, userId) {
                return regeneratorRuntime.wrap(function _callee39$(_context39) {
                    while (1) {
                        switch (_context39.prev = _context39.next) {
                            case 0:
                                return _context39.abrupt('return', _this.doFetch(_this.getChannelsRoute(teamId) + '/create_direct', { method: 'post', body: JSON.stringify({ user_id: userId }) }));

                            case 1:
                            case 'end':
                                return _context39.stop();
                        }
                    }
                }, _callee39, _this);
            }));

            return function (_x54, _x55) {
                return _ref41.apply(this, arguments);
            };
        }();

        this.getChannel = function () {
            var _ref42 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee40(teamId, channelId) {
                return regeneratorRuntime.wrap(function _callee40$(_context40) {
                    while (1) {
                        switch (_context40.prev = _context40.next) {
                            case 0:
                                return _context40.abrupt('return', _this.doFetch(_this.getChannelNeededRoute(teamId, channelId) + '/', { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context40.stop();
                        }
                    }
                }, _callee40, _this);
            }));

            return function (_x56, _x57) {
                return _ref42.apply(this, arguments);
            };
        }();

        this.getChannels = function () {
            var _ref43 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee41(teamId) {
                return regeneratorRuntime.wrap(function _callee41$(_context41) {
                    while (1) {
                        switch (_context41.prev = _context41.next) {
                            case 0:
                                return _context41.abrupt('return', _this.doFetch(_this.getChannelsRoute(teamId) + '/', { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context41.stop();
                        }
                    }
                }, _callee41, _this);
            }));

            return function (_x58) {
                return _ref43.apply(this, arguments);
            };
        }();

        this.getMyChannelMembers = function () {
            var _ref44 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee42(teamId) {
                return regeneratorRuntime.wrap(function _callee42$(_context42) {
                    while (1) {
                        switch (_context42.prev = _context42.next) {
                            case 0:
                                return _context42.abrupt('return', _this.doFetch(_this.getChannelsRoute(teamId) + '/members', { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context42.stop();
                        }
                    }
                }, _callee42, _this);
            }));

            return function (_x59) {
                return _ref44.apply(this, arguments);
            };
        }();

        this.updateChannel = function () {
            var _ref45 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee43(channel) {
                return regeneratorRuntime.wrap(function _callee43$(_context43) {
                    while (1) {
                        switch (_context43.prev = _context43.next) {
                            case 0:
                                return _context43.abrupt('return', _this.doFetch(_this.getChannelsRoute(channel.team_id) + '/update', { method: 'post', body: JSON.stringify(channel) }));

                            case 1:
                            case 'end':
                                return _context43.stop();
                        }
                    }
                }, _callee43, _this);
            }));

            return function (_x60) {
                return _ref45.apply(this, arguments);
            };
        }();

        this.updateChannelNotifyProps = function () {
            var _ref46 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee44(teamId, data) {
                return regeneratorRuntime.wrap(function _callee44$(_context44) {
                    while (1) {
                        switch (_context44.prev = _context44.next) {
                            case 0:
                                return _context44.abrupt('return', _this.doFetch(_this.getChannelsRoute(teamId) + '/update_notify_props', { method: 'post', body: JSON.stringify(data) }));

                            case 1:
                            case 'end':
                                return _context44.stop();
                        }
                    }
                }, _callee44, _this);
            }));

            return function (_x61, _x62) {
                return _ref46.apply(this, arguments);
            };
        }();

        this.leaveChannel = function () {
            var _ref47 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee45(teamId, channelId) {
                return regeneratorRuntime.wrap(function _callee45$(_context45) {
                    while (1) {
                        switch (_context45.prev = _context45.next) {
                            case 0:
                                return _context45.abrupt('return', _this.doFetch(_this.getChannelNeededRoute(teamId, channelId) + '/leave', { method: 'post' }));

                            case 1:
                            case 'end':
                                return _context45.stop();
                        }
                    }
                }, _callee45, _this);
            }));

            return function (_x63, _x64) {
                return _ref47.apply(this, arguments);
            };
        }();

        this.joinChannel = function () {
            var _ref48 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee46(teamId, channelId) {
                return regeneratorRuntime.wrap(function _callee46$(_context46) {
                    while (1) {
                        switch (_context46.prev = _context46.next) {
                            case 0:
                                return _context46.abrupt('return', _this.doFetch(_this.getChannelNeededRoute(teamId, channelId) + '/join', { method: 'post' }));

                            case 1:
                            case 'end':
                                return _context46.stop();
                        }
                    }
                }, _callee46, _this);
            }));

            return function (_x65, _x66) {
                return _ref48.apply(this, arguments);
            };
        }();

        this.joinChannelByName = function () {
            var _ref49 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee47(teamId, channelName) {
                return regeneratorRuntime.wrap(function _callee47$(_context47) {
                    while (1) {
                        switch (_context47.prev = _context47.next) {
                            case 0:
                                return _context47.abrupt('return', _this.doFetch(_this.getChannelNameRoute(teamId, channelName) + '/join', { method: 'post' }));

                            case 1:
                            case 'end':
                                return _context47.stop();
                        }
                    }
                }, _callee47, _this);
            }));

            return function (_x67, _x68) {
                return _ref49.apply(this, arguments);
            };
        }();

        this.deleteChannel = function () {
            var _ref50 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee48(teamId, channelId) {
                return regeneratorRuntime.wrap(function _callee48$(_context48) {
                    while (1) {
                        switch (_context48.prev = _context48.next) {
                            case 0:
                                return _context48.abrupt('return', _this.doFetch(_this.getChannelNeededRoute(teamId, channelId) + '/delete', { method: 'post' }));

                            case 1:
                            case 'end':
                                return _context48.stop();
                        }
                    }
                }, _callee48, _this);
            }));

            return function (_x69, _x70) {
                return _ref50.apply(this, arguments);
            };
        }();

        this.viewChannel = function () {
            var _ref51 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee49(teamId, channelId) {
                var prevChannelId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
                var data;
                return regeneratorRuntime.wrap(function _callee49$(_context49) {
                    while (1) {
                        switch (_context49.prev = _context49.next) {
                            case 0:
                                data = {
                                    channel_id: channelId,
                                    prev_channel_id: prevChannelId
                                };
                                return _context49.abrupt('return', _this.doFetch(_this.getChannelsRoute(teamId) + '/view', { method: 'post', body: JSON.stringify(data) }));

                            case 2:
                            case 'end':
                                return _context49.stop();
                        }
                    }
                }, _callee49, _this);
            }));

            return function (_x71, _x72) {
                return _ref51.apply(this, arguments);
            };
        }();

        this.getMoreChannels = function () {
            var _ref52 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee50(teamId, offset, limit) {
                return regeneratorRuntime.wrap(function _callee50$(_context50) {
                    while (1) {
                        switch (_context50.prev = _context50.next) {
                            case 0:
                                return _context50.abrupt('return', _this.doFetch(_this.getChannelsRoute(teamId) + '/more/' + offset + '/' + limit, { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context50.stop();
                        }
                    }
                }, _callee50, _this);
            }));

            return function (_x74, _x75, _x76) {
                return _ref52.apply(this, arguments);
            };
        }();

        this.searchMoreChannels = function () {
            var _ref53 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee51(teamId, term) {
                return regeneratorRuntime.wrap(function _callee51$(_context51) {
                    while (1) {
                        switch (_context51.prev = _context51.next) {
                            case 0:
                                return _context51.abrupt('return', _this.doFetch(_this.getChannelsRoute(teamId) + '/more/search', { method: 'post', body: JSON.stringify({ term: term }) }));

                            case 1:
                            case 'end':
                                return _context51.stop();
                        }
                    }
                }, _callee51, _this);
            }));

            return function (_x77, _x78) {
                return _ref53.apply(this, arguments);
            };
        }();

        this.getChannelStats = function () {
            var _ref54 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee52(teamId, channelId) {
                return regeneratorRuntime.wrap(function _callee52$(_context52) {
                    while (1) {
                        switch (_context52.prev = _context52.next) {
                            case 0:
                                return _context52.abrupt('return', _this.doFetch(_this.getChannelNeededRoute(teamId, channelId) + '/stats', { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context52.stop();
                        }
                    }
                }, _callee52, _this);
            }));

            return function (_x79, _x80) {
                return _ref54.apply(this, arguments);
            };
        }();

        this.addChannelMember = function () {
            var _ref55 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee53(teamId, channelId, userId) {
                return regeneratorRuntime.wrap(function _callee53$(_context53) {
                    while (1) {
                        switch (_context53.prev = _context53.next) {
                            case 0:
                                return _context53.abrupt('return', _this.doFetch(_this.getChannelNeededRoute(teamId, channelId) + '/add', { method: 'post', body: JSON.stringify({ user_id: userId }) }));

                            case 1:
                            case 'end':
                                return _context53.stop();
                        }
                    }
                }, _callee53, _this);
            }));

            return function (_x81, _x82, _x83) {
                return _ref55.apply(this, arguments);
            };
        }();

        this.removeChannelMember = function () {
            var _ref56 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee54(teamId, channelId, userId) {
                return regeneratorRuntime.wrap(function _callee54$(_context54) {
                    while (1) {
                        switch (_context54.prev = _context54.next) {
                            case 0:
                                return _context54.abrupt('return', _this.doFetch(_this.getChannelNeededRoute(teamId, channelId) + '/remove', { method: 'post', body: JSON.stringify({ user_id: userId }) }));

                            case 1:
                            case 'end':
                                return _context54.stop();
                        }
                    }
                }, _callee54, _this);
            }));

            return function (_x84, _x85, _x86) {
                return _ref56.apply(this, arguments);
            };
        }();

        this.autocompleteChannels = function () {
            var _ref57 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee55(teamId, term) {
                return regeneratorRuntime.wrap(function _callee55$(_context55) {
                    while (1) {
                        switch (_context55.prev = _context55.next) {
                            case 0:
                                return _context55.abrupt('return', _this.doFetch(_this.getChannelsRoute(teamId) + '/autocomplete?term=' + encodeURIComponent(term), { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context55.stop();
                        }
                    }
                }, _callee55, _this);
            }));

            return function (_x87, _x88) {
                return _ref57.apply(this, arguments);
            };
        }();

        this.createPost = function () {
            var _ref58 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee56(teamId, post) {
                return regeneratorRuntime.wrap(function _callee56$(_context56) {
                    while (1) {
                        switch (_context56.prev = _context56.next) {
                            case 0:
                                return _context56.abrupt('return', _this.doFetch(_this.getPostsRoute(teamId, post.channel_id) + '/create', { method: 'post', body: JSON.stringify(post) }));

                            case 1:
                            case 'end':
                                return _context56.stop();
                        }
                    }
                }, _callee56, _this);
            }));

            return function (_x89, _x90) {
                return _ref58.apply(this, arguments);
            };
        }();

        this.editPost = function () {
            var _ref59 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee57(teamId, post) {
                return regeneratorRuntime.wrap(function _callee57$(_context57) {
                    while (1) {
                        switch (_context57.prev = _context57.next) {
                            case 0:
                                return _context57.abrupt('return', _this.doFetch(_this.getPostsRoute(teamId, post.channel_id) + '/update', { method: 'post', body: JSON.stringify(post) }));

                            case 1:
                            case 'end':
                                return _context57.stop();
                        }
                    }
                }, _callee57, _this);
            }));

            return function (_x91, _x92) {
                return _ref59.apply(this, arguments);
            };
        }();

        this.deletePost = function () {
            var _ref60 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee58(teamId, channelId, postId) {
                return regeneratorRuntime.wrap(function _callee58$(_context58) {
                    while (1) {
                        switch (_context58.prev = _context58.next) {
                            case 0:
                                return _context58.abrupt('return', _this.doFetch(_this.getPostsRoute(teamId, channelId) + '/' + postId + '/delete', { method: 'post' }));

                            case 1:
                            case 'end':
                                return _context58.stop();
                        }
                    }
                }, _callee58, _this);
            }));

            return function (_x93, _x94, _x95) {
                return _ref60.apply(this, arguments);
            };
        }();

        this.getPost = function () {
            var _ref61 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee59(teamId, channelId, postId) {
                return regeneratorRuntime.wrap(function _callee59$(_context59) {
                    while (1) {
                        switch (_context59.prev = _context59.next) {
                            case 0:
                                return _context59.abrupt('return', _this.doFetch(_this.getPostsRoute(teamId, channelId) + '/' + postId + '/get', { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context59.stop();
                        }
                    }
                }, _callee59, _this);
            }));

            return function (_x96, _x97, _x98) {
                return _ref61.apply(this, arguments);
            };
        }();

        this.getPosts = function () {
            var _ref62 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee60(teamId, channelId, offset, limit) {
                return regeneratorRuntime.wrap(function _callee60$(_context60) {
                    while (1) {
                        switch (_context60.prev = _context60.next) {
                            case 0:
                                return _context60.abrupt('return', _this.doFetch(_this.getPostsRoute(teamId, channelId) + '/page/' + offset + '/' + limit, { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context60.stop();
                        }
                    }
                }, _callee60, _this);
            }));

            return function (_x99, _x100, _x101, _x102) {
                return _ref62.apply(this, arguments);
            };
        }();

        this.getPostsSince = function () {
            var _ref63 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee61(teamId, channelId, since) {
                return regeneratorRuntime.wrap(function _callee61$(_context61) {
                    while (1) {
                        switch (_context61.prev = _context61.next) {
                            case 0:
                                return _context61.abrupt('return', _this.doFetch(_this.getPostsRoute(teamId, channelId) + '/since/' + since, { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context61.stop();
                        }
                    }
                }, _callee61, _this);
            }));

            return function (_x103, _x104, _x105) {
                return _ref63.apply(this, arguments);
            };
        }();

        this.getPostsBefore = function () {
            var _ref64 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee62(teamId, channelId, postId, offset, limit) {
                return regeneratorRuntime.wrap(function _callee62$(_context62) {
                    while (1) {
                        switch (_context62.prev = _context62.next) {
                            case 0:
                                return _context62.abrupt('return', _this.doFetch(_this.getPostsRoute(teamId, channelId) + '/' + postId + '/before/' + offset + '/' + limit, { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context62.stop();
                        }
                    }
                }, _callee62, _this);
            }));

            return function (_x106, _x107, _x108, _x109, _x110) {
                return _ref64.apply(this, arguments);
            };
        }();

        this.getPostsAfter = function () {
            var _ref65 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee63(teamId, channelId, postId, offset, limit) {
                return regeneratorRuntime.wrap(function _callee63$(_context63) {
                    while (1) {
                        switch (_context63.prev = _context63.next) {
                            case 0:
                                return _context63.abrupt('return', _this.doFetch(_this.getPostsRoute(teamId, channelId) + '/' + postId + '/after/' + offset + '/' + limit, { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context63.stop();
                        }
                    }
                }, _callee63, _this);
            }));

            return function (_x111, _x112, _x113, _x114, _x115) {
                return _ref65.apply(this, arguments);
            };
        }();

        this.getFileInfosForPost = function () {
            var _ref66 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee64(teamId, channelId, postId) {
                return regeneratorRuntime.wrap(function _callee64$(_context64) {
                    while (1) {
                        switch (_context64.prev = _context64.next) {
                            case 0:
                                return _context64.abrupt('return', _this.doFetch(_this.getChannelNeededRoute(teamId, channelId) + '/posts/' + postId + '/get_file_infos', { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context64.stop();
                        }
                    }
                }, _callee64, _this);
            }));

            return function (_x116, _x117, _x118) {
                return _ref66.apply(this, arguments);
            };
        }();

        this.uploadFile = function () {
            var _ref67 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee65(teamId, channelId, fileFormData, formBoundary) {
                var contentType;
                return regeneratorRuntime.wrap(function _callee65$(_context65) {
                    while (1) {
                        switch (_context65.prev = _context65.next) {
                            case 0:
                                contentType = 'multipart/form-data';

                                if (formBoundary) {
                                    contentType += '; boundary=' + formBoundary;
                                }

                                return _context65.abrupt('return', _this.doFetch(_this.getTeamNeededRoute(teamId) + '/files/upload', {
                                    method: 'post',
                                    headers: {
                                        'Content-Type': contentType
                                    },
                                    body: fileFormData
                                }));

                            case 3:
                            case 'end':
                                return _context65.stop();
                        }
                    }
                }, _callee65, _this);
            }));

            return function (_x119, _x120, _x121, _x122) {
                return _ref67.apply(this, arguments);
            };
        }();

        this.getOpenGraphMetadata = function () {
            var _ref68 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee66(url) {
                return regeneratorRuntime.wrap(function _callee66$(_context66) {
                    while (1) {
                        switch (_context66.prev = _context66.next) {
                            case 0:
                                return _context66.abrupt('return', _this.doFetch(_this.getBaseRoute() + '/get_opengraph_metadata', { method: 'post', body: JSON.stringify({ url: url }) }));

                            case 1:
                            case 'end':
                                return _context66.stop();
                        }
                    }
                }, _callee66, _this);
            }));

            return function (_x123) {
                return _ref68.apply(this, arguments);
            };
        }();

        this.getMyPreferences = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee67() {
            return regeneratorRuntime.wrap(function _callee67$(_context67) {
                while (1) {
                    switch (_context67.prev = _context67.next) {
                        case 0:
                            return _context67.abrupt('return', _this.doFetch(_this.getPreferencesRoute() + '/', { method: 'get' }));

                        case 1:
                        case 'end':
                            return _context67.stop();
                    }
                }
            }, _callee67, _this);
        }));

        this.savePreferences = function () {
            var _ref70 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee68(preferences) {
                return regeneratorRuntime.wrap(function _callee68$(_context68) {
                    while (1) {
                        switch (_context68.prev = _context68.next) {
                            case 0:
                                return _context68.abrupt('return', _this.doFetch(_this.getPreferencesRoute() + '/save', { method: 'post', body: JSON.stringify(preferences) }));

                            case 1:
                            case 'end':
                                return _context68.stop();
                        }
                    }
                }, _callee68, _this);
            }));

            return function (_x124) {
                return _ref70.apply(this, arguments);
            };
        }();

        this.deletePreferences = function () {
            var _ref71 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee69(preferences) {
                return regeneratorRuntime.wrap(function _callee69$(_context69) {
                    while (1) {
                        switch (_context69.prev = _context69.next) {
                            case 0:
                                return _context69.abrupt('return', _this.doFetch(_this.getPreferencesRoute() + '/delete', { method: 'post', body: JSON.stringify(preferences) }));

                            case 1:
                            case 'end':
                                return _context69.stop();
                        }
                    }
                }, _callee69, _this);
            }));

            return function (_x125) {
                return _ref71.apply(this, arguments);
            };
        }();

        this.getPreferenceCategory = function () {
            var _ref72 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee70(category) {
                return regeneratorRuntime.wrap(function _callee70$(_context70) {
                    while (1) {
                        switch (_context70.prev = _context70.next) {
                            case 0:
                                return _context70.abrupt('return', _this.doFetch(_this.getPreferencesRoute() + '/' + category, { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context70.stop();
                        }
                    }
                }, _callee70, _this);
            }));

            return function (_x126) {
                return _ref72.apply(this, arguments);
            };
        }();

        this.getPreference = function () {
            var _ref73 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee71(category, name) {
                return regeneratorRuntime.wrap(function _callee71$(_context71) {
                    while (1) {
                        switch (_context71.prev = _context71.next) {
                            case 0:
                                return _context71.abrupt('return', _this.doFetch(_this.getPreferencesRoute() + '/' + category + '/' + name, { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context71.stop();
                        }
                    }
                }, _callee71, _this);
            }));

            return function (_x127, _x128) {
                return _ref73.apply(this, arguments);
            };
        }();

        this.addCommand = function () {
            var _ref74 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee72(teamId, command) {
                return regeneratorRuntime.wrap(function _callee72$(_context72) {
                    while (1) {
                        switch (_context72.prev = _context72.next) {
                            case 0:
                                return _context72.abrupt('return', _this.doFetch(_this.getCommandsRoute(teamId) + '/create', { method: 'post', body: JSON.stringify(command) }));

                            case 1:
                            case 'end':
                                return _context72.stop();
                        }
                    }
                }, _callee72, _this);
            }));

            return function (_x129, _x130) {
                return _ref74.apply(this, arguments);
            };
        }();

        this.regenCommandToken = function () {
            var _ref75 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee73(teamId, id) {
                return regeneratorRuntime.wrap(function _callee73$(_context73) {
                    while (1) {
                        switch (_context73.prev = _context73.next) {
                            case 0:
                                return _context73.abrupt('return', _this.doFetch(_this.getCommandsRoute(teamId) + '/regen_token', { method: 'post', body: JSON.stringify({ id: id }) }));

                            case 1:
                            case 'end':
                                return _context73.stop();
                        }
                    }
                }, _callee73, _this);
            }));

            return function (_x131, _x132) {
                return _ref75.apply(this, arguments);
            };
        }();

        this.deleteCommand = function () {
            var _ref76 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee74(teamId, id) {
                return regeneratorRuntime.wrap(function _callee74$(_context74) {
                    while (1) {
                        switch (_context74.prev = _context74.next) {
                            case 0:
                                return _context74.abrupt('return', _this.doFetch(_this.getCommandsRoute(teamId) + '/delete', { method: 'post', body: JSON.stringify({ id: id }) }));

                            case 1:
                            case 'end':
                                return _context74.stop();
                        }
                    }
                }, _callee74, _this);
            }));

            return function (_x133, _x134) {
                return _ref76.apply(this, arguments);
            };
        }();

        this.createCustomEmoji = function () {
            var _ref77 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee75(emoji, image) {
                var imageFormData, formBoundary, contentType;
                return regeneratorRuntime.wrap(function _callee75$(_context75) {
                    while (1) {
                        switch (_context75.prev = _context75.next) {
                            case 0:
                                imageFormData = new FormData();

                                imageFormData.append('image', image);
                                imageFormData.append('emoji', JSON.stringify(emoji));
                                formBoundary = imageFormData.getBoundary();
                                contentType = 'multipart/form-data';

                                if (formBoundary) {
                                    contentType += '; boundary=' + formBoundary;
                                }

                                return _context75.abrupt('return', _this.doFetch(_this.getEmojiRoute() + '/create', {
                                    method: 'post',
                                    headers: {
                                        'Content-Type': contentType
                                    },
                                    body: imageFormData
                                }));

                            case 7:
                            case 'end':
                                return _context75.stop();
                        }
                    }
                }, _callee75, _this);
            }));

            return function (_x135, _x136) {
                return _ref77.apply(this, arguments);
            };
        }();

        this.getCustomEmojis = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee76() {
            return regeneratorRuntime.wrap(function _callee76$(_context76) {
                while (1) {
                    switch (_context76.prev = _context76.next) {
                        case 0:
                            return _context76.abrupt('return', _this.doFetch(_this.getEmojiRoute() + '/list', { method: 'get' }));

                        case 1:
                        case 'end':
                            return _context76.stop();
                    }
                }
            }, _callee76, _this);
        }));

        this.deleteCustomEmoji = function () {
            var _ref79 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee77(emojiId) {
                return regeneratorRuntime.wrap(function _callee77$(_context77) {
                    while (1) {
                        switch (_context77.prev = _context77.next) {
                            case 0:
                                return _context77.abrupt('return', _this.doFetch(_this.getEmojiRoute() + '/delete', { method: 'post', body: JSON.stringify({ id: emojiId }) }));

                            case 1:
                            case 'end':
                                return _context77.stop();
                        }
                    }
                }, _callee77, _this);
            }));

            return function (_x137) {
                return _ref79.apply(this, arguments);
            };
        }();

        this.getSystemEmojiImageUrl = function (filename) {
            return _this.url + '/static/emoji/' + filename + '.png';
        };

        this.getCustomEmojiImageUrl = function (id) {
            return _this.getEmojiRoute() + '/' + id;
        };

        this.doFetch = function () {
            var _ref80 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee78(url, options) {
                var _ref81, data;

                return regeneratorRuntime.wrap(function _callee78$(_context78) {
                    while (1) {
                        switch (_context78.prev = _context78.next) {
                            case 0:
                                _context78.next = 2;
                                return _this.doFetchWithResponse(url, options);

                            case 2:
                                _ref81 = _context78.sent;
                                data = _ref81.data;
                                return _context78.abrupt('return', data);

                            case 5:
                            case 'end':
                                return _context78.stop();
                        }
                    }
                }, _callee78, _this);
            }));

            return function (_x138, _x139) {
                return _ref80.apply(this, arguments);
            };
        }();

        this.doFetchWithResponse = function () {
            var _ref82 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee79(url, options) {
                var response, headers, data, serverVersion, msg;
                return regeneratorRuntime.wrap(function _callee79$(_context79) {
                    while (1) {
                        switch (_context79.prev = _context79.next) {
                            case 0:
                                _context79.next = 2;
                                return (0, _fetch_etag2.default)(url, _this.getOptions(options));

                            case 2:
                                response = _context79.sent;
                                headers = parseAndMergeNestedHeaders(response.headers);
                                data = void 0;
                                _context79.prev = 5;
                                _context79.next = 8;
                                return response.json();

                            case 8:
                                data = _context79.sent;
                                _context79.next = 14;
                                break;

                            case 11:
                                _context79.prev = 11;
                                _context79.t0 = _context79['catch'](5);
                                throw {
                                    intl: {
                                        id: 'mobile.request.invalid_response',
                                        defaultMessage: 'Received invalid response from the server.'
                                    }
                                };

                            case 14:

                                if (headers.has(HEADER_X_VERSION_ID)) {
                                    serverVersion = headers.get(HEADER_X_VERSION_ID);

                                    if (serverVersion && _this.serverVersion !== serverVersion) {
                                        _this.serverVersion = serverVersion;
                                        _event_emitter2.default.emit(_constants.General.SERVER_VERSION_CHANGED, serverVersion);
                                    }
                                }

                                if (!response.ok) {
                                    _context79.next = 17;
                                    break;
                                }

                                return _context79.abrupt('return', {
                                    response: response,
                                    headers: headers,
                                    data: data
                                });

                            case 17:
                                msg = data.message || '';


                                if (_this.logToConsole) {
                                    console.error(msg); // eslint-disable-line no-console
                                }

                                throw {
                                    message: msg,
                                    server_error_id: data.id,
                                    status_code: data.status_code,
                                    url: url
                                };

                            case 20:
                            case 'end':
                                return _context79.stop();
                        }
                    }
                }, _callee79, _this, [[5, 11]]);
            }));

            return function (_x140, _x141) {
                return _ref82.apply(this, arguments);
            };
        }();

        this.logToConsole = false;
        this.serverVersion = '';
        this.token = '';
        this.url = '';
        this.urlVersion = '/api/v3';
        this.userAgent = null;
        this.acceptLanguage = null;

        this.translations = {
            connectionError: 'There appears to be a problem with your internet connection.',
            unknownError: 'We received an unexpected status code from the server.'
        };
    }

    _createClass(Client, [{
        key: 'getUrl',
        value: function getUrl() {
            return this.url;
        }
    }, {
        key: 'setUrl',
        value: function setUrl(url) {
            this.url = url;
        }
    }, {
        key: 'setUserAgent',
        value: function setUserAgent(userAgent) {
            this.userAgent = userAgent;
        }
    }, {
        key: 'setLocale',
        value: function setLocale(locale) {
            this.acceptLanguage = locale;
        }
    }, {
        key: 'getToken',
        value: function getToken() {
            return this.token;
        }
    }, {
        key: 'setToken',
        value: function setToken(token) {
            this.token = token;
        }
    }, {
        key: 'getServerVersion',
        value: function getServerVersion() {
            return this.serverVersion;
        }
    }, {
        key: 'getUrlVersion',
        value: function getUrlVersion() {
            return this.urlVersion;
        }
    }, {
        key: 'getBaseRoute',
        value: function getBaseRoute() {
            return '' + this.url + this.urlVersion;
        }
    }, {
        key: 'getAdminRoute',
        value: function getAdminRoute() {
            return '' + this.url + this.urlVersion + '/admin';
        }
    }, {
        key: 'getGeneralRoute',
        value: function getGeneralRoute() {
            return '' + this.url + this.urlVersion + '/general';
        }
    }, {
        key: 'getLicenseRoute',
        value: function getLicenseRoute() {
            return '' + this.url + this.urlVersion + '/license';
        }
    }, {
        key: 'getTeamsRoute',
        value: function getTeamsRoute() {
            return '' + this.url + this.urlVersion + '/teams';
        }
    }, {
        key: 'getPreferencesRoute',
        value: function getPreferencesRoute() {
            return '' + this.url + this.urlVersion + '/preferences';
        }
    }, {
        key: 'getTeamNeededRoute',
        value: function getTeamNeededRoute(teamId) {
            return '' + this.url + this.urlVersion + '/teams/' + teamId;
        }
    }, {
        key: 'getChannelsRoute',
        value: function getChannelsRoute(teamId) {
            return '' + this.url + this.urlVersion + '/teams/' + teamId + '/channels';
        }
    }, {
        key: 'getChannelNameRoute',
        value: function getChannelNameRoute(teamId, channelName) {
            return '' + this.url + this.urlVersion + '/teams/' + teamId + '/channels/name/' + channelName;
        }
    }, {
        key: 'getChannelNeededRoute',
        value: function getChannelNeededRoute(teamId, channelId) {
            return '' + this.url + this.urlVersion + '/teams/' + teamId + '/channels/' + channelId;
        }
    }, {
        key: 'getCommandsRoute',
        value: function getCommandsRoute(teamId) {
            return '' + this.url + this.urlVersion + '/teams/' + teamId + '/commands';
        }
    }, {
        key: 'getEmojiRoute',
        value: function getEmojiRoute() {
            return '' + this.url + this.urlVersion + '/emoji';
        }
    }, {
        key: 'getHooksRoute',
        value: function getHooksRoute(teamId) {
            return '' + this.url + this.urlVersion + '/teams/' + teamId + '/hooks';
        }
    }, {
        key: 'getPostsRoute',
        value: function getPostsRoute(teamId, channelId) {
            return '' + this.url + this.urlVersion + '/teams/' + teamId + '/channels/' + channelId + '/posts';
        }
    }, {
        key: 'getUsersRoute',
        value: function getUsersRoute() {
            return '' + this.url + this.urlVersion + '/users';
        }
    }, {
        key: 'getFilesRoute',
        value: function getFilesRoute() {
            return '' + this.url + this.urlVersion + '/files';
        }
    }, {
        key: 'getOAuthRoute',
        value: function getOAuthRoute() {
            return '' + this.url + this.urlVersion + '/oauth';
        }
    }, {
        key: 'getUserNeededRoute',
        value: function getUserNeededRoute(userId) {
            return '' + this.url + this.urlVersion + '/users/' + userId;
        }
    }, {
        key: 'enableLogErrorsToConsole',
        value: function enableLogErrorsToConsole(enabled) {
            this.logToConsole = enabled;
        }
    }, {
        key: 'getOptions',
        value: function getOptions(options) {
            var newOptions = Object.assign({}, options);

            var headers = _defineProperty({}, HEADER_REQUESTED_WITH, 'XMLHttpRequest');

            if (this.token) {
                headers[HEADER_AUTH] = HEADER_BEARER + ' ' + this.token;
            } else {
                newOptions.credentials = 'include';
            }

            if (this.userAgent) {
                headers[HEADER_USER_AGENT] = this.userAgent;
            }

            if (this.acceptLanguage) {
                headers[HEADER_ACCEPT_LANGUAGE] = this.acceptLanguage;
            }

            if (options.headers) {
                Object.assign(headers, newOptions.headers);
            }

            return _extends({}, newOptions, {
                headers: headers
            });
        }

        // General routes

        // User routes


        // TODO: add deep linking to emails so we can create accounts from within
        // the mobile app


        // Team routes

        // Channel routes

        // Post routes


        // Preferences routes


        // Integration Routes

    }, {
        key: 'getFileUrl',


        // File routes
        value: function getFileUrl(fileId, timestamp) {
            var url = this.getFilesRoute() + '/' + fileId + '/get';
            if (timestamp) {
                url += '?' + timestamp;
            }

            return url;
        }
    }, {
        key: 'getFileThumbnailUrl',
        value: function getFileThumbnailUrl(fileId, timestamp) {
            var url = this.getFilesRoute() + '/' + fileId + '/get_thumbnail';
            if (timestamp) {
                url += '?' + timestamp;
            }

            return url;
        }
    }, {
        key: 'getFilePreviewUrl',
        value: function getFilePreviewUrl(fileId, timestamp) {
            var url = this.getFilesRoute() + '/' + fileId + '/get_preview';
            if (timestamp) {
                url += '?' + timestamp;
            }

            return url;
        }

        // Emoji routes


        // Client helpers

    }]);

    return Client;
}();

exports.default = Client;


function parseAndMergeNestedHeaders(originalHeaders) {
    // TODO: This is a workaround for https://github.com/matthew-andrews/isomorphic-fetch/issues/97
    // The real solution is to set Access-Control-Expose-Headers on the server
    var headers = new Map();
    var nestedHeaders = new Map();
    originalHeaders.forEach(function (val, key) {
        var capitalizedKey = key.replace(/\b[a-z]/g, function (l) {
            return l.toUpperCase();
        });
        var realVal = val;
        if (val && val.match(/\n\S+:\s\S+/)) {
            var nestedHeaderStrings = val.split('\n');
            realVal = nestedHeaderStrings.shift();
            var moreNestedHeaders = new Map(nestedHeaderStrings.map(function (h) {
                return h.split(/:\s/);
            }));
            nestedHeaders = new Map([].concat(_toConsumableArray(nestedHeaders), _toConsumableArray(moreNestedHeaders)));
        }
        headers.set(capitalizedKey, realVal);
    });
    return new Map([].concat(_toConsumableArray(headers), _toConsumableArray(nestedHeaders)));
}