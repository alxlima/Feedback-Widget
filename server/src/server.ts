import express from 'express'
import cors from 'cors'
import { routes } from './routes';

const app = express();

//biblioteca utilizada controle segurança back-End - não permitir front-ends inadequados acessem informações aplicação
app.use(cors()); // em produção add (https://local host ip server)

//Antes de executar as rotas, adiciono middleware - express para corpo requisição formato Json.
app.use(express.json());

//importo as minha rotas
app.use(routes);


// test de request de resp .
app.get('/users',(req,res)=>{
    return res.send('Teste link servidor!');
})

// create host e port de aces meu server
app.listen(3333, () => {
    console.log('HTTP server running!');
});

