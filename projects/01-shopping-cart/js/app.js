// 1. Initialize variables to reference DOM elements.
const cart = document.querySelector('#carrito');
const cartContainer = document.querySelector('#lista-carrito tbody');
const CLEAN_CART_BTN = document.querySelector('#vaciar-carrito');
const COURSE_CATALOGUE = document.querySelector('#lista-cursos');

// Step 3: Create an array that will works as the cart
// Este array se va a ir llenando con 'cursos' que es el objeto que estamos usando 
// 
let shoppingCart = [];

// 1.Implement Event Delegation to handle click on dynamic list items
loadEventListeners();
function loadEventListeners() {
  COURSE_CATALOGUE.addEventListener('click', addToCart);
}


// Functions
// 2. Validation of the clicked button
function addToCart(e) {
  if (e.target.classList.contains('agregar-carrito')) {

    // Retrieve data from the course object...Looking for the closest element
    // ROBUSTEZ: Buscamos el ancestro .card más cercano, sin importar la jerarquía
    const selectedCourse = e.target.closest('.card');
    retrieveCourseData(selectedCourse);

  }
}

// 2.1 Function to retrieve data from each course
function retrieveCourseData(course) {

  //Object: Course
  const courseData = {
    image: course.querySelector('img').src,
    title: course.querySelector('h4').textContent,
    price: course.querySelector('.price span').textContent,
    //FLEXIBILIDAD: Buscamos el data-id en el elemento
    id: course.querySelector('.agregar-carrito').getAttribute('data-id'),
    quantity: 1
  }

  // Revisa si el elemento ya existe en el carrito
  const isExisting = shoppingCart.some(course => course.id === courseData.id);
  if (isExisting) {
    const courses = shoppingCart.map(course => {
      if (course.id === courseData.id) {
        course.quantity++;
        return course;
      } else {
        return course;
      }
    })

    shoppingCart = [...courses];

  } else {
    // Add item to the cart
    shoppingCart = [...shoppingCart, courseData];
  }


  console.log(shoppingCart);
  htmlCart();


}


// * SPECIAL FUNCTIONS SECTION *  

// * 1. Muestra el carrito de compras en el html * Esta función se manda a llamar después de leer los datos del curso y agregarlos al carrito
function htmlCart() {

  cleanHTML();

  shoppingCart.forEach(course => {

    const { image, title, price, quantity } = course;
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>
            <img src="${image}" width="100"> 
        </td> 
        <td> ${title}</td>
        <td> ${price}</td>
        <td> ${quantity}</td>
        <td> 
            <a href="#" class=borrar-curso data-id="{id}"> X </a> 
      `;

    cartContainer.appendChild(row);

  });
}

// * Clean the preview content of the cart
function cleanHTML() {
  while (shoppingCart.firstChild) {
    shoppingCart.removeChild(shoppingCart.firstChild);
  }
}