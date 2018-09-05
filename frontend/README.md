# C7S React Boilerplate

## Prerequisites

-   Yarn v1.9.4
-   Node v8.11.1 (with npm v5.6.0)
-   Latest WebStorm or Visual Studio Code

## Yarn scripts

### Package management

-   `yarn i`: shortcut for `yarn install --frozen-lockfile`;
-   `yarn a`: shortcut for `yarn add -T -D`;
-   `yarn r`: shortcut for `yarn remove`.

### Development

-   `yarn start`: start dev server and open browser

### Build

-   `yarn build`: build frontend to `dist/`

### Prettier

-   `prettier:all`: reformat all possible files with prettier

### Git hooks (debug only)

-   `yarn preparecommitmsg`: add task prefix to commit message, if necessary
-   `yarn commitmsg`: validate commit message
-   `yarn precommit`: linters, ts compiler errors, prettier, yarn.lock integrity check
-   `yarn postcommit`: hack to update repository in IDE
