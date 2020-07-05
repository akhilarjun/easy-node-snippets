let {expressWebAppWithLogger, expressWebApp} = require('../index');

expressWebAppWithLogger.app.use((req, res, next) => {
    req.getLogger().setLevel('warn');
    next();
});

expressWebApp.app.get('/simple-express-route', (req, res) => {
    res.send('ok');
});

expressWebAppWithLogger.app.get('/dummy-call', (req, res) => {
    req.getLogger().info('This is dummy info message'); //This will not be printed as loglevel is set to warn
    req.getLogger().warn('This is dummy warning message'); //This will be printed
    req.getLogger().error('This is dummy error message'); //This will be printed
    res.send('ok');
});

expressWebAppWithLogger.run(false, 4343);
expressWebApp.run(4545);
