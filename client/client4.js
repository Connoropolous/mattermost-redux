'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Copyright (c) 2017-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

var _event_emitter = require('../utils/event_emitter');

var _event_emitter2 = _interopRequireDefault(_event_emitter);

var _constants = require('../constants');

var _fetch_etag = require('./fetch_etag');

var _fetch_etag2 = _interopRequireDefault(_fetch_etag);

var _helpers = require('../utils/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormData = require('form-data');

var HEADER_TOKEN = 'Token';
var HEADER_AUTH = 'Authorization';
var HEADER_BEARER = 'BEARER';
var HEADER_REQUESTED_WITH = 'X-Requested-With';
var HEADER_USER_AGENT = 'User-Agent';
var HEADER_X_VERSION_ID = 'X-Version-Id';
var HEADER_X_CLUSTER_ID = 'X-Cluster-Id';

var PER_PAGE_DEFAULT = 60;
var LOGS_PER_PAGE_DEFAULT = 10000;

var Client4 = function () {
    function Client4() {
        var _this = this;

        _classCallCheck(this, Client4);

        this.createUser = function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(user, data, emailHash, inviteId) {
                var queryParams;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _this.trackEvent('api', 'api_users_create');

                                queryParams = {};


                                if (data) {
                                    queryParams.d = data;
                                }

                                if (emailHash) {
                                    queryParams.h = emailHash;
                                }

                                if (inviteId) {
                                    queryParams.iid = inviteId;
                                }

                                return _context.abrupt('return', _this.doFetch('' + _this.getUsersRoute() + buildQueryString(queryParams), { method: 'post', body: JSON.stringify(user) }));

                            case 6:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this);
            }));

            return function (_x, _x2, _x3, _x4) {
                return _ref.apply(this, arguments);
            };
        }();

        this.patchMe = function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(user) {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                return _context2.abrupt('return', _this.doFetch(_this.getUserRoute('me') + '/patch', { method: 'put', body: JSON.stringify(user) }));

                            case 1:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this);
            }));

            return function (_x5) {
                return _ref2.apply(this, arguments);
            };
        }();

        this.patchUser = function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(user) {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _this.trackEvent('api', 'api_users_patch');

                                return _context3.abrupt('return', _this.doFetch(_this.getUserRoute(user.id) + '/patch', { method: 'put', body: JSON.stringify(user) }));

                            case 2:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, _this);
            }));

            return function (_x6) {
                return _ref3.apply(this, arguments);
            };
        }();

        this.updateUser = function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(user) {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _this.trackEvent('api', 'api_users_update');

                                return _context4.abrupt('return', _this.doFetch('' + _this.getUserRoute(user.id), { method: 'put', body: JSON.stringify(user) }));

                            case 2:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, _this);
            }));

            return function (_x7) {
                return _ref4.apply(this, arguments);
            };
        }();

        this.updateUserRoles = function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(userId, roles) {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _this.trackEvent('api', 'api_users_update_roles');

                                return _context5.abrupt('return', _this.doFetch(_this.getUserRoute(userId) + '/roles', { method: 'put', body: JSON.stringify({ roles: roles }) }));

                            case 2:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, _this);
            }));

            return function (_x8, _x9) {
                return _ref5.apply(this, arguments);
            };
        }();

        this.updateUserMfa = function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(userId, activate, code) {
                var body;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                body = { activate: activate };

                                if (activate) {
                                    body.code = code;
                                }

                                return _context6.abrupt('return', _this.doFetch(_this.getUserRoute(userId) + '/mfa', { method: 'put', body: JSON.stringify(body) }));

                            case 3:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, _this);
            }));

            return function (_x10, _x11, _x12) {
                return _ref6.apply(this, arguments);
            };
        }();

        this.updateUserPassword = function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(userId, currentPassword, newPassword) {
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                _this.trackEvent('api', 'api_users_newpassword');

                                return _context7.abrupt('return', _this.doFetch(_this.getUserRoute(userId) + '/password', { method: 'put', body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }) }));

                            case 2:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, _this);
            }));

            return function (_x13, _x14, _x15) {
                return _ref7.apply(this, arguments);
            };
        }();

        this.resetUserPassword = function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(token, newPassword) {
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                _this.trackEvent('api', 'api_users_reset_password');

                                return _context8.abrupt('return', _this.doFetch(_this.getUsersRoute() + '/password/reset', { method: 'post', body: JSON.stringify({ token: token, new_password: newPassword }) }));

                            case 2:
                            case 'end':
                                return _context8.stop();
                        }
                    }
                }, _callee8, _this);
            }));

            return function (_x16, _x17) {
                return _ref8.apply(this, arguments);
            };
        }();

        this.sendPasswordResetEmail = function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(email) {
                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                _this.trackEvent('api', 'api_users_send_password_reset');

                                return _context9.abrupt('return', _this.doFetch(_this.getUsersRoute() + '/password/reset/send', { method: 'post', body: JSON.stringify({ email: email }) }));

                            case 2:
                            case 'end':
                                return _context9.stop();
                        }
                    }
                }, _callee9, _this);
            }));

            return function (_x18) {
                return _ref9.apply(this, arguments);
            };
        }();

        this.updateUserActive = function () {
            var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(userId, active) {
                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                _this.trackEvent('api', 'api_users_update_active');

                                return _context10.abrupt('return', _this.doFetch(_this.getUserRoute(userId) + '/active', { method: 'put', body: JSON.stringify({ active: active }) }));

                            case 2:
                            case 'end':
                                return _context10.stop();
                        }
                    }
                }, _callee10, _this);
            }));

            return function (_x19, _x20) {
                return _ref10.apply(this, arguments);
            };
        }();

        this.uploadProfileImage = function () {
            var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(userId, imageData) {
                var formData, request;
                return regeneratorRuntime.wrap(function _callee11$(_context11) {
                    while (1) {
                        switch (_context11.prev = _context11.next) {
                            case 0:
                                _this.trackEvent('api', 'api_users_update_profile_picture');

                                formData = new FormData();

                                formData.append('image', imageData);

                                request = {
                                    method: 'post',
                                    body: formData
                                };


                                if (formData.getBoundary) {
                                    request.headers = {
                                        'Content-Type': 'multipart/form-data; boundary=' + formData.getBoundary()
                                    };
                                }

                                return _context11.abrupt('return', _this.doFetch(_this.getUserRoute(userId) + '/image', request));

                            case 6:
                            case 'end':
                                return _context11.stop();
                        }
                    }
                }, _callee11, _this);
            }));

            return function (_x21, _x22) {
                return _ref11.apply(this, arguments);
            };
        }();

        this.verifyUserEmail = function () {
            var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(token) {
                return regeneratorRuntime.wrap(function _callee12$(_context12) {
                    while (1) {
                        switch (_context12.prev = _context12.next) {
                            case 0:
                                return _context12.abrupt('return', _this.doFetch(_this.getUsersRoute() + '/email/verify', { method: 'post', body: JSON.stringify({ token: token }) }));

                            case 1:
                            case 'end':
                                return _context12.stop();
                        }
                    }
                }, _callee12, _this);
            }));

            return function (_x23) {
                return _ref12.apply(this, arguments);
            };
        }();

        this.sendVerificationEmail = function () {
            var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(email) {
                return regeneratorRuntime.wrap(function _callee13$(_context13) {
                    while (1) {
                        switch (_context13.prev = _context13.next) {
                            case 0:
                                return _context13.abrupt('return', _this.doFetch(_this.getUsersRoute() + '/email/verify/send', { method: 'post', body: JSON.stringify({ email: email }) }));

                            case 1:
                            case 'end':
                                return _context13.stop();
                        }
                    }
                }, _callee13, _this);
            }));

            return function (_x24) {
                return _ref13.apply(this, arguments);
            };
        }();

        this.login = function () {
            var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(loginId, password) {
                var token = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
                var deviceId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
                var ldapOnly = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

                var body, _ref15, headers, data;

                return regeneratorRuntime.wrap(function _callee14$(_context14) {
                    while (1) {
                        switch (_context14.prev = _context14.next) {
                            case 0:
                                _this.trackEvent('api', 'api_users_login');

                                if (ldapOnly) {
                                    _this.trackEvent('api', 'api_users_login_ldap');
                                }

                                body = {
                                    device_id: deviceId,
                                    login_id: loginId,
                                    password: password,
                                    token: token
                                };


                                if (ldapOnly) {
                                    body.ldap_only = 'true';
                                }

                                _context14.next = 6;
                                return _this.doFetchWithResponse(_this.getUsersRoute() + '/login', { method: 'post', body: JSON.stringify(body) });

                            case 6:
                                _ref15 = _context14.sent;
                                headers = _ref15.headers;
                                data = _ref15.data;


                                if (headers.has(HEADER_TOKEN)) {
                                    _this.token = headers.get(HEADER_TOKEN);
                                }

                                return _context14.abrupt('return', data);

                            case 11:
                            case 'end':
                                return _context14.stop();
                        }
                    }
                }, _callee14, _this);
            }));

            return function (_x25, _x26) {
                return _ref14.apply(this, arguments);
            };
        }();

        this.loginById = function () {
            var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(id, password) {
                var token = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
                var deviceId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

                var body, _ref17, headers, data;

                return regeneratorRuntime.wrap(function _callee15$(_context15) {
                    while (1) {
                        switch (_context15.prev = _context15.next) {
                            case 0:
                                _this.trackEvent('api', 'api_users_login');

                                body = {
                                    device_id: deviceId,
                                    id: id,
                                    password: password,
                                    token: token
                                };
                                _context15.next = 4;
                                return _this.doFetchWithResponse(_this.getUsersRoute() + '/login', { method: 'post', body: JSON.stringify(body) });

                            case 4:
                                _ref17 = _context15.sent;
                                headers = _ref17.headers;
                                data = _ref17.data;


                                if (headers.has(HEADER_TOKEN)) {
                                    _this.token = headers.get(HEADER_TOKEN);
                                }

                                return _context15.abrupt('return', data);

                            case 9:
                            case 'end':
                                return _context15.stop();
                        }
                    }
                }, _callee15, _this);
            }));

            return function (_x30, _x31) {
                return _ref16.apply(this, arguments);
            };
        }();

        this.logout = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
            var _ref19, response;

            return regeneratorRuntime.wrap(function _callee16$(_context16) {
                while (1) {
                    switch (_context16.prev = _context16.next) {
                        case 0:
                            _this.trackEvent('api', 'api_users_logout');

                            _context16.next = 3;
                            return _this.doFetchWithResponse(_this.getUsersRoute() + '/logout', { method: 'post' });

                        case 3:
                            _ref19 = _context16.sent;
                            response = _ref19.response;


                            if (response.ok) {
                                _this.token = '';
                            }

                            _this.serverVersion = '';

                            return _context16.abrupt('return', response);

                        case 8:
                        case 'end':
                            return _context16.stop();
                    }
                }
            }, _callee16, _this);
        }));

        this.getProfiles = function () {
            var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
                var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                var perPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : PER_PAGE_DEFAULT;
                return regeneratorRuntime.wrap(function _callee17$(_context17) {
                    while (1) {
                        switch (_context17.prev = _context17.next) {
                            case 0:
                                _this.trackEvent('api', 'api_profiles_get');

                                return _context17.abrupt('return', _this.doFetch('' + _this.getUsersRoute() + buildQueryString({ page: page, per_page: perPage }), { method: 'get' }));

                            case 2:
                            case 'end':
                                return _context17.stop();
                        }
                    }
                }, _callee17, _this);
            }));

            return function () {
                return _ref20.apply(this, arguments);
            };
        }();

        this.getProfilesByIds = function () {
            var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(userIds) {
                return regeneratorRuntime.wrap(function _callee18$(_context18) {
                    while (1) {
                        switch (_context18.prev = _context18.next) {
                            case 0:
                                _this.trackEvent('api', 'api_profiles_get_by_ids');

                                return _context18.abrupt('return', _this.doFetch(_this.getUsersRoute() + '/ids', { method: 'post', body: JSON.stringify(userIds) }));

                            case 2:
                            case 'end':
                                return _context18.stop();
                        }
                    }
                }, _callee18, _this);
            }));

            return function (_x36) {
                return _ref21.apply(this, arguments);
            };
        }();

        this.getProfilesByUsernames = function () {
            var _ref22 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(usernames) {
                return regeneratorRuntime.wrap(function _callee19$(_context19) {
                    while (1) {
                        switch (_context19.prev = _context19.next) {
                            case 0:
                                _this.trackEvent('api', 'api_profiles_get_by_usernames');

                                return _context19.abrupt('return', _this.doFetch(_this.getUsersRoute() + '/usernames', { method: 'post', body: JSON.stringify(usernames) }));

                            case 2:
                            case 'end':
                                return _context19.stop();
                        }
                    }
                }, _callee19, _this);
            }));

            return function (_x37) {
                return _ref22.apply(this, arguments);
            };
        }();

        this.getProfilesInTeam = function () {
            var _ref23 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(teamId) {
                var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
                var perPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PER_PAGE_DEFAULT;
                var sort = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
                return regeneratorRuntime.wrap(function _callee20$(_context20) {
                    while (1) {
                        switch (_context20.prev = _context20.next) {
                            case 0:
                                _this.trackEvent('api', 'api_profiles_get_in_team', { team_id: teamId, sort: sort });

                                return _context20.abrupt('return', _this.doFetch('' + _this.getUsersRoute() + buildQueryString({ in_team: teamId, page: page, per_page: perPage, sort: sort }), { method: 'get' }));

                            case 2:
                            case 'end':
                                return _context20.stop();
                        }
                    }
                }, _callee20, _this);
            }));

            return function (_x38) {
                return _ref23.apply(this, arguments);
            };
        }();

        this.getProfilesNotInTeam = function () {
            var _ref24 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(teamId) {
                var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
                var perPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PER_PAGE_DEFAULT;
                return regeneratorRuntime.wrap(function _callee21$(_context21) {
                    while (1) {
                        switch (_context21.prev = _context21.next) {
                            case 0:
                                _this.trackEvent('api', 'api_profiles_get_not_in_team', { team_id: teamId });

                                return _context21.abrupt('return', _this.doFetch('' + _this.getUsersRoute() + buildQueryString({ not_in_team: teamId, page: page, per_page: perPage }), { method: 'get' }));

                            case 2:
                            case 'end':
                                return _context21.stop();
                        }
                    }
                }, _callee21, _this);
            }));

            return function (_x42) {
                return _ref24.apply(this, arguments);
            };
        }();

        this.getProfilesWithoutTeam = function () {
            var _ref25 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22() {
                var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                var perPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : PER_PAGE_DEFAULT;
                return regeneratorRuntime.wrap(function _callee22$(_context22) {
                    while (1) {
                        switch (_context22.prev = _context22.next) {
                            case 0:
                                _this.trackEvent('api', 'api_profiles_get_without_team');

                                return _context22.abrupt('return', _this.doFetch('' + _this.getUsersRoute() + buildQueryString({ without_team: 1, page: page, per_page: perPage }), { method: 'get' }));

                            case 2:
                            case 'end':
                                return _context22.stop();
                        }
                    }
                }, _callee22, _this);
            }));

            return function () {
                return _ref25.apply(this, arguments);
            };
        }();

        this.getProfilesInChannel = function () {
            var _ref26 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23(channelId) {
                var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
                var perPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PER_PAGE_DEFAULT;
                var sort = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
                var serverVersion, queryStringObj;
                return regeneratorRuntime.wrap(function _callee23$(_context23) {
                    while (1) {
                        switch (_context23.prev = _context23.next) {
                            case 0:
                                _this.trackEvent('api', 'api_profiles_get_in_channel', { channel_id: channelId });

                                serverVersion = _this.getServerVersion();
                                queryStringObj = void 0;

                                if ((0, _helpers.isMinimumServerVersion)(serverVersion, 4, 7)) {
                                    queryStringObj = { in_channel: channelId, page: page, per_page: perPage, sort: sort };
                                } else {
                                    queryStringObj = { in_channel: channelId, page: page, per_page: perPage };
                                }
                                return _context23.abrupt('return', _this.doFetch('' + _this.getUsersRoute() + buildQueryString(queryStringObj), { method: 'get' }));

                            case 5:
                            case 'end':
                                return _context23.stop();
                        }
                    }
                }, _callee23, _this);
            }));

            return function (_x47) {
                return _ref26.apply(this, arguments);
            };
        }();

        this.getProfilesNotInChannel = function () {
            var _ref27 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee24(teamId, channelId) {
                var page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
                var perPage = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : PER_PAGE_DEFAULT;
                return regeneratorRuntime.wrap(function _callee24$(_context24) {
                    while (1) {
                        switch (_context24.prev = _context24.next) {
                            case 0:
                                _this.trackEvent('api', 'api_profiles_get_not_in_channel', { team_id: teamId, channel_id: channelId });

                                return _context24.abrupt('return', _this.doFetch('' + _this.getUsersRoute() + buildQueryString({ in_team: teamId, not_in_channel: channelId, page: page, per_page: perPage }), { method: 'get' }));

                            case 2:
                            case 'end':
                                return _context24.stop();
                        }
                    }
                }, _callee24, _this);
            }));

            return function (_x51, _x52) {
                return _ref27.apply(this, arguments);
            };
        }();

        this.getMe = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee25() {
            return regeneratorRuntime.wrap(function _callee25$(_context25) {
                while (1) {
                    switch (_context25.prev = _context25.next) {
                        case 0:
                            return _context25.abrupt('return', _this.doFetch('' + _this.getUserRoute('me'), { method: 'get' }));

                        case 1:
                        case 'end':
                            return _context25.stop();
                    }
                }
            }, _callee25, _this);
        }));

        this.getUser = function () {
            var _ref29 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee26(userId) {
                return regeneratorRuntime.wrap(function _callee26$(_context26) {
                    while (1) {
                        switch (_context26.prev = _context26.next) {
                            case 0:
                                return _context26.abrupt('return', _this.doFetch('' + _this.getUserRoute(userId), { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context26.stop();
                        }
                    }
                }, _callee26, _this);
            }));

            return function (_x55) {
                return _ref29.apply(this, arguments);
            };
        }();

        this.getUserByUsername = function () {
            var _ref30 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee27(username) {
                return regeneratorRuntime.wrap(function _callee27$(_context27) {
                    while (1) {
                        switch (_context27.prev = _context27.next) {
                            case 0:
                                return _context27.abrupt('return', _this.doFetch(_this.getUsersRoute() + '/username/' + username, { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context27.stop();
                        }
                    }
                }, _callee27, _this);
            }));

            return function (_x56) {
                return _ref30.apply(this, arguments);
            };
        }();

        this.getUserByEmail = function () {
            var _ref31 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee28(email) {
                return regeneratorRuntime.wrap(function _callee28$(_context28) {
                    while (1) {
                        switch (_context28.prev = _context28.next) {
                            case 0:
                                return _context28.abrupt('return', _this.doFetch(_this.getUsersRoute() + '/email/' + email, { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context28.stop();
                        }
                    }
                }, _callee28, _this);
            }));

            return function (_x57) {
                return _ref31.apply(this, arguments);
            };
        }();

        this.getProfilePictureUrl = function (userId, lastPictureUpdate) {
            var params = {};
            if (lastPictureUpdate) {
                params._ = lastPictureUpdate;
            }

            return _this.getUserRoute(userId) + '/image' + buildQueryString(params);
        };

        this.autocompleteUsers = function () {
            var _ref32 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee29(name, teamId, channelId) {
                return regeneratorRuntime.wrap(function _callee29$(_context29) {
                    while (1) {
                        switch (_context29.prev = _context29.next) {
                            case 0:
                                return _context29.abrupt('return', _this.doFetch(_this.getUsersRoute() + '/autocomplete' + buildQueryString({ in_team: teamId, in_channel: channelId, name: name }), { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context29.stop();
                        }
                    }
                }, _callee29, _this);
            }));

            return function (_x58, _x59, _x60) {
                return _ref32.apply(this, arguments);
            };
        }();

        this.getSessions = function () {
            var _ref33 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee30(userId) {
                return regeneratorRuntime.wrap(function _callee30$(_context30) {
                    while (1) {
                        switch (_context30.prev = _context30.next) {
                            case 0:
                                return _context30.abrupt('return', _this.doFetch(_this.getUserRoute(userId) + '/sessions', { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context30.stop();
                        }
                    }
                }, _callee30, _this);
            }));

            return function (_x61) {
                return _ref33.apply(this, arguments);
            };
        }();

        this.getCurrentSession = function () {
            var _ref34 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee31(userId, token) {
                var sessions;
                return regeneratorRuntime.wrap(function _callee31$(_context31) {
                    while (1) {
                        switch (_context31.prev = _context31.next) {
                            case 0:
                                _context31.next = 2;
                                return _this.getSessions(userId);

                            case 2:
                                sessions = _context31.sent;
                                return _context31.abrupt('return', sessions.find(function (s) {
                                    return s.token === token;
                                }));

                            case 4:
                            case 'end':
                                return _context31.stop();
                        }
                    }
                }, _callee31, _this);
            }));

            return function (_x62, _x63) {
                return _ref34.apply(this, arguments);
            };
        }();

        this.revokeSession = function () {
            var _ref35 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee32(userId, sessionId) {
                return regeneratorRuntime.wrap(function _callee32$(_context32) {
                    while (1) {
                        switch (_context32.prev = _context32.next) {
                            case 0:
                                return _context32.abrupt('return', _this.doFetch(_this.getUserRoute(userId) + '/sessions/revoke', { method: 'post', body: JSON.stringify({ session_id: sessionId }) }));

                            case 1:
                            case 'end':
                                return _context32.stop();
                        }
                    }
                }, _callee32, _this);
            }));

            return function (_x64, _x65) {
                return _ref35.apply(this, arguments);
            };
        }();

        this.revokeAllSessionsForUser = function () {
            var _ref36 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee33(userId) {
                return regeneratorRuntime.wrap(function _callee33$(_context33) {
                    while (1) {
                        switch (_context33.prev = _context33.next) {
                            case 0:
                                return _context33.abrupt('return', _this.doFetch(_this.getUserRoute(userId) + '/sessions/revoke/all', { method: 'post' }));

                            case 1:
                            case 'end':
                                return _context33.stop();
                        }
                    }
                }, _callee33, _this);
            }));

            return function (_x66) {
                return _ref36.apply(this, arguments);
            };
        }();

        this.getUserAudits = function () {
            var _ref37 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee34(userId) {
                var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
                var perPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PER_PAGE_DEFAULT;
                return regeneratorRuntime.wrap(function _callee34$(_context34) {
                    while (1) {
                        switch (_context34.prev = _context34.next) {
                            case 0:
                                return _context34.abrupt('return', _this.doFetch(_this.getUserRoute(userId) + '/audits' + buildQueryString({ page: page, per_page: perPage }), { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context34.stop();
                        }
                    }
                }, _callee34, _this);
            }));

            return function (_x67) {
                return _ref37.apply(this, arguments);
            };
        }();

        this.checkUserMfa = function () {
            var _ref38 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee35(loginId) {
                return regeneratorRuntime.wrap(function _callee35$(_context35) {
                    while (1) {
                        switch (_context35.prev = _context35.next) {
                            case 0:
                                return _context35.abrupt('return', _this.doFetch(_this.getUsersRoute() + '/mfa', { method: 'post', body: JSON.stringify({ login_id: loginId }) }));

                            case 1:
                            case 'end':
                                return _context35.stop();
                        }
                    }
                }, _callee35, _this);
            }));

            return function (_x70) {
                return _ref38.apply(this, arguments);
            };
        }();

        this.generateMfaSecret = function () {
            var _ref39 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee36(userId) {
                return regeneratorRuntime.wrap(function _callee36$(_context36) {
                    while (1) {
                        switch (_context36.prev = _context36.next) {
                            case 0:
                                return _context36.abrupt('return', _this.doFetch(_this.getUserRoute(userId) + '/mfa/generate', { method: 'post' }));

                            case 1:
                            case 'end':
                                return _context36.stop();
                        }
                    }
                }, _callee36, _this);
            }));

            return function (_x71) {
                return _ref39.apply(this, arguments);
            };
        }();

        this.attachDevice = function () {
            var _ref40 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee37(deviceId) {
                return regeneratorRuntime.wrap(function _callee37$(_context37) {
                    while (1) {
                        switch (_context37.prev = _context37.next) {
                            case 0:
                                return _context37.abrupt('return', _this.doFetch(_this.getUsersRoute() + '/sessions/device', { method: 'put', body: JSON.stringify({ device_id: deviceId }) }));

                            case 1:
                            case 'end':
                                return _context37.stop();
                        }
                    }
                }, _callee37, _this);
            }));

            return function (_x72) {
                return _ref40.apply(this, arguments);
            };
        }();

        this.searchUsers = function (term, options) {
            _this.trackEvent('api', 'api_search_users');

            return _this.doFetch(_this.getUsersRoute() + '/search', { method: 'post', body: JSON.stringify(_extends({ term: term }, options)) });
        };

        this.getStatusesByIds = function () {
            var _ref41 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee38(userIds) {
                return regeneratorRuntime.wrap(function _callee38$(_context38) {
                    while (1) {
                        switch (_context38.prev = _context38.next) {
                            case 0:
                                return _context38.abrupt('return', _this.doFetch(_this.getUsersRoute() + '/status/ids', { method: 'post', body: JSON.stringify(userIds) }));

                            case 1:
                            case 'end':
                                return _context38.stop();
                        }
                    }
                }, _callee38, _this);
            }));

            return function (_x73) {
                return _ref41.apply(this, arguments);
            };
        }();

        this.getStatus = function () {
            var _ref42 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee39(userId) {
                return regeneratorRuntime.wrap(function _callee39$(_context39) {
                    while (1) {
                        switch (_context39.prev = _context39.next) {
                            case 0:
                                return _context39.abrupt('return', _this.doFetch(_this.getUserRoute(userId) + '/status', { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context39.stop();
                        }
                    }
                }, _callee39, _this);
            }));

            return function (_x74) {
                return _ref42.apply(this, arguments);
            };
        }();

        this.updateStatus = function () {
            var _ref43 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee40(status) {
                return regeneratorRuntime.wrap(function _callee40$(_context40) {
                    while (1) {
                        switch (_context40.prev = _context40.next) {
                            case 0:
                                return _context40.abrupt('return', _this.doFetch(_this.getUserRoute(status.user_id) + '/status', { method: 'put', body: JSON.stringify(status) }));

                            case 1:
                            case 'end':
                                return _context40.stop();
                        }
                    }
                }, _callee40, _this);
            }));

            return function (_x75) {
                return _ref43.apply(this, arguments);
            };
        }();

        this.switchEmailToOAuth = function () {
            var _ref44 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee41(service, email, password) {
                var mfaCode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
                return regeneratorRuntime.wrap(function _callee41$(_context41) {
                    while (1) {
                        switch (_context41.prev = _context41.next) {
                            case 0:
                                _this.trackEvent('api', 'api_users_email_to_oauth');

                                return _context41.abrupt('return', _this.doFetch(_this.getUsersRoute() + '/login/switch', { method: 'post', body: JSON.stringify({ current_service: 'email', new_service: service, email: email, password: password, mfa_code: mfaCode }) }));

                            case 2:
                            case 'end':
                                return _context41.stop();
                        }
                    }
                }, _callee41, _this);
            }));

            return function (_x76, _x77, _x78) {
                return _ref44.apply(this, arguments);
            };
        }();

        this.switchOAuthToEmail = function () {
            var _ref45 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee42(currentService, email, password) {
                return regeneratorRuntime.wrap(function _callee42$(_context42) {
                    while (1) {
                        switch (_context42.prev = _context42.next) {
                            case 0:
                                _this.trackEvent('api', 'api_users_oauth_to_email');

                                return _context42.abrupt('return', _this.doFetch(_this.getUsersRoute() + '/login/switch', { method: 'post', body: JSON.stringify({ current_service: currentService, new_service: 'email', email: email, new_password: password }) }));

                            case 2:
                            case 'end':
                                return _context42.stop();
                        }
                    }
                }, _callee42, _this);
            }));

            return function (_x80, _x81, _x82) {
                return _ref45.apply(this, arguments);
            };
        }();

        this.switchEmailToLdap = function () {
            var _ref46 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee43(email, emailPassword, ldapId, ldapPassword) {
                var mfaCode = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
                return regeneratorRuntime.wrap(function _callee43$(_context43) {
                    while (1) {
                        switch (_context43.prev = _context43.next) {
                            case 0:
                                _this.trackEvent('api', 'api_users_email_to_ldap');

                                return _context43.abrupt('return', _this.doFetch(_this.getUsersRoute() + '/login/switch', { method: 'post', body: JSON.stringify({ current_service: 'email', new_service: 'ldap', email: email, password: emailPassword, ldap_id: ldapId, new_password: ldapPassword, mfa_code: mfaCode }) }));

                            case 2:
                            case 'end':
                                return _context43.stop();
                        }
                    }
                }, _callee43, _this);
            }));

            return function (_x83, _x84, _x85, _x86) {
                return _ref46.apply(this, arguments);
            };
        }();

        this.switchLdapToEmail = function () {
            var _ref47 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee44(ldapPassword, email, emailPassword) {
                var mfaCode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
                return regeneratorRuntime.wrap(function _callee44$(_context44) {
                    while (1) {
                        switch (_context44.prev = _context44.next) {
                            case 0:
                                _this.trackEvent('api', 'api_users_ldap_to_email');

                                return _context44.abrupt('return', _this.doFetch(_this.getUsersRoute() + '/login/switch', { method: 'post', body: JSON.stringify({ current_service: 'ldap', new_service: 'email', email: email, password: ldapPassword, new_password: emailPassword, mfa_code: mfaCode }) }));

                            case 2:
                            case 'end':
                                return _context44.stop();
                        }
                    }
                }, _callee44, _this);
            }));

            return function (_x88, _x89, _x90) {
                return _ref47.apply(this, arguments);
            };
        }();

        this.getAuthorizedOAuthApps = function () {
            var _ref48 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee45(userId) {
                return regeneratorRuntime.wrap(function _callee45$(_context45) {
                    while (1) {
                        switch (_context45.prev = _context45.next) {
                            case 0:
                                return _context45.abrupt('return', _this.doFetch(_this.getUserRoute(userId) + '/oauth/apps/authorized', { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context45.stop();
                        }
                    }
                }, _callee45, _this);
            }));

            return function (_x92) {
                return _ref48.apply(this, arguments);
            };
        }();

        this.authorizeOAuthApp = function () {
            var _ref49 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee46(responseType, clientId, redirectUri, state, scope) {
                return regeneratorRuntime.wrap(function _callee46$(_context46) {
                    while (1) {
                        switch (_context46.prev = _context46.next) {
                            case 0:
                                return _context46.abrupt('return', _this.doFetch(_this.url + '/oauth/authorize', { method: 'post', body: JSON.stringify({ client_id: clientId, response_type: responseType, redirect_uri: redirectUri, state: state, scope: scope }) }));

                            case 1:
                            case 'end':
                                return _context46.stop();
                        }
                    }
                }, _callee46, _this);
            }));

            return function (_x93, _x94, _x95, _x96, _x97) {
                return _ref49.apply(this, arguments);
            };
        }();

        this.deauthorizeOAuthApp = function () {
            var _ref50 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee47(clientId) {
                return regeneratorRuntime.wrap(function _callee47$(_context47) {
                    while (1) {
                        switch (_context47.prev = _context47.next) {
                            case 0:
                                return _context47.abrupt('return', _this.doFetch(_this.url + '/oauth/deauthorize', { method: 'post', body: JSON.stringify({ client_id: clientId }) }));

                            case 1:
                            case 'end':
                                return _context47.stop();
                        }
                    }
                }, _callee47, _this);
            }));

            return function (_x98) {
                return _ref50.apply(this, arguments);
            };
        }();

        this.createUserAccessToken = function () {
            var _ref51 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee48(userId, description) {
                return regeneratorRuntime.wrap(function _callee48$(_context48) {
                    while (1) {
                        switch (_context48.prev = _context48.next) {
                            case 0:
                                _this.trackEvent('api', 'api_users_create_access_token');

                                return _context48.abrupt('return', _this.doFetch(_this.getUserRoute(userId) + '/tokens', { method: 'post', body: JSON.stringify({ description: description }) }));

                            case 2:
                            case 'end':
                                return _context48.stop();
                        }
                    }
                }, _callee48, _this);
            }));

            return function (_x99, _x100) {
                return _ref51.apply(this, arguments);
            };
        }();

        this.getUserAccessToken = function () {
            var _ref52 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee49(tokenId) {
                return regeneratorRuntime.wrap(function _callee49$(_context49) {
                    while (1) {
                        switch (_context49.prev = _context49.next) {
                            case 0:
                                return _context49.abrupt('return', _this.doFetch(_this.getUsersRoute() + '/tokens/' + tokenId, { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context49.stop();
                        }
                    }
                }, _callee49, _this);
            }));

            return function (_x101) {
                return _ref52.apply(this, arguments);
            };
        }();

        this.getUserAccessTokensForUser = function () {
            var _ref53 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee50(userId) {
                var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
                var perPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PER_PAGE_DEFAULT;
                return regeneratorRuntime.wrap(function _callee50$(_context50) {
                    while (1) {
                        switch (_context50.prev = _context50.next) {
                            case 0:
                                return _context50.abrupt('return', _this.doFetch(_this.getUserRoute(userId) + '/tokens' + buildQueryString({ page: page, per_page: perPage }), { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context50.stop();
                        }
                    }
                }, _callee50, _this);
            }));

            return function (_x102) {
                return _ref53.apply(this, arguments);
            };
        }();

        this.getUserAccessTokens = function () {
            var _ref54 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee51() {
                var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                var perPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : PER_PAGE_DEFAULT;
                return regeneratorRuntime.wrap(function _callee51$(_context51) {
                    while (1) {
                        switch (_context51.prev = _context51.next) {
                            case 0:
                                return _context51.abrupt('return', _this.doFetch(_this.getUsersRoute() + '/tokens' + buildQueryString({ page: page, per_page: perPage }), { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context51.stop();
                        }
                    }
                }, _callee51, _this);
            }));

            return function () {
                return _ref54.apply(this, arguments);
            };
        }();

        this.revokeUserAccessToken = function () {
            var _ref55 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee52(tokenId) {
                return regeneratorRuntime.wrap(function _callee52$(_context52) {
                    while (1) {
                        switch (_context52.prev = _context52.next) {
                            case 0:
                                _this.trackEvent('api', 'api_users_revoke_access_token');

                                return _context52.abrupt('return', _this.doFetch(_this.getUsersRoute() + '/tokens/revoke', { method: 'post', body: JSON.stringify({ token_id: tokenId }) }));

                            case 2:
                            case 'end':
                                return _context52.stop();
                        }
                    }
                }, _callee52, _this);
            }));

            return function (_x107) {
                return _ref55.apply(this, arguments);
            };
        }();

        this.disableUserAccessToken = function () {
            var _ref56 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee53(tokenId) {
                return regeneratorRuntime.wrap(function _callee53$(_context53) {
                    while (1) {
                        switch (_context53.prev = _context53.next) {
                            case 0:
                                return _context53.abrupt('return', _this.doFetch(_this.getUsersRoute() + '/tokens/disable', { method: 'post', body: JSON.stringify({ token_id: tokenId }) }));

                            case 1:
                            case 'end':
                                return _context53.stop();
                        }
                    }
                }, _callee53, _this);
            }));

            return function (_x108) {
                return _ref56.apply(this, arguments);
            };
        }();

        this.enableUserAccessToken = function () {
            var _ref57 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee54(tokenId) {
                return regeneratorRuntime.wrap(function _callee54$(_context54) {
                    while (1) {
                        switch (_context54.prev = _context54.next) {
                            case 0:
                                return _context54.abrupt('return', _this.doFetch(_this.getUsersRoute() + '/tokens/enable', { method: 'post', body: JSON.stringify({ token_id: tokenId }) }));

                            case 1:
                            case 'end':
                                return _context54.stop();
                        }
                    }
                }, _callee54, _this);
            }));

            return function (_x109) {
                return _ref57.apply(this, arguments);
            };
        }();

        this.createTeam = function () {
            var _ref58 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee55(team) {
                return regeneratorRuntime.wrap(function _callee55$(_context55) {
                    while (1) {
                        switch (_context55.prev = _context55.next) {
                            case 0:
                                _this.trackEvent('api', 'api_teams_create');

                                return _context55.abrupt('return', _this.doFetch('' + _this.getTeamsRoute(), { method: 'post', body: JSON.stringify(team) }));

                            case 2:
                            case 'end':
                                return _context55.stop();
                        }
                    }
                }, _callee55, _this);
            }));

            return function (_x110) {
                return _ref58.apply(this, arguments);
            };
        }();

        this.deleteTeam = function () {
            var _ref59 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee56(teamId) {
                return regeneratorRuntime.wrap(function _callee56$(_context56) {
                    while (1) {
                        switch (_context56.prev = _context56.next) {
                            case 0:
                                _this.trackEvent('api', 'api_teams_delete');

                                return _context56.abrupt('return', _this.doFetch('' + _this.getTeamRoute(teamId), { method: 'delete' }));

                            case 2:
                            case 'end':
                                return _context56.stop();
                        }
                    }
                }, _callee56, _this);
            }));

            return function (_x111) {
                return _ref59.apply(this, arguments);
            };
        }();

        this.updateTeam = function () {
            var _ref60 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee57(team) {
                return regeneratorRuntime.wrap(function _callee57$(_context57) {
                    while (1) {
                        switch (_context57.prev = _context57.next) {
                            case 0:
                                _this.trackEvent('api', 'api_teams_update_name', { team_id: team.id });

                                return _context57.abrupt('return', _this.doFetch('' + _this.getTeamRoute(team.id), { method: 'put', body: JSON.stringify(team) }));

                            case 2:
                            case 'end':
                                return _context57.stop();
                        }
                    }
                }, _callee57, _this);
            }));

            return function (_x112) {
                return _ref60.apply(this, arguments);
            };
        }();

        this.checkIfTeamExists = function () {
            var _ref61 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee58(teamName) {
                return regeneratorRuntime.wrap(function _callee58$(_context58) {
                    while (1) {
                        switch (_context58.prev = _context58.next) {
                            case 0:
                                return _context58.abrupt('return', _this.doFetch(_this.getTeamNameRoute(teamName) + '/exists', { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context58.stop();
                        }
                    }
                }, _callee58, _this);
            }));

            return function (_x113) {
                return _ref61.apply(this, arguments);
            };
        }();

        this.getTeams = function () {
            var _ref62 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee59() {
                var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                var perPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : PER_PAGE_DEFAULT;
                return regeneratorRuntime.wrap(function _callee59$(_context59) {
                    while (1) {
                        switch (_context59.prev = _context59.next) {
                            case 0:
                                return _context59.abrupt('return', _this.doFetch('' + _this.getTeamsRoute() + buildQueryString({ page: page, per_page: perPage }), { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context59.stop();
                        }
                    }
                }, _callee59, _this);
            }));

            return function () {
                return _ref62.apply(this, arguments);
            };
        }();

        this.getTeam = function () {
            var _ref63 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee60(teamId) {
                return regeneratorRuntime.wrap(function _callee60$(_context60) {
                    while (1) {
                        switch (_context60.prev = _context60.next) {
                            case 0:
                                return _context60.abrupt('return', _this.doFetch(_this.getTeamRoute(teamId), { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context60.stop();
                        }
                    }
                }, _callee60, _this);
            }));

            return function (_x116) {
                return _ref63.apply(this, arguments);
            };
        }();

        this.getTeamByName = function () {
            var _ref64 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee61(teamName) {
                return regeneratorRuntime.wrap(function _callee61$(_context61) {
                    while (1) {
                        switch (_context61.prev = _context61.next) {
                            case 0:
                                _this.trackEvent('api', 'api_teams_get_team_by_name');

                                return _context61.abrupt('return', _this.doFetch(_this.getTeamNameRoute(teamName), { method: 'get' }));

                            case 2:
                            case 'end':
                                return _context61.stop();
                        }
                    }
                }, _callee61, _this);
            }));

            return function (_x117) {
                return _ref64.apply(this, arguments);
            };
        }();

        this.getMyTeams = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee62() {
            return regeneratorRuntime.wrap(function _callee62$(_context62) {
                while (1) {
                    switch (_context62.prev = _context62.next) {
                        case 0:
                            return _context62.abrupt('return', _this.doFetch(_this.getUserRoute('me') + '/teams', { method: 'get' }));

                        case 1:
                        case 'end':
                            return _context62.stop();
                    }
                }
            }, _callee62, _this);
        }));

        this.getTeamsForUser = function () {
            var _ref66 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee63(userId) {
                return regeneratorRuntime.wrap(function _callee63$(_context63) {
                    while (1) {
                        switch (_context63.prev = _context63.next) {
                            case 0:
                                return _context63.abrupt('return', _this.doFetch(_this.getUserRoute(userId) + '/teams', { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context63.stop();
                        }
                    }
                }, _callee63, _this);
            }));

            return function (_x118) {
                return _ref66.apply(this, arguments);
            };
        }();

        this.getMyTeamMembers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee64() {
            return regeneratorRuntime.wrap(function _callee64$(_context64) {
                while (1) {
                    switch (_context64.prev = _context64.next) {
                        case 0:
                            return _context64.abrupt('return', _this.doFetch(_this.getUserRoute('me') + '/teams/members', { method: 'get' }));

                        case 1:
                        case 'end':
                            return _context64.stop();
                    }
                }
            }, _callee64, _this);
        }));
        this.getMyTeamUnreads = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee65() {
            return regeneratorRuntime.wrap(function _callee65$(_context65) {
                while (1) {
                    switch (_context65.prev = _context65.next) {
                        case 0:
                            return _context65.abrupt('return', _this.doFetch(_this.getUserRoute('me') + '/teams/unread', { method: 'get' }));

                        case 1:
                        case 'end':
                            return _context65.stop();
                    }
                }
            }, _callee65, _this);
        }));

        this.getTeamMembers = function () {
            var _ref69 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee66(teamId) {
                var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
                var perPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PER_PAGE_DEFAULT;
                return regeneratorRuntime.wrap(function _callee66$(_context66) {
                    while (1) {
                        switch (_context66.prev = _context66.next) {
                            case 0:
                                return _context66.abrupt('return', _this.doFetch('' + _this.getTeamMembersRoute(teamId) + buildQueryString({ page: page, per_page: perPage }), { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context66.stop();
                        }
                    }
                }, _callee66, _this);
            }));

            return function (_x119) {
                return _ref69.apply(this, arguments);
            };
        }();

        this.getTeamMembersForUser = function () {
            var _ref70 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee67(userId) {
                return regeneratorRuntime.wrap(function _callee67$(_context67) {
                    while (1) {
                        switch (_context67.prev = _context67.next) {
                            case 0:
                                return _context67.abrupt('return', _this.doFetch(_this.getUserRoute(userId) + '/teams/members', { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context67.stop();
                        }
                    }
                }, _callee67, _this);
            }));

            return function (_x122) {
                return _ref70.apply(this, arguments);
            };
        }();

        this.getTeamMember = function () {
            var _ref71 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee68(teamId, userId) {
                return regeneratorRuntime.wrap(function _callee68$(_context68) {
                    while (1) {
                        switch (_context68.prev = _context68.next) {
                            case 0:
                                return _context68.abrupt('return', _this.doFetch('' + _this.getTeamMemberRoute(teamId, userId), { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context68.stop();
                        }
                    }
                }, _callee68, _this);
            }));

            return function (_x123, _x124) {
                return _ref71.apply(this, arguments);
            };
        }();

        this.getTeamMembersByIds = function () {
            var _ref72 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee69(teamId, userIds) {
                return regeneratorRuntime.wrap(function _callee69$(_context69) {
                    while (1) {
                        switch (_context69.prev = _context69.next) {
                            case 0:
                                return _context69.abrupt('return', _this.doFetch(_this.getTeamMembersRoute(teamId) + '/ids', { method: 'post', body: JSON.stringify(userIds) }));

                            case 1:
                            case 'end':
                                return _context69.stop();
                        }
                    }
                }, _callee69, _this);
            }));

            return function (_x125, _x126) {
                return _ref72.apply(this, arguments);
            };
        }();

        this.addToTeam = function () {
            var _ref73 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee70(teamId, userId) {
                var member;
                return regeneratorRuntime.wrap(function _callee70$(_context70) {
                    while (1) {
                        switch (_context70.prev = _context70.next) {
                            case 0:
                                _this.trackEvent('api', 'api_teams_invite_members', { team_id: teamId });

                                member = { user_id: userId, team_id: teamId };
                                return _context70.abrupt('return', _this.doFetch('' + _this.getTeamMembersRoute(teamId), { method: 'post', body: JSON.stringify(member) }));

                            case 3:
                            case 'end':
                                return _context70.stop();
                        }
                    }
                }, _callee70, _this);
            }));

            return function (_x127, _x128) {
                return _ref73.apply(this, arguments);
            };
        }();

        this.addToTeamFromInvite = function () {
            var _ref74 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee71() {
                var hash = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
                var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
                var inviteId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
                var query;
                return regeneratorRuntime.wrap(function _callee71$(_context71) {
                    while (1) {
                        switch (_context71.prev = _context71.next) {
                            case 0:
                                _this.trackEvent('api', 'api_teams_invite_members');

                                query = buildQueryString({ hash: hash, data: data, invite_id: inviteId });
                                return _context71.abrupt('return', _this.doFetch(_this.getTeamsRoute() + '/members/invite' + query, { method: 'post' }));

                            case 3:
                            case 'end':
                                return _context71.stop();
                        }
                    }
                }, _callee71, _this);
            }));

            return function () {
                return _ref74.apply(this, arguments);
            };
        }();

        this.addUsersToTeam = function () {
            var _ref75 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee72(teamId, userIds) {
                var members;
                return regeneratorRuntime.wrap(function _callee72$(_context72) {
                    while (1) {
                        switch (_context72.prev = _context72.next) {
                            case 0:
                                _this.trackEvent('api', 'api_teams_batch_add_members', { team_id: teamId, count: userIds.length });

                                members = [];

                                userIds.forEach(function (id) {
                                    return members.push({ team_id: teamId, user_id: id });
                                });
                                return _context72.abrupt('return', _this.doFetch(_this.getTeamMembersRoute(teamId) + '/batch', { method: 'post', body: JSON.stringify(members) }));

                            case 4:
                            case 'end':
                                return _context72.stop();
                        }
                    }
                }, _callee72, _this);
            }));

            return function (_x132, _x133) {
                return _ref75.apply(this, arguments);
            };
        }();

        this.joinTeam = function () {
            var _ref76 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee73(inviteId) {
                var query;
                return regeneratorRuntime.wrap(function _callee73$(_context73) {
                    while (1) {
                        switch (_context73.prev = _context73.next) {
                            case 0:
                                query = buildQueryString({ invite_id: inviteId });
                                return _context73.abrupt('return', _this.doFetch(_this.getTeamsRoute() + '/members/invite' + query, { method: 'post' }));

                            case 2:
                            case 'end':
                                return _context73.stop();
                        }
                    }
                }, _callee73, _this);
            }));

            return function (_x134) {
                return _ref76.apply(this, arguments);
            };
        }();

        this.removeFromTeam = function () {
            var _ref77 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee74(teamId, userId) {
                return regeneratorRuntime.wrap(function _callee74$(_context74) {
                    while (1) {
                        switch (_context74.prev = _context74.next) {
                            case 0:
                                _this.trackEvent('api', 'api_teams_remove_members', { team_id: teamId });

                                return _context74.abrupt('return', _this.doFetch('' + _this.getTeamMemberRoute(teamId, userId), { method: 'delete' }));

                            case 2:
                            case 'end':
                                return _context74.stop();
                        }
                    }
                }, _callee74, _this);
            }));

            return function (_x135, _x136) {
                return _ref77.apply(this, arguments);
            };
        }();

        this.getTeamStats = function () {
            var _ref78 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee75(teamId) {
                return regeneratorRuntime.wrap(function _callee75$(_context75) {
                    while (1) {
                        switch (_context75.prev = _context75.next) {
                            case 0:
                                return _context75.abrupt('return', _this.doFetch(_this.getTeamRoute(teamId) + '/stats', { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context75.stop();
                        }
                    }
                }, _callee75, _this);
            }));

            return function (_x137) {
                return _ref78.apply(this, arguments);
            };
        }();

        this.getTeamInviteInfo = function () {
            var _ref79 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee76(inviteId) {
                return regeneratorRuntime.wrap(function _callee76$(_context76) {
                    while (1) {
                        switch (_context76.prev = _context76.next) {
                            case 0:
                                return _context76.abrupt('return', _this.doFetch(_this.getTeamsRoute() + '/invite/' + inviteId, { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context76.stop();
                        }
                    }
                }, _callee76, _this);
            }));

            return function (_x138) {
                return _ref79.apply(this, arguments);
            };
        }();

        this.updateTeamMemberRoles = function () {
            var _ref80 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee77(teamId, userId, roles) {
                return regeneratorRuntime.wrap(function _callee77$(_context77) {
                    while (1) {
                        switch (_context77.prev = _context77.next) {
                            case 0:
                                _this.trackEvent('api', 'api_teams_update_member_roles', { team_id: teamId });

                                return _context77.abrupt('return', _this.doFetch(_this.getTeamMemberRoute(teamId, userId) + '/roles', { method: 'put', body: JSON.stringify({ roles: roles }) }));

                            case 2:
                            case 'end':
                                return _context77.stop();
                        }
                    }
                }, _callee77, _this);
            }));

            return function (_x139, _x140, _x141) {
                return _ref80.apply(this, arguments);
            };
        }();

        this.sendEmailInvitesToTeam = function () {
            var _ref81 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee78(teamId, emails) {
                return regeneratorRuntime.wrap(function _callee78$(_context78) {
                    while (1) {
                        switch (_context78.prev = _context78.next) {
                            case 0:
                                _this.trackEvent('api', 'api_teams_invite_members', { team_id: teamId });

                                return _context78.abrupt('return', _this.doFetch(_this.getTeamRoute(teamId) + '/invite/email', { method: 'post', body: JSON.stringify(emails) }));

                            case 2:
                            case 'end':
                                return _context78.stop();
                        }
                    }
                }, _callee78, _this);
            }));

            return function (_x142, _x143) {
                return _ref81.apply(this, arguments);
            };
        }();

        this.importTeam = function () {
            var _ref82 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee79(teamId, file, importFrom) {
                var formData, request;
                return regeneratorRuntime.wrap(function _callee79$(_context79) {
                    while (1) {
                        switch (_context79.prev = _context79.next) {
                            case 0:
                                formData = new FormData();

                                formData.append('file', file, file.name);
                                formData.append('filesize', file.size);
                                formData.append('importFrom', importFrom);

                                request = {
                                    method: 'post',
                                    body: formData
                                };


                                if (formData.getBoundary) {
                                    request.headers = {
                                        'Content-Type': 'multipart/form-data; boundary=' + formData.getBoundary()
                                    };
                                }

                                return _context79.abrupt('return', _this.doFetch(_this.getTeamRoute(teamId) + '/import', request));

                            case 7:
                            case 'end':
                                return _context79.stop();
                        }
                    }
                }, _callee79, _this);
            }));

            return function (_x144, _x145, _x146) {
                return _ref82.apply(this, arguments);
            };
        }();

        this.getTeamIconUrl = function (teamId, lastTeamIconUpdate) {
            var params = {};
            if (lastTeamIconUpdate) {
                params._ = lastTeamIconUpdate;
            }

            return _this.getTeamRoute(teamId) + '/image' + buildQueryString(params);
        };

        this.setTeamIcon = function () {
            var _ref83 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee80(teamId, imageData) {
                var formData, request;
                return regeneratorRuntime.wrap(function _callee80$(_context80) {
                    while (1) {
                        switch (_context80.prev = _context80.next) {
                            case 0:
                                _this.trackEvent('api', 'api_team_set_team_icon');

                                formData = new FormData();

                                formData.append('image', imageData);

                                request = {
                                    method: 'post',
                                    body: formData
                                };


                                if (formData.getBoundary) {
                                    request.headers = {
                                        'Content-Type': 'multipart/form-data; boundary=' + formData.getBoundary()
                                    };
                                }

                                return _context80.abrupt('return', _this.doFetch(_this.getTeamRoute(teamId) + '/image', request));

                            case 6:
                            case 'end':
                                return _context80.stop();
                        }
                    }
                }, _callee80, _this);
            }));

            return function (_x147, _x148) {
                return _ref83.apply(this, arguments);
            };
        }();

        this.createChannel = function () {
            var _ref84 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee81(channel) {
                return regeneratorRuntime.wrap(function _callee81$(_context81) {
                    while (1) {
                        switch (_context81.prev = _context81.next) {
                            case 0:
                                _this.trackEvent('api', 'api_channels_create', { team_id: channel.team_id });

                                return _context81.abrupt('return', _this.doFetch('' + _this.getChannelsRoute(), { method: 'post', body: JSON.stringify(channel) }));

                            case 2:
                            case 'end':
                                return _context81.stop();
                        }
                    }
                }, _callee81, _this);
            }));

            return function (_x149) {
                return _ref84.apply(this, arguments);
            };
        }();

        this.createDirectChannel = function () {
            var _ref85 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee82(userIds) {
                return regeneratorRuntime.wrap(function _callee82$(_context82) {
                    while (1) {
                        switch (_context82.prev = _context82.next) {
                            case 0:
                                _this.trackEvent('api', 'api_channels_create_direct');

                                return _context82.abrupt('return', _this.doFetch(_this.getChannelsRoute() + '/direct', { method: 'post', body: JSON.stringify(userIds) }));

                            case 2:
                            case 'end':
                                return _context82.stop();
                        }
                    }
                }, _callee82, _this);
            }));

            return function (_x150) {
                return _ref85.apply(this, arguments);
            };
        }();

        this.createGroupChannel = function () {
            var _ref86 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee83(userIds) {
                return regeneratorRuntime.wrap(function _callee83$(_context83) {
                    while (1) {
                        switch (_context83.prev = _context83.next) {
                            case 0:
                                _this.trackEvent('api', 'api_channels_create_group');

                                return _context83.abrupt('return', _this.doFetch(_this.getChannelsRoute() + '/group', { method: 'post', body: JSON.stringify(userIds) }));

                            case 2:
                            case 'end':
                                return _context83.stop();
                        }
                    }
                }, _callee83, _this);
            }));

            return function (_x151) {
                return _ref86.apply(this, arguments);
            };
        }();

        this.deleteChannel = function () {
            var _ref87 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee84(channelId) {
                return regeneratorRuntime.wrap(function _callee84$(_context84) {
                    while (1) {
                        switch (_context84.prev = _context84.next) {
                            case 0:
                                _this.trackEvent('api', 'api_channels_delete', { channel_id: channelId });

                                return _context84.abrupt('return', _this.doFetch('' + _this.getChannelRoute(channelId), { method: 'delete' }));

                            case 2:
                            case 'end':
                                return _context84.stop();
                        }
                    }
                }, _callee84, _this);
            }));

            return function (_x152) {
                return _ref87.apply(this, arguments);
            };
        }();

        this.updateChannel = function () {
            var _ref88 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee85(channel) {
                return regeneratorRuntime.wrap(function _callee85$(_context85) {
                    while (1) {
                        switch (_context85.prev = _context85.next) {
                            case 0:
                                _this.trackEvent('api', 'api_channels_update', { channel_id: channel.id });

                                return _context85.abrupt('return', _this.doFetch('' + _this.getChannelRoute(channel.id), { method: 'put', body: JSON.stringify(channel) }));

                            case 2:
                            case 'end':
                                return _context85.stop();
                        }
                    }
                }, _callee85, _this);
            }));

            return function (_x153) {
                return _ref88.apply(this, arguments);
            };
        }();

        this.patchChannel = function () {
            var _ref89 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee86(channelId, patch) {
                return regeneratorRuntime.wrap(function _callee86$(_context86) {
                    while (1) {
                        switch (_context86.prev = _context86.next) {
                            case 0:
                                _this.trackEvent('api', 'api_channels_patch', { channel_id: channelId });

                                return _context86.abrupt('return', _this.doFetch(_this.getChannelRoute(channelId) + '/patch', { method: 'put', body: JSON.stringify(patch) }));

                            case 2:
                            case 'end':
                                return _context86.stop();
                        }
                    }
                }, _callee86, _this);
            }));

            return function (_x154, _x155) {
                return _ref89.apply(this, arguments);
            };
        }();

        this.updateChannelNotifyProps = function () {
            var _ref90 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee87(props) {
                return regeneratorRuntime.wrap(function _callee87$(_context87) {
                    while (1) {
                        switch (_context87.prev = _context87.next) {
                            case 0:
                                _this.trackEvent('api', 'api_users_update_channel_notifcations', { channel_id: props.channel_id });

                                return _context87.abrupt('return', _this.doFetch(_this.getChannelMemberRoute(props.channel_id, props.user_id) + '/notify_props', { method: 'put', body: JSON.stringify(props) }));

                            case 2:
                            case 'end':
                                return _context87.stop();
                        }
                    }
                }, _callee87, _this);
            }));

            return function (_x156) {
                return _ref90.apply(this, arguments);
            };
        }();

        this.getChannel = function () {
            var _ref91 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee88(channelId) {
                return regeneratorRuntime.wrap(function _callee88$(_context88) {
                    while (1) {
                        switch (_context88.prev = _context88.next) {
                            case 0:
                                _this.trackEvent('api', 'api_channel_get', { channel_id: channelId });

                                return _context88.abrupt('return', _this.doFetch('' + _this.getChannelRoute(channelId), { method: 'get' }));

                            case 2:
                            case 'end':
                                return _context88.stop();
                        }
                    }
                }, _callee88, _this);
            }));

            return function (_x157) {
                return _ref91.apply(this, arguments);
            };
        }();

        this.getChannelByName = function () {
            var _ref92 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee89(teamId, channelName) {
                return regeneratorRuntime.wrap(function _callee89$(_context89) {
                    while (1) {
                        switch (_context89.prev = _context89.next) {
                            case 0:
                                return _context89.abrupt('return', _this.doFetch(_this.getTeamRoute(teamId) + '/channels/name/' + channelName, { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context89.stop();
                        }
                    }
                }, _callee89, _this);
            }));

            return function (_x158, _x159) {
                return _ref92.apply(this, arguments);
            };
        }();

        this.getChannelByNameAndTeamName = function () {
            var _ref93 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee90(teamName, channelName) {
                return regeneratorRuntime.wrap(function _callee90$(_context90) {
                    while (1) {
                        switch (_context90.prev = _context90.next) {
                            case 0:
                                _this.trackEvent('api', 'api_channel_get_by_name_and_teamName', { channel_name: channelName, team_name: teamName });

                                return _context90.abrupt('return', _this.doFetch(_this.getTeamNameRoute(teamName) + '/channels/name/' + channelName, { method: 'get' }));

                            case 2:
                            case 'end':
                                return _context90.stop();
                        }
                    }
                }, _callee90, _this);
            }));

            return function (_x160, _x161) {
                return _ref93.apply(this, arguments);
            };
        }();

        this.getChannels = function () {
            var _ref94 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee91(teamId) {
                var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
                var perPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PER_PAGE_DEFAULT;
                return regeneratorRuntime.wrap(function _callee91$(_context91) {
                    while (1) {
                        switch (_context91.prev = _context91.next) {
                            case 0:
                                return _context91.abrupt('return', _this.doFetch(_this.getTeamRoute(teamId) + '/channels' + buildQueryString({ page: page, per_page: perPage }), { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context91.stop();
                        }
                    }
                }, _callee91, _this);
            }));

            return function (_x162) {
                return _ref94.apply(this, arguments);
            };
        }();

        this.getMyChannels = function () {
            var _ref95 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee92(teamId) {
                return regeneratorRuntime.wrap(function _callee92$(_context92) {
                    while (1) {
                        switch (_context92.prev = _context92.next) {
                            case 0:
                                return _context92.abrupt('return', _this.doFetch(_this.getUserRoute('me') + '/teams/' + teamId + '/channels', { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context92.stop();
                        }
                    }
                }, _callee92, _this);
            }));

            return function (_x165) {
                return _ref95.apply(this, arguments);
            };
        }();

        this.getMyChannelMember = function () {
            var _ref96 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee93(channelId) {
                return regeneratorRuntime.wrap(function _callee93$(_context93) {
                    while (1) {
                        switch (_context93.prev = _context93.next) {
                            case 0:
                                return _context93.abrupt('return', _this.doFetch('' + _this.getChannelMemberRoute(channelId, 'me'), { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context93.stop();
                        }
                    }
                }, _callee93, _this);
            }));

            return function (_x166) {
                return _ref96.apply(this, arguments);
            };
        }();

        this.getMyChannelMembers = function () {
            var _ref97 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee94(teamId) {
                return regeneratorRuntime.wrap(function _callee94$(_context94) {
                    while (1) {
                        switch (_context94.prev = _context94.next) {
                            case 0:
                                return _context94.abrupt('return', _this.doFetch(_this.getUserRoute('me') + '/teams/' + teamId + '/channels/members', { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context94.stop();
                        }
                    }
                }, _callee94, _this);
            }));

            return function (_x167) {
                return _ref97.apply(this, arguments);
            };
        }();

        this.getChannelMembers = function () {
            var _ref98 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee95(channelId) {
                var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
                var perPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PER_PAGE_DEFAULT;
                return regeneratorRuntime.wrap(function _callee95$(_context95) {
                    while (1) {
                        switch (_context95.prev = _context95.next) {
                            case 0:
                                return _context95.abrupt('return', _this.doFetch('' + _this.getChannelMembersRoute(channelId) + buildQueryString({ page: page, per_page: perPage }), { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context95.stop();
                        }
                    }
                }, _callee95, _this);
            }));

            return function (_x168) {
                return _ref98.apply(this, arguments);
            };
        }();

        this.getChannelMember = function () {
            var _ref99 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee96(channelId, userId) {
                return regeneratorRuntime.wrap(function _callee96$(_context96) {
                    while (1) {
                        switch (_context96.prev = _context96.next) {
                            case 0:
                                return _context96.abrupt('return', _this.doFetch('' + _this.getChannelMemberRoute(channelId, userId), { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context96.stop();
                        }
                    }
                }, _callee96, _this);
            }));

            return function (_x171, _x172) {
                return _ref99.apply(this, arguments);
            };
        }();

        this.getChannelMembersByIds = function () {
            var _ref100 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee97(channelId, userIds) {
                return regeneratorRuntime.wrap(function _callee97$(_context97) {
                    while (1) {
                        switch (_context97.prev = _context97.next) {
                            case 0:
                                return _context97.abrupt('return', _this.doFetch(_this.getChannelMembersRoute(channelId) + '/ids', { method: 'post', body: JSON.stringify(userIds) }));

                            case 1:
                            case 'end':
                                return _context97.stop();
                        }
                    }
                }, _callee97, _this);
            }));

            return function (_x173, _x174) {
                return _ref100.apply(this, arguments);
            };
        }();

        this.addToChannel = function () {
            var _ref101 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee98(userId, channelId) {
                var postRootId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
                var member;
                return regeneratorRuntime.wrap(function _callee98$(_context98) {
                    while (1) {
                        switch (_context98.prev = _context98.next) {
                            case 0:
                                _this.trackEvent('api', 'api_channels_add_member', { channel_id: channelId });

                                member = { user_id: userId, channel_id: channelId, post_root_id: postRootId };
                                return _context98.abrupt('return', _this.doFetch('' + _this.getChannelMembersRoute(channelId), { method: 'post', body: JSON.stringify(member) }));

                            case 3:
                            case 'end':
                                return _context98.stop();
                        }
                    }
                }, _callee98, _this);
            }));

            return function (_x175, _x176) {
                return _ref101.apply(this, arguments);
            };
        }();

        this.removeFromChannel = function () {
            var _ref102 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee99(userId, channelId) {
                return regeneratorRuntime.wrap(function _callee99$(_context99) {
                    while (1) {
                        switch (_context99.prev = _context99.next) {
                            case 0:
                                _this.trackEvent('api', 'api_channels_remove_member', { channel_id: channelId });

                                return _context99.abrupt('return', _this.doFetch('' + _this.getChannelMemberRoute(channelId, userId), { method: 'delete' }));

                            case 2:
                            case 'end':
                                return _context99.stop();
                        }
                    }
                }, _callee99, _this);
            }));

            return function (_x178, _x179) {
                return _ref102.apply(this, arguments);
            };
        }();

        this.updateChannelMemberRoles = function () {
            var _ref103 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee100(channelId, userId, roles) {
                return regeneratorRuntime.wrap(function _callee100$(_context100) {
                    while (1) {
                        switch (_context100.prev = _context100.next) {
                            case 0:
                                return _context100.abrupt('return', _this.doFetch(_this.getChannelMemberRoute(channelId, userId) + '/roles', { method: 'put', body: JSON.stringify({ roles: roles }) }));

                            case 1:
                            case 'end':
                                return _context100.stop();
                        }
                    }
                }, _callee100, _this);
            }));

            return function (_x180, _x181, _x182) {
                return _ref103.apply(this, arguments);
            };
        }();

        this.getChannelStats = function () {
            var _ref104 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee101(channelId) {
                return regeneratorRuntime.wrap(function _callee101$(_context101) {
                    while (1) {
                        switch (_context101.prev = _context101.next) {
                            case 0:
                                return _context101.abrupt('return', _this.doFetch(_this.getChannelRoute(channelId) + '/stats', { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context101.stop();
                        }
                    }
                }, _callee101, _this);
            }));

            return function (_x183) {
                return _ref104.apply(this, arguments);
            };
        }();

        this.viewMyChannel = function () {
            var _ref105 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee102(channelId, prevChannelId) {
                var data;
                return regeneratorRuntime.wrap(function _callee102$(_context102) {
                    while (1) {
                        switch (_context102.prev = _context102.next) {
                            case 0:
                                data = { channel_id: channelId, prev_channel_id: prevChannelId };
                                return _context102.abrupt('return', _this.doFetch(_this.getChannelsRoute() + '/members/me/view', { method: 'post', body: JSON.stringify(data) }));

                            case 2:
                            case 'end':
                                return _context102.stop();
                        }
                    }
                }, _callee102, _this);
            }));

            return function (_x184, _x185) {
                return _ref105.apply(this, arguments);
            };
        }();

        this.autocompleteChannels = function () {
            var _ref106 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee103(teamId, name) {
                return regeneratorRuntime.wrap(function _callee103$(_context103) {
                    while (1) {
                        switch (_context103.prev = _context103.next) {
                            case 0:
                                return _context103.abrupt('return', _this.doFetch(_this.getTeamRoute(teamId) + '/channels/autocomplete' + buildQueryString({ name: name }), { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context103.stop();
                        }
                    }
                }, _callee103, _this);
            }));

            return function (_x186, _x187) {
                return _ref106.apply(this, arguments);
            };
        }();

        this.searchChannels = function () {
            var _ref107 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee104(teamId, term) {
                return regeneratorRuntime.wrap(function _callee104$(_context104) {
                    while (1) {
                        switch (_context104.prev = _context104.next) {
                            case 0:
                                return _context104.abrupt('return', _this.doFetch(_this.getTeamRoute(teamId) + '/channels/search', { method: 'post', body: JSON.stringify({ term: term }) }));

                            case 1:
                            case 'end':
                                return _context104.stop();
                        }
                    }
                }, _callee104, _this);
            }));

            return function (_x188, _x189) {
                return _ref107.apply(this, arguments);
            };
        }();

        this.createPost = function () {
            var _ref108 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee105(post) {
                return regeneratorRuntime.wrap(function _callee105$(_context105) {
                    while (1) {
                        switch (_context105.prev = _context105.next) {
                            case 0:
                                _this.trackEvent('api', 'api_posts_create', { channel_id: post.channel_id });

                                if (post.root_id != null && post.root_id !== '') {
                                    _this.trackEvent('api', 'api_posts_replied', { channel_id: post.channel_id });
                                }

                                return _context105.abrupt('return', _this.doFetch('' + _this.getPostsRoute(), { method: 'post', body: JSON.stringify(post) }));

                            case 3:
                            case 'end':
                                return _context105.stop();
                        }
                    }
                }, _callee105, _this);
            }));

            return function (_x190) {
                return _ref108.apply(this, arguments);
            };
        }();

        this.updatePost = function () {
            var _ref109 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee106(post) {
                return regeneratorRuntime.wrap(function _callee106$(_context106) {
                    while (1) {
                        switch (_context106.prev = _context106.next) {
                            case 0:
                                _this.trackEvent('api', 'api_posts_update', { channel_id: post.channel_id });

                                return _context106.abrupt('return', _this.doFetch('' + _this.getPostRoute(post.id), { method: 'put', body: JSON.stringify(post) }));

                            case 2:
                            case 'end':
                                return _context106.stop();
                        }
                    }
                }, _callee106, _this);
            }));

            return function (_x191) {
                return _ref109.apply(this, arguments);
            };
        }();

        this.patchPost = function () {
            var _ref110 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee107(post) {
                return regeneratorRuntime.wrap(function _callee107$(_context107) {
                    while (1) {
                        switch (_context107.prev = _context107.next) {
                            case 0:
                                _this.trackEvent('api', 'api_posts_patch', { channel_id: post.channel_id });

                                return _context107.abrupt('return', _this.doFetch(_this.getPostRoute(post.id) + '/patch', { method: 'put', body: JSON.stringify(post) }));

                            case 2:
                            case 'end':
                                return _context107.stop();
                        }
                    }
                }, _callee107, _this);
            }));

            return function (_x192) {
                return _ref110.apply(this, arguments);
            };
        }();

        this.deletePost = function () {
            var _ref111 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee108(postId) {
                return regeneratorRuntime.wrap(function _callee108$(_context108) {
                    while (1) {
                        switch (_context108.prev = _context108.next) {
                            case 0:
                                _this.trackEvent('api', 'api_posts_delete');

                                return _context108.abrupt('return', _this.doFetch('' + _this.getPostRoute(postId), { method: 'delete' }));

                            case 2:
                            case 'end':
                                return _context108.stop();
                        }
                    }
                }, _callee108, _this);
            }));

            return function (_x193) {
                return _ref111.apply(this, arguments);
            };
        }();

        this.getPostThread = function () {
            var _ref112 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee109(postId) {
                return regeneratorRuntime.wrap(function _callee109$(_context109) {
                    while (1) {
                        switch (_context109.prev = _context109.next) {
                            case 0:
                                return _context109.abrupt('return', _this.doFetch(_this.getPostRoute(postId) + '/thread', { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context109.stop();
                        }
                    }
                }, _callee109, _this);
            }));

            return function (_x194) {
                return _ref112.apply(this, arguments);
            };
        }();

        this.getPosts = function () {
            var _ref113 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee110(channelId) {
                var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
                var perPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PER_PAGE_DEFAULT;
                return regeneratorRuntime.wrap(function _callee110$(_context110) {
                    while (1) {
                        switch (_context110.prev = _context110.next) {
                            case 0:
                                return _context110.abrupt('return', _this.doFetch(_this.getChannelRoute(channelId) + '/posts' + buildQueryString({ page: page, per_page: perPage }), { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context110.stop();
                        }
                    }
                }, _callee110, _this);
            }));

            return function (_x195) {
                return _ref113.apply(this, arguments);
            };
        }();

        this.getPostsSince = function () {
            var _ref114 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee111(channelId, since) {
                return regeneratorRuntime.wrap(function _callee111$(_context111) {
                    while (1) {
                        switch (_context111.prev = _context111.next) {
                            case 0:
                                return _context111.abrupt('return', _this.doFetch(_this.getChannelRoute(channelId) + '/posts' + buildQueryString({ since: since }), { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context111.stop();
                        }
                    }
                }, _callee111, _this);
            }));

            return function (_x198, _x199) {
                return _ref114.apply(this, arguments);
            };
        }();

        this.getPostsBefore = function () {
            var _ref115 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee112(channelId, postId) {
                var page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
                var perPage = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : PER_PAGE_DEFAULT;
                return regeneratorRuntime.wrap(function _callee112$(_context112) {
                    while (1) {
                        switch (_context112.prev = _context112.next) {
                            case 0:
                                _this.trackEvent('api', 'api_posts_get_before', { channel_id: channelId });

                                return _context112.abrupt('return', _this.doFetch(_this.getChannelRoute(channelId) + '/posts' + buildQueryString({ before: postId, page: page, per_page: perPage }), { method: 'get' }));

                            case 2:
                            case 'end':
                                return _context112.stop();
                        }
                    }
                }, _callee112, _this);
            }));

            return function (_x200, _x201) {
                return _ref115.apply(this, arguments);
            };
        }();

        this.getPostsAfter = function () {
            var _ref116 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee113(channelId, postId) {
                var page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
                var perPage = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : PER_PAGE_DEFAULT;
                return regeneratorRuntime.wrap(function _callee113$(_context113) {
                    while (1) {
                        switch (_context113.prev = _context113.next) {
                            case 0:
                                _this.trackEvent('api', 'api_posts_get_after', { channel_id: channelId });

                                return _context113.abrupt('return', _this.doFetch(_this.getChannelRoute(channelId) + '/posts' + buildQueryString({ after: postId, page: page, per_page: perPage }), { method: 'get' }));

                            case 2:
                            case 'end':
                                return _context113.stop();
                        }
                    }
                }, _callee113, _this);
            }));

            return function (_x204, _x205) {
                return _ref116.apply(this, arguments);
            };
        }();

        this.getFileInfosForPost = function () {
            var _ref117 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee114(postId) {
                return regeneratorRuntime.wrap(function _callee114$(_context114) {
                    while (1) {
                        switch (_context114.prev = _context114.next) {
                            case 0:
                                return _context114.abrupt('return', _this.doFetch(_this.getPostRoute(postId) + '/files/info', { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context114.stop();
                        }
                    }
                }, _callee114, _this);
            }));

            return function (_x208) {
                return _ref117.apply(this, arguments);
            };
        }();

        this.getFlaggedPosts = function () {
            var _ref118 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee115(userId) {
                var channelId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
                var teamId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
                var page = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
                var perPage = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : PER_PAGE_DEFAULT;
                return regeneratorRuntime.wrap(function _callee115$(_context115) {
                    while (1) {
                        switch (_context115.prev = _context115.next) {
                            case 0:
                                _this.trackEvent('api', 'api_posts_get_flagged', { team_id: teamId });

                                return _context115.abrupt('return', _this.doFetch(_this.getUserRoute(userId) + '/posts/flagged' + buildQueryString({ channel_id: channelId, team_id: teamId, page: page, per_page: perPage }), { method: 'get' }));

                            case 2:
                            case 'end':
                                return _context115.stop();
                        }
                    }
                }, _callee115, _this);
            }));

            return function (_x209) {
                return _ref118.apply(this, arguments);
            };
        }();

        this.getPinnedPosts = function () {
            var _ref119 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee116(channelId) {
                return regeneratorRuntime.wrap(function _callee116$(_context116) {
                    while (1) {
                        switch (_context116.prev = _context116.next) {
                            case 0:
                                _this.trackEvent('api', 'api_posts_get_pinned', { channel_id: channelId });
                                return _context116.abrupt('return', _this.doFetch(_this.getChannelRoute(channelId) + '/pinned', { method: 'get' }));

                            case 2:
                            case 'end':
                                return _context116.stop();
                        }
                    }
                }, _callee116, _this);
            }));

            return function (_x214) {
                return _ref119.apply(this, arguments);
            };
        }();

        this.pinPost = function () {
            var _ref120 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee117(postId) {
                return regeneratorRuntime.wrap(function _callee117$(_context117) {
                    while (1) {
                        switch (_context117.prev = _context117.next) {
                            case 0:
                                _this.trackEvent('api', 'api_posts_pin');

                                return _context117.abrupt('return', _this.doFetch(_this.getPostRoute(postId) + '/pin', { method: 'post' }));

                            case 2:
                            case 'end':
                                return _context117.stop();
                        }
                    }
                }, _callee117, _this);
            }));

            return function (_x215) {
                return _ref120.apply(this, arguments);
            };
        }();

        this.unpinPost = function () {
            var _ref121 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee118(postId) {
                return regeneratorRuntime.wrap(function _callee118$(_context118) {
                    while (1) {
                        switch (_context118.prev = _context118.next) {
                            case 0:
                                _this.trackEvent('api', 'api_posts_unpin');

                                return _context118.abrupt('return', _this.doFetch(_this.getPostRoute(postId) + '/unpin', { method: 'post' }));

                            case 2:
                            case 'end':
                                return _context118.stop();
                        }
                    }
                }, _callee118, _this);
            }));

            return function (_x216) {
                return _ref121.apply(this, arguments);
            };
        }();

        this.addReaction = function () {
            var _ref122 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee119(userId, postId, emojiName) {
                return regeneratorRuntime.wrap(function _callee119$(_context119) {
                    while (1) {
                        switch (_context119.prev = _context119.next) {
                            case 0:
                                _this.trackEvent('api', 'api_reactions_save', { post_id: postId });

                                return _context119.abrupt('return', _this.doFetch('' + _this.getReactionsRoute(), { method: 'post', body: JSON.stringify({ user_id: userId, post_id: postId, emoji_name: emojiName }) }));

                            case 2:
                            case 'end':
                                return _context119.stop();
                        }
                    }
                }, _callee119, _this);
            }));

            return function (_x217, _x218, _x219) {
                return _ref122.apply(this, arguments);
            };
        }();

        this.removeReaction = function () {
            var _ref123 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee120(userId, postId, emojiName) {
                return regeneratorRuntime.wrap(function _callee120$(_context120) {
                    while (1) {
                        switch (_context120.prev = _context120.next) {
                            case 0:
                                _this.trackEvent('api', 'api_reactions_delete', { post_id: postId });

                                return _context120.abrupt('return', _this.doFetch(_this.getUserRoute(userId) + '/posts/' + postId + '/reactions/' + emojiName, { method: 'delete' }));

                            case 2:
                            case 'end':
                                return _context120.stop();
                        }
                    }
                }, _callee120, _this);
            }));

            return function (_x220, _x221, _x222) {
                return _ref123.apply(this, arguments);
            };
        }();

        this.getReactionsForPost = function () {
            var _ref124 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee121(postId) {
                return regeneratorRuntime.wrap(function _callee121$(_context121) {
                    while (1) {
                        switch (_context121.prev = _context121.next) {
                            case 0:
                                return _context121.abrupt('return', _this.doFetch(_this.getPostRoute(postId) + '/reactions', { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context121.stop();
                        }
                    }
                }, _callee121, _this);
            }));

            return function (_x223) {
                return _ref124.apply(this, arguments);
            };
        }();

        this.searchPosts = function () {
            var _ref125 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee122(teamId, terms, isOrSearch) {
                return regeneratorRuntime.wrap(function _callee122$(_context122) {
                    while (1) {
                        switch (_context122.prev = _context122.next) {
                            case 0:
                                _this.trackEvent('api', 'api_posts_search', { team_id: teamId });

                                return _context122.abrupt('return', _this.doFetch(_this.getTeamRoute(teamId) + '/posts/search', { method: 'post', body: JSON.stringify({ terms: terms, is_or_search: isOrSearch }) }));

                            case 2:
                            case 'end':
                                return _context122.stop();
                        }
                    }
                }, _callee122, _this);
            }));

            return function (_x224, _x225, _x226) {
                return _ref125.apply(this, arguments);
            };
        }();

        this.getOpenGraphMetadata = function () {
            var _ref126 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee123(url) {
                return regeneratorRuntime.wrap(function _callee123$(_context123) {
                    while (1) {
                        switch (_context123.prev = _context123.next) {
                            case 0:
                                return _context123.abrupt('return', _this.doFetch(_this.getBaseRoute() + '/opengraph', { method: 'post', body: JSON.stringify({ url: url }) }));

                            case 1:
                            case 'end':
                                return _context123.stop();
                        }
                    }
                }, _callee123, _this);
            }));

            return function (_x227) {
                return _ref126.apply(this, arguments);
            };
        }();

        this.doPostAction = function () {
            var _ref127 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee124(postId, actionId) {
                return regeneratorRuntime.wrap(function _callee124$(_context124) {
                    while (1) {
                        switch (_context124.prev = _context124.next) {
                            case 0:
                                return _context124.abrupt('return', _this.doFetch(_this.getPostRoute(postId) + '/actions/' + encodeURIComponent(actionId), { method: 'post' }));

                            case 1:
                            case 'end':
                                return _context124.stop();
                        }
                    }
                }, _callee124, _this);
            }));

            return function (_x228, _x229) {
                return _ref127.apply(this, arguments);
            };
        }();

        this.uploadFile = function () {
            var _ref128 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee125(fileFormData, formBoundary) {
                var request;
                return regeneratorRuntime.wrap(function _callee125$(_context125) {
                    while (1) {
                        switch (_context125.prev = _context125.next) {
                            case 0:
                                _this.trackEvent('api', 'api_files_upload');

                                request = {
                                    method: 'post',
                                    body: fileFormData
                                };


                                if (formBoundary) {
                                    request.headers = {
                                        'Content-Type': 'multipart/form-data; boundary=' + formBoundary
                                    };
                                }

                                return _context125.abrupt('return', _this.doFetch('' + _this.getFilesRoute(), request));

                            case 4:
                            case 'end':
                                return _context125.stop();
                        }
                    }
                }, _callee125, _this);
            }));

            return function (_x230, _x231) {
                return _ref128.apply(this, arguments);
            };
        }();

        this.getFilePublicLink = function () {
            var _ref129 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee126(fileId) {
                return regeneratorRuntime.wrap(function _callee126$(_context126) {
                    while (1) {
                        switch (_context126.prev = _context126.next) {
                            case 0:
                                return _context126.abrupt('return', _this.doFetch(_this.getFileRoute(fileId) + '/link', { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context126.stop();
                        }
                    }
                }, _callee126, _this);
            }));

            return function (_x232) {
                return _ref129.apply(this, arguments);
            };
        }();

        this.savePreferences = function () {
            var _ref130 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee127(userId, preferences) {
                return regeneratorRuntime.wrap(function _callee127$(_context127) {
                    while (1) {
                        switch (_context127.prev = _context127.next) {
                            case 0:
                                return _context127.abrupt('return', _this.doFetch('' + _this.getPreferencesRoute(userId), { method: 'put', body: JSON.stringify(preferences) }));

                            case 1:
                            case 'end':
                                return _context127.stop();
                        }
                    }
                }, _callee127, _this);
            }));

            return function (_x233, _x234) {
                return _ref130.apply(this, arguments);
            };
        }();

        this.getMyPreferences = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee128() {
            return regeneratorRuntime.wrap(function _callee128$(_context128) {
                while (1) {
                    switch (_context128.prev = _context128.next) {
                        case 0:
                            return _context128.abrupt('return', _this.doFetch('' + _this.getPreferencesRoute('me'), { method: 'get' }));

                        case 1:
                        case 'end':
                            return _context128.stop();
                    }
                }
            }, _callee128, _this);
        }));

        this.deletePreferences = function () {
            var _ref132 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee129(userId, preferences) {
                return regeneratorRuntime.wrap(function _callee129$(_context129) {
                    while (1) {
                        switch (_context129.prev = _context129.next) {
                            case 0:
                                return _context129.abrupt('return', _this.doFetch(_this.getPreferencesRoute(userId) + '/delete', { method: 'post', body: JSON.stringify(preferences) }));

                            case 1:
                            case 'end':
                                return _context129.stop();
                        }
                    }
                }, _callee129, _this);
            }));

            return function (_x235, _x236) {
                return _ref132.apply(this, arguments);
            };
        }();

        this.ping = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee130() {
            return regeneratorRuntime.wrap(function _callee130$(_context130) {
                while (1) {
                    switch (_context130.prev = _context130.next) {
                        case 0:
                            return _context130.abrupt('return', _this.doFetch(_this.getBaseRoute() + '/system/ping?time=' + Date.now(), { method: 'get' }));

                        case 1:
                        case 'end':
                            return _context130.stop();
                    }
                }
            }, _callee130, _this);
        }));

        this.logClientError = function () {
            var _ref134 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee131(message) {
                var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ERROR';
                return regeneratorRuntime.wrap(function _callee131$(_context131) {
                    while (1) {
                        switch (_context131.prev = _context131.next) {
                            case 0:
                                if (_this.enableLogging) {
                                    _context131.next = 2;
                                    break;
                                }

                                throw {
                                    message: 'Logging disabled.'
                                };

                            case 2:
                                return _context131.abrupt('return', _this.doFetch(_this.getBaseRoute() + '/logs', { method: 'post', body: JSON.stringify({ message: message, level: level }) }));

                            case 3:
                            case 'end':
                                return _context131.stop();
                        }
                    }
                }, _callee131, _this);
            }));

            return function (_x237) {
                return _ref134.apply(this, arguments);
            };
        }();

        this.getClientConfigOld = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee132() {
            return regeneratorRuntime.wrap(function _callee132$(_context132) {
                while (1) {
                    switch (_context132.prev = _context132.next) {
                        case 0:
                            return _context132.abrupt('return', _this.doFetch(_this.getBaseRoute() + '/config/client?format=old', { method: 'get' }));

                        case 1:
                        case 'end':
                            return _context132.stop();
                    }
                }
            }, _callee132, _this);
        }));
        this.getClientLicenseOld = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee133() {
            return regeneratorRuntime.wrap(function _callee133$(_context133) {
                while (1) {
                    switch (_context133.prev = _context133.next) {
                        case 0:
                            return _context133.abrupt('return', _this.doFetch(_this.getBaseRoute() + '/license/client?format=old', { method: 'get' }));

                        case 1:
                        case 'end':
                            return _context133.stop();
                    }
                }
            }, _callee133, _this);
        }));

        this.getTranslations = function () {
            var _ref137 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee134(url) {
                return regeneratorRuntime.wrap(function _callee134$(_context134) {
                    while (1) {
                        switch (_context134.prev = _context134.next) {
                            case 0:
                                return _context134.abrupt('return', _this.doFetch(url, { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context134.stop();
                        }
                    }
                }, _callee134, _this);
            }));

            return function (_x239) {
                return _ref137.apply(this, arguments);
            };
        }();

        this.getWebSocketUrl = function () {
            return _this.getBaseRoute() + '/websocket';
        };

        this.webrtcToken = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee135() {
            return regeneratorRuntime.wrap(function _callee135$(_context135) {
                while (1) {
                    switch (_context135.prev = _context135.next) {
                        case 0:
                            return _context135.abrupt('return', _this.doFetch(_this.getBaseRoute() + '/webrtc/token', { method: 'get' }));

                        case 1:
                        case 'end':
                            return _context135.stop();
                    }
                }
            }, _callee135, _this);
        }));

        this.createIncomingWebhook = function () {
            var _ref139 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee136(hook) {
                return regeneratorRuntime.wrap(function _callee136$(_context136) {
                    while (1) {
                        switch (_context136.prev = _context136.next) {
                            case 0:
                                _this.trackEvent('api', 'api_integrations_created', { team_id: hook.team_id });

                                return _context136.abrupt('return', _this.doFetch('' + _this.getIncomingHooksRoute(), { method: 'post', body: JSON.stringify(hook) }));

                            case 2:
                            case 'end':
                                return _context136.stop();
                        }
                    }
                }, _callee136, _this);
            }));

            return function (_x240) {
                return _ref139.apply(this, arguments);
            };
        }();

        this.getIncomingWebhook = function () {
            var _ref140 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee137(hookId) {
                return regeneratorRuntime.wrap(function _callee137$(_context137) {
                    while (1) {
                        switch (_context137.prev = _context137.next) {
                            case 0:
                                return _context137.abrupt('return', _this.doFetch('' + _this.getIncomingHookRoute(hookId), { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context137.stop();
                        }
                    }
                }, _callee137, _this);
            }));

            return function (_x241) {
                return _ref140.apply(this, arguments);
            };
        }();

        this.getIncomingWebhooks = function () {
            var _ref141 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee138() {
                var teamId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
                var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
                var perPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PER_PAGE_DEFAULT;
                var queryParams;
                return regeneratorRuntime.wrap(function _callee138$(_context138) {
                    while (1) {
                        switch (_context138.prev = _context138.next) {
                            case 0:
                                queryParams = { page: page, per_page: perPage };


                                if (teamId) {
                                    queryParams.team_id = teamId;
                                }

                                return _context138.abrupt('return', _this.doFetch('' + _this.getIncomingHooksRoute() + buildQueryString(queryParams), { method: 'get' }));

                            case 3:
                            case 'end':
                                return _context138.stop();
                        }
                    }
                }, _callee138, _this);
            }));

            return function () {
                return _ref141.apply(this, arguments);
            };
        }();

        this.removeIncomingWebhook = function () {
            var _ref142 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee139(hookId) {
                return regeneratorRuntime.wrap(function _callee139$(_context139) {
                    while (1) {
                        switch (_context139.prev = _context139.next) {
                            case 0:
                                _this.trackEvent('api', 'api_integrations_deleted');

                                return _context139.abrupt('return', _this.doFetch('' + _this.getIncomingHookRoute(hookId), { method: 'delete' }));

                            case 2:
                            case 'end':
                                return _context139.stop();
                        }
                    }
                }, _callee139, _this);
            }));

            return function (_x245) {
                return _ref142.apply(this, arguments);
            };
        }();

        this.updateIncomingWebhook = function () {
            var _ref143 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee140(hook) {
                return regeneratorRuntime.wrap(function _callee140$(_context140) {
                    while (1) {
                        switch (_context140.prev = _context140.next) {
                            case 0:
                                _this.trackEvent('api', 'api_integrations_updated', { team_id: hook.team_id });

                                return _context140.abrupt('return', _this.doFetch('' + _this.getIncomingHookRoute(hook.id), { method: 'put', body: JSON.stringify(hook) }));

                            case 2:
                            case 'end':
                                return _context140.stop();
                        }
                    }
                }, _callee140, _this);
            }));

            return function (_x246) {
                return _ref143.apply(this, arguments);
            };
        }();

        this.createOutgoingWebhook = function () {
            var _ref144 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee141(hook) {
                return regeneratorRuntime.wrap(function _callee141$(_context141) {
                    while (1) {
                        switch (_context141.prev = _context141.next) {
                            case 0:
                                _this.trackEvent('api', 'api_integrations_created', { team_id: hook.team_id });

                                return _context141.abrupt('return', _this.doFetch('' + _this.getOutgoingHooksRoute(), { method: 'post', body: JSON.stringify(hook) }));

                            case 2:
                            case 'end':
                                return _context141.stop();
                        }
                    }
                }, _callee141, _this);
            }));

            return function (_x247) {
                return _ref144.apply(this, arguments);
            };
        }();

        this.getOutgoingWebhook = function () {
            var _ref145 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee142(hookId) {
                return regeneratorRuntime.wrap(function _callee142$(_context142) {
                    while (1) {
                        switch (_context142.prev = _context142.next) {
                            case 0:
                                return _context142.abrupt('return', _this.doFetch('' + _this.getOutgoingHookRoute(hookId), { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context142.stop();
                        }
                    }
                }, _callee142, _this);
            }));

            return function (_x248) {
                return _ref145.apply(this, arguments);
            };
        }();

        this.getOutgoingWebhooks = function () {
            var _ref146 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee143() {
                var channelId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
                var teamId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
                var page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
                var perPage = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : PER_PAGE_DEFAULT;
                var queryParams;
                return regeneratorRuntime.wrap(function _callee143$(_context143) {
                    while (1) {
                        switch (_context143.prev = _context143.next) {
                            case 0:
                                queryParams = { page: page, per_page: perPage };


                                if (channelId) {
                                    queryParams.channel_id = channelId;
                                }

                                if (teamId) {
                                    queryParams.team_id = teamId;
                                }

                                return _context143.abrupt('return', _this.doFetch('' + _this.getOutgoingHooksRoute() + buildQueryString(queryParams), { method: 'get' }));

                            case 4:
                            case 'end':
                                return _context143.stop();
                        }
                    }
                }, _callee143, _this);
            }));

            return function () {
                return _ref146.apply(this, arguments);
            };
        }();

        this.removeOutgoingWebhook = function () {
            var _ref147 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee144(hookId) {
                return regeneratorRuntime.wrap(function _callee144$(_context144) {
                    while (1) {
                        switch (_context144.prev = _context144.next) {
                            case 0:
                                _this.trackEvent('api', 'api_integrations_deleted');

                                return _context144.abrupt('return', _this.doFetch('' + _this.getOutgoingHookRoute(hookId), { method: 'delete' }));

                            case 2:
                            case 'end':
                                return _context144.stop();
                        }
                    }
                }, _callee144, _this);
            }));

            return function (_x253) {
                return _ref147.apply(this, arguments);
            };
        }();

        this.updateOutgoingWebhook = function () {
            var _ref148 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee145(hook) {
                return regeneratorRuntime.wrap(function _callee145$(_context145) {
                    while (1) {
                        switch (_context145.prev = _context145.next) {
                            case 0:
                                _this.trackEvent('api', 'api_integrations_updated', { team_id: hook.team_id });

                                return _context145.abrupt('return', _this.doFetch('' + _this.getOutgoingHookRoute(hook.id), { method: 'put', body: JSON.stringify(hook) }));

                            case 2:
                            case 'end':
                                return _context145.stop();
                        }
                    }
                }, _callee145, _this);
            }));

            return function (_x254) {
                return _ref148.apply(this, arguments);
            };
        }();

        this.regenOutgoingHookToken = function () {
            var _ref149 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee146(id) {
                return regeneratorRuntime.wrap(function _callee146$(_context146) {
                    while (1) {
                        switch (_context146.prev = _context146.next) {
                            case 0:
                                return _context146.abrupt('return', _this.doFetch(_this.getOutgoingHookRoute(id) + '/regen_token', { method: 'post' }));

                            case 1:
                            case 'end':
                                return _context146.stop();
                        }
                    }
                }, _callee146, _this);
            }));

            return function (_x255) {
                return _ref149.apply(this, arguments);
            };
        }();

        this.getCommandsList = function () {
            var _ref150 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee147(teamId) {
                return regeneratorRuntime.wrap(function _callee147$(_context147) {
                    while (1) {
                        switch (_context147.prev = _context147.next) {
                            case 0:
                                return _context147.abrupt('return', _this.doFetch(_this.getCommandsRoute() + '?team_id=' + teamId, { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context147.stop();
                        }
                    }
                }, _callee147, _this);
            }));

            return function (_x256) {
                return _ref150.apply(this, arguments);
            };
        }();

        this.getAutocompleteCommandsList = function () {
            var _ref151 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee148(teamId) {
                var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
                var perPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PER_PAGE_DEFAULT;
                return regeneratorRuntime.wrap(function _callee148$(_context148) {
                    while (1) {
                        switch (_context148.prev = _context148.next) {
                            case 0:
                                return _context148.abrupt('return', _this.doFetch(_this.getTeamRoute(teamId) + '/commands/autocomplete' + buildQueryString({ page: page, per_page: perPage }), { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context148.stop();
                        }
                    }
                }, _callee148, _this);
            }));

            return function (_x257) {
                return _ref151.apply(this, arguments);
            };
        }();

        this.getCustomTeamCommands = function () {
            var _ref152 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee149(teamId) {
                return regeneratorRuntime.wrap(function _callee149$(_context149) {
                    while (1) {
                        switch (_context149.prev = _context149.next) {
                            case 0:
                                return _context149.abrupt('return', _this.doFetch(_this.getCommandsRoute() + '?team_id=' + teamId + '&custom_only=true', { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context149.stop();
                        }
                    }
                }, _callee149, _this);
            }));

            return function (_x260) {
                return _ref152.apply(this, arguments);
            };
        }();

        this.executeCommand = function () {
            var _ref153 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee150(command) {
                var commandArgs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                return regeneratorRuntime.wrap(function _callee150$(_context150) {
                    while (1) {
                        switch (_context150.prev = _context150.next) {
                            case 0:
                                _this.trackEvent('api', 'api_integrations_used');

                                return _context150.abrupt('return', _this.doFetch(_this.getCommandsRoute() + '/execute', { method: 'post', body: JSON.stringify(_extends({ command: command }, commandArgs)) }));

                            case 2:
                            case 'end':
                                return _context150.stop();
                        }
                    }
                }, _callee150, _this);
            }));

            return function (_x261) {
                return _ref153.apply(this, arguments);
            };
        }();

        this.addCommand = function () {
            var _ref154 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee151(command) {
                return regeneratorRuntime.wrap(function _callee151$(_context151) {
                    while (1) {
                        switch (_context151.prev = _context151.next) {
                            case 0:
                                _this.trackEvent('api', 'api_integrations_created');

                                return _context151.abrupt('return', _this.doFetch('' + _this.getCommandsRoute(), { method: 'post', body: JSON.stringify(command) }));

                            case 2:
                            case 'end':
                                return _context151.stop();
                        }
                    }
                }, _callee151, _this);
            }));

            return function (_x263) {
                return _ref154.apply(this, arguments);
            };
        }();

        this.editCommand = function () {
            var _ref155 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee152(command) {
                return regeneratorRuntime.wrap(function _callee152$(_context152) {
                    while (1) {
                        switch (_context152.prev = _context152.next) {
                            case 0:
                                _this.trackEvent('api', 'api_integrations_created');

                                return _context152.abrupt('return', _this.doFetch(_this.getCommandsRoute() + '/' + command.id, { method: 'put', body: JSON.stringify(command) }));

                            case 2:
                            case 'end':
                                return _context152.stop();
                        }
                    }
                }, _callee152, _this);
            }));

            return function (_x264) {
                return _ref155.apply(this, arguments);
            };
        }();

        this.regenCommandToken = function () {
            var _ref156 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee153(id) {
                return regeneratorRuntime.wrap(function _callee153$(_context153) {
                    while (1) {
                        switch (_context153.prev = _context153.next) {
                            case 0:
                                return _context153.abrupt('return', _this.doFetch(_this.getCommandsRoute() + '/' + id + '/regen_token', { method: 'put' }));

                            case 1:
                            case 'end':
                                return _context153.stop();
                        }
                    }
                }, _callee153, _this);
            }));

            return function (_x265) {
                return _ref156.apply(this, arguments);
            };
        }();

        this.deleteCommand = function () {
            var _ref157 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee154(id) {
                return regeneratorRuntime.wrap(function _callee154$(_context154) {
                    while (1) {
                        switch (_context154.prev = _context154.next) {
                            case 0:
                                _this.trackEvent('api', 'api_integrations_deleted');

                                return _context154.abrupt('return', _this.doFetch(_this.getCommandsRoute() + '/' + id, { method: 'delete' }));

                            case 2:
                            case 'end':
                                return _context154.stop();
                        }
                    }
                }, _callee154, _this);
            }));

            return function (_x266) {
                return _ref157.apply(this, arguments);
            };
        }();

        this.createOAuthApp = function () {
            var _ref158 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee155(app) {
                return regeneratorRuntime.wrap(function _callee155$(_context155) {
                    while (1) {
                        switch (_context155.prev = _context155.next) {
                            case 0:
                                _this.trackEvent('api', 'api_apps_register');

                                return _context155.abrupt('return', _this.doFetch('' + _this.getOAuthAppsRoute(), { method: 'post', body: JSON.stringify(app) }));

                            case 2:
                            case 'end':
                                return _context155.stop();
                        }
                    }
                }, _callee155, _this);
            }));

            return function (_x267) {
                return _ref158.apply(this, arguments);
            };
        }();

        this.editOAuthApp = function () {
            var _ref159 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee156(app) {
                return regeneratorRuntime.wrap(function _callee156$(_context156) {
                    while (1) {
                        switch (_context156.prev = _context156.next) {
                            case 0:
                                return _context156.abrupt('return', _this.doFetch(_this.getOAuthAppsRoute() + '/' + app.id, { method: 'put', body: JSON.stringify(app) }));

                            case 1:
                            case 'end':
                                return _context156.stop();
                        }
                    }
                }, _callee156, _this);
            }));

            return function (_x268) {
                return _ref159.apply(this, arguments);
            };
        }();

        this.getOAuthApps = function () {
            var _ref160 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee157() {
                var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                var perPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : PER_PAGE_DEFAULT;
                return regeneratorRuntime.wrap(function _callee157$(_context157) {
                    while (1) {
                        switch (_context157.prev = _context157.next) {
                            case 0:
                                return _context157.abrupt('return', _this.doFetch('' + _this.getOAuthAppsRoute() + buildQueryString({ page: page, per_page: perPage }), { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context157.stop();
                        }
                    }
                }, _callee157, _this);
            }));

            return function () {
                return _ref160.apply(this, arguments);
            };
        }();

        this.getOAuthApp = function () {
            var _ref161 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee158(appId) {
                return regeneratorRuntime.wrap(function _callee158$(_context158) {
                    while (1) {
                        switch (_context158.prev = _context158.next) {
                            case 0:
                                return _context158.abrupt('return', _this.doFetch('' + _this.getOAuthAppRoute(appId), { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context158.stop();
                        }
                    }
                }, _callee158, _this);
            }));

            return function (_x271) {
                return _ref161.apply(this, arguments);
            };
        }();

        this.getOAuthAppInfo = function () {
            var _ref162 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee159(appId) {
                return regeneratorRuntime.wrap(function _callee159$(_context159) {
                    while (1) {
                        switch (_context159.prev = _context159.next) {
                            case 0:
                                return _context159.abrupt('return', _this.doFetch(_this.getOAuthAppRoute(appId) + '/info', { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context159.stop();
                        }
                    }
                }, _callee159, _this);
            }));

            return function (_x272) {
                return _ref162.apply(this, arguments);
            };
        }();

        this.deleteOAuthApp = function () {
            var _ref163 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee160(appId) {
                return regeneratorRuntime.wrap(function _callee160$(_context160) {
                    while (1) {
                        switch (_context160.prev = _context160.next) {
                            case 0:
                                _this.trackEvent('api', 'api_apps_delete');

                                return _context160.abrupt('return', _this.doFetch('' + _this.getOAuthAppRoute(appId), { method: 'delete' }));

                            case 2:
                            case 'end':
                                return _context160.stop();
                        }
                    }
                }, _callee160, _this);
            }));

            return function (_x273) {
                return _ref163.apply(this, arguments);
            };
        }();

        this.regenOAuthAppSecret = function () {
            var _ref164 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee161(appId) {
                return regeneratorRuntime.wrap(function _callee161$(_context161) {
                    while (1) {
                        switch (_context161.prev = _context161.next) {
                            case 0:
                                return _context161.abrupt('return', _this.doFetch(_this.getOAuthAppRoute(appId) + '/regen_secret', { method: 'post' }));

                            case 1:
                            case 'end':
                                return _context161.stop();
                        }
                    }
                }, _callee161, _this);
            }));

            return function (_x274) {
                return _ref164.apply(this, arguments);
            };
        }();

        this.createCustomEmoji = function () {
            var _ref165 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee162(emoji, imageData) {
                var formData, request;
                return regeneratorRuntime.wrap(function _callee162$(_context162) {
                    while (1) {
                        switch (_context162.prev = _context162.next) {
                            case 0:
                                _this.trackEvent('api', 'api_emoji_custom_add');

                                formData = new FormData();

                                formData.append('image', imageData);
                                formData.append('emoji', JSON.stringify(emoji));

                                request = {
                                    method: 'post',
                                    body: formData
                                };


                                if (formData.getBoundary) {
                                    request.headers = {
                                        'Content-Type': 'multipart/form-data; boundary=' + formData.getBoundary()
                                    };
                                }

                                return _context162.abrupt('return', _this.doFetch('' + _this.getEmojisRoute(), request));

                            case 7:
                            case 'end':
                                return _context162.stop();
                        }
                    }
                }, _callee162, _this);
            }));

            return function (_x275, _x276) {
                return _ref165.apply(this, arguments);
            };
        }();

        this.getCustomEmoji = function () {
            var _ref166 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee163(id) {
                return regeneratorRuntime.wrap(function _callee163$(_context163) {
                    while (1) {
                        switch (_context163.prev = _context163.next) {
                            case 0:
                                return _context163.abrupt('return', _this.doFetch(_this.getEmojisRoute() + '/' + id, { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context163.stop();
                        }
                    }
                }, _callee163, _this);
            }));

            return function (_x277) {
                return _ref166.apply(this, arguments);
            };
        }();

        this.getCustomEmojiByName = function () {
            var _ref167 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee164(name) {
                return regeneratorRuntime.wrap(function _callee164$(_context164) {
                    while (1) {
                        switch (_context164.prev = _context164.next) {
                            case 0:
                                return _context164.abrupt('return', _this.doFetch(_this.getEmojisRoute() + '/name/' + name, { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context164.stop();
                        }
                    }
                }, _callee164, _this);
            }));

            return function (_x278) {
                return _ref167.apply(this, arguments);
            };
        }();

        this.getCustomEmojis = function () {
            var _ref168 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee165() {
                var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                var perPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : PER_PAGE_DEFAULT;
                var sort = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
                return regeneratorRuntime.wrap(function _callee165$(_context165) {
                    while (1) {
                        switch (_context165.prev = _context165.next) {
                            case 0:
                                return _context165.abrupt('return', _this.doFetch('' + _this.getEmojisRoute() + buildQueryString({ page: page, per_page: perPage, sort: sort }), { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context165.stop();
                        }
                    }
                }, _callee165, _this);
            }));

            return function () {
                return _ref168.apply(this, arguments);
            };
        }();

        this.deleteCustomEmoji = function () {
            var _ref169 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee166(emojiId) {
                return regeneratorRuntime.wrap(function _callee166$(_context166) {
                    while (1) {
                        switch (_context166.prev = _context166.next) {
                            case 0:
                                _this.trackEvent('api', 'api_emoji_custom_delete');

                                return _context166.abrupt('return', _this.doFetch('' + _this.getEmojiRoute(emojiId), { method: 'delete' }));

                            case 2:
                            case 'end':
                                return _context166.stop();
                        }
                    }
                }, _callee166, _this);
            }));

            return function (_x282) {
                return _ref169.apply(this, arguments);
            };
        }();

        this.getSystemEmojiImageUrl = function (filename) {
            return _this.url + '/static/emoji/' + filename + '.png';
        };

        this.getCustomEmojiImageUrl = function (id) {
            return _this.getEmojiRoute(id) + '/image';
        };

        this.searchCustomEmoji = function () {
            var _ref170 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee167(term) {
                var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                return regeneratorRuntime.wrap(function _callee167$(_context167) {
                    while (1) {
                        switch (_context167.prev = _context167.next) {
                            case 0:
                                return _context167.abrupt('return', _this.doFetch(_this.getEmojisRoute() + '/search', { method: 'post', body: JSON.stringify(_extends({ term: term }, options)) }));

                            case 1:
                            case 'end':
                                return _context167.stop();
                        }
                    }
                }, _callee167, _this);
            }));

            return function (_x283) {
                return _ref170.apply(this, arguments);
            };
        }();

        this.autocompleteCustomEmoji = function () {
            var _ref171 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee168(name) {
                return regeneratorRuntime.wrap(function _callee168$(_context168) {
                    while (1) {
                        switch (_context168.prev = _context168.next) {
                            case 0:
                                return _context168.abrupt('return', _this.doFetch(_this.getEmojisRoute() + '/autocomplete' + buildQueryString({ name: name }), { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context168.stop();
                        }
                    }
                }, _callee168, _this);
            }));

            return function (_x285) {
                return _ref171.apply(this, arguments);
            };
        }();

        this.getTimezones = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee169() {
            return regeneratorRuntime.wrap(function _callee169$(_context169) {
                while (1) {
                    switch (_context169.prev = _context169.next) {
                        case 0:
                            return _context169.abrupt('return', _this.doFetch('' + _this.getTimezonesRoute(), { method: 'get' }));

                        case 1:
                        case 'end':
                            return _context169.stop();
                    }
                }
            }, _callee169, _this);
        }));

        this.getDataRetentionPolicy = function () {
            return _this.doFetch(_this.getDataRetentionRoute() + '/policy', { method: 'get' });
        };

        this.getJob = function () {
            var _ref173 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee170(id) {
                return regeneratorRuntime.wrap(function _callee170$(_context170) {
                    while (1) {
                        switch (_context170.prev = _context170.next) {
                            case 0:
                                return _context170.abrupt('return', _this.doFetch(_this.getJobsRoute() + '/' + id, { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context170.stop();
                        }
                    }
                }, _callee170, _this);
            }));

            return function (_x286) {
                return _ref173.apply(this, arguments);
            };
        }();

        this.getJobs = function () {
            var _ref174 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee171() {
                var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                var perPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : PER_PAGE_DEFAULT;
                return regeneratorRuntime.wrap(function _callee171$(_context171) {
                    while (1) {
                        switch (_context171.prev = _context171.next) {
                            case 0:
                                return _context171.abrupt('return', _this.doFetch('' + _this.getJobsRoute() + buildQueryString({ page: page, per_page: perPage }), { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context171.stop();
                        }
                    }
                }, _callee171, _this);
            }));

            return function () {
                return _ref174.apply(this, arguments);
            };
        }();

        this.getJobsByType = function () {
            var _ref175 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee172(type) {
                var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
                var perPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PER_PAGE_DEFAULT;
                return regeneratorRuntime.wrap(function _callee172$(_context172) {
                    while (1) {
                        switch (_context172.prev = _context172.next) {
                            case 0:
                                return _context172.abrupt('return', _this.doFetch(_this.getJobsRoute() + '/type/' + type + buildQueryString({ page: page, per_page: perPage }), { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context172.stop();
                        }
                    }
                }, _callee172, _this);
            }));

            return function (_x289) {
                return _ref175.apply(this, arguments);
            };
        }();

        this.createJob = function () {
            var _ref176 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee173(job) {
                return regeneratorRuntime.wrap(function _callee173$(_context173) {
                    while (1) {
                        switch (_context173.prev = _context173.next) {
                            case 0:
                                return _context173.abrupt('return', _this.doFetch('' + _this.getJobsRoute(), { method: 'post', body: JSON.stringify(job) }));

                            case 1:
                            case 'end':
                                return _context173.stop();
                        }
                    }
                }, _callee173, _this);
            }));

            return function (_x292) {
                return _ref176.apply(this, arguments);
            };
        }();

        this.cancelJob = function () {
            var _ref177 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee174(id) {
                return regeneratorRuntime.wrap(function _callee174$(_context174) {
                    while (1) {
                        switch (_context174.prev = _context174.next) {
                            case 0:
                                return _context174.abrupt('return', _this.doFetch(_this.getJobsRoute() + '/' + id + '/cancel', { method: 'post' }));

                            case 1:
                            case 'end':
                                return _context174.stop();
                        }
                    }
                }, _callee174, _this);
            }));

            return function (_x293) {
                return _ref177.apply(this, arguments);
            };
        }();

        this.getLogs = function () {
            var _ref178 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee175() {
                var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                var perPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : LOGS_PER_PAGE_DEFAULT;
                return regeneratorRuntime.wrap(function _callee175$(_context175) {
                    while (1) {
                        switch (_context175.prev = _context175.next) {
                            case 0:
                                return _context175.abrupt('return', _this.doFetch(_this.getBaseRoute() + '/logs' + buildQueryString({ page: page, logs_per_page: perPage }), { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context175.stop();
                        }
                    }
                }, _callee175, _this);
            }));

            return function () {
                return _ref178.apply(this, arguments);
            };
        }();

        this.getAudits = function () {
            var _ref179 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee176() {
                var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                var perPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : PER_PAGE_DEFAULT;
                return regeneratorRuntime.wrap(function _callee176$(_context176) {
                    while (1) {
                        switch (_context176.prev = _context176.next) {
                            case 0:
                                return _context176.abrupt('return', _this.doFetch(_this.getBaseRoute() + '/audits' + buildQueryString({ page: page, per_page: perPage }), { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context176.stop();
                        }
                    }
                }, _callee176, _this);
            }));

            return function () {
                return _ref179.apply(this, arguments);
            };
        }();

        this.getConfig = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee177() {
            return regeneratorRuntime.wrap(function _callee177$(_context177) {
                while (1) {
                    switch (_context177.prev = _context177.next) {
                        case 0:
                            return _context177.abrupt('return', _this.doFetch(_this.getBaseRoute() + '/config', { method: 'get' }));

                        case 1:
                        case 'end':
                            return _context177.stop();
                    }
                }
            }, _callee177, _this);
        }));

        this.updateConfig = function () {
            var _ref181 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee178(config) {
                return regeneratorRuntime.wrap(function _callee178$(_context178) {
                    while (1) {
                        switch (_context178.prev = _context178.next) {
                            case 0:
                                return _context178.abrupt('return', _this.doFetch(_this.getBaseRoute() + '/config', { method: 'put', body: JSON.stringify(config) }));

                            case 1:
                            case 'end':
                                return _context178.stop();
                        }
                    }
                }, _callee178, _this);
            }));

            return function (_x298) {
                return _ref181.apply(this, arguments);
            };
        }();

        this.reloadConfig = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee179() {
            return regeneratorRuntime.wrap(function _callee179$(_context179) {
                while (1) {
                    switch (_context179.prev = _context179.next) {
                        case 0:
                            return _context179.abrupt('return', _this.doFetch(_this.getBaseRoute() + '/config/reload', { method: 'post' }));

                        case 1:
                        case 'end':
                            return _context179.stop();
                    }
                }
            }, _callee179, _this);
        }));

        this.testEmail = function () {
            var _ref183 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee180(config) {
                return regeneratorRuntime.wrap(function _callee180$(_context180) {
                    while (1) {
                        switch (_context180.prev = _context180.next) {
                            case 0:
                                return _context180.abrupt('return', _this.doFetch(_this.getBaseRoute() + '/email/test', { method: 'post', body: JSON.stringify(config) }));

                            case 1:
                            case 'end':
                                return _context180.stop();
                        }
                    }
                }, _callee180, _this);
            }));

            return function (_x299) {
                return _ref183.apply(this, arguments);
            };
        }();

        this.testS3Connection = function () {
            var _ref184 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee181(config) {
                return regeneratorRuntime.wrap(function _callee181$(_context181) {
                    while (1) {
                        switch (_context181.prev = _context181.next) {
                            case 0:
                                return _context181.abrupt('return', _this.doFetch(_this.getBaseRoute() + '/file/s3_test', { method: 'post', body: JSON.stringify(config) }));

                            case 1:
                            case 'end':
                                return _context181.stop();
                        }
                    }
                }, _callee181, _this);
            }));

            return function (_x300) {
                return _ref184.apply(this, arguments);
            };
        }();

        this.invalidateCaches = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee182() {
            return regeneratorRuntime.wrap(function _callee182$(_context182) {
                while (1) {
                    switch (_context182.prev = _context182.next) {
                        case 0:
                            return _context182.abrupt('return', _this.doFetch(_this.getBaseRoute() + '/caches/invalidate', { method: 'post' }));

                        case 1:
                        case 'end':
                            return _context182.stop();
                    }
                }
            }, _callee182, _this);
        }));
        this.recycleDatabase = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee183() {
            return regeneratorRuntime.wrap(function _callee183$(_context183) {
                while (1) {
                    switch (_context183.prev = _context183.next) {
                        case 0:
                            return _context183.abrupt('return', _this.doFetch(_this.getBaseRoute() + '/database/recycle', { method: 'post' }));

                        case 1:
                        case 'end':
                            return _context183.stop();
                    }
                }
            }, _callee183, _this);
        }));

        this.createComplianceReport = function () {
            var _ref187 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee184(job) {
                return regeneratorRuntime.wrap(function _callee184$(_context184) {
                    while (1) {
                        switch (_context184.prev = _context184.next) {
                            case 0:
                                return _context184.abrupt('return', _this.doFetch(_this.getBaseRoute() + '/compliance/reports', { method: 'post', body: JSON.stringify(job) }));

                            case 1:
                            case 'end':
                                return _context184.stop();
                        }
                    }
                }, _callee184, _this);
            }));

            return function (_x301) {
                return _ref187.apply(this, arguments);
            };
        }();

        this.getComplianceReport = function () {
            var _ref188 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee185(reportId) {
                return regeneratorRuntime.wrap(function _callee185$(_context185) {
                    while (1) {
                        switch (_context185.prev = _context185.next) {
                            case 0:
                                return _context185.abrupt('return', _this.doFetch(_this.getBaseRoute() + '/compliance/reports/' + reportId, { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context185.stop();
                        }
                    }
                }, _callee185, _this);
            }));

            return function (_x302) {
                return _ref188.apply(this, arguments);
            };
        }();

        this.getComplianceReports = function () {
            var _ref189 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee186() {
                var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                var perPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : PER_PAGE_DEFAULT;
                return regeneratorRuntime.wrap(function _callee186$(_context186) {
                    while (1) {
                        switch (_context186.prev = _context186.next) {
                            case 0:
                                return _context186.abrupt('return', _this.doFetch(_this.getBaseRoute() + '/compliance/reports' + buildQueryString({ page: page, per_page: perPage }), { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context186.stop();
                        }
                    }
                }, _callee186, _this);
            }));

            return function () {
                return _ref189.apply(this, arguments);
            };
        }();

        this.uploadBrandImage = function () {
            var _ref190 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee187(imageData) {
                var formData, request;
                return regeneratorRuntime.wrap(function _callee187$(_context187) {
                    while (1) {
                        switch (_context187.prev = _context187.next) {
                            case 0:
                                formData = new FormData();

                                formData.append('image', imageData);

                                request = {
                                    method: 'post',
                                    body: formData
                                };


                                if (formData.getBoundary) {
                                    request.headers = {
                                        'Content-Type': 'multipart/form-data; boundary=' + formData.getBoundary()
                                    };
                                }

                                return _context187.abrupt('return', _this.doFetch(_this.getBrandRoute() + '/image', request));

                            case 5:
                            case 'end':
                                return _context187.stop();
                        }
                    }
                }, _callee187, _this);
            }));

            return function (_x305) {
                return _ref190.apply(this, arguments);
            };
        }();

        this.getClusterStatus = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee188() {
            return regeneratorRuntime.wrap(function _callee188$(_context188) {
                while (1) {
                    switch (_context188.prev = _context188.next) {
                        case 0:
                            return _context188.abrupt('return', _this.doFetch(_this.getBaseRoute() + '/cluster/status', { method: 'get' }));

                        case 1:
                        case 'end':
                            return _context188.stop();
                    }
                }
            }, _callee188, _this);
        }));
        this.testLdap = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee189() {
            return regeneratorRuntime.wrap(function _callee189$(_context189) {
                while (1) {
                    switch (_context189.prev = _context189.next) {
                        case 0:
                            return _context189.abrupt('return', _this.doFetch(_this.getBaseRoute() + '/ldap/test', { method: 'post' }));

                        case 1:
                        case 'end':
                            return _context189.stop();
                    }
                }
            }, _callee189, _this);
        }));
        this.syncLdap = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee190() {
            return regeneratorRuntime.wrap(function _callee190$(_context190) {
                while (1) {
                    switch (_context190.prev = _context190.next) {
                        case 0:
                            return _context190.abrupt('return', _this.doFetch(_this.getBaseRoute() + '/ldap/sync', { method: 'post' }));

                        case 1:
                        case 'end':
                            return _context190.stop();
                    }
                }
            }, _callee190, _this);
        }));
        this.getSamlCertificateStatus = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee191() {
            return regeneratorRuntime.wrap(function _callee191$(_context191) {
                while (1) {
                    switch (_context191.prev = _context191.next) {
                        case 0:
                            return _context191.abrupt('return', _this.doFetch(_this.getBaseRoute() + '/saml/certificate/status', { method: 'get' }));

                        case 1:
                        case 'end':
                            return _context191.stop();
                    }
                }
            }, _callee191, _this);
        }));

        this.uploadPublicSamlCertificate = function () {
            var _ref195 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee192(fileData) {
                var formData;
                return regeneratorRuntime.wrap(function _callee192$(_context192) {
                    while (1) {
                        switch (_context192.prev = _context192.next) {
                            case 0:
                                formData = new FormData();

                                formData.append('certificate', fileData);

                                return _context192.abrupt('return', _this.doFetch(_this.getBaseRoute() + '/saml/certificate/public', {
                                    method: 'post',
                                    body: formData
                                }));

                            case 3:
                            case 'end':
                                return _context192.stop();
                        }
                    }
                }, _callee192, _this);
            }));

            return function (_x306) {
                return _ref195.apply(this, arguments);
            };
        }();

        this.uploadPrivateSamlCertificate = function () {
            var _ref196 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee193(fileData) {
                var formData;
                return regeneratorRuntime.wrap(function _callee193$(_context193) {
                    while (1) {
                        switch (_context193.prev = _context193.next) {
                            case 0:
                                formData = new FormData();

                                formData.append('certificate', fileData);

                                return _context193.abrupt('return', _this.doFetch(_this.getBaseRoute() + '/saml/certificate/private', {
                                    method: 'post',
                                    body: formData
                                }));

                            case 3:
                            case 'end':
                                return _context193.stop();
                        }
                    }
                }, _callee193, _this);
            }));

            return function (_x307) {
                return _ref196.apply(this, arguments);
            };
        }();

        this.uploadIdpSamlCertificate = function () {
            var _ref197 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee194(fileData) {
                var formData;
                return regeneratorRuntime.wrap(function _callee194$(_context194) {
                    while (1) {
                        switch (_context194.prev = _context194.next) {
                            case 0:
                                formData = new FormData();

                                formData.append('certificate', fileData);

                                return _context194.abrupt('return', _this.doFetch(_this.getBaseRoute() + '/saml/certificate/idp', {
                                    method: 'post',
                                    body: formData
                                }));

                            case 3:
                            case 'end':
                                return _context194.stop();
                        }
                    }
                }, _callee194, _this);
            }));

            return function (_x308) {
                return _ref197.apply(this, arguments);
            };
        }();

        this.deletePublicSamlCertificate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee195() {
            return regeneratorRuntime.wrap(function _callee195$(_context195) {
                while (1) {
                    switch (_context195.prev = _context195.next) {
                        case 0:
                            return _context195.abrupt('return', _this.doFetch(_this.getBaseRoute() + '/saml/certificate/public', { method: 'delete' }));

                        case 1:
                        case 'end':
                            return _context195.stop();
                    }
                }
            }, _callee195, _this);
        }));
        this.deletePrivateSamlCertificate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee196() {
            return regeneratorRuntime.wrap(function _callee196$(_context196) {
                while (1) {
                    switch (_context196.prev = _context196.next) {
                        case 0:
                            return _context196.abrupt('return', _this.doFetch(_this.getBaseRoute() + '/saml/certificate/private', { method: 'delete' }));

                        case 1:
                        case 'end':
                            return _context196.stop();
                    }
                }
            }, _callee196, _this);
        }));
        this.deleteIdpSamlCertificate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee197() {
            return regeneratorRuntime.wrap(function _callee197$(_context197) {
                while (1) {
                    switch (_context197.prev = _context197.next) {
                        case 0:
                            return _context197.abrupt('return', _this.doFetch(_this.getBaseRoute() + '/saml/certificate/idp', { method: 'delete' }));

                        case 1:
                        case 'end':
                            return _context197.stop();
                    }
                }
            }, _callee197, _this);
        }));

        this.testElasticsearch = function () {
            var _ref201 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee198(config) {
                return regeneratorRuntime.wrap(function _callee198$(_context198) {
                    while (1) {
                        switch (_context198.prev = _context198.next) {
                            case 0:
                                return _context198.abrupt('return', _this.doFetch(_this.getBaseRoute() + '/elasticsearch/test', { method: 'post', body: JSON.stringify(config) }));

                            case 1:
                            case 'end':
                                return _context198.stop();
                        }
                    }
                }, _callee198, _this);
            }));

            return function (_x309) {
                return _ref201.apply(this, arguments);
            };
        }();

        this.purgeElasticsearchIndexes = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee199() {
            return regeneratorRuntime.wrap(function _callee199$(_context199) {
                while (1) {
                    switch (_context199.prev = _context199.next) {
                        case 0:
                            return _context199.abrupt('return', _this.doFetch(_this.getBaseRoute() + '/elasticsearch/purge_indexes', { method: 'post' }));

                        case 1:
                        case 'end':
                            return _context199.stop();
                    }
                }
            }, _callee199, _this);
        }));

        this.uploadLicense = function () {
            var _ref203 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee200(fileData) {
                var formData, request;
                return regeneratorRuntime.wrap(function _callee200$(_context200) {
                    while (1) {
                        switch (_context200.prev = _context200.next) {
                            case 0:
                                _this.trackEvent('api', 'api_license_upload');

                                formData = new FormData();

                                formData.append('license', fileData);

                                request = {
                                    method: 'post',
                                    body: formData
                                };


                                if (formData.getBoundary) {
                                    request.headers = {
                                        'Content-Type': 'multipart/form-data; boundary=' + formData.getBoundary()
                                    };
                                }

                                return _context200.abrupt('return', _this.doFetch(_this.getBaseRoute() + '/license', request));

                            case 6:
                            case 'end':
                                return _context200.stop();
                        }
                    }
                }, _callee200, _this);
            }));

            return function (_x310) {
                return _ref203.apply(this, arguments);
            };
        }();

        this.removeLicense = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee201() {
            return regeneratorRuntime.wrap(function _callee201$(_context201) {
                while (1) {
                    switch (_context201.prev = _context201.next) {
                        case 0:
                            return _context201.abrupt('return', _this.doFetch(_this.getBaseRoute() + '/license', { method: 'delete' }));

                        case 1:
                        case 'end':
                            return _context201.stop();
                    }
                }
            }, _callee201, _this);
        }));

        this.getAnalytics = function () {
            var _ref205 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee202() {
                var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'standard';
                var teamId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
                return regeneratorRuntime.wrap(function _callee202$(_context202) {
                    while (1) {
                        switch (_context202.prev = _context202.next) {
                            case 0:
                                return _context202.abrupt('return', _this.doFetch(_this.getBaseRoute() + '/analytics/old' + buildQueryString({ name: name, team_id: teamId }), { method: 'get' }));

                            case 1:
                            case 'end':
                                return _context202.stop();
                        }
                    }
                }, _callee202, _this);
            }));

            return function () {
                return _ref205.apply(this, arguments);
            };
        }();

        this.uploadPlugin = function () {
            var _ref206 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee203(fileData) {
                var formData, request;
                return regeneratorRuntime.wrap(function _callee203$(_context203) {
                    while (1) {
                        switch (_context203.prev = _context203.next) {
                            case 0:
                                _this.trackEvent('api', 'api_plugin_upload');

                                formData = new FormData();

                                formData.append('plugin', fileData);

                                request = {
                                    method: 'post',
                                    body: formData
                                };


                                if (formData.getBoundary) {
                                    request.headers = {
                                        'Content-Type': 'multipart/form-data; boundary=' + formData.getBoundary()
                                    };
                                }

                                return _context203.abrupt('return', _this.doFetch(_this.getPluginsRoute(), request));

                            case 6:
                            case 'end':
                                return _context203.stop();
                        }
                    }
                }, _callee203, _this);
            }));

            return function (_x313) {
                return _ref206.apply(this, arguments);
            };
        }();

        this.getPlugins = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee204() {
            return regeneratorRuntime.wrap(function _callee204$(_context204) {
                while (1) {
                    switch (_context204.prev = _context204.next) {
                        case 0:
                            return _context204.abrupt('return', _this.doFetch(_this.getPluginsRoute(), { method: 'get' }));

                        case 1:
                        case 'end':
                            return _context204.stop();
                    }
                }
            }, _callee204, _this);
        }));

        this.removePlugin = function () {
            var _ref208 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee205(pluginId) {
                return regeneratorRuntime.wrap(function _callee205$(_context205) {
                    while (1) {
                        switch (_context205.prev = _context205.next) {
                            case 0:
                                return _context205.abrupt('return', _this.doFetch(_this.getPluginRoute(pluginId), { method: 'delete' }));

                            case 1:
                            case 'end':
                                return _context205.stop();
                        }
                    }
                }, _callee205, _this);
            }));

            return function (_x314) {
                return _ref208.apply(this, arguments);
            };
        }();

        this.getWebappPlugins = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee206() {
            return regeneratorRuntime.wrap(function _callee206$(_context206) {
                while (1) {
                    switch (_context206.prev = _context206.next) {
                        case 0:
                            return _context206.abrupt('return', _this.doFetch(_this.getPluginsRoute() + '/webapp', { method: 'get' }));

                        case 1:
                        case 'end':
                            return _context206.stop();
                    }
                }
            }, _callee206, _this);
        }));

        this.activatePlugin = function () {
            var _ref210 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee207(pluginId) {
                return regeneratorRuntime.wrap(function _callee207$(_context207) {
                    while (1) {
                        switch (_context207.prev = _context207.next) {
                            case 0:
                                return _context207.abrupt('return', _this.doFetch(_this.getPluginRoute(pluginId) + '/activate', { method: 'post' }));

                            case 1:
                            case 'end':
                                return _context207.stop();
                        }
                    }
                }, _callee207, _this);
            }));

            return function (_x315) {
                return _ref210.apply(this, arguments);
            };
        }();

        this.deactivatePlugin = function () {
            var _ref211 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee208(pluginId) {
                return regeneratorRuntime.wrap(function _callee208$(_context208) {
                    while (1) {
                        switch (_context208.prev = _context208.next) {
                            case 0:
                                return _context208.abrupt('return', _this.doFetch(_this.getPluginRoute(pluginId) + '/deactivate', { method: 'post' }));

                            case 1:
                            case 'end':
                                return _context208.stop();
                        }
                    }
                }, _callee208, _this);
            }));

            return function (_x316) {
                return _ref211.apply(this, arguments);
            };
        }();

        this.doFetch = function () {
            var _ref212 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee209(url, options) {
                var _ref213, data;

                return regeneratorRuntime.wrap(function _callee209$(_context209) {
                    while (1) {
                        switch (_context209.prev = _context209.next) {
                            case 0:
                                _context209.next = 2;
                                return _this.doFetchWithResponse(url, options);

                            case 2:
                                _ref213 = _context209.sent;
                                data = _ref213.data;
                                return _context209.abrupt('return', data);

                            case 5:
                            case 'end':
                                return _context209.stop();
                        }
                    }
                }, _callee209, _this);
            }));

            return function (_x317, _x318) {
                return _ref212.apply(this, arguments);
            };
        }();

        this.doFetchWithResponse = function () {
            var _ref214 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee210(url, options) {
                var response, headers, data, serverVersion, clusterId, msg;
                return regeneratorRuntime.wrap(function _callee210$(_context210) {
                    while (1) {
                        switch (_context210.prev = _context210.next) {
                            case 0:
                                _context210.next = 2;
                                return (0, _fetch_etag2.default)(url, _this.getOptions(options));

                            case 2:
                                response = _context210.sent;
                                headers = parseAndMergeNestedHeaders(response.headers);
                                data = void 0;
                                _context210.prev = 5;
                                _context210.next = 8;
                                return response.json();

                            case 8:
                                data = _context210.sent;
                                _context210.next = 14;
                                break;

                            case 11:
                                _context210.prev = 11;
                                _context210.t0 = _context210['catch'](5);
                                throw {
                                    intl: {
                                        id: 'mobile.request.invalid_response',
                                        defaultMessage: 'Received invalid response from the server.'
                                    }
                                };

                            case 14:

                                // Need to only accept version in the header from requests that are not cached
                                // to avoid getting an old version from a cached response
                                if (headers.has(HEADER_X_VERSION_ID) && !headers.get('Cache-Control')) {
                                    serverVersion = headers.get(HEADER_X_VERSION_ID);

                                    if (serverVersion && _this.serverVersion !== serverVersion) {
                                        _this.serverVersion = serverVersion;
                                        _event_emitter2.default.emit(_constants.General.SERVER_VERSION_CHANGED, serverVersion);
                                    }
                                }

                                if (headers.has(HEADER_X_CLUSTER_ID)) {
                                    clusterId = headers.get(HEADER_X_CLUSTER_ID);

                                    if (clusterId && _this.clusterId !== clusterId) {
                                        _this.clusterId = clusterId;
                                    }
                                }

                                if (!response.ok) {
                                    _context210.next = 18;
                                    break;
                                }

                                return _context210.abrupt('return', {
                                    response: response,
                                    headers: headers,
                                    data: data
                                });

                            case 18:
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

                            case 21:
                            case 'end':
                                return _context210.stop();
                        }
                    }
                }, _callee210, _this, [[5, 11]]);
            }));

            return function (_x319, _x320) {
                return _ref214.apply(this, arguments);
            };
        }();

        this.logToConsole = false;
        this.serverVersion = '';
        this.clusterId = '';
        this.token = '';
        this.url = '';
        this.urlVersion = '/api/v4';
        this.userAgent = null;
        this.enableLogging = false;
        this.defaultHeaders = {};
        this.userId = '';
        this.diagnosticId = '';
        this.includeCookies = true;

        this.translations = {
            connectionError: 'There appears to be a problem with your internet connection.',
            unknownError: 'We received an unexpected status code from the server.'
        };
    }

    _createClass(Client4, [{
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
        key: 'setAcceptLanguage',
        value: function setAcceptLanguage(locale) {
            this.defaultHeaders['Accept-Language'] = locale;
        }
    }, {
        key: 'setEnableLogging',
        value: function setEnableLogging(enable) {
            this.enableLogging = enable;
        }
    }, {
        key: 'setIncludeCookies',
        value: function setIncludeCookies(include) {
            this.includeCookies = include;
        }
    }, {
        key: 'setUserId',
        value: function setUserId(userId) {
            this.userId = userId;
        }
    }, {
        key: 'setDiagnosticId',
        value: function setDiagnosticId(diagnosticId) {
            this.diagnosticId = diagnosticId;
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
        key: 'getUsersRoute',
        value: function getUsersRoute() {
            return this.getBaseRoute() + '/users';
        }
    }, {
        key: 'getUserRoute',
        value: function getUserRoute(userId) {
            return this.getUsersRoute() + '/' + userId;
        }
    }, {
        key: 'getTeamsRoute',
        value: function getTeamsRoute() {
            return this.getBaseRoute() + '/teams';
        }
    }, {
        key: 'getTeamRoute',
        value: function getTeamRoute(teamId) {
            return this.getTeamsRoute() + '/' + teamId;
        }
    }, {
        key: 'getTeamNameRoute',
        value: function getTeamNameRoute(teamName) {
            return this.getTeamsRoute() + '/name/' + teamName;
        }
    }, {
        key: 'getTeamMembersRoute',
        value: function getTeamMembersRoute(teamId) {
            return this.getTeamRoute(teamId) + '/members';
        }
    }, {
        key: 'getTeamMemberRoute',
        value: function getTeamMemberRoute(teamId, userId) {
            return this.getTeamMembersRoute(teamId) + '/' + userId;
        }
    }, {
        key: 'getChannelsRoute',
        value: function getChannelsRoute() {
            return this.getBaseRoute() + '/channels';
        }
    }, {
        key: 'getChannelRoute',
        value: function getChannelRoute(channelId) {
            return this.getChannelsRoute() + '/' + channelId;
        }
    }, {
        key: 'getChannelMembersRoute',
        value: function getChannelMembersRoute(channelId) {
            return this.getChannelRoute(channelId) + '/members';
        }
    }, {
        key: 'getChannelMemberRoute',
        value: function getChannelMemberRoute(channelId, userId) {
            return this.getChannelMembersRoute(channelId) + '/' + userId;
        }
    }, {
        key: 'getPostsRoute',
        value: function getPostsRoute() {
            return this.getBaseRoute() + '/posts';
        }
    }, {
        key: 'getPostRoute',
        value: function getPostRoute(postId) {
            return this.getPostsRoute() + '/' + postId;
        }
    }, {
        key: 'getReactionsRoute',
        value: function getReactionsRoute() {
            return this.getBaseRoute() + '/reactions';
        }
    }, {
        key: 'getCommandsRoute',
        value: function getCommandsRoute() {
            return this.getBaseRoute() + '/commands';
        }
    }, {
        key: 'getFilesRoute',
        value: function getFilesRoute() {
            return this.getBaseRoute() + '/files';
        }
    }, {
        key: 'getFileRoute',
        value: function getFileRoute(fileId) {
            return this.getFilesRoute() + '/' + fileId;
        }
    }, {
        key: 'getPreferencesRoute',
        value: function getPreferencesRoute(userId) {
            return this.getUserRoute(userId) + '/preferences';
        }
    }, {
        key: 'getIncomingHooksRoute',
        value: function getIncomingHooksRoute() {
            return this.getBaseRoute() + '/hooks/incoming';
        }
    }, {
        key: 'getIncomingHookRoute',
        value: function getIncomingHookRoute(hookId) {
            return this.getBaseRoute() + '/hooks/incoming/' + hookId;
        }
    }, {
        key: 'getOutgoingHooksRoute',
        value: function getOutgoingHooksRoute() {
            return this.getBaseRoute() + '/hooks/outgoing';
        }
    }, {
        key: 'getOutgoingHookRoute',
        value: function getOutgoingHookRoute(hookId) {
            return this.getBaseRoute() + '/hooks/outgoing/' + hookId;
        }
    }, {
        key: 'getOAuthRoute',
        value: function getOAuthRoute() {
            return this.url + '/oauth';
        }
    }, {
        key: 'getOAuthAppsRoute',
        value: function getOAuthAppsRoute() {
            return this.getBaseRoute() + '/oauth/apps';
        }
    }, {
        key: 'getOAuthAppRoute',
        value: function getOAuthAppRoute(appId) {
            return this.getOAuthAppsRoute() + '/' + appId;
        }
    }, {
        key: 'getEmojisRoute',
        value: function getEmojisRoute() {
            return this.getBaseRoute() + '/emoji';
        }
    }, {
        key: 'getEmojiRoute',
        value: function getEmojiRoute(emojiId) {
            return this.getEmojisRoute() + '/' + emojiId;
        }
    }, {
        key: 'getBrandRoute',
        value: function getBrandRoute() {
            return this.getBaseRoute() + '/brand';
        }
    }, {
        key: 'getBrandImageUrl',
        value: function getBrandImageUrl(timestamp) {
            return this.getBrandRoute() + '/image?t=' + timestamp;
        }
    }, {
        key: 'getDataRetentionRoute',
        value: function getDataRetentionRoute() {
            return this.getBaseRoute() + '/data_retention';
        }
    }, {
        key: 'getJobsRoute',
        value: function getJobsRoute() {
            return this.getBaseRoute() + '/jobs';
        }
    }, {
        key: 'getPluginsRoute',
        value: function getPluginsRoute() {
            return this.getBaseRoute() + '/plugins';
        }
    }, {
        key: 'getPluginRoute',
        value: function getPluginRoute(pluginId) {
            return this.getPluginsRoute() + '/' + pluginId;
        }
    }, {
        key: 'getTimezonesRoute',
        value: function getTimezonesRoute() {
            return this.getBaseRoute() + '/system/timezones';
        }
    }, {
        key: 'getOptions',
        value: function getOptions(options) {
            var newOptions = Object.assign({}, options);

            var headers = _extends(_defineProperty({}, HEADER_REQUESTED_WITH, 'XMLHttpRequest'), this.defaultHeaders);

            if (this.token) {
                headers[HEADER_AUTH] = HEADER_BEARER + ' ' + this.token;
            }

            if (this.includeCookies) {
                newOptions.credentials = 'include';
            }

            if (this.userAgent) {
                headers[HEADER_USER_AGENT] = this.userAgent;
            }

            if (newOptions.headers) {
                Object.assign(headers, newOptions.headers);
            }

            return _extends({}, newOptions, {
                headers: headers
            });
        }

        // User Routes

        // Team Routes

        // Channel Routes

        // Post Routes

    }, {
        key: 'getFileUrl',


        // Files Routes

        value: function getFileUrl(fileId, timestamp) {
            var url = '' + this.getFileRoute(fileId);
            if (timestamp) {
                url += '?' + timestamp;
            }

            return url;
        }
    }, {
        key: 'getFileThumbnailUrl',
        value: function getFileThumbnailUrl(fileId, timestamp) {
            var url = this.getFileRoute(fileId) + '/thumbnail';
            if (timestamp) {
                url += '?' + timestamp;
            }

            return url;
        }
    }, {
        key: 'getFilePreviewUrl',
        value: function getFilePreviewUrl(fileId, timestamp) {
            var url = this.getFileRoute(fileId) + '/preview';
            if (timestamp) {
                url += '?' + timestamp;
            }

            return url;
        }

        // Preference Routes

        // General Routes

        // Integration Routes

        // Emoji Routes

        // Timezone Routes


        // Data Retention

        // Jobs Routes

        // Admin Routes

        // Plugin Routes - EXPERIMENTAL - SUBJECT TO CHANGE

        // Client Helpers

    }, {
        key: 'trackEvent',
        value: function trackEvent(category, event, props) {
            var properties = Object.assign({ category: category, type: event, user_actual_id: this.userId }, props);
            var options = {
                context: {
                    ip: '0.0.0.0'
                },
                page: {
                    path: '',
                    referrer: '',
                    search: '',
                    title: '',
                    url: ''
                },
                anonymousId: '00000000000000000000000000'
            };

            if (global && global.window && global.window.analytics && global.window.analytics.initialized) {
                global.window.analytics.track('event', properties, options);
            } else if (global && global.analytics) {
                if (global.analytics_context) {
                    options.context = global.analytics_context;
                }
                global.analytics.track(Object.assign({
                    event: 'event',
                    userId: this.diagnosticId
                }, { properties: properties }, options));
            }
        }
    }]);

    return Client4;
}();

exports.default = Client4;


function buildQueryString(parameters) {
    var keys = Object.keys(parameters);
    if (keys.length === 0) {
        return '';
    }

    var query = '?';
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        query += key + '=' + encodeURIComponent(parameters[key]);

        if (i < keys.length - 1) {
            query += '&';
        }
    }

    return query;
}

function parseAndMergeNestedHeaders(originalHeaders) {
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