'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Client4 = exports.Client = undefined;

var _client = require('./client.js');

var _client2 = _interopRequireDefault(_client);

var _client3 = require('./client4.js');

var _client4 = _interopRequireDefault(_client3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright (c) 2017-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

var Client = new _client2.default();
var Client4 = new _client4.default();

exports.Client = Client;
exports.Client4 = Client4;