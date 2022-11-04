/* eslint-disable quotes */

export const scripts = {
  "prebuild": "del out/",
  "build": "ttsc",
  "postbuild": "cpy '**/*' '!**/*.ts' '../out' --cwd=src --no-overwrite --parents",
  "start": "node out/index.js",
  "test": "jest"
}

export const devDependencies = {
  "cpy-cli": "^3.1.1",
  "del-cli": "^4.0.1",
  "eslint": "^8.8.0",
  "ttypescript": "^1.5.13",
  "typescript": "^4.8.3",
  "@types/node": "^18.7.18",
  "@typescript-eslint/eslint-plugin": "^5.38.0",
  "@typescript-eslint/parser": "^5.38.0",
  "@types/jest": "^29.2.0",
  "@zoltu/typescript-transformer-append-js-extension": "^1.0.1",
  "ts-jest": "^29.0.3",
}

export const author = 'Viktor Shchelochkov <hi@hloth.dev> (https://hloth.dev/)'