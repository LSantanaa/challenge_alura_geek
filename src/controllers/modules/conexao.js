
let listProdutos = [];

async function productList(url){
  const conexao = await fetch(url);
  const conexaoResponse = await conexao.json()
  return conexaoResponse;
}

function addProduto(titulo, categoria, preco, descricao, imageURL){
  const listProdutosLocal = JSON.parse(localStorage.getItem('produtos'))
  if(listProdutosLocal){
    listProdutos = listProdutosLocal
  }

  listProdutos.push({
    titulo: titulo,
    categoria: categoria,
    preco: `R$ ${preco},00`,
    descricao: descricao,
    imageURL: imageURL
  })

  localStorage.setItem('produtos', JSON.stringify(listProdutos));
}

export const conectApi ={
  productList,
  addProduto
}