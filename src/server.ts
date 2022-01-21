import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import './database/config';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(routes);
app.listen(4001);
console.log("INICIADO SEM ERROS");

//aprender a fazer os relacionamentos entre as tabelas que não são de chave compostas