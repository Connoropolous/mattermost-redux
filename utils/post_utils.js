'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isPostFlagged = isPostFlagged;
exports.isSystemMessage = isSystemMessage;
exports.isFromWebhook = isFromWebhook;
exports.isPostEphemeral = isPostEphemeral;
exports.shouldIgnorePost = shouldIgnorePost;
exports.isPostOwner = isPostOwner;
exports.isEdited = isEdited;
exports.canDeletePost = canDeletePost;
exports.canEditPost = canEditPost;
exports.getLastCreateAt = getLastCreateAt;
exports.shouldFilterJoinLeavePost = shouldFilterJoinLeavePost;
exports.isPostPendingOrFailed = isPostPendingOrFailed;
exports.comparePosts = comparePosts;

var _constants = require('../constants');

var _preference_utils = require('./preference_utils');

// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

function isPostFlagged(postId, myPreferences) {
    var key = (0, _preference_utils.getPreferenceKey)(_constants.Preferences.CATEGORY_FLAGGED_POST, postId);
    return myPreferences.hasOwnProperty(key);
}

function isSystemMessage(post) {
    return post.type !== '' && post.type && post.type.startsWith(_constants.Posts.SYSTEM_MESSAGE_PREFIX);
}

function isFromWebhook(post) {
    return post.props && post.props.from_webhook;
}

function isPostEphemeral(post) {
    return post.type === _constants.Posts.POST_TYPES.EPHEMERAL || post.type === _constants.Posts.POST_TYPES.EPHEMERAL_ADD_TO_CHANNEL || post.state === _constants.Posts.POST_DELETED;
}

function shouldIgnorePost(post) {
    return _constants.Posts.IGNORE_POST_TYPES.includes(post.type);
}

function isPostOwner(userId, post) {
    return userId === post.user_id;
}

function isEdited(post) {
    return post.edit_at > 0;
}

function canDeletePost(config, license, userId, post, isAdmin, isSystemAdmin) {
    var isOwner = isPostOwner(userId, post);

    if (license.IsLicensed === 'true') {
        return config.RestrictPostDelete === _constants.General.PERMISSIONS_ALL && (isOwner || isAdmin) || config.RestrictPostDelete === _constants.General.PERMISSIONS_TEAM_ADMIN && isAdmin || config.RestrictPostDelete === _constants.General.PERMISSIONS_SYSTEM_ADMIN && isSystemAdmin;
    }
    return isOwner || isAdmin;
}

function canEditPost(config, license, userId, post, editDisableAction) {
    var isOwner = isPostOwner(userId, post);
    var canEdit = isOwner && !isSystemMessage(post);

    if (canEdit && license.IsLicensed === 'true') {
        if (config.AllowEditPost === _constants.General.ALLOW_EDIT_POST_NEVER) {
            canEdit = false;
        } else if (config.AllowEditPost === _constants.General.ALLOW_EDIT_POST_TIME_LIMIT) {
            var timeLeft = post.create_at + config.PostEditTimeLimit * 1000 - Date.now();
            if (timeLeft > 0) {
                editDisableAction.fireAfter(timeLeft + 1000);
            } else {
                canEdit = false;
            }
        }
    }
    return canEdit;
}

function getLastCreateAt(postsArray) {
    var createAt = postsArray.map(function (p) {
        return p.create_at;
    });

    if (createAt.length) {
        return Reflect.apply(Math.max, null, createAt);
    }

    return 0;
}

var joinLeavePostTypes = [_constants.Posts.POST_TYPES.JOIN_LEAVE, _constants.Posts.POST_TYPES.JOIN_CHANNEL, _constants.Posts.POST_TYPES.LEAVE_CHANNEL, _constants.Posts.POST_TYPES.ADD_REMOVE, _constants.Posts.POST_TYPES.ADD_TO_CHANNEL, _constants.Posts.POST_TYPES.REMOVE_FROM_CHANNEL, _constants.Posts.POST_TYPES.JOIN_TEAM, _constants.Posts.POST_TYPES.LEAVE_TEAM, _constants.Posts.POST_TYPES.ADD_TO_TEAM, _constants.Posts.POST_TYPES.REMOVE_FROM_TEAM];

// Returns true if a post should be hidden when the user has Show Join/Leave Messages disabled
function shouldFilterJoinLeavePost(post, showJoinLeave, currentUsername) {
    if (showJoinLeave) {
        return false;
    }

    // Don't filter out non-join/leave messages
    if (joinLeavePostTypes.indexOf(post.type) === -1) {
        return false;
    }

    // Don't filter out join/leave messages about the current user
    if (post.props) {
        if (post.props.username === currentUsername || post.props.addedUsername === currentUsername || post.props.removedUsername === currentUsername) {
            return false;
        }
    }

    return true;
}

function isPostPendingOrFailed(post) {
    return post.failed || post.id === post.pending_post_id;
}

function comparePosts(a, b) {
    var aIsPendingOrFailed = isPostPendingOrFailed(a);
    var bIsPendingOrFailed = isPostPendingOrFailed(b);
    if (aIsPendingOrFailed && !bIsPendingOrFailed) {
        return -1;
    } else if (!aIsPendingOrFailed && bIsPendingOrFailed) {
        return 1;
    }

    if (a.create_at > b.create_at) {
        return -1;
    } else if (a.create_at < b.create_at) {
        return 1;
    }

    return 0;
}