# easy-node-snippets
Snippets that will make daily use-cases easy-peasy! 

## Install
```js
npm i easy-node-snippets
```

The snippets included are as follows

### 1.Express Web Server
This is a simple express server, that can be used to host static/ dynamic web-sites. The snippet expects you to have a index.html at the root of your application.

It also exposes an api called ```/web-uri``` which will return the URL for your local server along with the port number.

#### Example
```js
let {expressWebApp} = require('easy-node-snippets');

expressWebApp.app.get('/dummy-web', (req, res) => {
    res.send('Dummy URL - Testing');
});

//Port number is optional. If not provided it deaults to 8080
expressWebApp.run(4545);
```
### 2.Express Web Server With Logger
This is a simple express server with a logger middle-ware, that can be used to host static/ dynamic web-sites. The snippet expects you to have a index.html at the root of your application.

It also exposes an api called ```/web-uri``` which will return the URL for your local server along with the port number.

#### Example
```js
let {expressWebAppWithLogger} = require('easy-node-snippets');

expressWebAppWithLogger.app.get('/dummy-call', (req, res) => {
    req.getLogger().info('This is dummy info message'); 
    res.send('ok');
});

/**
 * By default the logger is turned on with rolling appender mode on
 * It will create a folder called 'logs' in your root, and create rolling logs each day
 * 
 * If you pass false to run method it will turn the logger to a 
 * stdout console logger
 */ 
expressWebAppWithLogger.run();
```

You can set log levels to your logger using a express middleware

#### Example
```js
expressWebAppWithLogger.app.use((req, res, next) => {
    req.getLogger().setLevel('warn'); //This will stop printing info and debug level logs to log file
    next();
});
```