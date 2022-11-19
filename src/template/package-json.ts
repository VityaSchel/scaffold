/* eslint-disable quotes */

export const scripts = {
  "prebuild": "del out/",
  "build": "swc ./src -d ./out --copy-files",
  "start": "node out/index.js",
  "test": "jest"
}

export const dependencies = {
  "dotenv": "^16.0.0"
}

export const devDependencies = {
  "del-cli": "^4.0.1",
  "esbuild": "^0.15.14",
  "eslint": "^8.8.0",
  "typescript": "^4.8.3",
  "@types/node": "^18.7.18",
  "@typescript-eslint/eslint-plugin": "^5.38.0",
  "@typescript-eslint/parser": "^5.38.0",
  "@types/jest": "^29.2.0",
  "ts-jest": "^29.0.3",
  "babel-jest": "^29.2.2",
  "@babel/preset-env": "^7.19.4",
  "@babel/preset-typescript": "^7.18.6",
}

export const author = 'Viktor Shchelochkov <hi@hloth.dev> (https://hloth.dev/)'
