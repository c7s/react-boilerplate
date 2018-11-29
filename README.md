## React Boilerplate

Please read our [wiki](https://github.com/c7s/react-boilerplate/wiki).

Open root folder in your IDE. **Packages are not projects, the root directory is.**

Prepare project by running `yarn i`.

Treat each package individually (list all dependencies in corresponding package.json). Common dependencies between packages **MUST** be fixed, because they are hoisted to top.

Specifically, linters and `typescript` are common dependencies. Configure IDE to use binaries from `./node_modules`, not `./packages/package-name/node_modules` to prevent inconsistencies.
