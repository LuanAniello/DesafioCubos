 create table usuarios (
    id serial primary key,
    nome text not null,
    email text not null unique,
    senha text not null

 );

 create table categorias (
    id serial primary key,
    descricao text not null
 );

 insert into categorias (descricao) values ('Informática'),
('Celulares'), 
('Beleza e Perfumaria'),
('Mercado'),
('Livros e Papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games');

 create table produtos (
   id serial primary key,
   descricao text not null,
   quantidade_estoque integer ,
   valor integer not null,
   categoria_id integer references categorias(id)
 );

 create table clientes (
   id serial primary key,
   nome text not null,
   email text not null unique,
   cpf text not null unique,
   cep text,
   rua text,
   numero text,
   bairro text,
   cidade text,
   estado text
 );

 create table pedidos (
  id serial primary key,
  cliente_id integer not null,
  observacao text,
  valor_total integer
 );

 create table pedido_produtos (
  id serial primary key,
  pedido_id integer references pedidos(id),
  produto_id integer references produtos(id),
  quantidade_produto integer not null,
  valor_produto integer not null
 );

 alter table produtos add column produto_imagem text;