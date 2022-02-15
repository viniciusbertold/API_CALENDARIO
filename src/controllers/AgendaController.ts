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
        //CODIGO COMENTADO PORQUE NÃO CONSIGO FAZER FUNCIONAR DA MESMA FORMA QUE O CREATE QUERY
        //const agendas = await agendaRep().manager.getId(CD_USUARIO)
        const agendas = await agendaRep().createQueryBuilder('AGENDA')
        .leftJoinAndSelect('AGENDA.USUARIO', 'USUARIO')
        .where('AGENDA_USUARIO.CD_USUARIO = :CD_USUARIO OR AGENDA.CD_USUARIO = :CD_USUARIO', {CD_USUARIO})
        .getMany()
        if(agendas){
            return res.status(200).json(agendas)
        }else{
            return res.status(404).json({MENSAGEM: 'AGENDA NÃO ENCONTRADA'})
        }
        
    },
    async showOne(req: Request, res: Response){
        let CD_USUARIO = req.id_usuario;
        const {CD_AGENDA} = req.params;
        const agenda = await agendaRep().findOne(CD_AGENDA, {where: {CD_USUARIO}, relations: ['USUARIO']})
        if(agenda){
            return res.status(200).json(agenda)
        }else{
            return res.status(401).json({MENSAGEM: 'AGENDA NÃO ENCONTRADA'})
        }
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
    async inserir_agenda_usuario(req: Request, res: Response){
        let USUARIO = req.id_email;
        let CD_USUARIO = req.id_usuario;
        const {CD_AGENDA} = req.params;

        const existeUser = await userRep().findByIds([USUARIO])
        const existeAgenda = await agendaRep().findOne(CD_AGENDA, {where: {CD_USUARIO}, relations: ['USUARIO']})

        if(USUARIO > 0){
            if(existeAgenda){
                existeAgenda.USUARIO.push(...existeUser)
                await agendaRep().save(existeAgenda)
                return res.status(200).json({MENSAGEM: 'ALTERADO COM SUCESSO'});
            }else{
                return res.status(400).json({MENSAGEM: 'AGENDA NÃO ENCONTRADA'})
            }
        }else{
            return res.status(400).json({MENSAGEM: 'EMAIL NÃO ENCONTRADO'})
        }
    },
    async delete_agenda_usuario(req: Request, res: Response){
        let USUARIO = req.id_usuario;
        const {CD_AGENDA, CD_USUARIO} = req.params;
        const existeAgenda = await agendaRep().findOne({CD_USUARIO: USUARIO}, {where: {CD_AGENDA}, relations: ['USUARIO']})
        const a = existeAgenda?.CD_USUARIO
        if(USUARIO > 0){
            if(existeAgenda){
                if(existeAgenda.CD_USUARIO == USUARIO){
                    const deletar = await agendaRep().manager.delete('AGENDA_USUARIO', {CD_USUARIO, CD_AGENDA})
                    return res.status(200).json({MENSAGEM: 'DELETADO COM SUCESSO', deletar})
                }else{
                    return res.status(401).json({MENSAGEM: 'VOCE NÃO TEM PERMISSÃO PARA DELETAR ESSA AGENDA'})
                }
            }else{
                return res.status(404).json({MENSAGEM: 'AGENDA NÃO ENCONTRADA'})
            }
        }else{
            return res.status(404).json({MENSAGEM: 'EMAIL NÃO ENCONTRADO'})
        }
    },
    async delete_agenda(req: Request, res: Response){
        let CD_USUARIO = req.id_usuario;
        const {CD_AGENDA} = req.params;
        const existeAgenda = await agendaRep().findOne(CD_AGENDA, {where: {CD_USUARIO}, relations: ['USUARIO']})
        if(existeAgenda){
            await agendaRep().delete(CD_AGENDA)
            return res.status(200).json({MENSAGEM: 'DELETADO COM SUCESSO'})
        }else{
            return res.status(404).json({MENSAGEM: 'AGENDA NÃO ENCONTRADA'})
        }
    }
}