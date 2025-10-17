// import { pizzas } from "../data/pizzas"; 
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";


function Pizza() {
  const { id } = useParams(); // buscamos obtener el id de la url
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);


  
  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/pizzas");
        const pizzas = await res.json();

        console.log("ID recibido desde URL:", id);
        console.log("Pizzas disponibles:", pizzas.map(p => p.id));

        const found = pizzas.find(p => p.id.trim() === id.trim());
        console.log("Pizza encontrada:", found);

        setPizza(found);
      } catch (error) {
        console.error("Error al cargar pizza:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPizza();
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (!pizza) return <p>No se encontró la pizza.</p>;

  return (
    <div className="flex justify-center p-6">
      <div
        key={pizza.id}
        className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row max-w-4xl"
      >
        <img
          src={pizza.img}
          alt={pizza.name}
          className="h-64 md:h-auto md:w-1/2 object-cover"
        />
        <div className="p-6 flex-1 flex flex-col">
          <h2 className="text-3xl font-bold text-gray-800 capitalize">{pizza.name}</h2>
          <p className="text-gray-600 text-sm mt-2">{pizza.desc}</p>
          <p className="text-gray-600 text-sm mt-3">
            <strong>Ingredientes:</strong> {pizza.ingredients?.join(", ")}
          </p>
          <p className="text-2xl font-semibold text-red-600 mt-4">
            ${pizza.price.toLocaleString("es-CL")}
          </p>

          {/* Botones */}
          <div className="mt-auto flex justify-end gap-4 pt-6">
            <button
              className="bg-gray-900 hover:bg-green-600 text-white px-5 py-2 rounded-lg"
              onClick={() => addToCart(pizza)}
            >
              Añadir 🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pizza;