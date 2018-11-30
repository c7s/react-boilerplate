# Frontend

> **NOTE**: Please read our [Frontend GitHub wiki](https://github.com/c7s/react-boilerplate/wiki/Frontend).

## Prerequisites

-   Installed git hooks (see root).
-   Configured git (see root).
-   Yarn v1.9.4;
-   Node v8.11.1 (with npm v5.6.0);
-   Latest WebStorm or Visual Studio Code;

## Configuration

In order to run the project you need to override [`githubToken`](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/) via `config/local.js`:

```
module.exports = {
    api: {
        githubToken: 'my-secret-token',
    },
};
```

## Yarn scripts

### Package management

> **NOTE**: It's mandatory to use `yarn i` instead of `yarn` or `yarn install`

-   `yarn i`: install dependencies with frozen lockfile;
-   `yarn a`: shortcut for `yarn add -T -D`;
-   `yarn r`: shortcut for `yarn remove`.

### Development

-   `yarn start`: install dependencies, start apollo types generation watcher, start dev server and open browser.
-   `yarn start:no-install`: skip installing dependencies. Use when node_modules must remain untouched (i.e. when you `npm link` something).
-   `yarn analyze`: analyze (production-ready) bundle size.

### Build

-   `yarn build`: build frontend to `dist/`;
-   `yarn build:final`: also delete all dev files (run it before building frontend-server).

### Generators

> **NOTE**: These scripts are included in start/build process

-   `generate:apollo`: generate all apollo stuff (schema, JS GraphQL config and types). This script accepts `--watch` option (types only);
-   `generate:apollo-types`: generate apollo types. This script accepts `--watch` option.

### Prettier

> **NOTE**: Prettier reformats code before commit.

-   `prettier:all`: reformat all possible files with prettier.

### Linters

> **NOTE**: Code is checked before commit.

-   `lint:js`: run eslint;
-   `lint:ts`: run tslint and tsc (typecheck);
-   `lint:css`: run stylelint.
