async function productList(){
  const url = 'http://localhost:5500/src/api/database.json';
  const conexao = await fetch(url);
  const conexaoResponse = await conexao.json()
  return conexaoResponse;
}

export const conectApi ={
  productList
}