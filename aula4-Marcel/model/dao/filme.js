/************************************************************************************************************
 * Objetivo: Arquivo responsavel pelo acesso ao Banco de dados MySQL, aqui faremos o CRUD na tabela filmes
 * Data: 01/02
 * Autor: Maria Clara Furtado
 * Versão: 1.0
 * 
************************************************************************************************************/

//Import da biblioteca do prisma client para manipular scripst SQL
const { PrismaClient } = require( '@prisma/client' );
const { Sql } = require('@prisma/client/runtime/library');

//Instancia da classe PrismaClient
const prisma = new PrismaClient();

//Função para inserir um filme no BD
const insertFilme = async function(dadosFilme){

    
    
        let sql;

        if(dadosFilme.data_relancamento != '' && 
           dadosFilme.data_lancamento != null &&
           dadosFilme.data_lancamento != undefined
           ){

         sql = `insert into tbl_filmes (nome, 
                                       sinopse,
                                       duracao,
                                       data_lancamento,
                                       data_relancamento,
                                       foto_capa, 
                                       valor_unitario
        ) values (
                         '${dadosFilme.nome}',
                         '${dadosFilme.sinopse}',
                         '${dadosFilme.duracao}',
                         '${dadosFilme.data_lancamento}',
                         '${dadosFilme.data_relancamento}',
                         '${dadosFilme.foto_capa}',
                         '${dadosFilme.valor_unitario}'
        )`
            
    }else{
        sql = `insert into tbl_filmes (nome, 
                                       sinopse,
                                       duracao,
                                       data_lancamento,
                                       data_relancamento,
                                       foto_capa, 
                                       valor_unitario
        ) values (
                          '${dadosFilme.nome}',
                          '${dadosFilme.sinopse}',
                          '${dadosFilme.duracao}',
                          '${dadosFilme.data_lancamento}',
                           null,
                          '${dadosFilme.foto_capa}',
                          '${dadosFilme.valor_unitario}'
)`;
            
    }
    
    try{
        //$executeRawUnsafe() -> serve para executar scripts sem retorno de dados
          //(insert, update e delet)
        //$queryRawUnsafe() ->  serve para executar scripts sem retorno de dados (select)
        
        let result = await prisma.$executeRawUnsafe(sql);
       
        if(result)
           return true;
        else
           return false;
        
    } catch (error) {
       
        return false;
    }
    
}

//Função para atualizar um filme no BD
const updateFilme = async function(){
}

//Funçãp para excluir um filme no BD
const deleteFilme = async function(){
}

//Funçao para listar todos os filmes do BD
const selectAllFilmes = async function(){

    //Script SQL para Banca de dados
    let sql = 'select * from tbl_filmes';

    //.$queryRawUnsafe(sql) -> sempre usar
    //.$queryRawU('select * from tbl_filmes')
    // await = esperar o "resultado"

    //Executa o script SQL no Banco de Dados e recebe o retorno dos dados
    let rsFilmes = await prisma.$queryRawUnsafe(sql);

    //Validação para retornar os dados
    if( rsFilmes.length > 0) 
       return rsFilmes;
    else
       return false;

}

const selectByNome = async function (nome){
 
    try {

    let sql = `select * from tbl_filmes where nome LIKE "%${nome}%"`
    let rsFilmes = await prisma.$queryRawUnsafe(sql);

        return rsFilmes;
    } catch (error) {
        return false
    }
    
}

//Função para buscar um filme no BD filtrando pelo ID
const selectByIdFilme = async function(id){

    try {

    //Script SQL para filtrar pelo ID
    let sql = `select * from tbl_filmes where id =  ${id}`

    //Executar o SQL no Banco de Dados
    
    let rsFilme = await prisma.$queryRawUnsafe(sql);

   return rsFilme;
   
  } catch (error) {
        return false
    }
}

//Função que devolve o id do último filme criado
const selectLastId = async function(){

    try {

        //Script SQL para selecionar o id do último filme
        let sql = `select cast(last_insert_id() AS DECIMAL) as id from tbl_filmes limit 1;`
    
        //Executar o SQL no Banco de Dados
        let rsFilme = await prisma.$queryRawUnsafe(sql);
    
       return rsFilme;
       
      } catch (error) {
            return false
        }
     

}



module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByNome,
    selectByIdFilme,
    selectLastId
}
