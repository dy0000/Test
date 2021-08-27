"use strict";
exports.__esModule = true;
/*
 * @Author: KoTen_Bu
 * @Date: 2021-08-23 19:43:46
 * @LastEditTime: 2021-08-27 11:38:02
 * @LastEditors: KoTen_Bu
 * @Description:
 * @FilePath: \cli\src\template\download.ts
 */
var nodegit_1 = require("nodegit");
var util_1 = require("@/util");
var fse = require('fs-extra');
exports["default"] = (function (url, name) {
    if (!url)
        return util_1.loggerError('请输入git地址');
    util_1.loggerTiming("git\u4E0B\u8F7D\uFF1A" + url, true);
    nodegit_1.Clone.clone(url, name).then(function () {
        util_1.loggerTiming("git\u4E0B\u8F7D", false);
        try {
            fse.removeSync(util_1.getCwdPath(name + '/.git'));
        }
        catch (err) {
            util_1.loggerError(err);
        }
    })["catch"](function (err) {
        util_1.loggerError(err);
    });
});
