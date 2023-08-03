import mongoose from "mongoose";

export const Usuario = mongoose.model('usuario', {
    nome: String,
    idade: Number,
    ativo: Boolean,
    email: String

})