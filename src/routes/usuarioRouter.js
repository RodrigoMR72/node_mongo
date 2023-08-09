import express from "express";
import UsuarioController from "../controllers/usuarioController.js";


export const routerUsuario = express.Router();


routerUsuario
.post('/usuario', UsuarioController.inserir)
.put('/usuario/:id', UsuarioController.atualizar)
.get('/usuarios', UsuarioController.buscarTodos)
.get('/usuario/:id', UsuarioController.buscarPorId)
.delete('/usuario/:id', UsuarioController.excluir)