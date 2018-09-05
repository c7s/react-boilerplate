# This is a copy of nodules/configBuilder

-   [ConfigBuilder class](#configbuilder-class)
    -   [How config generation works](#how-config-generation-works)
    -   [Instance interface](#instance-interface)
    -   [Config generation example](#config-generation-example)
        -   [Config types](#config-types)
        -   [Config presets](#config-presets)
        -   [Resulted configs](#resulted-configs)
    -   [Class usage](#class-usage)
-   [Using environment variables](#using-environment-variables)
    -   [Setting things up](#setting-things-up)
    -   [How to launch node.js with env variables?](#how-to-launch-nodejs-with-env-variables)
    -   [How to override one of the variables?](#how-to-override-one-of-the-variables)
-   [Migration from old config builder](#migration-from-old-config-builder)
    -   [Changing config usage in code](#changing-config-usage-in-code)
    -   [Preparing migrations](#preparing-migrations)
    -   [Using with auth and user services](#using-with-auth-and-user-services)
        -   [Changing config structure](#changing-config-structure)
        -   [Modifying supervisor configs](#modifying-supervisor-configs)
        -   [Modifying build.xml](modifying-buildxml)

# ConfigBuilder class

# ConfigBuilder class

## How config generation works

1.  It loads .js and .json files from **"base"** folder
2.  Appends configs from **_env_** folder
3.  Appends configs from **"local"** folder - **_legacy and shouldn't be used_**

## Instance interface

-   **setEnviroment(env: string)** set environment for a builder.
    -   env:string Examples: 'dev', 'prod', 'qa'.
-   **getConfig(name: string, passedEnv?: string): any** return generated config
    -   name: string - name of required config (without extension)
    -   passedEnv?: string - override builder env for this method
-   **printConfigs(passedEnv?: string)** output to stdout all generated configs
    -   passedEnv?: string - override builder env for this method
-   **build(passedEnv?: string)** create files for generated configs - **_legacy_**

    -   passedEnv?: string - override builder env for this method

## Config generation example

### Config types

Configs may be either files (js or JSON) or directories (fractured configs).
**Config builder needs to be configured via params to enable fractured
configs.** Fractured configs are shallowly merged into single config files named
by directory name. Fractured config directory should have only files (js or
JSON).

### Config presets:

configs/base/someconfig.js

```javascript
module.exports = {
    param1: 'base-value',
    param2: 'base-value',
};
```

configs/qa/someconfig.json

```JSON
{
    "param2": "qa-value",
    "param3": "qa-value"
}
```

configs/prod/someconfig.json

```JSON
{
    "param2": "prod-value"
}
```

### Resulted configs:

dev

```js
{
    param1: "base-value",
    param2: "base-value"
}
```

qa

```js
{
    param1: "base-value",
    param2: "qa-value",
    param3: "qa-value"
}
```

prod

```js
{
    param1: "base-value",
    param2: "prod-value"
}
```

## Class usage

Initialize builder

```typescript
import { ConfigBuilder } from 'nodules/configBuilder';
import * as path from 'path';

//Get host environment (prod, qa, dev) from environment variables.
const env = process.env.QUIZ_ENV;
if (!env) {
    throw new Error(`QUIZ_ENV is not defined`);
}
const configPath = path.join(__dirname, '../../../config');
export const builder = new ConfigBuilder(configPath);
builder.setEnviroment(env);
```

Use builder instance instead of requiring config file directly

```typescript
import { builder } from '../configBuilder';
const config = builder.getConfig('i18n');
```

# Using environment variables

You can move parameters difering on several hosts of the same ENV to environment variables;  
Example: several QA hosts have different hostnames and GA keys.

## Setting things up

1.  Create file with environment variables /opt/environment.sh and make it executable with chmod

```bash
export QUIZ_HOSTNAME=www8.lan
export QUIZ_ENV=dev
export QUIZ_LOCALE=ru
```

2.  Add variable-reading script to your project
    /bin/environment

```bash
#!/bin/bash

if [ -f /opt/environment.sh ]; then
    source /opt/environment.sh
fi

$*
```

3.  Add execution of variable-reading script to supervisor config
    /environment/supervisord/quiz-api.conf

```
[program:quiz-api]
command=/opt/quiz-api/current/bin/environment node app/app.js
(...)
stopasgroup=true
```

**Important note:** `stopasgroup=true` required to properly shutdown node process on supervisor restart

4.  Now you can use environment variables in your configs

```javascript
const locale = process.env.QUIZ_LOCALE;
module.exports = {
    locale: locale,
    someOtherParam: 'someOtherParam',
};
```

5.  Add environment variable insurance check on project startup  
    Use [EnvVariableChecker](https://github.com/c7s/nodules/blob/QUIZ-962/startupControll/README.md#envvariablechecker) class from startupControll module

6.  Create wrappers in package.json for user scripts

```JSON
 "scripts": {
    "app": "bin/environment node app/app.js",
    "migrate": "bin/environment node app/scripts/migrate.js",
    "rollback": "bin/environment node app/scripts/rollback.js"
  }
```

7.  Add env variables to your cron scripts

```bash
if [ -f /opt/environment.sh ]; then
    source /opt/environment.sh
fi
```

## How to launch node.js with env variables?

-   Launch as in supervisor command: `bin/environment node app/app.js` - can be moved to npm/yarn script
-   Load environment variables manually and then launch node: `source /opt/environment.sh` and then `node app/app.js`. **_Warning_**: with this method variables will be bound to the terminal session, so you will lose them after closing the window.

## How to override one of the variables?

`QUIZ_ENV=QA node app/app.js`

# Migration from old config builder

## Changing config usage in code

First you need to replace config requires with objects from config builder instance
old:

```typescript
import { builder } from '../components/configBuilder';
const dbConfig = builder.getConfig('db');
```

new:

```typescript
const dbConfig = require('../config/db');
```

## Preparing migrations

Sequlize cli engine requires config **file** to launch migrations. At this moment there is one workaround for this issue:

1.  Create in config folder file sequlizerc.js

```javascript
const configBuilder = require('../app/components/configBuilder').builder;
const config = configBuilder.getConfig('db');

module.exports = {
    username: config.username,
    database: config.database,
    host: config.host,
    dialect: config.dialect,
    password: config.password,
    benchmark: config.benchmark,
};
```

2.  Use path to this file as path to config in .sequelizerc

```javascript
const path = require('path');

module.exports = {
    config: path.resolve('config/sequelizerc'),
    'migrations-path': path.resolve('app/modules/sequelize/tmp'),
    'models-path': path.resolve('app/modules'),
};
```

## Using with auth and user services

As long as auth and user services requre path to **file** you need yo use the following workaround. For usage of environment variables also read [the following section](#using-environment-variables)

### Changing config structure

First you need to create individual configs for **dev**, **qa** and **prod** environments:  
![Imgur](http://i.imgur.com/y9az9jS.png)  
You need to do this for both auth and user service.  
ℹ️ With help of [environment variables](#using-environment-variables) you can set redirect url for oauth dynamicly

```javascript
    const hostname = process.env.PROJECT_HOSTNAME;
    "authentication": {
        "vk": {
            "clientId": some-qa-numeric-id,
            "clientSecret": "some-qa-secret",
            "redirectUri": `http://${hostname}/auth/vk`
        },
     }
```

### Modifying supervisor configs

Since supervisor servcie config includes config path, you need to create individual config for every environment. Something like this:

-   auth-service.qa.conf
-   auth-service.dev.conf
-   auth-service.prod.conf
-   user-service.qa.conf
-   user-service.dev.conf
-   user-service.prod.conf

Then add config path to the starting params for every created file. B

```
[program:auth-service]
command=/opt/PROJECT/current/bin/environment node app.js
environment=CONFIG_PATH=/opt/PROJECT/current/config-auth-service/qa
(...)
stopasgroup=true
```

❗ Be careful and dont forget to change env folder while copipasting this from file to file!

### Modifying build.xml

Add to project build.xml following lines:

```xml
<property name="auth.config-path"
            value="${basedir}/config-auth-service/${params.env}"/>
<property name="user.config-path"
            value="${basedir}/config-user-service/${params.env}"/>
<property name="auth.source.supervisor"
            value="${packaging.target.current-path}/environment/supervisord/auth-service.${params.env}.conf"/>
<property name="user.source.supervisor"
            value="${packaging.target.current-path}/environment/supervisord/user-service.${params.env}.conf"/>
```
