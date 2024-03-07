const joi = require('joi');

const clienteSchema = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatorio!',
        'string.empty': 'O campo nome é obrigatorio!'
    }),
    email: joi.string().email().required().messages({
        'any.required': 'Esse email ja existe!',
        'string.empty': 'O campo email é obrigatorio!',
        'string.email': 'O campo email precisa ter um formato valido!'
    }),
    cpf: joi.string().required().messages({
        'any.required': 'O campo cpf é obrigatorio!',
        'string.empty': 'O campo cpf é obrigatorio!'
    }),
    cep: joi.string(),
    rua: joi.string(),
    numero: joi.string(),
    bairro: joi.string(),
    cidade: joi.string(),
    estado: joi.string()
});

module.exports = {
    clienteSchema
}