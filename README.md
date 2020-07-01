# easy-node-snippets
Snippets that will make daily use-cases easy-peasy! 

## Install
```js
npm i easy-node-snippets
```

The snippets included are as follows

### Express Web Server
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
