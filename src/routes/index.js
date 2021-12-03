const express = require('express')
const discussionsRouter = require('./discussions.router')
const likesRouter = require('./likes.router')
function routerApi(app) {
    const router = express.Router()
    app.use('/api', router)
    router.use('/discussions', discussionsRouter)
    router.use('/likes',likesRouter)
}


module.exports = routerApi