'use strict'
import {getFilmes, postFilme, selectNameFilmes} from "./filmes.js"

console.table(await getFilmes())

import { getFilmesId } from "./filmes.js"

const search = new URLSearchParams(window.location.search).get('search')
const searchBar = document.getElementById('searchBar')
const container = document.getElementById('container')

const searchButton = document.getElementById('searchButton')
searchButton.addEventListener('click', pesquisar)
async function pesquisar(){
    const pesquisaFilme = await selectNameFilmes(searchBar.value)
    const listaFilmes = pesquisaFilme.nome
    apagarListaFilmes()

    listaFilmes.forEach(filme => {
        console.log(filme)
        criarCard(filme)
    });
}

searchBar.addEventListener('keypress', (event)=>{
    if(event.key === "Enter"){
        pesquisar()
    }
})
function apagarListaFilmes(){
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function criarCard(filme) {
    container.classList.add('gap-4');
    const card = document.createElement('div');
    card.classList.add('relative', 'mb-6', 'max-w-sm', 'mx-auto');
    card.style.border = '35px solid red'; 

    // Criar elementos para o título, texto e imagem
    const titulo = document.createElement('h2');
    titulo.textContent = filme.nome;
    titulo.classList.add('text-lg', 'font-bold', 'text-red', 'mb-2', 'text-center');

    const texto = document.createElement('p');
    texto.textContent = filme.sinopse;
    texto.classList.add('w-72', 'opacity-0', 'transition-opacity', 'ease-in-out', 'duration-300', 'absolute', 'bottom-0', 'left-0', 'bg-black', 'text-white', 'p-2', 'rounded-lg');

    const capa = document.createElement('img');
    capa.src = filme.foto_capa;
    capa.classList.add('w-full', 'h-full', 'object-cover', 'rounded-lg', 'mb-2');

    // Adicionar evento de hover para mostrar e ocultar a sinopse com transição suave
    card.addEventListener('mouseenter', () => {
        texto.classList.add('opacity-100');
    });

    card.addEventListener('mouseleave', () => {
        texto.classList.remove('opacity-100');
    });

    // Adicionar elementos ao card
    card.append(capa, titulo, texto);
    container.appendChild(card);

    // Adicionar evento de clique para redirecionar para a página 'sobre.html'
    card.addEventListener('click', () => {
        window.location.href = '../sobre.html?id=' + filme.id;
    });
}

async function preencherContainer(){
    const container = document.getElementById('lista')

    const filmes = await getFilmes()

    filmes.forEach(filme => {
        criarCard(filme)
    })
}





preencherContainer()