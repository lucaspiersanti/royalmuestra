import swal from "sweetalert";
import { useState, useEffect, Children } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BrowserRouter as Router, Route, useNavigate ,Link, Routes, NavLink, Outlet} from 'react-router-dom';
import { Logout as Logout } from "../controllers/loginController.jsx";

const Sidebar =  ({children}) => {
    const navigate = useNavigate();
   
    const cerrarSesion= async()=>{     
          try {
            await Logout(localStorage.getItem('username'));
          } catch (error) {
            console.error(error);
          }
          localStorage.removeItem('id');
          localStorage.removeItem('username');
          localStorage.removeItem('nombre');
          localStorage.removeItem('apellido');
          localStorage.removeItem('rol');
          localStorage.removeItem('Habilitado');
          swal(
              "Cerrando sesion",
              "Redirigiendo a Landing Royal ...",
              "info"
            );
        
          navigate("/");
      };

    useEffect(() => {
          if(!localStorage.getItem('username')){
            swal(
                "Deberá iniciar sesión",
                "Redirigiendo a Login ...",
                "info"
              );
            navigate("/Login");
          }
        }, []);
          
    
  return (
    <>
      <div
        style={{ backgroundColor: '#111827' }}
        className="h-[15%] fixed left-0 top-0 botton-1 w-full z-10 ease-in duration-300">
          <div className="max-w-[1240px] m-auto flex justify-between items-center p-2 text-white">
              <Link to="/">
                  <img loading="lazy" className="w-12 h-12" src="./favicon.ico" />
              </Link>
              <ul style={{ color: '#ffffff' }} className="hidden sm:flex items-center ">
                  <li className="p-4">
                      <span className="text-white ml-5 ">{localStorage.getItem('username')?.toUpperCase()}</span>
                      <i className="ml-5 w-10 h-10 fas fa-user-circle text-white text-2xl"></i>
                  </li>
              </ul>
          </div>
      </div>
        <div style={{ display: 'flex', marginTop:80 ,backgroundColor: '#111827'}}>
        {/* <!-- Navegación lateral --> */}
        <aside 
        style={{
          backgroundColor: '#111827',
          position: 'fixed',
          top: 10,           
          left: 0,          
          width: '250px',
          height: 'calc(100vh - 80px)', 
          overflowY: 'auto', 
        }} className="container max-w-[1240px] m-auto text-white w-64 min-h-screen p-4 ">
            <nav className="mt-[50%] ">
                <ul>
                    <div className="flex items-center justify-between mt-10 p-2 hover:bg-gray-700">
                       <div className="flex items-center">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" 
                        strokeWidth="2" className="text-white w-6 h-6 mb-2 mr-3 inline-block" viewBox="0 0 24 24">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                        <Link to="/Administracion" className="h-8">Dashboard</Link>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-10 p-2 hover:bg-gray-700">
                      <div className="flex items-center">
                      <i className="fas fa-map text-white w-6 h-6 mb-2 mr-3 inline-block"></i>
                        <Link to="/Administracion/Terrenos">Terrenos </Link>
                        </div>
                    </div>
                     <div className="flex items-center justify-between mt-10 p-2 hover:bg-gray-700">
                      <div className="flex items-center">
                      <i className="fas fa-comment-dollar text-white w-6 h-6 mb-2 mr-3 inline-block"></i>
                        <Link to="/Administracion/Precios">Precios </Link>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-10 p-2 hover:bg-gray-700">
                      <div className="flex items-center">
                      <i className="fas fa-check-to-slot text-white w-6 h-6 mb-2 mr-3 inline-block"></i>
                        <Link to="/Administracion/Reservas">Reservas </Link>
                        </div>
                    </div>
                    {/* {(localStorage.getItem('rol')=="Administrador") &&
                      (
                        <div className="flex items-center justify-between mt-10 p-2 hover:bg-gray-700">
                        <div className="flex items-center">
                        <i className="fas fa-user-circle text-white w-6 h-6 mb-2 mr-3 inline-block"></i>
                          <Link to="/Administracion/ControlGral">Control General </Link>
                          </div>
                      </div>
                      )
                    } */}
                     <div className="flex items-center justify-between mt-10 p-2 hover:bg-gray-700">
                        <div className="flex items-center">
                        <i className="fas fa-user-circle text-white w-6 h-6 mb-2 mr-3 inline-block"></i>
                          <Link to="/Administracion/ControlGral">Control General </Link>
                          </div>
                      </div>

                      <div className="flex items-center justify-between mt-10 p-2 hover:bg-gray-700">
                        <div className="flex items-center">
                        <i className="fas fa-user-circle text-white w-6 h-6 mb-2 mr-3 inline-block"></i>
                          <Link to="/Administracion/VentaMetro">Venta por Metro</Link>
                          </div>
                      </div>
                    <div className="flex items-center justify-between mt-10 p-2 hover:bg-gray-700">
                        <div className="flex items-center">
                        <i className="fas fa-circle-xmark text-white w-6 h-6 mb-2 mr-3 inline-block"></i>
                        <a href="#" onClick={()=>cerrarSesion()}>Cerrar Sesion </a>
                        </div>
                    </div>
                
                </ul>
            </nav>
        </aside>

        {/* <!-- Contenido principal --> */}
        <main style={{
           marginLeft: "250px", // Igual al ancho del menú lateral
           flex: 1,
           padding: 20,
           background: "#ffffff",
            }}>
                <Outlet/>
            </main>
        </div>
    </>
  );
}
export default Sidebar;

