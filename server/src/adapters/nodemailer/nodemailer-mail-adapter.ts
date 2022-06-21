import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapters";


// Configuraões do SMTP - para transporte de Email resposta cliente sobre os envios Feedbacks.
const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "06a1d354ce32a9",
      pass: "6beddab0921fda"
    }
  });


export class NodemailerMailAdapter implements MailAdapter{
    async sendMail({subject, body}: SendMailData){

    //função de Envio do Email resposta do feedback ao  client.
      await transport.sendMail({
        from:'Equipe Feedget <oi@feedget.com>',
        to: 'Alex Lima <alex_lima2013@hotmail.com>',
        subject,
        html: body,
    }); 

    /*await transport.sendMail({
        from:'Equipe Feedget <oi@feedget.com>',
        to: 'Alex Lima <alex_lima2013@hotmail.com>',
        subject:'Novo feedback',
        html:[
           `<div style="font-family: san-serif; font-size:16px; color: #111">`,
           `<p>Tipo do feedback: ${type}</p>`,
           `<p>Comentario: ${comment}</p>`,
           `</div>`
    ].join('\n')
    });*/ 
  

    };
}