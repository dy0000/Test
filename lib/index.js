"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/*
 * @Author: KoTen_Bu
 * @Date: 2021-08-23 15:39:29
 * @LastEditTime: 2021-08-27 14:41:33
 * @LastEditors: KoTen_Bu
 * @Description:
 * @FilePath: \cli\src\index.ts
 */
require('module-alias/register');
var inquirer_1 = __importDefault(require("@/inquirer"));
// inquirer('add')
// inquirer('create')
inquirer_1["default"]('delete');
