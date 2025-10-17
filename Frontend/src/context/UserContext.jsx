import { createContext, useState, useContext } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null; // cargamos token desde localStorage para no perderlo
  });
  const [email, setEmail] = useState(null); //incorporamos nuevo useState
  
  //funcion login

  async function login({email, password}) {
   try {
    const res = await fetch("http://localhost:5001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify({ email, password })
    })
    const data = await res.json();

    if (!data.token) {
      return false;
    }

    setToken(data.token);
    setEmail(email);
    localStorage.setItem("token", data.token); // guardamos token en localStorage
    return true; // devolvemos true si el login fue exitoso (esto es para asegurar el login)
  }
   catch (error) {
    console.error(error);
    return false; // devolvemos false si hubo un error en el login
   }
  
  }

  //funcion register

  async function register({email, password}) {
    try {
     const res = await fetch("http://localhost:5001/api/auth/register", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       }, 
       body: JSON.stringify({ email, password })
     })
     const data = await res.json();
     setToken(data.token);
     setEmail(email);
     localStorage.setItem("token", data.token); // guardamos token en localStorage
   }
    catch (error) {
     console.error(error);
    }
   
   }

  //funcion logout
  //const logout = () => setToken(false); aqui lo cambiamos a función

  function logout() {
   setToken(null);
   setEmail(null);
   localStorage.removeItem("token"); // eliminamos token del localStorage
  }

  // funcion para el "me" del backend
  async function getProfile() {
    if (!token) {
      console.error("No hay token disponible para obtener el perfil");
      return null;
    }
    try {
      const res = await fetch("http://localhost:5001/api/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }         
    })

    if (!res.ok) {
      console.error("Error al obtener el perfil:", res.statusText); // <-- NUEVO
      return null;
    }

      const data = await res.json();
      setEmail(data.email);
      return data; // retornamos data para usarla en el componente
      // console.log(data); dejamos de usar esto
  }
    catch (error) {
      console.error(error);
    }

  }

  const value = { token, email, login, register, logout, getProfile }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext);
}