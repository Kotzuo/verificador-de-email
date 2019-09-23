const nodemailer = require('nodemailer')
const env_variables = require('./env-variables')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: env_variables.email,
        pass: env_variables.password
    }
})

exports.sendEmail = (to, subject, html) =>
{
    const mailOptions =
    {
        from: env_variables.email,
        to,
        subject,
        html
    }

    transporter.sendMail(mailOptions)
}