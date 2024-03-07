const knex = require('../conexaoKnex');
const bcrypt = require('bcrypt');

const cadrastarUsuario = async (req, res) => {
    const {nome, email, senha} = req.body;
    
    try {
        const emailUnico = await knex('usuarios').where({ email }).first();

        if(emailUnico) {
            return res.status(400).json({
                Mensagem: "O email já existe."
            });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const usuario = await knex('usuarios')
        .insert({
            nome,
            email,
            senha: senhaCriptografada
        }).returning('*');

        if(!usuario){
            return res.status(400).json({
                Mensagem: "O usuario não foi cadastrado."
            })

        }

        return res.status(200).json(usuario[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            Mensagem: "erro interno do servidor." 
        }) 
    }

}

module.exports = cadrastarUsuario;