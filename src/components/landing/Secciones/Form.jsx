import { useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';

//Iconos

const Form = () => {
	const [nombre, setNombre] = useState('');
	const [apellido, setApellido] = useState('');
	const [email, setEmail] = useState('');
	const [codigoArea, setCodigoArea] = useState('');
	const [telefono, setTelefono] = useState('');
	const [mensaje, setMensaje] = useState(
		'Deseo ser contactado, estoy interesado en la propuesta',
	);

	const [nombreObligatorioError, setNombreObligatorioError] = useState('');
	const [apellidoObligatorioError, setApellidoObligatorioError] = useState('');
	const [codigoAreaError, setCodigoAreaError] = useState('');
	const [telefonoError, setTelefonoError] = useState('');
	const [telefonoObligatorioError, setTelefonoObligatorioError] = useState('');
	const [inputValue, setInputValue] = useState('');
	const [emailError, setEmailError] = useState('');

	const preFijoTelefono = '549';

	const resetFormulario = () => {
		setNombre('');
		setApellido('');
		setCodigoArea('');
		setTelefono('');
		setEmail('');

		//Limpiando errores
		setNombreObligatorioError('');
		setApellidoObligatorioError('');
		setCodigoAreaError('');
		setTelefonoError('');
		setTelefonoObligatorioError('');
		setInputValue('');
		setEmailError('');
	};

	const armarTelefono = () => {
		let codigoAreaSinCero = codigoArea;
		let telefonoSin15 = telefono;

		if (codigoArea !== '' && telefono !== '') {
			if (
				codigoArea.charAt(0) === '0' ||
				(telefono.charAt(0) === '1' && telefono.charAt(1) === '5')
			) {
				if (codigoArea.charAt(0) === '0') {
					codigoAreaSinCero = codigoArea.substring(1);
				}
				if (telefono.charAt(0) === '1' && telefono.charAt(1) === '5') {
					telefonoSin15 = telefono.substring(2);
				}
			}
			return `${preFijoTelefono}${codigoAreaSinCero}${telefonoSin15}`;
		}
	};

	const telefonoValidator = (inputValue, setInputValue) => {
		const numericPattern = /^[0-9]*$/;

		if (!numericPattern.test(inputValue)) {
			swal('Solo números', 'Verifique el número de teléfono', 'info');
			setInputValue('');
		}
		setCodigoAreaError('');
		setTelefonoError('');
		if (codigoArea !== '' || telefono !== '') {
			if (codigoArea === '') {
				setCodigoAreaError('Debe completar el codigo de area');
			}
			if (telefono === '') {
				setTelefonoError('Debe completar el número de telefono');
			}
		}
	};

	const emailValidator = () => {
		if (email.length < 3 || !email.includes('') || !email.includes('@')) {
			setEmailError('Verifique el correo electrónico');
		} else {
			setEmailError('');
		}
	};

	const campoNombreObligatorio = () => {
		setNombreObligatorioError('');
	};

	const campoApellidoObligatorio = () => {
		setApellidoObligatorioError('');
	};

	const hamdleSubmit = async () => {
		const _telefono = armarTelefono();

		if (
			nombre === '' ||
			apellido === '' ||
			emailError !== '' ||
			email === '' ||
			_telefono === undefined
		) {
			if (nombre === '') {
				setNombreObligatorioError('Debe completar el nombre');
				swal('Favor de verificar', 'Debe completar el nombre', 'warning');
			}
			if (apellido === '') {
				setApellidoObligatorioError('Debe completar el apellido');
				swal('Favor de verificar', 'Debe completar el apellido', 'warning');
			}
			if (emailError !== '' || email === '') {
				setEmailError('Verifique el correo electrónico');
				swal(
					'Favor de verificar',
					'Debe completar el correo electrónico',
					'warning',
				);
			}
			if (_telefono === undefined) {
				setTelefonoObligatorioError('Debe completar el numero de telefono');
				swal(
					'Favor de verificar',
					'Debe completar el numero de telefono',
					'warning',
				);
			}
		} else {
			enviarFormulario(_telefono);
			resetFormulario();
		}
	};

	const enviarFormulario = (_telefono) => {
		const formularioCompleto = {
			form: 'rv_website/001',
			email,
			phone: '+' + _telefono,
			fullName: nombre + ' ' + apellido,
			moreData: {
				TipoDeInversion: 'Comprador',
				Mensaje: mensaje,
			},
		};
		console.log(formularioCompleto);

		fetch('https://fakestoreapi.com/products/categories')
			.then((res) => res.json())
			.then((json) => console.log(json));

		fetch('https://fakestoreapi.com/products', {
			method: 'POST',
			body: JSON.stringify({
				title: 'test product',
				price: 13.5,
				description: 'lorem ipsum set',
				image: 'https://i.pravatar.cc',
				category: 'electronic',
			}),
		})
			.then((res) => res.json())
			.then((json) => console.log('el Json del Post', json));

		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formularioCompleto),
		};
		console.log(options);

		fetch('https://leadpatron.com/bix/rest-api/public/prospect/', options)
			.then((response) => response.json())
			.then((response) => {
				console.log('Response - ', response);
				swal(
					'Consulta enviada con exito',
					'Un asesor lo contactará',
					'success',
				);
			})
			.catch((err) => console.error(err));

		return formularioCompleto;
	};

	return (
		<section id='Contacto' className='text-gray-600 body-font relative'>
			<div className='container py-3 flex flex-col lg:flex-row xl:flex-row'>
				<div
					className='bg-gray-300 rounded-lg overflow-hidden xs:flex-wrap sm:mr-10 sm:flex-wrap md:flex-wrap lg:flex-wrap lg:w-1/2
         flex items-end justify-center relative '>
					<iframe
						width='100%'
						height='100%'
						loading='lazy'
						className='justify-center w-full absolute inset-0 back'
						title='map'
						src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3266.355136513417!2d-58.496771816460864!3d-35.04785920266082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bd2ffc633776d1%3A0x890d8b51f8ee3c09!2sBarrio%20Royal%20Village!5e0!3m2!1ses!2sar!4v1691258214500!5m2!1ses!2sar'></iframe>

					<div className='opacity-0 relative flex xs:flex-wrap sm:flex-wrap  md:flex-wrap lg:flex-wrap py-6 rounded shadow-md'>
						<div className='xl:w-1/2 px-2 '>
							<h2 className='title-font font-semibold text-white-900 tracking-widest text-xs'>
								UBICACIÓN
							</h2>
							<p className='my-2'>
								Podrás encontrarnos en nuestras oficinas comerciales dentro del
								barrio, ubicado en ruta provincial 16, entre ruta 6 y 58 - San
								Vicente{' '}
							</p>
							<a
								target='_blank'
								href='https://earth.google.com/earth/d/125jDGICSy6Wsf_2dJc3C2PrXeB29xUnC?usp=sharing'
								rel='noreferrer'
								className='relative inline-block group'>
								Nuestro Barrio desde{' '}
								<span>
									<b>Google Earth</b>
								</span>
								<span className='absolute w-full h-0.5 bg-yellow-500 bottom-0 left-0 origin-left transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100'></span>
							</a>
						</div>
						<div className='xl:w-1/2 px-2  mt-4 lg:mt-0'>
							<h2 className='title-font font-semibold text-gray-900 tracking-widest text-xs'>
								HORARIOS
							</h2>
							<a className='text-yellow-500 leading-relaxed'>
								Lunes a Domingos de 09:00 a 18:00hs{' '}
							</a>
							<h2 className='title-font font-semibold text-gray-900 tracking-widest text-xs mt-4'>
								TELÉFONO
							</h2>
							<a
								href='https://wa.link/8zprj5'
								className='relative inline-block text-gray-500 hover:cursor-pointer group'>
								{' '}
								+54 9 11 5970-7620
								<span className='absolute inset-x-0 bottom-0 h-0.5 bg-yellow-500 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></span>
							</a>
						</div>
					</div>
				</div>
				{/* Formulario */}
				<div
					className=' sm:mr-1 px-2 xs:flex-wrap sm:flex-wrap md:flex-wrap md:py-8 lg:flex-wrap xl:w-1/2 
          flex flex-col md:ml-auto mt-1 rounded
          items-end justify-center relative h-full w-full
         bg-clip-padding backdrop-filter backdrop-blur bg-opacity-20 
         backdrop-saturate-50 backdrop-contrast-150 bg-white '>
					<h2 className='title-font font-semibold text-gray-900 text-md mb-1 w-full'>
						CONSULTANOS
					</h2>
					<p className='leading-relaxed mb-2 text-md text-black w-full'>
						Deberás completar los datos y un asesor se comunicará contigo
					</p>
					<div className='relative mb-3 flex flex-wrap flex-grow w-full'>
						<label
							htmlFor='nombre'
							className='w-1/2 text-lef leading-7 text-sm text-black'>
							Nombre
						</label>
						<label
							htmlFor='apellido'
							className='w-1/2 text-lef leading-7 text-sm text-black mb-1'>
							Apellido
						</label>
						<input
							value={nombre}
							onChange={(ev) => setNombre(ev.target.value)}
							onBlur={() => campoNombreObligatorio()}
							placeholder='Juan Jose'
							type='text'
							id='nombre'
							name='nombre'
							className='w-1/2 bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-2  leading-8 transition-colors duration-200 ease-in-out'
						/>

						<input
							value={apellido}
							onChange={(ev) => setApellido(ev.target.value)}
							onBlur={() => campoApellidoObligatorio()}
							placeholder='Gonzalez'
							type='text'
							id='apellido'
							name='apellido'
							className='w-1/2 bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-2  leading-8 transition-colors duration-200 ease-in-out'
						/>
						<p className='text-white bg-red-600'>{nombreObligatorioError}</p>
						<p className='text-white bg-red-600'>{apellidoObligatorioError}</p>
					</div>
					<div className='relative mb-4 flex flex-wrap flex-grow w-full'>
						<label
							htmlFor='codigo-area'
							className='w-1/4 text-lef leading-7 text-sm text-black mb-2'>
							Cod. área{' '}
						</label>
						<label
							htmlFor='telefono'
							className='w-1/4 text-lef leading-7 text-sm text-black mb-2'>
							{' '}
							Celular{' '}
						</label>
						<label
							htmlFor='email'
							className='w-2/4 text-lef leading-7 text-sm text-black mb-2'>
							{' '}
							Email{' '}
						</label>
						<input
							onBlur={() => {
								telefonoValidator(codigoArea, setCodigoArea);
							}}
							value={codigoArea}
							onChange={(ev) => setCodigoArea(ev.target.value)}
							placeholder='11'
							maxLength={5}
							pattern='[0-9]*'
							type='text'
							id='codigo-area'
							name='codigo-area'
							className='w-1/4 bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-2  leading-8 transition-colors duration-200 ease-in-out'
						/>

						<input
							onBlur={() => {
								telefonoValidator(telefono, setTelefono);
							}}
							value={telefono}
							onChange={(ev) => setTelefono(ev.target.value)}
							placeholder='5365544'
							maxLength={8}
							pattern='[0-9]*'
							type='text'
							id='telefono'
							name='telefono'
							className='w-1/4 bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-2  leading-8 transition-colors duration-200 ease-in-out'
						/>

						<input
							onBlur={() => {
								emailValidator();
							}}
							value={email}
							onChange={(ev) => setEmail(ev.target.value)}
							placeholder='micorreo@email.com'
							type='email'
							id='email'
							name='email'
							className='w-1/2 bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-2  leading-8 transition-colors duration-200 ease-in-out'
						/>
						<p className='text-white bg-red-600'>{codigoAreaError}</p>
						<p className='text-white bg-red-600'>{telefonoError}</p>
						<p className='text-white bg-red-600'>{inputValue}</p>
						<p className='text-white bg-red-600'>{emailError}</p>
					</div>

					<div className='relative mb-2 flex flex-wrap flex-grow w-full'>
						<label
							htmlFor='mensaje'
							className='leading-7 text-sm text-black mb-2'>
							Mensaje
						</label>
						<textarea
							value={mensaje}
							onChange={(ev) => setMensaje(ev.target.value)}
							id='mensaje'
							name='mensaje'
							className='w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 h-20 text-base outline-none text-gray-700 py-1 px-2  resize-none leading-6 transition-colors duration-200 ease-in-out'></textarea>
					</div>
					<button
						onClick={() => hamdleSubmit()}
						className='mb-2 text-white bg-resaltar border-0 py-1 px-2 focus:outline-none hover:bg-decorativo  rounded text-lg
               hover:border-black transition duration-1000 ease-in-out transform hover:-translate-y-1 hover:shadow-md
             '>
						Enviar consulta
					</button>
				</div>
			</div>

			<div className='container py-3 flex bg-white rounded shadow-md'>
				<div className='xl:w-1/2 px-2 '>
					<h2 className='title-font font-semibold text-white-900 tracking-widest text-xs'>
						UBICACIÓN
					</h2>
					<p className='my-2'>
						Podrás encontrarnos en nuestras oficinas comerciales dentro del
						barrio, ubicado en ruta provincial 16, entre ruta 6 y 58 - San
						Vicente{' '}
					</p>
					<a
						target='_blank'
						href='https://earth.google.com/earth/d/125jDGICSy6Wsf_2dJc3C2PrXeB29xUnC?usp=sharing'
						rel='noreferrer'
						className='relative inline-block group hover-effect'>
						Nuestro Barrio desde{' '}
						<span>
							<b>Google Earth</b>
						</span>
					</a>
				</div>
				<div className='xl:w-1/4 px-2 '>
					<h2 className='title-font font-semibold text-gray-900 tracking-widest text-xs'>
						HORARIOS
					</h2>
					<a className='text-Royal leading-relaxed'>
						Lunes a Domingos de 09:00 a 18:00hs{' '}
					</a>
				</div>
				<div className='xl:w-1/4 px-2'>
					<h2 className='title-font font-semibold text-Royal tracking-widest text-xs '>
						VENTAS
					</h2>
					<a
						href='https://wa.link/oulenr'
						className='relative inline-block text-Royal hover:cursor-pointer group hover-effect'
						target='_blank'
						rel='noreferrer'>
						{' '}
						+54 9 11 7232-4866
					</a>

					<h2 className='title-font font-semibold text-Royal tracking-widest text-xs mt-3'>
						INFORMACIÓN
					</h2>
					<a
						href='https://wa.link/q2ooha'
						className='relative inline-block text-Royal hover:cursor-pointer group hover-effect'
						target='_blank'
						rel='noreferrer'>
						{' '}
						+54 9 11 2514-1494
					</a>
				</div>
			</div>
		</section>
	);
};

export default Form;
