const { PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const knex = require('../conexaoKnex');
const { s3Client, informacoesBucket }  = require('../storage')
const { v4: uuidv4 } = require('uuid');

const cadastraProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body
    const { file } = req 

    try {
        const categoriaId = 
        await knex('categorias').where('id', categoria_id).first();
        if(!categoriaId) {
            return res.status(404).json({
                Mensagem: "A categoria não existe."
            });
        }

        const key = `produtos/${uuidv4()}`


        await s3Client.send(
            new PutObjectCommand({
              Bucket: informacoesBucket.bucketName,
              Key: key,
              Body: file.buffer,
              ContentType: file.mimetype,
            })
          );
      
          const urlPublica = `https://${informacoesBucket.bucketName}.${informacoesBucket.endpoint}/${key}`;

        const produto = await knex('produtos').insert({
            descricao,
            quantidade_estoque: Number(quantidade_estoque),
            valor: Number(valor),
            categoria_id: Number(categoria_id),
            produto_imagem: urlPublica
        }).returning('*');

        if(!produto){
            res.status(400).json( {Mensagem:"o produto não foi cadastrado" });
        }

        return res.status(200).json(produto[0]);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            Mensagem: "erro interno do servidor." 
        }); 
    }
}

const atualizarProduto = async (req, res) => {
    const { id } = req.params;
    const {
        descricao,
        quantidade_estoque,
        valor,
        categoria_id} = req.body

    try {
        const categoriaProduto = await knex('produtos').where({ id }).first();

        if(!categoriaProduto){
            return res.status(404).json({
                Mensagem: "Produto não encontrado"
            });
        }
        const produtoAtualizado = await knex('produtos').update({
            descricao,
            quantidade_estoque,
            valor,
            categoria_id
        }).where({ id });
        return res.status(204).send();

    } catch (error) {
        res.status(500).json({
            Mensagem: "erro interno do servidor." 
        });  
    }
}

const listarProdutos = async (req, res) => {
    const { categoria_id } = req.body

    try {
        if(categoria_id){
            const detalharProdutos = await knex('produtos').where({
                 categoria_id
                });
            
            return res.status(200).json(detalharProdutos);
        }

        const detalharProdutos = await knex('produtos');

        return res.status(200).json(detalharProdutos);
    } catch (error) {
        res.status(500).json({
            Mensagem: "erro interno do servidor." 
        });  
    }

}

const detalharProduto = async (req, res) => {
    const { id } = req.params;

    try {
        const detalhar = await knex('produtos').where({ id });
        return res.status(200).json(detalhar);
    } catch (error) {
        res.status(500).json({
            Mensagem: "erro interno do servidor." 
        }); 
    }

}

const deletarProduto = async (req, res) => {
    const { id } = req.params;
    const { file } = req 

    try {
        const produtoPedido = await knex('pedido_produtos').where('produto_id', id).first();

        if(produtoPedido){
            return res.status(400).json({Mensagem:
                "Não é possivel apagar um produto que esta ligado a um pedido."
            })
        }
        
        const acharImagem = await knex.select('produto_imagem').from('produtos').where({ id });
        const cortarKey = acharImagem[0].produto_imagem.slice(-9);
        
        await s3Client.send(
            new DeleteObjectCommand({
              Bucket: informacoesBucket.bucketName,
              Key: cortarKey,
            })
          );

        const deletar = await knex('produtos').del().where({ id }).returning('*');
        return res.json(deletar);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            Mensagem: "erro interno do servidor." 
        }); 
    }
}

module.exports = {
    cadastraProduto,
    atualizarProduto,
    listarProdutos, 
    detalharProduto,
    deletarProduto
}