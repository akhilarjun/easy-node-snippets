const express = require('express');
const app = express();
const path = require('path');
const port = 8080;
const { cwd } = require('process');
const {getIpv4} = require('./local_utilties_not_for_export');
let runTime;

app.use(express.json());

app.get('/', (req, res) => {
    const destPath = path.join(cwd(), 'index.html');
    res.sendFile(destPath);
});

app.get('/web-uri', (req, res) => {
    res.end(uri);
});

/**
 * Starts the express server
 * @param {number} [_port] Optional port number. Defaults to 8080
 * @return {void} 
 */
const runServer = (_port) => {
    let portToUse = _port ? _port : port;
    uri = "http://"+getIpv4()+":"+portToUse;
    let local_uri = "http://localhost:"+portToUse;
    app.listen(portToUse, () => {
        console.log("Server listening on "+uri);
        console.log("Server listening on "+local_uri);
    });
    return uri;
}

process.argv.slice(2).forEach(arg => {
    const [,value] = arg.split("=");
    runTime = value;
});

if (runTime == 'local') {
    runServer();
}

module.exports = {
    app: app,
    run: runServer
}