const express = require('express')

const cors = require('cors')
const { dataReviver } = require('./helpers/utils')


const { logErrors, errorHandler } = require('./middlewares/error.handler')
const routerApi = require('./routes')
const {config} = require('./config/config')



const app = express()
const port = config.port|| 3001


app.use(express.json({reviver:dataReviver}))
app.use(cors())
routerApi(app)


app.use(logErrors)
app.use(errorHandler)

app.listen(port, () => {
  console.log('App listening on port: ' +  port)
})
