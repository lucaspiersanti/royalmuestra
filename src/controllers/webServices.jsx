//const URL_API = "http://localhost:3000/";

//back En Git sin vincular a Herocku
//const URL_API = "https://royalvillage-ed44ba51c86d.herokuapp.com/";

//Nuevo back en Git vinculado a Herocku
const URL_API = "https://royalvillageback-a52b72d7090d.herokuapp.com/";

const urlWebServices = {
  // Login
  login: URL_API + "api/login",
  logout: URL_API + "api/login/",

  //Users
  createUser: URL_API + "api/usuario",
  //updateUser: URL_API + "api/usuario/",//proximo
  //recover:URL_API+"api/Usuarios/recuperarPasssword",//proximo
  //createCambioPass:URL_API+"api/Usuarios/cambioPassword",//proximo

  //Lotes
  getLotes: URL_API + "api/lotes",
  getLoteID: URL_API + "api/lotes/",
  putLoteEstado: URL_API + "api/lotes/estado/",

  //etapas
  getEtapas: URL_API + "api/etapas_vta_categoria", //ok

  //mail
  enviarMailReserva: URL_API + "api/enviarMail/enviarMailReserva/",

  //Reservas
  createReserva: URL_API + "api/reservas",
  getReservas: URL_API + "api/reservas",
  putReservaInsertarIdCliente: URL_API + "api/reservas",

  //Clientes
  createCliente: URL_API + "api/cliente",
  getClienteById: URL_API + "api/cliente/getClienteById/",
  getClienteByDni: URL_API + "api/cliente/getClienteByDni/",

  //Escribanias
  getEscribanias: URL_API + "api/escribanias",
};

export default urlWebServices;
