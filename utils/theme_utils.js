'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.makeStyleFromTheme = makeStyleFromTheme;
exports.changeOpacity = changeOpacity;
// Copyright (c) 2017-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

function makeStyleFromTheme(getStyleFromTheme) {
    var lastTheme = null;
    var style = null;

    return function (theme) {
        if (theme !== lastTheme) {
            style = getStyleFromTheme(theme);
            lastTheme = theme;
        }

        return style;
    };
}

function changeOpacity(oldColor, opacity) {
    var color = oldColor;
    if (color.length && color[0] === '#') {
        color = color.slice(1);
    }

    if (color.length === 3) {
        var tempColor = color;
        color = '';

        color += tempColor[0] + tempColor[0];
        color += tempColor[1] + tempColor[1];
        color += tempColor[2] + tempColor[2];
    }

    var r = parseInt(color.substring(0, 2), 16);
    var g = parseInt(color.substring(2, 4), 16);
    var b = parseInt(color.substring(4, 6), 16);

    return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
}