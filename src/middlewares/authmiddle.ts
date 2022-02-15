import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import {getRepository} from 'typeorm'
import Usuario from '../entities/USUARIO';

interface TokenPayLoad{
    id: number;
    iat: number;
    exp: number;
}

function userRep(){
    return getRepository(Usuario)
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
    },
    async cd_user(req: Request, res: Response, next: NextFunction){
        const {EMAIL} = req.body;
    
        const existeEmail = await userRep().findOne({EMAIL})
    
        if(existeEmail){
            req.id_email = existeEmail.CD_USUARIO as number;
            return next()
        }else{
            req.id_email = 0;
            return next();
        }
            
        }
}