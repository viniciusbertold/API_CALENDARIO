import {Request, Response} from 'express';
import { getRepository } from 'typeorm';
import Agenda from '../entities/AGENDA';
import Usuario from '../entities/USUARIO';

function agendaRep(){
    return getRepository(Agenda)
}

function userRep(){
    return getRepository(Usuario)
}
export default {
    async create(req: Request, res: Response){
        const {COR, NOME} = req.body;
        let CD_USUARIO = req.id_usuario, USUARIO;
        USUARIO = CD_USUARIO;
        const existeAgenda = await agendaRep().findOne({where: {COR, CD_USUARIO}});
        const usuario = await userRep().findByIds([USUARIO])

        if(existeAgenda){
            return res.status(400).json({MENSAGEM: 'COR JA FOI USADA'})
        }else{
            const create = agendaRep().create({
                NOME,
                COR,
                CD_USUARIO,
                USUARIO: usuario
            })
            const created = await agendaRep().save(create)
            return res.status(201).json(created)
        }
    },

    async show(req: Request, res: Response){
        let CD_USUARIO = req.id_usuario;
        const agendas = await agendaRep().find({relations: ['USUARIO'], where:{CD_USUARIO}})
        console.log("agendas: " + JSON.stringify(agendas))
        return res.status(200).json(agendas)
    }
}