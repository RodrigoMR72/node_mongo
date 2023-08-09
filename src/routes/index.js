import express from "express";
import { routerUsuario } from "./usuarioRouter.js";



export const routes = (app) => {

    
    // endpoint inicial
    app.get('/', (req, res) => {
        res.send('Servidor rodando!!!')
  });

  app.use(express.json(), routerUsuario);

    
};