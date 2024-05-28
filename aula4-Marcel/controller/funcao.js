/************************************************************************************************************
 * Objetivo: Criação do Back-end inicial do projeto (alunos) 
 * Data: 25/01
 * Autor: Maria Clara Furtado 
 * Versão: 1.0
 * 
************************************************************************************************************/
var  acmefilmes = require ('../modulo/filmes.js')
try{
const listarFilmes = () => {
    let filmes = acmefilmes.filmes
    let filmesArray = []

    filmes.filmes.forEach((filmes) => {
        
       let filmesInfo = {
            id:filmes.id,
            nome:filmes.nome,
            sinopse:filmes.sinopse,
            duracao:filmes.duracao,
            data_lancamento:filmes.data_lancamento,
            data_relancamento:filmes.data_relancamento,
            foto_capa:filmes.foto_capa,
            valor_unitario:filmes.valor_unitario
        }

       filmesArray.push(filmesInfo)
    });

    let filmesJSON = {filmesArray}
    return filmesJSON

}
}catch(error){return message.ERROR_INTERNAL_SERVER_DB}

try{
const filme = (id) => {
    let filmesJ = acmefilmes.filmes
    let arrayteste = filmesJ.filmes
    let filmesArray = []
    let idFilmes = id
    let status = false

    arrayteste.forEach((filme) => {
        if(filme.id == idFilmes){
             let filmesJSON = {
                id:filme.id,
                nome:filme.nome,
                sinopse:filme.sinopse,
                duracao:filme.duracao,
                data_lancamento:filme.data_lancamento,
                data_relancamento:filme.data_relancamento,
                foto_capa:filme.foto_capa,
                valor_unitario:filme.valor_unitario
                }

                status=true
                filmesArray.push(filmesJSON)
        }
    })

    let filmesJSON = {filmesArray}

    if (status){
        return filmesJSON
    } else {
        return false
    }
}
}catch(error){return message.ERROR_INTERNAL_SERVER_DB}

console.log(listarFilmes())
console.log(filme())

module.exports ={
    listarFilmes,
    filme
}