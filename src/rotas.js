const express = require('express');
const  validarRequisicao  = require('./intermediarios/validarRequisicao')
const { listarCategorias } = require('./controladores/categorias');
const { usuarioSchema, loginSchema } = require('./validacoes/usuario');
const cadastrarUsuario = require('./controladores/cadrastar');
const { loginUsuario } = require('./controladores/login');
const filtroLogin = require('./intermediarios/filtroLogin');
const detalharUsuario = require('./controladores/detalhesUsuario');
const atualizarDados = require('./controladores/atualizarUsuario');
const { produtoSchema } = require('./validacoes/produtos');
const { cadastraProduto, atualizarProduto, listarProdutos, detalharProduto, deletarProduto } = require('./controladores/produtos');
const { clienteSchema } = require('./validacoes/clientes');
const { cadastrarCliente, atualizarDadosCliente, listarClientes, detalharCliente } = require('./controladores/clientes');
const pedidosSchema = require('./validacoes/pedidos');
const { cadastrarPedido, listarPedidos } = require('./controladores/pedidos');
const upload = require('./multer');
const rotas = express();


rotas.get('/categoria', listarCategorias);
rotas.post('/usuario', validarRequisicao(usuarioSchema), cadastrarUsuario );
rotas.post('/login', validarRequisicao(loginSchema), loginUsuario);

rotas.use(filtroLogin);

rotas.get('/usuario', detalharUsuario);
rotas.put('/usuario', validarRequisicao(usuarioSchema), atualizarDados);

rotas.post('/produto',upload.single('produto_imagem'), validarRequisicao(produtoSchema), cadastraProduto);
rotas.put('/produto/:id', validarRequisicao(produtoSchema), atualizarProduto);
rotas.get('/produto', listarProdutos);
rotas.get('/produto/:id', detalharProduto);
rotas.delete('/produto/:id', deletarProduto);

rotas.post('/cliente', validarRequisicao(clienteSchema), cadastrarCliente);
rotas.put('/cliente/:id', validarRequisicao(clienteSchema), atualizarDadosCliente);
rotas.get('/cliente', listarClientes);
rotas.get('/cliente/:id', detalharCliente);

rotas.post('/pedido', validarRequisicao(pedidosSchema), cadastrarPedido);
rotas.get('/pedido', listarPedidos);

module.exports = rotas;

