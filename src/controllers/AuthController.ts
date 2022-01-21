import {Request, Response} from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuario from '../entities/USUARIO';

export default {
    async authenticate(req: Request, res: Response){
        const userRep = getRepository(Usuario)
        const {EMAIL, SENHA} = req.body;
    
        const usuario = await userRep.findOne({where: {EMAIL}})

        if(!usuario){
            return res.status(401).json({MENSAGEM: 'USUARIO NÃO ENCONTRADO'})
        }

        const validPass = await bcrypt.compare(SENHA, usuario.SENHA)

        if(!validPass){
            return res.status(401).json({MENSAGEM: 'SENHA INCORRETA'})
        }
        //ORDEM: {O QUE DEVERÁ SER ARMAZENADO}, SEGREDO, {TEMPO PARA EXPIRAR}
        const token = jwt.sign({id: usuario.CD_USUARIO}, 'secret', {expiresIn: '1d'} )
        return res.status(200).json(token)
    }
}