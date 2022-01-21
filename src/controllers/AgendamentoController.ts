import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Agendamento from '../entities/AGENDAMENTO';
import moment from 'moment';

function AgendamentoRep(){
    return getRepository(Agendamento);
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

        const create = AgendamentoRep().create({
            CD_AGENDA, 
            EVENTO,
            DESCRICAO,
            DATA: DT_ATUAL_FORMAT,
            CD_USUARIO: req.id_usuario
        })
        const created = await AgendamentoRep().save(create)
        return res.status(201).json(created)
    },
    async show(req: Request, res: Response){
        const agendamento = await AgendamentoRep().find({where:{CD_USUARIO: req.id_usuario}, relations: ['AGENDA', 'USUARIO']})
        return res.status(200).json(agendamento)
    },
    async update(req: Request, res: Response){
        const {CD_AGENDAMENTO} = req.params;
        const {
            EVENTO,
            DESCRICAO,
            DATA,
            CD_AGENDA
        } = req.body;

        const existeAgendamento = await AgendamentoRep().findOne({where: {CD_USUARIO: req.id_usuario, CD_AGENDAMENTO}})

        if(existeAgendamento){
            await AgendamentoRep().update(CD_AGENDAMENTO, {CD_AGENDA, EVENTO, DESCRICAO, DATA})
            return res.status(200).json({MENSAGEM: 'ALTERADO COM SUCESSO'})
        }else{
            return res.status(400).json({MENSAGEM: 'AGENDAMENTO NÃO ENCONTRADO'})
        }
    },
    async delete(req: Request, res: Response){
        const {CD_AGENDAMENTO} = req.params;
        const existeAgendamento = await AgendamentoRep().find({where: {CD_USUARIO: req.id_usuario, CD_AGENDAMENTO}})

        if(existeAgendamento){
            await AgendamentoRep().delete(CD_AGENDAMENTO)
            return res.status(200).json({MENSAGEM: 'DELETADO COM SUCESSO'})
        }else{
            return res.status(400).json({MENSAGEM: 'AGENDAMENTO NÃO ENCONTRADO'})
        }
    }
}