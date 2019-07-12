Dev-server-specific config. Changes cause full rebuild.

In development create `local.js` to play around with config.

Example:

```
module.exports = {
    port: 3000,
    isBuild: false,
};
```
