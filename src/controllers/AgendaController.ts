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
        return res.status(200).json(agendas)
    },
    async update(req: Request, res: Response){
        const {CD_AGENDA} =req.params;
        const {COR} = req.body;
        let CD_USUARIO = req.id_usuario;
        const existeAgenda = await agendaRep().findOne(CD_AGENDA, {where: {CD_AGENDA, CD_USUARIO}})

        if(existeAgenda){
            await agendaRep().update(CD_AGENDA, {COR: COR})
            return res.status(200).json({MENSAGEM: 'ALTERADO COM SUCESSO'})
        }else{
            return res.status(400).json({MENSAGEM: 'AGENDA NÃO ENCONTRADO'})
        }

    },
    // async create_agenda_usuario(req: Request, res: Response){
    //     let USUARIO = req.id_email;
    //     let CD_USUARIO = req.id_usuario;
    //     const {CD_AGENDA} = req.params;

    //     const existeUser = await agendaRep().findByIds([USUARIO])
    //     const existeAgenda = await agendaRep().findOne(CD_AGENDA, {where: {CD_USUARIO}})

    //     if(existeAgenda){
    //         const insert = agendaRep().create({
    //             USUARIO: existeUser
    //         })
    //         const created = await agendaRep().save(insert)
    //     }

    // },
    async update_agenda_usuario(req: Request, res: Response){
        let USUARIO = req.id_email;
        let CD_USUARIO = req.id_usuario;
        const {CD_AGENDA} = req.params;

        const existeUser = await agendaRep().findByIds([USUARIO])
        const existeAgenda = await agendaRep().findOne(CD_AGENDA, {where: {CD_USUARIO}})

        if(existeAgenda){
            await agendaRep().update(CD_AGENDA, {USUARIO: existeUser})
            return res.status(200).json({MENSAGEM: 'ALTERADO COM SUCESSO'});
        }else{
            return res.status(400).json({MENSAGEM: 'FALHA NA ALTERAÇÃO'})
        }

    }
}