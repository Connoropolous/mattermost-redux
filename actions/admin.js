'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getLogs = getLogs;
exports.getAudits = getAudits;
exports.getConfig = getConfig;
exports.updateConfig = updateConfig;
exports.reloadConfig = reloadConfig;
exports.testEmail = testEmail;
exports.testS3Connection = testS3Connection;
exports.invalidateCaches = invalidateCaches;
exports.recycleDatabase = recycleDatabase;
exports.createComplianceReport = createComplianceReport;
exports.getComplianceReport = getComplianceReport;
exports.getComplianceReports = getComplianceReports;
exports.uploadBrandImage = uploadBrandImage;
exports.getClusterStatus = getClusterStatus;
exports.testLdap = testLdap;
exports.syncLdap = syncLdap;
exports.getSamlCertificateStatus = getSamlCertificateStatus;
exports.uploadPublicSamlCertificate = uploadPublicSamlCertificate;
exports.uploadPrivateSamlCertificate = uploadPrivateSamlCertificate;
exports.uploadIdpSamlCertificate = uploadIdpSamlCertificate;
exports.removePublicSamlCertificate = removePublicSamlCertificate;
exports.removePrivateSamlCertificate = removePrivateSamlCertificate;
exports.removeIdpSamlCertificate = removeIdpSamlCertificate;
exports.testElasticsearch = testElasticsearch;
exports.purgeElasticsearchIndexes = purgeElasticsearchIndexes;
exports.uploadLicense = uploadLicense;
exports.removeLicense = removeLicense;
exports.getAnalytics = getAnalytics;
exports.getStandardAnalytics = getStandardAnalytics;
exports.getAdvancedAnalytics = getAdvancedAnalytics;
exports.getPostsPerDayAnalytics = getPostsPerDayAnalytics;
exports.getUsersPerDayAnalytics = getUsersPerDayAnalytics;
exports.uploadPlugin = uploadPlugin;
exports.getPlugins = getPlugins;
exports.removePlugin = removePlugin;
exports.activatePlugin = activatePlugin;
exports.deactivatePlugin = deactivatePlugin;

var _action_types = require('../action_types');

var _constants = require('../constants');

var _client = require('../client');

var _errors = require('./errors');

var _helpers = require('./helpers');

var _reduxBatchedActions = require('redux-batched-actions');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // Copyright (c) 2017-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

function getLogs() {
    var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var perPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.General.LOGS_PAGE_SIZE_DEFAULT;

    return (0, _helpers.bindClientFunc)(_client.Client4.getLogs, _action_types.AdminTypes.GET_LOGS_REQUEST, [_action_types.AdminTypes.RECEIVED_LOGS, _action_types.AdminTypes.GET_LOGS_SUCCESS], _action_types.AdminTypes.GET_LOGS_FAILURE, page, perPage);
}

function getAudits() {
    var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var perPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.General.PAGE_SIZE_DEFAULT;

    return (0, _helpers.bindClientFunc)(_client.Client4.getAudits, _action_types.AdminTypes.GET_AUDITS_REQUEST, [_action_types.AdminTypes.RECEIVED_AUDITS, _action_types.AdminTypes.GET_AUDITS_SUCCESS], _action_types.AdminTypes.GET_AUDITS_FAILURE, page, perPage);
}

function getConfig() {
    return (0, _helpers.bindClientFunc)(_client.Client4.getConfig, _action_types.AdminTypes.GET_CONFIG_REQUEST, [_action_types.AdminTypes.RECEIVED_CONFIG, _action_types.AdminTypes.GET_CONFIG_SUCCESS], _action_types.AdminTypes.GET_CONFIG_FAILURE);
}

function updateConfig(config) {
    return (0, _helpers.bindClientFunc)(_client.Client4.updateConfig, _action_types.AdminTypes.UPDATE_CONFIG_REQUEST, [_action_types.AdminTypes.RECEIVED_CONFIG, _action_types.AdminTypes.UPDATE_CONFIG_SUCCESS], _action_types.AdminTypes.UPDATE_CONFIG_FAILURE, config);
}

function reloadConfig() {
    return (0, _helpers.bindClientFunc)(_client.Client4.reloadConfig, _action_types.AdminTypes.RELOAD_CONFIG_REQUEST, _action_types.AdminTypes.RELOAD_CONFIG_SUCCESS, _action_types.AdminTypes.RELOAD_CONFIG_FAILURE);
}

