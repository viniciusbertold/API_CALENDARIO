import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Evento from '../entities/EVENTO';
import moment from 'moment';
import Agenda from '../entities/AGENDA';

function eventoRep(){
    return getRepository(Evento);
}

function agendaRep(){
    return getRepository(Agenda)
}

export default {
    async create(req: Request, res: Response){
        const {
            CD_AGENDA,
            EVENTO,
            DESCRICAO,
            DATA
        } = req.body;

        const DT_ATUAL_FORMAT = moment(DATA).format('YYYY/MM/DD HH:mm:ss')
        const existeAgenda = await agendaRep().createQueryBuilder('AGENDA')
        .leftJoinAndSelect('AGENDA.USUARIO', 'USUARIO')
        .where('(AGENDA_USUARIO.CD_USUARIO = :CD_USUARIO OR AGENDA.CD_USUARIO = :CD_USUARIO) AND (AGENDA_USUARIO.CD_AGENDA = :CD_AGENDA)', 
            {CD_USUARIO: req.id_usuario, CD_AGENDA})
        .getMany()

        if(existeAgenda.length > 0){
            const create = eventoRep().create({
                CD_AGENDA, 
                EVENTO,
                DESCRICAO,
                DATA: DT_ATUAL_FORMAT,
                CD_USUARIO: req.id_usuario
            })
            const created = await eventoRep().save(create)
            return res.status(201).json(created)
            
        }else{
            return res.status(404).json({MENSAGEM: 'AGENDA NÃO ENCONTRADA'})
        }
        
    },
    async show(req: Request, res: Response){
        const evento = await eventoRep().find({relations: ['USUARIO', 'AGENDA'], 
        where: [{CD_USUARIO: req.id_usuario}, {AGENDA: {CD_USUARIO: req.id_usuario}}]})
        return res.status(200).json(evento)
    },
    async update(req: Request, res: Response){
        const {CD_EVENTO} = req.params;
        const {
            EVENTO,
            DESCRICAO,
            DATA,
            CD_AGENDA
        } = req.body;

        const existeEvento = await eventoRep().findOne({where: {CD_USUARIO: req.id_usuario, CD_EVENTO}})

        if(existeEvento){
            await eventoRep().update(CD_EVENTO, {CD_AGENDA, EVENTO, DESCRICAO, DATA})
            return res.status(200).json({MENSAGEM: 'ALTERADO COM SUCESSO'})
        }else{
            return res.status(400).json({MENSAGEM: 'EVENTO NÃO ENCONTRADO'})
        }
    },
    async delete(req: Request, res: Response){
        const {CD_EVENTO} = req.params;
        const existeEvento = await eventoRep().find({where: {CD_USUARIO: req.id_usuario, CD_EVENTO}})

        if(existeEvento){
            await eventoRep().delete(CD_EVENTO)
            return res.status(200).json({MENSAGEM: 'DELETADO COM SUCESSO'})
        }else{
            return res.status(400).json({MENSAGEM: 'EVENTO NÃO ENCONTRADO'})
        }
    }
}