const knex = require('../conexaoKnex');


const listarCategorias = async (req, res) => {
    try {
        const categoria = await knex('categorias');

        res.status(200).json(categoria);
    } catch (error) {
       res.status(500).json({
        Mensagem: "erro interno do servidor." 
    }) 
    }


}

module.exports = {
    listarCategorias
}