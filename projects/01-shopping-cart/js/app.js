// 1. Initialize variables to reference DOM elements.
const cart = document.querySelector('#carrito');
const cartContainer = document.querySelector('#lista-carrito tbody');
const CLEAN_CART_BTN = document.querySelector('#vaciar-carrito');
const COURSE_CATALOGUE = document.querySelector('#lista-cursos');

//1.Implement Event Delegation to handle click on dynamic list items
loadEventListeners();
function loadEventListeners() {
  COURSE_CATALOGUE.addEventListener('click', addToCart);
}


// Functions
//2. Validation of the clicked button
function addToCart(e) {
  if (e.target.classList.contains('agregar-carrito')) {
    // Retrieve data from the course object ...
    const selectedCourse = e.target.parentElement.parentElement;
    retrieveCourseData(selectedCourse);

  }
}

//2.1 Function to retrieve data from each course
function retrieveCourseData(course) {

  //Object: Course
  const courseData = {
    image: course.querySelector('img').src,
    title: course.querySelector('h4').textContent,
    price: course.querySelector('.price span').textContent,
    id: course.querySelector('.agregar-carrito').getAttribute('data-id'),
    quantity: 1
  }

  console.table(courseData);

}