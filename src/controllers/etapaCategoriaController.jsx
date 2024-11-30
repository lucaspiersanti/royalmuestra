import axios from "axios";
import urlWebServices from "../controllers/webServices";

export const GetEtapasCategorias = async () => {
  let URL_API = urlWebServices.getEtapas;
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
