import { conectApi } from "./conexao.js";
import { render } from "./renderListProductsIndex.js";


export default function search(){
  const btnBusca = document.querySelector('[data-btn-search]');
  const dataProdutos = JSON.parse(localStorage.getItem('produtos'))

  function pesquisaProduto(e){
    e.preventDefault()
    const termodeBusca = document.getElementById('searchValue').value;
    const resultBusca = conectApi.buscaProduto(termodeBusca, dataProdutos);
    
    const origem = localStorage.getItem('origemChamada');
    if(origem === 'index'){
      localStorage.setItem('resultadoBusca', JSON.stringify(resultBusca));
      window.location.href = './src/views/produtos.html';
    }
    if(origem === 'prodDetail'){
      localStorage.setItem('resultadoBusca', JSON.stringify(resultBusca));
      window.location.href = './produtos.html';
    }
    if(origem === 'produtos'){
      renderizaProdutos(resultBusca)
    }
  }
  
  btnBusca.addEventListener('click', evento => pesquisaProduto(evento))

  function renderizaProdutos(produtos) {
    const listaTodosProdutos = document.querySelector('[data-lista-produtos]');
  
    while (listaTodosProdutos.firstChild) {
      listaTodosProdutos.removeChild(listaTodosProdutos.firstChild);
    }
  
    produtos.forEach(produto => listaTodosProdutos.appendChild(render.renderProdutos(produto.titulo, produto.preco, produto.imageURL, "./produtoDetail.html")));
  
    if (produtos.length === 0) {
      listaTodosProdutos.innerHTML = `<h2 class="mensagem__titulo"> Não existem produtos com essa busca</h2>`;
    }
  }
  
  // Verificar se há resultados de busca no localStorage
  const resultadoBusca = JSON.parse(localStorage.getItem('resultadoBusca'));
  
  if (resultadoBusca) {
    renderizaProdutos(resultadoBusca);
    localStorage.removeItem('resultadoBusca'); // Limpar o resultado após a exibição
  }

}
