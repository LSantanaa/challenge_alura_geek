import { conectApi } from "./conexao.js";
import { render } from "./renderListProductsIndex.js";

const listaTodosProdutos = document.querySelector('[data-lista-produtos]');
// const content = document.querySelector('[data-content]')

export default async function renderAllProducts(){
  if (listaTodosProdutos){
      try {
        const listProductsApi = await conectApi.productList();
        const produtos = await listProductsApi.produtos;
        produtos.forEach(produto => listaTodosProdutos.appendChild(render.renderProdutos(produto.titulo, produto.preco, produto.imageURL)))
        
      } catch (error) {
        listaTodosProdutos.innerHTML = "<h2 class='title__erro'>Não foi possível exibir a lista de produtos, não se preocupe, já estamos verificando</h2>" 
      }
    }
}



