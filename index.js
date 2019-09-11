const express = require('express')
const httpServer = express()
const redis = require('redis')
const redisClient = redis.createClient()
const nodemailer = require('nodemailer')

const crypto = require('crypto')
const algorithm = 'aes-256-cbc'
const key = crypto.randomBytes(32)
const iv = crypto.randomBytes(16)

const encrypt = (text) => 
{
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
}

const decrypt = (text) =>
{
    const encryptedText = Buffer.from(text, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dump.email.kotzuo@gmail.com',
        pass: 'bti.2019'
    }
})

const mailOptions = {
    from: 'dump.email.kotzuo@gmail.com',
    subject: 'Confirmação do email',
}

redisClient.on('connect', () =>
{
    console.log('Conectado ao redis')
})

httpServer.get('/cadastrar/:email', (req, res) =>
{
    const { email } = req.params
    const encryptedEmail = encrypt(email)
    redisClient.sismember('encrypted-to-confirm-emails', encryptedEmail, (err, data) =>
    {
        if(data === 0)
        {
            redisClient.sismember('confirmed-emails', email, (err, data) =>
            {
                if(data === 0)
                {
                    redisClient.sadd('encrypted-to-confirm-emails', encryptedEmail)
                    mailOptions.to = email
                    mailOptions.html = `<a target="_blank" href="${'http://localhost:3000/confirmar/' + encryptedEmail}">Link para confirmação!</a>`
                    transporter.sendMail(mailOptions)
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
})

httpServer.get('/confirmar/:encriptedEmail', (req, res) =>
{
    const { encriptedEmail } = req.params
    const decryptedEmail = decrypt(encriptedEmail)

    redisClient.srem('encrypted-to-confirm-emails', encriptedEmail, function(err, data){
        if(data)
        {
            console.log("Email " + decryptedEmail + " confirmado!");
            redisClient.sadd('confirmed-emails', decryptedEmail)
            res.send('Email confirmado!')
        }
        else
        {
            res.send('Token inválido')
        }
    });
})

httpServer.listen(3000)