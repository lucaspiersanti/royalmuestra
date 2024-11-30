import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import { GetReservas as getReservas } from '../../controllers/reservaController'


export const ControlReservasPage = () => {
    const [reservas,setReservas]=useState(null);

    useEffect(() => {
        async function fetchReservas() {
          try {
            const response = await getReservas();
            setReservas(response.data);
          } catch (error) {
            //console.log("Error al leer las reservas:",error);//Convertirlo en log
          }
        }
    

        fetchReservas();
      }, []);


    return (
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Control de reservas</h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">{reservas}</p>
            </div>
            <div className="flex flex-wrap -m-4 text-center">
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
          <Link to="/Administracion/Terrenos" className="block" style={{ cursor: 'pointer' }}>
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
              <i className="fas fa-map text-yellow-600 w-12 h-12 mb-2 mr-3 inline-block"></i>
              <h2 className="title-font font-medium text-3xl text-gray-900">
                Terrenos
              </h2>
              <p className="leading-relaxed">Todas las etapas</p>
            </div>
          </Link>
        </div>
              <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <Link to="/Administracion/Precios" className="block" style={{ cursor: 'pointer' }}>
                <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                <i className="fas fa-comment-dollar text-yellow-600 w-12 h-12 mb-2 mr-3 inline-block"></i>
                  <h2 className="title-font font-medium text-3xl text-gray-900">
                  Precios</h2>
                  <p className="leading-relaxed">Financiación</p>
                </div>
                </Link>
              </div>
              <div className="p-4 md:w-1/4 sm:w-1/2 w-full" >
              <Link to="/Administracion/Reservas" className="block" style={{ cursor: 'pointer' }}>
                <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                <i className="fas fa-check-to-slot text-yellow-600 w-12 h-12 mb-2 mr-3 inline-block"></i>
                  <h2 className="title-font font-medium text-3xl text-gray-900">Reservas</h2>
                  <p className="leading-relaxed">Consulta el estado</p>
                </div>
                </Link>
              </div>
             
              <div className="p-4 md:w-1/4 sm:w-1/2 w-full" >
                <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="text-indigo-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  <h2 className="title-font font-medium text-3xl text-gray-900">Próximo</h2>
                  <p className="leading-relaxed">En desarrollo</p>
                </div>
              </div>


            </div>
          </div>
        </section>
          );
}
