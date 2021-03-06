const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer')

const generator = require('../utils/generator.js')

const componentPath = path.resolve(process.cwd(), './src/components/')

// process.stdout.write('\x1bc') // clear terminal

console.log(chalk.green.bold('Scaffold a new component'))
console.log(chalk.gray('Component will be created at:'))
console.log(chalk.gray(componentPath))
console.log('')

inquirer
  .prompt([
    {
      name: 'name',
      message: 'Component Name (Must start with a Capital letter): ',
      validate: name => {
        if (!name) {
          return chalk.red('Can not be empty')
        }
        if (!name.match(/^[A-Z]/)) {
          return chalk.red(
            'Must start with a ' +
              chalk.inverse('C') +
              chalk.red('apital letter')
          )
        }
        let newComponentPath = path.resolve(componentPath, name)
        if (fs.existsSync(newComponentPath)) {
          return chalk.red(
            'Component ' +
              chalk.bold(name) +
              ' already exists (' +
              newComponentPath +
              ')'
          )
        }
        return true
      }
    },
    {
      name: 'state',
      type: 'confirm',
      default: false,
      message: 'Should component have local state?'
    },
    {
      name: 'redux',
      type: 'confirm',
      default: true,
      message: 'Bundle component with Redux?'
    },
    {
      name: 'tests',
      type: 'confirm',
      default: true,
      message: 'Create test file for component?'
    }
  ])
  .then(args => generator(args, componentPath))
  .then(args => {
    console.log(
      chalk.green(
        chalk.bold('Finished!'),
        'Component',
        chalk.bold.yellow(args.name),
        'scaffolded successfully'
      )
    )
    console.log(
      chalk.red('------ REMEMBER TO IMPORT COMPONENT IN COMPONENTS.JS ------')
    )
  })
  .catch(err => {
    console.log(chalk.red('Error'), err)
  })
