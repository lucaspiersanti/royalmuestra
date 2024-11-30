/**
 * -------------------
 * OPCION 1
 * -------------------
 * */

// import { useRef, useEffect } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, EffectFade } from 'swiper/modules';
// import Textos from '../../constantes/Textos';

// // Importa los estilos de Swiper
// import 'swiper/css';
// import 'swiper/css/autoplay';
// import 'swiper/css/effect-fade';
// import WhatsAppButton_2 from '../../shared/WhatsAppButton_2';

// const images = [
// 	'./nuevas/04.webp',
// 	'./nuevas/31.webp',
// 	'./nuevas/33.webp',
// 	'./nuevas/34.webp',
// ];

// const HeroComponent = () => {
// 	const swiperRef = useRef(null);

// 	useEffect(() => {
// 		const swiper = swiperRef.current;
// 		if (swiper) {
// 			const slideChangeHandler = () => {
// 				const activeSlide = swiper.slides[swiper.activeIndex];
// 				if (activeSlide) {
// 					activeSlide.querySelector('img').style.transform = 'scale(1.1)';
// 					activeSlide.querySelector('img').style.transition =
// 						'transform 10s ease-in-out';
// 				}

// 				// Restablecer el zoom en otras imágenes
// 				swiper.slides.forEach((slide, index) => {
// 					if (index !== swiper.activeIndex) {
// 						slide.querySelector('img').style.transform = 'scale(1)';
// 					}
// 				});
// 			};

// 			// Configura el zoom en el slide inicial y los cambios posteriores
// 			slideChangeHandler();
// 			swiper.on('slideChangeTransitionStart', slideChangeHandler);

// 			return () => {
// 				swiper.off('slideChangeTransitionStart', slideChangeHandler);
// 			};
// 		}
// 	}, []);

// 	return (
// 		<div className='h-screen w-full relative overflow-hidden -z-10'>
// 			<Swiper
// 				modules={[Autoplay, EffectFade]}
// 				effect='fade' // Cambia al efecto de desvanecimiento
// 				autoplay={{
// 					delay: 0, // Acorde con el zoom
// 					disableOnInteraction: false,
// 				}}
// 				loop={true}
// 				speed={15000} // Duración de la transición entre imágenes
// 				onSwiper={(swiper) => (swiperRef.current = swiper)}
// 				className='absolute inset-0 w-full h-full'>
// 				{images.map((image, index) => (
// 					<SwiperSlide key={index}>
// 						<div className='w-full h-full overflow-hidden'>
// 							<img
// 								src={image}
// 								alt={`Fondo ${index + 1}`}
// 								className='w-full h-full object-cover transform transition-transform ease-in-out'
// 							/>
// 						</div>
// 					</SwiperSlide>
// 				))}
// 			</Swiper>

// 			{/* Forma blanca diagonal con logo y textos */}
// 			<div
// 				className='absolute top-0 left-0 h-full w-full bg-white opacity-90 flex items-center z-20'
// 				style={{
// 					clipPath: 'polygon(0 0, 29% 0, 45% 100%, 0% 100%)',
// 				}}>
// 				<div className='px-6 md:px-12 lg:px-20 max-w-lg text-center'>
// 					{/* Logo */}
// 					<img
// 						src='./favicon.ico'
// 						alt='Logo de la empresa'
// 						className='w-60 h-60 mx-auto mb-6'
// 					/>
// 					{/* Título */}
// 					<h1 className='text-6xl md:text-4xl font-bold mb-2 text-Royal'>
// 						{Textos.hero.heading}
// 					</h1>
// 					{/* Frase */}
// 					<h2 className='text-lg md:text-xl font-medium text-resaltar'>
// 						{Textos.hero.message}
// 					</h2>
// 					<div className='text-center mt-2'>
// 						<WhatsAppButton_2></WhatsAppButton_2>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default HeroComponent;

/**
 * -------------------
 * OPCION 2
 * -------------------
 * */

// import { useRef, useEffect } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, EffectFade } from 'swiper/modules';

// // Importa los estilos de Swiper
// import 'swiper/css';
// import 'swiper/css/autoplay';
// import 'swiper/css/effect-fade';

// import Textos from '../../constantes/Textos';
// import WhatsAppButton_2 from '../../shared/WhatsAppButton_2';

// const images = [
// 	'./nuevas/04.webp',
// 	'./nuevas/31.webp',
// 	'./nuevas/33.webp',
// 	'./nuevas/34.webp',
// ];

// const HeroComponent = () => {
// 	const swiperRef = useRef(null);

// 	useEffect(() => {
// 		const swiper = swiperRef.current;
// 		if (swiper) {
// 			const slideChangeHandler = () => {
// 				const activeSlide = swiper.slides[swiper.activeIndex];
// 				if (activeSlide) {
// 					activeSlide.querySelector('img').style.transform = 'scale(1.1)';
// 					activeSlide.querySelector('img').style.transition =
// 						'transform 10s ease-in-out';
// 				}

// 				// Restablecer el zoom en otras imágenes
// 				swiper.slides.forEach((slide, index) => {
// 					if (index !== swiper.activeIndex) {
// 						slide.querySelector('img').style.transform = 'scale(1)';
// 					}
// 				});
// 			};

// 			slideChangeHandler();
// 			swiper.on('slideChangeTransitionStart', slideChangeHandler);

