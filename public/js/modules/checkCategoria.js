export default function categoriasCheck(){
  const categoriasMarcadas = document.querySelector('#categoriasMarcadas');
  const form = document.querySelector('[data-form]');
  
  if (categoriasMarcadas) {
    const checksCategorias = form.querySelectorAll('input[type=checkbox]');
    let categoriaValue = '';
  
    checksCategorias.forEach(check => {
      check.addEventListener('click', () => {
        if (check.checked) {
          categoriaValue += categoriaValue ? `, ${check.value}` : check.value;
        } else {
          categoriaValue = categoriaValue.split(', ' + check.value).join('');
          categoriaValue = categoriaValue.split(check.value + ', ').join('');
          categoriaValue = categoriaValue.split(check.value).join('');
        }
        categoriasMarcadas.textContent =categoriaValue;
      });
    });
  }
  
}


