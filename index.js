#!/usr/bin/env node
'use strict'

const program = require('commander')
const pkg = require('./package.json')

program
  .version(pkg.version)
  .command('build')
  .description('make components')
  .action(() => {
    require('./commands/scaffold')
  })

program
  .version(pkg.version)
  .command('init')
  .description('initialize scaffold project')
  .action(() => {
    require('./commands/init')
  })

program.parse(process.argv)
