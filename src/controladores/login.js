const knex = require('../conexaoKnex');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const hash = process.env.HASH;

const loginUsuario = async (req, res) => {
    const { email, senha} = req.body;

    try {
        const usuario = await knex('usuarios').where({ email }).first();
        
        if(!usuario){
            return res.status(404).json({
                Mensagem: "Email ou senha incorreto!"
            });
        }
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if(!senhaCorreta){
            return res.status(400).json({
                Mensagem: "Email ou senha incorreto!"
            })
        }
        const token = jwt.sign({id: usuario.id }, hash, {expiresIn: '8h' });

        const { senha: _, ...usuarioLogado } = usuario;

        return res.status(200).json({
            usuario: usuarioLogado,
            token
        });
    } catch (error) {
        console.log(error)
        return res.status(400).json({Mensagem: "é esse aq"});
    }

}

module.exports = {
    loginUsuario,
    hash
 };