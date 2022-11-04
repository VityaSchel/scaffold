import fs from 'fs/promises'
import chalk from 'chalk'
import packageNameRegex from 'package-name-regex'
import pathlib from 'path'

/**
 * Runs checks, then initializes project directory 
 * @param projectName process.argv[2]
 * @returns Path to created dir with trailing slash
 */
export async function init(projectName: string): Promise<string> {
  if(!projectName) {
    console.error(chalk.red('Укажите название проекта'))
    process.exit(0)
  }

  if(!packageNameRegex.test(projectName)) {
    console.error(chalk.red(projectName, '— это невалидное имя для пакета npm'))
    process.exit(0)
  }

  const cwdName = pathlib.basename(pathlib.resolve(process.cwd()))
  let path = ''
  if(cwdName === projectName) {
    path = './'
  } else {
    path = `./${projectName}/`
  }
  path = pathlib.resolve(process.cwd(), path) + '/'

  let files: string[] = []
  try {
    files = await fs.readdir(path)
  } catch(e) {
    if(e.code !== 'ENOENT') throw e
  }
  if(files.length) {
    console.error(chalk.red('В папке', projectName, 'уже существуют файлы'))
    process.exit(0)
  }

  try {
    await fs.mkdir(projectName)
  } catch(e) {
    console.error(chalk.red('Не удалось создать папку', projectName))
    process.exit(0)
  }

  return path
}