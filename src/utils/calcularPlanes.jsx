const INTERESCUOTAS_1_24=0;
const INTERESCUOTAS_25_48=15;

const calcularPlanes = (lotePlan,etapaCategoria,etapa,_personalizado=false,_entrega,_cuotas,_porcentajeDesc) => {
    
    let aux=calcularPrecioLista(lotePlan, etapaCategoria, etapa);

    const planesGenerados = {
        precioLista:aux,   
    };
    planesGenerados.plan100=calcularPlan100(aux);
    planesGenerados.plan80=calcularPlan80(aux);
    planesGenerados.plan60=calcularPlan60(aux);
    planesGenerados.plan40=calcularPlan40(aux);
    planesGenerados.plan30=calcularPlan30(aux);
    planesGenerados.precioLista
    if(_personalizado){
      planesGenerados.planPersonalizado=calcularPlanPersonalizado(aux,_entrega,_cuotas,_porcentajeDesc);
    }
    return planesGenerados;
  };
  
  const calcularPrecioLista = (lotePlan, etapaCategoria,etapa) => {
    let precioLista;
    if (lotePlan && etapaCategoria) {
      switch (etapa) {
        case "1":
         
          return parseFloat(lotePlan.dimensiones) *
          parseFloat(etapaCategoria.etapa_1);;
        case "2":
          precioLista =
            parseFloat(lotePlan.dimensiones) *
            parseFloat(etapaCategoria.etapa_2);
          
          return precioLista;
        case "3":
          precioLista =
            parseFloat(lotePlan.dimensiones) *
            parseFloat(etapaCategoria.etapa_3);
        
          return precioLista;
        case "4":
          precioLista =
            parseFloat(lotePlan.dimensiones) *
            parseFloat(etapaCategoria.etapa_4);
          // swal(
          //   "Planes Generados",
          //   "Diferentes opciones de financiación",
          //   "success"
          // );
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

  const calcularPlan100 = (precioLista) => {
    if (precioLista) {
      const plan100 = {
        precioLista: precioLista === null ? 0 : precioLista,
        porcentajeDesc: 20,
        precioConDescuento: precioLista - precioLista * 0.2,
      };
      return(plan100);
    }
  };

  const calcularPlan80 = (precioLista) => {
    if (precioLista) {
      const plan80 = {
        precioLista: precioLista === null ? 0 : precioLista,
        porcentajeDesc: 10,
        precioConDescuento: precioLista - precioLista * 0.1,
      };
      plan80.EntregaInicial = plan80.precioConDescuento * 0.8;
      plan80.EnCuotas = plan80.precioConDescuento * 0.2;
      plan80.Cuotas_24 = plan80.EnCuotas / 24;
      plan80.Cuotas_36 = (plan80.EnCuotas + plan80.EnCuotas * 0.15) / 36;
      plan80.Cuotas_48 = (plan80.EnCuotas + plan80.EnCuotas * 0.3) / 48;
      return(plan80);
    }
  };

  const calcularPlan60 = (precioLista) => {
    if (precioLista) {
      const plan60 = {
        precioLista: precioLista === null ? 0 : precioLista,
        porcentajeDesc: 5,
        precioConDescuento: precioLista - precioLista * 0.05,
      };
      plan60.EntregaInicial = plan60.precioConDescuento * 0.6;
      plan60.EnCuotas = plan60.precioConDescuento * 0.4;
      plan60.Cuotas_24 = plan60.EnCuotas / 24;
      plan60.Cuotas_36 = (plan60.EnCuotas + plan60.EnCuotas * 0.15) / 36;
      plan60.Cuotas_48 = (plan60.EnCuotas + plan60.EnCuotas * 0.3) / 48;
      return(plan60);
    }
  };

  const calcularPlan40 = (precioLista) => {
    if (precioLista) {
      const plan40 = {
        precioLista: precioLista === null ? 0 : precioLista,
        porcentajeDesc: 2,
        precioConDescuento: precioLista - precioLista * 0.02,
      };
      plan40.EntregaInicial = plan40.precioConDescuento * 0.4;
      plan40.EnCuotas = plan40.precioConDescuento * 0.6;
      plan40.Cuotas_24 = plan40.EnCuotas / 24;
      plan40.Cuotas_36 = (plan40.EnCuotas + plan40.EnCuotas * 0.15) / 36;
      plan40.Cuotas_48 = (plan40.EnCuotas + plan40.EnCuotas * 0.3) / 48;

      return(plan40);
    }
  };

  const calcularPlan30 = (precioLista) => {
    if (precioLista) {
      const plan30 = {
        precioLista: precioLista === null ? 0 : precioLista,
        porcentajeDesc: 0,
        precioConDescuento: precioLista,
      };
      plan30.EntregaInicial = plan30.precioConDescuento * 0.3;
      plan30.EnCuotas = plan30.precioConDescuento * 0.7;
      plan30.Cuotas_24 = plan30.EnCuotas / 24;
      plan30.Cuotas_36 = (plan30.EnCuotas + plan30.EnCuotas * 0.15) / 36;
      plan30.Cuotas_48 = (plan30.EnCuotas + plan30.EnCuotas * 0.3) / 48;

      return(plan30);
    }
  };

  const calcularPlanPersonalizado = (precioLista,_entrega,_cuotas,_porcentajeDesc) => {
    
    if (precioLista) {
      let interesCuotas = calcularInteresCuotas(_cuotas);
      const planPersonalizado = {
        precioLista: precioLista === null ? 0 : precioLista,
        porcentajeDesc: parseFloat(_porcentajeDesc),
      };
      planPersonalizado.precioConDescuento= precioLista - (precioLista * (_porcentajeDesc/100));//Validar descuentos
      planPersonalizado.EntregaInicial = parseFloat(_entrega);
      planPersonalizado.EnCuotas = (planPersonalizado.precioConDescuento - _entrega)*(1+interesCuotas);
      planPersonalizado.Cuotas = planPersonalizado.EnCuotas / _cuotas;
      return(planPersonalizado);
    }
  };

  
  const calcularInteresCuotas = (_cuotas) => {

    if (_cuotas < 25) {
      return (INTERESCUOTAS_1_24/100);
    }
    else return (INTERESCUOTAS_25_48/100);
  }

  export default calcularPlanes;
  