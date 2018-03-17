"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCurrentChannelId = getCurrentChannelId;
exports.getCurrentUser = getCurrentUser;
exports.getCurrentUserId = getCurrentUserId;
exports.getUsers = getUsers;
// Copyright (c) 2017-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

// Channels

function getCurrentChannelId(state) {
    return state.entities.channels.currentChannelId;
}

// Users

function getCurrentUser(state) {
    return state.entities.users.profiles[getCurrentUserId(state)];
}

function getCurrentUserId(state) {
    return state.entities.users.currentUserId;
}

function getUsers(state) {
    return state.entities.users.profiles;
}