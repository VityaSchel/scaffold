import {isBuiltin} from 'node:module'
import fs from 'fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

// noinspection JSUnusedGlobalSymbols
export const resolve = async (specifier, context, nextResolve) => {
  if(isBuiltin(specifier)) {
    if(!specifier.startsWith('@/') || !specifier.startsWith('../')) {
      return nextResolve(specifier, context)
    }
  }

  if (
    (specifier.startsWith('@') && !specifier.startsWith('@/')) || 
    (specifier.includes('/') && !specifier.startsWith('@/') && !specifier.startsWith('./') && !specifier.startsWith('../'))
    || /^[a-z0-9-]+$/.test(specifier)
  ) {
    return nextResolve(specifier, context)
  }
  
  if(await isDir(specifier, context)) {
    return nextResolve(`${specifier}/index.js`, context)
  } else {
    return nextResolve(/\.c?m?js$/.test(specifier) ? specifier : specifier + '.js', context)
  }
}

const isDir = async (pathString, context) => {
  try {
    const filePath = fileURLToPath(context.parentURL)
    const dbPath = path.resolve(path.dirname(filePath), pathString)
    return (await fs.lstat(dbPath)).isDirectory()
  } catch(e) {
    return false
  }
}