"use strict";
/*
 * @Author: KoTen_Bu
 * @Date: 2021-08-23 15:55:32
 * @LastEditTime: 2021-08-24 20:24:36
 * @LastEditors: KoTen_Bu
 * @Description:
 * @FilePath: \cli\src\util\file.ts
 */
exports.__esModule = true;
exports.writeFile = exports.existsFile = exports.loadFile = void 0;
var fs = require('fs');
var index_1 = require("./index");
var loadFile = function (path) {
    try {
        var data = fs.readFileSync(path, 'utf8');
        var config = JSON.parse(data);
        return config;
    }
    catch (err) {
        index_1.loggerError("Error reading file from disk: " + err);
    }
};
exports.loadFile = loadFile;
var existsFile = function (path) {
    return new Promise(function (resolve, reject) {
        fs.exists(path, function (exists) {
            if (exists)
                resolve(true);
            reject(false);
        });
    });
};
exports.existsFile = existsFile;
/**
 * @description: 写入文件
 * @param {string} path
 * @param {string} fileName
 * @param {string} file
 * @return {*}
 */
var writeFile = function (path, fileName, file) {
    try {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
        fs.writeFile(path + "/" + fileName, file, function (error) {
            if (error) {
                console.log(error);
                index_1.loggerError('Write file failed!');
            }
            else {
                index_1.loggerSuccess('Write file successful!');
            }
        });
    }
    catch (err) {
        index_1.loggerError("Error reading file from disk: " + err);
    }
};
exports.writeFile = writeFile;
