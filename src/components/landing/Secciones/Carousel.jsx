import { Swiper, SwiperSlide } from "swiper/react";
import img1 from "/imagenes/carousel/img1.jpg";
import img2 from "/imagenes/carousel/img2.jpg";
import img3 from "/imagenes/carousel/img3.jpg";
// import img4 from "/imagenes/carousel/img4.jpg";
import img5 from "/imagenes/carousel/img5.jpg";
import img7 from "/imagenes/carousel/img7.jpg";
import img8 from "/imagenes/carousel/img8.jpg";
//import img9 from "/imagenes/carousel/img9.jpg";
import img10 from "/imagenes/carousel/img10.jpg";
import img11 from "/imagenes/carousel/img11.jpg";
// import img12 from "/imagenes/carousel/img12.jpg";
// import img13 from "/imagenes/carousel/img13.jpg";
// import img14 from "/imagenes/carousel/img14.jpg";
// import img15 from "/imagenes/carousel/img15.jpg";
// import img16 from "/imagenes/carousel/img16.jpg";
// import img17 from "/imagenes/carousel/img17.jpg";
// import img18 from "/imagenes/carousel/img18.jpg";
// import img19 from "/imagenes/carousel/img19.jpeg";
// import img20 from "/imagenes/carousel/img20.jpeg";

import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

function Carousel() {
  const images = [img1, img2, img3, img5, img7, img8, img10, img11];

  return (
    <>
      <Swiper
        modules={[EffectCoverflow, Navigation, Autoplay]}
        effect={"coverflow"}
        navigation={{
          clickable: true,
        }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        centeredSlides={true}
        slidesPerView={"auto"}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        className="w-full mt-4">
        {images.map((slideContent, index) => (
          <SwiperSlide
            className="bg-cover bg-center h-4/5 w-3/5 "
            key={index}
            loading="lazy">
            <img className="block w-full shadow-2xl" src={slideContent} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default Carousel;
