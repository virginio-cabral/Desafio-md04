import { Request, Response } from "express";
import pool from "../conexaoBd";

export default async function listarMaterias(req: Request, res: Response) {
    
    try {
        const { rows: materias } = await pool.query(`
            SELECT * FROM materias;
        `);

        return res.status(200).json(materias);
    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro ao listar matérias"
        });
    }
    
} 