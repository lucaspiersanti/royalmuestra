import { useState, useEffect } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Navbar = () => {
	const [nav, setNav] = useState(false);
	const [color, setColor] = useState('#ffffff');

	const handleNav = () => {
		setNav(!nav);
	};

	useEffect(() => {
		const changeColor = () => {
			if (window.scrollY >= 90) {
				setColor('#ffffff');
			} else {
				setColor('#ffffff');
			}
		};
		window.addEventListener('scroll', changeColor);
	}, []);

	return (
		<div
			style={{ backgroundColor: `${color}` }}
			className='fixed left-0 top-0 w-full z-50 ease-in h-16 text- mx-auto opacity-90'>
			<div className='max-w-[1240px] m-auto mb-4 mt-2 md:mb-0 xs:landscapes:mb-0 sm:landscapes:mb-0 flex flex-wrap items-center justify-center'>
				<ul className='hidden sm:flex text-Royal'>
					<li className='px-4 p-2 hover-effect'>
						<a href='#'>Inicio</a>
					</li>
					<li className='px-4 pt-2 hover-effect'>
						<a href='/#Amenities'>Amenities</a>
					</li>
					{/* <li className='px-4 pt-2 hover-effect'>
						<a href='/#Gallery'>Galería</a>
					</li> */}
					<li className='px-4 pt-2 hover-effect'>
						<a href='/#MasterPlan'>Masterplan</a>
					</li>
					<li className='px-4 pt-2 hover-effect'>
						<a href='/#Contacto'>Contacto</a>
					</li>
					<li className='px-4 pt-2 hover-effect'>
						<Link to='/Login'>Administración</Link>
					</li>
				</ul>

				{/* Mobile Button */}
				<div
					onClick={handleNav}
					className='block sm:hidden mt-2 z-10 items-center justify-center text-Royal'>
					{nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
				</div>
				{/* Mobile Menu */}
				<div
					className={
						nav
							? 'text-Royal sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-white text-center ease-in duration-300'
							: 'text-Royal sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-white text-center ease-in duration-300'
					}>
					<ul>
						<li
							onClick={handleNav}
							className='p-4 text-4xl hover:text-gray-500 hover-effect'>
							<a href='#'>Inicio</a>
						</li>
						<li
							onClick={handleNav}
							className='p-4 text-4xl hover:text-gray-500 hover-effect'>
							<a href='/#MasterPlan'>Masterplan</a>
						</li>
						<li
							onClick={handleNav}
							className='p-4 text-4xl hover:text-gray-500 hover-effect'>
							<a href='/#Gallery'>Galería</a>
						</li>
						<li
							onClick={handleNav}
							className='p-4 text-4xl hover:text-gray-500 hover-effect'>
							<a href='/#Contacto'>Contacto</a>
						</li>
						<li className='p-4 text-4xl hover:text-gray-500 hover-effect'>
							<Link to='/Login'>Administración</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
