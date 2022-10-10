/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable no-else-return */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-template */
const moment = require('moment');

module.exports = {
    formatDate: function (date, format) {
        return moment(date).utc().format(format);
    },
    truncate: function (str, len) {
        if (str.length > len && str.length > 0) {
            let newStr = str + ' ';
            newStr = str.substr(0, len);
            newStr = str.substr(0, newStr.lastIndexOf(' '));
            newStr = newStr.length > 0 ? newStr : str.substr(0, len);
            return newStr + '...';
        }
        return str;
    },
    stripTags: function (input) {
        return input.replace(/<(?:.|\n)*?>/gm, '');
    },
    editIcon: function (postUser, loggedUser, postId, floating = true) {
        if (postUser._id.toString() === loggedUser._id.toString()) {
            if (floating) {
                return `<a href="/posts/edit/${postId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`;
            } else {
                return `<a href="/posts/edit/${postId}"><i class="fas fa-edit"></i></a>`;
            }
        } else {
            return '';
        }
    },
    select: function (selected, options) {
        return options
            .fn(this)
            .replace(
                new RegExp(' value="' + selected + '"'),
                '$& selected="selected"',
            )
            .replace(
                new RegExp('>' + selected + '</option>'),
                ' selected="selected"$&',
            );
    },
};
