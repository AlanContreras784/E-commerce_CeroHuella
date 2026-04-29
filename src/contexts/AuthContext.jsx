// import { createContext, useState, useContext } from 'react';
// import Swal from "sweetalert2";

// // Crear el contexto de autenticación
// const AuthContext = createContext();
// export function AuthProvider({ children }) {
  
//   const [user, setUser] = useState(null);
//   const [admin, setAdmin] = useState(false);

//   //--------------------FUNCION INICIAR SESION ------------------------------------
//   const login = (username) => {
//     const administrator=import.meta.env.VITE_ADMIN;
//     // Simulando la creación de un token (en una app real, esto sería generado por un servidor)
//     const token = `fake-token-${username}`;
  
//     if(username===administrator){ //contraseña : test12
//         setAdmin(true);
//     }
//     localStorage.setItem('authToken', token);
//     setUser(username);
//   };

//   //Funcion para cerrar Sesion-------------------------------------
//   const logout = () => {
//     Swal.fire({
//         title: "¿Estás seguro?",
//         text: "¡Quieres cerrar sesión!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Si, cerrar!",
//         cancelButtonText: "Cancelar",
//         }).then((result) => {
//         if (result.isConfirmed) {
//             Swal.fire({
//             title: "Ok!",
//             text: "Cerraste sesión.",
//             icon: "success"
//             });
//             localStorage.removeItem('authToken');
//             setUser(null);
//             setAdmin(false)
//         }else{

//         }
//     });

//   };

//   //FUNNCION PARA VERIFICACION DE USUARIO Y ADMIN--------------------------
//   function verificacionLog(){
//     const userToken = localStorage.getItem("authToken")
//     const administrator=import.meta.env.VITE_ADMIN;
//     if(userToken && userToken == `fake-token-${administrator}`){
//       setAdmin(true)
//       setUser(userToken)
//       return
//     }if(userToken){
//       setUser(userToken)
//     }
//   }

//   return (
//     <AuthContext.Provider value={{ user, login, logout, admin, verificacionLog}}>
//       {children}
//     </AuthContext.Provider> );
// }
// export const useAuthContext = () => useContext(AuthContext);

import { createContext, useState, useContext, useCallback } from "react";
import Swal from "sweetalert2";

// Contexto con valor inicial seguro
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  // ------------------------------
  // 🔐 LOGIN CON BACKEND
  // ------------------------------
  const login = useCallback(async (email, password) => {
    try {
      const res = await fetch("https://node-entrega-final-back-end.vercel.app/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        Swal.fire("Error", "Credenciales incorrectas", "error");
        return false;
      }

      const data = await res.json(); // { token }

      // Guardar token y usuario
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userEmail", email);

      setUser(email);

      const administrator = import.meta.env.VITE_ADMIN;
      setAdmin(email === administrator);

      return true;

    } catch (error) {
      Swal.fire("Error", "No se pudo conectar con el servidor", "error");
      console.error("Error en login:", error);
      return false;
    }
  }, []);


  // ------------------------------
  // 🔄 VERIFICAR LOGIN (persistencia)
  // ------------------------------
  const verificacionLog = useCallback(() => {
    const token = localStorage.getItem("authToken");
    const savedEmail = localStorage.getItem("userEmail");
    const administrator = import.meta.env.VITE_ADMIN;

    if (!token || !savedEmail) return;

    setUser(savedEmail);
    setAdmin(savedEmail === administrator);
  }, []);


  // ------------------------------
  // 🚪 LOGOUT
  // ------------------------------
  const logout = useCallback(() => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Sesión cerrada", "Has cerrado sesión correctamente", "success");

        localStorage.removeItem("authToken");
        localStorage.removeItem("userEmail");

        setUser(null);
        setAdmin(false);
      }
    });
  }, []);


  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        login,
        logout,
        verificacionLog,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado
export const useAuthContext = () => useContext(AuthContext);
