# React Boilerplate

> **NOTE**: Please read our [GitHub wiki](https://github.com/c7s/react-boilerplate/wiki).

> **NOTE**: It's mandatory to install git hooks before working on individual projects.

> **NOTE**: Each package is individual project and must be opened in separate IDE window.

> **NOTE**: There is no such thing as common dependencies hoist. Treat each package individually (list all dependencies in corresponding package.json).

Root project for high-level operations:

-   bootstrapping new project;
-   versioning;
-   git hooks installation;
-   git configuration.

## Prerequisites

-   Yarn v1.9.4;
-   Node v8.11.1 (with npm v5.6.0);
-   Latest WebStorm or Visual Studio Code;

## Bootstrapping new project

TBD.

## Versioning

Use [`yarn lerna version`](https://github.com/lerna/lerna/tree/master/commands/version#readme). Simple `yarn lerna version minor` should be enough. Don't forget to install dependencies first: `yarn i`.

## Git hooks installation

Just run `yarn i`.

## Git configuration

Use `yarn git:configure`. Don't forget to install dependencies first: `yarn i`.

## Yarn scripts

### Package management

> **NOTE**: It's mandatory to use `yarn i` instead of `yarn` or `yarn install`

-   `yarn i`: install dependencies with frozen lockfile;
-   `yarn a`: shortcut for `yarn add -T -D`;
-   `yarn r`: shortcut for `yarn remove`.

### Prettier

> **NOTE**: Prettier reformats code before commit.

-   `prettier:all`: reformat all possible files with prettier.

### Linters

> **NOTE**: Code is checked before commit.

-   `lint:js`: run eslint;

### Git config

-   `yarn git:configure`: set global git config to conventional.

### Git hooks (debug only)

> **NOTE**: `pre-commit` yarn script should be defined in each package using `lint-staged`. All `pre-commit` scripts will be run via `husky` on actual commit.

-   `yarn prepare-commit-msg`: add task prefix to commit message, if necessary;
-   `yarn commit-msg`: validate commit message;
-   `yarn pre-commit`: linters, ts compiler errors, prettier, yarn.lock and package.json check;
-   `yarn post-commit`: hack to update repository in IDE.
