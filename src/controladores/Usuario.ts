import { Request, Response } from "express"
import pool from "../conexaoBd"
import * as bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const cadastrarUsuario = async (req: Request, res: Response) => {

    const {nome, email, senha} = req.body
    
    if (!nome || !email || !senha) {
        return res.status(400).json({
            mensagem: "Todos os campos são obrigatórios"
        });
    }
    
    try {
        const {rows: usuariosCadastrados} = await pool.query(`
            SELECT * FROM usuarios WHERE email = $1
            `, [
                email
            ]) ;
            
            
        if (usuariosCadastrados.length > 0) {
            return res.status(409).json({
                mensagem: "E-mail já cadastrado"
            })
        }

        const novaSenha = await bcrypt.hash(senha, 10);

        const {rows: novoUsuario} = await pool.query(`
            INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email
            `, [
                nome,
                email,
                novaSenha
            ]);

            return res.status(201).json(novoUsuario[0]);
                  
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro interno do servidor"
        })
    }
}

export const acessoUsuario = async (req: Request, res: Response) => {
    const {nome, email, senha} = req.body
    
    if (!email || !senha) {
        return res.status(400).json({
            mensagem: "Todos os campos são obrigatórios"
        });
    }
    

    try {
        const {rows: usuarioCadastrado} = await pool.query(`
            SELECT senha FROM usuarios WHERE email = $1
            `, [
                email
            ]) ;

            if (usuarioCadastrado.length === 0) {
                return res.status(400).json({
                    mensagem: "Email ou senha inválidos"
                })
            }
            

            const aSenhaEstáCorreta = await bcrypt.compare(senha, usuarioCadastrado[0].senha);

            if (!aSenhaEstáCorreta) {
                return res.status(400).json({
                    mensagem: "Email ou senha inválidos"
                })
            }
            
            const conteudoToken = {nome, email}
            const token = jwt.sign(conteudoToken, 'secret', { expiresIn: '1h'});
            
            return res.status(200).json({token});

    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro do servidor"
        })
    }
} 