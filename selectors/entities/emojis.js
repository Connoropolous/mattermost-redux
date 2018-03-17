'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCustomEmojiIdsSortedByName = exports.getCustomEmojisByName = exports.getCustomEmojisAsMap = undefined;
exports.getCustomEmojis = getCustomEmojis;

var _reselect = require('reselect');

var _helpers = require('../../utils/helpers');

// Copyright (c) 2017-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

function getCustomEmojis(state) {
    return state.entities.emojis.customEmoji;
}

var getCustomEmojisAsMap = exports.getCustomEmojisAsMap = (0, _reselect.createSelector)(getCustomEmojis, function (emojis) {
    var map = new Map();
    Object.keys(emojis).forEach(function (key) {
        map.set(key, emojis[key]);
    });
    return map;
});

var getCustomEmojisByName = exports.getCustomEmojisByName = (0, _reselect.createSelector)(getCustomEmojis, function (emojis) {
    var map = new Map();

    Object.values(emojis).forEach(function (emoji) {
        map.set(emoji.name, emoji);
    });

    return map;
});

var getCustomEmojiIdsSortedByName = exports.getCustomEmojiIdsSortedByName = (0, _helpers.createIdsSelector)(function (state) {
    return state.entities.emojis.customEmoji;
}, function (emojis) {
    var sortedEmojis = Object.values(emojis).sort(function (a, b) {
        return a.name.localeCompare(b.name);
    });
    var sortedIds = [];
    sortedEmojis.forEach(function (e) {
        return sortedIds.push(e.id);
    });
    return sortedIds;
});