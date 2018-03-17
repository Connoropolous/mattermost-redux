'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.canDownloadFilesOnMobile = exports.canUploadFilesOnMobile = undefined;
exports.getConfig = getConfig;
exports.getLicense = getLicense;
exports.getSupportedTimezones = getSupportedTimezones;
exports.getCurrentUrl = getCurrentUrl;

var _reselect = require('reselect');

function getConfig(state) {
    return state.entities.general.config;
} // Copyright (c) 2017-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

function getLicense(state) {
    return state.entities.general.license;
}

function getSupportedTimezones(state) {
    return state.entities.general.timezones;
}

function getCurrentUrl(state) {
    return state.entities.general.credentials.url;
}

var canUploadFilesOnMobile = exports.canUploadFilesOnMobile = (0, _reselect.createSelector)(getConfig, getLicense, function (config, license) {
    // Defaults to true if either setting doesn't exist
    return config.EnableFileAttachments !== 'false' && (license.IsLicensed === 'false' || license.Compliance === 'false' || config.EnableMobileFileUpload !== 'false');
});

var canDownloadFilesOnMobile = exports.canDownloadFilesOnMobile = (0, _reselect.createSelector)(getConfig, getLicense, function (config, license) {
    // Defaults to true if the setting doesn't exist
    return license.IsLicensed === 'false' || license.Compliance === 'false' || config.EnableMobileFileDownload !== 'false';
});