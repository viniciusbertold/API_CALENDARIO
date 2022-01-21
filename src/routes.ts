import {Router} from 'express';

import UsuarioController from './controllers/UsuarioController';
import AuthController from './controllers/AuthController';
import AgendaController from './controllers/AgendaController';
import AgendamentoController from './controllers/AgendamentoController';

import authmiddle from './middlewares/authmiddle';

const routes = Router();

//ROTA DE CONTROLE DE USUARIO E AUTENTICAÇÃO
routes.get('/usuario', authmiddle.auth, UsuarioController.show)
routes.post('/usuario', UsuarioController.create);
routes.post('/autenticacao', AuthController.authenticate);

//ROTA PARA CONTROLE DE AGENDA
routes.get('/agenda', authmiddle.auth, AgendaController.show);
routes.post('/agenda', authmiddle.auth, AgendaController.create);

//ROTA PARA CONTROLE DE AGENDAMENTO
routes.get('/agendamento', authmiddle.auth, AgendamentoController.show);
routes.post('/agendamento', authmiddle.auth, AgendamentoController.create);
routes.put('/agendamento/:CD_AGENDAMENTO', authmiddle.auth, AgendamentoController.update)
routes.delete('/agendamento/:CD_AGENDAMENTO', authmiddle.auth, AgendamentoController.delete)

export default routes;

