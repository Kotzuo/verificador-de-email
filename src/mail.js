const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'password'
    }
})

exports.sendEmail = (to, subject, html) =>
{
    const mailOptions =
    {
        from: 'your-email@gmail.com',
        to,
        subject,
        html
    }

    transporter.sendMail(mailOptions)
}