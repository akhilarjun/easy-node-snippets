let expressAppForWeb = require('./express-server-boilerplate-for-web');

expressAppForWeb.app.get('/dummy-web', (req, res) => {
    res.send('This call is working with new stuff');
});

expressAppForWeb.run(3030);