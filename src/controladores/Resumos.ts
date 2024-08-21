import { Request, Response } from "express";
import pool from "../conexaoBd";

export const criarResumo = async (req: Request, res: Response) => {
    const { materiaId, titulo, topicos } = req.body;

    if (!materiaId || !topicos || !Array.isArray(topicos) || topicos.length === 0) {
        return res.status(400).json({
            mensagem: "Todos os campos são obrigatórios"
        });
    }

    try {
        const { rowCount: materiaExiste } = await pool.query("SELECT 1 FROM materias WHERE id = $1", [materiaId]);

        if (!materiaExiste) {
            return res.status(404).json({
                mensagem: "Matéria não encontrada"
            });
        }

        const tituloResumo = titulo || "Sem título";

        const topicosString = topicos.join(", ");

        const { rows: novoResumo } = await pool.query(`
            INSERT INTO resumos (materiaId, titulo, topicos, descricao, usuarioId) 
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, usuarioId, materiaId, titulo, topicos, descricao, criado;
        `, [
            materiaId, tituloResumo, topicosString, "Descrição temporária"]);

        return res.status(201).json(novoResumo[0]);
    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro ao criar resumo"
        });
    }
};



export const listarResumos = async (req: Request, res: Response) => {
    const { materia } = req.query;

    try {
        let query = "SELECT * FROM resumos";
        const params: any[] = [];

        if (materia) {
            query += " WHERE materia = $1";
            params.push(materia);
        }

        if (params.length > 0) {
            query += " AND materia = $1";
        }

        const { rows: resumos } = await pool.query(query, params);
        return res.status(200).json(resumos);
    } catch (error) {
        console.error("Erro ao listar resumos:", error);
        return res.status(500).json({
            mensagem: "Erro ao listar resumos"
        });
    }
};

export const editarResumo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { materiaId, titulo } = req.body;

    if (!materiaId || !titulo) {
        return res.status(400).json({
            mensagem: "Todos os campos são obrigatórios"
        });
    }

    try {
        const { rowCount: resumoExiste } = await pool.query(`
            SELECT 1 FROM resumos WHERE id = $1
        `, [id]);

        if (!resumoExiste) {
            return res.status(404).json({
                mensagem: "Resumo não encontrado"
            });
        }

        const { rowCount: materiaExiste } = await pool.query("SELECT 1 FROM materias WHERE id = $1", [materiaId]);

        if (!materiaExiste) {
            return res.status(404).json({
                mensagem: "Matéria não encontrada"
            });
        }

        const { rows: resumoAtualizado } = await pool.query(`
            UPDATE resumos 
            SET materiaId = $1, titulo = $2 
            WHERE id = $3 
            RETURNING id, materiaId, titulo, topicos, descricao, criado;
        `, [materiaId, titulo, id]);

        if (resumoAtualizado.length === 0) {
            return res.status(404).json({
                mensagem: "Resumo não encontrado para atualizar"
            });
        }

        return res.status(200).json(resumoAtualizado[0]);
    } catch (error) {
        console.error("Erro ao editar resumo:", error);
        return res.status(500).json({
            mensagem: "Erro ao editar resumo"
        });
    }
};

export const deletarResumo = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const { rowCount: resumoExiste } = await pool.query(`
            SELECT 1 FROM resumos WHERE id = $1
        `, [id]);

        if (!resumoExiste) {
            return res.status(404).json({
                mensagem: "Resumo não encontrado"
            });
        }

        const { rowCount: rowsDeleted } = await pool.query("DELETE FROM resumos WHERE id = $1", [id]);

        if (rowsDeleted === 0) {
            return res.status(404).json({
                mensagem: "Resumo não encontrado para deletar"
            });
        }

        return res.status(204).send();
    } catch (error) {
        console.error("Erro ao deletar resumo:", error);
        return res.status(500).json({
            mensagem: "Erro ao deletar resumo"
        });
    }
};



