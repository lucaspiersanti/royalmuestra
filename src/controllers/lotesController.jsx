import axios from "axios";
import urlWebServices from "../controllers/webServices";

export const GetLotes = async () => {
  let URL_API = urlWebServices.getLotes;
  return axios
    .get(URL_API)
    .then((response) => {
      let rdo = response.status;
      let data = response.data;

      switch (rdo) {
        case 200: {
          return { data, rdo: 0, mensaje: "Ok" }; // Correcto
        }
        case 400: {
          return {
            rdo: 1,
            mensaje:
              "(Bad Request) Los datos enviados son incorrectos o hay datos obligatorios no enviados.",
          };
        }
        case 401: {
          return {
            rdo: 1,
            mensaje:
              "(Unauthorized) No hay autorización para llamar al servicio",
          };
        }
        case 404: {
          return { rdo: 1, mensaje: "(NotFound) No se encontró información" };
        }
        case 500: {
          return {
            rdo: 1,
            mensaje: "(Internal Server Error) Error en servidor",
          };
        }
        default: {
          // Otro error
          return { rdo: 1, mensaje: "Ha ocurrido un error" };
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
};


export const LoteById = async (numero) => {
 let URL_API = urlWebServices.getLoteID;

  if (numero != "") {
    const req = {
      idlote: parseInt(numero),
    };

    try {
      const response = await axios.get(URL_API + numero, req);
     let data = response.data;
      let rdo = response.status;

      switch (rdo) {
        case 200: {
          if (data.habilitado) {
            return { lote: data, rdo: 0, mensaje: "Ok" }; // Correcto
          } else {
            return { lote: data, rdo: 2, mensaje: "Ok" }; // Correcto
          }
        }
        case 400: {
          // Usuario invalido
          return {
            rdo: 1,
            mensaje:
              "(Bad Request) Los datos enviados son incorrectos o hay datos obligatorios no enviados",
          };
        }
        case 401: {
          // Usuario invalido
          return {
            rdo: 1,
            mensaje:
              "(Unauthorized) No hay autorización para llamar al servicio",
          };
        }
        case 404: {
          // Usuario invalido
          return { rdo: 1, mensaje: "(NotFound) No se encontró información" };
        }
        case 500: {
          // Usuario invalido
          return {
            rdo: 1,
            mensaje: "(Internal Server Error) Error en servidor",
          };
        }
        default: {
          // Otro error
          return { rdo: 1, mensaje: "Ha ocurrido un error" };
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
};

export const UpdateEstadoLote = async (numero,estado) => {
  let URL_API = urlWebServices.putLoteEstado;

  if (numero != "") {
    const req = {
      idlote: parseInt(numero),
      estado: estado,
    };


    try {
      const response = await axios.put(URL_API + numero, req);
      let data = response.data;
      let rdo = response.status;

      switch (rdo) {
        case 200: {
          if (data) {
            return { lote: data, rdo: 0, mensaje: "Ok" }; // Correcto
          } else {
            return { lote: data, rdo: 2, mensaje: "Ok" }; // Correcto
          }
        }
        case 400: {
          return {
            rdo: 1,
            mensaje:
              "(Bad Request) Los datos enviados son incorrectos o hay datos obligatorios no enviados",
          };
        }
        case 401: {
          // Usuario invalido
          return {
            rdo: 1,
            mensaje:
              "(Unauthorized) No hay autorización para llamar al servicio",
          };
        }
        case 404: {
          return { rdo: 1, mensaje: "(NotFound) No se encontró información" };
        }
        case 500: {
          return {
            rdo: 1,
            mensaje: "(Internal Server Error) Error en servidor",
          };
        }
        default: {
          // Otro error
          return { rdo: 1, mensaje: "Ha ocurrido un error" };
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}
