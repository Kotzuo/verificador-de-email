const express = require('express')
const emailController = require('./controllers/emailManagerController')

const routes = express.Router()

routes.post('/register', emailController.store)
routes.get('/confirm', emailController.validate)

module.exports = routes