import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>

      {/* Botón Al Home / Si el botón no funciona ya está en el navbar la opción de ir al home */}
        <Link
                to="/"
                className="inline-flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-800 bg-gray-50 hover:bg-gray-100"
              >
                Ir al Home
        </Link>
    </div>
  );
}

export default NotFound;