import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' o 'error'

  //modifico todo para adecuar a nueva fuccion
  const navigate = useNavigate();
  const { login } = useUser();

  async function handleSubmit(e) {
    //Esto es para evitar que la pagina se rcargue
    e.preventDefault();

    if (!email || !password) {
      setMessage('❌ Todos los campos son obligatorios.');
      setMessageType('error');
      return;
    }

    if (password.length < 6) {
      setMessage('❌ La contraseña debe tener al menos 6 caracteres.');
      setMessageType('error');
      return;
    }

    try {
      // llamada al contexto
      const success = await login({ email, password }); // Esperamos el resultado del login

      // revisamos si realmente se generó un token
      if (success) {
        setMessage('✅ Login exitoso!');
        setMessageType('success');
        navigate('Profile'); // redirige al perfil
      } else {
        setMessage('❌ Usuario o contraseña incorrectos'); 
        setMessageType('error');
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ Error al iniciar sesión.');
      setMessageType('error');
    }

  };
    

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
            placeholder="ejemplo@email.com"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
            placeholder="Mínimo 6 caracteres"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Ingresar
        </button>

        {message && (
          <p className={`mt-4 text-center font-semibold ${
            messageType === 'error' ? 'text-red-500' : 'text-green-500'
          }`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
export default Login;
