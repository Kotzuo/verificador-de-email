const express = require('express')
const emailController = require('./controllers/emailManagerController')

const routes = express.Router()

routes.get('/register/:email', emailController.register)
routes.get('/confirm/:encriptedEmail', emailController.validate)

module.exports = routes