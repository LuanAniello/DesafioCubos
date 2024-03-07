const knex = require('../conexaoKnex');
const bcrypt = require('bcrypt');

const atualizarDados = async (req, res) => {
    const {nome, email, senha} = req.body;
    const { id } = req.usuario;

    try {
        const usuarioExiste = await knex('usuarios').where({ id }).first();

        if(!usuarioExiste) {
            return res.status(404).json({
                Mensagem: "Usuario não encontrado."
            });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        if(email !== req.usuario.email) {
            const emailExiste = await knex('usuarios').where({ email }).first();
         
            if(emailExiste){
                return res.status(400).json({
                    Mensagem: "O email já existe."
                });
            }
        }

        const usuarioAtualizado = await knex('usuarios').where({ id }).update({
            nome,
            email,
            senha: senhaCriptografada
        });

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = atualizarDados;