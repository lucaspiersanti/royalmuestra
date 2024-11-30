import swal from "sweetalert";

const calcularPlanes2 = (lotePlan, etapaCategoria, etapa, _metrosCuadrados, _cantSecciones) => {
  
  let valorSeccion = calcularPreciosSeccion(lotePlan, etapaCategoria, etapa, _metrosCuadrados);
  let valorSecciones = parseFloat(valorSeccion) * parseInt(_cantSecciones);

  const simulacionCrowdFunding = {
    valorSeccion,
    valorSecciones,
  };
  return simulacionCrowdFunding;
};

const calcularPreciosSeccion = (lotePlan, etapaCategoria, etapa, _metrosCuadrados) => {
  let precioLista;
  if (lotePlan && etapaCategoria) {
    switch (etapa) {
      case "1":
        return precioLista = parseFloat(etapaCategoria.etapa_1) * parseFloat(_metrosCuadrados);
      case "2":
        precioLista = parseFloat(etapaCategoria.etapa_2) * parseFloat(_metrosCuadrados);
        return precioLista;
      case "3":
        precioLista = parseFloat(etapaCategoria.etapa_3) * parseFloat(_metrosCuadrados);
        return precioLista;
      case "4":
        precioLista = parseFloat(etapaCategoria.etapa_4) * parseFloat(_metrosCuadrados);
        return precioLista;
      default:
        swal(
          "No se pudo generar el plan",
          "Verifique el número de etapa",
          "warning"
        );
        return "No entra en ningun caso- ver etapa";
    }
  } else {
    swal("Algo falló", "Reintentar", "info");
  }
};

export default calcularPlanes2;
