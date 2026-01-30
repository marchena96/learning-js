const cart = document.querySelector('#carrito');
const cartContainer = document.querySelector('#lista-carrito tbody');
const CLEAN_CART_BTN = document.querySelector('#vaciar-carrito');
const COURSE_CATALOGUE = document.querySelector('#lista-cursos');

loadEventListeners();
function loadEventListeners() {
  COURSE_CATALOGUE.addEventListener('click', addToCart);
}


// Functions
function addToCart(e) {
  if (e.target.classList.contains('agregar-carrito')) {
    // Traversing the DOM is necessary to read the info of each course ...
  }
}