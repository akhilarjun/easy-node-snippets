/**
 * Easy Node Snippets
 * 
 * @author Akhil Arjun
 * @version 0.1.6
 * 
 */

/**
 * Express Web Server
 */
let expressAppForWeb = require('./express-server-boilerplate-for-web');
/**
 * Express Web Server with Logger
 */
let expressAppWithLoggerForWeb = require('./express-server-boilerplate-for-web-with-logger');

module.exports = {
    expressWebApp: expressAppForWeb,
    expressWebAppWithLogger: expressAppWithLoggerForWeb
}