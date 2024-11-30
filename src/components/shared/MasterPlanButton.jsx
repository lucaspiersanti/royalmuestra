import Swal from 'sweetalert2';

const MasterPlanButton = () => {
	const donwloadMasterPlan = () => {
		console.log('Descargando Master Plan');
		setTimeout(() => {
			console.log('Descarga completada');
			Swal.fire({
				title: 'Master plan',
				text: 'Descarga exitosa!',
				icon: 'success',
				confirmButtonText: 'OK',
				customClass: {
					confirmButton: 'btn-custom',
				},
			});
		}, 3000);
	};

	return (
		<div
			className='flex justify-center items-center border-4 border-white bg-resaltar hover:bg-decorativo p-2 rounded-full hover:duration-1000 cursor-pointer transform hover:-translate-y-1 hover:shadow-md'
			onClick={() => donwloadMasterPlan()}>
			<a href='https://drive.usercontent.google.com/download?id=1yh9nD2adkEAHTKNgIwxFAvHt065RLqep&export=download'>
				<button
					className='flex rounded-full transition duration-300 overflow-hidden'
					style={{
						width: '30px',
						height: '30px',
					}}
					aria-label='Chat en WhatsApp'>
					<svg
						viewBox='0 0 24 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
						<g
							id='SVGRepo_tracerCarrier'
							strokeLinecap='round'
							strokeLinejoin='round'></g>
						<g id='SVGRepo_iconCarrier'>
							{' '}
							<path
								d='M5.25589 16C3.8899 15.0291 3 13.4422 3 11.6493C3 9.20008 4.8 6.9375 7.5 6.5C8.34694 4.48637 10.3514 3 12.6893 3C15.684 3 18.1317 5.32251 18.3 8.25C19.8893 8.94488 21 10.6503 21 12.4969C21 14.0582 20.206 15.4339 19 16.2417M12 21V11M12 21L9 18M12 21L15 18'
								stroke='#ffffff'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'></path>{' '}
						</g>
					</svg>
				</button>
			</a>

			<div className='flex justify-center items-center mr-2 ml-2 text-white'>
				<span className='text-xl'>Descargá el Master Plan</span>
			</div>
		</div>
	);
};

export default MasterPlanButton;
