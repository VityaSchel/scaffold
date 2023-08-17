import { init } from './checks.js'
import fs from 'fs/promises'
import chalk from 'chalk'
import { exec, ExecOptions } from 'child_process'

import * as packageJsonDefaults from './template/package-json.js'
import gitignoreLines from './template/gitignore.js'
import eslintConfig from './template/eslint-cjs.js'
import licenseMarkdownText from './template/LICENSE-md.js'
import vscodeSettingsConfig from './template/vscode-settings-json.js'
import tsconfigJson from './template/tsconfig-json.js'
import jestConfig from './template/jest-config-js.js'
import babelConfig from './template/babel-config-js.js'
import envLoader from './template/env-ts.js'
import swcrc from './template/swcrc.js'

/**
 * Scaffold a project
 * @param projectName Valid npm name for the project
 * @returns Path to the project's dir
 */
export default async function scaffold(projectName: string): Promise<string> {
  const dirPath = await init(projectName)

  console.log(chalk.green('Генерируются файлы...'))

  const packageJSON = {
    name: projectName,
    version: '1.0.0',
    description: '',
    main: 'out/index.js',
    type: 'module',
    scripts: packageJsonDefaults.scripts,
    author: packageJsonDefaults.author,
    license: 'MIT',
    dependencies: packageJsonDefaults.dependencies,
    devDependencies: packageJsonDefaults.devDependencies
  }
  await fs.writeFile(dirPath + 'package.json', JSON.stringify(packageJSON, null, 2), 'utf-8')

  await fs.mkdir(dirPath + 'src')
  await fs.mkdir(dirPath + 'out')
  await fs.mkdir(dirPath + 'types')

  await fs.writeFile(dirPath + 'src/index.ts', 'import \'./env.js\'\n', 'utf-8')
  await fs.writeFile(dirPath + 'src/env.ts', envLoader, 'utf-8')
  await fs.writeFile(dirPath + 'types/fetch.d.ts', '// eslint-disable-next-line no-var\ndeclare var fetch: typeof import(\'undici\').fetch', 'utf-8')
  await fs.writeFile(dirPath + '.env', '', 'utf-8')
  await fs.writeFile(dirPath + '.gitignore', gitignoreLines.join('\n'), 'utf-8')
  await fs.writeFile(dirPath + '.eslintrc.cjs', eslintConfig, 'utf-8')
  await fs.writeFile(dirPath + 'LICENSE.md', licenseMarkdownText, 'utf-8')
  await fs.writeFile(dirPath + 'tsconfig.json', JSON.stringify(tsconfigJson, null, 2), 'utf-8')
  await fs.writeFile(dirPath + 'jest.config.js', jestConfig, 'utf-8')
  await fs.writeFile(dirPath + 'babel.config.cjs', babelConfig, 'utf-8')
  await fs.writeFile(dirPath + '.swcrc', JSON.stringify(swcrc, null, 2), 'utf-8')

  await fs.mkdir(dirPath + '.vscode')
  await fs.writeFile(dirPath + '.vscode/settings.json', JSON.stringify(vscodeSettingsConfig, null, 2), 'utf-8')

  await fs.mkdir(dirPath + 'test')
  await fs.writeFile(dirPath + 'test/index.test.ts', '', 'utf-8')

  console.log(chalk.green('Установка зависимостей...'))

  const runSubProcess = async (command: string, options: ExecOptions) => {
    const process = exec(command, options)
    process.stderr.on('data', err => console.error(err.toString()))
    process.stdout.on('data', msg => console.log(msg.toString()))
    await new Promise(resolve => process.on('exit', resolve))
  }

  await runSubProcess('git init', { cwd: dirPath })
  await runSubProcess('pnpm i', { cwd: dirPath })

  console.log(chalk.green('Готово!'))

  return dirPath
}
