const knex = require('../conexaoKnex');
const { send } = require('../conexaoEmail');

const cadastrarPedido = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos} = req.body;

    try {

        const validarCliente = await knex('clientes').where('id', cliente_id).first();

        if(!validarCliente){
        return res.status(400).json({Mensagem:
            "Cliente não encontrado."
             });
        }

        for (let i = 0; i < pedido_produtos.length; i++){
            const id = pedido_produtos[i].produto_id;
            const quantidade = pedido_produtos[i].quantidade_produto;


            const validacao = await knex('produtos')
            .where({ id })
            .first()


            if(!validacao){
                return res.status(400).json({Mensagem:
                    "Produto não encontrado."
                });
            }
            if(validacao.quantidade_estoque < quantidade){
                return res.status(400).json({Mensagem:
                "Estoque insuficiente."
                })
            }
        }   

        let valorTotal = 0

        for (let i = 0; i < pedido_produtos.length; i++){ 
            const produto = await knex('produtos').where('id', pedido_produtos[i].produto_id).first();
            let multiplicar = produto.valor * pedido_produtos[i].quantidade_produto;
            valorTotal = valorTotal + multiplicar;
    }
    
        const pedidoFinal = await knex('pedidos').insert({
            cliente_id,
            observacao,
            valor_total: valorTotal
        }).returning('id');
        
        for (let i = 0; i < pedido_produtos.length; i++){
            const produto = await knex('produtos').where('id', pedido_produtos[i].produto_id).first();
            const quantidade_produto = pedido_produtos[i].quantidade_produto;
            const produto_id = pedido_produtos[i].produto_id;
            const pedidoProduto = await knex('pedido_produtos').insert({
                pedido_id: pedidoFinal[0].id,
                produto_id,
                quantidade_produto,
                valor_produto: produto.valor
            })
        }

        const to = "joao@gmail.com";
        const subject = "Pedido cadastrado!"
        const body = "boa, vc cadastrou o pedido!"

        send(to, subject, body);

        return res.status(201).json({Mensagem:
            "Pedido registrado!"
        });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({Mensagem:
            "erro interno no servidor"
        });
    }
}

const listarPedidos = async (req, res) => {
    const { cliente_id } = req.query;

    try {
        const listarPedido = await knex('pedidos').where({ cliente_id }).first();

        const listarPedidoProdutos = await knex('pedido_produtos').where('pedido_id', listarPedido.id)
        .returning('*');

         

        return res.status(200).json({ listarPedido, listarPedidoProdutos });
    } catch (error) {
        console.log(error);
        return res.status(500).json({Mensagem:
            "erro interno no servidor"
        });  
    }



}

module.exports = {
    cadastrarPedido,
    listarPedidos
}