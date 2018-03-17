"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.teamListToMap = teamListToMap;
// Copyright (c) 2017-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

function teamListToMap(teamList) {
    var teams = {};
    for (var i = 0; i < teamList.length; i++) {
        teams[teamList[i].id] = teamList[i];
    }
    return teams;
}