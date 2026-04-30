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
      //const res = await fetch("https://node-entrega-final-back-end.vercel.app/api/login",
        const res = await fetch("https://api-productos-usuarios-node.vercel.app/api/login",
      {
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
