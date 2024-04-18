#! /usr/bin/env node
import prompts from 'prompts'
import packageNameRegex from 'package-name-regex'
import scaffold from './index.js'

let projectName = process.argv[2]
let addTests = process.argv[3] === '--tests' || process.argv[3] === '--add-tests'

if(!projectName) {
  const values = await prompts([
    { 
      type: 'text', 
      name: 'value', 
      message: 'Название будушего шедевра', 
      validate: value => !packageNameRegex.test(value) ? 'Невалидное название' : true 
    },
    {
      type: 'select', 
      name: 'tests', 
      message: 'Добавить тесты',
    },
  ])
  projectName = values.value
  addTests = values.tests
}

await scaffold(projectName, addTests)
