import { conectApi } from "./conexao.js";
import { render } from "./renderListProductsIndex.js";

const url = '../../src/api/database.json';
const listaTodosProdutos = document.querySelector('[data-lista-produtos]');

//puxa da api ou do localhost e chama a função de criar as LI com produtos para renderizar na ul da pagina
export default async function renderAllProducts(){
  if (listaTodosProdutos){
      try {
        const prodLocal = JSON.parse(localStorage.getItem('produtos'))
        
        if(prodLocal){
          const produtos = prodLocal;
          produtos.forEach(produto => listaTodosProdutos.appendChild(render.renderProdutos(produto.titulo, produto.preco, produto.imageURL, "./produtoDetail.html")));
        }
        else{
          const listProductsApi = await conectApi.productList(url) ;
          const produtos = await listProductsApi.produtos;
          produtos.forEach(produto => listaTodosProdutos.appendChild(render.renderProdutos(produto.titulo, produto.preco, produto.imageURL, "./produtoDetail.html")));

          if(produtos.length > 0){
            localStorage.setItem('produtos', JSON.stringify(produtos))
          }
        }
        
      } catch (error) {
        listaTodosProdutos.innerHTML = "<h2 class='title__erro'>Não foi possível exibir a lista de produtos, não se preocupe, já estamos verificando</h2>" 
      }
    }

}



