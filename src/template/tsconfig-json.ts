/* eslint-disable quotes */
export default {
  "compilerOptions": {
    "module": "es2022",
    "target": "es2022",
    "lib": [
      "es2022",
    ],
    "moduleResolution": "node",
    "outDir": "out",
    "plugins": [
      {
        "transform": "@zoltu/typescript-transformer-append-js-extension/output/index.js",
        "after": true,
      }
    ],
    "skipLibCheck": true,
    "esModuleInterop": true,
    "strict": true,
    "noImplicitAny": false,
    "useUnknownInCatchVariables": false
  },
  "include": [
    "src/**/*.ts"
  ],
  "exclude": [
    "node_modules",
    "test",
    "out"
  ],
}
