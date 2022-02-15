import {Router} from 'express';

import UsuarioController from './controllers/UsuarioController';
import AuthController from './controllers/AuthController';
import AgendaController from './controllers/AgendaController';
import EventoController from './controllers/EventoController';

import authmiddle from './middlewares/authmiddle';

const routes = Router();

//ROTA DE CONTROLE DE USUARIO E AUTENTICAÇÃO
routes.get('/usuario', authmiddle.auth, UsuarioController.show)
routes.post('/usuario', UsuarioController.create);
routes.post('/autenticacao', AuthController.authenticate);

//ROTA PARA CONTROLE DE AGENDA
routes.get('/agenda', authmiddle.auth, AgendaController.show);
routes.get('/agenda/:CD_AGENDA', authmiddle.auth, AgendaController.showOne);
routes.post('/agenda', authmiddle.auth, AgendaController.create);
routes.post('/agenda_usuario/:CD_AGENDA', authmiddle.auth, authmiddle.cd_user, AgendaController.inserir_agenda_usuario);
routes.put('/agenda/:CD_AGENDA', authmiddle.auth, AgendaController.update);
routes.delete('/agenda_usuario/:CD_AGENDA/:CD_USUARIO', authmiddle.auth, authmiddle.cd_user, AgendaController.delete_agenda_usuario);
routes.delete('/agenda/:CD_AGENDA', authmiddle.auth, AgendaController.delete_agenda);

//ROTA PARA CONTROLE DE EVENTO
routes.get('/evento', authmiddle.auth, EventoController.show);
routes.post('/evento', authmiddle.auth, EventoController.create);
routes.put('/evento/:CD_EVENTO', authmiddle.auth, EventoController.update)
routes.delete('/evento/:CD_EVENTO', authmiddle.auth, EventoController.delete)

export default routes;

