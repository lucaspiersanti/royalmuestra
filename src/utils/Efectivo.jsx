import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import formatearPrecios from './formatearPrecios';

const Efectivo = (
	nroLote,
	etapa,
	resultadoPrecioLista,
	formCliente,
	lotePlan,
) => {
	console.log(etapa);
	console.log(lotePlan);

	const formattedNroLote = nroLote.toString().padStart(3, 0);
	const pdf = new jsPDF({
		orientation: 'portrait',
		unit: 'px',
	});

	const formattedDate = new Date().toLocaleDateString('es-ES', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	// plan100.precioLista * 0.38
	const precio = () => {
		if (lotePlan.categoria === 'Vista a calle')
			return lotePlan.dimensiones * 36;
		if (lotePlan.categoria === 'Vista Verde') return lotePlan.dimensiones * 40;
		if (lotePlan.categoria === 'Vista a Avenida')
			return lotePlan.dimensiones * 45.6;
		if (lotePlan.categoria === 'Vista a Avenida y Verde')
			return lotePlan.dimensiones * 52;
		if (lotePlan.categoria === 'Vista al Lago')
			return lotePlan.dimensiones * 55.2;
		return 0;
	};

	//Icono footer
	const anchoPagina = pdf.internal.pageSize.width;
	const anchoImagen = 30;
	const poisicionX = (anchoPagina - anchoImagen) / 2;
	pdf.addImage('/favicon.ico', 'string', poisicionX, 570, 30, 30);

	pdf.setFont('Lora', 'italic');
	pdf.setFontSize(24);
	pdf.setTextColor(0, 0, 0);

	pdf.setDrawColor(156, 173, 165);
	pdf.line(10, 45, 440, 45, 'S');
	pdf.line(10, 75, 440, 75, 'S');
	pdf.line(10, 175, 440, 175, 'S');
	pdf.line(10, 325, 440, 325, 'S');
	//Lineas footer
	pdf.line(10, 560, 440, 560, 'S');
	pdf.line(10, 610, 440, 610, 'S');

	const titulo = 'Promoción Exclusiva Abonando en efectivo';
	const tituloWidth = pdf.getTextWidth(titulo);
	const tituloX = (pdf.internal.pageSize.width - tituloWidth) / 2;
	const tituloY = 65;

	pdf.setTextColor('RED');
	pdf.text(titulo, tituloX, tituloY);
	pdf.setFontSize(12);
	pdf.setTextColor('#90979f');

	const margenIzqColumIzq = 60;
	const margenIzqColumDer = pdf.internal.pageSize.width / 2 + 60;

	let incioColumnaY = 100;
	const interlineadoColumnas = 15;

	//   Columna Izquierda
	pdf.text(
		`Terreno número: ${formattedNroLote}`,
		margenIzqColumIzq,
		incioColumnaY,
	);
	pdf.text(
		`Fecha de consulta: ${formattedDate}`,
		margenIzqColumDer,
		incioColumnaY,
	);
	pdf.text(
		`Etapa de venta: ${etapa}`,
		margenIzqColumIzq,
		incioColumnaY + interlineadoColumnas,
	);
	incioColumnaY = incioColumnaY + interlineadoColumnas;
	pdf.text(
		`Precio de Lista: USD ${formatearPrecios(resultadoPrecioLista)}`,
		margenIzqColumIzq,
		incioColumnaY + interlineadoColumnas,
	);
	pdf.text(
		`Vendedor: ${localStorage.getItem('nombre')}`,
		margenIzqColumDer,
		incioColumnaY + interlineadoColumnas,
	);
	incioColumnaY = incioColumnaY + interlineadoColumnas;
	pdf.text(
		`Tamaño de Lote: ${formatearPrecios(lotePlan.dimensiones)}m\u00B2`,
		margenIzqColumIzq,
		incioColumnaY + interlineadoColumnas,
	);
	pdf.text(
		`Interesado: ${formCliente.nombre} ${formCliente.apellido}`,
		margenIzqColumDer,
		incioColumnaY + interlineadoColumnas,
	);
	incioColumnaY = incioColumnaY + interlineadoColumnas;
	pdf.text(
		`Tipo de lote: ${lotePlan.categoria}`,
		margenIzqColumIzq,
		incioColumnaY + interlineadoColumnas,
	);

	//Cuadrado plan 100
	pdf.setTextColor(255, 255, 255);
	pdf.setFillColor(202, 138, 4);
	pdf.setDrawColor(202, 138, 4);
	pdf.setLineWidth(0.5);

	//Cuadrado grande
	pdf.roundedRect(20, 200, 200, 100, 5, 5, 'S');

	//Cuadrado chico (plan)
	pdf.roundedRect(160, 200, 60, 15, 5, 5, 'F');

	pdf.setFontSize(12);
	pdf.text('Plan Efectivo', 170, 210);

	pdf.setTextColor('#90979f');
	pdf.text('Valor del terreno:', 25, 225);

	pdf.setFontSize(26);
	pdf.setTextColor(0, 0, 0);
	pdf.text(`USD ${precio()}`, 25, 245);
	pdf.line(25, 250, 215, 250, 'S');
	pdf.setFontSize(12);
	pdf.setTextColor('RED');
	// pdf.text(`30% de descuento`, 25, 260);d

	pdf.setTextColor('#90979f');

	pdf.setDrawColor(156, 173, 165);
	pdf.line(10, 560, 440, 560, 'S');
	// pdf.line(10, 610, 440, 610, 'S');

	pdf.addImage('/favicon.ico', 'string', poisicionX, 570, 30, 30);

	pdf.save(
		`Royale Village - PROMOCIÓN EXCLUSIVA EFECTIVO- lote ${formattedNroLote} - ${formattedDate} - ${formCliente.apellido}`,
	);
};

export default Efectivo;
