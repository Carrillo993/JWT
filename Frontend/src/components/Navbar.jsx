import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext"; // <-- IMPORTAR EL CONTEXT


const Navbar = () => {

    const { total } = useContext(CartContext);
    //const total = 25000; valor obsoleto (hardcodeado)
    //const token = true;
    const { token, logout } = useContext(UserContext);
  
    return (
      <nav className="bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                🍕 Home
              </Link>
  
              {token ? (
                <>
                  <Link
                    to="/profile" //Se incluye cuando token está true
                    className="inline-flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                    
                  >
                    🔓 Profile
                    </Link>
                  <button
                  onClick={logout} // <-- CAMBIO: reemplaza link hardcodeado
                  className="inline-flex items-center gap-2 px-3 py-2 border border-red-300 text-red-700 rounded-md text-sm font-medium hover:bg-red-50"
>
                    🔒 Logout
                    </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 px-3 py-2 border border-green-200 text-green-700 rounded-md text-sm font-medium hover:bg-green-50"
                  
                  >
                    🔐 Login
                  </Link>
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-2 px-3 py-2 border border-blue-200 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-50"
                    
                  >
                    🔐 Register
                  </Link>
                </>
              )}
            </div>
  
            <div className="ml-auto">
              <Link
                to="/cart"
                className="inline-flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-800 bg-gray-50 hover:bg-gray-100"
                
              >
                🛒 Total: $ {total.toLocaleString()}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;