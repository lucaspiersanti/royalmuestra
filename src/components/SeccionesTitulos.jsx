import PropTypes from "prop-types";

const SeccionesTitulos = ({ titulo, subTitulo }) => {
  return (

    <div id="Introduccion"
      className="text-gray-600 body-font mt-4 mb-4 w-full h-full">
      <div className="mx-auto flex px-5 py-1 md:flex-row flex-col items-center justify-center w-full h-full ">
        <div className="h-full lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:text-left items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
            {titulo}
            <br className="hidden lg:inline-block" />
          </h1>
          <p className="mb-8 leading-relaxed text-white text-justify justify-center items-center text-center">
            {subTitulo}
          </p>
        </div>
        </div>
      </div>

  );
};

SeccionesTitulos.propTypes = {
  titulo: PropTypes.string.isRequired,
  subTitulo: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default SeccionesTitulos;
