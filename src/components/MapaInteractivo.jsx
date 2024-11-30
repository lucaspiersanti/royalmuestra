import { useEffect, useState } from 'react';
import etapa1 from '/imagenes/Limpias/Etapa1.png';
import etapa2 from '/imagenes/Limpias/Etapa2.png';
// import etapa3 from "/imagenes/Limpias/Imagen3_Nro.jpg";
// import etapa4 from "/imagenes/Limpias/Imagen4_Nro.jpg";
// import etapa1 from "/imagenes/Limpias/Imagen1_Nro.jpg";
// import etapa2 from "/imagenes/Limpias/Imagen2_Nro.jpg";
import etapa3 from '/imagenes/Limpias/Etapa3.png';
import etapa4 from '/imagenes/Limpias/Etapa4.png';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import axios from 'axios';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useNavigate } from 'react-router-dom';
import { GetLotes as getLotes } from '../controllers/lotesController';
import { GetEtapasCategorias as getEtapasCategorias } from '../controllers/etapaCategoriaController';

const MapaInteractivo = ({ datosFiltrados }) => {
	const [lotes, setLotes] = useState([]);
	const [datosEtapasCategoria, setDatosEtapasCategoria] = useState([]);
	const [etapa] = useState('1');
	const [resultadosPrecioLista, setResultadosPrecioLista] = useState([]);

	const navigate = useNavigate();

	const redirigirPrecios = () => {
		navigate('/Administracion/Precios');
	};

	//Consulta datos a DB
	useEffect(() => {
		async function fetchData() {
			try {
				const responseLotes = await getLotes();
				setLotes(responseLotes.data);

				const responseEtapasCategoria = await getEtapasCategorias();
				setDatosEtapasCategoria(responseEtapasCategoria.data);
			} catch (error) {
				console.log(error);
			}
		}

		fetchData();
	}, []);

	useEffect(() => {
		if (lotes.length > 0 && datosEtapasCategoria.length > 0) {
			const preciosCalculados = [];

			lotes.forEach((lote) => {
				const etapaCategoria = datosEtapasCategoria.find(
					(etapa) => etapa.categoria === lote.categoria,
				);

				if (etapaCategoria) {
					let precioLista;

					switch (etapa) {
						case '1':
							precioLista =
								parseFloat(lote.dimensiones) *
								parseFloat(etapaCategoria.etapa_1);
							break;
						case '2':
							precioLista =
								parseFloat(lote.dimensiones) *
								parseFloat(etapaCategoria.etapa_2);
							break;
						case '3':
							precioLista =
								parseFloat(lote.dimensiones) *
								parseFloat(etapaCategoria.etapa_3);
							break;
						case '4':
							precioLista =
								parseFloat(lote.dimensiones) *
								parseFloat(etapaCategoria.etapa_4);
							break;
						default:
							swal(
								'No se pudo generar el plan',
								'Verifique el número de etapa',
								'warning',
							);
							return;
					}

					preciosCalculados.push({ id: lote.id, precioLista });
				}
			});

			setResultadosPrecioLista(preciosCalculados);
		}
	}, [lotes, datosEtapasCategoria, etapa]);

	const buscarPrecioLista = (id) => {
		let precio = null;

		if (resultadosPrecioLista) {
			resultadosPrecioLista.forEach((lotePrecio) => {
				if (parseInt(id) === parseInt(lotePrecio.id)) {
					precio = lotePrecio.precioLista;
				}
			});
		} else {
			console.log('Problema async');
		}

		return precio;
	};

	function renderLotes() {
		if (lotes === null || lotes.length === 0) {
			return null;
		} else {
			return lotes.map((lote) => {
				if (!lote) {
					return null;
				}
				let backgroundColor = getBackgroundColor(lote.estado);
				//Si recibo filtros
				if (datosFiltrados != null) {
					const numeroValido =
						!datosFiltrados.numeroFiltro ||
						lote.numero === parseInt(datosFiltrados.numeroFiltro);
					const dimensionValida =
						!datosFiltrados.dimensionFiltro ||
						lote.dimensiones === datosFiltrados.dimensionFiltro;
					const estadoValido =
						!datosFiltrados.estadoFiltro ||
						lote.estado === datosFiltrados.estadoFiltro;
					const categoriaValida =
						!datosFiltrados.categoriaFiltro ||
						lote.categoria === datosFiltrados.categoriaFiltro;

					const precioLista = buscarPrecioLista(lote.id);

					const precioValido =
						!datosFiltrados.precioFiltro ||
						(precioLista !== null &&
							parseInt(precioLista) <= parseInt(datosFiltrados.precioFiltro));

					const cumpleFiltros =
						numeroValido &&
						dimensionValida &&
						estadoValido &&
						categoriaValida &&
						precioValido;

					if (!cumpleFiltros) {
						backgroundColor = 'bg-gray-400';
					} else {
						guardarEtapaConResultado(lote);
					}
				}

				//Agregado para manejar cambio de etapas (imagenes)
				if (etapaActiva == lote.etapaVtaCategoriumIdEtapasVtaCategoria) {
					return (
						<div
							key={lote.id}
							style={{
								position: 'absolute',
								top: lote.top,
								left: lote.left,
								transform: 'translate(-50%, -50%)',
							}}>
							<button
								className={`text-white ${backgroundColor} border-0 py-1 px-2 focus:outline-none hover:${backgroundColor}-500 
                rounded text-xs transition duration-300 ease-in-out transform`}
								onClick={() => informacionLote(lote)}>
								{lote.numero}
							</button>
						</div>
					);
				}
			});
		}
	}

	//Asignación de colores por estado de lote
	function getBackgroundColor(estado) {
		switch (estado) {
			case 'Disponible':
				return 'bg-green-600';
			case 'Reservado':
				return 'bg-yellow-600';
			case 'Vendido':
				return 'bg-red-600';
			case 'Otro':
				return 'bg-blue-600';
			default:
				return '';
		}
	}

	//Modal informacion del lote
	const informacionLote = (lote) => {
		localStorage.removeItem('cotizarLote');
		localStorage.removeItem('cotizarLoteEtapa');
		if (lote.estado == 'Disponible') {
			Swal.fire({
				title: `${lote.estado}`,
				icon: 'success',
				html: `
         Lote N°: 
         ${lote.numero} - Dimension:
             ${lote.dimensiones}m cuadrados.`,
				showCancelButton: true,
				confirmButtonText: 'Cotizar',
				showLoaderOnConfirm: true,
				preConfirm: () => {
					let timerInterval;
					Swal.fire({
						title: 'Redirigiendo a Precios',
						timer: 2000,
						timerProgressBar: true,
						didOpen: () => {
							localStorage.setItem('cotizarLote', lote.numero);
							localStorage.setItem('cotizarLoteEtapa', etapa);
							Swal.showLoading();
							timerInterval = setInterval(() => {}, 100);
							redirigirPrecios();
						},
						willClose: () => {
							clearInterval(timerInterval);
						},
					});
				},
			});
		}

		if (lote.estado == 'Reservado') {
			swal(
				lote.estado,
				'Lote N°: ' +
					lote.numero +
					' - Dimension: ' +
					lote.dimensiones +
					' m cuadrados.',
				'warning',
			);
		}
		if (lote.estado == 'Vendido') {
			swal(
				lote.estado,
				'Lote N°: ' +
					lote.numero +
					' - Dimension: ' +
					lote.dimensiones +
					' m cuadrados.',
				'error',
			);
		}
		if (lote.estado == 'Otro') {
			swal(
				lote.estado,
				'Lote N°: ' +
					lote.numero +
					' - Dimension: ' +
					lote.dimensiones +
					' m cuadrados.',
				'info',
			);
		}
	};

	const [etapaFiltrada, setEtapaFiltrada] = useState(etapa1);

	const [etapaActiva, setEtapaActiva] = useState('1');

	const verEtapa = (etapa) => {
		let timerInterval;
		switch (etapa) {
			case '1':
				setEtapaFiltrada(etapa1);
				Swal.fire({
					title: 'Royal Village',
					html: `Cargando etapa N°: ${etapa}`,
					timer: 2000,
					timerProgressBar: true,
					didOpen: () => {
						Swal.showLoading();
						timerInterval = setInterval(() => {}, 100);
					},
					willClose: () => {
						clearInterval(timerInterval);
					},
				});
				break;
			case '2':
				setEtapaFiltrada(etapa2);
				Swal.fire({
					title: 'Royal Village',
					html: `Cargando etapa N°: ${etapa} <b></b>,`,
					timer: 2000,
					timerProgressBar: true,
					didOpen: () => {
						Swal.showLoading();
						timerInterval = setInterval(() => {}, 100);
					},
					willClose: () => {
						clearInterval(timerInterval);
					},
				});
				break;
			case '3':
				setEtapaFiltrada(etapa3);
				Swal.fire({
					title: 'Royal Village',
					html: `Cargando etapa N°: ${etapa}`,
					timer: 2000,
					timerProgressBar: true,
					didOpen: () => {
						Swal.showLoading();
						timerInterval = setInterval(() => {}, 100);
					},
					willClose: () => {
						clearInterval(timerInterval);
					},
				});
				break;
			case '4':
				setEtapaFiltrada(etapa4);
				Swal.fire({
					title: 'Royal Village',
					html: `Cargando etapa N°: ${etapa}`,
					timer: 2000,
					timerProgressBar: true,
					didOpen: () => {
						Swal.showLoading();
						timerInterval = setInterval(() => {}, 100);
					},
					willClose: () => {
						clearInterval(timerInterval);
					},
				});
				break;
			default:
				setEtapaFiltrada(etapa1);
				return;
		}
		setEtapaActiva(etapa);
	};

	const [etapConResultado, setEtapaConResultado] = useState([]);
	const guardarEtapaConResultado = (lote) => {
		const nuevaEtapa = lote.etapaVtaCategoriumIdEtapasVtaCategoria;

		if (!etapConResultado.includes(nuevaEtapa)) {
			setEtapaConResultado((prevEtapas) => [...prevEtapas, nuevaEtapa]);
		}
	};

	const iconoEtapa = (etapa) => {
		// Aquí puedes personalizar el ícono para cada etapa
		switch (etapa) {
			case '1':
				return '💡';
			case '2':
				return '💡';
			case '3':
				return '💡';
			case '4':
				return '💡';
			default:
				return '';
		}
	};

	return (
		<>
			<div className='flex space-x-4 w-full mb-4'>
				{['1', '2', '3', '4'].map((etapa) => (
					<button
						key={etapa}
						onClick={() => verEtapa(etapa)}
						className={`flex items-center mt-auto text-white ${
							etapaActiva === etapa ? 'bg-yellow-600' : 'bg-blue-900'
						} border-0 py-2 px-4 w-full focus:outline-none hover:bg-yellow-500 rounded`}>
						Etapa {etapa}
						{etapConResultado.includes(etapa) && (
							<span className='ml-2' title='Resultados disponibles'>
								{iconoEtapa(etapa)}
							</span>
						)}
					</button>
				))}
			</div>

			<div
				style={{
					position: 'relative',
					display: 'inline-block',
					textAlign: 'center',
				}}>
				<TransformWrapper
					defaultScale={1}
					defaultPositionX={100}
					defaultPositionY={200}>
					<TransformComponent>
						<div style={{ position: 'relative' }}>
							<img src={etapaFiltrada} />
							{/* {renderLotes()} */}
						</div>
					</TransformComponent>
				</TransformWrapper>
			</div>
		</>
	);
};

export default MapaInteractivo;
