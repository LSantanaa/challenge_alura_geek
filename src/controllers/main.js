import criarESalvaProduto from "./modules/addProduto.js";
import search from "./modules/buscaProduto.js";
import renderAllProducts from "./modules/renderAllProds.js";
import { render } from "./modules/renderListProductsIndex.js";
import prodDetails from "./modules/renderProdutoDetail.js";

render.listaProdutos();
renderAllProducts();
criarESalvaProduto();
prodDetails()

// Identifica a origem da chamada e armazena no localStorage
if (window.location.pathname.includes('index.html')) {
  localStorage.setItem('origemChamada', 'index');
}else if(window.location.pathname.includes('produtos.html')) {
  localStorage.setItem('origemChamada', 'produtos');
}else if(window.location.pathname.includes('produtoDetail.html')){
  localStorage.setItem('origemChamada', 'prodDetail')
}

search();