import React, { useEffect, useState } from "react";

import formatearPrecios from "../utils/formatearPrecios";

import { GetEtapasCategorias as getEtapasCategorias } from "../controllers/etapaCategoriaController";

export const TablaPrecios = () => {
    
  const [datosEtapasCategoria, setDatosEtapasCategoria] = useState([]);

  //Se deja de agregar dato adicional , pero se mantiene metodo para ordenar los datos
  const datosOrdenadosConAdicional = [
    ...datosEtapasCategoria,
    // datoAdicional,
  ].sort((a, b) => a.etapa_1 - b.etapa_1);

  useEffect(() => {
   
    async function fetchDatosEtapasCategoria() {
      try {
        const response = await getEtapasCategorias();
        setDatosEtapasCategoria(response.data);
      } catch (error) {
        console.log("Error al leer las etapas:", error); //Convertirlo en log
      }
    }
    fetchDatosEtapasCategoria();
  }, []);

  return (
    <section className="text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-col text-center w-full mb-20">
        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-3 text-gray-900">
          Precios
        </h1>
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
          El valor del metro cuadrado está asociado a la{" "}
          <strong>categoria</strong> del terreno y a la{" "}
          <strong>etapa </strong>
          constructiva en la cual se adquiere
        </p>
      </div>
      <div className="lg:w-2/3 w-full mx-auto overflow-auto">
        <table className="table-auto w-full text-left whitespace-no-wrap">
          <thead>
            <tr>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-yellow-600 rounded-tl rounded-bl">
                Categoria
              </th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-yellow-600">
                Etapa 1{" "}
              </th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-yellow-600">
                Etapa 2{" "}
              </th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-yellow-600">
                Etapa 3{" "}
              </th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-yellow-600">
                Etapa 4{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {datosOrdenadosConAdicional.map((dato, index) => (
              <tr key={index}>
                <td className="px-4 py-3">{dato.categoria}</td>
                <td className="px-4 py-3">
                  {formatearPrecios(dato.etapa_1)}
                </td>
                <td className="px-4 py-3">
                  {formatearPrecios(dato.etapa_2)}
                </td>
                <td className="px-4 py-3">
                  {formatearPrecios(dato.etapa_3)}
                </td>
                <td className="px-4 py-3">
                  {formatearPrecios(dato.etapa_4)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-center text-gray-500 mt-3">
        *Todos los valores expresados en dolares.
      </p>
    </div>
  </section>
  )
}
