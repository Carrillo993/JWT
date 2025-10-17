# Proyecto Pizzería Mamma Mia! 🍕

El propósito de este proyecto es simular una aplicación web para una pizzería, mostrando un catálogo de productos y permitiendo al usuario interactuar con ellos mediante botones, un carrito de compras y formularios de registro y login.

## 🚀 Funcionalidades

- **Ruteo con React Router:**  
  - `/` → Página principal **Home**.  
  - `/register` → Formulario de **Registro**.  
  - `/login` → Formulario de **Login**.  
  - `/cart` → **Carrito de compras**.  
  - `/pizza/p001` → Detalle de una pizza específica.  
  - `/profile` → Página de **Perfil** con email estático y botón de logout.  
  - `/404` → Página de **NotFound**, con un link para volver al Home.  

- **Barra de navegación (Navbar):** con enlaces a las rutas principales y botón dinámico de carrito (`🛒 Total: $xxx`).  
- **Footer fijo:** en la parte inferior con información legal.  
- **Cards de productos:** cada pizza incluye imagen, nombre, ingredientes, precio y botones de acción.  
- **Página Profile:** muestra un correo estático y un botón de logout (aún sin lógica de autenticación real).  
- **Página NotFound:** se muestra en rutas inexistentes, incluye botón para volver al Home.  
- **Gestión de estados y eventos:** para controlar el flujo de interacción del usuario.  
- **Consumo de API:** el catálogo de pizzas se carga dinámicamente desde un backend con Express.  
- **Diseño moderno, minimalista y responsivo** gracias a **TailwindCSS**.  

## 🛠️ Tecnologías usadas

- ⚛️ **React + Vite**  
- 🛣️ **React Router DOM**  
- 🎨 **TailwindCSS**  
- 📦 **Node.js + Express (API)**  
- 💻 **JavaScript (ES6+)**  
- 🌐 **Fetch API**
- 🔄 **React Context** 

## 👨‍💻 Autor

Carlos Carrillo