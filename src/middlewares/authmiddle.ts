import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayLoad{
    id: number;
    iat: number;
    exp: number;
}

export default {
    async auth(req: Request, res: Response, next: NextFunction){
        const {authorization} = req.headers;
        
        if(!authorization){
            return res.status(401).json({MENSAGEM: 'ERRO DE AUTORIZAÇÃO'})
        }

        const token = authorization.replace('Bearer', '').trim();

        try{
            const data = jwt.verify(token, 'secret')
            const {id} = data as TokenPayLoad

            req.id_usuario = id;
            return next()
        }catch{
            return res.status(400).json({MENSAGEM: 'ERRO NA VERIFICAÇÃO'})
        }
    }
}