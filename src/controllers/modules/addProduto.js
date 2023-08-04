import { conectApi } from "./conexao.js";
export default function criarESalvaProduto(){
  const formulario = document.querySelector('[data-form]');
  
  if(formulario){
  function criarProd(evento){
    evento.preventDefault();
  
    const imageURL = document.querySelector('#img').value;
    const categoria = document.querySelector('#categoriasMarcadas').textContent;
    const preco = document.querySelector('#preco').value;
    const titulo = document.querySelector('#titulo').value;
    const descricao = document.querySelector('#desc').value;
    
    conectApi.addProduto(titulo, categoria, preco, descricao, imageURL)
  
    window.location.href = './produtos.html'
  }
  
  formulario.addEventListener('submit', evento => criarProd(evento))
  }
}