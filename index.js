const express = require('express')
const httpServer = express()
const redis = require('redis')
const redisClient = redis.createClient()

redisClient.on('connect', () =>
{
    console.log('Conectado ao redis')
})