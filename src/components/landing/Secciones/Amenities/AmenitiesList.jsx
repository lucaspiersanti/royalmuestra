import Slider from "react-slick";
import AmenitiesItem from "./AmenitiesItem";
import amenitiesData from "../../../constantes/AmenitiesData";

const AmenitiesList = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true, // Centra los elementos del carrusel
    centerPadding: "10px",
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="mx-auto">
      <Slider {...settings}>
        {amenitiesData.map((amenity, index) => (
          <AmenitiesItem key={index} icon={amenity.icon} label={amenity.label} />
        ))}
      </Slider>
    </div>
  );
};

export default AmenitiesList;
