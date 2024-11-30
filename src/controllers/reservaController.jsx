import axios from 'axios';
import urlWebServices from '../controllers/webServices';

export const PostReserva = async (datosReserva) => {
    let URL_API = urlWebServices.createReserva;
  
    const req = {
        datosReserva:datosReserva,
    };

    try {
        const response = await axios.post(URL_API,req); 
        let data=response.data;
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

export const GetReservas = async () => {
   let URL_API = urlWebServices.getReservas; 
   
   
       try {
           const response = await axios.get(URL_API);
           let data=response.data;
           let rdo = response.status;
          
   
           switch (rdo) {
               case 200: {
                   if(data.habilitado) {
   
                       return ({reserva: data, rdo:0, mensaje:"Ok"}); // Correcto    
                   } else {
                       return ({reserva: data, rdo:2, mensaje:"Ok"}); // Correcto
                   }
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

export const PutReservaInsertarIdCliente = async (datosReserva,clienteCreado) => {
    let URL_API = urlWebServices.putReservaInsertarIdCliente;
  
    const req = {
        datosReserva:datosReserva,
        clienteCreado:clienteCreado,
    };

    try {
        const response = await axios.put(URL_API,req);
        let data=response.data;
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