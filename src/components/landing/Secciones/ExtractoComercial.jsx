import PropTypes from 'prop-types';
import WhatsAppButton_2 from '../../shared/WhatsAppButton_2';

export const Contenido_Izq = ({
	titulo,
	titulo_2,
	subTitulo,
	imagen,
	epigrafe,
}) => {
	return (
		<section className='flex flex-col md:flex-row items-center md:items-start gap-8 p-6 md:p-12'>
			{/* Contenido de texto */}
			<div className='flex-1 max-w-prose flex flex-col justify-between'>
				<h1 className='text-4xl font-bold text-Royal'>
					{titulo} <br></br>
					<span className='text-resaltar'>{titulo_2}</span>
				</h1>
				<hr className='w-16 mt-4 mb-6 border-t-8 border-Royal-resaltar' />
				<p className='mt-4 text-xl text-gray-700'>{subTitulo}</p>
				<p className='mt-4 mb-3 text-xl text-decorativo'>{epigrafe}</p>
				<div className='mt-auto items-end'>
					<WhatsAppButton_2></WhatsAppButton_2>
				</div>
			</div>
			{/* Imagen */}
			<div className='flex-1'>
				<img
					src={imagen}
					loading='lazy'
					alt={epigrafe}
					className='rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-1000'
				/>
			</div>
		</section>
	);
};

Contenido_Izq.propTypes = {
	titulo: PropTypes.string.isRequired,
	titulo_2: PropTypes.string.isRequired,
	subTitulo: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	imagen: PropTypes.string.isRequired,
	epigrafe: PropTypes.string.isRequired,
};

export default Contenido_Izq;
