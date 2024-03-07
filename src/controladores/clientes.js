const knex = require('../conexaoKnex');

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado} = req.body;

    try {
        const emailUnico = await knex('clientes').where({ email }).first();
        
        if(emailUnico) {
            return res.status(400).json({
                Mensagem: "esse email ja existe."
            });
        }
        const cpfUnico = await knex('clientes').where({ cpf }).first();
        
        if(cpfUnico) {
            return res.status(400).json({
                Mensagem: "esse cpf ja existe."
            });
        }
        const cliente = await knex('clientes').insert({
            nome,
            email,
            cpf,
            cep, 
            rua, 
            numero, 
            bairro, 
            cidade, 
            estado
        }).returning('*');

        if(!cliente){
            res.status(400).json( {Mensagem:"o cliente não foi cadastrado" });
        }

        return res.status(200).json(cliente[0]);

    } catch (error) {
        res.status(500).json({
            Mensagem: "erro interno do servidor." 
        }); 
    }
}

const atualizarDadosCliente = async (req, res) => {
    const { id } = req.params;
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado} = req.body;

    try {
        const idCliente = await knex('clientes').where({ id }).first();

        if(!idCliente){
            return res.status(400).json({
                Mensagem: "cliente não encontrado"
            });
        }
        const emailUnico = await knex('clientes').where({ email }).first();
        
        if(emailUnico) {
            return res.status(400).json({
                Mensagem: "esse email ja existe."
            });
        }
        const cpfUnico = await knex('clientes').where({ cpf }).first();
        
        if(cpfUnico) {
            return res.status(400).json({
                Mensagem: "esse cpf ja existe."
            });
        }

        const clienteAtualizado = await knex('clientes').update({
            nome,
            email,
            cpf,
            cep, 
            rua, 
            numero, 
            bairro, 
            cidade, 
            estado
        }).where({ id });
        return res.status(204).send();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            Mensagem: "erro interno do servidor." 
        }); 
    }
}

const listarClientes = async (req, res) => {
    try {
        const clientes = await knex('clientes');

        res.status(200).json(clientes);
    } catch (error) {
       res.status(500).json({
        Mensagem: "erro interno do servidor." 
    }) 
    }


}

const detalharCliente = async (req, res) => {
    const { id } = req.params;

    try {
        const detalhar = await knex('clientes').where({ id });
        return res.status(200).json(detalhar);
    } catch (error) {
        res.status(500).json({
            Mensagem: "erro interno do servidor." 
        }); 
    }

}

module.exports = {
    cadastrarCliente,
    atualizarDadosCliente,
    listarClientes,
    detalharCliente
}