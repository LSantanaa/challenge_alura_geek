import outsideClick from "./outsideClick.js";

export default function openModal(){
  const btnFechar = document.querySelectorAll('[data-btnFechar]');

  // modal login
  const btnLogin = document.querySelector('#btnLogin');
  const modalLogin = document.querySelector('#modalLogin');

  if(btnLogin){
    modalController(modalLogin, btnLogin, btnFechar);
  }

  //modal addProd
  const modalAddproduto = document.querySelector('#modalAddProduto');
  const btnAddProduto = document.querySelector('#btnAddProd');

  if(btnAddProduto){
    modalController(modalAddproduto, btnAddProduto, btnFechar)
  }

  //controla a abertura e fechamento dos modais 
  function modalController(modal, btnOpenModal, btnCloseModal){
    btnOpenModal.addEventListener('click', (e)=>{
      document.body.style.overflow = "hidden";
      modal.style.display = 'flex';
    })
  
    modal.addEventListener('click', (e)=>{
      if(e.target === modal){
       outsideClick(btnOpenModal, ['click'], ()=>{
          modal.style.display = 'none';
          document.body.style.overflow = "auto";
       })
      }
    })
  
    btnCloseModal.forEach(btn => {
      btn.addEventListener('click',(e)=>{
        e.preventDefault();
        modal.style.display = 'none';
        document.body.style.overflow = "auto";
      })
    })
  }
 
}