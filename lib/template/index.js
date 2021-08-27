"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.deleteTpl = exports.addTpl = exports.createTpl = void 0;
/*
 * @Author: KoTen_Bu
 * @Date: 2021-08-23 15:47:41
 * @LastEditTime: 2021-08-27 15:08:32
 * @LastEditors: KoTen_Bu
 * @Description:
 * @FilePath: \cli\src\template\index.ts
 */
var util_1 = require("@/util");
var download_1 = __importDefault(require("./download"));
var fse = require('fs-extra');
var createTpl = function (options) {
    if (options.type == 'git') {
        download_1["default"](options.gitPath, options.name);
    }
    else {
        var templatePath = util_1.getDirPath("./template/" + options.tplName);
        util_1.loggerTiming('复制模板开始', true);
        fse.copy(templatePath, util_1.getCwdPath(options.name), function (err) {
            err && util_1.loggerError(err);
            util_1.loggerTiming('复制模板完成', false);
        });
    }
};
exports.createTpl = createTpl;
var addTpl = function (options) {
    if (options.type == 'git') {
        var gitTplJson_1 = util_1.getDirPath("./git.json");
        fse.readJSON(gitTplJson_1).then(function (res) {
            if (res === void 0) { res = []; }
            res.push({ name: options.tplName, path: options.gitPath });
            fse.writeJson(gitTplJson_1, res).then(function () {
                util_1.loggerInfo('添加成功');
            })["catch"](function (err) {
                util_1.loggerError(err);
            });
        })["catch"](function (err) {
            util_1.loggerError(err);
        });
    }
    else {
        var templatePath = util_1.getDirPath("./template/" + options.tplName);
        util_1.loggerTiming("'\u6DFB\u52A0\u6A21\u677F:'" + options.localPath, true);
        fse.copy(options.localPath, templatePath, function (err) {
            err && util_1.loggerError(err);
            util_1.loggerTiming('添加模板', false);
        });
    }
};
exports.addTpl = addTpl;
var deleteTpl = function (options) {
    if (options.type == 'git') {
        var gitTplJson_2 = util_1.getDirPath("./git.json");
        fse.readJSON(gitTplJson_2).then(function (res) {
            if (res === void 0) { res = []; }
            var index = res.findIndex(function (item) { return item.name == options.tplName; });
            res.splice(index, 1);
            fse.writeJson(gitTplJson_2, res).then(function () {
                util_1.loggerInfo('删除成功');
            })["catch"](function (err) {
                util_1.loggerError(err);
            });
        })["catch"](function (err) {
            util_1.loggerError(err);
        });
    }
    else {
        var templatePath = util_1.getDirPath("./template/" + options.tplName);
        util_1.loggerTiming("'\u5220\u9664\u6A21\u677F:'" + options.tplName, true);
        fse.remove(templatePath, function (err) {
            err && util_1.loggerError(err);
            util_1.loggerTiming('删除模板', false);
        });
    }
};
exports.deleteTpl = deleteTpl;
