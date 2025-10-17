import { useUser } from "../context/UserContext"; //con esto vamos a buscar conectar con nuesta db

function Profile() {
  const { email, logout } = useUser();

    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gray-50">
        {/* Imagen de perfil por defecto */}
        <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M5.121 17.804A8.966 8.966 0 0112 15c2.21 0 4.21.803 5.879 2.136M15 10a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
  
        {/* Correo */}
        <p className="mt-4 text-gray-800 font-medium text-lg">
          usuario: <span className="text-gray-600">{email}</span>
        </p>
  
        {/* Botón logout */}
        <button
          type="button"
          onClick={logout} //llama a la funcion logout del context
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
        >
          🔒 Logout
        </button>
      </div>
    );
  }
  
  export default Profile;  