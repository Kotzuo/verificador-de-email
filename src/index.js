const express = require('express')
const httpServer = express()
const routes = require('./routes')

httpServer.use(routes)
httpServer.listen(3000)