'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getUserCurrentTimezone = getUserCurrentTimezone;
exports.getTimezoneRegion = getTimezoneRegion;
// Copyright (c) 2017-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

function getUserCurrentTimezone(userTimezone) {
    if (!userTimezone) {
        return null;
    }
    var useAutomaticTimezone = userTimezone.useAutomaticTimezone,
        automaticTimezone = userTimezone.automaticTimezone,
        manualTimezone = userTimezone.manualTimezone;


    var useAutomatic = useAutomaticTimezone;
    if (typeof useAutomaticTimezone === 'string') {
        useAutomatic = useAutomaticTimezone === 'true';
    }

    if (useAutomatic) {
        return automaticTimezone;
    }
    return manualTimezone;
}

function getTimezoneRegion(timezone) {
    if (timezone) {
        var split = timezone.split('/');
        if (split.length > 1) {
            return split.pop().replace(/_/g, ' ');
        }
    }

    return timezone;
}