import axios from 'axios';
import urlWebServices from '../controllers/webServices';

export const CreateCliente = async (datosCliente) => {
    let URL_API = urlWebServices.createCliente;
    const req = {
        dataCliente:datosCliente,
    };
    let rdo;
    let data;
    try {
        const response = await axios.post(URL_API,req);
        if(response == null || response == undefined ){
            rdo = response.status;
        }
        else{
            data=response.data;
            rdo = response.status;
        }
       
        switch (rdo) {
            case 200: {
                    return ({cliente: data, rdo:0, mensaje:"Ok"}); // Correcto    
                
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

export const ClienteById = async (idCliente) => {
    let URL_API = urlWebServices.getClienteById;
    try {
        const response = await axios.get(URL_API+idCliente);
        let data=response.data;
        let rdo = response.status;
       

        switch (rdo) {
            case 200: {
                    return ({cliente: data, rdo:0, mensaje:"Ok"}); // Correcto    
            }
            case 400: {
                // Usuario invalido
                return ({rdo:1, mensaje:"(Bad Request) Los datos enviados son incorrectos"});
            }
            case 401: {
                // Usuario invalido
                return ({rdo:1, mensaje:"(Unauthorized) No hay autorización para llamar al servicio"});
            }
            case 404: {
                // Usuario invalido
                return ({rdo:1, mensaje:"(NotFound) No se encontró al usuario"});
            }
            case 500: {
                // Usuario invalido
                return ({rdo:1, mensaje:"(Internal Server Error) Error en servidor"});
            }
            default: {
                // Otro error
                return ({cliente: data, rdo:0, mensaje:"Ok"}); // Correcto                  
            }
        }
    } catch (error) {
        console.error(error);
    }
};

export const ClienteByDni = async (dniCliente) => {
    let URL_API = urlWebServices.getClienteByDni;
 
    try {
        const response = await axios.get(URL_API+dniCliente);
        if(response !== undefined && response !== null){
            let data=response;
            let rdo = response.status;
            return ({cliente: data, rdo:0, mensaje:"Ok"}); // Correcto   
        }
      
    } catch (error) {
        console.error(error);
    }
};