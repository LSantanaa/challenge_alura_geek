import { conectApi } from "./conexao.js";

  const content = document.querySelector('[data-content]');
  
  function renderListas(categoria){
    const divCategoria = document.createElement('div');
    divCategoria.classList.add('container__categoria');
  
    divCategoria.innerHTML= `
      <div class="flex between">
      <h2>${categoria}</h2>
        <div class="flex ver__tudo">
          <a href="./src/views/produtos.html" >Ver tudo</a>
          <img src="./public/images/arrow_back_black.svg" onload="SVGInject(this)" alt="arrow right">
        </div>
      </div>
      <ul class="container__main__list" id="${categoria}"></ul>
      ` 
    return divCategoria;
  }

  function renderProdutos(titulo, preco, img){
    const produto = document.createElement("li");
    produto.className = "list__item";
  
    produto.innerHTML= `
      <a href="./src/views/produtoDetail.html">
        <div class="list__item__containerImg">
          <img class="list__item__img" src="${img}" alt="">
        </div>
        <div class="list__item__description flex collumn">
        <p class="list__item__title">${titulo}</p>
        <p class="list__item__preco">${preco}</p>
        <p class="list__item__verProd">Ver Produto </p>
        </div>
      </a>`

      return produto;
      
  }
  
  async function listaProdutos(){
    if(content){
    try {
      const listProductsApi = await conectApi.productList();
      const categorias = await listProductsApi.categorias;
      const starWarsProducts = await listProductsApi.produtos.filter((produto) => produto.categoria.includes('star wars'));
      const consoleProducts = await listProductsApi.produtos.filter((produto) => produto.categoria.includes('console'));
      const roupasProducts = await listProductsApi.produtos.filter((produto) => produto.categoria.includes('roupas'));
      const ofertasProducts = await listProductsApi.produtos.filter((produto) => produto.categoria.includes('oferta'));
      
      categorias.forEach(categoria => {
        content.appendChild(renderListas(categoria))

        if(categoria == 'Star Wars'){
           let ulCategoria = document.getElementById(categoria)
           starWarsProducts.forEach(prodSW => ulCategoria.appendChild(renderProdutos(prodSW.titulo, prodSW.preco, prodSW.imageURL)))
        }
        if(categoria == 'Consoles'){
          let ulCategoria = document.getElementById(categoria)
          consoleProducts.forEach(console => ulCategoria.appendChild(renderProdutos(console.titulo, console.preco, console.imageURL)))
        }
        if(categoria == 'Roupas'){
          let ulCategoria = document.getElementById(categoria)
          roupasProducts.forEach(console => ulCategoria.appendChild(renderProdutos(console.titulo, console.preco, console.imageURL)))
        }
        if(categoria == 'Ofertas'){
          let ulCategoria = document.getElementById(categoria)
          ofertasProducts.forEach(console => ulCategoria.appendChild(renderProdutos(console.titulo, console.preco, console.imageURL)))
        }
      }) 
    } catch (error) {
      content.innerHTML = "<h2 class='title__erro'>Não foi possível exibir a lista de produtos, não se preocupe, já estamos verificando</h2>"
    }
  }
  }
  
  export const render = {
    listaProdutos,
    renderProdutos
  }
