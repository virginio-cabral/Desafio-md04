import { Router } from "express";
import { acessoUsuario, cadastrarUsuario } from "./controladores/Usuario";

const rotas = Router()

rotas.post('/usuarios', cadastrarUsuario)
rotas.post('/login', acessoUsuario )
rotas.get('/materias', )
rotas.post('/resumos', )
rotas.get('/resumos', )
rotas.put('/resumos/:id', )
rotas.delete('/resumo:id', )

export default rotas;