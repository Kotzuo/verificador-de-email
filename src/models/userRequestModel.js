const { Schema, model } = require('mongoose')

const userRequestSchema = new Schema(
{
    name: { 
        type: String, 
        required: true 
    },

    email:
    { 
        type: String, 
        required: true 
    },

    password:
    { 
        type: String, 
        required: true 
    },

    token:
    { 
        type: String, 
        required: true 
    }
}, { timestamps: true })

module.exports = model('request', userRequestSchema)