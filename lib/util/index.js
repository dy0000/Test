"use strict";
/*
 * @Author: KoTen_Bu
 * @Date: 2021-08-23 15:41:36
 * @LastEditTime: 2021-08-27 10:53:16
 * @LastEditors: KoTen_Bu
 * @Description:
 * @FilePath: \cli\src\util\index.ts
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.loggerError = exports.loggerSuccess = exports.loggerWarring = exports.loggerInfo = exports.loggerTiming = exports.getCwdPath = exports.templatePath = exports.getDirPath = void 0;
var path_1 = require("path");
var chalk_1 = __importDefault(require("chalk"));
// 项目本地路径
var getDirPath = function (relPath) {
    return path_1.resolve(__dirname, '../../', relPath);
};
exports.getDirPath = getDirPath;
// 模板位置
exports.templatePath = exports.getDirPath('./template');
// 获取运行路径
var getCwdPath = function (relPath) {
    return path_1.resolve(process.cwd(), relPath);
};
exports.getCwdPath = getCwdPath;
// 计时日志
var loggerTiming = function (str, start) {
    if (start) {
        console.time('Timing');
        console.log(chalk_1["default"].cyan("****** " + str + " START ******"));
    }
    else {
        console.log(chalk_1["default"].cyan("****** " + str + " END ******"));
        console.timeEnd('Timing');
    }
};
exports.loggerTiming = loggerTiming;
// 普通日志
var loggerInfo = function (str) {
    console.log(chalk_1["default"].green("[INFO]\uFF1A " + str));
};
exports.loggerInfo = loggerInfo;
// 警告日志
var loggerWarring = function (str) {
    console.log(chalk_1["default"].yellowBright("[WARRING]\uFF1A " + str));
};
exports.loggerWarring = loggerWarring;
// 成功日志
var loggerSuccess = function (str) {
    console.log(chalk_1["default"].greenBright("[SUCCESS]\uFF1A " + str));
};
exports.loggerSuccess = loggerSuccess;
// 报错日志
var loggerError = function (str) {
    console.log(chalk_1["default"].redBright("[ERROR]\uFF1A " + str));
};
exports.loggerError = loggerError;
