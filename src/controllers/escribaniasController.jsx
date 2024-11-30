import axios from 'axios';
import urlWebServices from '../controllers/webServices';

export const GetEscribanias = async () => {
    let URL_API = urlWebServices.getEscribanias; 
    
    
        try {
            const response = await axios.get(URL_API); 
            let data= response.data;
            let rdo = response.status;
           
    
            switch (rdo) {
                case 200: {
                    return ({reserva: data, rdo:0, mensaje:"Ok"}); // Correcto    
                }
                case 400: {
                    // Usuario invalido
                    return ({rdo:1, mensaje:"(Bad Request) Los datos enviados son incorrectos o hay datos obligatorios no enviados"});
                }
                case 401: {
                    // Usuario invalido
                    return ({rdo:1, mensaje:"(Unauthorized) No hay autorización para llamar al servicio"});
                }
                case 404: {
                    // Usuario invalido
                    return ({rdo:1, mensaje:"(NotFound) No se encontró información"});
                }
                case 500: {
                    // Usuario invalido
                    return ({rdo:1, mensaje:"(Internal Server Error) Error en servidor"});
                }
                default: {
                    // Otro error
                    return ({rdo:1, mensaje:"Ha ocurrido un error"});                
                }
            }
        } catch (error) {
            console.error(error);
        }
     
     
 };