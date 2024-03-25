# ViteRC ❤️‍🔥

## Why

This template arose out of a need to unite all the above libraries, which were not found in the existing Vite templates. This template has an active contributors that will update everything on this template as needed

## Usage

```bash
npx degit potreco/viterc my-app

cd my-app

# Required if you want a repository and work with Git hooks
git init

yarn install

yarn dev
```

## Available commands

<p>In this project, you can run the following scripts:</p>

| Script        | Description                                                                 |
| ------------- | --------------------------------------------------------------------------- |
| yarn dev      | Runs the app in the development mode.                                       |
| yarn build    | Builds the app for production to the `dist` folder.                         |
| yarn preview  | Builds the app for production to the `dist` folder, and run locally server. |
| yarn lint     | Runs the Eslint and show code problems                                      |
| yarn lint:fix | Runs the Eslint and fix the code problems                                   |
| yarn format   | Runs the Prettier and fix code style                                        |
| yarn compile  | Runs the TS Compiling                                                       |
| yarn test     | Run the app tests.                                                          |
| yarn commit   | Open the CZ CLI to create a message to your commit.                         |

## About the absolute imports

To correctly functioning (code and tests) of absolute imports, you should add some codes in some files, like:

- jest.config.js
- vite.config.ts
- tsconfig.json

We already writed some absolute imports on these files, so if you wanna more paths or edit some, feel free to do.
If your not safe about it or have some question, send us a thread on [Github Discussions](https://github.com/potreco/viterc/discussions/new?category=q-a) asking for, we were happy to help

## TODO

- [x] Eslint
- [x] Prettier
- [x] Husky
- [x] Testing Tools
- [x] Absolute imports
- [x] Commit linting

## License

[MIT](https://choosealicense.com/licenses/mit/)