function testEmail(config) {
    return (0, _helpers.bindClientFunc)(_client.Client4.testEmail, _action_types.AdminTypes.TEST_EMAIL_REQUEST, _action_types.AdminTypes.TEST_EMAIL_SUCCESS, _action_types.AdminTypes.TEST_EMAIL_FAILURE, config);
}

function testS3Connection(config) {
    return (0, _helpers.bindClientFunc)(_client.Client4.testS3Connection, _action_types.AdminTypes.TEST_S3_REQUEST, _action_types.AdminTypes.TEST_S3_SUCCESS, _action_types.AdminTypes.TEST_S3_FAILURE, config);
}

function invalidateCaches() {
    return (0, _helpers.bindClientFunc)(_client.Client4.invalidateCaches, _action_types.AdminTypes.INVALIDATE_CACHES_REQUEST, _action_types.AdminTypes.INVALIDATE_CACHES_SUCCESS, _action_types.AdminTypes.INVALIDATE_CACHES_FAILURE);
}

function recycleDatabase() {
    return (0, _helpers.bindClientFunc)(_client.Client4.recycleDatabase, _action_types.AdminTypes.RECYCLE_DATABASE_REQUEST, _action_types.AdminTypes.RECYCLE_DATABASE_SUCCESS, _action_types.AdminTypes.RECYCLE_DATABASE_FAILURE);
}

function createComplianceReport(job) {
    return (0, _helpers.bindClientFunc)(_client.Client4.createComplianceReport, _action_types.AdminTypes.CREATE_COMPLIANCE_REQUEST, [_action_types.AdminTypes.RECEIVED_COMPLIANCE_REPORT, _action_types.AdminTypes.CREATE_COMPLIANCE_SUCCESS], _action_types.AdminTypes.CREATE_COMPLIANCE_FAILURE, job);
}

function getComplianceReport(reportId) {
    return (0, _helpers.bindClientFunc)(_client.Client4.getComplianceReport, _action_types.AdminTypes.GET_COMPLIANCE_REQUEST, [_action_types.AdminTypes.RECEIVED_COMPLIANCE_REPORT, _action_types.AdminTypes.GET_COMPLIANCE_SUCCESS], _action_types.AdminTypes.GET_COMPLIANCE_FAILURE, reportId);
}

function getComplianceReports() {
    var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var perPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.General.PER_PAGE_DEFAULT;

    return (0, _helpers.bindClientFunc)(_client.Client4.getComplianceReports, _action_types.AdminTypes.GET_COMPLIANCE_REQUEST, [_action_types.AdminTypes.RECEIVED_COMPLIANCE_REPORTS, _action_types.AdminTypes.GET_COMPLIANCE_SUCCESS], _action_types.AdminTypes.GET_COMPLIANCE_FAILURE, page, perPage);
}

function uploadBrandImage(imageData) {
    return (0, _helpers.bindClientFunc)(_client.Client4.uploadBrandImage, _action_types.AdminTypes.UPLOAD_BRAND_IMAGE_REQUEST, _action_types.AdminTypes.UPLOAD_BRAND_IMAGE_SUCCESS, _action_types.AdminTypes.UPLOAD_BRAND_IMAGE_FAILURE, imageData);
}

function getClusterStatus() {
    return (0, _helpers.bindClientFunc)(_client.Client4.getClusterStatus, _action_types.AdminTypes.GET_CLUSTER_STATUS_REQUEST, [_action_types.AdminTypes.RECEIVED_CLUSTER_STATUS, _action_types.AdminTypes.GET_CLUSTER_STATUS_SUCCESS], _action_types.AdminTypes.GET_CLUSTER_STATUS_FAILURE);
}

function testLdap() {
    return (0, _helpers.bindClientFunc)(_client.Client4.testLdap, _action_types.AdminTypes.TEST_LDAP_REQUEST, _action_types.AdminTypes.TEST_LDAP_SUCCESS, _action_types.AdminTypes.TEST_LDAP_FAILURE);
}

function syncLdap() {
    return (0, _helpers.bindClientFunc)(_client.Client4.syncLdap, _action_types.AdminTypes.SYNC_LDAP_REQUEST, _action_types.AdminTypes.SYNC_LDAP_SUCCESS, _action_types.AdminTypes.SYNC_LDAP_FAILURE);
}

