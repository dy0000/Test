/*
 * @Author: KoTen_Bu
 * @Date: 2021-08-23 19:43:46
 * @LastEditTime: 2021-08-27 11:38:02
 * @LastEditors: KoTen_Bu
 * @Description: 
 * @FilePath: \cli\src\template\download.ts
 */
import { Clone } from 'nodegit'
import { getCwdPath, loggerTiming, loggerError } from '@/util'
const fse = require('fs-extra');

export default (url: string | undefined, name: string) => {
  if(!url)return loggerError('请输入git地址')
  loggerTiming(`git下载：${url}`, true)
  Clone.clone(url, name).then(() => {
    loggerTiming(`git下载`, false)
    try {
      fse.removeSync(getCwdPath(name + '/.git'));
    } catch (err) {
      loggerError(err)
    }
  }).catch((err) => {
    loggerError(err)
  })
}
