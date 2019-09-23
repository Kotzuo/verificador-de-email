const mail = require('../mail')
const validate = require('../validate-json').validate
const userRequest = require('../models/userRequestModel')
const randomstring = require('randomstring')

module.exports =
{
    async store(req, res)
    {
        const { body } = req;
        
        if(validate(body))
        {
            const userRequestSearch = await userRequest.findOne(body)
            if(!userRequestSearch)
            {
                const token = randomstring.generate()
                await userRequest.create({
                    name: body.name,
                    email: body.email,
                    password: body.password,
                    token
                })
                mail.sendEmail(body.email, 'Confirmação de email', `<a href="http://localhost:3000/confirm?token=${token}">Clique aqui para confirmar!</a>`)
                
                return res.json({ status: 'SUCCESSFUL', data: body })
            }
            else
                return res.json({ status: 'ALREADY_EXISTS', data: body })
        }
        else
            return res.json({ status: 'INVALID', data: body })
    },

    async validate(req, res)
    {
        const { token } = req.query
        if(!token)
        {
            return res.json({ status: 'MISSING_TOKEN_QUERY', token: '' })
        }
        else
        {
            const userRequestSearch = await userRequest.findOneAndDelete({ token })
            if(userRequestSearch)
            {
                //Cadastro
                console.log(userRequestSearch)
                return res.json({ status: 'CONFIRMED_USER', token })
            }
            else
                return res.json({ status: 'NONEXISTENT_USER_REQUEST', token })
        }
    }
}