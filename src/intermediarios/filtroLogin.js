const jwt = require('jsonwebtoken');
const knex = require('../conexaoKnex');
const hash = process.env.HASH;

const filtroLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization) {
        return res.status(401).json({
            Mensagem: "É necessario estar logado para acessar esta area."
        });
    }

    const token = authorization.replace('Bearer ', '').trim();

    try {

         const { id } = jwt.verify(token, hash);

         const usuarioExiste = await knex('usuarios').where({ id }).first();

         if(!usuarioExiste){
            return res.stutus(404).json({
                Mensagem: "Usuario não encontrado"
            });

         }

         const {senha, ...usuario} = usuarioExiste;

         req.usuario = usuario;

         next();
    } catch (error) {
        console.log(error);
       return res.status(500).json({
        Mensagem: "erro interno do servidor."
       })
    }
}

module.exports = filtroLogin;