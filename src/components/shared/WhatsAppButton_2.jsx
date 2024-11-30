import { GlobalConstants } from '../../components/constantes/GlobalConstants';

const WhatsAppButton_2 = () => {
	const openWhatsApp = () => {
		const url = `https://wa.me/${
			GlobalConstants.PHONE_NUMBER
		}?text=${encodeURIComponent(GlobalConstants.MESSAGE)}`;
		window.open(url, '_blank');
	};

	return (
		<div
			className='flex items-center justify-center bg-resaltar hover:bg-decorativo hover:duration-1000 p-2 rounded-full border-white border-2 cursor-pointer transform hover:-translate-y-1 hover:shadow-mdin'
			onClick={openWhatsApp}>
			<button
				className='flex rounded-full transition duration-300 overflow-hidden'
				style={{
					width: '30px',
					height: '30px',
				}}
				aria-label='Chat en WhatsApp'>
				<svg
					fill='#ffffff'
					viewBox='0 0 256 256'
					id='Flat'
					xmlns='http://www.w3.org/2000/svg'>
					<g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
					<g
						id='SVGRepo_tracerCarrier'
						strokeLinecap='round'
						strokeLinejoin='round'></g>
					<g id='SVGRepo_iconCarrier'>
						{' '}
						<path d='M128.00049,28A100.02594,100.02594,0,0,0,41.11475,177.53908l-9.0044,31.51661a11.99971,11.99971,0,0,0,14.835,14.834l31.5166-9.00391A100.00677,100.00677,0,1,0,128.00049,28Zm0,192a91.87082,91.87082,0,0,1-46.95264-12.86719,3.99494,3.99494,0,0,0-3.14355-.4082l-33.15723,9.47363a3.99979,3.99979,0,0,1-4.94434-4.94531l9.47266-33.15625a4.00111,4.00111,0,0,0-.4082-3.14355A92.01077,92.01077,0,1,1,128.00049,220Zm50.51123-73.457-20.45947-11.69141a12.01054,12.01054,0,0,0-12.12745.12891l-13.80664,8.28418a44.04183,44.04183,0,0,1-19.38232-19.38281l8.28369-13.80664a12.0108,12.0108,0,0,0,.12891-12.127l-11.69092-20.46A10.91584,10.91584,0,0,0,100,72a32.00811,32.00811,0,0,0-32,31.88086A84.001,84.001,0,0,0,151.999,188h.12012A32.00842,32.00842,0,0,0,184,156,10.913,10.913,0,0,0,178.51172,146.543ZM152.10791,180h-.1084A75.99972,75.99972,0,0,1,76,103.8926,23.997,23.997,0,0,1,100,80a2.89975,2.89975,0,0,1,2.51172,1.457L114.20264,101.918a4.00418,4.00418,0,0,1-.043,4.042l-9.38916,15.64844a3.9987,3.9987,0,0,0-.21826,3.69824,52.04112,52.04112,0,0,0,26.1416,26.1416,3.99707,3.99707,0,0,0,3.69873-.21875L150.04,141.84084a4.006,4.006,0,0,1,4.043-.04394l20.46045,11.69238A2.89712,2.89712,0,0,1,176,156,23.99725,23.99725,0,0,1,152.10791,180Z'></path>{' '}
					</g>
				</svg>
			</button>
			<div className='flex items-center justify-center mr-2 ml-2 text-white'>
				<span className='text-xl'>Conocé el Proyecto</span>
			</div>
		</div>
	);
};

export default WhatsAppButton_2;
