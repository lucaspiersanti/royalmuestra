import React, { useEffect, useState, useRef } from 'react';
import Swal from 'sweetalert2';
import FormClientePrecio from '../../components/FormClientePrecio';
import generarPlanesPDF from '../../utils/generarPlanesPDF';
import formatearPrecios from '../../utils/formatearPrecios';
import generarFichaVentaPDF from '../../utils/generarFichaVentaPDF';
import { GetLotes as getLotes } from '../../controllers/lotesController';
import { GetEtapasCategorias as getEtapasCategorias } from '../../controllers/etapaCategoriaController';
import { InputDinero } from '../../components/shared/inputDinero.jsx';
import { InputEnteros } from '../../components/shared/inputEnteros.jsx';
import calcularPlanes from '../../utils/calcularPlanes.jsx';
import { TablaPrecios } from '../../components/TablaPrecios.jsx';
import { SeleccionPlanes } from '../../components/SeleccionPlanes.jsx';
import { IntroduccionSeccion } from '../../components/shared/IntroduccionSeccion.jsx';
import Efectivo from '../../utils/Efectivo';

const TERRENOS_PISO = 1;
const TERRENOS_TECHO = 518;
const CUOTAS_PISO = 1;
const CUOTAS_TECHO = 48;

const PreciosPage = () => {
	const resumenPlanVentaRef = useRef(null);
	const [datosListos, setDatosListos] = useState(false);
	const [datosEtapasCategoria, setDatosEtapasCategoria] = useState([]);
	const [numero, setNumero] = useState('');
	const [etapa, setEtapa] = useState('');
	const [entrega, setEntrega] = useState('');
	const [cuotas, setCuotas] = useState('');
	const [porcentajeDesc, setPorcentajeDesc] = useState('');
	const [numeroAux, setNumeroAux] = useState('');
	const [etapaAux, setEtapaAux] = useState('');
	const [entregaAux, setEntregaAux] = useState('');
	const [generarPlan, setGenerarPlan] = useState(false);
	const [lotes, setLotes] = useState([]);
	const [verPlanes, setVerPlanes] = useState(false);
	const [lotePlan, setLotePlan] = useState(null);
	const [etapaCategoria, setEtapaCategoria] = useState(null);
	const [nuevaConsulta, setNuevaConsulta] = useState(false);
	const [cambiarPlan, setCambiarPlan] = useState(false);
	const [showExportButton, setShowExportButton] = useState(true);
	const fechaActual = new Date();
	const dia = fechaActual.getDate();
	const mes = fechaActual.getMonth() + 1;
	const anio = fechaActual.getFullYear();
	const fechaFormateada = `${dia}/${mes}/${anio}`;
	const [formClienteValido, setFormClienteValido] = useState(false);
	const [formCliente, setFormCliente] = useState(null);
	const [planPersonalizado, setPlanPersonalizado] = useState(false);
	const [planSeleccionado, setPlanSeleccionado] = useState(false);

	//Manejo de resultado obtenidos desde calcularPlanes
	const [resultadoPrecioLista, setResultadoPrecioLista] = useState(null);
	const [resultadoPlan100, setResultadoPlan100] = useState(null);
	const [resultadoPlan80, setResultadoPlan80] = useState(null);
	const [resultadoPlan60, setResultadoPlan60] = useState(null);
	const [resultadoPlan40, setResultadoPlan40] = useState(null);
	const [resultadoPlan30, setResultadoPlan30] = useState(null);
	const [resultadoPlanPersonalizado, setResultadoPlanPersonalizado] =
		useState(null);

	//Datos preCargados
	let _numero = localStorage.getItem('cotizarLote');
	let _etapa = localStorage.getItem('cotizarLoteEtapa');

	// Función para actualizar los datos filtrados
	const actualizarEstadoFormCliente = (estado) => {
		setFormClienteValido(estado);
	};

	const recibirDatosFormCliente = (form) => {
		setFormCliente(form);
	};

	const recibirDatosSeleccionPlanes = (
		_planSeleccionado,
		_planPersonalizado,
	) => {
		setPlanPersonalizado(_planPersonalizado);
		setPlanSeleccionado(_planSeleccionado);
	};

	// InputTerreno
	const [terreno, setTerreno] = useState(''); //Prueba

	//Inputs
	const handleChange = (nuevoDato, _label) => {
		switch (_label) {
			case 'Terreno':
				setTerreno(nuevoDato);
				setNumero(nuevoDato);
				setNumeroAux(nuevoDato);
				break;
			case 'Entrega':
				setEntrega(nuevoDato);
				setEntregaAux(nuevoDato);
				break;
			case 'Cuotas':
				setCuotas(nuevoDato);
				break;
			case 'Descuento %':
				setPorcentajeDesc(nuevoDato);
				break;
		}
	};

	//Carga datos iniciales Terrenos-etapas
	useEffect(() => {
		async function fetchLotes() {
			try {
				const response = await getLotes();
				setLotes(response.data);
			} catch (error) {}
		}

		async function fetchDatosEtapasCategoria() {
			try {
				const response = await getEtapasCategorias();
				setDatosEtapasCategoria(response.data);
			} catch (error) {}
		}
		fetchLotes().then(() => fetchDatosEtapasCategoria());
	}, []);

	//Datos pre cargados Terreno
	useEffect(() => {
		if (
			localStorage.getItem('cotizarLote') &&
			localStorage.getItem('cotizarLoteEtapa')
		) {
			setNumero(_numero);
			setEtapa(_etapa);
			setTerreno(_numero);
		}
	}, []);

	const validarDatosPreCargados = () => {
		if (_numero && _etapa) {
			setNumeroAux(_numero);
			setEtapaAux(_etapa);
			setGenerarPlan(true);
			obtenerTerrenoEtapa();
		} else {
			validarFichaTerreno();
		}
	};

	const validarFichaTerreno = () => {
		let formTerrenoValido = true;
		if (numero === '') {
			swal(
				'Campo sin completar',
				'Debe completar el numero de terreno',
				'info',
			);
			formTerrenoValido = false;
		}
		if (etapa === '') {
			swal('Campo sin completar', 'Debe seleccionar la etapa', 'info');
			formTerrenoValido = false;
		}
		if (planPersonalizado) {
			if (entrega === '') {
				swal(
					'Campo sin completar',
					'Debe completar el monto de entrega',
					'info',
				);
				formTerrenoValido = false;
			}

			if (cuotas === '') {
				swal(
					'Campo sin completar',
					'Debe completar la cantidad de cuotas',
					'info',
				);
				formTerrenoValido = false;
			}
			if (porcentajeDesc === '') {
				swal('Campo sin completar', 'Debe completar el % de Descuento', 'info');
				formTerrenoValido = false;
			}
		}
		if (formTerrenoValido) {
			setNumeroAux(numero);
			setEtapaAux(etapa);
			obtenerTerrenoEtapa();
			setGenerarPlan(true); //Habilita vista
			setNuevaConsulta(true); //Habilita vista
		}
	};

	const obtenerTerrenoEtapa = () => {
		let loteAux;
		let etapaCategoriaAux;
		lotes.map((plote) => {
			if (plote.numero === parseInt(numero)) {
				setLotePlan(plote);
				loteAux = plote;
				console.log('numero: ', numero);
				console.log('plote.categoria: ', plote.categoria);
				console.log('datosEtapasCategoria: ', datosEtapasCategoria);
				datosEtapasCategoria.map((etapa_categoria) => {
					console.log(etapa_categoria.categoria);
					if (etapa_categoria.categoria === plote.categoria) {
						setEtapaCategoria(etapa_categoria);
						etapaCategoriaAux = etapa_categoria;
					}
				});
			}
		});
		console.log(etapaCategoria);
		console.log(lotePlan);
		if (
			loteAux !== null &&
			etapaCategoriaAux !== null &&
			numero !== '' &&
			etapa !== ''
		) {
			setDatosListos(true); //Maneja carga asincrona
		}
	};

	//Con datosListos, genero los planes
	useEffect(() => {
		let planesGenerados;
		if (datosListos && lotePlan && etapaCategoria) {
			planesGenerados = calcularPlanes(
				lotePlan,
				etapaCategoria,
				etapa,
				planPersonalizado,
				entrega,
				cuotas,
				porcentajeDesc,
			);
			if (planPersonalizado) {
				setResultadoPlanPersonalizado(planesGenerados.planPersonalizado);
			}
			setResultadoPrecioLista(planesGenerados.precioLista);
			setResultadoPlan100(planesGenerados.plan100);
			setResultadoPlan80(planesGenerados.plan80);
			setResultadoPlan60(planesGenerados.plan60);
			setResultadoPlan40(planesGenerados.plan40);
			setResultadoPlan30(planesGenerados.plan30);
			setGenerarPlan(true);
			setNuevaConsulta(true);
			scrollToResumenPlanVenta();
		}
	}, [datosListos, lotePlan, etapaCategoria]);

	//Observable
	useEffect(() => {
		if (lotePlan && etapaCategoria) {
			obtenerTerrenoEtapa();
		}
	}, [lotePlan, etapaCategoria]);

	const botonVerPlan = () => {
		setVerPlanes(true);
	};

	const cancelarFormTerreno = () => {
		resetFormularioTerreno();
		resetPlanes();
		resetPasos();
	};
	//Reset Formularios
	const resetCarga = () => {
		resetFormularioCliente();
		resetFormularioTerreno();
		resetPlanes();
		resetPasos();
	};

	const resetFormularioCliente = () => {
		setFormCliente(null);
		setFormClienteValido(false);
		setPlanSeleccionado(false);
		setGenerarPlan(false);
	};

	const resetFormularioTerreno = () => {
		localStorage.removeItem('cotizarLote'); //Datos precargados
		localStorage.removeItem('cotizarLoteEtapa'); //Datos precargados

		//Reinicio constantes
		setTerreno('');
		setNumero(''); //Terreno
		setEtapa('');
		setEntrega('');
		setCuotas('');
		setPorcentajeDesc('');

		setLotePlan(null);
		setEtapaCategoria(null);
		setDatosListos(false);

		//Para encabezado del informe
		setNumeroAux('');
		setEtapaAux('');
		setEntregaAux(null);
	};

	const resetPlanes = () => {
		setResultadoPlanPersonalizado(null);
		setResultadoPlan100(null);
		setResultadoPlan80(null);
		setResultadoPlan60(null);
		setResultadoPlan40(null);
		setResultadoPlan30(null);
		setGenerarPlan(false);
		setVerPlanes(false);
	};

	const resetPasos = () => {
		setPlanSeleccionado(false);
		setPlanPersonalizado(false);
		setNuevaConsulta(false);
		setShowExportButton(true);
	};

	const scrollToResumenPlanVenta = () => {
		if (resumenPlanVentaRef.current) {
			resumenPlanVentaRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const onNuevaConsulta = () => {
		if (formClienteValido) {
			const swalWithBootstrapButtons = Swal.mixin({
				customClass: {
					confirmButton: 'btn btn-success',
					cancelButton: 'btn btn-danger',
				},
			});
			swalWithBootstrapButtons
				.fire({
					title: '¿ Cambiar de cliente ?',
					text: `Cliente actual: ${formCliente.apellido}`,
					icon: 'info',
					showCancelButton: true,
					confirmButtonText: 'Si, cambiar cliente',
					cancelButtonText: 'No',
					reverseButtons: true,
				})
				.then((result) => {
					if (result.isConfirmed) {
						swalWithBootstrapButtons.fire({
							title: 'Cliente nuevo!',
							text: 'Deberá cargar los datos del mismo',
							icon: 'info',
						});
						resetCarga();
					} else if (result.dismiss === Swal.DismissReason.cancel) {
						swalWithBootstrapButtons.fire({
							title: 'Continuar con cliente',
							text: 'Podrá generar un nuevo plan',
							icon: 'info',
						});
						resetFormularioTerreno();
						resetPlanes();
						resetPasos();
					}
				});
		}
	};

	const [secciones] = useState([
		{
			id: '1',
			titulo: 'Generación de planes de pago',
			subTitulo:
				'Podrás simular los diferentes planes de pago para un terreno en particular.',
		},
	]);

	return (
		<>
			<TablaPrecios></TablaPrecios>
			<hr></hr>
			<section className='text-gray-600 body-font relative'>
				<div className='container px-1 py-24 mx-auto'>
					<IntroduccionSeccion
						_titulo={secciones[0].titulo}
						_subtitulo={secciones[0].subTitulo}></IntroduccionSeccion>

					{!formClienteValido && !planSeleccionado && !generarPlan && (
						<FormClientePrecio
							onEstadoFormCliente={actualizarEstadoFormCliente}
							onformularioCompleto={recibirDatosFormCliente}
							onResetFormulario={formCliente}></FormClientePrecio>
					)}

					{formClienteValido && !planSeleccionado && !generarPlan && (
						<>
							<SeleccionPlanes
								onPlanSeleccionado={
									recibirDatosSeleccionPlanes
								}></SeleccionPlanes>
							<div className='flex w-1/2 mx-auto'>
								<button
									onClick={() => resetFormularioCliente()}
									style={{ height: '40px', width: '100%' }}
									className='mt-4 text-center text-white bg-red-500 border-0 py-2 focus:outline-none hover:bg-red-600 rounded text-lg'>
									Cancelar
								</button>
							</div>
						</>
					)}

					{nuevaConsulta && generarPlan && (
						<div className='p-2 w-full text-center'>
							<button
								onClick={() => onNuevaConsulta()}
								style={{ height: '40px', width: '100%' }}
								className='mt-4 text-center text-white bg-red-500 border-0 py-2 focus:outline-none hover:bg-red-600 rounded text-lg'>
								Nueva consulta
							</button>
						</div>
					)}

					{!nuevaConsulta && planSeleccionado && planPersonalizado && (
						<div className='text-gray-700 relative'>
							<div className='container px-5 mx-auto'>
								<div
									className='p-1 m-1 flex-wrap   
                  bg-clip-padding backdrop-filter backdrop-blur bg-opacity-20 
                  backdrop-saturate-50 backdrop-contrast-150 bg-white'>
									<div className='flex w-full space-x-2'>
										<div className='w-1/5 relative p-1 mb-4 flex flex-wrap'>
											<InputEnteros
												_label={'Terreno'}
												_obligatorio={true}
												_info={'1 a 518 Terrenos'}
												_valorPrevio={_numero}
												_piso={TERRENOS_PISO}
												_techo={TERRENOS_TECHO}
												_maxLength='3'
												onChange={handleChange}></InputEnteros>
										</div>
										<div className='w-1/5 relative p-1 mb-4 flex flex-wrap'>
											<InputDinero
												_label={'Entrega'}
												_obligatorio={true}
												_info={'En Dolares'}
												onChange={handleChange}></InputDinero>
										</div>
										<div className='w-1/5 relative p-1 mb-4 flex flex-wrap'>
											<div className='relative w-full'>
												<label htmlFor='etapa' className='text-label'>
													<b>Etapa</b>
												</label>
												<select
													id='etapa'
													name='etapa'
													value={etapa}
													onChange={(ev) => setEtapa(ev.target.value)}
													style={{ height: '42px', width: '100%' }}
													className='w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out'>
													<option value=''>Seleccionar</option>
													<option value='1'>Etapa 1</option>
													<option value='2'>Etapa 2</option>
													<option value='3'>Etapa 3</option>
													<option value='4'>Etapa 4</option>
												</select>
											</div>
										</div>
										<div className='w-1/5 relative p-1 mb-4 flex flex-wrap'>
											<InputEnteros
												_label={'Descuento %'}
												_obligatorio={true}
												_info={'Sobre el precio de lista'}
												_piso={0}
												_techo={100}
												_maxLength='3'
												onChange={handleChange}></InputEnteros>
										</div>

										<div className='w-1/5 relative p-1 mb-4 flex flex-wrap'>
											<InputEnteros
												_label={'Cuotas'}
												_obligatorio={true}
												_info={'1 a 48 cuotas'}
												_piso={CUOTAS_PISO}
												_techo={CUOTAS_TECHO}
												onChange={handleChange}></InputEnteros>
										</div>
									</div>

									<div className='flex w-full space-x-4'>
										<div className='w-1/2 p-2'>
											<button
												onClick={() => cancelarFormTerreno()}
												style={{ height: '40px', width: '100%' }}
												className='mt-4 text-center text-white bg-red-500 border-0 py-2 focus:outline-none hover:bg-red-600 rounded text-lg'>
												Cancelar
											</button>
										</div>
										<div className='w-1/2 p-2'>
											<button
												onClick={() => validarDatosPreCargados()}
												style={{ height: '40px', width: '100%' }}
												className='mt-4 text-center text-white bg-green-500 border-0 py-2 focus:outline-none hover:bg-green-600 rounded text-lg'>
												Generar plan Personalizado
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}

					{!nuevaConsulta && planSeleccionado && !planPersonalizado && (
						<div className='text-gray-600 body-font relative'>
							<div className='container px-5 mx-auto'>
								<div
									className='p-1 m-1 md:w-2/3 mx-auto md:flex-wrap lg:flex-wrap flex xl:flex-wrap   
                bg-clip-padding backdrop-filter backdrop-blur bg-opacity-20 
                backdrop-saturate-50 backdrop-contrast-150 bg-white'>
									<div className='flex w-full space-x-4'>
										<div className='w-1/2 relative p-1 mb-4 flex flex-wrap'>
											<div className='relative w-full'>
												<InputEnteros
													_label={'Terreno'}
													_obligatorio={true}
													_info={'1 a 518 Terrenos'}
													_valorPrevio={_numero}
													_piso={TERRENOS_PISO}
													_techo={TERRENOS_TECHO}
													_maxLength='3'
													onChange={handleChange}></InputEnteros>
											</div>
										</div>

										<div className='w-1/2 relative p-1 mb-4 flex flex-wrap'>
											<div className='relative w-full'>
												<label htmlFor='etapa' className='text-label'>
													<b>Etapa</b>
												</label>
												<select
													id='etapa'
													name='etapa'
													value={etapa}
													onChange={(ev) => setEtapa(ev.target.value)}
													style={{ height: '42px', width: '100%' }}
													className='w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out'>
													<option value=''>Seleccionar</option>
													<option value='1'>Etapa 1</option>
													<option value='2'>Etapa 2</option>
													<option value='3'>Etapa 3</option>
													<option value='4'>Etapa 4</option>
												</select>
											</div>
										</div>
									</div>

									<div className='flex w-full space-x-4'>
										<div className='w-1/2 p-2'>
											<button
												onClick={() => cancelarFormTerreno()}
												style={{ height: '40px', width: '100%' }}
												className='mt-4 text-center text-white bg-red-500 border-0 py-2 focus:outline-none hover:bg-red-600 rounded text-lg'>
												Cancelar
											</button>
										</div>
										<div className='w-1/2 p-2'>
											<button
												onClick={() => validarDatosPreCargados()}
												style={{ height: '40px', width: '100%' }}
												className='mt-4 text-center text-white bg-green-500 border-0 py-2 focus:outline-none hover:bg-green-600 rounded text-lg'>
												Generar plan standar
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</section>

			<hr></hr>
			{generarPlan &&
				resultadoPlan100 &&
				resultadoPlan80 &&
				resultadoPlan60 &&
				resultadoPlan40 &&
				resultadoPlan30 &&
				formCliente && (
					<section
						id='pdf-content'
						className='text-gray-600 body-font overflow-hidden'>
						<hr></hr>
						<div className='mb-3 leading-relaxed mt-3 flex justify-center items-center'>
							<div className='flex justify-center items-center'></div>
							<div
								ref={resumenPlanVentaRef}
								className=' flex flex-row justify-center items-center'>
								<a className='flex title-font font-medium items-center md:justify-start justify-center text-black '>
									<span className='ml-3 text-xl '>Resumen planes de venta</span>
								</a>
							</div>
						</div>
						<hr></hr>
						<div className='container px-5 py-10 -m-4'>
							{/* Encabezado */}
							<div className='flex flex-wrap -m-4'>
								<div className='p-4 xl:w-1/2 md:w-1/2 w-full'>
									<p className='lg:w-2/3 leading-relaxed text-base text-gray-500'>
										Terreno nùmero: <strong> {numeroAux} </strong>.
									</p>
									<p className='lg:w-2/3 leading-relaxed text-base text-gray-500'>
										Etapa de venta: <strong> {etapaAux} </strong>.
									</p>
									<p className='lg:w-2/3 leading-relaxed text-base text-gray-500'>
										Precio de lista:{' '}
										<strong>
											{' '}
											{'U$S ' +
												formatearPrecios(resultadoPlan100.precioLista)}{' '}
										</strong>
									</p>
									<p className='lg:w-2/3 leading-relaxed text-base text-gray-500'>
										Cantidad de metros cuadrados:{' '}
										<strong> {formatearPrecios(lotePlan.dimensiones)} </strong>
									</p>
								</div>
								<div className='p-4 xl:w-1/2 md:w-1/2 w-full'>
									<p className='lg:w-2/3 leading-relaxed text-base text-gray-500'>
										Fecha de generación: <strong> {fechaFormateada} </strong>.
									</p>
									<p className='lg:w-2/3 leading-relaxed text-base text-gray-500'>
										Vendedor:{' '}
										<strong> {localStorage.getItem('username')} </strong>
									</p>
									<p className='lg:w-2/3 leading-relaxed text-base text-gray-500'>
										Interesado: <strong> {formCliente.apellido}, </strong>{' '}
										<strong> {formCliente.nombre} </strong>
									</p>
								</div>
							</div>
							<hr></hr>
							{/* Plan personalizado */}
							{planPersonalizado && resultadoPlanPersonalizado && (
								<div className='container flex flex-wrap -m-4 mt-5'>
									<div className='p-4 xl:w-full md:w-full w-full'>
										<div className='h-full p-6 rounded-lg border-2 border-green-800 flex flex-col relative overflow-hidden'>
											<span className='bg-green-800 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl'>
												Plan Personalizado
											</span>
											<h2 className='text-sm tracking-widest title-font mb-1 font-medium'>
												Entrega inicial:{' '}
											</h2>
											<h1 className='text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200'>
												<span>
													{'U$S ' + resultadoPlanPersonalizado.EntregaInicial}
												</span>
											</h1>
											{resultadoPlanPersonalizado.porcentajeDesc > 0 && (
												<p className='flex items-center text-gray-600 mb-2'>
													<span className='w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-800 text-white rounded-full flex-shrink-0'>
														<svg
															fill='none'
															stroke='currentColor'
															strokeLinecap='round'
															strokeLinejoin='round'
															strokeWidth='2.5'
															className='w-3 h-3'
															viewBox='0 0 24 24'>
															<path d='M20 6L9 17l-5-5'></path>
														</svg>
													</span>
													{resultadoPlanPersonalizado.porcentajeDesc}% de
													descuento.
												</p>
											)}

											<p className='flex items-center text-gray-600 mb-2'>
												<span className='w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-800 text-white rounded-full flex-shrink-0'>
													<svg
														fill='none'
														stroke='currentColor'
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth='2.5'
														className='w-3 h-3'
														viewBox='0 0 24 24'>
														<path d='M20 6L9 17l-5-5'></path>
													</svg>
												</span>
												Porcentaje restante financiado en cuotas fijas
											</p>
											<a href='#Cuotas'>
												<button
													onClick={() => botonVerPlan(80)}
													className='flex items-center mt-auto text-white bg-green-800 border-0 py-2 px-4 w-full focus:outline-none hover:bg-green-700 rounded'>
													<a href='#Cuotas'> Ver cuotas </a>
													<svg
														fill='none'
														stroke='currentColor'
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth='2'
														className='w-4 h-4 ml-auto'
														viewBox='0 0 24 24'>
														<path d='M5 12h14M12 5l7 7-7 7'></path>
													</svg>
												</button>
											</a>
										</div>
									</div>
								</div>
							)}

							{/* Primera Fila */}
							<div className='container flex flex-wrap -m-4 mt-5'>
								<div className='p-4 xl:w-1/2 md:w-1/2 w-full'>
									<div className='h-full p-6 rounded-lg border-2 border-yellow-600 flex flex-col relative overflow-hidden'>
										<span className='bg-yellow-600 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl'>
											Plan 100 %
										</span>
										<h2 className='text-sm tracking-widest title-font mb-1 font-medium'>
											Valor del terreno:{' '}
										</h2>
										<h1 className='text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200'>
											{/* <span>${resultadoPlan100.precioConDescuento}</span> */}
											<span>
												{'U$S ' +
													formatearPrecios(resultadoPlan100.precioConDescuento)}
											</span>
										</h1>
										<p className='flex items-center text-gray-600 mb-2'>
											<span className='w-4 h-4 mr-2 inline-flex items-center justify-center bg-yellow-600 text-white rounded-full flex-shrink-0'>
												<svg
													fill='none'
													stroke='currentColor'
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2.5'
													className='w-3 h-3'
													viewBox='0 0 24 24'>
													<path d='M20 6L9 17l-5-5'></path>
												</svg>
											</span>
											{resultadoPlan100.porcentajeDesc}% de descuento.
										</p>
									</div>
								</div>
								<div className='p-4 xl:w-1/2 md:w-1/2 w-full'>
									<div className='h-full p-6 rounded-lg border-2 border-blue-500 flex flex-col relative overflow-hidden'>
										<span className='bg-blue-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl'>
											Plan 80 %
										</span>
										<h2 className='text-sm tracking-widest title-font mb-1 font-medium'>
											Entrega inicial:{' '}
										</h2>
										<h1 className='text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200'>
											<span>
												{'U$S ' +
													formatearPrecios(resultadoPlan80.EntregaInicial)}
											</span>
										</h1>
										<p className='flex items-center text-gray-600 mb-2'>
											<span className='w-4 h-4 mr-2 inline-flex items-center justify-center bg-blue-400 text-white rounded-full flex-shrink-0'>
												<svg
													fill='none'
													stroke='currentColor'
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2.5'
													className='w-3 h-3'
													viewBox='0 0 24 24'>
													<path d='M20 6L9 17l-5-5'></path>
												</svg>
											</span>
											{resultadoPlan80.porcentajeDesc}% de descuento.
										</p>
										<p className='flex items-center text-gray-600 mb-2'>
											<span className='w-4 h-4 mr-2 inline-flex items-center justify-center bg-blue-400 text-white rounded-full flex-shrink-0'>
												<svg
													fill='none'
													stroke='currentColor'
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2.5'
													className='w-3 h-3'
													viewBox='0 0 24 24'>
													<path d='M20 6L9 17l-5-5'></path>
												</svg>
											</span>
											Porcentaje restante financiado en cuotas fijas
										</p>
										<a href='#Cuotas'>
											<button
												onClick={() => botonVerPlan(80)}
												className='flex items-center mt-auto text-white bg-blue-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-blue-500 rounded'>
												<a href='#Cuotas'> Ver cuotas </a>
												<svg
													fill='none'
													stroke='currentColor'
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2'
													className='w-4 h-4 ml-auto'
													viewBox='0 0 24 24'>
													<path d='M5 12h14M12 5l7 7-7 7'></path>
												</svg>
											</button>
										</a>
									</div>
								</div>
							</div>

							<hr></hr>

							<div className='container flex flex-wrap -m-4 mb-5 mt-5'>
								<div className='p-2 xl:w-1/3 md:w-1/2 w-full'>
									<div className='h-full p-6 rounded-lg border-2 border-gray-500 flex flex-col relative overflow-hidden'>
										<span className='bg-gray-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl'>
											Plan 60 %
										</span>
										<h2 className='text-sm tracking-widest title-font mb-1 font-medium'>
											Entrega inicial:{' '}
										</h2>
										<h1 className='text-4xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200'>
											<span>
												{'U$S ' +
													formatearPrecios(resultadoPlan60.EntregaInicial)}
											</span>
										</h1>
										<p className='flex items-center text-gray-600 mb-2'>
											<span className='w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0'>
												<svg
													fill='none'
													stroke='currentColor'
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2.5'
													className='w-3 h-3'
													viewBox='0 0 24 24'>
													<path d='M20 6L9 17l-5-5'></path>
												</svg>
											</span>
											{resultadoPlan60.porcentajeDesc} % de descuento.
										</p>
										<p className='flex items-center text-gray-600 mb-2'>
											<span className='w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0'>
												<svg
													fill='none'
													stroke='currentColor'
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2.5'
													className='w-3 h-3'
													viewBox='0 0 24 24'>
													<path d='M20 6L9 17l-5-5'></path>
												</svg>
											</span>
											Porcentaje restante financiado en cuotas fijas
										</p>
										<a href='#Cuotas'>
											<button
												onClick={() => botonVerPlan(60)}
												className='flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded'>
												<a href='#Cuotas'> Ver cuotas </a>
												<svg
													fill='none'
													stroke='currentColor'
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2'
													className='w-4 h-4 ml-auto'
													viewBox='0 0 24 24'>
													<path d='M5 12h14M12 5l7 7-7 7'></path>
												</svg>
											</button>
										</a>
									</div>
								</div>
								<div className='p-2 xl:w-1/3 md:w-1/2 w-full'>
									<div className='h-full p-6 rounded-lg border-2 border-gray-500 flex flex-col relative overflow-hidden'>
										<span className='bg-gray-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl'>
											Plan 40 %
										</span>
										<h2 className='text-sm tracking-widest title-font mb-1 font-medium'>
											Entrega inicial:{' '}
										</h2>
										<h1 className='text-4xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200'>
											<span>
												{'U$S ' +
													formatearPrecios(resultadoPlan40.EntregaInicial)}
											</span>
										</h1>
										<p className='flex items-center text-gray-600 mb-2'>
											<span className='w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0'>
												<svg
													fill='none'
													stroke='currentColor'
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2.5'
													className='w-3 h-3'
													viewBox='0 0 24 24'>
													<path d='M20 6L9 17l-5-5'></path>
												</svg>
											</span>
											{resultadoPlan40.porcentajeDesc} % de descuento.
										</p>
										<p className='flex items-center text-gray-600 mb-2'>
											<span className='w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0'>
												<svg
													fill='none'
													stroke='currentColor'
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2.5'
													className='w-3 h-3'
													viewBox='0 0 24 24'>
													<path d='M20 6L9 17l-5-5'></path>
												</svg>
											</span>
											Porcentaje restante financiado en cuotas fijas
										</p>
										<a href='#Cuotas'>
											<button
												onClick={() => botonVerPlan(40)}
												className='flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded'>
												<a href='#Cuotas'> Ver cuotas </a>
												<svg
													fill='none'
													stroke='currentColor'
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2'
													className='w-4 h-4 ml-auto'
													viewBox='0 0 24 24'>
													<path d='M5 12h14M12 5l7 7-7 7'></path>
												</svg>
											</button>
										</a>
									</div>
								</div>
								<div className='p-2 xl:w-1/3 md:w-1/2 w-full'>
									<div className='h-full p-6 rounded-lg border-2 border-gray-500 flex flex-col relative overflow-hidden'>
										<span className='bg-gray-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl'>
											Plan 30 %
										</span>
										<h2 className='text-sm tracking-widest title-font mb-1 font-medium'>
											Entrega inicial:{' '}
										</h2>
										<h1 className='text-4xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200'>
											<span>
												{'U$S ' +
													formatearPrecios(resultadoPlan30.EntregaInicial)}
											</span>
										</h1>
										<p className='flex items-center text-gray-600 mb-2'>
											<span className='w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0'>
												<svg
													fill='none'
													stroke='currentColor'
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2.5'
													className='w-3 h-3'
													viewBox='0 0 24 24'>
													<path d='M20 6L9 17l-5-5'></path>
												</svg>
											</span>
											Porcentaje restante financiado en cuotas fijas
										</p>
										<a href='#Cuotas'>
											<button
												onClick={() => botonVerPlan(30)}
												className='flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded'>
												<a href='#Cuotas'> Ver cuotas </a>
												<svg
													fill='none'
													stroke='currentColor'
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2'
													className='w-4 h-4 ml-auto'
													viewBox='0 0 24 24'>
													<path d='M5 12h14M12 5l7 7-7 7'></path>
												</svg>
											</button>
										</a>
									</div>
								</div>
							</div>

							{verPlanes &&
								resultadoPlan80 &&
								resultadoPlan60 &&
								resultadoPlan40 &&
								resultadoPlan30 && (
									<div id='Cuotas' style={{ position: 'relative' }}>
										<div className='mt-5'>
											{/* Plan Personalizado */}
											{planPersonalizado && resultadoPlanPersonalizado && (
												<div className='container px-1 py-10 mx-auto'>
													<div className='flex flex-col text-center w-full mb-5'>
														<h1 className='sm:text-3xl text-2xl font-medium title-font mb-4 mt-5 text-gray-900'>
															Plan de pago personalizado{' '}
														</h1>
													</div>

													<div className='lg:w-2/3 w-full mx-auto overflow-auto'>
														<table className='table-auto w-full text-left whitespace-no-wrap'>
															<thead>
																<tr>
																	<th className='px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-yellow-700'>
																		Total{' '}
																	</th>
																	<th className='px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-yellow-600'>
																		Pago inicial{' '}
																	</th>
																	<th className='px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-yellow-600'>
																		Pago en Cuotas{' '}
																	</th>
																	<th className='px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-yellow-600'>
																		{cuotas} Cuotas{' '}
																	</th>
																</tr>
															</thead>
															<tbody>
																<tr>
																	<td className='px-4 py-3'>
																		{'U$S ' +
																			formatearPrecios(
																				resultadoPlanPersonalizado.EntregaInicial +
																					resultadoPlanPersonalizado.EnCuotas,
																			)}
																	</td>
																	<td className='px-4 py-3'>
																		{'U$S ' +
																			formatearPrecios(
																				resultadoPlanPersonalizado.EntregaInicial,
																			)}
																	</td>
																	<td className='px-4 py-3'>
																		{'U$S ' +
																			formatearPrecios(
																				resultadoPlanPersonalizado.EnCuotas,
																			)}
																	</td>
																	<td className='px-4 py-3'>
																		{'U$S ' +
																			formatearPrecios(
																				resultadoPlanPersonalizado.Cuotas,
																			)}
																	</td>
																</tr>
															</tbody>
														</table>
													</div>
												</div>
											)}

											{/* Plan 80 */}
											<div className='container px-1 py-10 mx-auto'>
												<div className='flex flex-col text-center w-full mb-5'>
													<h1 className='sm:text-3xl text-2xl font-medium title-font mb-4 mt-5 text-gray-900'>
														Plan de pago 80%{' '}
													</h1>
												</div>

												<div className='lg:w-2/3 w-full mx-auto overflow-auto'>
													<table className='table-auto w-full text-left whitespace-no-wrap'>
														<thead>
															<tr>
																<th className='px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-yellow-700'>
																	Total{' '}
																</th>
																<th className='px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-yellow-600'>
																	Pago inicial{' '}
																</th>
																<th className='px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-yellow-600'>
																	Pago en Cuotas{' '}
																</th>
																<th className='px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-yellow-600'>
																	24 Cuotas{' '}
																</th>
																<th className='px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-yellow-600'>
																	36 Cuotas{' '}
																</th>
																<th className='px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-yellow-600'>
																	48 Cuotas{' '}
																</th>
															</tr>
														</thead>
														<tbody>
															<tr>
																<td className='px-4 py-3'>
																	{'U$S ' +
																		formatearPrecios(
																			resultadoPlan80.EntregaInicial +
																				resultadoPlan80.EnCuotas,
																		)}
																</td>
																<td className='px-4 py-3'>
																	{'U$S ' +
																		formatearPrecios(
																			resultadoPlan80.EntregaInicial,
																		)}
																</td>
																<td className='px-4 py-3'>
																	{'U$S ' +
																		formatearPrecios(resultadoPlan80.EnCuotas)}
																</td>
																<td className='px-4 py-3'>
																	{'U$S ' +
																		formatearPrecios(resultadoPlan80.Cuotas_24)}
																</td>
																<td className='px-4 py-3'>
																	{'U$S ' +
																		formatearPrecios(resultadoPlan80.Cuotas_36)}
																</td>
																<td className='px-4 py-3'>
																	{'U$S ' +
																		formatearPrecios(resultadoPlan80.Cuotas_48)}
																</td>
															</tr>
														</tbody>
													</table>
												</div>
											</div>
											{/* Plan 60 */}
											<div className='container px-1 py-10 mx-auto'>
												<div className='flex flex-col text-center w-full mb-5'>
													<h1 className='sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900'>
														Plan de pago 60%{' '}
													</h1>
												</div>

												<div className='lg:w-2/3 w-full mx-auto overflow-auto'>
													<table className='table-auto w-full text-left whitespace-no-wrap'>
														<thead>
															<tr>
																<th className='px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-yellow-700'>
																	Total{' '}
																</th>
																<th className='px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-yellow-600'>
																	Pago inicial{' '}
																</th>
																<th className='px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-yellow-600'>
																	Pago en Cuotas{' '}
																</th>
																<th className='px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-yellow-600'>
																	24 Cuotas{' '}
																</th>
																<th className='px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-yellow-600'>
																	36 Cuotas{' '}
																</th>
																<th className='px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-yellow-600'>
																	48 Cuotas{' '}
																</th>
															</tr>
														</thead>
														<tbody>
															<tr>
																<td className='px-4 py-3'>
																	{'U$S ' +
																		formatearPrecios(
																			resultadoPlan60.EntregaInicial +
																				resultadoPlan60.EnCuotas,
																		)}
																</td>
																<td className='px-4 py-3'>
																	{'U$S ' +
																		formatearPrecios(
																			resultadoPlan60.EntregaInicial,
																		)}
																</td>
																<td className='px-4 py-3'>
																	{'U$S ' +
																		formatearPrecios(resultadoPlan60.EnCuotas)}
																</td>
																<td className='px-4 py-3'>
																	{'U$S ' +
																		formatearPrecios(resultadoPlan60.Cuotas_24)}
																</td>
																<td className='px-4 py-3'>
																	{'U$S ' +
																		formatearPrecios(resultadoPlan60.Cuotas_36)}
																</td>
																<td className='px-4 py-3'>
																	{'U$S ' +
																		formatearPrecios(resultadoPlan60.Cuotas_48)}
																</td>
															</tr>
														</tbody>
													</table>
												</div>
											</div>

											{/* Plan 40 */}
											<div className='container px-1 py-10 mx-auto'>
												<div className='flex flex-col text-center w-full mb-5'>
													<h1 className='sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900'>
														Plan de pago 40%{' '}
													</h1>
												</div>

												<div className='lg:w-2/3 w-full mx-auto overflow-auto'>
													<table className='table-auto w-full text-left whitespace-no-wrap'>
														<thead>
															<tr>
																<th className='px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-yellow-700'>
																	Total{' '}
																</th>
																<th className='px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-yellow-600'>
																	Pago inicial{' '}
																</th>
																<th className='px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-yellow-600'>
																	Pago en Cuotas{' '}
																</th>
																<th className='px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-yellow-600'>
																	24 Cuotas{' '}
																</th>
																<th className='px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-yellow-600'>
																	36 Cuotas{' '}
																</th>
																<th className='px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-yellow-600'>
																	48 Cuotas{' '}
																</th>
															</tr>
														</thead>
														<tbody>
															<tr>
																<td className='px-4 py-3'>
																	{'U$S ' +
																		formatearPrecios(
																			resultadoPlan40.EntregaInicial +
																				resultadoPlan40.EnCuotas,
																		)}
																</td>
																<td className='px-4 py-3'>
																	{'U$S ' +
																		formatearPrecios(
																			resultadoPlan40.EntregaInicial,
																		)}
																</td>
																<td className='px-4 py-3'>
																	{'U$S ' +
																		formatearPrecios(resultadoPlan40.EnCuotas)}
																</td>
																<td className='px-4 py-3'>
																	{'U$S ' +
																		formatearPrecios(resultadoPlan40.Cuotas_24)}
																</td>
																<td className='px-4 py-3'>
																	{'U$S ' +
																		formatearPrecios(resultadoPlan40.Cuotas_36)}
																</td>
																<td className='px-4 py-3'>
																	{'U$S ' +
																		formatearPrecios(resultadoPlan40.Cuotas_48)}
																</td>
															</tr>
														</tbody>
													</table>
												</div>
											</div>
											{/* Plan 30 */}
											<div className='container px-1 py-10 mx-auto'>
												<div className='flex flex-col text-center w-full mb-5'>
													<h1 className='sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900'>
														Plan de pago 30%{' '}
													</h1>
												</div>

												<div className='lg:w-2/3 w-full mx-auto overflow-auto'>
													<table className='table-auto w-full text-left whitespace-no-wrap'>
														<thead>
															<tr>
																<th className='px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-yellow-700'>
																	Total{' '}
																</th>
																<th className='px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-yellow-600'>
																	Pago inicial{' '}
																</th>
																<th className='px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-yellow-600'>
																	Pago en Cuotas{' '}
																</th>
																<th className='px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-yellow-600'>
																	24 Cuotas{' '}
																</th>
																<th className='px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-yellow-600'>
																	36 Cuotas{' '}
																</th>
																<th className='px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-yellow-600'>
																	48 Cuotas{' '}
																</th>
															</tr>
														</thead>
														<tbody>
															<tr>
																<td className='px-4 py-3'>
																	{'U$S ' +
																		formatearPrecios(
																			resultadoPlan30.EntregaInicial +
																				resultadoPlan30.EnCuotas,
																		)}
																</td>
																<td className='px-4 py-3'>
																	{'U$S ' +
																		formatearPrecios(
																			resultadoPlan30.EntregaInicial,
																		)}
																</td>
																<td className='px-4 py-3'>
																	{'U$S ' +
																		formatearPrecios(resultadoPlan30.EnCuotas)}
																</td>
																<td className='px-4 py-3'>
																	{'U$S ' +
																		formatearPrecios(resultadoPlan30.Cuotas_24)}
																</td>
																<td className='px-4 py-3'>
																	{'U$S ' +
																		formatearPrecios(resultadoPlan30.Cuotas_36)}
																</td>
																<td className='px-4 py-3'>
																	{'U$S ' +
																		formatearPrecios(resultadoPlan30.Cuotas_48)}
																</td>
															</tr>
														</tbody>
													</table>
												</div>
											</div>

											<hr></hr>
											<div className='mb-3 leading-relaxed mt-3 flex justify-center items-center'>
												<div className='flex justify-center items-center'></div>
												<div className=' flex flex-row justify-center items-center'>
													<a className='flex title-font font-medium items-center md:justify-start justify-center text-black'>
														<span className='ml-3 text-xl'>Royal Village</span>
													</a>
												</div>
											</div>
											<hr></hr>
										</div>
										{showExportButton && (
											<div className='top-50 right-0 m-4'>
												<button
													onClick={() => {
														// setShowExportButton(false),
														Efectivo(
															numero,
															etapa,
															resultadoPrecioLista,
															formCliente,
															lotePlan,
														);
													}}
													style={{
														position: 'absolute',
														top: '10px',
														right: '390px',
														zIndex: '1',
													}}
													className='flex items-center mt-auto text-white bg-red-400 border-0 py-2 px-4 
        focus:outline-none hover:bg-blue-500 rounded'>
													Promo Efectivo
												</button>
												<button
													onClick={() => {
														// setShowExportButton(false)
														Efectivo(
															numero,
															etapa,
															resultadoPrecioLista,
															formCliente,
															lotePlan,
														);
													}}
													style={{
														position: 'absolute',
														top: '10px',
														right: '390px',
														zIndex: '1',
													}}
													className='flex items-center mt-auto text-white bg-red-400 border-0 py-2 px-4 
        focus:outline-none hover:bg-blue-500 rounded'>
													Promo Efectivo
												</button>
												<button
													onClick={() => {
														// setShowExportButton(false),
														generarPlanesPDF(
															numero,
															etapa,
															resultadoPlan30,
															resultadoPlan40,
															resultadoPlan60,
															resultadoPlan80,
															resultadoPlan100,
															formCliente,
															lotePlan,
														);
													}}
													style={{
														position: 'absolute',
														top: '10px',
														right: '10px',
														zIndex: '1',
													}}
													className='flex items-center mt-auto text-white bg-blue-400 border-0 py-2 px-4 
        focus:outline-none hover:bg-blue-500 rounded'>
													PLANES DE PAGO
												</button>
												<button
													onClick={() => {
														generarFichaVentaPDF(numero);
													}}
													style={{
														position: 'absolute',
														top: '10px',
														right: '200px', // Ajusta la posición según tus necesidades
														zIndex: '1',
													}}
													className='flex items-center mt-auto text-white bg-green-400 border-0 py-2 px-4 
        focus:outline-none hover:bg-green-500 rounded'>
													Ficha de Ventas
												</button>
											</div>
										)}
									</div>
								)}
						</div>
					</section>
				)}
		</>
	);
};

export default PreciosPage;
