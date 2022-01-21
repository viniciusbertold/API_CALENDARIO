import {Request, Response} from 'express';
import { getRepository } from 'typeorm';
import Usuario from '../entities/USUARIO';
import Agenda from '../entities/USUARIO';

function usuarioRep(){
    return getRepository(Usuario)
}

export default {

    async create(req: Request, res: Response){
        const {NOME, SENHA, EMAIL} = req.body;

        const existeEmail = await usuarioRep().findOne({EMAIL})
        if(existeEmail){
            return res.status(400).json({MENSAGEM: 'USUARIO JA EXISTE PARA O EMAIL INFORMADO'})
        }else{
            const createUser = usuarioRep().create({
                NOME, SENHA, EMAIL
            })
            const created = await usuarioRep().save(createUser)
            return res.status(201).json(created)
        }
    },

    async update(req: Request, res: Response){
        const {EMAIL, SENHA} = req.body;

        let CD_USER = req.id_usuario;

        const existeUser = await usuarioRep().findOne(CD_USER, {where: {EMAIL}})

        
    },
    async show(req: Request, res: Response){
        let CD_USUARIO = req.id_usuario;
        const usuarios = await usuarioRep().find({relations: ['AGENDA'], where: {CD_USUARIO}})
        return res.status(200).json(usuarios)
    }

    
}