// import { useState } from "react";
// import { pizzaCart } from "../data/pizzas";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";


function Cart() {
  const { cart, increase, decrease, total, clearCart } = useContext(CartContext);
  const { token } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const handleCheckout = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/checkouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // enviamos token
        },
        body: JSON.stringify({
          items: cart,
          total: total,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Pedido enviado correctamente!");
        setShowConfirm(true);
      } else {
        setMessage(`❌ Error: ${data.message || "No se pudo enviar el pedido"}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Error al enviar el pedido");
    }
  };

  // Función que se llama al hacer click en "OK"
  const handleConfirm = () => {
    if (clearCart) {
      clearCart();
    }
    setMessage("");       // Limpiamos mensaje
    setShowConfirm(false); // Ocultamos botón de confirmación
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">🛒 Carrito</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">El carrito está vacío.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((pizza) => (
            <div
              key={pizza.id}
              className="flex items-center justify-between border-b pb-3"
            >
              <div className="flex items-center gap-4">
                <img
                  src={pizza.img}
                  alt={pizza.name}
                  className="w-16 h-16 rounded object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{pizza.name}</h3>
                  <p className="text-sm text-gray-600">
                    ${pizza.price.toLocaleString("es-CL")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => decrease(pizza.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  -
                </button>
                <span className="font-semibold">{pizza.count}</span>
                <button
                  onClick={() => increase(pizza.id)}
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                >
                  +
                </button>
              </div>
            </div>
          ))}

          {/* Total */}
          <div className="flex justify-between items-center pt-4">
            <span className="text-lg font-bold">Total:</span>
            <span className="text-xl font-bold text-red-600">
              ${total.toLocaleString("es-CL")}
            </span>
          </div>

          {/* Botón pagar */}
          {!showConfirm && (
            <button
              disabled={!token}
              onClick={handleCheckout}
              className={`w-full py-2 rounded-lg mt-4 text-white ${
                token
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Pagar 💳
            </button>
          )}

          {/* Mensaje de feedback */}
          {message && (
            <div className="mt-2 text-center font-semibold">
              <p>{message}</p>
              {showConfirm && (
                <button
                  onClick={handleConfirm}
                  className="mt-2 px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  OK
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Cart;