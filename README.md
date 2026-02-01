A continuación, presento la **Documentación Técnica Oficial** del proyecto "Carrito de Compras - Plataforma Educativa".

---

# Documentación Técnica: Sistema de Carrito de Compras

**Versión:** 1.0.0

**Arquitectura:** Programación Orientada a Eventos / Manipulación del DOM (Vanilla JS)

**Framework CSS:** Skeleton.css

## 1. Resumen Ejecutivo

Este sistema gestiona la selección, agregación y eliminación de cursos virtuales en un entorno de front-end. El objetivo principal es proporcionar una interfaz reactiva donde el usuario pueda gestionar su intención de compra sin recargas de página, optimizando la experiencia de usuario (UX).

---

## 2. Stack Tecnológico

* **HTML5:** Estructura semántica (Secciones, Cards, Tablas).
* **CSS3:** Implementación de *Skeleton.css* para un diseño responsivo basado en un sistema de 12 columnas y *Normalize.css* para consistencia entre navegadores.
* **JavaScript (ES6+):** Lógica de negocio basada en el manejo del estado mediante arreglos y técnicas de **Event Delegation**.

---

## 3. Arquitectura de Componentes

### 3.1 Estructura del DOM (Vista)

La interfaz se divide en tres capas funcionales:

1. **Header/Navegación:** Contiene el contenedor del carrito (`#carrito`) que despliega dinámicamente una tabla con los productos seleccionados.
2. **Hero/Buscador:** Captura de *inputs* de usuario (Búsqueda).
3. **Contenedor de Cursos:** Un *grid* dinámico (`#lista-cursos`) compuesto por elementos `.card`. Cada card actúa como un objeto de datos independiente.

### 3.2 Lógica de Negocio (Controlador)

El script `app.js` opera bajo el patrón de **Fuente Única de Verdad** (*Single Source of Truth*), donde el arreglo `articulosCarrito` es el que dicta lo que se muestra en la UI.

#### Funciones Principales:

* `cargarEventListeners()`: Centraliza todos los escuchadores de eventos para mejorar la trazabilidad.
* `agregarCurso(e)`: Implementa **Event Delegation** para capturar clics en elementos con la clase `.agregar-carrito` dentro de un contenedor padre, mejorando el rendimiento de memoria.
* `leerDatosCurso(elemento)`: Realiza el *parsing* del DOM. Extrae información (título, precio, imagen, ID) y construye el objeto de datos.
* `carritoHTML()`: El motor de renderizado. Limpia el contenedor previo y genera filas (`<tr>`) basadas en el estado actual del arreglo.

---

## 4. Flujo de Datos (Data Flow)

1. **Interacción:** El usuario hace clic en el `<button>` de una card.
2. **Captura:** El Listener global detecta el evento y valida la clase del objetivo (`e.target`).
3. **Procesamiento:**
* Se utiliza `.closest('.card')` para identificar el nodo raíz de la información.
* Se valida si el ID ya existe en el estado (`.some()`).
* Si existe, se incrementa la propiedad `cantidad` mediante `.map()`.
* Si no, se añade el nuevo objeto mediante el *Spread Operator* (`[...]`).


4. **Renderización:** Se dispara `carritoHTML()`, que sincroniza la vista con el estado interno.

---

## 5. Decisiones de Ingeniería y Optimización

* **Uso de `<button type="button">`:** Se seleccionó sobre la etiqueta `<a>` para cumplir con los estándares de **WAI-ARIA** (Accesibilidad). Un botón describe una acción, un enlace describe una navegación.
* **Atributos Data-ID:** Se implementaron atributos `data-id` para desvincular la lógica de negocio del texto visual, permitiendo que el ID sea la clave primaria única para el filtrado.
* **Optimización del DOM:** Para vaciar el carrito, se utiliza un bucle `while` con `removeChild`. Esta técnica es significativamente más rápida que asignar `innerHTML = ''` en aplicaciones con alta carga de datos.

---

## 6. Mantenimiento y Escalabilidad Futura

Para la versión 1.1.0, se proponen las siguientes mejoras:

* **Persistencia:** Integrar `window.localStorage` para mantener el estado tras el refresco de la sesión.
* **Modularización:** Dividir el código en módulos ES para separar la lógica de UI de la lógica de datos.
* **API Integration:** Reemplazar los datos estáticos del HTML por una carga asíncrona (`fetch`) desde un endpoint JSON.

---

>[!NOTE]
>This project is key to practicing the basics of JavaScript


Linking the add to cart button and function
  1. Use the catalogue of courses: '#lista-cursos'
     1.1 Validating if the user clicks on the right button: '#agregar-carrito"
         To do this, we are going to use 
     

>[!TIP]
>Aquí tienes un tip

>[!IMPORTANT]
>Aquí algo importante

>[!WARNING]
>Aquí un warning

>[!CAUTION]
>Aquí un caution
>

### FUNCIONALIDAD ACTUAL 
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/cec9585b-ba94-487f-b451-c6f05ce8a918" />

CRUD completo
Falta implemetar funcionalidad al botón para incrementar o decrementar las cantidades de cada producto
Agregar notificaciones: antes de borrar, luego de agregar, editar y ese tipo.

