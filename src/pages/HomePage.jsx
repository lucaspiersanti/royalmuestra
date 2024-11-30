import { useEffect } from 'react';

//Componentes
import Header from '../components/landing/Secciones/Header';
import Contenido from '../components/landing/Secciones/Contenido';
import Contenido_Izq from '../components/landing/Secciones/Contenido_Izq';
import MasterPlan from '../components/landing/Secciones/MasterPlan';
import Form from '../components/landing/Secciones/Form';
import Footer from '../components/landing/Secciones/Footer';
import GrupoDesarrollador from '../components/landing/Secciones/GrupoDesarrollador';
import ExtractoComercial from '../components/landing/Secciones/ExtractoComercial';
import Textos from '../components/constantes/Textos';
import HeroWithOverlay from '../components/landing/Secciones/HeroComponent';
import Amenities from '../components/landing/Secciones/Amenities/Amenities';

const HomePages = () => {
	useEffect(() => {
		const resetScrollPosition = () => {
			window.scrollTo(0, 0);
		};
		resetScrollPosition();
	}, []);

	return (
		<>
			<div
				id='Home'
				className='relative w-screen h-screen landscapes:h-screen overflow-hidden'>
				<Header />
				<HeroWithOverlay />
			</div>

			{/* Secciones */}
			{Textos.secciones.map((item, index) =>
				index % 2 !== 0 ? (
					<div key={item.id} className=''>
						<Contenido
							key={item.id}
							titulo={item.titulo}
							titulo_2={item.titulo_2}
							subTitulo={item.subTitulo}
							imagen={item.imagen}
							epigrafe={item.epigrafe}
						/>
					</div>
				) : (
					<div key={item.id} className=''>
						<Contenido_Izq
							key={item.id}
							titulo={item.titulo}
							titulo_2={item.titulo_2}
							subTitulo={item.subTitulo}
							imagen={item.imagen}
							epigrafe={item.epigrafe}
						/>
					</div>
				),
			)}

			<div
				id='amenities'
				className='relative w-full h-full landscapes:h-full overflow-hidden'>
				<Amenities />
			</div>

			<div id='extractoComercial' className=''>
				<ExtractoComercial
					titulo={Textos.extratoComercial.titulo}
					subTitulo={Textos.extratoComercial.subTitulo}
					imagen={Textos.extratoComercial.imagen}
					titulo_2={Textos.extratoComercial.titulo_2}
					subTitulo_2={Textos.extratoComercial.subTitulo}
					epigrafe={Textos.extratoComercial.epigrafe}
				/>
			</div>

			<div className='flex justify-center items-center bg-white py-12 w-full h-screen'>
				<div
					className='relative flex items-center w-full h-full'
					style={{
						backgroundImage: 'url(./nuevas/31.webp)',
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						backgroundAttachment: 'scroll',
					}}>
					{/* Capa negra semitransparente */}
					<div className='z-0 absolute inset-0 bg-black opacity-50'></div>

					{/* Contenido encima de la capa negra */}
					<div className='relative z-10 flex justify-center w-full'>
						<div
							className='bg-white rounded-lg w-full sm:max-w-full'
							style={{
								position: 'absolute',
								top: '-5px', // Ubica el contenido en el borde inferior
							}}>
							<MasterPlan />
						</div>
					</div>
				</div>
			</div>

			<div
				key='contacto'
				className='w-full h-full'
				style={{
					backgroundImage: 'url(./nuevas/19.webp)',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundAttachment: 'scroll',
				}}>
				<Form />
			</div>
			<div id='grupoDesarrollador' className=''>
				<GrupoDesarrollador />
			</div>
			<Footer heading='ROYAL VILLAGE' />
		</>
	);
};

export default HomePages;
