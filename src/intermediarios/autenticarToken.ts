import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

export default function autenticarToken(req: Request, res: Response, next: NextFunction) {
    const autHeader =  req.headers['authorization'];
    
    if (!autHeader || !autHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            mensagem: "Falha na autenticação"
        })
    }

    const token = autHeader.split(' ')[1];

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            return res.status(403).json({
                mensagem: "Falha na autenticação"
            });
        }
        
        next();

    });
    
}
