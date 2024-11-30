import { FormReserva } from "../../components/FormReserva"
import { useState } from "react";


export const ReservasPage = () => {

  const [mostrarPaso0, setMostrarPaso0] = useState(true);
  const [mostrarPaso1, setMostrarPaso1] = useState(false);
  const [mostrarPaso2, setMostrarPaso2] = useState(false);
  const [mostrarPaso3, setMostrarPaso3] = useState(false);
  const [mostrarPaso4, setMostrarPaso4] = useState(false);
  const [mostrarPaso5, setMostrarPaso5] = useState(false);

  const [mostrarPasoActual, setPasoActual] = useState("0");

  const obtenerPasoSiguiente = () => {

    const pasoActualNumero = parseInt(mostrarPasoActual, 10);

    const pasoSiguiente = (pasoActualNumero + 1).toString();

    return pasoSiguiente;
  };


 
  const mostrarPaso = (paso) => {
    switch (paso) {
      case "0":
        if (!mostrarPaso0) {
          setMostrarPaso0(true);
          setMostrarPaso1(false);
          setMostrarPaso2(false);
          setMostrarPaso3(false);
          setMostrarPaso4(false);
          setMostrarPaso5(false);
          setPasoActual(0);
        }
        break;
      case "1":
        if (!mostrarPaso1) {
          setMostrarPaso0(false);
          setMostrarPaso1(true);
          setMostrarPaso2(false);
          setMostrarPaso3(false);
          setMostrarPaso4(false);
          setMostrarPaso5(false);
          setPasoActual(1);
        }
        break;
      case "2":
        if (!mostrarPaso2) {          
          setMostrarPaso0(false);
          setMostrarPaso1(false);
          setMostrarPaso2(true);
          setMostrarPaso3(false);
          setMostrarPaso4(false);
          setMostrarPaso5(false);
          setPasoActual(2);
        }
        break;
      case "3":
        if (!mostrarPaso3) {
          setMostrarPaso0(false);
          setMostrarPaso1(false);
          setMostrarPaso2(false);
          setMostrarPaso3(true);
          setMostrarPaso4(false);
          setMostrarPaso5(false);
          setPasoActual(3);
        }
        break;
      case "4":
        if (!mostrarPaso4) {          
          setMostrarPaso0(false);
          setMostrarPaso1(false);
          setMostrarPaso2(false);
          setMostrarPaso3(false);
          setMostrarPaso4(true);
          setMostrarPaso5(false);
          setPasoActual(4);
        }
        break;
      case "5":
        if (!mostrarPaso5) {
          setMostrarPaso0(false);
          setMostrarPaso1(false);
          setMostrarPaso2(false);
          setMostrarPaso3(false);
          setMostrarPaso4(false);
          setMostrarPaso5(true);
          setPasoActual(5);
        }
        break;
      default:
        setMostrarPaso0(true);
        setPasoActual(0);
        //////console.log("Error switch paso");
        break;
    }
  }

  const [datosFormulario, setDatosFormulario] = useState(null);

  const handleReservaDatos = (datos) => {
    setDatosFormulario(datos);
  };

  return (
    <>
      <section className="text-gray-600 body-font relative">
        <div className="container px-1 py-8 ">
          <div className="flex flex-col text-center w-full mb-6">
            <h1 className="text-2xl font-medium title-font mb-4 text-gray-900">
              Generación de reserva de terreno

            </h1>
          
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Podrás realizar la reserva del terreno de interes, generando los documentos para tal fin.
            </p>
          </div>
          <hr></hr>
          <div className="container px-1 py-2 text-sm">
            <div className="flex flex-col text-center w-full">
              <div className="flex flex-wrap justify-center gap-4 align-item-center">
              <div className="flex relative justify-center align-items-center " onClick={() => mostrarPaso("0")}
                  style={{ cursor: 'pointer' }}>
                  <div className={`flex-shrink-0 w-7 h-7 rounded-full ${mostrarPaso0 ? 'bg-yellow-600' : 'bg-blue-300'} inline-flex items-center justify-center text-white relative `}
                  >
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                      <path d="M22 4L12 14.01l-3-3"></path>
                    </svg>
                  </div>
                  <div className="flex-grow pl-4">
                    <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">Validar cliente</h2>
                  </div>
                </div>
                
                <div className="flex relative justify-center align-items-center " onClick={() => mostrarPaso("1")}
                  style={{ cursor: 'pointer' }}>
                  <div className={`flex-shrink-0 w-7 h-7 rounded-full ${mostrarPaso1 ? 'bg-yellow-600' : 'bg-blue-300'} inline-flex items-center justify-center text-white relative `}
                  >
                     <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div className="flex-grow pl-4">
                    <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">Ficha del cliente</h2>
                  </div>
                </div>

                <div className="flex relative justify-center align-items-center" onClick={() => mostrarPaso("2")}
                  style={{ cursor: 'pointer' }}>
                  <div className={`flex-shrink-0 w-7 h-7 rounded-full ${mostrarPaso2 ? 'bg-yellow-600' : 'bg-blue-300'
                    }
                        inline-flex items-center justify-center text-white relative `}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100" height="100">
  <polygon points="12 2 2 12 22 12" fill="white" />

  <rect x="5" y="12" width="14" height="10" fill="white" />
  
  <rect x="10" y="15" width="4" height="7" fill="grey" />

</svg>
                    {/* <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg> */}
                  </div>
                  <div className="flex-grow pl-4">
                    <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">Ficha del terreno</h2>
                  </div>
                </div>
                <div className="flex relative justify-center align-items-center" onClick={() => mostrarPaso("3")}
                  style={{ cursor: 'pointer' }}>
                  <div className={`flex-shrink-0 w-7 h-7 rounded-full ${mostrarPaso3 ? 'bg-yellow-600' : 'bg-blue-300'
                    }
         inline-flex items-center justify-center text-white relative `}
                  >


                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <rect x="2" y="3" width="20" height="18" fill="white" stroke="grey" strokeWidth="1" />

<line x1="12" y1="3" x2="12" y2="21" stroke="grey" strokeWidth="1" />
                    </svg> 
                  </div>
                  <div className="flex-grow pl-4">
                    <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">Documentos</h2>
                  </div>
                </div>
                <div className="flex relative justify-center align-items-center" onClick={() => mostrarPaso("4")}
                  style={{ cursor: 'pointer' }}>
                  <div className={`flex-shrink-0 w-7 h-7 rounded-full ${mostrarPaso4 ? 'bg-yellow-600' : 'bg-blue-300'
                    }
         inline-flex items-center justify-center text-white relative `}
                  >
                    {/* <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg> */}
                     <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                     <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  
                  </div>
                  <div className="flex-grow pl-4">
                    <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">Notificaciones</h2>
                  </div>
                </div>
                <div className="flex relative justify-center align-items-center" onClick={() => mostrarPaso("5")}
                  style={{ cursor: 'pointer' }}>
                  <div className={`flex-shrink-0 w-7 h-7 rounded-full ${mostrarPaso5 ? 'bg-yellow-600' : 'bg-blue-300'
                    }
         inline-flex items-center justify-center text-white relative `}
                  ><svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                      <path d="M22 4L12 14.01l-3-3"></path>
                    </svg>
                  </div>
                  <div className="flex-grow pl-4">
                    <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">Resumen</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr></hr>

        </div>
      </section>

      <section className="text-gray-600 body-font">
        <div className="container flex flex-wrap w-full ">

          <FormReserva pasoActual={mostrarPasoActual} informarPasoSiguiente={() => mostrarPaso(obtenerPasoSiguiente())} onReservaDatos={handleReservaDatos}></FormReserva>

        </div>
      </section>
    </>
  )
}
