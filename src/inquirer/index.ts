/*
 * @Author: KoTen_Bu
 * @Date: 2021-08-03 23:41:18
 * @LastEditors: KoTen_Bu
 * @LastEditTime: 2021-08-27 17:00:34
 * @Description:
 */

import inquirer from 'inquirer';
import { templatePath , getCwdPath,getDirPath, loggerError } from '@/util'
import { addTpl,createTpl,deleteTpl } from '@/template';
const fse = require('fs-extra');

const modulePrompt = [
  {
    type: 'list',
    message: '请选择读取模板方式:',
    name: 'type',
    choices: ['git','local']
  }
]

const promptList:any = [
  {
    type: 'input',
    message: '请输入项目名称',
    name: 'name',
    default: 'project-now'
  },
];

async function createInquirer(type = 'git') {
  let tplList:any = []
  const gitTplJson = getDirPath(`./git.json`)
  const gitList = await fse.readJson(gitTplJson)
  if(type == 'git'){
    tplList = gitList.map((item:any)=>item.name)
  }else{
    await fse.ensureDir(templatePath)
    tplList = await fse.readdir(templatePath)
  }
  if(tplList.length == 0){
    return loggerError('请先添加模板')
  }
  promptList.push({
    type: 'list',
    message: '请选择模板:',
    name: 'tplName',
    choices: tplList
  })
  inquirer.prompt(promptList).then((answers:any) => {
    let gitValue = gitList.find((item:any)=>item.name == answers.tplName) || {}
    createTpl({...answers,type,gitPath:gitValue.path})
  })
}

async function deleteInquirer(type = 'git') {
  let tplList = []
  const gitTplJson = getDirPath(`./git.json`)
  const gitList = await fse.readJson(gitTplJson)
  if(type == 'git'){
    tplList = gitList.map((item:any)=>item.name)
    if(tplList.length == 0){
      return loggerError('暂无git模板')
    }
  }else{
    tplList = await fse.readdir(templatePath)
  }
  let prop = [
    {
      type: 'list',
      message: '请选择需要删除的模板:',
      name: 'tplName',
      choices: tplList
    }
  ]
  inquirer.prompt(prop).then((answers:any) => {
    deleteTpl({...answers,type})
  })
}

function addInquirer(type = 'git') {
  let prop = [
    {
      type: 'input',
      message: '请输入模板名称',
      name: 'tplName',
      default: 'tpl'
    }
  ]
  if(type == 'git'){
    prop.push({
      type: 'input',
      message: '请输入git地址',
      name: 'gitPath',
      default:''
    })
  }else{
    prop.push({
      type: 'input',
      message: '请输入模板项目路径',
      name: 'localPath',
      default:getCwdPath('')
    })
  }
  inquirer.prompt(prop).then((answers:any) => {
    addTpl({...answers,type})
  })
}

export default (type:string) => {
  inquirer.prompt(modulePrompt).then((answers:any) => {
    switch (type) {
      case 'create':
        createInquirer(answers.type)
        break;
      case 'add':
        addInquirer(answers.type)
        break;
      case 'delete':
        deleteInquirer(answers.type)
        break;
      default:
        break;
    }
  })
}