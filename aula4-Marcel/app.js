/************************************************************************************************************
 * Objetivo: Criação do Back-end inicial do projeto (alunos) 
 * Data: 25/01
 * Autor: Maria Clara Furtado
 * Versão: 1.0
 * 
************************************************************************************************************/
/*
   Para realizar o acesso a Banco de Dados, precisamos instalar algumas bibliotecas:

    - SEUQLIZE -> É uma biblioteca mais antiga
    - PRISMA ORM -> É a biblioteca mais atual (será utilizada no projeto)
    - FASTFY ORM -> É a biblioteca mais atual
    
    Para instalar o PRISMA:

    - npm install prisma --save (Irá realizar conexão com Banco de Dados)
    - npm install @prisma/client --save (Irá executar os scripts SQL np Banco de Dados)

    Após a instalação das bibliotecas, devemos inicializar o prisma no projeto:

    - npx prisma init 


*/
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const { request } = require('http');

const app = express();

app.use((request,response,next) =>{
    response.header('Acess-Control-Allow-Origin','*');
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    app.use(cors())
    
    next();
})

/**************Import dos arquivos da controller do projeto********************/

const controllerFilmes = require('./controller/controller_filmes.js');

/*****************************************************************************/


//Criando um objeto para controlar a chegada dos dados da requisição em formato JSON
//Usado com post e put
const bodyParserJSON = bodyParser.json();


//EndPoint: Versão 1.0 - retorna todos os filmes do arquivo filmes.js
app.get('/v1/acmefilmes/listarfilmes', cors(), (request,response,next) => {

    let filme = require('./controller/funcao.js');
    let filmes = filme.listarFilmes();

        response.json(filmes);
        express.response.status(8080);
})

//EndPoint: Versão 1.0 - retorna todos os filmes do arquivo filmes.js por id
app.get('/v1/filmesAcme/filme/:id', cors(), async function(request,response,next){

    let mostrarFilme = request.params.id
    let filme = require ('./controller/funcoes.js');
    let filmes = filme.filme(mostrarFilme);

        response.json(filmes);
        response.status(200);
})

//EndPoint: Versão 2.0 - retorna todos os filmes do Banco de Dados
app.get('/v2/acmefilmes/filmes', cors(), async function(request, response){

    //Chama a função da controller para retorNAR FILMES
    let dadosFilmes = await controllerFilmes.getListarFilmes();

    //Validação para retornar o JSON dos filmes ou retornar o 404
    if(dadosFilmes){
        response.json(dadosFilmes);
        response.status(200);
    }else{
        response.json({message: 'Nnehum registro foi encontrado'})
        response.status(404);
    }

})

app.get('/v1/filmesAcme/filmeNome', cors(), async function(request,response,next){

    let nomeFilme = request.query.nome
    let filmeNome = await controllerFilmes.getBuscarFilmeNome(nomeFilme)

        response.json(filmeNome);
        response.status(filmeNome.status_code)
});

//EndPoint: retorno o filme filtrando por id
app.get('/v2/acmefilmes/filme/:id', cors(), async function(request,response,next){

    //Recebe o ID da requisição
    let idFilme = request.params.id;

    //Encaminh o ID para o controller buscar o filme
    let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme);

    response.status(dadosFilme.status_code);
    response.json(dadosFilme);

});

app.post('/v2/acmefilmes/filme', cors(), bodyParserJSON, async function(request, response){

    //Recebe content-type com o tipo de dados encaminhados na requisição
    let contentType = request.headers['content-type']

    //Rece todos os dados encaminhados na requisição pelo body
    let dadosBody = request.body;

    //Encaminha os dados para o controller enviar para o DAO
    let resultDadosNovoFilme = await controllerFilmes.setInserirNovoFilme(dadosBody, contentType);

    response.status(resultDadosNovoFilme.status_code);
    response.json(resultDadosNovoFilme);

});

//Executar a API e faz ela aguardando requisições
app.listen('8080', function(){
    console.log("API funcionando e aguuardando requisições");
})
