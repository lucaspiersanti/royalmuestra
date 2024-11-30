export const GrupoDesarrollador = () => {
	return (
		<section className='text-Royal body-font bg-slate-200'>
			<div className='container px-5 py-4 mx-auto '>
				<div className='text-center mb-20'>
					<h1 className='sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4'>
						GRUPO DESARROLLADOR
					</h1>
				</div>
				<div className='flex lg:w-full sm:mx-auto sm:mb-2 gap-4 flex-wrap justify-center'>
					<div
						className='rounded-full shadow-lg flex items-center justify-center overflow-hidden p-2 bg-white'
						style={{
							width: '150px',
							height: '150px',
						}}>
						<img
							loading='lazy'
							src='./GrupoDesarrollo_Logos/Fideicomiso_Loanjo.png'
							className='w-1/8 h-1/8 object-cover'
							alt='Logo'
						/>
					</div>
					<div
						className='rounded-full shadow-lg flex items-center bg-royal justify-center overflow-hidden p-2'
						style={{
							width: '150px',
							height: '150px',
						}}>
						<img
							loading='lazy'
							src='./GrupoDesarrollo_Logos/Vengoni_Hnos.png'
							className='w-1/8 h-1/8 object-contain'
							alt='Logo'
						/>
					</div>
					<div
						className='rounded-full flex items-center justify-center overflow-hidden shadow-[8px_8px_16px_rgba(0,0,0,0.25)] pointer-events-none p-2 bg-white'
						style={{
							width: '150px',
							height: '150px',
						}}>
						<img
							loading='lazy'
							src='./GrupoDesarrollo_Logos/Menber_Arquitectos.png'
							className='w-1/8 h-1/8 object-cover'
							alt='Logo'
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default GrupoDesarrollador;
