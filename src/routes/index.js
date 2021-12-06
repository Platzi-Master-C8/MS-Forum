const express = require('express');
const discussionsRouter = require('./discussions.router');

function routerApi(app) {
    const router = express.Router();
    app.use('/api', router);
    router.use('/discussions', discussionsRouter);
}

module.exports = routerApi;