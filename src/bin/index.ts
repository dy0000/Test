#! node
/*
 * @Author: KoTen_Bu
 * @Date: 2021-08-23 15:50:02
 * @LastEditTime: 2021-08-27 14:16:51
 * @LastEditors: KoTen_Bu
 * @Description: 
 * @FilePath: \cli\src\bin\index.ts
 */
require('module-alias/register')
import { Command } from 'commander';
import inquirer from '@/inquirer'

const program = new Command();

/**
 * @description: 创建相应模板
 * @param {*}
 * @return {*}
 */
 program
 .version('0.1.0')
 .description('create template')
 .command('create template')
 .action(() => {
   inquirer('create')
 })

 program
 .version('0.1.0')
 .description('add template')
 .command('add template')
 .action(() => {
   inquirer('add')
 })

 program
 .version('0.1.0')
 .description('delete template')
 .command('delete template')
 .action(() => {
   inquirer('delete')
 })

program.parse(process.argv);