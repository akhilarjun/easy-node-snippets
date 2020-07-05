/**
 * Express Web Server With Logger
 * 
 * @author Akhil Arjun
 * @version 0.1.6
 * 
 */
const {app} = require('./express-server-boilerplate-for-web');
const fs = require('fs');
const port = 8080;
const SimpleNodeLogger = require('simple-node-logger');
const {getIpv4} = require('./local_utilties_not_for_export');
const { cwd } = require('process');
const path = require('path');
let uri;

let log;

const rollingLogOptions = {
    /**
     * Give a complete path for directory where logs would be created
     */
    logDirectory: path.join(cwd(), 'logs'),
    fileNamePattern: 'express-server-<DATE>.log',
    dateFormat: 'YYYY.MM.DD',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
};

/**
 * Middleware to add log instance to each req object
 */
app.use((req, res, next) => {
    req.getLogger = () => {
        return log;
    }
    next();
});

/**
 * Checks if the logs folder exists and if not
 * create it for you
 */
const checkAndCreateLogFolder = () => {
    if (!fs.existsSync(rollingLogOptions.logDirectory)) {
        console.log('Folder not present for storing log files');
        fs.mkdirSync(rollingLogOptions.logDirectory, {recursive: true}, (err) => {
            if (err) {
                throw('Logs cannot be saved. Automatic folder creation failed. Kindly create a folder called "logs"');
            }
        });
        console.log('Folder created for storing logs');
    } else {
        console.log("Logs will now be saved in '/logs' folder");
    }
}

/**
 * Starts the express server
 * @param {boolean} [useLogger] This is a optional flag. Send true to use 
 * rollingFileLogger (default behavior) or send false to use console logger
 * @param {number} [_port] Optional port number. Defaults to 8080
 * @returns {void} 
 */
const runServer = (useLogger, _port) => {
    const useLog = (typeof useLogger === 'undefined') ? true : !!useLogger;
    if (useLog) {
        checkAndCreateLogFolder();
        log = SimpleNodeLogger.createRollingFileLogger(rollingLogOptions);
    } else {
        log = SimpleNodeLogger.createSimpleLogger({});
    }
    let portToUse = _port ? _port : port;
    uri = "http://"+getIpv4()+":"+portToUse;
    let local_uri = "http://localhost:"+portToUse;
    app.listen(portToUse, () => {
        log.info("Server listening on "+uri);
        log.info("Server listening on "+local_uri);
    });
}

module.exports = {
    app: app,
    run: runServer
}