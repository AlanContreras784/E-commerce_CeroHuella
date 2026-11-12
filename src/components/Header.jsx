import Logo from "../assets/img/Logo Cero Huella Horiz.png"
import "../styles/Header.css"
import {Container, Navbar, Nav, Badge, NavDropdown, Offcanvas, Form, Button, InputGroup} from 'react-bootstrap';
import { Link, useNavigate} from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { CarritoContext } from '../contexts/CarritoContext';
import { useAuthContext } from "../contexts/AuthContext";
import { useProductosContext } from "../contexts/ProductosContext";
import { useLocation } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import { useRef } from "react";


function Header() {
    const {user, admin, logout}= useAuthContext();
    const {productosCarrito} = useContext(CarritoContext);
    const navigate= useNavigate();
    const [busqueda,setBusqueda]=useState('');
    const {filtrarProductos}=useProductosContext();
    const location = useLocation();
    // Controla si el menú desplegable (offcanvas) está abierto, para poder cerrarlo desde la lupa
    const [menuAbierto, setMenuAbierto] = useState(false);

    function obtenerUsername(token){
        const email = token.replace('fake-token-', '');
        return email.split('@')[0];
    }

    function handleNavigateLogin(){
        navigate('/login');
    }

    function handleLogout(){
        logout();
    }
    const firstUpdate = useRef(true);

    useEffect(() => {
        filtrarProductos(busqueda);
        if (firstUpdate.current) {
        firstUpdate.current = false;
        return; // No redirigir en el primer render
        }
        if (busqueda !== '' && location.pathname !== '/productos') {
        navigate('/productos');
        }
    }, [busqueda]);

    return (
        <header className="header ">
            <Navbar collapseOnSelect expand='lg' expanded={menuAbierto} onToggle={setMenuAbierto} className="fs-6 py-1" variant="dark">
                <Container className="mt-1 mb-1" fluid>
                    <Navbar.Brand as={Link} to={'/'} href="#"><img className="logo  me-auto" src={Logo} alt="" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
                    <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-lg`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                    placement="end"
                    backdrop='static'
                    className='ps-0'
                    >
                        <Offcanvas.Header  closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`} as={Link} to={'/'} href="#">
                            <img className="w-25 h-25 me-auto" src={Logo} alt="logo" />
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav variant="underline"  className="justify-content-around  flex-grow-1 ">
                                <InputGroup className="d-flex  align-items-center me-auto border-boton  ">
                                <Form.Control
                                placeholder="Buscar productos"
                                type="search"
                                aria-label="Search"
                                aria-describedby="basic-addon2"
                                value={busqueda}
                                // onChange={(e) => setBusqueda(e.target.value)}
                                onChange={(e) => {
                                    const valor = e.target.value;
                                    setBusqueda(valor);
                                    filtrarProductos(valor);
                                    }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        filtrarProductos(busqueda);
                                        setMenuAbierto(false);
                                    }
                                }}
                                />
                                <Button variant="" className=" px-3 "  id="button-addon2" onClick={() => { filtrarProductos(busqueda); setMenuAbierto(false); }} aria-label="Buscar">
                                <i className="fa-solid fa-magnifying-glass fa-lg" style={{color: '#ffffff'}}></i>
                                </Button>
                            </InputGroup>
                            <Nav.Link href="#" eventKey={'/'} as={Link} to={'/'} className='nav-link me-auto'>Home</Nav.Link>
                            {/* <Nav.Link href="#" eventKey={'/productos'} as={Link} to={'/productos'} className='nav-link'>Productos</Nav.Link> */}
                            <Nav.Link href="#" eventKey={'/about'} as={Link} to={'/about'} className='nav-link  me-auto'>Nosotros</Nav.Link>
                            <Nav.Link href="#" eventKey={'/talleres'} as={Link} to={'/talleres'} className='nav-link  me-auto'>Talleres</Nav.Link>
                            <NavDropdown title="Productos" id="nav-dropdown" className=" me-auto">
                                <NavDropdown.Item  eventKey="/reutilizables" as={Link} to={'/reutilizables'}>Reutilizables</NavDropdown.Item>
                                <NavDropdown.Item eventKey="/biodegradables" as={Link} to={'/biodegradables'}>Biodegradables</NavDropdown.Item>
                                <NavDropdown.Item eventKey="/bolsasYlamparas" as={Link} to={'/bolsasYlamparas'}>Bolsas y Lamparas</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item eventKey="/productos" as={Link} to={'/productos'}>Todos</NavDropdown.Item>
                            </NavDropdown> 
                            <Nav.Link href="#" eventKey={'/contacto'} as={Link} to={'/contacto'} className='nav-link me-auto'>Contacto</Nav.Link>
                            {admin ? <Nav.Link href="#" as={Link} to={'/admin/agregarProductos'} className='nav-link me-auto'>Agregar Productos</Nav.Link> : <></>}
                            
                            {admin ? <Nav.Link href="#" eventKey={'/admin/usuarios'} as={Link} to={'/admin/usuarios'} className='nav-link me-auto'>Usuarios</Nav.Link> : <></> }
                            {/* <Nav.Link href="#" eventKey={'/carrito'} as={Link} to={'/carrito'} aria-label="carrito de compras" className='mx-1 mt-2 nav-link position-relative me-auto'><i className= " fa-solid fa-cart-shopping fa-lg"><Badge pill bg="danger"  className="position-absolute  me-5 translate-middle badge-small">{productosCarrito.length>0 ? productosCarrito.length : ""}</Badge></i></Nav.Link> */}
                            <Nav.Link href="#" eventKey={'/login'} as={Link} to={'/login'} className='mx-0 ms-0 nav-link me-auto'><Button size="md" variant="outline-light" className="border-0 ps-0" onClick={ !user ? handleNavigateLogin : handleLogout}>{ !user ? <i className="fa-solid fa-user fa-xl" style={{color:"#ffffff"}}></i> : <span size="md" variant="outline-light" className="border-boton p-1"><CiLogout /> : {obtenerUsername(user)}</span>}</Button></Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </header>
    
    );
}

export default Header;