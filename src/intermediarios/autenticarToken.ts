// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken"

// export default function autenticarToken(req: Request, res: Response, next: NextFunction) {
//     const autHeader =  req.headers['authorization'];
    
//     if (!autHeader || !autHeader.startsWith('Bearer ')) {
//         return res.status(401).json({
//             mensagem: "Falha na autenticação"
//         })
//     }

//     const token = autHeader.split(' ')[1];

//     jwt.verify(token, 'secret', (err, decoded) => {
//         if (err) {
//             return res.status(403).json({
//                 mensagem: "Falha na autenticação"
//             });
//         }
        
//         next();

//     });
    
// }

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Adicione a interface para `req.user` se estiver usando TypeScript
interface User {
    id: string;
    [key: string]: any; // Permite adicionar outras propriedades se necessário
}

declare global {
    namespace Express {
        interface Request {
            user?: User; // Adiciona a propriedade `user` ao Request
        }
    }
}

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Assumindo que o token é enviado no formato "Bearer token"

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || '', (err, user) => {
            if (err) return res.sendStatus(403); // Token inválido ou expirado

            req.user = user as User; // Adiciona o usuário ao req
            next();
        });
    } else {
        res.sendStatus(401); // Cabeçalho de autorização ausente
    }
};

export default authenticateJWT;
