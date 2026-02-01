Este `README.md` ha sido diseñado bajo estándares de **Ingeniería de Sistemas**, estructurado para documentar no solo el código, sino la arquitectura y el proceso de gestión de este sistema de información.

Puedes copiar este contenido en un archivo llamado `README.md` en la raíz de tu proyecto:

---

# 🛒 Sistema de Gestión de Adquisición de Cursos (01-Shopping-Cart)

**Evolución Académica - I Ciclo Ingeniería en Sistemas**

Este proyecto representa un sistema de información para la gestión de una orden de compra en una plataforma educativa. Ha evolucionado de una estructura estática a una **arquitectura modular desacoplada**, aplicando principios de robustez y experiencia de usuario (UX).

## 🏗️ Arquitectura del Sistema

El sistema implementa una **Arquitectura en Capas (Layered Architecture)** para garantizar la separación de preocupaciones (*Separation of Concerns*):

* **Capa de Presentación (UI):** Responsable del renderizado del DOM y la gestión de la accesibilidad (ARIA).
* **Capa de Negocio (Actions):** Implementa la lógica de inmutabilidad para el manejo del estado del carrito.
* **Capa de Infraestructura (Storage):** Gestiona la persistencia de datos mediante `Web Storage API`.

## 🚀 Características Técnicas

* **Gestión de Estado Inmutable:** Uso de métodos de orden superior (`map`, `filter`, `reduce`) para la manipulación de datos.
* **Defensive Programming:** Implementación de bloques `try/catch` para mitigar fallos en el parsing de datos y referencias del DOM.
* **Accesibilidad (A11y):** HTML5 semántico optimizado con roles ARIA y regiones de navegación para lectores de pantalla.
* **UX/UI Dinámica:** Notificaciones asíncronas (Toasts) y diálogos de confirmación para acciones críticas.

## 📋 Requerimientos (Software Engineering)

### Requerimientos Funcionales

* **RF1:** Selección y captura de metadatos de cursos desde el catálogo.
* **RF2:** Control de integridad: evitar registros duplicados incrementando magnitudes de cantidad.
* **RF3:** Persistencia de sesión automática en LocalStorage.
* **RF4:** Cálculo reactivo del costo total de la adquisición.

### Requerimientos No Funcionales

* **RNF1:** Estructura de código bajo principios **SRP** (Single Responsibility Principle).
* **RNF2:** Interfaz responsiva adaptada para múltiples viewports.
* **RNF3:** Manejo de errores resiliente ante corrupción de datos locales.

## 🗺️ Roadmap de Evolución (SCRUM)

Este proyecto se gestiona bajo ciclos de desarrollo (Sprints) alineados con las materias de la carrera:

* **Sprint 1 (Finalizado):** Consolidación de lógica de negocio, arquitectura en capas y persistencia local offline.
* **Sprint 2 (En curso):** Implementación de **Networking** (Fetch API) e integración con **Bases de Datos** externas (JSON-Server).
* **Sprint 3 (Planificado):** Optimización de algoritmos de búsqueda y seguridad en la capa de transporte.

## 🛠️ Tecnologías Utilizadas

* **Lenguaje:** JavaScript (ES6+).
* **Estilos:** CSS3 (Normalize, Skeleton Framework).
* **Estructura:** HTML5 Semántico.
* **Gestión:** SCRUM Methodology.

## ⚙️ Instalación y Uso

1. Clonar el repositorio.
2. Abrir `index.html` en cualquier navegador moderno.
3. Para el modo desarrollo (Sprint 2):
```bash
npm install -g json-server
json-server --watch db.json --port 4000

```



---

**Ingeniería en Sistemas de Información** *Documentación técnica para el fortalecimiento del potencial profesional.*
