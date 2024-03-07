const joi = require('joi');

const usuarioSchema = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatorio!',
        'string.empty': 'O campo nome é obrigatorio!'
    }),
    email: joi.string().email().required().messages({
        'any.required': 'Esse email ja existe!',
        'string.empty': 'O campo email é obrigatorio!',
        'string.email': 'O campo email precisa ter um formato valido!'
    }),
    senha: joi.string().required().messages({
        'any.required': 'O campo senha é obrigatorio!',
        'string.empty': 'O campo senha é obrigatorio!'
    })

});

const loginSchema = joi.object({
    email: joi.string().required().messages({
        'any.required': 'É necessario informar o email para fazer login!',
        'string.empty': 'É necessario informar o email para fazer login!'
    }),
    senha: joi.string().required().messages({
        'any.required': 'É necessario informar a senha para fazer login!',
        'string.empty': 'É necessario informar a senha para fazer login!'
    })
})


module.exports = {
    usuarioSchema,
    loginSchema
};