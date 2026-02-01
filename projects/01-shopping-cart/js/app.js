// 1. Initialize variables to reference DOM elements.
const cart = document.querySelector('#carrito');
const cartContainer = document.querySelector('#lista-carrito tbody');
const CLEAN_CART_BTN = document.querySelector('#vaciar-carrito');
const COURSE_CATALOGUE = document.querySelector('#lista-cursos');

// Step 3: Create an array that will works as the cart
// Este array se va a ir llenando con 'cursos' que es el objeto que estamos usando 
// 
let shoppingCart = [];

// 1.Implement Event Delegation to handle clicks on dynamic list items
loadEventListeners();

function loadEventListeners() {

  // DOM elements
  COURSE_CATALOGUE.addEventListener('click', addToCart);
  cart.addEventListener('click', deleteItem);
  CLEAN_CART_BTN.addEventListener('click', cleanCart);

  // NEW: Cargar carrito al iniciar la app con protección try/catch
  document.addEventListener('DOMContentLoaded', () => {
    try {
      // Intentamos obtener los datos; si no existen, inicializamos como arreglo vacío []
      shoppingCart = JSON.parse(localStorage.getItem('carrito')) || [];

      console.table(shoppingCart);
      htmlCart();

    } catch (error) {
      console.error('Error al leer LocalStorage:', error);
      shoppingCart = []; // Fallback seguro ante datos corrompidos
    }
  })
}

// * FUNCTIONS *
// ADD ITEMS TO THE CART
function addToCart(e) {
  if (e.target.classList.contains('agregar-carrito')) {

    // Retrieve data from the course object...Looking for the closest element
    // ROBUSTEZ: Buscamos el ancestro .card más cercano, sin importar la jerarquía
    const selectedCourse = e.target.closest('.card');
    retrieveCourseData(selectedCourse);

    console.table(shoppingCart);

  }
}

// RETRIEVE DATA FOR EACH COURSE
function retrieveCourseData(course) {

  // 1. Crear el objeto con la información del curso actual
  const courseData = {
    image: course.querySelector('img').getAttribute('src'),
    title: course.querySelector('h4').textContent,
    price: course.querySelector('.price span').textContent,
    id: course.querySelector('.agregar-carrito').getAttribute('data-id'),
    quantity: 1
  }

  // 2. Revisar si el elemento ya existe en el carrito (.some solo devuelve true/false)
  const isExisting = shoppingCart.some(course => course.id === courseData.id);

  if (isExisting) {
    // ACTUALIZAMOS LA CANTIDAD
    // Usamos .map para crear un NUEVO arreglo (inmutabilidad)
    const courses = shoppingCart.map(course => {
      if (course.id === courseData.id) {
        // Retornamos una copia del objeto sumando 1 a la cantidad
        // Esta es la forma "Senior" de evitar mutar el objeto original directamente
        return {
          ...course,  // Copia las propiedades existentes (img, title, etc)
          quantity: course.quantity + 1 // Sobrescribe solo la cantidad
        }
      } else {
        return course;
      }
    })

    // Asignamos el nuevo arreglo al carrito
    shoppingCart = [...courses];

  } else {
    // AGREGAMOS EL CURSO NUEVO
    // Si no existe, simplemente lo agregamos al arreglo
    shoppingCart = [...shoppingCart, courseData];
  }

  console.log(shoppingCart);
  htmlCart();

  // ...
  syncStorage();

}

// DELETE ITEMS FROM THE CART
function deleteItem(e) {
  if (e.target.classList.contains('borrar-curso')) {
    const idCourse = e.target.getAttribute('data-id');

    // Filtramos el array
    shoppingCart = shoppingCart.filter(course => course.id !== idCourse);
    console.table(shoppingCart);

    htmlCart();   // Actualizamos la vista
    syncStorage();    //NUEVO: Guardamos cambios en LocalStorage
  }
}

// CLEAN CART
function cleanCart() {

  shoppingCart = [];    // Clean the array
  cleanHTML();    // Clean the HTML

  syncStorage();
  console.log(shoppingCart);    // Display that all is ok
}

// * SPECIAL FUNCTIONS SECTION *  
// * 1. Muestra el carrito de compras en el html * Esta función se manda a llamar después de leer los datos del curso y agregarlos al carrito
function htmlCart() {

  cleanHTML();  // Limpia el HTML antes de repintar

  shoppingCart.forEach(course => {
    // CORRECCIÓN: Agregamos 'id' aquí para poder usarlo abajo
    const { image, title, price, quantity, id } = course;
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>
            <img src="${image}" width="100"> 
        </td> 
        <td> ${title}</td>
        <td> ${price}</td>
        <td> ${quantity}</td>
        <td> 
            <a href="#" class = borrar-curso data-id="${id}"> X </a> 
      `;

    cartContainer.appendChild(row);

  });
}

// * Clean the preview content of the cart
function cleanHTML() {
  while (cartContainer.firstChild) {
    cartContainer.removeChild(cartContainer.firstChild);
  }
}

// * Escribe en el disco del navegador
function syncStorage() {

  try {
    localStorage.setItem('carrito', JSON.stringify(shoppingCart));
  } catch (error) {
    console.error('No se pudo guardar en LocalStorage', error);
  }

  /* This function will be called just after the array has changed.
      Debes agregarla en estos 3 lugares de tu código actual:
          En retrieveCourseData: Después de htmlCart();.
          En deleteItem: Después de filtrar el arreglo y llamar a htmlCart();.
          En cleanCart: Después de vaciar el arreglo y limpiar el HTML.    */
}