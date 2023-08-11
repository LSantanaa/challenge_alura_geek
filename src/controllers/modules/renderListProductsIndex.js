import { conectApi } from "./conexao.js";

const content = document.querySelector("[data-content]");
const url = "./src/api/database.json";

//função responsavel por criar as ULs com as categorias dos produtos
function renderListas(categoria) {
  const divCategoria = document.createElement("div");
  divCategoria.classList.add("container__categoria");

  divCategoria.innerHTML = `
      <div class="flex between">
      <h2>${categoria}</h2>
        <div class="flex ver__tudo">
          <a href="./src/views/produtos.html">Ver tudo</a>
          <img src="./public/images/arrow_back_black.svg" onload="SVGInject(this)" alt="arrow right">
        </div>
      </div>
      <ul class="container__main__list" id="${categoria}"></ul>
      `;
  return divCategoria;
}

//função para criar a li contendo as informações do produto
function renderProdutos(titulo, preco, img, link, desc, categoria) {
  const produto = document.createElement("li");
  produto.className = "list__item";

  produto.innerHTML = `
      <a href="${link}">
        <div class="list__item__containerImg">
          <img class="list__item__img" src="${img}" alt="${titulo}">
        </div>
        <div class="list__item__description flex collumn">
        <p class="list__item__title">${titulo}</p>
        <p class="list__item__preco">${preco}</p>
        <p class="list__item__verProd">Ver Produto </p>
        </div>
      </a>`;

      
  const prodDetail = {
    titulo,
    preco,
    img,
    desc,
    categoria
  }

  produto.addEventListener('click', ()=>{ localStorage.setItem('prodClicado', JSON.stringify(prodDetail))})

  return produto;
}

//filtrando produtos da api de acordo com a categoria
function filter(listCategoria, listProd) {
  const starWarsProducts = listProd.filter((produto) =>
    produto.categoria.includes("star wars")
  );
  const consoleProducts = listProd.filter((produto) =>
    produto.categoria.includes("console")
  );
  const roupasProducts = listProd.filter((produto) =>
    produto.categoria.includes("roupas")
  );
  const ofertasProducts = listProd.filter((produto) =>
    produto.categoria.includes("oferta")
  );
  const linkProd = "./src/views/produtoDetail.html";

  listCategoria.forEach((categoria) => {
    content.appendChild(renderListas(categoria));

    if (categoria == "Star Wars") {
      let ulCategoria = document.getElementById(categoria);
      starWarsProducts.forEach((prodSW) =>
        ulCategoria.appendChild(
          renderProdutos(
            prodSW.titulo, 
            prodSW.preco, 
            prodSW.imageURL, 
            linkProd, 
            prodSW.descricao,
            prodSW.categoria
          )
        )
      );
    }
    if (categoria == "Consoles") {
      let ulCategoria = document.getElementById(categoria);
      consoleProducts.forEach((console) =>
        ulCategoria.appendChild(
          renderProdutos(
            console.titulo,
            console.preco,
            console.imageURL,
            linkProd,
            console.descricao,
            console.categoria
          )
        )
      );
    }
    if (categoria == "Roupas") {
      let ulCategoria = document.getElementById(categoria);
      roupasProducts.forEach((roupa) =>
        ulCategoria.appendChild(
          renderProdutos(
            roupa.titulo, 
            roupa.preco, 
            roupa.imageURL, 
            linkProd, 
            roupa.descricao,
            roupa.categoria
          )
        )
      );
    }
    if (categoria == "Ofertas") {
      let ulCategoria = document.getElementById(categoria);
      ofertasProducts.forEach((oferta) =>
        ulCategoria.appendChild(
          renderProdutos(
            oferta.titulo, 
            oferta.preco, 
            oferta.imageURL,
            linkProd, 
            oferta.descricao,
            oferta.categoria
          )
        )
      );
    }
  });
}

//função que chama a api com os produtos e categorias e usa as funções para filtrar e colocar em cada ul as li correspondentes a categoria,
//também salva em localhost para evitar varias requisições na pagina
async function listaProdutos() {
  if (content) {
    try {
      const categoriasLocal = JSON.parse(localStorage.getItem("categorias"));
      const produtosLocal = JSON.parse(localStorage.getItem("produtos"));

      if (produtosLocal) {
        const produtos = produtosLocal;
        const categorias = categoriasLocal;
        filter(categorias, produtos);
      } else {
        const listProductsApi = await conectApi.productList(url);
        const categorias = await listProductsApi.categorias;
        const produtos = await listProductsApi.produtos;

        if (produtos.length > 0) {
          localStorage.setItem("categorias", JSON.stringify(categorias));
          localStorage.setItem("produtos", JSON.stringify(produtos));
        }

        filter(categorias, produtos);
      }
    } catch (error) {
      content.innerHTML =
        "<h2 class='title__erro'>Não foi possível exibir a lista de produtos, não se preocupe, já estamos verificando</h2>";
    }
  }
}

//funções reutilizáveis
export const render = {
  listaProdutos,
  renderProdutos,
};
