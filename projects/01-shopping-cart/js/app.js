/**
 * 01-SHOPPING-CART - REFACTORIZACIÓN FINAL
 * Arquitectura: Layered (UI, Business Actions, Infrastructure)
 * Principios: Loose Coupling (Acoplamiento Débil) y SRP.
 */

// --- 1. CONFIGURACIÓN DE SELECTORES (Capa de Interfaz) ---
const selectors = {
  cart: document.querySelector('#carrito'),
  cartContainer: document.querySelector('#lista-carrito tbody'),
  cleanCartBtn: document.querySelector('#vaciar-carrito'),
  courseCatalogue: document.querySelector('#lista-cursos'),
  totalDisplay: document.querySelector('#total-pagar') // Coincide con el aria-live="polite"
};

// --- 2. ESTADO GLOBAL ---
let shoppingCart = [];

// --- 3. INFRAESTRUCTURA (Persistencia Local) ---
const storage = {
  save(data) {
    try {
      localStorage.setItem('carrito', JSON.stringify(data));
    } catch (e) {
      console.error('Error de persistencia:', e);
    }
  },
  load() {
    try {
      return JSON.parse(localStorage.getItem('carrito')) || [];
    } catch (e) {
      return [];
    }
  }
};

// --- 4. CAPA DE PRESENTACIÓN (UI Logic) ---
const ui = {
  renderCart(cartItems) {
    this.cleanView();

    cartItems.forEach(course => {
      const { image, title, price, quantity, id } = course;
      const row = document.createElement('tr');
      // Nota: Se agregaron scope="row" y cierres de etiquetas para accesibilidad
      row.innerHTML = `
                <td><img src="${image}" width="100" alt="${title}"></td> 
                <td>${title}</td>
                <td>${price}</td>
                <td>${quantity}</td>
                <td><a href="#" class="borrar-curso" data-id="${id}" aria-label="Eliminar ${title}"> X </a></td>
            `;
      selectors.cartContainer.appendChild(row);
    });

    this.renderTotal(cartItems);
  },

  renderTotal(cartItems) {
    const total = cartItems.reduce((acc, item) => {
      // Sanitización del precio para el cálculo matemático
      const price = parseFloat(item.price.replace('$', ''));
      return acc + (price * item.quantity);
    }, 0);

    if (selectors.totalDisplay) {
      selectors.totalDisplay.textContent = `$${total.toFixed(2)}`;
    }
  },

  cleanView() {
    while (selectors.cartContainer.firstChild) {
      selectors.cartContainer.removeChild(selectors.cartContainer.firstChild);
    }
  },

  showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.classList.add('vacio');
    notification.textContent = message;
    notification.setAttribute('role', 'alert'); // ARIA para notificaciones dinámicas

    Object.assign(notification.style, {
      position: 'fixed', top: '20px', right: '20px', zIndex: '1000',
      backgroundColor: type === 'success' ? '#2ecc71' : '#e74c3c',
      padding: '15px 30px', borderRadius: '5px', color: 'white', fontWeight: 'bold',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
    });

    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transition = 'opacity 0.5s ease';
      setTimeout(() => notification.remove(), 500);
    }, 2000);
  }
};

// --- 5. LÓGICA DE NEGOCIO (Domain Actions) ---
const actions = {
  addCourse(courseElement) {
    try {
      const courseData = {
        // Selector robusto: busca la clase .imagen-curso que pusimos en el HTML
        image: courseElement.querySelector('.imagen-curso').getAttribute('src'),
        title: courseElement.querySelector('h4').textContent,
        price: courseElement.querySelector('.price span').textContent,
        id: courseElement.querySelector('.agregar-carrito').getAttribute('data-id'),
        quantity: 1
      };

      const exists = shoppingCart.some(item => item.id === courseData.id);

      if (exists) {
        shoppingCart = shoppingCart.map(item =>
          item.id === courseData.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        shoppingCart = [...shoppingCart, courseData];
      }

      this.syncApp();
      ui.showNotification(`Curso añadido: ${courseData.title}`);
    } catch (e) {
      console.error("Fallo en la captura de datos del curso", e);
    }
  },

  removeCourse(id) {
    if (confirm('¿Desea eliminar este curso del carrito?')) {
      shoppingCart = shoppingCart.filter(item => item.id !== id);
      this.syncApp();
      ui.showNotification('Curso removido', 'error');
    }
  },

  clearCart() {
    if (confirm('¿Está seguro de vaciar todo el carrito?')) {
      shoppingCart = [];
      this.syncApp();
      ui.showNotification('Carrito vaciado');
    }
  },

  syncApp() {
    storage.save(shoppingCart);
    ui.renderCart(shoppingCart);
  }
};

// --- 6. INICIALIZADOR (Controlador de Eventos) ---
function initApp() {
  document.addEventListener('DOMContentLoaded', () => {
    shoppingCart = storage.load();
    ui.renderCart(shoppingCart);
  });

  selectors.courseCatalogue.addEventListener('click', (e) => {
    if (e.target.classList.contains('agregar-carrito')) {
      const courseCard = e.target.closest('.card');
      actions.addCourse(courseCard);
    }
  });

  selectors.cart.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('borrar-curso')) {
      const id = e.target.getAttribute('data-id');
      actions.removeCourse(id);
    }
  });

  selectors.cleanCartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    actions.clearCart();
  });
}

initApp();