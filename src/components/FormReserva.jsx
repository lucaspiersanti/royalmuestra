import { useState, useEffect } from "react";
import swal from "sweetalert";
import Swal from "sweetalert2";
import DataTable from "./DataTable";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { EnviarMailReserva as MailReserva } from "../controllers/enviarMailController.jsx";
import { PostReserva as GenerarReserva } from "../controllers/reservaController.jsx";
import {
  CreateCliente as createCliente,
  ClienteByDni as clienteByDni,
} from "../controllers/clientesController.jsx";

import { GetLotes as getLotes } from "../controllers/lotesController.jsx";
import { GetEtapasCategorias as getEtapasCategorias } from "../controllers/etapaCategoriaController.jsx";
import { UpdateEstadoLote as updateEstadoLote } from "../controllers/lotesController.jsx";
import { InputEnteros } from "./shared/inputEnteros.jsx";
import { InputDinero } from "./shared/inputDinero.jsx";
import calcularPlanes from "../utils/calcularPlanes.jsx";

const TERRENOS_PISO = 1;
const TERRENOS_TECHO = 518;
const CUOTAS_PISO = 1;
const CUOTAS_TECHO = 48;


export const FormReserva = ({
  pasoActual,
  informarPasoSiguiente,
  onReservaDatos,
}) => {
  // Formulario Cliente

  const [dato, setDato] = useState("");
  const [label, setLabel] = useState("Entrega");
  const [obligatorio, setObligatorio] = useState(true);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [codigoArea, setCodigoArea] = useState("");
  const [telefono, setTelefono] = useState("");
  const [telefonoFinal, setTelefonoFinal] = useState(""); //Auxiliar para formato de WS
  const preFijoTelefono = "549"; //Auxiliar para formato de WS
  const [dni, setDni] = useState("");
  const [cuil, setCuil] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [email, setEmail] = useState("");

  // Formulario Terreno
  const [terreno, setTerreno] = useState("");
  const [etapa, setEtapa] = useState("");
  const [plan, setPlan] = useState("");
  const [dolaresEntrega, setDolaresEntrega] = useState("");
  const [dolaresVtaTotal, setDolaresVtaTotal] = useState("");
  const [escribania, setEscribania] = useState(999);
  const [asesoramiento, setAsesoramiento] = useState("");
  const [fechaFirmaContratoAdhesion, setFechaFirmaContratoAdhesion] =
    useState("");
  const [precioLista, setPrecioLista] = useState("9999999.99");

  //Validaciones Forms - Adecuar (proximamente)
  const [dniValidarObligatorioError, setDniValidarObligatorioError] =
    useState("");
  const [nombreObligatorioError, setNombreObligatorioError] = useState("");
  const [apellidoObligatorioError, setApellidoObligatorioError] = useState("");
  const [dniObligatorioError, setDniObligatorioError] = useState("");
  const [codigoAreaError, setCodigoAreaError] = useState("");
  const [telefonoError, setTelefonoError] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [emailError, setEmailError] = useState("");
  const [cuilObligatorioError, setCuilObligatorioError] = useState("");
  const [estadoCivilObligatorioError, setEstadoCivilObligatorioError] =
    useState("");
  const [domicilioObligatorioError, setDomicilioObligatorioError] =
    useState("");
  const [terrenoObligatorioError, setTerrenoObligatorioError] = useState("");
  const [etapaObligatorioError, setEtapaObligatorioError] = useState("");
  const [entregaDolaresObligatorioError, setEntregaDolaresObligatorioError] =
    useState("");
  const [planObligatorioError, setPlanObligatorioError] = useState("");
  const [escribaniaObligatorioError, setEscribaniaObligatorioError] =
    useState("");
  const [asesoramientoObligatorioError, setAsesoramientoObligatorioError] =
    useState("");
  const [
    fechaFirmaContratoAdhesionObligatorioError,
    setFechaFirmaContratoAdhesionObligatorioError,
  ] = useState("");

  const [cuotasObligatorioError, setCuotasObligatorioError] =
    useState("");
    const [entregaObligatorioError, setEntregaObligatorioError] =
    useState("");
    const [porcenDescObligatorioError, setPorcenDescObligatorioError] =
    useState("");

  //Validaciones control de carga de secciones
  const [paso0Cargado, setPaso0Cargado] = useState(false);
  const [paso1Cargado, setPaso1Cargado] = useState(false);
  const [paso2Cargado, setPaso2Cargado] = useState(false);
  const [terrenoValido, setTerrenoValido] = useState(false);
  const [paso3Cargado, setPaso3Cargado] = useState(false);
  const [paso4Cargado, setPaso4Cargado] = useState(false);
  const [paso5Cargado, setPaso5Cargado] = useState(false);

  //Datos consolidados Reserva
  const [datosReserva, setDatosReserva] = useState(null);
  //Response
  const [responseReserva, setResponseReserva] = useState(null);
  const [clientePreExistente, setClientePreExistente] = useState(null);
  const [dniValidar, setDniValidar] = useState("");
  const [existeCliente, setExisteCliente] = useState(false);

  //Calculo de planes
  const [lotes, setLotes] = useState([]);
  const [datosListos, setDatosListos] = useState(false);
  const [generarPlan, setGenerarPlan] = useState(false);
  const [lotePlan, setLotePlan] = useState(null);
  const [etapaCategoria, setEtapaCategoria] = useState(null);
  const [datosEtapasCategoria, setDatosEtapasCategoria] = useState([]);
  const [resultadoPlan100, setResultadoPlan100] = useState(null);
  const [resultadoPlan80, setResultadoPlan80] = useState(null);
  const [resultadoPlan60, setResultadoPlan60] = useState(null);
  const [resultadoPlan40, setResultadoPlan40] = useState(null);
  const [resultadoPlan30, setResultadoPlan30] = useState(null);
  const [resultadoPlanPersonalizado, setResultadoPlanPersonalizado] = useState(null);

  const [planPersonalizado, setPlanPersonalizado] = useState(false);

  const resetFormulario = (seccion) => {
    switch (seccion) {
      case "99":
        limpiarSeccion("0");
        limpiarSeccion("1");
        limpiarSeccion("2");
        break;
      case "0":
        setClientePreExistente(null);
        setExisteCliente(false);
        limpiarSeccion("1");
        limpiarSeccion("2");
        break;
    }
  };

  const limpiarSeccion = (seccion) => {
    switch (seccion) {
      case "0": //ClientePreExistente
        setDniValidar("");
        setClientePreExistente(null);
        setExisteCliente(false);
        setDniValidarObligatorioError("");
        break;
      case "1": //Form Cliente
        //Limpiando inputs
        setNombre("");
        setApellido("");
        setCodigoArea("");
        setTelefono("");
        setDni("");
        setCuil("");
        setEstadoCivil("");
        setDomicilio("");
        setEmail("");

        //Limpiando errores
        setNombreObligatorioError("");
        setApellidoObligatorioError("");
        setCodigoAreaError("");
        setTelefonoError("");
        setInputValue("");
        setDniObligatorioError("");
        setCuilObligatorioError("");
        setDomicilioObligatorioError("");
        setEmailError("");
        setClienteCreado(null);
        setClienteCargado(false);
        break;
      case "2": //Form Terreno
        //Limpiando inputs
        setLotePlan("");
        setEtapa("");
        setPlan("");
        setDolaresEntrega("");
        setEscribania(999);
        //setEscribaniaDomicilio("");
        //setAsesoramiento("");
        setFechaFirmaContratoAdhesion("");
        setTerrenoValido(false);
        setEntrega("");
        setPorcentajeDesc("");
        setCuotas("");

        //Limpiando errores
        setTerrenoObligatorioError("");
        setEtapaObligatorioError("");
        setPlanObligatorioError("");
        setEntregaDolaresObligatorioError("");
        setEscribaniaObligatorioError("");
        setAsesoramientoObligatorioError("");
        setFechaFirmaContratoAdhesionObligatorioError("");
        setDatosListos(false);

        //Auxliares
        setDataCliente(null);
        setDatosReserva(null);
        setResponseReserva(null);
        setPlanPersonalizado(false);
        

        //Controles
        setPaso1Cargado(false);
        setPaso2Cargado(false);
        setGenerarPlan(false);
        setPaso3Cargado(false);
        setPaso4Cargado(false);
        setPaso5Cargado(false);
        break;
    }
  };

  const armarTelefono = () => {
    let codigoAreaSinCero = codigoArea;
    let telefonoSin15 = telefono;

    if (codigoArea !== "" && telefono !== "") {
      if (
        codigoArea.charAt(0) === "0" ||
        (telefono.charAt(0) === "1" && telefono.charAt(1) === "5")
      ) {
        if (codigoArea.charAt(0) === "0") {
          codigoAreaSinCero = codigoArea.substring(1);
        }
        if (telefono.charAt(0) === "1" && telefono.charAt(1) === "5") {
          telefonoSin15 = telefono.substring(2);
        }
      }
      return `${preFijoTelefono}${codigoAreaSinCero}${telefonoSin15}`;
    }
  };

  const telefonoValidator = (inputValue, setInputValue) => {
    const numericPattern = /^[0-9]*$/;

    if (!numericPattern.test(inputValue)) {
      swal("Solo números", "Verifique el número de teléfono", "info");
      setInputValue("");
    }
    setCodigoAreaError("");
    setTelefonoError("");
    if (codigoArea !== "" || telefono !== "") {
      if (codigoArea === "") {
        setCodigoAreaError("Debe completar el codigo de area");
      }
      if (telefono === "") {
        setTelefonoError("Debe completar el número de telefono");
      }
    }
  };

  const emailValidator = () => {
    if (email.length < 3 || !email.includes("") || !email.includes("@")) {
      setEmailError("Verifique el correo electrónico");
    } else {
      setEmailError("");
    }
  };

  const campoDNIObligatorio = () => {
    setDniObligatorioError("");
  };
  const campoDNIValidarObligatorio = () => {
    setDniValidarObligatorioError("");
  };

  const campoCuilObligatorio = () => {
    setCuilObligatorioError("");
  };

  const campoNombreObligatorio = () => {
    setNombreObligatorioError("");
  };

  const campoApellidoObligatorio = () => {
    setApellidoObligatorioError("");
  };

  const campoTerrenoObligatorio = () => {
    setTerrenoObligatorioError("");
  };

  const campoEtapaObligatorio = () => {
    setEtapaObligatorioError("");
  };

  const campoPlanObligatorio = () => {
    setPlanObligatorioError("");
  };

  const campoCuotasObligatorio = () => {
    setCuotasObligatorioError("");
  };

  const campoEntrega2Obligatorio = () => {
    setEntregaObligatorioError("");
  };

  const campoPorcenDesObligatorio = () => {
    setPorcenDescObligatorioError("");
  };

  const campoDomicilioObligatorio = () => {
    setDomicilioObligatorioError("");
  };
  const campoEstadoCivilObligatorio = () => {
    setEstadoCivilObligatorioError("");
  };
  const campoEntregaObligatorio = () => {
    setEntregaDolaresObligatorioError("");
  };

  const campoEscribaniaObligatorio = () => {
    setEscribaniaObligatorioError("");
  };

  const campoAsesoramientoObligatorio = () => {
    setAsesoramientoObligatorioError("");
  };

  const campoFechaFirmaContratoAdhesionObligatorio = () => {
    setFechaFirmaContratoAdhesionObligatorioError("");
  };

  let idClientePrexistenteAux = null;
  const validarCliente = async () => {
    resetFormulario("0");
    try {
      let response = await clienteByDni(dniValidar);
      if (response != undefined) {
        swal(
          "El cliente ya existe",
          "Verifique los datos del mismo",
          "success"
        );
        setDniValidar("");
        setExisteCliente(true);
        setClientePreExistente(response.cliente.data);
        setClienteCargado(true);
        setNombre(response.cliente.data.nombre);
        setApellido(response.cliente.data.apellido);

        const _codigoArea = response.cliente.data.telefono.substring(3, 6);
        // Obtener el resto del número de teléfono
        const _telefonoNro = response.cliente.data.telefono.substring(6);

        setCodigoArea(_codigoArea);
        setTelefono(_telefonoNro);
        setDni(response.cliente.data.dni);
        setCuil(response.cliente.data.cuil);
        setEstadoCivil(response.cliente.data.estadoCivil);
        setDomicilio(response.cliente.data.domicilio);
        setEmail(response.cliente.data.mail);
        idClientePrexistenteAux = response.cliente.data.idCliente;
      } else {
        setExisteCliente(false);
        setDniValidar("");
        swal("El cliente no existe", "Deberá registrarlo", "info");
      }
    } catch (error) {
    }
  };

  const [dataEscribanias] = useState([
    {
      id: 1,
      nombre: "Gonzalez",
      domicilio: "Corrientes 345",
    },
    {
      id: 2,
      nombre: "Fernandez",
      domicilio: "9 de Julio 345",
    },
    {
      id: 3,
      nombre: "Garcia",
      domicilio: "Alem 345",
    },
  ]);

  const controlPasos = (paso) => {
    switch (paso) {
      case "0":
        setPaso0Cargado(true);
        informarPasoSiguiente("1");
        break;
      case "1":
        setPaso1Cargado(true);

        informarPasoSiguiente("2");
        break;

      case "2":
        setPaso2Cargado(true);
        if (!existeCliente) {
          crearCliente();
        }
        informarPasoSiguiente("3");
        break;

      case "3":
        setPaso3Cargado(true);
        informarPasoSiguiente("4");
        break;

      case "4":
        setPaso4Cargado(true);

        obtenerPlan(plan);
        informarPasoSiguiente("5");
        break;
      case "5":
        setPaso5Cargado(true);
        informarPasoSiguiente("1");
        break;
    }
  };

  const validarTerreno = () => {
    let aux=validarEstadoTerreno(terreno);
    if(!aux){
      swal(
        "Favor de verificar",
        "El lote que intenta reservar NO està disponible",
        "warning"
      );
      setTerrenoValido(false);
    }else{
      if (terreno === "" || etapa === "" || plan === "" || dolaresEntrega === "" || //Reserva
      (plan!="1" && cuotas==="") || 
      (plan>=1000 && (entrega==="" ||  porcentajeDesc===""))) {
        swal(
          "Favor de verificar",
          "Hay campos sin completar o con errores",
          "warning"
        );
        if (terreno === "") {
          setTerrenoObligatorioError("Debe completar el terreno");
        }
        if (etapa === "") {
          setEtapaObligatorioError("Debe completar la etapa");
        }
        if (plan === "") {
          setPlanObligatorioError("Debe seleccionar el plan");
        }
        if (dolaresEntrega === "") {
          setEntregaDolaresObligatorioError("Debe completar la Reserva");
        }
         if(plan!="1"){
              if(cuotas===""){
                swal(
                  "Favor de verificar",
                  "Debe seleccionar la cantidad de cuotas",
                  "warning"
                );
                setCuotasObligatorioError("Debe seleccionar la cantidad de cuotas");
              }
            };
            if(plan >= 1000){
              if(entrega===""){
                swal(
                  "Favor de verificar",
                  "Debe completar la Entrega",
                  "warning"
                );
                setEntregaObligatorioError("Debe completar la entrega");
              }
            };
            if(plan>=1000){
              if(porcentajeDesc===""){
                swal(
                  "Favor de verificar",
                  "Debe completar el Porcentaje de Descuento",
                  "warning"
                );
                setPorcenDescObligatorioError("Debe completar el Descuento");
              }
            }
        setTerrenoValido(false);
      } else {
        setTerrenoValido(true);
        generarPlanes();
      }
    }


  };

  const validarEstadoTerreno = () => {
    let auxEstado = false;

    const ploteDisponible = lotes.find((plote) => {
        return plote.numero === parseInt(terreno) && plote.estado === "Disponible";
    });

    if (ploteDisponible) {
        //console.log("plote.estado", ploteDisponible.estado);
        auxEstado = true;
    }

    return auxEstado;
};


  const cancelarTerreno = () => {
    setTerrenoValido(false);
    setTerreno("");
    setEtapa("");
    setPlan("");
    setDolaresEntrega("");
    setPaso2Cargado(false);
  };

  const enviarMailReserva = async () => {
    try {
      let response = await MailReserva(email, datosReserva);
    } catch (error) {
      console.error(error);
    }
  };

  const hamdleSubmit = async (paso) => {
    switch (paso) {
      case "0":
        if (dniValidar === "") {
          setDniValidarObligatorioError("Debe completar el DNI ");
        } else {
          try {
            controlPasos("0");
            validarCliente();
          } catch (error) {
            swal(
              "Los datos no del cliente pudieron ser cargados",
              "Intente nuevamente",
              "error"
            );
          }
        }
        break;
      case "1":
        if (
          nombre === "" ||
          apellido === "" ||
          dni === "" ||
          cuil === "" ||
          estadoCivil === "" ||
          domicilio === "" ||
          email === "" ||
          emailError !== "" ||
          telefonoError !== ""
        ) {
          swal(
            "Favor de verificar",
            "Hay campos sin completar o con errores",
            "warning"
          );
          if (nombre === "") {
            setNombreObligatorioError("Debe completar el nombre");
          }
          if (apellido === "") {
            setApellidoObligatorioError("Debe completar el apellido");
          }
          if (dni === "") {
            setDniObligatorioError("Debe completar el DNI ");
          }
          if (cuil === "") {
            setCuilObligatorioError("Debe completar el CUIL ");
          }
          if (estadoCivil === "") {
            setEstadoCivilObligatorioError("Debe completar el estado civil ");
          }
          if (domicilio === "") {
            setDomicilioObligatorioError("Debe completar el domicilio ");
          }

          if (email !== "") {
            setEmailError("Verifique el correo electrónico");
          }
          if (telefonoError !== "") {
            setTelefonoError("Verifique el teléfono");
          }
        } else {
          try {
            controlPasos("1");
            setTelefonoFinal(armarTelefono());
          } catch (error) {
            //resetFormulario();
            swal(
              "Los datos no del cliente pudieron ser cargados",
              "Intente nuevamente",
              "error"
            );
          }
        }
        break;
      case "2":
        if (
          terreno === "" ||
          etapa === "" ||
          plan === "" ||
          dolaresEntrega === "" || //Reserva
          (plan!="1" && cuotas==="") || 
          (plan>=1000 && (entrega==="" || porcentajeDesc==="")))
          {
          swal(
            "Favor de verificar",
            "Hay campos sin completar o con errores",
            "warning"
          );
          if(plan!="1"){
            if(cuotas===""){
              swal(
                "Favor de verificar",
                "Debe seleccionar la cantidad de cuotas",
                "warning"
              );
              setCuotasObligatorioError("Debe seleccionar la cantidad de cuotas");
            }
          };
          if(plan>=1000){
            if(entrega===""){
              swal(
                "Favor de verificar",
                "Debe completar la Entrega",
                "warning"
              );
              setEntregaObligatorioError("Debe completar la entrega");
            }
          };
          if(plan>=1000){
            if(porcentajeDesc===""){
              swal(
                "Favor de verificar",
                "Debe completar el Porcentaje de Descuento",
                "warning"
              );
              setPorcenDescObligatorioError("Debe completar el Descuento");
            }
          }
          if (terreno === "") {
            setTerrenoObligatorioError("Debe completar el terreno");
          }
          if (etapa === "") {
            setEtapaObligatorioError("Debe completar la etapa");
          }
          if (plan === "") {
            setPlanObligatorioError("Debe seleccionar el plan");
          }
          if (dolaresEntrega === "") {
            setEntregaDolaresObligatorioError("Debe completar la entrega");
          }

        } else {
          if (paso1Cargado) {
            controlPasos("2");
            armarReserva();
          } else {
            swal("Faltan completar datos", "Ver FICHA DEL CLIENTE", "error");
          }
        }
        break;
      case "3":
        if (paso2Cargado) {
          controlPasos("3");
        } else {
          swal("Faltan completar datos", "Ver FICHA DEL TERRENO", "error");
        }
        break;
      case "4":
        if (paso3Cargado) {
          controlPasos("4");
          swal(
            "Documentos enviados con exito",
            `a la direccion ${email}`,
            "success"
          );
        } else {
          swal("Faltan descargas documentos", "Ver DOCUMENTOS", "error");
        }
        break;
      case "5":
        swal("Finalizado", "Listo para nueva carga", "info");
        controlPasos("5");
        resetFormulario("99");
        break;

      default:
        swal(
          "No se pudo generar la reserva",
          "Comuniquese con sistemas",
          "warning"
        );

        return;
    }
  };

  const [dataCliente, setDataCliente] = useState("");
  const [clienteCreado, setClienteCreado] = useState(null);

  let _clienteCreadoAux;
  const crearCliente = async () => {
    let datosClienteAux = {
      nombre,
      apellido,
      dni,
      cuil,
      estadoCivil,
      telefono: telefonoFinal,
      domicilio,
      mail: email,
      idTipoCliente: 3, //ESTADO DE RESERVA
    };
    setDataCliente(datosClienteAux);
    try {
      let response = await createCliente(datosClienteAux);

      if (response) {

        setClienteCreado(response.cliente);
        setClienteCargado(true);
        _clienteCreadoAux = response.cliente;
      } else {
        //console.log("Fallo createCliente...");
      }
    } catch (error) {
      console.error(error);
    }
  };


  const armarReserva = () => {
    //debugger
    let _dolaresVtaTotal = "";//Precio con descuento - No tiene en cuenta intereses por cuotas OJO
    switch (plan) {
      case "1":
        _dolaresVtaTotal = formatearPrecios(
          resultadoPlan100.precioConDescuento
        );
        setDolaresVtaTotal(_dolaresVtaTotal);
        break;
      case "2":
        _dolaresVtaTotal = formatearPrecios(resultadoPlan80.precioConDescuento);
        setDolaresVtaTotal(_dolaresVtaTotal);
        break;
      case "3":
        _dolaresVtaTotal = formatearPrecios(resultadoPlan60.precioConDescuento);
        setDolaresVtaTotal(_dolaresVtaTotal);
        break;
      case "4":
        _dolaresVtaTotal = formatearPrecios(resultadoPlan40.precioConDescuento);
        setDolaresVtaTotal(_dolaresVtaTotal);
        break;
      default:
        _dolaresVtaTotal = formatearPrecios(resultadoPlan30.precioConDescuento);
        setDolaresVtaTotal(_dolaresVtaTotal);
        break;
    }

    //Conversion

    const valorNumericoVta = parseFloat(_dolaresVtaTotal.replace(",", "."));
    const resultadoConversionDolaresVta = numeroALetras(valorNumericoVta, {
      plural: "DOLARES ESTADOUNIDENSES",
      singular: "DÒLAR ESTADOUNIDENSE",
      centPlural: "CENTAVOS",
      centSingular: "CENTAVO",
    });

    const valorNumericoEntrega = parseFloat(dolaresEntrega.replace(",", "."));
    const resultadoConversionDolaresEntrega = numeroALetras(
      valorNumericoEntrega,
      {
        plural: "DOLARES ESTADOUNIDENSES",
        singular: "DÒLAR ESTADOUNIDENSE",
        centPlural: "CENTAVOS",
        centSingular: "CENTAVO",
      }
    );

    let datosReservaAux = {
      //Ojo se usa tanto para guardar en BD como para armar pdf
      idCliente: !existeCliente ? 99999 : clientePreExistente.idCliente,
      nombre,
      apellido,
      dni,
      cuil,
      estadoCivil,
      telefono: telefonoFinal,
      domicilio,
      mail: email,
      nroLote: terreno,
      etapa,
      dolaresEntrega,//Reserva
      dolaresEntregaTexto: resultadoConversionDolaresEntrega,
      dolaresVtaTotalTexto: resultadoConversionDolaresVta,
      dolaresVtaTotal: _dolaresVtaTotal,//Revisar no cumple con los planes con cuotas con intereses
      fechaFirmaContratoAdhesion,
      escribania, //Se envia id
      asesoramiento: parseInt(localStorage.getItem("id")), //faltan adecuar nombres
      vendedor: `${localStorage.getItem("apellido")} ${localStorage.getItem("nombre")}`,//Solo para pdf
      idUsuario: localStorage.getItem("id"),
      plan,//Se agrega pla personalizado 1000
      precioLista:precioListaAux,
      entrega:entrega!=""?entrega:0,
      porcentajeDesc:porcentajeDesc!=""?porcentajeDesc:0,//porcentajeDesc Plan Personalizado
      cuotas:cuotas!=""?cuotas:0,//cuotas Plan Personalizado
      dimensiones:lotePlan.dimensiones?lotePlan.dimensiones:0,
    };
//console.log("plan",plan);
datosReservaAux.entregaPlanPago=0;
    switch (plan) {
      case "1": datosReservaAux.valorCuota = 0;
        break;
      case "2":
        datosReservaAux.entregaPlanPago=resultadoPlan80.EntregaInicial;
        switch (cuotas) {
          case "24": datosReservaAux.valorCuota = resultadoPlan80.Cuotas_24;
            break;
          case "36": datosReservaAux.valorCuota = resultadoPlan80.Cuotas_36;
            break;
          case "48": datosReservaAux.valorCuota = resultadoPlan80.Cuotas_48;
            break;
        };
        break;
        case "3":
          datosReservaAux.entregaPlanPago=resultadoPlan60.EntregaInicial;
          switch (cuotas) {
            case "24": datosReservaAux.valorCuota =  resultadoPlan60.Cuotas_24;
              break;
            case "36": datosReservaAux.valorCuota = resultadoPlan60.Cuotas_36;
              break;
            case "48": datosReservaAux.valorCuota = resultadoPlan60.Cuotas_48;
              break;
          };
          break;
          case "4":
            datosReservaAux.entregaPlanPago=resultadoPlan40.EntregaInicial;
            switch (cuotas) {
              case "24": datosReservaAux.valorCuota =  resultadoPlan40.Cuotas_24;
                break;
              case "36": datosReservaAux.valorCuota = resultadoPlan40.Cuotas_36;
                break;
              case "48": datosReservaAux.valorCuota = resultadoPlan40.Cuotas_48;
                break;
            };
            break;
            case "5":
              datosReservaAux.entregaPlanPago=resultadoPlan30.EntregaInicial;
              switch (cuotas) {
                case "24": datosReservaAux.valorCuota =  resultadoPlan30.Cuotas_24;
                  break;
                case "36": datosReservaAux.valorCuota = resultadoPlan30.Cuotas_36;
                  break;
                case "48": datosReservaAux.valorCuota = resultadoPlan30.Cuotas_48;
                  break;
              };
              break;
      case "1000": datosReservaAux.valorCuota = resultadoPlanPersonalizado.Cuotas;
        datosReservaAux.entregaPlanPago=resultadoPlanPersonalizado.EntregaInicial;

        break;
    }

    const resultadoConversionValorCuota = numeroALetras(datosReservaAux.valorCuota, {
      plural: "DOLARES ESTADOUNIDENSES",
      singular: "DÒLAR ESTADOUNIDENSE",
      centPlural: "CENTAVOS",
      centSingular: "CENTAVO",
    });
    datosReservaAux.valorCuotaTexto=resultadoConversionValorCuota;

   
    if(plan != 1){
      datosReservaAux.entrega=datosReservaAux.entregaPlanPago;//parseFloat((_dolaresVtaTotal.replace(".", "")).replace(",","."));//Precio con descuento - No tiene en cuenta intereses por cuotas OJO
      // let entregaAUx=parseFloat(datosReservaAux.entrega);
      console.log("ORIGINAL datosReservaAux.entregaPlanPago:",datosReservaAux.entregaPlanPago);
      datosReservaAux.valorFinal=datosReservaAux.entregaPlanPago+(cuotas*datosReservaAux.valorCuota);//Si entrega es 0 => es plan personalizado
      console.log("ORIGINAL datosReservaAux.valorFinal:",datosReservaAux.valorFinal);
      
    }
    else{
      
      datosReservaAux.valorFinal=parseFloat((_dolaresVtaTotal.replace(".", "")).replace(",","."));
    }

   

    const resultadoConversionValorFinal = numeroALetras(datosReservaAux.valorFinal, {
      plural: "DOLARES ESTADOUNIDENSES",
      singular: "DÒLAR ESTADOUNIDENSE",
      centPlural: "CENTAVOS",
      centSingular: "CENTAVO",
    });

   datosReservaAux.valorFinalTexto=resultadoConversionValorFinal;

   console.log("ORIGINAL dolaresEntrega",dolaresEntrega);//Reserva

   if(plan!=1){
    let auxiliarDolarEntrega=parseFloat(dolaresEntrega);
    datosReservaAux.valorFinalMenosReserva= (datosReservaAux.entregaPlanPago - auxiliarDolarEntrega);
    const resultadoConversionValorFinalMenosEntrega = numeroALetras(datosReservaAux.valorFinalMenosReserva, {
      plural: "DOLARES ESTADOUNIDENSES",
      singular: "DÒLAR ESTADOUNIDENSE",
      centPlural: "CENTAVOS",
      centSingular: "CENTAVO",
    });
    datosReservaAux.valorFinalMenosReservaTexto=resultadoConversionValorFinalMenosEntrega;
   }else{

    let auxiliarDolarEntrega=parseFloat(dolaresEntrega.replace(",", "."));
    datosReservaAux.valorFinalMenosReserva= parseFloat((_dolaresVtaTotal.replace(".", "")).replace(",","."))- auxiliarDolarEntrega;
    const resultadoConversionValorFinalMenosEntrega = numeroALetras(datosReservaAux.valorFinalMenosReserva, {
      plural: "DOLARES ESTADOUNIDENSES",
      singular: "DÒLAR ESTADOUNIDENSE",
      centPlural: "CENTAVOS",
      centSingular: "CENTAVO",
    });
    datosReservaAux.valorFinalMenosReservaTexto=resultadoConversionValorFinalMenosEntrega;
   }


    const resultadoConversionCuotas = numeroALetras(datosReservaAux.cuotas);
    datosReservaAux.cuotasTexto=resultadoConversionCuotas;

    setDatosReserva(datosReservaAux);
    onReservaDatos(datosReservaAux);
  };

  const [clienteCargado, setClienteCargado] = useState(false);

  useEffect(() => {
    if (datosReserva != null && clienteCargado) {
      if (datosReserva.idCliente === 99999) {
        if (!existeCliente) {
          datosReserva.idCliente = clienteCreado.idCliente;
        } else {
          datosReserva.idCliente = clientePreExistente.idCliente;
        }
      }
      enviarMailReserva();
      guardarReserva();
    }
  }, [datosReserva, clienteCargado]);


  const guardarReserva = async () => {
    if (clienteCreado != null) {
      datosReserva.idCliente = clienteCreado.idCliente;
      try {
        let response = await GenerarReserva(datosReserva);
        setResponseReserva(response);
        actualizarEstadoLote();
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        let response = await GenerarReserva(datosReserva);
        setResponseReserva(response);
        actualizarEstadoLote();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const actualizarEstadoLote = async () => {
    console.log("Actulizar lote: ", terreno);
    try {
      let response = await updateEstadoLote(terreno, "Reservado");
      //console.log("Estado Lote modificado:", response);
    } catch (error) {
      console.error(error);
    }
  }

  const handleDolaresEntregaChange = (ev) => {
   
      const inputValue = ev.target.value;

      // Expresión regular para validar el formato de dos decimales
      const regex = /^\d+(\.\d{0,2})?$/;

      if (regex.test(inputValue)) {
        setDolaresEntrega(inputValue);
        setEntregaDolaresObligatorioError("");
      } 
        //Maneja limpiza d input
        if(inputValue===''){
          setDolaresEntrega('');
         }
    
  };

  var numeroALetras = (function () {
    function Unidades(num) {
      switch (num) {
        case 1:
          return "UN";
        case 2:
          return "DOS";
        case 3:
          return "TRES";
        case 4:
          return "CUATRO";
        case 5:
          return "CINCO";
        case 6:
          return "SEIS";
        case 7:
          return "SIETE";
        case 8:
          return "OCHO";
        case 9:
          return "NUEVE";
      }

      return "";
    } //Unidades()

    function Decenas(num) {
      let decena = Math.floor(num / 10);
      let unidad = num - decena * 10;

      switch (decena) {
        case 1:
          switch (unidad) {
            case 0:
              return "DIEZ";
            case 1:
              return "ONCE";
            case 2:
              return "DOCE";
            case 3:
              return "TRECE";
            case 4:
              return "CATORCE";
            case 5:
              return "QUINCE";
            default:
              return "DIECI" + Unidades(unidad);
          }
        case 2:
          switch (unidad) {
            case 0:
              return "VEINTE";
            default:
              return "VEINTI" + Unidades(unidad);
          }
        case 3:
          return DecenasY("TREINTA", unidad);
        case 4:
          return DecenasY("CUARENTA", unidad);
        case 5:
          return DecenasY("CINCUENTA", unidad);
        case 6:
          return DecenasY("SESENTA", unidad);
        case 7:
          return DecenasY("SETENTA", unidad);
        case 8:
          return DecenasY("OCHENTA", unidad);
        case 9:
          return DecenasY("NOVENTA", unidad);
        case 0:
          return Unidades(unidad);
      }
    } //Unidades()

    function DecenasY(strSin, numUnidades) {
      if (numUnidades > 0) return strSin + " Y " + Unidades(numUnidades);

      return strSin;
    } //DecenasY()

    function Centenas(num) {
      let centenas = Math.floor(num / 100);
      let decenas = num - centenas * 100;

      switch (centenas) {
        case 1:
          if (decenas > 0) return "CIENTO " + Decenas(decenas);
          return "CIEN";
        case 2:
          return "DOSCIENTOS " + Decenas(decenas);
        case 3:
          return "TRESCIENTOS " + Decenas(decenas);
        case 4:
          return "CUATROCIENTOS " + Decenas(decenas);
        case 5:
          return "QUINIENTOS " + Decenas(decenas);
        case 6:
          return "SEISCIENTOS " + Decenas(decenas);
        case 7:
          return "SETECIENTOS " + Decenas(decenas);
        case 8:
          return "OCHOCIENTOS " + Decenas(decenas);
        case 9:
          return "NOVECIENTOS " + Decenas(decenas);
      }

      return Decenas(decenas);
    } //Centenas()

    function Seccion(num, divisor, strSingular, strPlural) {
      let cientos = Math.floor(num / divisor);
      let resto = num - cientos * divisor;

      let letras = "";

      if (cientos > 0)
        if (cientos > 1) letras = Centenas(cientos) + " " + strPlural;
        else letras = strSingular;

      if (resto > 0) letras += "";

      return letras;
    } //Seccion()

    function Miles(num) {
      let divisor = 1000;
      let cientos = Math.floor(num / divisor);
      let resto = num - cientos * divisor;

      let strMiles = Seccion(num, divisor, "UN MIL", "MIL");
      let strCentenas = Centenas(resto);

      if (strMiles == "") return strCentenas;

      return strMiles + " " + strCentenas;
    } //Miles()

    function Millones(num) {
      let divisor = 1000000;
      let cientos = Math.floor(num / divisor);
      let resto = num - cientos * divisor;

      let strMillones = Seccion(num, divisor, "UN MILLON DE", "MILLONES DE");
      let strMiles = Miles(resto);

      if (strMillones == "") return strMiles;

      return strMillones + " " + strMiles;
    } //Millones()

    return function NumeroALetras(num, currency) {
      currency = currency || {};
      let data = {
        numero: num,
        enteros: Math.floor(num),
        centavos: Math.round(num * 100) - Math.floor(num) * 100,
        letrasCentavos: "",
        letrasMonedaPlural: currency.plural || "", //'PESOS', 'Dólares', 'Bolívares', 'etcs'
        letrasMonedaSingular: currency.singular || "Dolar", //'PESO', 'Dólar', 'Bolivar', 'etc'
        letrasMonedaCentavoPlural: currency.centPlural || "centavos",
        letrasMonedaCentavoSingular: currency.centSingular || "centavo",
      };

      if (data.centavos > 0) {
        data.letrasCentavos =
          "CON " +
          (function () {
            if (data.centavos == 1)
              return (
                Millones(data.centavos) + " " + data.letrasMonedaCentavoSingular
              );
            else
              return (
                Millones(data.centavos) + " " + data.letrasMonedaCentavoPlural
              );
          })();
      }

      if (data.enteros == 0)
        return "CERO " + data.letrasMonedaPlural + " " + data.letrasCentavos;
      if (data.enteros == 1)
        return (
          Millones(data.enteros) +
          " " +
          data.letrasMonedaSingular +
          " " +
          data.letrasCentavos
        );
      else
        return (
          Millones(data.enteros) +
          " " +
          data.letrasMonedaPlural +
          " " +
          data.letrasCentavos
        );
    };
  })();

  const [calendarioVisible, setCalendarioVisible] = useState(false);

  const toggleCalendario = () => {
    setCalendarioVisible(!calendarioVisible);
  };

  const seleccionarFecha = (date) => {
    setFechaFirmaContratoAdhesion(date);
    setCalendarioVisible(false);
  };

  let fechaInput = new Date(fechaFirmaContratoAdhesion);
  const formatearFecha = () => {
    let fechaInputFormateada = fechaInput.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    return fechaInputFormateada;
  };

  const [planTxt, setPlantxt] = useState("");

  const obtenerPlan = (_plan) => {
    switch (_plan) {
      case "1":
        setPlantxt("Plan 100%");
        break;
      case "2":
        setPlantxt("Plan 80%");
        break;
      case "3":
        setPlantxt("Plan 60%");
        break;
      case "4":
        setPlantxt("Plan 40%");
        break;
      default:
        setPlantxt("");
        break;
    }
  };

  //******CALCULAR PRECIOS **********************/

  useEffect(() => {
    async function fetchLotes() {
      try {
        const response = await getLotes();
        setLotes(response.data);
      } catch (error) {
      }
    }

    async function fetchDatosEtapasCategoria() {
      try {
        const response = await getEtapasCategorias();
        setDatosEtapasCategoria(response.data);
      } catch (error) {
      }
    }
    fetchLotes().then(() => fetchDatosEtapasCategoria());
  }, []);

  const generarPlanes = () => {
    renderTabla();
  };

  const renderTabla = () => {
    let loteAux;
    let etapaCategoriaAux;
    lotes.map((plote) => {
      if (plote.numero === parseInt(terreno)) {
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
    // debugger
    if (
      loteAux !== null &&
      etapaCategoriaAux !== null &&
      terreno !== "" &&
      etapa !== ""
    ) {
      setDatosListos(true); //Maneja carga asincrona
      //calcularPrecioLista();
    }
  };

  const [precioListaAux,setPrecioListaAux]=useState(0);
  useEffect(() => {
    let planesGenerados;
    if (datosListos && lotePlan && etapaCategoria) {
      planesGenerados = calcularPlanes(lotePlan, etapaCategoria, etapa, planPersonalizado, entrega, cuotas, porcentajeDesc);
      if (planPersonalizado) {
        setResultadoPlanPersonalizado(planesGenerados.planPersonalizado);
      }
      setPrecioListaAux(planesGenerados.precioLista);
      setResultadoPlan100(planesGenerados.plan100);
      setResultadoPlan80(planesGenerados.plan80);
      setResultadoPlan60(planesGenerados.plan60);
      setResultadoPlan40(planesGenerados.plan40);
      setResultadoPlan30(planesGenerados.plan30);
      setGenerarPlan(true);
    }
  }, [datosListos, lotePlan, etapaCategoria]);

  useEffect(() => {
    renderTabla();
  }, [lotePlan, etapaCategoria]);


  const formatearPrecios = (valor) => {
    const precio = valor;
    const precio_decimales = precio.toFixed(2);
    const partes = precio_decimales.split(".");
    const parteEntera = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const formattedPrecio = `${parteEntera},${partes[1]}`;
    return formattedPrecio;
  };

  //********************************************************* */
  const [entrega, setEntrega] = useState("");
  const [cuotas, setCuotas] = useState("");
  const [porcentajeDesc, setPorcentajeDesc] = useState("");

  const seleccionarPlan = (value) => {
    setPlanPersonalizado(false);
    setPlan(value);
    if (value >= 1000) {
      setPlanPersonalizado(true);
      //console.log("Selecciona plan Personalizado");
    }

  }

  //Inputs
  const handleChange = (nuevoDato, _label) => {
    //console.log("nuevoDato", nuevoDato);
    switch (_label) {
      case "Entrega":
        setEntrega(nuevoDato);
        break;
      case "Cuotas": setCuotas(nuevoDato);
        break;
      case "Descuento %": setPorcentajeDesc(nuevoDato);
        break;
    }

  };


  return (
    <>
      {pasoActual == 0 && (
        <section
          id="FormReservarCliente"
          className="text-gray-600 body-font relative w-full h-screen">
          <div className="container ">
            <div
              className="py-10 flex flex-wrap   
                                bg-clip-padding backdrop-filter backdrop-blur bg-opacity-20 
                                backdrop-saturate-50 backdrop-contrast-150 bg-white">
              <div className="w-1/2 relative p-1 mb-4 flex flex-wrap ">
                <label
                  htmlFor="dniValidar"
                  className="leading-7 text-sm text-black mb-2">
                  DNI
                </label>
                <input
                  value={dniValidar}
                  onChange={(ev) => setDniValidar(ev.target.value)}
                  onBlur={() => campoDNIValidarObligatorio()}
                  maxLength={8}
                  pattern="[0-9]*"
                  placeholder="18333555"
                  type="text"
                  id="dni"
                  name="dni"
                  className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-2  leading-8 transition-colors duration-200 ease-in-out"
                />
                <p className="text-white bg-red-600">
                  {dniValidarObligatorioError}
                </p>
              </div>
              <div className="w-1/2 md:w-1/2 p-2 mt-2">
                <button
                  onClick={() => hamdleSubmit("0")}
                  style={{ height: "40px", width: "100%" }}
                  className="mt-4 text-center text-white bg-blue-500 border-0 focus:outline-none hover:bg-blue-600 rounded text-lg">
                  Validar
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
      {pasoActual == 1 && (
        <section
          id="FormReservarCliente"
          className="text-gray-600 body-font relative w-full h-screen">
          <div className="container ">
            <div
              className="py-10 flex flex-wrap   
                                bg-clip-padding backdrop-filter backdrop-blur bg-opacity-20 
                                backdrop-saturate-50 backdrop-contrast-150 bg-white">
              <div className="w-1/3 relative p-1 mb-4 flex flex-wrap ">
                <label
                  htmlFor="nombre"
                  className="leading-7 text-sm text-black mb-2">
                  Nombre
                </label>
                <input
                  value={nombre}
                  onChange={(ev) => setNombre(ev.target.value)}
                  onBlur={() => campoNombreObligatorio()}
                  placeholder="Juan Jose"
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-2  leading-8 transition-colors duration-200 ease-in-out"
                />
                <p className="text-white bg-red-600">
                  {nombreObligatorioError}
                </p>
              </div>
              <div className="w-1/3 relative p-1 mb-4 flex flex-wrap  ">
                <label
                  htmlFor="apellido"
                  className="leading-7 text-sm text-black mb-2">
                  Apellido
                </label>
                <input
                  value={apellido}
                  onChange={(ev) => setApellido(ev.target.value)}
                  onBlur={() => campoApellidoObligatorio()}
                  placeholder="Gonzalez"
                  type="text"
                  id="apellido"
                  name="apellido"
                  className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-2  leading-8 transition-colors duration-200 ease-in-out"
                />
                <p className="text-white bg-red-600">
                  {apellidoObligatorioError}
                </p>
              </div>
              <div className="w-1/3 relative p-1 mb-4 flex flex-wrap  ">
                <label
                  htmlFor="codigo-area"
                  className="w-1/3 text-lef leading-7 text-sm text-black p-1">
                  Cod. área{" "}
                </label>
                <label
                  htmlFor="telefono"
                  className="w-2/3 text-lef leading-7 text-sm text-black p-1">
                  {" "}
                  Celular{" "}
                </label>
                <input
                  onBlur={() => {
                    telefonoValidator(codigoArea, setCodigoArea);
                  }}
                  value={codigoArea}
                  onChange={(ev) => setCodigoArea(ev.target.value)}
                  placeholder="11"
                  maxLength={5}
                  pattern="[0-9]*"
                  type="text"
                  id="codigo-area"
                  name="codigo-area"
                  className="w-1/3 bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-2  leading-8 transition-colors duration-200 ease-in-out"
                />

                <input
                  onBlur={() => {
                    telefonoValidator(telefono, setTelefono);
                  }}
                  value={telefono}
                  onChange={(ev) => setTelefono(ev.target.value)}
                  placeholder="5365544"
                  maxLength={10}
                  pattern="[0-9]*"
                  type="text"
                  id="telefono"
                  name="telefono"
                  className="w-2/3 bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-2  leading-8 transition-colors duration-200 ease-in-out"
                />
                <p className="text-white bg-red-600">{codigoAreaError}</p>
                <p className="text-white bg-red-600">{telefonoError}</p>
                <p className="text-white bg-red-600">{inputValue}</p>
              </div>

              <div className="w-1/4 relative p-1 mb-4 flex flex-wrap ">
                <label
                  htmlFor="dni"
                  className="leading-7 text-sm text-black mb-2">
                  DNI
                </label>
                <input
                  value={dni}
                  onChange={(ev) => setDni(ev.target.value)}
                  onBlur={() => campoDNIObligatorio()}
                  maxLength={8}
                  pattern="[0-9]*"
                  placeholder="18333555"
                  type="text"
                  id="dni"
                  name="dni"
                  className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-2  leading-8 transition-colors duration-200 ease-in-out"
                />
                <p className="text-white bg-red-600">{dniObligatorioError}</p>
              </div>
              <div className="w-1/4 relative p-1 mb-4 flex flex-wrap ">
                <label
                  htmlFor="cuil"
                  className="leading-7 text-sm text-black mb-2">
                  CUIL
                </label>
                <input
                  value={cuil}
                  onChange={(ev) => setCuil(ev.target.value)}
                  onBlur={() => campoCuilObligatorio()}
                  placeholder="27-18333555-6"
                  maxLength={11}
                  pattern="[0-9]*"
                  type="text"
                  id="cuil"
                  name="cuil"
                  className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-2  leading-8 transition-colors duration-200 ease-in-out"
                />
                <p className="text-white bg-red-600">{cuilObligatorioError}</p>
              </div>
              <div className="w-1/4 relative p-1 mb-4 flex flex-wrap ">
                <label
                  htmlFor="estadoCivil"
                  className="leading-7 text-sm text-black mb-2">
                  Estado Civil
                </label>
                <select
                  id="estadoCivil"
                  name="estadoCivil"
                  value={estadoCivil}
                  onBlur={() => campoEstadoCivilObligatorio()}
                  onChange={(ev) => setEstadoCivil(ev.target.value)}
                  style={{ height: "42px" }}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                  <option value="">Seleccionar</option>
                  <option value="Soltero">Soltero</option>
                  <option value="Casado">Casado</option>
                  <option value="Viudo">Viudo</option>
                </select>

                <p className="text-white bg-red-600">
                  {estadoCivilObligatorioError}
                </p>
              </div>
              <div className="w-1/4 relative p-1 mb-4 flex flex-wrap ">
                <label
                  htmlFor="domicilio"
                  className="leading-7 text-sm text-black mb-2">
                  Domicilio
                </label>
                <input
                  value={domicilio}
                  onChange={(ev) => setDomicilio(ev.target.value)}
                  onBlur={() => campoDomicilioObligatorio()}
                  placeholder="Liniers 483"
                  type="text"
                  id="domicilio"
                  name="domicilio"
                  className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-2  leading-8 transition-colors duration-200 ease-in-out"
                />
                <p className="text-white bg-red-600">
                  {domicilioObligatorioError}
                </p>
              </div>

              <div className="flex flex-wrap w-full">
                <div className="w-full md:w-1/2 p-1 mb-4 flex flex-wrap">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-black mb-2">
                    Email
                  </label>
                  <input
                    onBlur={() => {
                      emailValidator();
                    }}
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    placeholder="micorreo@email.com"
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-2 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  <p className="text-white bg-red-600">{emailError}</p>
                </div>

                <div className="w-full md:w-1/2 p-2 mt-2">
                  <button
                    onClick={() => hamdleSubmit("1")}
                    style={{ height: "40px", width: "100%" }}
                    className="mt-4 text-center text-white bg-blue-500 border-0 focus:outline-none hover:bg-blue-600 rounded text-lg">
                    Siguiente
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {pasoActual == 2 && (
        <section
          id="FormReservarTerreno"
          className="text-gray-600 body-font relative w-full h-screen ">
          <div className="container body-font flex flex-row ">
            <div
              className={`${!terrenoValido ? "w-full" : "w-3/4"
                }  p-1 m-1 flex flex-wrap  
                                bg-clip-padding backdrop-filter backdrop-blur bg-opacity-20 
                                backdrop-saturate-50 backdrop-contrast-150 bg-white`}>
              <div className="w-1/4 relative p-1 mb-4 flex flex-wrap ">
                <label
                  htmlFor="terreno"
                  className="leading-7 text-sm text-black mb-2">
                  Terreno
                </label>
                <input
                  value={terreno}
                  onChange={(ev) => setTerreno(ev.target.value)}
                  onBlur={() => campoTerrenoObligatorio()}
                  placeholder="100"
                  type="text"
                  id="terreno"
                  name="terreno"
                  className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-2  leading-8 transition-colors duration-200 ease-in-out"
                />
                <p className="text-white bg-red-600">
                  {terrenoObligatorioError}
                </p>
              </div>
              <div className="w-1/4 relative p-1 mb-4 flex flex-wrap ">
                <label
                  htmlFor="etapa"
                  className="leading-7 text-sm text-black mb-2">
                  Etapa
                </label>
                <select
                  id="etapa"
                  name="etapa"
                  value={etapa}
                  onChange={(ev) => setEtapa(ev.target.value)}
                  onBlur={() => campoEtapaObligatorio()}
                  style={{ height: "42px", width: "100%" }}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out">
                  <option value="">Seleccionar...</option>
                  <option value="1">Etapa 1</option>
                </select>
                <p className="text-white bg-red-600">{etapaObligatorioError}</p>
              </div>
              <div className="w-1/4 relative p-1 mb-4 flex flex-wrap ">
                <label
                  htmlFor="plan"
                  className="leading-7 text-sm text-black mb-2">
                  Plan
                </label>
                <select
                  id="plan"
                  name="plan"
                  value={plan}
                  onChange={(ev) => seleccionarPlan(ev.target.value)}
                  onBlur={() => campoPlanObligatorio()}
                  style={{ height: "42px", width: "100%" }}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out">
                  <option value="">Seleccionar...</option>
                  <option value="1">Plan 100%</option>
                  <option value="2">Plan 80%</option>
                  <option value="3">Plan 60%</option>
                  <option value="4">Plan 40%</option>
                  <option value="5">Plan 30%</option>
                  <option value="1000">Plan Personalizado</option>
                </select>
                <p className="text-white bg-red-600">{planObligatorioError}</p>
              </div>
              <div className="w-1/4 relative p-1 mb-4 flex flex-wrap ">
                <label
                  htmlFor="dolaresEntrega"
                  className="leading-7 text-sm text-black mb-2">
                  Reserva
                </label>
                <input
                  value={dolaresEntrega}
                  onChange={(ev) => handleDolaresEntregaChange(ev)}
                  onBlur={() => campoEntregaObligatorio()}
                  placeholder="50000"
                  maxLength={10}
                  pattern="[0-9]*\,?[0-9]?"
                  type="text"
                  id="dolaresEntrega"
                  name="dolaresEntrega"
                  className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-2  leading-8 transition-colors duration-200 ease-in-out"
                />
                <p className="text-white bg-red-600">
                  {entregaDolaresObligatorioError}
                </p>
              </div>
              {plan!="" && plan!="1" && !planPersonalizado && (

                <div className="w-1/4 text-center align-items-center flex flex-col mx-auto">
                  <label
                    htmlFor="plan"
                    className="leading-7 text-sm text-black mb-2">
                    Cuotas
                  </label>
                  <select
                    id="cuotas"
                    name="cuotas"
                    value={cuotas}
                    onChange={(ev) => setCuotas(ev.target.value)}
                    onBlur={() => campoCuotasObligatorio()}
                    style={{ height: "42px", width: "100%" }}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out mb-2">
                    <option value="">Seleccionar...</option>
                    <option value="24">24</option>
                    <option value="36">36</option>
                    <option value="48">48</option>
                  </select>
                  <p className="text-white bg-red-600">{cuotasObligatorioError}</p>
                </div>
              )}
            

              {/* <div className="w-1/5 relative p-1 mb-4 ">
                <label
                  htmlFor="fechaFirmaContratoAdhesion"
                  className="leading-7 text-sm text-black mb-2">
                  Firma del contrato
                </label>
                <div className="relative">
                  <input
                    id="fechaFirmaContratoAdhesion"
                    name="fechaFirmaContratoAdhesion"
                    value={formatearFecha(fechaFirmaContratoAdhesion)}
                    placeholder="18/12/2023"
                    onChange={(ev) =>
                      setFechaFirmaContratoAdhesion(ev.target.value)
                    }
                    onBlur={() => campoFechaFirmaContratoAdhesionObligatorio()}
                    style={{ height: "42px", width: "100%" }}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  <button
                    onClick={toggleCalendario}
                    className="absolute right-0 top-0 mt-1 mr-2 p-2 focus:outline-none">
                    📅
                  </button>
                  {calendarioVisible && (
                    <div
                      className="absolute z-10"
                      style={{ height: "100px", width: "100%" }}>
                      <Calendar
                        onChange={seleccionarFecha}
                        value={fechaFirmaContratoAdhesion}
                        activeStartDate={new Date()}
                      />
                    </div>
                  )}
                </div>
                <p className="text-white bg-red-600">
                  {fechaFirmaContratoAdhesionObligatorioError}
                </p> 
              </div> */}

              {/* //Plan Personalizado           */}
              {planPersonalizado && (
                <div className="text-gray-700 relative text-center justify-content-center align-items-center">
                  <div className="container px-5 mx-auto">
                    <div className="p-1 m-1 flex-wrap   
                  bg-clip-padding backdrop-filter backdrop-blur bg-opacity-20 
                  backdrop-saturate-50 backdrop-contrast-150 bg-white">

                      <div className="flex w-full space-x-2">
                        <div className="w-1/3 relative p-1 mb-4 flex flex-wrap">
                          <InputDinero _label={"Entrega"} _obligatorio={true} _info={"En Dolares"} onChange={handleChange}></InputDinero>
                        </div>
                        <div className="w-1/3 relative p-1 mb-4 flex flex-wrap">
                          <InputEnteros _label={"Descuento %"} _obligatorio={true} _info={"Sobre el precio de lista"} _piso={0} _techo={100} _maxLength="3" onChange={handleChange}></InputEnteros>
                        </div>

                        <div className="w-1/3 relative p-1 mb-4 flex flex-wrap">
                          <InputEnteros _label={"Cuotas"} _obligatorio={true} _info={"1 a 48 cuotas"} _piso={CUOTAS_PISO} _techo={CUOTAS_TECHO} onChange={handleChange}></InputEnteros>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              )}

              {terrenoValido && (
                <div className="w-full text-center">
                  <button
                    onClick={() => cancelarTerreno()}
                    style={{ height: "40px", width: "45%" }}
                    className="mt-4 mr-2 text-white bg-red-500 border-0 focus:outline-none hover:bg-red-600 rounded text-lg ">
                    Cancelar
                  </button>
                  <button
                    onClick={() => hamdleSubmit("2")}
                    style={{ height: "40px", width: "45%" }}
                    className="mt-4 text-white bg-green-500 border-0 focus:outline-none hover:bg-green-600 rounded text-lg">
                    Siguiente
                  </button>
                </div>
              )}
              {!terrenoValido && (
                <div className="flex flex-wrap w-full justify-center align-item-center ">
                  <div className="w-full ">
                    <button
                      onClick={() => validarTerreno()}
                      style={{ height: "40px", width: "100%" }}
                      className="mt-10 text-center text-white bg-blue-500 border-0 focus:outline-none hover:bg-blue-600 rounded text-lg">
                      Validar Terreno
                    </button>
                  </div>
                </div>
              )}
            </div>

            {generarPlan &&
              resultadoPlan100 &&
              resultadoPlan80 &&
              resultadoPlan60 &&
              resultadoPlan40 &&
              resultadoPlan30 && (
                <div className="p-2 ml-5 flex flex-wrap  w-1/3 border-l border-gray-300">
                  <div className="p-4 w-full">
                    <p className="leading-relaxed text-base text-gray-500">
                      Terreno nùmero:{terreno}
                    </p>
                    <p className=" leading-relaxed text-base text-gray-500">
                      Etapa de venta: <strong> {etapa} </strong>.
                    </p>

                    <p className="leading-relaxed text-base text-gray-500">
                      Cantidad de metros cuadrados: {lotePlan.dimensiones}
                    </p>

                    {/* Por definir */}

                    {/* 
                                    <p className=" leading-relaxed text-base text-gray-500">
                                        Precio de lista: {precioLista}
                                    </p>
                                    <p className="leading-relaxed text-base text-gray-500">
                                    Precio de lista:{" "}      
                                                {" "}
                                                {"U$S " +
                                                    formatearPrecios(resultadoPlan100.precioLista)}{" "}
                                                
                                    </p>
                                    <p className="leading-relaxed text-base text-gray-500">
                                        Plan 80% - Entrega Inicial: {"U$S " +
                          formatearPrecios(resultadoPlan80.EntregaInicial)}
                                    </p>
                                    <p className="leading-relaxed text-base text-gray-500">
                                        Plan 20% - En cuotas: {"U$S " +
                          formatearPrecios(resultadoPlan80.EnCuotas)}
                                    </p>
                                    <p className="leading-relaxed text-base text-gray-500">
                                        Plan 60% - Entrega Inicial: {"U$S " +
                          formatearPrecios(resultadoPlan60.EntregaInicial)}
                                    </p>
                                    <p className="leading-relaxed text-base text-gray-500">
                                        Plan 40% - Entrega Inicial: {"U$S " +
                          formatearPrecios(resultadoPlan40.EntregaInicial)}
                                    </p>
                                    <p className="leading-relaxed text-base text-gray-500">
                                        Plan 30% - Entrega Inicial: {"U$S " +
                          formatearPrecios(resultadoPlan30.EntregaInicial)}
                                    </p> */}
                  </div>
                </div>
              )}
          </div>
        </section>
      )}

      {pasoActual == 3 && (
        <section
          id="FormReservarTerreno"
          className="text-gray-600 body-font relative w-full h-screen ">
          <div className="container body-font flex flex-row ">
            <div
              className=" justify-content-center w-full   p-1 m-1 flex flex-wrap  
                                bg-clip-padding backdrop-filter backdrop-blur bg-opacity-20 
                                backdrop-saturate-50 backdrop-contrast-150 bg-white">
              {(!paso2Cargado || !paso1Cargado) && (
                <section className="text-gray-600 body-font">
                  <div className="container px-5 py-20 mx-auto">
                    <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
                      <div className="flex-grow sm:text-left text-center mt-2 sm:mt-0">
                        <p className="leading-relaxed text-base">
                          Aquí podrás descargar los documentos cuando todos los
                          datos de FICHA CLIENTE y FICHA TERRENO estèn
                          completos.
                        </p>
                      </div>
                      <div className="sm:w-32 sm:order-none order-first sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                        <i className="fa-solid fa-circle-info "></i>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {paso2Cargado && paso1Cargado && (
                <>
                  <DataTable datosParaMostrar={datosReserva}></DataTable>

                  <button
                    onClick={() => hamdleSubmit("3")}
                    style={{ height: "40px", width: "100%" }}
                    className="text-white bg-green-500 border-0 focus:outline-none hover:bg-green-600 rounded text-lg">
                    Siguiente
                  </button>
                </>
              )}
            </div>
          </div>
        </section>
      )}
      {pasoActual == 4 && (
        <section
          id="FormReservarNotifiaciones"
          className="text-gray-600 body-font relative w-full h-screen ">
          <div className="container body-font flex flex-row ">
            <div
              className={`${!paso3Cargado ? "w-full" : "w-3/4"
                }  p-1 m-1 flex flex-wrap  
                                bg-clip-padding backdrop-filter backdrop-blur bg-opacity-20 
                                backdrop-saturate-50 backdrop-contrast-150 bg-white`}>
              {paso3Cargado && (
                <div className="w-full text-center">
                  <div className="container px-5 py-20 mx-auto">
                    <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
                      <div className="flex-grow sm:text-left text-center mt-2 sm:mt-0">
                        <p className="leading-relaxed text-base">
                          Los siguientes documentos fueron enviados al email:
                          <b>{email}</b>
                        </p>
                      </div>
                      <div className="sm:w-32 sm:order-none order-first sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                        <i className="fa-solid fa-circle-info "></i>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => hamdleSubmit("4")}
                    style={{ height: "40px", width: "100%" }}
                    className="mt-4 text-white bg-green-500 border-0 focus:outline-none hover:bg-green-600 rounded text-lg">
                    Siguiente
                  </button>
                </div>
              )}
              {(!paso3Cargado || !paso2Cargado || !paso1Cargado) && (
                <div className="w-full text-center">
                  <div className="container px-5 py-20 mx-auto">
                    <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
                      <div className="flex-grow sm:text-left text-center mt-2 sm:mt-0">
                        <p className="leading-relaxed text-base">
                          Aquí encontrarás un resumen con los documentos que se
                          enviarán por email.
                        </p>
                      </div>
                      <div className="sm:w-32 sm:order-none order-first sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                        <i className="fa-solid fa-circle-info "></i>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {paso3Cargado && (
              <div className="p-2 ml-5 flex flex-wrap w-1/3 border-l border-gray-300 item-center">
                <div className="p-4 w-full mt-4">
                  <p className="text-xl flex items-center text-gray-900 mb-4 pb-4 border-b border-gray-700">
                    <span className="w-4 h-4  mr-2 inline-flex items-center justify-center bg-indigo-600 text-white rounded-full flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        className="w-3 h-3"
                        viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                    Oferta - Reserva de terreno.
                  </p>
                  {/*
                                    <p className="text-xl flex items-center text-gray-900 mb-4 pb-4 border-b border-gray-700">
                                        <span className="w-4 h-4  mr-2 inline-flex items-center justify-center bg-indigo-600 text-white rounded-full flex-shrink-0">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                                                <path d="M20 6L9 17l-5-5"></path>
                                            </svg>
                                        </span>Plan de pago.
                                    </p>
                                    <p className="text-xl flex items-center text-gray-900 mb-4 pb-4 border-b border-gray-700">
                                        <span className="w-4 h-4  mr-2 inline-flex items-center justify-center bg-indigo-600 text-white rounded-full flex-shrink-0">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                                                <path d="M20 6L9 17l-5-5"></path>
                                            </svg>
                                        </span>Informaciòn general.
                                    </p>
                                */}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
      {pasoActual == 5 && (
        <section
          id="FormReservarResumen"
          className="text-gray-600 body-font relative w-full h-screen ">
          <div className="container body-font flex flex-row ">
            <div
              className={`${!paso4Cargado ? "w-full" : "w-1/3"
                }  p-1 m-1 flex flex-wrap  
                                bg-clip-padding backdrop-filter backdrop-blur bg-opacity-20 
                                backdrop-saturate-50 backdrop-contrast-150 bg-white`}>
              {paso4Cargado && (
                <div className="w-full text-center">
                  <div className="container px-5 py-20 mx-auto text-center item-center align-items-center">
                    <div className="flex items-center mx-auto border-b pb-5 mb-2 border-gray-200 flex-col">
                      <div className="flex-grow sm:text-left text-center mt-2 sm:mt-0">
                        <p className="leading-relaxed text-2xl text-base">
                          <strong>Resumen reserva</strong>
                        </p>
                      </div>
                      <div className="sm:w-32 sm:order-none order-first sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                        <i className="fa-solid fa-circle-info "></i>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => hamdleSubmit("5")}
                    style={{ height: "40px", width: "100%" }}
                    className="mt-1 text-white bg-green-500 border-0 focus:outline-none hover:bg-green-600 rounded text-lg">
                    Finalizar
                  </button>
                </div>
              )}
              {(!paso4Cargado ||
                !paso3Cargado ||
                !paso2Cargado ||
                !paso1Cargado) && (
                  <div className="w-full text-center">
                    <div className="container px-5 py-20 mx-auto">
                      <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
                        <div className="flex-grow sm:text-left text-center mt-2 sm:mt-0">
                          <p className="leading-relaxed text-base">
                            Aquí encontrarás un resumen con los documentos que se
                            enviarán por email.
                          </p>
                        </div>
                        <div className="sm:w-32 sm:order-none order-first sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                          <i className="fa-solid fa-circle-info "></i>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
            </div>

            {paso4Cargado && paso3Cargado && paso2Cargado && paso1Cargado && (
              <div className="p-2 ml-5 flex flex-wrap w-2/3 border-l border-gray-300 item-center">
                <div className="p-4 w-full mt-4">
                  <p className="text-sm flex items-center text-gray-900 mb-4 pb-4">
                    <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-indigo-600 text-white rounded-full flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        className="w-3 h-3"
                        viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                    Cliente:{" "}
                    <strong>
                      <span className="ml-2 mr-2">{nombre}</span>
                      <span className="ml-2 mr-2">{apellido}</span>
                    </strong>{" "}
                    DNI:{" "}
                    <strong>
                      <span className="ml-2 mr-2">{dni}</span>
                    </strong>
                  </p>

                  <p className="text-sm flex items-center text-gray-900 mb-4 pb-4 border-b border-gray-700">
                    <span className="w-4 h-4  mr-2 inline-flex items-center justify-center bg-indigo-600 text-white rounded-full flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        className="w-3 h-3"
                        viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                    Teléfono{" "}
                    <strong>
                      <span className="ml-2 mr-2">{telefonoFinal}</span>
                    </strong>
                    Correo electrónico:{" "}
                    <strong>
                      <span className="ml-2 mr-2">{email}</span>
                    </strong>
                  </p>
                  <p className="text-sm flex items-center text-gray-900 mb-4 pb-4 ">
                    <span className="w-4 h-4  mr-2 inline-flex items-center justify-center bg-indigo-600 text-white rounded-full flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        className="w-3 h-3"
                        viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                    Reserva de terreno:{" "}
                    <strong>
                      <span className="ml-2 mr-2">{terreno}</span>
                    </strong>
                    Etapa:{" "}
                    <strong>
                      <span className="ml-2 mr-2">{etapa}</span>
                    </strong>
                  </p>
                  <p className="text-sm flex items-center text-gray-900 mb-4 pb-4 border-b border-gray-700">
                    <span className="w-4 h-4  mr-2 inline-flex items-center justify-center bg-indigo-600 text-white rounded-full flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        className="w-3 h-3"
                        viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                    Plan de financiación:{" "}
                    <strong>
                      <span className="ml-2 mr-2">{planTxt}</span>
                    </strong>
                    Entrega:{" "}
                    <strong>
                      <span className="ml-2 mr-2">U$S {dolaresEntrega}</span>
                    </strong>
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};
