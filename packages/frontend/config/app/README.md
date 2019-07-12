Application-specific config. Changes cause incremental build.

In development create `local.js` to play around with config.

Example for gh-pages:

```
module.exports = {
    root: {
        publicPath: '/react-boilerplate/static/',
        basename: '/react-boilerplate',
        canonicalRobotsHost: 'https://c7s.github.io',
    },
};
```
