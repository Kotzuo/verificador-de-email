const express = require('express')
const httpServer = express()
const routes = require('./routes')
const mongoose = require('mongoose')
const env_variables = require('./env-variables')

mongoose.connect(env_variables.mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.on('connected', () =>
{
    console.log('Conectado ao MongoDB')
})
mongoose.connection.on('disconnected', () =>
{
    console.log('Desconectado do MongoDB')
})
mongoose.connection.on('error', () =>
{
    console.log('Erro a conectar ao MongoDB')
})

httpServer.use(express.json())
httpServer.use(routes)

httpServer.listen(3000)