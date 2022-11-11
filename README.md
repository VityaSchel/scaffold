# Scaffold

NPX tool for me to easily scaffold new project, containing TypeScript config for modern ES, eslint with my favorite code style and Jest tests with TS support.

Moreover, this tool was scaffolded with itself! It tests itself automatically with Jest after each build by creating simple test project and testing Jest with Jest's test.

This project is mostly for demonstrating which defaults I use, it is not intended to be used by anyone, simply because everyone has it's own preferences, so don't judge me for using X here. Though I'm still accepting any criticism that may help me improve this setup to work faster and better :)

**Size of generated project is just 142 MB with all dependencies**

I think there is a better alternatives to some things I use here, so suggest me alternative tools in the Issues tab if you know:
- Append .js extension to imports during build
  - Currently is done using external `@zoltu/typescript-transformer-append-js-extension` plugin with `ttypescript`
- Build replacing process
  - Currently ./out dir is removed via external `del-cli` package and then files are copied via `cpy-cli` which may pose threat with security vulnerabilities. Maybe change to native commands such as `rm` and `cp`?
- Add support for Yarn when installing dependencies

## Tool usage

```
npx sf project-name
```

or

```
git clone https://github.com/VityaSchel/scaffold && cd scaffold && npm i && npm run set && sf project-name
```

## Generated project usage

### Project structure

```
.
├── src
│   ├── .env.ts
│   └── index.ts
├── out
├── test
│   └── index.test.ts
├── .env
├── babel.config.cjs
├── jest.config.js
├── tsconfig.json
├── LICENSE.md
├── package.json
└── package-lock.json
```

### Scripts

Build: `npm run build`
Run: `npm start` or `node out/index.js`
Test (with TypeScript): `npm test`
