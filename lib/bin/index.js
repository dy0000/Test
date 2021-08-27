#! node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/*
 * @Author: KoTen_Bu
 * @Date: 2021-08-23 15:50:02
 * @LastEditTime: 2021-08-27 14:16:51
 * @LastEditors: KoTen_Bu
 * @Description:
 * @FilePath: \cli\src\bin\index.ts
 */
require('module-alias/register');
var commander_1 = require("commander");
var inquirer_1 = __importDefault(require("@/inquirer"));
var program = new commander_1.Command();
/**
 * @description: 创建相应模板
 * @param {*}
 * @return {*}
 */
program
    .version('0.1.0')
    .description('create template')
    .command('create template')
    .action(function () {
    inquirer_1["default"]('create');
});
program
    .version('0.1.0')
    .description('add template')
    .command('add template')
    .action(function () {
    inquirer_1["default"]('add');
});
program
    .version('0.1.0')
    .description('delete template')
    .command('delete template')
    .action(function () {
    inquirer_1["default"]('delete');
});
program.parse(process.argv);
