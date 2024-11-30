import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import formatearPrecios from './formatearPrecios';

const generarPlanesPDF = (
	nroLote,
	etapa,
	plan30,
	plan40,
	plan60,
	plan80,
	plan100,
	formCliente,
	lotePlan,
) => {
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

	//Icono encabezado
	// pdf.addImage("/favicon.ico", "string", 350, 10, 30, 30); //formato, px,py,w,h

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

	const titulo = 'Resumen planes de venta';
	const tituloWidth = pdf.getTextWidth(titulo);
	const tituloX = (pdf.internal.pageSize.width - tituloWidth) / 2;
	const tituloY = 65;

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
		`Precio de Lista: USD ${formatearPrecios(plan100.precioLista)}`,
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
	pdf.text('Plan 100 %', 170, 210);

	pdf.setTextColor('#90979f');
	pdf.text('Valor del terreno:', 25, 225);

	pdf.setFontSize(26);
	pdf.setTextColor(0, 0, 0);
	pdf.text(`USD ${formatearPrecios(plan100.precioConDescuento)}`, 25, 245);
	pdf.line(25, 250, 215, 250, 'S');
	pdf.setFontSize(12);
	pdf.setTextColor('#90979f');
	pdf.text(`${plan100.porcentajeDesc}% de descuento`, 25, 260);

	//Cuadrado plan 80
	pdf.setTextColor(255, 255, 255);
	pdf.setFillColor('#3B82F6');
	pdf.setDrawColor('#3B82F6');
	pdf.setLineWidth(0.5);

	//Cuadrado grande
	pdf.roundedRect(230, 200, 200, 100, 5, 5, 'S');

	//Cuadrado chico (plan)
	pdf.roundedRect(370, 200, 60, 15, 5, 5, 'F');

	pdf.setFontSize(12);
	pdf.text('Plan 80 %', 380, 210);

	pdf.setTextColor('#90979f');
	pdf.text('Entrega Inicial:', 235, 225);

	pdf.setFontSize(26);
	pdf.setTextColor(0, 0, 0);
	pdf.text(`USD ${formatearPrecios(plan80.EntregaInicial)}`, 235, 245);
	pdf.line(235, 250, 425, 250, 'S');
	pdf.setFontSize(12);
	pdf.setTextColor('#90979f');
	pdf.text(`${plan80.porcentajeDesc}% de descuento`, 235, 260);
	pdf.text('Porcentaje restante financiado en cuotas fijas', 235, 280);

	//Cuadrado plan 60
	pdf.setTextColor(255, 255, 255);
	pdf.setFillColor('#6B7280');
	pdf.setDrawColor('#6B7280');
	pdf.setLineWidth(0.5);

	//Cuadrado grande
	pdf.roundedRect(20, 350, 130, 100, 5, 5, 'S');

	//Cuadrado chico (plan)
	pdf.roundedRect(100, 350, 50, 15, 5, 5, 'F');

	pdf.setFontSize(12);
	pdf.text('Plan 60 %', 105, 360);

	pdf.setTextColor('#90979f');
	pdf.text('Entrega Inicial:', 25, 375);

	pdf.setFontSize(26);
	pdf.setTextColor(0, 0, 0);
	pdf.text(`USD ${formatearPrecios(plan60.EntregaInicial)}`, 25, 395);
	pdf.line(25, 400, 125, 400, 'S');
	pdf.setFontSize(12);
	pdf.setTextColor('#90979f');
	pdf.text(`${plan60.porcentajeDesc}% de descuento`, 25, 410);

	//Cuadrado plan 40
	pdf.setTextColor(255, 255, 255);
	pdf.setFillColor('#6B7280');
	pdf.setDrawColor('#6B7280');
	pdf.setLineWidth(0.5);

	//Cuadrado grande
	pdf.roundedRect(160, 350, 130, 100, 5, 5, 'S');

	//Cuadrado chico (plan)
	pdf.roundedRect(240, 350, 50, 15, 5, 5, 'F');

	pdf.setFontSize(12);
	pdf.text('Plan 40 %', 245, 360);

	pdf.setTextColor('#90979f');
	pdf.text('Entrega Inicial:', 165, 375);

	pdf.setFontSize(26);
	pdf.setTextColor(0, 0, 0);
	pdf.text(`USD ${formatearPrecios(plan40.EntregaInicial)}`, 165, 395);
	pdf.line(165, 400, 275, 400, 'S');
	pdf.setFontSize(12);
	pdf.setTextColor('#90979f');
	pdf.text(`${plan40.porcentajeDesc}% de descuento`, 165, 410);

	//Cuadrado plan 30
	pdf.setTextColor(255, 255, 255);
	pdf.setFillColor('#6B7280');
	pdf.setDrawColor('#6B7280');
	pdf.setLineWidth(0.5);

	//Cuadrado grande
	pdf.roundedRect(300, 350, 130, 100, 5, 5, 'S');

	//Cuadrado chico (plan)
	pdf.roundedRect(380, 350, 50, 15, 5, 5, 'F');

	pdf.setFontSize(12);
	pdf.text('Plan 30 %', 390, 360);

	pdf.setTextColor('#90979f');
	pdf.text('Entrega Inicial:', 305, 375);

	pdf.setFontSize(26);
	pdf.setTextColor(0, 0, 0);
	pdf.text(`USD ${formatearPrecios(plan30.EntregaInicial)}`, 305, 395);
	pdf.line(305, 400, 415, 400, 'S');
	pdf.setFontSize(12);
	pdf.setTextColor('#90979f');

	pdf.addPage();

	const datosTabla30 = [
		[
			'Precio final',
			'Pago Inicial',
			'Pago en Cuotas',
			'24 Cuotas',
			'36 Cuotas',
			'48 Cuotas',
		],
		[
			`USD ${formatearPrecios(plan30.precioLista)}`,
			`USD ${formatearPrecios(plan30.EntregaInicial)}`,
			`USD ${formatearPrecios(plan30.EnCuotas)}`,
			`USD ${formatearPrecios(plan30.Cuotas_24)}`,
			`USD ${formatearPrecios(plan30.Cuotas_36)}`,
			`USD ${formatearPrecios(plan30.Cuotas_48)}`,
		],
	];

	const datosTabla40 = [
		[
			'Precio final',
			'Pago Inicial',
			'Pago en Cuotas',
			'24 Cuotas',
			'36 Cuotas',
			'48 Cuotas',
		],
		[
			`USD ${formatearPrecios(plan40.precioConDescuento)}`,
			`USD ${formatearPrecios(plan40.EntregaInicial)}`,
			`USD ${formatearPrecios(plan40.EnCuotas)}`,
			`USD ${formatearPrecios(plan40.Cuotas_24)}`,
			`USD ${formatearPrecios(plan40.Cuotas_36)}`,
			`USD ${formatearPrecios(plan40.Cuotas_48)}`,
		],
	];

	const datosTabla60 = [
		[
			'Precio final',
			'Pago Inicial',
			'Pago en Cuotas',
			'24 Cuotas',
			'36 Cuotas',
			'48 Cuotas',
		],
		[
			`USD ${formatearPrecios(plan60.precioConDescuento)}`,
			`USD ${formatearPrecios(plan60.EntregaInicial)}`,
			`USD ${formatearPrecios(plan60.EnCuotas)}`,
			`USD ${formatearPrecios(plan60.Cuotas_24)}`,
			`USD ${formatearPrecios(plan60.Cuotas_36)}`,
			`USD ${formatearPrecios(plan60.Cuotas_48)}`,
		],
	];

	const datosTabla80 = [
		[
			'Precio final',
			'Pago Inicial',
			'Pago en Cuotas',
			'24 Cuotas',
			'36 Cuotas',
			'48 Cuotas',
		],
		[
			`USD ${formatearPrecios(plan80.precioConDescuento)}`,
			`USD ${formatearPrecios(plan80.EntregaInicial)}`,
			`USD ${formatearPrecios(plan80.EnCuotas)}`,
			`USD ${formatearPrecios(plan80.Cuotas_24)}`,
			`USD ${formatearPrecios(plan80.Cuotas_36)}`,
			`USD ${formatearPrecios(plan80.Cuotas_48)}`,
		],
	];

	// Configurar la posición y tamaño de las tablas
	const margenTabla = 10;
	const alturaFila = 10;

	let inicioYTabla30 = 50;
	let inicioYTabla40 = inicioYTabla30 + 60;
	let inicioYTabla60 = inicioYTabla40 + 60;
	let inicioYTabla80 = inicioYTabla60 + 60;

	const separacionEntreTablas = 20;

	// Función para agregar título centrado a la tabla
	const agregarTituloCentrado = (pdf, titulo, x, y) => {
		const tituloWidth = pdf.getTextWidth(titulo);
		const centrarX = (pdf.internal.pageSize.width - tituloWidth) / 2;
		pdf.setTextColor(0, 0, 0); // Restaurar color de texto original
		pdf.setFontSize(14);
		pdf.text(titulo, centrarX, y);
	};

	// Agregar las tablas al PDF

	pdf.autoTable({
		startY: inicioYTabla80,
		head: [datosTabla80[0]],
		body: [datosTabla80[1]],
		headStyles: {
			fillColor: [202, 138, 4], // Color de fondo para los encabezados
			textColor: [255, 255, 255], // Color del texto para los encabezados
		},
		didDrawPage: function (data) {
			agregarTituloCentrado(pdf, 'Plan 80', margenTabla, inicioYTabla80 - 5);
		},
	});

	// Aumentar la posición inicial Y para la siguiente tabla
	inicioYTabla80 += separacionEntreTablas;

	pdf.autoTable({
		startY: inicioYTabla60,
		head: [datosTabla60[0]],
		body: [datosTabla60[1]],
		headStyles: {
			fillColor: [202, 138, 4], // Color de fondo para los encabezados
			textColor: [255, 255, 255], // Color del texto para los encabezados
		},
		didDrawPage: function (data) {
			agregarTituloCentrado(pdf, 'Plan 60', margenTabla, inicioYTabla60 - 5);
		},
	});

	// Aumentar la posición inicial Y para la siguiente tabla
	inicioYTabla60 += separacionEntreTablas;

	pdf.autoTable({
		startY: inicioYTabla40,
		head: [datosTabla40[0]],
		body: [datosTabla40[1]],
		headStyles: {
			fillColor: [202, 138, 4], // Color de fondo para los encabezados
			textColor: [255, 255, 255], // Color del texto para los encabezados
		},
		didDrawPage: function (data) {
			agregarTituloCentrado(pdf, 'Plan 40', margenTabla, inicioYTabla40 - 5);
		},
	});

	// Aumentar la posición inicial Y para la siguiente tabla
	inicioYTabla40 += separacionEntreTablas;

	pdf.autoTable({
		startY: inicioYTabla30,
		head: [datosTabla30[0]],
		body: [datosTabla30[1]],
		headStyles: {
			fillColor: [202, 138, 4], // Color de fondo para los encabezados
			textColor: [255, 255, 255], // Color del texto para los encabezados
		},
		didDrawPage: function (data) {
			agregarTituloCentrado(pdf, 'Plan 30', margenTabla, inicioYTabla30 - 5);
		},
	});

	pdf.setDrawColor(156, 173, 165);
	pdf.line(10, 560, 440, 560, 'S');
	pdf.line(10, 610, 440, 610, 'S');

	pdf.addImage('/favicon.ico', 'string', poisicionX, 570, 30, 30);

	pdf.save(
		`Royale Village - Consulta lote ${formattedNroLote} - ${formattedDate} - ${formCliente.apellido}`,
	);
};

export default generarPlanesPDF;
