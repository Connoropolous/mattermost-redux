'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getFilePublicLink = getFilePublicLink;
exports.makeGetFilesForPost = makeGetFilesForPost;

var _reselect = require('reselect');

function getAllFiles(state) {
    return state.entities.files.files;
} // Copyright (c) 2017-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

function getFilesIdsForPost(state, postId) {
    if (postId) {
        return state.entities.files.fileIdsByPostId[postId] || [];
    }

    return [];
}

function getFilePublicLink(state) {
    return state.entities.files.filePublicLink;
}

function makeGetFilesForPost() {
    return (0, _reselect.createSelector)([getAllFiles, getFilesIdsForPost], function (allFiles, fileIdsForPost) {
        return fileIdsForPost.map(function (id) {
            return allFiles[id];
        }).filter(function (id) {
            return Boolean(id);
        });
    });
}