/*
 * @Author: KoTen_Bu
 * @Date: 2021-08-23 15:55:32
 * @LastEditTime: 2021-08-24 20:24:36
 * @LastEditors: KoTen_Bu
 * @Description: 
 * @FilePath: \cli\src\util\file.ts
 */

const fs = require('fs');
import { loggerError, loggerSuccess } from './index'

export const loadFile = (path: any) => {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const config = JSON.parse(data);
    return config
  } catch (err) {
    loggerError(`Error reading file from disk: ${err}`);
  }
}

export const existsFile = (path: any) => {
  return new Promise((resolve, reject) => {
    fs.exists(path, (exists: any) => {
      if (exists) resolve(true)
      reject(false)
    })
  })
}

/**
 * @description: 写入文件
 * @param {string} path
 * @param {string} fileName
 * @param {string} file
 * @return {*}
 */
export const writeFile = (path: string, fileName: string, file: string): any => {
  try {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
    fs.writeFile(`${path}/${fileName}`, file, (error: any) => {
      if (error) {
        console.log(error)
        loggerError('Write file failed!')
      } else {
        loggerSuccess('Write file successful!')
      }
    })
  } catch (err) {
    loggerError(`Error reading file from disk: ${err}`);
  }
}