// 			return () => {
// 				swiper.off('slideChangeTransitionStart', slideChangeHandler);
// 			};
// 		}
// 	}, []);

// 	return (
// 		<div className='h-screen w-full flex flex-col'>
// 			{/* Swiper en la parte superior */}
// 			<div className='h-full w-full'>
// 				<Swiper
// 					modules={[Autoplay, EffectFade]}
// 					effect='fade'
// 					autoplay={{
// 						delay: 0,
// 						disableOnInteraction: false,
// 					}}
// 					loop={true}
// 					speed={15000}
// 					onSwiper={(swiper) => (swiperRef.current = swiper)}
// 					className='w-full h-full'>
// 					{images.map((image, index) => (
// 						<SwiperSlide key={index}>
// 							<img
// 								src={image}
// 								alt={`Fondo ${index + 1}`}
// 								className='w-full h-full object-cover transform transition-transform ease-in-out'
// 							/>
// 						</SwiperSlide>
// 					))}
// 				</Swiper>
// 			</div>

// 			{/* <div className='absolute top-1/2 left-0 w-full h-1/4 bg-white bg-opacity-50 '></div> */}
// 			{/* Div blanco en la parte inferior */}
// 			{/*  */}
// 			<div className='absolute top-1/2 left-0 w-full h-1/4 bg-white bg-opacity-50 z-10'>
// 				<div className='text-center px-6 md:px-12 lg:px-20'>
// 					{/* Logo */}
// 					<img
// 						src='./favicon.ico'
// 						alt='Logo de la empresa'
// 						className='w-20 h-20 mx-auto mb-4'
// 					/>
// 					{/* Título */}
// 					<h1 className='text-2xl md:text-4xl font-bold mb-2 text-Royal'>
// 						{Textos.hero.heading}
// 					</h1>
// 					{/* Frase */}
// 					<h2 className='text-md md:text-lg font-medium text-resaltar mb-4'>
// 						{Textos.hero.message}
// 					</h2>
// 					{/* Botón de WhatsApp */}
// 					<WhatsAppButton_2 />
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default HeroComponent;

import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

// Importa los estilos de Swiper
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

import Textos from '../../constantes/Textos';
import WhatsAppButton_2 from '../../shared/WhatsAppButton_2';

const images = [
	'./nuevas/04.webp',
	'./nuevas/31.webp',
	'./nuevas/33.webp',
	'./nuevas/34.webp',
];

const HeroComponent = () => {
	const swiperRef = useRef(null);

	useEffect(() => {
		const swiper = swiperRef.current;
		if (swiper) {
			const slideChangeHandler = () => {
				const activeSlide = swiper.slides[swiper.activeIndex];
				if (activeSlide) {
					activeSlide.querySelector('img').style.transform = 'scale(1.1)';
					activeSlide.querySelector('img').style.transition =
						'transform 10s ease-in-out';
				}

				// Restablecer el zoom en otras imágenes
				swiper.slides.forEach((slide, index) => {
					if (index !== swiper.activeIndex) {
						slide.querySelector('img').style.transform = 'scale(1)';
					}
				});
			};

			slideChangeHandler();
			swiper.on('slideChangeTransitionStart', slideChangeHandler);

			return () => {
				swiper.off('slideChangeTransitionStart', slideChangeHandler);
			};
		}
	}, []);

	return (
		<div className='h-screen w-full flex flex-col'>
			{/* Swiper en la parte superior */}
			<div className='h-full w-full'>
				<Swiper
					modules={[Autoplay, EffectFade]}
					effect='fade'
					autoplay={{
						delay: 0,
						disableOnInteraction: false,
					}}
					loop={true}
					speed={15000}
					onSwiper={(swiper) => (swiperRef.current = swiper)}
					className='w-full h-full'>
					{images.map((image, index) => (
						<SwiperSlide key={index}>
							<img
								src={image}
								alt={`Fondo ${index + 1}`}
								className='w-full h-full object-cover transform transition-transform ease-in-out'
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>

			{/* Div blanco en la parte inferior con tres columnas */}
			<div className='absolute top-1/2 left-0 w-full h-[50%] bg-white bg-opacity-50 z-10 md:h-[30%]'>
				<div className='grid grid-cols-1 md:grid-cols-3 items-center justify-center px-6 md:px-12 lg:px-20 h-full'>
					{/* Logo - primera columna */}
					<div className='flex items-center justify-center md:justify-start'>
						<img
							src='./favicon.ico'
							alt='Logo de la empresa'
							className='w-36 h-36 md:w-48 md:h-48 mx-auto mb-4'
						/>
					</div>

					{/* Título y frase - segunda columna */}
					<div className='flex flex-col items-center justify-center'>
						<h1 className='text-2xl md:text-4xl font-bold mb-2 text-Royal text-center'>
							{Textos.hero.heading}
						</h1>
						<h2
							className='text-md md:text-lg font-medium text-resaltar mb-4 text-center'
							style={{ textShadow: '3px 5px 19px rgba(255,255,255,255)' }}>
							{Textos.hero.message}
						</h2>
					</div>

					{/* Botón de contacto - tercera columna */}
					<div className='flex justify-center md:justify-end'>
						<WhatsAppButton_2 className='scale-90' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeroComponent;
