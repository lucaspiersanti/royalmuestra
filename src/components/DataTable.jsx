import { jsPDF } from "jspdf";
const pageWidth = 450;

const DataTable = ({datosParaMostrar,}) => {
 const pdfOfertaReserva = () => {
   const formattedNroLote = datosParaMostrar.nroLote;
   const pdf = new jsPDF({
     orientation: "portrait",
     unit: "px",
   });
   let currentY = 45;
    pdf.addImage("/favicon.ico", "string", 350, 10, 30, 30); //formato, px,py,w,h
    pdf.line(10, 50, 440, 50, "S");
   pdf.setFont("Times"); 
   pdf.setFontSize(12); 
   pdf.setTextColor(0, 0, 0); 
   
   const formattedDate = new Date().toLocaleDateString("es-ES", {
     year: "numeric",
     month: "long",
     day: "numeric",
   });
 const datosCompletos = datosParaMostrar;//Variable auxiliar

const dolaresEntrega = datosCompletos.dolaresEntrega.toString(); // Convertir a cadena
const tieneDecimales = dolaresEntrega.includes(".");

let centavosDolar;
if (tieneDecimales) {
    const centavos = dolaresEntrega.split(".")[1]; // Obtener los centavos
    centavosDolar = centavos.slice(0, 2); // Tomar los últimos dos dígitos
} else {
    centavosDolar = "00"; // Si no tiene decimales, asignar "00"
}

//Valor final
let valorFinalAux;
valorFinalAux = datosCompletos.valorFinal.toFixed(2).toString(); // Redondear a dos decimales y convertir a cadena

// Verificar si datosCompletos.valorFinal tiene más de dos decimales
// if (datosCompletos.valorFinal % 1 !== 0) {
//     valorFinalAux = datosCompletos.valorFinal.toString(); // Convertir a cadena
// } else {
//     valorFinalAux = datosCompletos.valorFinal.toFixed(2).toString(); // Redondear a dos decimales y convertir a cadena
// }


//const valorFinalAux = datosCompletos.valorFinal.toString();

const tieneDecimalesValorFinalAux = valorFinalAux.includes(".");

let centavosDolarValorFinal;
if (tieneDecimalesValorFinalAux) {
    const centavos = valorFinalAux.split(".")[1]; // Obtener los centavos
    centavosDolarValorFinal = centavos.slice(0, 2); // Tomar los últimos dos dígitos
} else {
  centavosDolarValorFinal = "00"; // Si no tiene decimales, asignar "00"
}

//valorFinalMenosReserva
//const valorFinalMenosReservaAux = datosCompletos.valorFinalMenosReserva.toFixed(2).toString(); // Convertir a cadena
let valorFinalMenosReservaAux;
valorFinalMenosReservaAux = datosCompletos.valorFinalMenosReserva.toFixed(2).toString(); // Redondear a dos decimales y convertir a cadena
// Verificar si datosCompletos.valorFinal tiene más de dos decimales
// if (datosCompletos.valorFinalMenosReserva % 1 !== 0) {
//   valorFinalMenosReservaAux = datosCompletos.valorFinalMenosReserva.toString(); // Convertir a cadena
// } else {
//   valorFinalMenosReservaAux = datosCompletos.valorFinalMenosReserva.toFixed(2).toString(); // Redondear a dos decimales y convertir a cadena
// }

const tieneDecimalesvalorFinalMenosReservaAux = valorFinalMenosReservaAux.includes(".");

let centavosDolarValorFinalMenosReserva;
if (tieneDecimalesvalorFinalMenosReservaAux) {
    const centavos = valorFinalMenosReservaAux.split(".")[1]; // Obtener los centavos
    centavosDolarValorFinalMenosReserva = centavos.slice(0, 2); // Tomar los últimos dos dígitos
} else {
  centavosDolarValorFinalMenosReserva = "00"; // Si no tiene decimales, asignar "00"
}

//valorCuota
//const valorCuotaAux = datosCompletos.valorCuota.toFixed(2).toString(); // Convertir a cadena
let valorCuotaAux;

// Verificar si datosCompletos.valorFinal tiene más de dos decimales
valorCuotaAux = datosCompletos.valorCuota.toFixed(2).toString();
// if (datosCompletos.valorCuota % 1 !== 0) {
//   valorCuotaAux = datosCompletos.valorCuota.toString(); // Convertir a cadena
// } else {
//   valorCuotaAux = datosCompletos.valorCuota.toFixed(2).toString(); // Redondear a dos decimales y convertir a cadena
// }

const tieneDecimalesvalorCuotaAux = valorCuotaAux.includes(".");

let centavosDolarvalorCuota;
if (tieneDecimalesvalorCuotaAux) {
    const centavos = valorCuotaAux.split(".")[1]; // Obtener los centavos
    centavosDolarvalorCuota = centavos.slice(0, 2); // Tomar los últimos dos dígitos
} else {
  centavosDolarvalorCuota = "00"; // Si no tiene decimales, asignar "00"
}
 
 function addText(text, x, y, maxWidth, lineHeight) {
     const lines = pdf.splitTextToSize(text, maxWidth);
  
     pdf.text(lines, x, y, { align: 'justify', lineHeightFactor: 1.5, maxWidth });
  
     return y + lines.length * lineHeight;
 }
 currentY = addText(formattedDate, 340, currentY+25, pageWidth - 80, 10,'right');
 currentY += 5; // Espacio entre líneas

 // Título
 currentY = addText('RESERVA  DE COMPRA DE LOTE', 150, currentY+10, pageWidth - 80, 10);
 currentY += 10; // Espacio entre líneas


 const fecha = new Date();

 const dia = fecha.getDate();
 const mes = fecha.getMonth() + 1; // Meses en JavaScript son indexados desde 0
 const anio = fecha.getFullYear();

 const diaFormateado = dia < 10 ? `0${dia}` : dia;
 const mesFormateado = mes < 10 ? `0${mes}` : mes;
 let mesTexto="";

 switch(mes){
  case 1: mesTexto="Enero";
  break;
  case 2: mesTexto="Febrero";
  break;
  case 3: mesTexto="Marzo";
  break;
  case 4: mesTexto="Abril";
  break;
  case 5: mesTexto="Mayo";
  break;
  case 6: mesTexto="Junio";
  break;
  case 7: mesTexto="Julio";
  break;
  case 8: mesTexto="Agosto";
  break;
  case 9: mesTexto="Septiembre";
  break;
  case 10: mesTexto="Octubre";
  break;
  case 11: mesTexto="Noviembre";
  break;
  case 12: mesTexto="Diciembre";
  break;

 }

 const fechaFormateada = `${diaFormateado}/${mesFormateado}/${anio}`;


 // Texto extenso
const longText1 = `En  la Ciudad de Buenos Aires, RECIBÌ de ${datosCompletos.nombre} ${datosCompletos.apellido} DNI: ${datosCompletos.dni}, CUIT: ${datosCompletos.cuil}, estado civil:${datosCompletos.estadoCivil}, Tel: ${datosCompletos.telefono}, con domicilio en la calle : ${datosCompletos.domicilio}, constituyendo domicilio especial de correo electrónico a los efectos de la presente, en el mail: ${datosCompletos.mail} donde se tendrán por eficaces y válidas todas las notificaciones cursadas, en adelante DADOR DE LA RESERVA, entregando la suma de DÓLARES ESTADOUNIDENSES BILLETES ${datosCompletos.dolaresEntregaTexto} CON ${centavosDolar}/100 (U$S ${datosCompletos.dolaresEntrega}) en efectivo para ser imputada en concepto de RESERVA  y OFERTA DE COMPRA del Lote ${datosCompletos.nroLote} de ${datosCompletos.dimensiones}m cuadrados, sito en Barrio Royal Village, Localidad de San Vicente, Provincia de Buenos Aires, sirviendo el presente de recibo por dicha suma, de acuerdo con las siguientes condiciones:` 
const longText2= `2. MONEDA DE PAGO: Las partes declaran que constituye condición esencial para la celebración del presente contrato que el pago se realice en dólares estadounidenses exclusivamente en billetes de la moneda norteamericana, renunciando expresamente la "PARTE COMPRADORA”  a lo estipulado en el artículo 765 in fine del Código Civil y Comercial de la Nación.
La “PARTE COMPRADORA” declara bajo juramento que, a la fecha de la firma del presente, posee la totalidad de los billetes dólares estadounidenses necesarios y la libre disponibilidad de los mismos, o el medio para conseguirlos, para cancelar íntegramente el precio ofertado.`
const longText3=`3. El monto mencionado será abonado al momento de la firma del contrato de adhesión, con fecha para la firma de la misma el dia a convenir, en Escribania y horario a determinar por parte del FIDEICOMISO LOANJO.`
const longText4=`4. APROBACIÓN: Se deja expresa constancia que la presente reserva se toma AD REFERÉNDUM, de la aceptación de la PARTE VENDEDORA. En caso de que la PARTE VENDEDORA no aprobase la operación se devolverá al DADOR DE LA RESERVA la suma íntegra recibida como reserva sin indemnización alguna. Si el que se arrepiente o desistiere de efectuar la compra fuera el DADOR DE LA RESERVA, perderá el importe entregado hasta el momento, el que quedará en beneficio de la PARTE VENDEDORA en concepto de única y total indemnización.`
const longText5a=`a) El DADOR DE LA RESERVA abonará, en concepto comisión, la suma que resulte del cuatro por ciento (4%) correspondiente al precio de venta, dicha suma deberá ser abonada al momento de la firma del contrato de adhesión. `
const longText5b=`b) Al momento de la firma del presente contrato el comprador deberá abonar los gatos de sellado equivalente al 1% del monto de la venta. `
const longText5c=`c) Al momento de la certificación de firmas, el comprador deberá abonar los honorarios de la escribanía. `
 
currentY = addText(longText1, 40, currentY+5, pageWidth - 80, 10,'justify');
currentY=currentY+30;
currentY = addText(`1. PRECIO OFERTADO:`, 40, currentY+10, pageWidth - 80, 10,'left');
currentY = addText(`a) Que la venta se realizará por el monto total de DÓLARES ESTADOUNIDENSES BILLETES ${datosCompletos.valorFinalTexto} CON ${centavosDolarValorFinal}/100 (U$S ${valorFinalAux})`, 40, currentY+10, pageWidth - 80, 10,'left');
currentY = addText(`b) Importe a abonar al momento de la firma de la sesiòn de derecho: DÓLARES ESTADOUNIDENSES BILLETES ${datosCompletos.valorFinalMenosReservaTexto} CON ${centavosDolarValorFinalMenosReserva}/100 (U$S ${valorFinalMenosReservaAux})`, 40, currentY+20, pageWidth - 80, 10,'left');
currentY=currentY+5;
if(datosCompletos.plan !=1){
  currentY = addText(`c) FORMA DE PAGO: el comprador debeá abonar ${datosCompletos.cuotasTexto} (${datosCompletos.cuotas}) CUOTAS CONSECUTIVAS DE LA SUMA DE DÓLARES ESTADOUNIDENSES BILLETES ${datosCompletos.valorCuotaTexto} CON ${centavosDolarvalorCuota}/100 (U$S ${valorCuotaAux})`, 40, currentY+10, pageWidth - 80, 10,'left');
  currentY=currentY+15;
}

currentY = addText(longText2, 40, currentY+15, pageWidth - 80, 10,'justify');
currentY=currentY+30;
//currentY = addText(`4. REFUERZO: La "PARTE COMPRADORA completará como REFUERZO DE RESERVA la suma de ${datosCompletos.dolaresEntregaTexto} (U$S ${datosCompletos.dolaresEntrega}).`, 40, currentY+5, pageWidth - 80, 10,'left');
//currentY=currentY+5;
currentY = addText(longText3, 40, currentY+5, pageWidth - 80, 10,'justify');
currentY=currentY+12;



//Agregar pagina
  // Agregar una nueva página
  pdf.addPage();
  let currentYP2 = 45;
  pdf.addImage("/favicon.ico", "string", 350, 10, 30, 30); //formato, px,py,w,h
  pdf.line(10, 50, 440, 50, "S");
  pdf.setFont("Times"); 
  pdf.setFontSize(12); 
  pdf.setTextColor(0, 0, 0); 
  currentYP2 += 20;
  currentYP2 = addText(longText4, 40, currentYP2+10, pageWidth - 80, 10,'justify');
  currentYP2 += 20;
  currentYP2 = addText(`5. COMISIONES:`, 40, currentYP2+10, pageWidth+5 - 80, 10,'justify');
  currentYP2 = addText(longText5a, 40, currentYP2+10, pageWidth - 80, 10,'justify');
  currentYP2 = addText(longText5b, 40, currentYP2+10, pageWidth - 80, 10,'justify');
  currentYP2 = addText(longText5c, 40, currentYP2+10, pageWidth - 80, 10,'justify');

  currentYP2 = addText(`En prueba de conformidad con los términos del presente, se suscriben dos ejemplares, de igual tenor, recibiendo cada parte el suyo, en la ciudad de San Vicente,a los ${diaFormateado} del mes de ${mesTexto} del ${anio}`, 40, currentYP2+20, pageWidth - 80, 10,'left');

   pdf.text(`FIRMA Y ACLARACION COMPRADOR`,45,510);
   pdf.text(`FIRMA Y ACLARACION VENDEDOR`,250,510);
   pdf.text(`.....................................................................`,45,530);
   pdf.text(`.....................................................................`,250,530);
   pdf.text(`.....................................................................`,45,550);
   pdf.text(`.....................................................................`,250,550);
   pdf.text(`DNI: ............................................................`,45,570);
   pdf.text(`DNI: ............................................................`,250,570);
  
   pdf.save(`Royale Village - Reserva de lote ${formattedNroLote} - ${formattedDate}`);
 };

return (
 <section className="text-gray-600 body-font">
  <div className="container px-5 py-20 ">

    <div className="flex items-center w-3/5 mx-auto border-b pb-2 mb-2 border-gray-200 sm:flex-row flex-col">
      <div className="flex-grow sm:text-left text-center">
        <p className="leading-relaxed text-base">Descargá los documentos <strong>Oferta - Reserva de terreno</strong>, para firmarlos y avanzar al último paso.</p>
      </div>
      <div
      style={{ cursor: 'pointer' }}
      onClick={() => {
        pdfOfertaReserva(1);
      }} 
        className="sm:w-32 sm:order-none order-first sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
        <i className="fa-solid fa-file-arrow-down " ></i>
      </div>
    </div>
  </div>
</section>

  );
}


export default DataTable;


// <pre>{JSON.stringify(datosParaMostrar, null, 2)}</pre>