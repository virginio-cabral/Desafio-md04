import { Router } from "express";
import { acessoUsuario, cadastrarUsuario } from "./controladores/Usuario";
import listarMaterias from "./controladores/Materias";
import autenticarToken from "./intermediarios/autenticarToken";


const rotas = Router()

rotas.post('/usuarios', cadastrarUsuario)
rotas.post('/login', acessoUsuario)
rotas.get('/materias',autenticarToken, listarMaterias)
rotas.post('/resumos', autenticarToken, )
rotas.get('/resumos', autenticarToken)
rotas.put('/resumos/:id', autenticarToken)
rotas.delete('/resumo:id', autenticarToken)

export default rotas;