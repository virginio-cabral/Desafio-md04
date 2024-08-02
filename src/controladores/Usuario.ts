import { Request, Response } from 'express';

export default function cadastrarUsuario(req: Request, res: Response) {
    const {nome, email, senha} = req.body

    if (!nome || !email || !senha) {
        return res.status(400).json({
            mensagem: 'Todos os campos são obrigatórios!'
        })
    }

}