# C7S React Boilerplate

## Prerequisites

-   Yarn v1.9.4
-   Node v8.11.1 (with npm v5.6.0)
-   Latest WebStorm or Visual Studio Code

## Configuration

In order to run the project you need to override [`githubToken`](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/) and `graphqlEndpoint` via `config/local/api.js`:

```
module.exports = {
    githubToken: 'yourPersonalAccessToken',
    graphqlEndpoint: 'https://api.github.com/graphql'
};
```

## Yarn scripts

### Package management

> **NOTE**: It's mandatory to use `yarn i` instead of `yarn` or `yarn install`

-   `yarn i`: install dependencies with frozen lockfile and create necessary symlinks;
-   `yarn a`: shortcut for `yarn add -T -D`;
-   `yarn r`: shortcut for `yarn remove`.

### Development

-   `yarn start`: install dependencies, start apollo types generation watcher, start dev server and open browser.

### Build

-   `yarn build`: build frontend to `dist/`;
-   `yarn build:final`: also delete all dev files (run it before building frontend-server).

### Generators

> **NOTE**: These scripts are included in start/build process

-   `generate:apollo`: generate all apollo stuff;
-   `generate:apollo-initial`: generate apollo schema and config;
-   `generate:apollo-schema`: generate apollo schema;
-   `generate:apollo-config`: generate apollo config (JS GraphQL extension);
-   `generate:apollo-types`: generate apollo types. This script accepts `--watch` option.

### Prettier

> **NOTE**: Prettier reformats code before commit.

-   `prettier:all`: reformat all possible files with prettier.

### Linters

> **NOTE**: Code is checked before commit.

-   `lint:js`: run eslint;
-   `lint:ts`: run tslint and tsc (typecheck);
-   `lint:css`: run stylelint.

### Git hooks (debug only)

-   `yarn preparecommitmsg`: add task prefix to commit message, if necessary;
-   `yarn commitmsg`: validate commit message;
-   `yarn precommit`: linters, ts compiler errors, prettier, yarn.lock integrity check;
-   `yarn postcommit`: hack to update repository in IDE.
