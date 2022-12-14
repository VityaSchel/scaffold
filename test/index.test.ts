import fs from 'fs/promises'
import scaffold from '../out/index'
import path from 'path'
import { exec } from 'child_process'

const simpleProgram = `export function sum(a: number, b: number): number {
  return a + b
}
`

const simpleTest = `import { sum } from '../src/index'

describe('Testing math', () => {
  test('2+2=4', () => {
    const result: number = sum(2, 2)
    expect(result).toBe(4)
  })
})
`

let dirPath = ''
describe('Testing CLI', () => {
  test('Scaffolds a project', async () => {
    dirPath = await scaffold('test_testproject')
    expect(dirPath).toBe(path.resolve(process.cwd(), './test_testproject') + '/')
  }, 600000)
  // dirPath = path.resolve(process.cwd(), './test_testproject') + '/'

  test('Simple test', async () => {
    if(dirPath === '') throw 'Incorrect dirpath!'
    
    fs.writeFile(dirPath + 'src/index.ts', simpleProgram, 'utf-8')
    fs.writeFile(dirPath + 'test/index.test.ts', simpleTest, 'utf-8')

    const testingProcess = exec('npm test', { cwd: dirPath })
    testingProcess.stderr?.on('data', err => console.log(err.toString()))
    testingProcess.stdout?.on('data', msg => console.log(msg.toString()))
    await new Promise(resolve => testingProcess.on('exit', resolve))
    expect(testingProcess.exitCode).toBe(0)
  }, 60000)
})
