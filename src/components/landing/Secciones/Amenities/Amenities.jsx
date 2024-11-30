import AmenitiesList from "./AmenitiesList";
import Texto from "../../../constantes/Textos"
const Amenities = () => {
  return (
    <section
      id="Amenities"
      className="bg-clip-padding bg-white bg-opacity-80 backdrop-blur backdrop-filter text-Royal"
    >
      <div className="gap-8 md:p-12 pb-6">
        <div className="flex flex-col mb-8 w-full">
          <h1 className="font-bold text-4xl text-Royal">
          {Texto.amenities.titulo}
          <br></br>
          <span className='text-resaltar'>{Texto.amenities.titulo_2}</span>
          </h1>
          <hr className='border-Royal-resaltar mt-4 mb-6 border-t-4 w-16' />
        </div>
        <AmenitiesList />
      </div>
    </section>
  );
};

export default Amenities;