function getSamlCertificateStatus() {
    return (0, _helpers.bindClientFunc)(_client.Client4.getSamlCertificateStatus, _action_types.AdminTypes.SAML_CERT_STATUS_REQUEST, [_action_types.AdminTypes.RECEIVED_SAML_CERT_STATUS, _action_types.AdminTypes.SAML_CERT_STATUS_SUCCESS], _action_types.AdminTypes.SAML_CERT_STATUS_FAILURE);
}

function uploadPublicSamlCertificate(fileData) {
    return (0, _helpers.bindClientFunc)(_client.Client4.uploadPublicSamlCertificate, _action_types.AdminTypes.UPLOAD_SAML_PUBLIC_REQUEST, _action_types.AdminTypes.UPLOAD_SAML_PUBLIC_SUCCESS, _action_types.AdminTypes.UPLOAD_SAML_PUBLIC_FAILURE, fileData);
}

function uploadPrivateSamlCertificate(fileData) {
    return (0, _helpers.bindClientFunc)(_client.Client4.uploadPrivateSamlCertificate, _action_types.AdminTypes.UPLOAD_SAML_PRIVATE_REQUEST, _action_types.AdminTypes.UPLOAD_SAML_PRIVATE_SUCCESS, _action_types.AdminTypes.UPLOAD_SAML_PRIVATE_FAILURE, fileData);
}

function uploadIdpSamlCertificate(fileData) {
    return (0, _helpers.bindClientFunc)(_client.Client4.uploadIdpSamlCertificate, _action_types.AdminTypes.UPLOAD_SAML_IDP_REQUEST, _action_types.AdminTypes.UPLOAD_SAML_IDP_SUCCESS, _action_types.AdminTypes.UPLOAD_SAML_IDP_FAILURE, fileData);
}

function removePublicSamlCertificate() {
    return (0, _helpers.bindClientFunc)(_client.Client4.deletePublicSamlCertificate, _action_types.AdminTypes.DELETE_SAML_PUBLIC_REQUEST, _action_types.AdminTypes.DELETE_SAML_PUBLIC_SUCCESS, _action_types.AdminTypes.DELETE_SAML_PUBLIC_FAILURE);
}

function removePrivateSamlCertificate() {
    return (0, _helpers.bindClientFunc)(_client.Client4.deletePrivateSamlCertificate, _action_types.AdminTypes.DELETE_SAML_PRIVATE_REQUEST, _action_types.AdminTypes.DELETE_SAML_PRIVATE_SUCCESS, _action_types.AdminTypes.DELETE_SAML_PRIVATE_FAILURE);
}

function removeIdpSamlCertificate() {
    return (0, _helpers.bindClientFunc)(_client.Client4.deleteIdpSamlCertificate, _action_types.AdminTypes.DELETE_SAML_IDP_REQUEST, _action_types.AdminTypes.DELETE_SAML_IDP_SUCCESS, _action_types.AdminTypes.DELETE_SAML_IDP_FAILURE);
}

function testElasticsearch(config) {
    return (0, _helpers.bindClientFunc)(_client.Client4.testElasticsearch, _action_types.AdminTypes.TEST_ELASTICSEARCH_REQUEST, _action_types.AdminTypes.TEST_ELASTICSEARCH_SUCCESS, _action_types.AdminTypes.TEST_ELASTICSEARCH_FAILURE, config);
}

function purgeElasticsearchIndexes() {
    return (0, _helpers.bindClientFunc)(_client.Client4.purgeElasticsearchIndexes, _action_types.AdminTypes.PURGE_ELASTICSEARCH_INDEXES_REQUEST, _action_types.AdminTypes.PURGE_ELASTICSEARCH_INDEXES_SUCCESS, _action_types.AdminTypes.PURGE_ELASTICSEARCH_INDEXES_FAILURE);
}

function uploadLicense(fileData) {
    return (0, _helpers.bindClientFunc)(_client.Client4.uploadLicense, _action_types.AdminTypes.UPLOAD_LICENSE_REQUEST, _action_types.AdminTypes.UPLOAD_LICENSE_SUCCESS, _action_types.AdminTypes.UPLOAD_LICENSE_FAILURE, fileData);
}

