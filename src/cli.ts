#! /usr/bin/env node
import prompts from 'prompts'
import packageNameRegex from 'package-name-regex'
import scaffold from './index'

const projectName = process.argv[2] ?? (
  await prompts({ 
    type: 'text', 
    name: 'value', 
    message: 'Название будушего шедевра', 
    validate: value => !packageNameRegex.test(value) ? 'Невалидное название' : true 
  })).value

await scaffold(projectName)