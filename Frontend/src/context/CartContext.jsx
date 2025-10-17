import { createContext, useState } from "react";
import { pizzaCart } from "../data/pizzas";

const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(pizzaCart);

  // sección de las cards (botón para agregar al carrito)
  // Agregar producto
  const addToCart = (pizza) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === pizza.id);
      if (existing) {
        // si ya existe, aumenta la cantidad
        return prevCart.map((item) =>
          item.id === pizza.id ? { ...item, count: item.count + 1 } : item
        );
      }
      // si no existe, lo agrega con count = 1
      return [...prevCart, { ...pizza, count: 1 }];
    });
  };

  // aumentar cantidad
  const increase = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  // disminuir cantidad
  const decrease = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, count: item.count - 1 } : item
        )
        .filter((item) => item.count > 0) // elimina si count llega a 0
    );
  };

  // calcular total
  const total = cart.reduce((acc, item) => acc + item.price * item.count, 0);

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, increase, decrease, total, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export { CartContext };
