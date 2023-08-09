import { Usuario } from "../models/Usuario.js";



export default class UsuarioController {

    static inserir = async (req, res) => {
        const { nome, idade, ativo, email } = req.body;
        const usuario = { nome, idade, ativo, email };
      
        const usuarioDB = await Usuario.create(usuario);
      
        res.status(201).json({
          data: usuarioDB,
          msg: "Usuário criado com sucesso!",
        });
      
      }

    static atualizar = async (req, res) => {

        const id = req.params.id;
      
        const {nome, idade, ativo, email} = req.body
      
        const usuario = {nome, idade, ativo, email};
      
        const usuarioBD = await Usuario.updateOne({_id: id}, usuario);
      
        res.status(200).json("Usuário atualizado com sucesso");
      
      }

    static buscarTodos = async (req, res) => {

        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
      
      }


      static buscarPorId = async (req, res) => {

        const id = req.params.id;
      
        const usuario = await Usuario.findOne({_id: id});
      
        res.status(200).json(usuario);
      
      }

      static excluir = async (req, res) => {

        const id = req.params.id;
      
        const usuarioBD = await Usuario.findOne({_id: id});
      
        await Usuario.deleteOne({_id: usuarioBD.id});
      
        res.status(200).json("Usuário deletado com sucesso");
      
      }



}