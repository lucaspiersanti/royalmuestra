import React, { useEffect, useState } from "react";


export const SeleccionPlanes = ({ onPlanSeleccionado }) => {

  const devolverPlanSeleccionado = (_plan) => {
    switch (_plan) {
      case "0":
        onPlanSeleccionado(true, false); //Plan standar
        break;
      case "1":
        onPlanSeleccionado(true, true);//Plan personalizado
        break;
      default:
        onPlanSeleccionado(false, false);
        break;

    }
  }


  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-18 mx-auto flex flex-wrap">
        <div className="flex flex-wrap -m-4">
          <div style={{ cursor: 'pointer' }} onClick={() => devolverPlanSeleccionado("0") } className="p-4 lg:w-1/2 md:w-full ">
            <div className="flex border-2 rounded-lg border-gray-200 border-opacity-50 hover:border-yellow-500 p-8 sm:flex-row flex-col">
              <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full hover:bg-yellow-100 bg-blue-100 text-blue-500 hover:text-yellow-500 flex-shrink-0">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-8 h-8" viewBox="0 0 24 24">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">Planes estandar</h2>
                <p className="leading-relaxed text-base">Podràs consultar por los diferentes planes que tenemos definidos para vos.</p>
              </div>
            </div>
          </div>
          <div style={{ cursor: 'pointer' }} onClick={() => devolverPlanSeleccionado("1") } className="p-4 lg:w-1/2 md:w-full">
            <div className="flex border-2 rounded-lg hover:border-yellow-500 border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
              <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full hover:bg-yellow-100 bg-blue-100 hover:text-yellow-500 text-blue-500 flex-shrink-0">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3"  >Plan personalizado</h2>
                <p className="leading-relaxed text-base" >Se ajusta a tus necesidades. Podrás definir la entrega y conocer la financiaciòn.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
