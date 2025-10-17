import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

//Para mayor contexto, ver Login.jsx, copio la estructura y replico aquí

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' o 'error'

  const navigate = useNavigate();
  const { register } = useUser(); // <-- usamos el contexto

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setMessage('❌ Todos los campos son obligatorios.');
      setMessageType('error');
      return;
    }

    if (password.length < 6) {
      setMessage('❌ El password debe tener al menos 6 caracteres.');
      setMessageType('error');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('❌ Las contraseñas no coinciden.');
      setMessageType('error');
      return;
    }

    try {
      // llamada al contexto para registrar
      const success = await register({ email, password });

      if (success) {
        setMessage('✅ Registro exitoso!');
        setMessageType('success');
        navigate('/profile'); // redirigimos al perfil después del registro
      } else {
        setMessage('❌ Error al registrar usuario.');
        setMessageType('error');
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ Error al registrar usuario.');
      setMessageType('error');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Registro</h2>

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

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
            placeholder="Mínimo 6 caracteres"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Repetir contraseña</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
            placeholder="Confirma tu contraseña"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Enviar
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

export default Register;