function removeLicense() {
    return (0, _helpers.bindClientFunc)(_client.Client4.removeLicense, _action_types.AdminTypes.REMOVE_LICENSE_REQUEST, _action_types.AdminTypes.REMOVE_LICENSE_SUCCESS, _action_types.AdminTypes.REMOVE_LICENSE_FAILURE);
}

function getAnalytics(name) {
    var _this = this;

    var teamId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    return function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState) {
            var data, actions;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            dispatch({ type: _action_types.AdminTypes.GET_ANALYTICS_REQUEST }, getState);

                            data = void 0;
                            _context.prev = 2;
                            _context.next = 5;
                            return _client.Client4.getAnalytics(name, teamId);

                        case 5:
                            data = _context.sent;
                            _context.next = 13;
                            break;

                        case 8:
                            _context.prev = 8;
                            _context.t0 = _context['catch'](2);

                            (0, _helpers.forceLogoutIfNecessary)(_context.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.AdminTypes.GET_ANALYTICS_FAILURE, error: _context.t0 }, (0, _errors.logError)(_context.t0)(dispatch)]), getState);
                            return _context.abrupt('return', { error: _context.t0 });

                        case 13:
                            actions = [{ type: _action_types.AdminTypes.GET_ANALYTICS_SUCCESS }];

                            if (teamId === '') {
                                actions.push({ type: _action_types.AdminTypes.RECEIVED_SYSTEM_ANALYTICS, data: data, name: name });
                            } else {
                                actions.push({ type: _action_types.AdminTypes.RECEIVED_TEAM_ANALYTICS, data: data, name: name, teamId: teamId });
                            }

                            dispatch((0, _reduxBatchedActions.batchActions)(actions), getState);

                            return _context.abrupt('return', { data: data });

                        case 17:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[2, 8]]);
        }));

        return function (_x8, _x9) {
            return _ref.apply(this, arguments);
        };
    }();
}

function getStandardAnalytics() {
    var teamId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return getAnalytics('standard', teamId);
}

function getAdvancedAnalytics() {
    var teamId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return getAnalytics('extra_counts', teamId);
}

function getPostsPerDayAnalytics() {
    var teamId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return getAnalytics('post_counts_day', teamId);
}

function getUsersPerDayAnalytics() {
    var teamId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return getAnalytics('user_counts_with_posts_day', teamId);
}

// EXPERIMENTAL - SUBJECT TO CHANGE
function uploadPlugin(fileData) {
    var _this2 = this;

    return function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch, getState) {
            var data;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            dispatch({ type: _action_types.AdminTypes.UPLOAD_PLUGIN_REQUEST });

                            data = void 0;
                            _context2.prev = 2;
                            _context2.next = 5;
                            return _client.Client4.uploadPlugin(fileData);

                        case 5:
                            data = _context2.sent;
                            _context2.next = 13;
                            break;

                        case 8:
                            _context2.prev = 8;
                            _context2.t0 = _context2['catch'](2);

                            (0, _helpers.forceLogoutIfNecessary)(_context2.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.AdminTypes.UPLOAD_PLUGIN_FAILURE, error: _context2.t0 }, (0, _errors.logError)(_context2.t0)(dispatch)]));
                            return _context2.abrupt('return', { error: _context2.t0 });

                        case 13:

                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.AdminTypes.UPLOAD_PLUGIN_SUCCESS }, { type: _action_types.AdminTypes.RECEIVED_PLUGIN, data: _extends({}, data, { active: false }) }]));

                            return _context2.abrupt('return', { data: data });

                        case 15:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2, [[2, 8]]);
        }));

        return function (_x14, _x15) {
            return _ref2.apply(this, arguments);
        };
    }();
}

// EXPERIMENTAL - SUBJECT TO CHANGE
function getPlugins() {
    var _this3 = this;

    return function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dispatch, getState) {
            var data;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            dispatch({ type: _action_types.AdminTypes.GET_PLUGIN_REQUEST });

                            data = void 0;
                            _context3.prev = 2;
                            _context3.next = 5;
                            return _client.Client4.getPlugins();

                        case 5:
                            data = _context3.sent;
                            _context3.next = 13;
                            break;

                        case 8:
                            _context3.prev = 8;
                            _context3.t0 = _context3['catch'](2);

                            (0, _helpers.forceLogoutIfNecessary)(_context3.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.AdminTypes.GET_PLUGIN_FAILURE, error: _context3.t0 }, (0, _errors.logError)(_context3.t0)(dispatch)]));
                            return _context3.abrupt('return', { error: _context3.t0 });

                        case 13:

                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.AdminTypes.GET_PLUGIN_SUCCESS }, { type: _action_types.AdminTypes.RECEIVED_PLUGINS, data: data }]));

                            return _context3.abrupt('return', { data: data });

                        case 15:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this3, [[2, 8]]);
        }));

        return function (_x16, _x17) {
            return _ref3.apply(this, arguments);
        };
    }();
}

