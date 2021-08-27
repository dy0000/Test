"use strict";
/*
 * @Author: KoTen_Bu
 * @Date: 2021-08-03 23:41:18
 * @LastEditors: KoTen_Bu
 * @LastEditTime: 2021-08-27 17:00:34
 * @Description:
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var inquirer_1 = __importDefault(require("inquirer"));
var util_1 = require("@/util");
var template_1 = require("@/template");
var fse = require('fs-extra');
var modulePrompt = [
    {
        type: 'list',
        message: '请选择读取模板方式:',
        name: 'type',
        choices: ['git', 'local']
    }
];
var promptList = [
    {
        type: 'input',
        message: '请输入项目名称',
        name: 'name',
        "default": 'project-now'
    },
];
function createInquirer(type) {
    if (type === void 0) { type = 'git'; }
    return __awaiter(this, void 0, void 0, function () {
        var tplList, gitTplJson, gitList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tplList = [];
                    gitTplJson = util_1.getDirPath("./git.json");
                    return [4 /*yield*/, fse.readJson(gitTplJson)];
                case 1:
                    gitList = _a.sent();
                    if (!(type == 'git')) return [3 /*break*/, 2];
                    tplList = gitList.map(function (item) { return item.name; });
                    return [3 /*break*/, 5];
                case 2: return [4 /*yield*/, fse.ensureDir(util_1.templatePath)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, fse.readdir(util_1.templatePath)];
                case 4:
                    tplList = _a.sent();
                    _a.label = 5;
                case 5:
                    if (tplList.length == 0) {
                        return [2 /*return*/, util_1.loggerError('请先添加模板')];
                    }
                    promptList.push({
                        type: 'list',
                        message: '请选择模板:',
                        name: 'tplName',
                        choices: tplList
                    });
                    inquirer_1["default"].prompt(promptList).then(function (answers) {
                        var gitValue = gitList.find(function (item) { return item.name == answers.tplName; }) || {};
                        template_1.createTpl(__assign(__assign({}, answers), { type: type, gitPath: gitValue.path }));
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function deleteInquirer(type) {
    if (type === void 0) { type = 'git'; }
    return __awaiter(this, void 0, void 0, function () {
        var tplList, gitTplJson, gitList, prop;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tplList = [];
                    gitTplJson = util_1.getDirPath("./git.json");
                    return [4 /*yield*/, fse.readJson(gitTplJson)];
                case 1:
                    gitList = _a.sent();
                    if (!(type == 'git')) return [3 /*break*/, 2];
                    tplList = gitList.map(function (item) { return item.name; });
                    if (tplList.length == 0) {
                        return [2 /*return*/, util_1.loggerError('暂无git模板')];
                    }
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, fse.readdir(util_1.templatePath)];
                case 3:
                    tplList = _a.sent();
                    _a.label = 4;
                case 4:
                    prop = [
                        {
                            type: 'list',
                            message: '请选择需要删除的模板:',
                            name: 'tplName',
                            choices: tplList
                        }
                    ];
                    inquirer_1["default"].prompt(prop).then(function (answers) {
                        template_1.deleteTpl(__assign(__assign({}, answers), { type: type }));
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function addInquirer(type) {
    if (type === void 0) { type = 'git'; }
    var prop = [
        {
            type: 'input',
            message: '请输入模板名称',
            name: 'tplName',
            "default": 'tpl'
        }
    ];
    if (type == 'git') {
        prop.push({
            type: 'input',
            message: '请输入git地址',
            name: 'gitPath',
            "default": ''
        });
    }
    else {
        prop.push({
            type: 'input',
            message: '请输入模板项目路径',
            name: 'localPath',
            "default": util_1.getCwdPath('')
        });
    }
    inquirer_1["default"].prompt(prop).then(function (answers) {
        template_1.addTpl(__assign(__assign({}, answers), { type: type }));
    });
}
exports["default"] = (function (type) {
    inquirer_1["default"].prompt(modulePrompt).then(function (answers) {
        switch (type) {
            case 'create':
                createInquirer(answers.type);
                break;
            case 'add':
                addInquirer(answers.type);
                break;
            case 'delete':
                deleteInquirer(answers.type);
                break;
            default:
                break;
        }
    });
});
