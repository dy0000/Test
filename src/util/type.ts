/*
 * @Author: KoTen_Bu
 * @Date: 2021-08-27 10:49:24
 * @LastEditTime: 2021-08-27 11:48:12
 * @LastEditors: KoTen_Bu
 * @Description: 
 * @FilePath: \cli\src\util\type.ts
 */
export {
  PromptOptions
}
type PromptOptions = { name: string; tplName: string; tplAllowTs?: string; localPath?: string; gitPath?: string; type?: string }