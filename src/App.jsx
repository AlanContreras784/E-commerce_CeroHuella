import "./App.css";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useAuthContext } from "./contexts/AuthContext";

import Home from "./layouts/Home";
import ProductosContainer from "./components/ProductosContainer";
import Carrito from "./components/Carrito";
import About from "./components/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FormularioConSweetAlert from "./components/FormularioConSweetAlert";
import ProductoDetalle from "./components/ProductoDetalle";
import Login from "./components/Login";
import Registrarse from "./components/Registrarse";
import FormularioProducto from "./components/FormularioProducto";
import FormularioEdicion from "./components/FormularioEdicion";
import UsuariosContainerFirebase from "./components/UsuariosContainerFirebase";
import UsuarioDetalleFirebase from "./components/UsuarioDetalleFirebase";
import FormularioEdicionUsuario from "./components/FormularioEdicionUsuario";
import Reutilizables from "./components/Reutilizables";
import Biodegradables from "./components/Biodegradables";
import BolsasYLamparas from "./components/BolsasYLamparas";
import BotonWhatsApp from "./components/BotonWhatsApp";
import Talleres from "./components/Talleres";

function App() {
  const { verificacionLog } = useAuthContext();

  // Ejecutar solo una vez
  useEffect(() => {
    verificacionLog();
  }, [verificacionLog]);

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/talleres" element={<Talleres/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contacto" element={<FormularioConSweetAlert/>} />
        <Route path="/carrito" element={<Carrito/>} />
        <Route path="/productos" element={<ProductosContainer/>} />
        <Route path="/productos/:id" element={<ProductoDetalle/>} />

        {/* Categorías*/}
        <Route path="/reutilizables" element={<Reutilizables/>} />
        <Route path="/biodegradables" element={<Biodegradables/>} />
        <Route path="/bolsasYlamparas" element={<BolsasYLamparas/>} />

        {/* Admin*/}
        <Route path="/admin/agregarProductos" element={<FormularioProducto/>} />
        <Route path="/admin/editarProducto/:id" element={<FormularioEdicion/>} />

        {/* Usuarios*/}
        <Route path="/login" element={<Login/>} />
        <Route path="/registrarse" element={<Registrarse/>} />
        <Route path="/admin/usuarios" element={<UsuariosContainerFirebase/>} />
        <Route path="/admin/usuarios/:id" element={<UsuarioDetalleFirebase/>} />
        <Route path="/admin/editarUsuario/:id" element={<FormularioEdicionUsuario/>} />
      </Routes>

      <Footer/>
      <BotonWhatsApp/>
    </Router>
  );
}

export default App;
