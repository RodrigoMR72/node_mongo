//const express = require('express')

import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import { Usuario } from './models/Usuario.js'


const app = express();

app.use(
  express.urlencoded({
    entended: true,
  })
);

app.use(express.json());

const HOST = 'localhost'
const PORT = 5000


app.post('/usuario', async (req, res) => {
  const { nome, idade, ativo, email } = req.body;
  const usuario = { nome, idade, ativo, email };

  const usuarioDB = await Usuario.create(usuario);

  res.status(201).json({
    data: usuarioDB,
    msg: "Usuário criado com sucesso!",
  });

})


// endpoint inicial
app.get('/', (req, res) => {
  res.send('Servidor rodando!!!')
});


app.put('/usuario/:id', async (req, res) => {

  const id = req.params.id;

  const {nome, idade, ativo, email} = req.body

  const usuario = {nome, idade, ativo, email};

  const usuarioBD = await Usuario.updateOne({_id: id}, usuario);

  res.status(200).json("Usuário atualizado com sucesso");

});



app.get('/usuarios', async (req, res) => {

  const usuarios = await Usuario.find();

  if(usuarios.length === 0) {

  res.status(422).json({msg: 'Nenhum Usuario Encontrado!!!'});

  } else {

  res.status(200).json(usuarios);

  }

});



app.get('/usuario/:id', async (req, res) => {

  const id = req.params.id;

// Verifica se o Id passado na URL é válido, conforme o exemplo: 64caf89a27c5be42c8c6f540, o _id do mongo possui 24 caracteres, 
// ou seja, só pode realizar a busca (linha 82), se o tamanho for válido.

  if (id.length !== 24 ) {

    res.status(422).json('Tamnho de ID inválido!!!');

    return;

  }

  // Se o tamanho for válido, realiza a busca no banco de dados.

  const usuario = await Usuario.findOne({_id: id});


  // Tratamento, caso nehhum usuário com o id fornecido for encontrado.

  if(usuario) {

    res.status(200).json(usuario);

  } else {

    res.status(422).json('Usuário não encontrado!!!');

  }

  

});


app.delete('/usuario/:id', async (req, res) => {

  const id = req.params.id;
  console.log(id.length !== 24 );

  if (id.length !== 24 ) {

    res.status(422).json('Tamnho de ID inválido!!!');

    return;

  }

  // Se o tamanho for válido, realiza a busca no banco de dados.

  const usuario = await Usuario.findOne({_id: id});


  // Tratamento, caso nehhum usuário com o id fornecido for encontrado.

  if(usuario) {

    await Usuario.deleteOne({_id: usuario.id});
  
    res.status(200).json("Usuário deletado com sucesso");

  } else {

    res.status(422).json('Usuário não encontrado!!!');

  }

});



const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS

//console.log( DB_USER, DB_PASS)

// conectando com banco Mongo Atlas - coloca senha <> e inclui o nome da tabela usuario
mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.hvaqcyr.mongodb.net/dc_fs12?retryWrites=true&w=majority`
)
.then(() => {
    console.log('BD conectado com sucesso!!!')
})
.catch(error => {
    console.log('Erro ao conectar no BD', error)
})

app.listen(PORT, () => {
  console.log(`Example app listening on port http://${HOST}:${PORT}`)
})