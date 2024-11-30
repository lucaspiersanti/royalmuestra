import { useState } from 'react';
import MapaInteractivo from '../../components/MapaInteractivo';
import FiltroLotes from '../../components/FiltroLotes';


const Terrenos = () => {   
  const [datosFiltrados, setDatosFiltrados] = useState(null);
  // const [etapaFiltrada, setEtapaFiltrada] = useState(null);

  // Función para actualizar los datos filtrados
  const actualizarDatosFiltrados = (nuevosDatos) => {
    setDatosFiltrados(nuevosDatos);
  };

    // Función para actualizar imagen del mapa interactivo
    // const actualizarMapaInteractivo = (etapa) => {
    //   setEtapaFiltrada(etapa);
    // };
  


    

  return (
<>
      <div className="container mx-auto flex flex-wrap items-center">
        <FiltroLotes onDatosFiltrados={actualizarDatosFiltrados}  ></FiltroLotes>
        {/* <FiltroLotes onDatosFiltrados={actualizarDatosFiltrados} onActualizarMapaInteractivo={actualizarMapaInteractivo} ></FiltroLotes> */}
        <MapaInteractivo datosFiltrados={datosFiltrados}></MapaInteractivo>
        {/* <MapaInteractivo datosFiltrados={datosFiltrados} onEtapaFiltrada={etapaFiltrada} ></MapaInteractivo> */}
      </div>
    </>
  );
};

export default Terrenos;