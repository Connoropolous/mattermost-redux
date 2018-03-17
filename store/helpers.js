'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
// Copyright (c) 2017 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

var defaultOptions = exports.defaultOptions = {
    additionalMiddleware: [],
    enableBuffer: true
};

var offlineConfig = {
    effect: function effect(_effect, action) {
        if (typeof _effect !== 'function') {
            throw new Error('Offline Action: effect must be a function.');
        } else if (!action.meta.offline.commit) {
            throw new Error('Offline Action: commit action must be present.');
        }

        return _effect();
    },
    discard: function discard(error, action, retries) {
        if (action.meta && action.meta.offline.hasOwnProperty('maxRetry')) {
            return retries >= action.meta.offline.maxRetry;
        }

        return retries > 10;
    }
};
exports.offlineConfig = offlineConfig;