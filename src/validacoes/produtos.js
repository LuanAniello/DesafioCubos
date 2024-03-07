const joi = require('joi');

const produtoSchema = joi.object({
    descricao: joi.string().required().messages({
        'any.required': 'O campo descriçao é obrigatorio!',
        'string.empty': 'O campo descrição é obrigatorio!'
    }),
    quantidade_estoque: joi.number().required().messages({
        'any.required': 'O campo quantidade_estoque é obrigatorio!',
        'number.empty': 'O campo quantidade_estoque é obrigatorio!'
    }),
    valor: joi.number().required().messages({
        'any.required': 'O campo valor é obrigatorio!',
        'number.empty': 'O campo valor é obrigatorio!',
        'number.base': 'O campo valor tem que ser um numero.'
    }),
    categoria_id: joi.number().required().messages({
        'any.required': 'O campo categoria_id é obrigatorio!',
        'number.empty': 'O campo categoria_id é obrigatorio!',
        'number.base': 'O campo categoria_id tem que ser um numero.'
    }),
    produto_imagem: joi.string()
});

module.exports = {
    produtoSchema
}