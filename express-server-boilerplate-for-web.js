const express = require('express');
const app = express();
const parser = require('body-parser');
const path = require('path');
const fs = require('fs');
const port = 8080;
const os = require('os');
const { cwd } = require('process');
const ifaces = os.networkInterfaces();
let runTime;

/**
 *  Get IPv4 Address of the System
 */
const getIPV4 = () => {
    let ipv4Address;
    Object.keys(ifaces).forEach(function (ifname) {
        ifaces[ifname].forEach(function (iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
            return;
        }
        ipv4Address = iface.address;
        });
    });
    return ipv4Address;
}

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
 */
const runServer = (_port) => {
    let portToUse = _port ? _port : port;
    uri = "http://"+getIPV4()+":"+portToUse;
    app.listen(portToUse, () => {
        console.log("Server listening on "+uri);
    });
    return uri;
}

process.argv.slice(2).forEach(arg => {
    const [key,value] = arg.split("=");
    runTime = value;
});

if (runTime == 'local') {
    runServer(true);
}

module.exports = {
    app: app,
    run: runServer
}