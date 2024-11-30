import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<>
			<div className='mb-2 leading-relaxed mt-8 flex justify-center items-center'>
				<div className='flex justify-center items-center'></div>
				<div className=' flex flex-row justify-center items-center'>
					<a className='flex title-font font-medium items-center md:justify-start justify-center '>
						<img loading='lazy' className='w-10 h-10' src='./Azul.webp' />
						<span className='ml-3 text-xl'>Royal Village</span>
					</a>
					{/* Facebook */}
					<a
						href='https://www.facebook.com/profile.php?id=61553599931728'
						target='_blank'
						rel='noreferrer'
						className='flex sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 '>
						<svg
							fill='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							className='w-5 h-5'
							viewBox='0 0 24 24'>
							<path d='M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z'></path>
						</svg>
					</a>
					{/* Instagram */}
					<a
						href='https://instagram.com/barrio.royalvillage?igshid=MzRlODBiNWFlZA=='
						className=' sm:ml-4 sm:pl-4 sm:py-2 sm:mt-0'
						target='_blank'
						rel='noreferrer'>
						<svg
							fill='none'
							stroke='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							className='w-5 h-5'
							viewBox='0 0 24 24'>
							<rect width='20' height='20' x='2' y='2' rx='5' ry='5'></rect>
							<path d='M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01'></path>
						</svg>
					</a>
				</div>
			</div>
			<div className=' flex flex-row justify-center items-center mb-2'>
				<Link
					className='flex  items-center md:justify-start justify-center text-Royal-400 ml-3 text-xs hover:line-clamp-2'
					to='/politicasPrivacidad'>
					Políticas de privacidad
				</Link>
			</div>
		</>
	);
};

export default Footer;
