import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import FormClientePrecio from "../../components/FormClientePrecio";
import formatearPrecios from "../../utils/formatearPrecios";
import { GetLotes as getLotes } from "../../controllers/lotesController";
import { GetEtapasCategorias as getEtapasCategorias } from "../../controllers/etapaCategoriaController";
import { InputEnteros } from "../../components/shared/inputEnteros.jsx";
import { SeleccionPlanes2 } from "../../components/SeleccionPlanes2.jsx";
import { IntroduccionSeccion } from "../../components/shared/IntroduccionSeccion.jsx";
import swal from "sweetalert";
import calcularPlanes2 from "../../utils/calcularPlanes2.jsx";

const METROS_CUADRADOS_PISO = 1;

const VentaMetroPage = () => {
  //Refactor
  const [idlote, setIdLote] = useState("");
  const [id_etapas_vta_categoria, set_id_etapas_vta_categoria] = useState("");
  const [cantSecciones, setCantSecciones] = useState("");
  const [cantMaximaSecciones, setCantMaximaSecciones] = useState("");
  const [metrosCuadradosSeccion] = useState("10");
  const [categoria, setCategoria] = useState("");
  
  const [terrenosByCategoria, setTerrenosByCategoria] = useState([]);
  const [simulacionCrowdFunding, setSimulacionCrowdFunding] = useState(null);

  const fechaActual = new Date();
  const dia = fechaActual.getDate();
  const mes = fechaActual.getMonth() + 1;
  const anio = fechaActual.getFullYear();
  const fechaFormateada = `${dia}/${mes}/${anio}`;


  //END Refactor
  
  const [categoriaAux, setCategoriaAux] = useState("");//Nuevo
  
  
  const resumenPlanVentaRef = useRef(null);
  const [datosListos, setDatosListos] = useState(false);
  const [datosEtapasCategoria, setDatosEtapasCategoria] = useState([]);

  const [numeroAux, setNumeroAux] = useState("");
  const [etapaAux, setEtapaAux] = useState("");
  const [seccionAux, setSeccionAux] = useState("");
  const [entregaAux, setEntregaAux] = useState("");
  
  const [metrosCuadradosAux, setMetrosCuadradosAux] = useState("");
  const [generarPlan, setGenerarPlan] = useState(false);
  const [lotes, setLotes] = useState([]);
  const [verPlanes, setVerPlanes] = useState(false);
  const [lotePlan, setLotePlan] = useState(null);
  const [etapaCategoria, setEtapaCategoria] = useState(null);
  const [nuevaConsulta, setNuevaConsulta] = useState(false);
  const [cambiarPlan, setCambiarPlan] = useState(false);
  const [showExportButton, setShowExportButton] = useState(true);

  const [formClienteValido, setFormClienteValido] = useState(false);
  const [formCliente, setFormCliente] = useState(null);
  const [planPersonalizado, setPlanPersonalizado] = useState(false);
  const [planSeleccionado, setPlanSeleccionado] = useState(false);


  // Función para actualizar los datos filtrados
  const actualizarEstadoFormCliente = (estado) => {
    setFormClienteValido(estado);
  };

  const recibirDatosFormCliente = (form) => {
    setFormCliente(form);
  };

  const recibirDatosSeleccionPlanes = (_planSeleccionado, _planPersonalizado) => {
    if(_planSeleccionado===0){
      swal(
        "Plan no disponible",
        "Debe seleccionar otra opcion",
        "error"
      );
    }
    else{
      setPlanPersonalizado(true);
      setPlanSeleccionado(true);
    }
  };

  //Inputs
  const handleChange = (nuevoDato, _label) => {
    switch (_label) {
      case 'Terreno':
        setIdLote(nuevoDato);
        setNumeroAux(nuevoDato);
        break;
      case 'Secciones':
          setCantSecciones(nuevoDato);
          setSeccionAux(nuevoDato);
        break;
    }

  };

  //Carga datos iniciales Terrenos-etapas
  useEffect(() => {
    async function fetchLotes() {
      try {
        const response = await getLotes();
        console.log("Resp:",response);
        setLotes(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchDatosEtapasCategoria() {
      try {
        const response = await getEtapasCategorias();
        setDatosEtapasCategoria(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchLotes().then(() => fetchDatosEtapasCategoria());
  }, []);

  const simularPlan = (_plan) => {  //SIMULAR
      validarDatosSimulacion(_plan);
  };

  const validarDatosSimulacion = (_plan) => {

    switch(_plan){
      case 1: validarDatosCrowdfunding();
      break;
    }
  };

  const validarDatosCrowdfunding=()=>{
    let formSimulacion = true;
    
    if (categoria === "") {
      swal(
        "Campo sin completar",
        "Debe seleccionar la categoria del terreno",
        "info"
      );
      formSimulacion = false;
    }
    
    if (idlote === "") {
      swal(
        "Campo sin completar",
        "Debe completar el numero de terreno",
        "info"
      );
      formSimulacion = false;
    }
    if (id_etapas_vta_categoria === "") {
      swal(
        "Campo sin completar",
        "Debe seleccionar la etapa",
        "info"
      );
      formSimulacion = false;
    }

    if (cantSecciones === "") {
      swal(
        "Campo sin completar",
        "Debe completar la cantidad de secciones",
        "info"
      );
      formSimulacion = false;
    }

    if (formSimulacion) {
      setCategoriaAux(categoria);
      setNumeroAux(idlote);
      setEtapaAux(id_etapas_vta_categoria);
      setSeccionAux(cantSecciones);
      getValorMetroCuadrado();
    }
  }

  /*
    Devuelve el valor del metro cuadrado del lote en la etapa de venta correspondiente.
   */
  const getValorMetroCuadrado = () => {
    let loteAux;
    let etapaCategoriaAux;
    lotes.map((plote) => {
      if (plote.idlote === parseInt(idlote)) {
        setLotePlan(plote);
        loteAux = plote;
        datosEtapasCategoria.map((etapa_categoria) => {
          if (etapa_categoria.categoria === plote.categoria) {
            setEtapaCategoria(etapa_categoria);
            etapaCategoriaAux = etapa_categoria;
          }
        });
      }
    });

    if (
      loteAux !== null &&
      etapaCategoriaAux !== null &&
      idlote !== "" &&
      id_etapas_vta_categoria !== ""
    ) {
      setDatosListos(true); //Maneja carga asincrona
    }
  };

  //Con datosListos, genero los planes
  useEffect(() => {
    let simulacion;
    if (datosListos && lotePlan && etapaCategoria) {
      simulacion = calcularPlanes2(lotePlan, etapaCategoria, id_etapas_vta_categoria, metrosCuadradosSeccion,cantSecciones);
      setSimulacionCrowdFunding(simulacion);
      setGenerarPlan(true);
      setNuevaConsulta(true);
      scrollToResumenPlanVenta();
    }
  }, [datosListos,lotePlan, etapaCategoria]);

  useEffect(() => {
    if (lotePlan && etapaCategoria) {
      getValorMetroCuadrado();
    }
  }, [lotePlan, etapaCategoria]);


  const cancelarFormSimulacion = () => {
    resetSameClient();
    resetPlanes();
  }


  const resetNewClient = () => {
    resetFormularioCliente();
    resetSameClient();
    resetPlanes();
  }

  const resetFormularioCliente = () => {
    setFormCliente(null);
    setFormClienteValido(false);
    setPlanSeleccionado(false);
    setGenerarPlan(false);
  };

  const resetSameClient = () => {
    setCategoria("");
    setIdLote("");
    setCantSecciones("");
    set_id_etapas_vta_categoria("");

    setLotePlan(null);
    setEtapaCategoria(null);
    setDatosListos(false);

    //Para encabezado del informe
    setNumeroAux("");
    setEtapaAux("");
    setSeccionAux("");
    setEntregaAux(null);
  }

  
  const onNuevaSimulacion = () => {

    if (formClienteValido) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
      });
      swalWithBootstrapButtons
        .fire({
          title: "¿ Cambiar de cliente ?",
          text: `Cliente actual: ${formCliente.apellido}`,
          icon: "info",
          showCancelButton: true,
          confirmButtonText: "Si, cambiar cliente",
          cancelButtonText: "No",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire({
              title: "Cliente nuevo!",
              text: "Deberá cargar los datos del mismo",
              icon: "info",
            });
            resetNewClient();
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
              title: "Continuar con cliente",
              text: "Podrá generar un nuevo plan",
              icon: "info",
            });
            resetSameClient();
            resetPlanes();
          }
        });
    }
  };

  const resetPlanes = () => {
    setGenerarPlan(false);
    setVerPlanes(false);
    setPlanSeleccionado(false);
    setPlanPersonalizado(false);
    setNuevaConsulta(false);
    setShowExportButton(true);
  }


  const scrollToResumenPlanVenta = () => {
    if (resumenPlanVentaRef.current) {
      resumenPlanVentaRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };


  const [secciones] = useState([
    {
      id: "1",
      titulo: "Crowdfunding",
      subTitulo: "Podrás simular el precio de venta de secciones de 10 metros cuadrados de un terreno en particular."
    },
  ]);

  const infoSecciones = `1 a ${cantMaximaSecciones} Secciones`;

  const calcularSecciones = (_terreno) => {
    let loteAux;
    let seccionLim;
    lotes.map((plote) => {
      if (plote.idlote === parseInt(_terreno)) {
        loteAux = plote;
        seccionLim = Math.floor(parseFloat(loteAux.dimensiones) /10);//Este metodo deberá ser deprecado, las secciones vendran del back
        setCantMaximaSecciones(seccionLim);
      }
    });
  }



const getTerrenoByCategory = (categoria) => {
  let filteredTerrenosInv= lotes.filter((pLote) => pLote.estado == "Inversor");
  let filteredTerrenobyCat = filteredTerrenosInv.filter((pLote) => pLote.categoria == categoria);
  filteredTerrenobyCat.sort((a, b) => a.idlote - b.idlote);
  if(filteredTerrenobyCat.length == 0){
    swal(
      "Secciones no disponibles",
      "Debe seleccionar otra categoria",
      "error"
    );
  }
  else{
    setTerrenosByCategoria(filteredTerrenobyCat);
  }
};


  useEffect(() => {
    if (categoria) {
      getTerrenoByCategory(categoria);
    }
  }, [categoria]);

  useEffect(() => {
    if (idlote) {

      calcularSecciones(idlote);
    }
  }, [idlote]);


  return (
    <>
      <section className="text-gray-600 body-font relative">
        <div className="container px-1 py-24 mx-auto">
          <IntroduccionSeccion _titulo={secciones[0].titulo} _subtitulo={secciones[0].subTitulo}></IntroduccionSeccion>

          {!formClienteValido && !planSeleccionado && !generarPlan && (
            <FormClientePrecio onEstadoFormCliente={actualizarEstadoFormCliente} onformularioCompleto={recibirDatosFormCliente} onResetFormulario={formCliente}></FormClientePrecio>
          )}

          {formClienteValido && !planSeleccionado && !generarPlan && (
            <>
              <SeleccionPlanes2 onPlanSeleccionado={recibirDatosSeleccionPlanes}></SeleccionPlanes2>
              <div className="flex w-1/2 mx-auto">
                <button
                  onClick={() => resetFormularioCliente()}
                  style={{ height: "40px", width: "100%" }}
                  className="mt-4 text-center text-white bg-red-500 border-0 py-2 focus:outline-none hover:bg-red-600 rounded text-lg">
                  Cancelar
                </button>
              </div>
            </>
          )}

          {nuevaConsulta && generarPlan && (
            <div className="p-2 w-full text-center">
              <button
                onClick={() => onNuevaSimulacion()}
                style={{ height: "40px", width: "100%" }}
                className="mt-4 text-center text-white bg-green-500 border-0 py-2 focus:outline-none hover:bg-green-600 rounded text-lg">
                Nueva Simulacion
              </button>
            </div>
          )}

          {!nuevaConsulta && planSeleccionado && (
            <div className="text-gray-600 body-font relative">
              <div className="container px-5 mx-auto">
                <div
                  className="p-1 m-1 md:w-2/3 mx-auto md:flex-wrap lg:flex-wrap flex xl:flex-wrap   
                bg-clip-padding backdrop-filter backdrop-blur bg-opacity-20 
                backdrop-saturate-50 backdrop-contrast-150 bg-white">

                  <div className="flex w-full space-x-4">
                    <div className="w-1/2 relative p-1 mb-4 flex flex-wrap">
                      <div className="relative w-full">
                        <label
                          htmlFor="categoria"
                          className="text-label">
                          <b>Categoria</b>
                        </label>
                        <select
                          id="categoria"
                          name="categoria"
                          value={categoria}
                          onChange={(ev) => { 
                            setCategoria(ev.target.value);
                            
                          }}
                          style={{ height: "42px", width: "100%" }}
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out">
                          <option value="">Seleccionar</option>
                          <option value="Vista Verde">Vista Verde</option>
                          <option value="Vista a Avenida">Vista a Avenida</option>
                          <option value="Vista a Avenida y Verde">Vista a Avenida y Verde</option>
                          <option value="Vista al Lago">Vista al Lago</option>
                          <option value="Vista a calle">Vista a calle</option>
                        </select>
                      </div>
                    </div>
                    <div className="w-1/2 relative p-1 mb-4 flex flex-wrap">
                      <div className="relative w-full">
                        <label
                          htmlFor="idlote"
                          className="text-label">
                          <b>Terreno</b>
                        </label>
                        <select
                            id="idlote"
                            name="idlote"
                            value={idlote || ""}
                            onChange={(ev) => { 
                              setIdLote(ev.target.value);
                            }}
                            style={{ height: "42px", width: "100%" }}
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                          >
                            <option value="">Seleccionar</option>
                            {terrenosByCategoria.map((terreno) => {
                              const value = `${terreno.idlote}`;
                              return (
                                <option key={value} value={value}>
                                 {value}
                                </option>
                              );
                            })}
                          </select>
                      </div>
                    </div>
                    {!planPersonalizado && (
                      <div className="w-1/2 relative p-1 mb-4 flex flex-wrap">
                        <div className="relative w-full">
                          <InputEnteros _label={"MetrosCuadrados"} _obligatorio={true} _info={infoSecciones} _piso={METROS_CUADRADOS_PISO} _techo={cantMaximaSecciones} _maxLength={4} onChange={handleChange}></InputEnteros>
                        </div>
                      </div>
                    )}
{/* //Plan Crowdfunding */}
                    {planPersonalizado && idlote && (
                      <div className="w-1/2 relative p-1 mb-4 flex flex-wrap">
                      <div className="relative w-full">
                        <InputEnteros _label={'Secciones'} _obligatorio={true} _info={infoSecciones} _piso={1} _techo={cantMaximaSecciones} _maxLength={3} onChange={handleChange}></InputEnteros>
                      </div>
                    </div>
                    )}
                    <div className="w-1/2 relative p-1 mb-4 flex flex-wrap">
                      <div className="relative w-full">
                        <label
                          htmlFor="id_etapas_vta_categoria"
                          className="text-label">
                          <b>Etapa</b>
                        </label>
                        <select
                          id="id_etapas_vta_categoria"
                          name="id_etapas_vta_categoria"
                          value={id_etapas_vta_categoria}
                          onChange={(ev) => set_id_etapas_vta_categoria(ev.target.value)}
                          style={{ height: "42px", width: "100%" }}
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out">
                          <option value="">Seleccionar</option>
                          <option value="1">Etapa 1</option>
                        </select>
                      </div>
                    </div>


                  </div>

                  <div className="flex w-full space-x-4">

                    <div className="w-1/2 p-2">
                      <button
                        onClick={() => cancelarFormSimulacion()}
                        style={{ height: "40px", width: "100%" }}
                        className="mt-4 text-center text-white bg-red-500 border-0 py-2 focus:outline-none hover:bg-red-600 rounded text-lg">
                        Cancelar
                      </button>
                    </div>
                    <div className="w-1/2 p-2">
                      <button
                        onClick={() => simularPlan(1)}
                        style={{ height: "40px", width: "100%" }}
                        className="mt-4 text-center text-white bg-blue-500 border-0 py-2 focus:outline-none hover:bg-blue-600 rounded text-lg">
                        Simular plan Crowdfunding
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      <hr ></hr>
      {generarPlan &&
        (
          <section
            id="pdf-content"
            className="text-gray-600 body-font overflow-hidden">
            <hr ></hr>
            <div className="mb-1 leading-relaxed mt-3 flex justify-center items-center">
              <div className="flex justify-center items-center"></div>
              <div ref={resumenPlanVentaRef} className=" flex flex-row justify-center items-center">
                <a className="flex title-font font-medium items-center md:justify-start justify-center text-black ">
                  <span className="ml-3 text-xl ">Simulación Crowdfunding</span>
                </a>
              </div>
            </div>
            <hr></hr>
            <div className="container py-5 -m-4 justify-center items-center">
              {/* Encabezado */}
              <div className="flex flex-wrap ">
                <div className="p-4 xl:w-1/2 lg:w-1/2 md:w-1/2 ">
                  <p className="lg:w-2/3 leading-relaxed text-base text-gray-500">
                    Terreno nùmero: <strong> {numeroAux} </strong>.
                  </p>
                  {planPersonalizado && (
                      <p className="lg:w-2/3 leading-relaxed text-base text-gray-500">
                      Cantidad de secciones: <strong> {cantSecciones}</strong> (10mt2 c/u)
                      </p>
                  )}
                 
                  {!planPersonalizado && (
                     <p className="lg:w-2/3 leading-relaxed text-base text-gray-500">
                     Metros cuadrados: <strong> {metrosCuadradosSeccion}. </strong>.
                   </p>
 
                  )}
                  <p className="lg:w-2/3 leading-relaxed text-base text-gray-500">
                    Etapa de venta: <strong> {etapaAux} </strong>.
                  </p>
                 {planPersonalizado && (
                    <>
                      <p className="lg:w-2/3 leading-relaxed text-base text-gray-500">
                      Precio por seccion:{" "}
                      <strong>
                        {" "}
                       {"U$S " +
                          formatearPrecios(simulacionCrowdFunding.valorSeccion)}{" "}
                      </strong>

                    </p>
                     <p className="lg:w-2/3 leading-relaxed text-base text-gray-500">
                     Precio por <strong> {cantSecciones} </strong> seccion/es:{" "}
                     <strong>
                       {" "}
                       {"U$S " +
                         formatearPrecios(simulacionCrowdFunding.valorSecciones)}{" "}
                     </strong>

                   </p>
                   </>
                  )} 
                
                </div>
                <div className="p-4 xl:w-1/2 lg:w-1/2 md:w-1/3">
                  <p className="lg:w-2/3 leading-relaxed text-base text-gray-500">
                    Fecha de generación: <strong> {fechaFormateada} </strong>.
                  </p>
                  <p className="lg:w-2/3 leading-relaxed text-base text-gray-500">
                    Vendedor:{" "}
                    <strong> {localStorage.getItem("username")} </strong>
                  </p>
                  <p className="lg:w-2/3 leading-relaxed text-base text-gray-500">
                    Interesado: <strong> {formCliente.apellido}, </strong>{" "}
                    <strong> {formCliente.nombre} </strong>
                  </p>
                </div>
              </div>
              <hr></hr>
            </div>
          </section>
        )}
    </>
  );
};

export default VentaMetroPage;
