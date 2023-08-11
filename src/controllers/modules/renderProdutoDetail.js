import { render } from "./renderListProductsIndex.js";


export default function prodDetails() {
  
  const prodClicadoLocal = JSON.parse(localStorage.getItem('prodClicado'));
  const prodLocal = JSON.parse(localStorage.getItem('produtos'))
  const prodDetailCard = document.querySelector('[data-prodDetail]');
  
  function renderCardDetail(prodClicado){
    prodDetailCard.innerHTML = `
    <div class="container__produto__detailImg">
      <img src="${prodClicado.img}" alt="${prodClicado.titulo}">
    </div>
  
    <div class="container__produto__detailDescription flex collumn">
     <h1 class="title">${prodClicado.titulo}</h1>
     <p>${prodClicado.preco}</p>
     <p class="desc">${prodClicado.desc}</p>
    </div>
    `
  }
  
  function renderListaSemelhantes(dataCategoria){
    const ulSemelhantes = document.querySelector('[data-lista-produtosSemelhantes]');
    if(ulSemelhantes){
      dataCategoria.forEach(produto => {
        ulSemelhantes.appendChild(render.renderProdutos(produto.titulo, produto.preco, produto.imageURL, "./produtoDetail.html", produto.descricao, produto.categoria))
      })
    }
  }
  
  if(prodClicadoLocal){
    const prodSemelhantes = prodLocal.filter(prod => prod.categoria.split(', ')[0].includes(prodClicadoLocal.categoria.split(', ')[0]))
    
    if(prodSemelhantes){ 
      renderListaSemelhantes(prodSemelhantes)
    }
  }
  
  if(prodClicadoLocal && prodDetailCard){
    renderCardDetail(prodClicadoLocal)
  }
}




