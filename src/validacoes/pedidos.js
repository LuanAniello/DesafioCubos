const joi = require('joi');

const pedidosSchema = joi.object({
    cliente_id: joi.number().positive().required(),
    observacao: joi.string(),
    pedido_produtos: joi.array().items(
       joi.object({
            produto_id: joi.number().positive(),
            quantidade_produto: joi.number().positive()
       })
    )
  });

  module.exports = pedidosSchema