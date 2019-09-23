require('dotenv').config()

module.exports =
{
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
    mongodbUrl: process.env.MONGO_URL
}