/*
 * @Author: KoTen_Bu
 * @Date: 2021-08-23 15:47:41
 * @LastEditTime: 2021-08-27 15:08:32
 * @LastEditors: KoTen_Bu
 * @Description: 
 * @FilePath: \cli\src\template\index.ts
 */
import { getCwdPath, loggerTiming, getDirPath, loggerError, loggerInfo } from '@/util'
import { PromptOptions } from '@/util/type';
import downLoadGit from './download'
const fse = require('fs-extra');

export const createTpl = (options: PromptOptions) => {
  if (options.type == 'git') {
    downLoadGit(options.gitPath, options.name)
  } else {
    const templatePath = getDirPath(`./template/${options.tplName}`)
    loggerTiming('复制模板开始', true)
    fse.copy(templatePath, getCwdPath(options.name), (err: any) => {
      err && loggerError(err)
      loggerTiming('复制模板完成', false)
    })
  }
}

export const addTpl = (options: PromptOptions) => {
  if(options.type == 'git'){
    const gitTplJson = getDirPath(`./git.json`)
    fse.readJSON(gitTplJson).then((res:any = [])=>{
      res.push({name:options.tplName,path:options.gitPath})
      fse.writeJson(gitTplJson,res).then(()=>{
        loggerInfo('添加成功')
      }).catch((err:any)=>{
        loggerError(err)
      })
    }).catch((err:any)=>{
      loggerError(err)
    })
  }else{
    const templatePath = getDirPath(`./template/${options.tplName}`)
    loggerTiming(`'添加模板:'${options.localPath}`, true)
    fse.copy(options.localPath, templatePath, (err: any) => {
      err && loggerError(err)
      loggerTiming('添加模板', false)
    })
  }
}

export const deleteTpl = (options: PromptOptions) => {
  if(options.type == 'git'){
    const gitTplJson = getDirPath(`./git.json`)
    fse.readJSON(gitTplJson).then((res:any = [])=>{
      let index = res.findIndex((item:any)=>item.name == options.tplName)
      res.splice(index,1)
      fse.writeJson(gitTplJson,res).then(()=>{
        loggerInfo('删除成功')
      }).catch((err:any)=>{
        loggerError(err)
      })
    }).catch((err:any)=>{
      loggerError(err)
    })
  }else{
    const templatePath = getDirPath(`./template/${options.tplName}`)
    loggerTiming(`'删除模板:'${options.tplName}`, true)
    fse.remove(templatePath, (err: any) => {
      err && loggerError(err)
      loggerTiming('删除模板', false)
    })
  }
}

