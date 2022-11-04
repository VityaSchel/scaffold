#! /usr/bin/env node
import { init } from './checks'
import fs from 'fs/promises'
import * as packageJsonDefaults from './template/package-json'
import gitignoreLines from './template/gitignore'
import eslintConfig from './template/eslint-cjs'
import licenseMarkdownText from './template/LICENSE-md'
import vscodeSettingsConfig from './template/vscode-settings-json'
import tsconfigJson from './template/tsconfig-json'
import jestConfig from './template/jest-config-js'

const projectName = process.argv[2]
const dirPath = await init(projectName)

const packageJSON = {
  name: projectName,
  version: '1.0.0',
  description: '',
  main: 'out/index.js',
  type: 'module',
  scripts: packageJsonDefaults.scripts,
  author: packageJsonDefaults.author,
  license: 'MIT',
  dependencies: {},
  devDependencies: packageJsonDefaults.devDependencies
}
await fs.writeFile(dirPath + 'package.json', JSON.stringify(packageJSON, null, 2), 'utf-8')

await fs.mkdir(dirPath + 'src')
await fs.mkdir(dirPath + 'out')

await fs.writeFile(dirPath + 'src/index.ts', '', 'utf-8')
await fs.writeFile(dirPath + '.gitignore', gitignoreLines.join('\n'), 'utf-8')
await fs.writeFile(dirPath + '.eslint.cjs', eslintConfig, 'utf-8')
await fs.writeFile(dirPath + 'LICENSE.md', licenseMarkdownText, 'utf-8')
await fs.writeFile(dirPath + 'tsconfig.json', JSON.stringify(tsconfigJson, null, 2), 'utf-8')
await fs.writeFile(dirPath + 'jest.config.js', jestConfig, 'utf-8')

await fs.mkdir(dirPath + '.vscode')
await fs.writeFile(dirPath + '.vscode/settings.json', JSON.stringify(vscodeSettingsConfig, null, 2), 'utf-8')

await fs.mkdir(dirPath + 'test')
await fs.writeFile(dirPath + 'test/index.test.ts', '', 'utf-8')