// EXPERIMENTAL - SUBJECT TO CHANGE
function removePlugin(pluginId) {
    var _this4 = this;

    return function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            dispatch({ type: _action_types.AdminTypes.REMOVE_PLUGIN_REQUEST });

                            _context4.prev = 1;
                            _context4.next = 4;
                            return _client.Client4.removePlugin(pluginId);

                        case 4:
                            _context4.next = 11;
                            break;

                        case 6:
                            _context4.prev = 6;
                            _context4.t0 = _context4['catch'](1);

                            (0, _helpers.forceLogoutIfNecessary)(_context4.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.AdminTypes.REMOVE_PLUGIN_FAILURE, error: _context4.t0 }, (0, _errors.logError)(_context4.t0)(dispatch)]));
                            return _context4.abrupt('return', { error: _context4.t0 });

                        case 11:

                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.AdminTypes.REMOVE_PLUGIN_SUCCESS }, { type: _action_types.AdminTypes.REMOVED_PLUGIN, data: pluginId }]));

                            return _context4.abrupt('return', { data: true });

                        case 13:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this4, [[1, 6]]);
        }));

        return function (_x18, _x19) {
            return _ref4.apply(this, arguments);
        };
    }();
}

// EXPERIMENTAL - SUBJECT TO CHANGE
function activatePlugin(pluginId) {
    var _this5 = this;

    return function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            dispatch({ type: _action_types.AdminTypes.ACTIVATE_PLUGIN_REQUEST });

                            _context5.prev = 1;
                            _context5.next = 4;
                            return _client.Client4.activatePlugin(pluginId);

                        case 4:
                            _context5.next = 11;
                            break;

                        case 6:
                            _context5.prev = 6;
                            _context5.t0 = _context5['catch'](1);

                            (0, _helpers.forceLogoutIfNecessary)(_context5.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.AdminTypes.ACTIVATE_PLUGIN_FAILURE, error: _context5.t0 }, (0, _errors.logError)(_context5.t0)(dispatch)]));
                            return _context5.abrupt('return', { error: _context5.t0 });

                        case 11:

                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.AdminTypes.ACTIVATE_PLUGIN_SUCCESS }, { type: _action_types.AdminTypes.ACTIVATED_PLUGIN, data: pluginId }]));

                            return _context5.abrupt('return', { data: true });

                        case 13:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, _this5, [[1, 6]]);
        }));

        return function (_x20, _x21) {
            return _ref5.apply(this, arguments);
        };
    }();
}

// EXPERIMENTAL - SUBJECT TO CHANGE
function deactivatePlugin(pluginId) {
    var _this6 = this;

    return function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            dispatch({ type: _action_types.AdminTypes.DEACTIVATE_PLUGIN_REQUEST });

                            _context6.prev = 1;
                            _context6.next = 4;
                            return _client.Client4.deactivatePlugin(pluginId);

                        case 4:
                            _context6.next = 11;
                            break;

                        case 6:
                            _context6.prev = 6;
                            _context6.t0 = _context6['catch'](1);

                            (0, _helpers.forceLogoutIfNecessary)(_context6.t0, dispatch, getState);
                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.AdminTypes.DEACTIVATE_PLUGIN_FAILURE, error: _context6.t0 }, (0, _errors.logError)(_context6.t0)(dispatch)]));
                            return _context6.abrupt('return', { error: _context6.t0 });

                        case 11:

                            dispatch((0, _reduxBatchedActions.batchActions)([{ type: _action_types.AdminTypes.DEACTIVATE_PLUGIN_SUCCESS }, { type: _action_types.AdminTypes.DEACTIVATED_PLUGIN, data: pluginId }]));

                            return _context6.abrupt('return', { data: true });

                        case 13:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, _this6, [[1, 6]]);
        }));

        return function (_x22, _x23) {
            return _ref6.apply(this, arguments);
        };
    }();
}