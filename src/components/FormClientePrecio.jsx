import React, { useEffect, useState } from "react";
import swal from "sweetalert";

const FormClientePrecio = ({ onEstadoFormCliente,onformularioCompleto ,onResetFormulario }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [codigoArea, setCodigoArea] = useState("");
  const [telefono, setTelefono] = useState("");

  const [nombreObligatorioError, setNombreObligatorioError] = useState("");
  const [apellidoObligatorioError, setApellidoObligatorioError] = useState("");
  const [codigoAreaError, setCodigoAreaError] = useState("");
  const [telefonoError, setTelefonoError] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [emailError, setEmailError] = useState("");

  const preFijoTelefono = "549";

  // useEffect(() => {
  //   if(onResetFormulario===null){
  //     resetFormulario();
  //   }}, [onResetFormulario]);

  const resetFormulario = () => {
    setNombre("");
    setApellido("");
    setCodigoArea("");
    setTelefono("");
    setEmail("");

    //Limpiando errores
    setNombreObligatorioError("");
    setApellidoObligatorioError("");
    setCodigoAreaError("");
    setTelefonoError("");
    setInputValue("");
    setEmailError("");
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

  const campoNombreObligatorio = () => {
    setNombreObligatorioError("");
  };

  const campoApellidoObligatorio = () => {
    setApellidoObligatorioError("");
  };

  const hamdleSubmit = async () => {
    const _telefono=armarTelefono();

    if (nombre === "" || apellido === "" ||  email === "" || emailError !== "" || telefonoError !== "") {
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
      if (email !== "") {
        setEmail("Debe completar el correo electrónico");
      }
      if (emailError !== "") {
        setEmailError("Verifique el correo electrónico");
      }
      if (telefonoError !== "") {
        setTelefonoError("Verifique el teléfono");
      }
    } else {
      try {
        enviarFormulario(_telefono);
        resetFormulario();
        onEstadoFormCliente(true);
        swal(
          "Datos cargados con exito",
          "Continuar con generacion de planes",
          "success"
        );
      } catch (error) {
        resetFormulario();
        onEstadoFormCliente(false);
        swal(
          "Los datos no pudieron ser enviados",
          "Intente nuevamente",
          "error"
        );
      }
    }
  };
   
  const enviarFormulario=(_telefono)=>{
    const  formularioCompleto = {
     nombre:nombre|| "",
     apellido:apellido|| "",
     telefono:_telefono|| "",
     email:email|| "",
   };
   
   onformularioCompleto(formularioCompleto);
   return formularioCompleto;
   }

  return (
    <section id="FormCliente" className="text-gray-600 body-font relative">
      <div className="container px-5 mx-auto">
        <div className="p-1 m-1 md:w-2/3 mx-auto md:flex-wrap lg:flex-wrap flex xl:flex-wrap   
         bg-clip-padding backdrop-filter backdrop-blur bg-opacity-20 
         backdrop-saturate-50 backdrop-contrast-150 bg-white">
          <div className="w-1/3 relative p-1 mb-4 flex flex-wrap ">
            <label htmlFor="nombre" className="leading-7 text-sm text-black mb-2">
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
            <p className="text-white bg-red-600">{nombreObligatorioError}</p>
          </div>
          <div className="w-1/3 relative p-1 mb-4 flex flex-wrap  ">
            <label htmlFor="apellido" className="leading-7 text-sm text-black mb-2">
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
            <p className="text-white bg-red-600">{apellidoObligatorioError}</p>
          </div>
          <div className="w-1/3 relative p-1 mb-4 flex flex-wrap  ">
            <label
              htmlFor="codigo-area"
              className="w-1/3 text-lef leading-7 text-sm text-black p-1">
              Cod. área{" "}
            </label>
            <label
              htmlFor="telefono"
              className="w-2/3 text-lef leading-7 text-sm text-black p-1" >
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
          <div className="flex flex-wrap w-full">
  <div className="w-full md:w-1/2 p-1 mb-4 flex flex-wrap">
    <label htmlFor="email" className="leading-7 text-sm text-black mb-2">
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
      onClick={() => hamdleSubmit()}
      style={{ height: "40px", width: "100%" }}
      className="mt-4 text-center text-white bg-green-500 border-0 focus:outline-none hover:bg-green-600 rounded text-lg"
    >
      Guardar datos
    </button>
  </div>
</div>

      </div>
      </div>
    </section>
  );
};

export default FormClientePrecio;
