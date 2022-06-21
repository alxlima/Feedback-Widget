import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router()
// GET, POST, PUT, PATCH, DELETE
/*
* GET = Buscar informações
* POST = Cadastrar informações
* PUT = Atualizar informações de ma entidade
* PACTH = Atualizar uma informações única de uma entidade
* DELETE = Deletar uma informação
*/ 

//Rota de cadastro feedbacks
routes.post('/feedbacks', async (req,res)=>{ //[asyc] - assincrona
 const {type, comment, screenshot} = req.body;
//console.log(req.body);

    const prismaFeedbacksRepository =  new PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbacksRepository,
        nodemailerMailAdapter
    )

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot,
    });

    return res.status(201).send(); // [status 201] - status http criação
});



