"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Copyright (c) 2017-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

var DelayedAction = function () {
    function DelayedAction(action) {
        _classCallCheck(this, DelayedAction);

        this.action = action;

        this.timer = -1;

        // bind fire since it doesn't get passed the correct this value with setTimeout
        this.fire = this.fire.bind(this);
    }

    _createClass(DelayedAction, [{
        key: "fire",
        value: function fire() {
            this.action();

            this.timer = -1;
        }
    }, {
        key: "fireAfter",
        value: function fireAfter(timeout) {
            if (this.timer >= 0) {
                clearTimeout(this.timer);
            }

            this.timer = setTimeout(this.fire, timeout);
        }
    }, {
        key: "cancel",
        value: function cancel() {
            clearTimeout(this.timer);
        }
    }]);

    return DelayedAction;
}();

exports.default = DelayedAction;