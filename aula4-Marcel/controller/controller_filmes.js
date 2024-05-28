/************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consistência de dados das  requisicões da API de filmes
 * Data: 01/02
 * Autor:Maria Clara Furtado
 * Versão: 1.0
 * //para conversar direto com o banco
************************************************************************************************************/

//Import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

//Import do arquivo DAO que fará a comunicação com o Banco de Dados
const filmeDAO = require('../model/dao/filme.js')

//Função para validar e inserir um novo filme
const setInserirNovoFilme = async function(dadosFilme, contentType){

    try{


    if(String (contentType).toLowerCase()== 'application/json'){


    //Cria o objeto JSON para devolver dados crados na requisição
    let novoFilmeJson = {};

    //Validação de campos obrigatórios ou com digitação inválida
    if(dadosFilme.nome == ''           || dadosFilme.nome == undefined              || dadosFilme.nome == null               || dadosFilme.nome.length > 80               ||
    dadosFilme.sinopse == ''           || dadosFilme.sinopse == undefined           || dadosFilme.sinopse == null            || dadosFilme.sinopse.length > 65000         ||
    dadosFilme.duracao == ''           || dadosFilme.duracao == undefined           || dadosFilme.duracao == null            || dadosFilme.duracao.length > 8             ||
    dadosFilme.data_lancamento == ''   || dadosFilme.data_lancamento == undefined   || dadosFilme.data_lancamento == null    || dadosFilme.data_lancamento.length != 10   ||
    dadosFilme.foto_capa == ''         || dadosFilme.foto_capa == undefined         || dadosFilme.foto_capa == null          || dadosFilme.foto_capa.length > 200         ||
    dadosFilme.valor_unitario.length > 6  
    ){

        return message.ERROR_REQUIRED_FIELDS; //400

    }else{
 
        let validateStatus = false;

        //Validação da data de relançamento, já que ela não é obriogatória no Banco de Dados
        if(dadosFilme.data_relancamento != null      &&
           dadosFilme.data_relancamento != ''        &&
           dadosFilme.data_relancamento != undefined ){

            //Validação para vereficar se a data está com a quantidade de digitos correto
           if(dadosFilme.data_lancamento.length != 10){
              return message.ERROR_REQUIRED_FIELDS; //400
        }else{
              validateStatus = true;
        }
    }else{
        validateStatus =true
    }

     //Validação para verificar se podemos encaminhar os dados para o DAO
     if(validateStatus){

        //encaminha os dados do Filme para o DAO inserir no BD
        let novoFilme = await filmeDAO.insertFilme(dadosFilme);


        //Validação para verificar se o DAO inseriu os dados do BD
        if(novoFilme){

            //Cria o JSON que retorna o id do ultimo filme
            let idUltimo = await filmeDAO.selectLastId();
            dadosFilme.id = idUltimo[0].id

            //Cria JSON de retorno de dados (201)
            novoFilmeJson.filme = dadosFilme;
            novoFilmeJson.status = message.SUCESS_CREATED_ITEM.status;
            novoFilmeJson.status_code = message.SUCESS_CREATED_ITEM.status_code;
            novoFilmeJson.message = message.SUCESS_CREATED_ITEM.message;

            return novoFilmeJson;//201

        }else{
            return message.ERROR_INTERNAL_SERVER_DB; //500
        }

       }
     }
   }else{
     return message.ERRROR_CONTENT_TYPE; //415
     }

     }catch(error){
       return message.ERROR_INTERNAL_SERVER //500 erro na controller
       }
}
    try{
//Funçaõ para validar e atualizar um filme
const setAtualizarFilme = async function(){
}

//Funçaõ para excluir um filme
const setExcluirFilme = async function(){
}

//função para retornar todos os filmes
const getListarFilmes = async function(){

    // Cri o objeto JSON
    let filmesJSON = {};

    //Chama a funcão do DAO para retornar os dados da tabela de filmes
    let dadosFilmes = await filmeDAO.selectAllFilmes();

    // Validação para verificar s existem dados 
    if (dadosFilmes){

        if(dadosFilmes.length > 0){
            // Cria o JSON para devolver para o APP
        filmesJSON.filmes = dadosFilmes;
        filmesJSON.quantidade = dadosFilmes.length;
        filmesJSON.status_code = 200;
        return filmesJSON;
        } else {
            return message.ERROR_NOT_FOUND
        } 
    }else{
        return message.ERROR_INTERNAL_SERVER_DB; 
    }
}
    }catch(error){
        return message.ERROR_INTERNAL_SERVER;
    }

     try{
const getBuscarFilmeNome = async(nome) => {
    // Cri o objeto JSON

    let nomeFilme = nome
    let filmesJSON = {};

   if (nomeFilme == '' || nomeFilme == undefined){
       return message.ERROR_INVALID_ID
   } else {
        //Chama a funcão do DAO para retornar os dados da tabela de filmes
    let dadosFilmes = await filmeDAO.selectByNome(nome)


    if(dadosFilmes){
       if(dadosFilmes.length > 0){
               filmesJSON.filme = dadosFilmes;
               filmesJSON.status_code = 200;

               // console.log(filmesJSON)

               return filmesJSON;
       } else {
           return message.ERROR_NOT_FOUND;
       }
    } else {
       return message.ERROR_INTERNAL_SERVER_DB
    }

   }
}
     }catch(error){return message.ERROR_INTERNAL_SERVER_DB}


     try{
//Função para buscar um filme pelo ID
const getBuscarFilme = async function(id){

    //Recebe o ID do filme
    let idFilme = id;
    //Cria o objeto JSON
    let filmesJSON= {};

    //Validação para vereficar se o ID é valido (vazio, indefinido ou não númerico)
    if(idFilme == '' || idFilme == undefined || isNaN(idFilme)){
        return message.ERROR_INVALID_ID; //400
    }else{

        //Encaminha o ID para o DAO buscar no Banco de Dados 
        let dadosFilme = await filmeDAO.selectByIdFilme(idFilme);

        //Verifica se o DAO retornou dados
        if(dadosFilme){

            //Validação para vereficar a quantidade de itens retornados
            if(dadosFilme.length > 0){

            //Cria o JSON para retorno
            filmesJSON.filme = dadosFilme;
            filmesJSON.status_code = 200;
            
            return filmesJSON;
        
        }else{
            return message.ERROR_NOT_FOUND; //404
        }

        }else {
            return message.ERROR_INTERNAL_SERVER_DB; //500
        }
    }

}
}catch(error){return message.ERROR_INTERNAL_SERVER_DB}

     
module.exports = {
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilmeNome,
    getBuscarFilme
}