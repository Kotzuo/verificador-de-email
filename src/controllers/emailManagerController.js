const redis = require('redis')
const redisClient = redis.createClient()
const crypto = require('crypto')

const mail = require('../mail')
const crypt = require('../cryptography')
crypt.crypt(crypto.randomBytes(16), crypto.randomBytes(32), 'aes-256-cbc')

exports.register = (req, res) =>
{
    const { email } = req.params
    const encryptedEmail = crypt.encrypt(email)
    redisClient.sismember('encrypted-to-confirm-emails', encryptedEmail, (err, data) =>
    {
        if(data === 0)
        {
            redisClient.sismember('confirmed-emails', email, (err, data) =>
            {
                if(data === 0)
                {
                    redisClient.sadd('encrypted-to-confirm-emails', encryptedEmail)
                    mail.sendEmail(email, 'Confirmação do email', 
                    `<a target="_blank" href="${'http://localhost:3000/confirm/' + encryptedEmail}">Link para confirmação!</a>`)
                    res.send('Email de confirmação enviado!')
                }
                else
                {
                    res.send('Email já cadastrado no sistema!')
                }
            })
        }
        else
        {
            res.send('Já foi mandado um pedido de confirmação para esse email!')
        }
    })
}

exports.validate = (req, res) =>
{
    const { encriptedEmail } = req.params
    const decryptedEmail = crypt.decrypt(encriptedEmail)

    redisClient.srem('encrypted-to-confirm-emails', encriptedEmail, (err, data) =>
    {
        if(data)
        {
            console.log("Email " + decryptedEmail + " confirmado!")
            redisClient.sadd('confirmed-emails', decryptedEmail)
            res.send('Email confirmado!')
        }
        else
        {
            res.send('Token inválido')
        }
    })
}