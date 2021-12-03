const express = require('express')
const { dataReviver } = require('./helpers/utils')

const { logErrors, errorHandler } = require('./middlewares/error.handler')
const routerApi = require('./routes')

const app = express()
const port = 3001

app.use(express.json({reviver:dataReviver}))
routerApi(app)


app.use(logErrors)
app.use(errorHandler)

app.listen(port, () => {
  console.log('App listening on port: ' +  port)
})

