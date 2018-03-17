"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getDisplayableErrors = getDisplayableErrors;
// Copyright (c) 2017-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

function getDisplayableErrors(state) {
    return state.errors.filter(function (error) {
        return error.displayable;
    });
}