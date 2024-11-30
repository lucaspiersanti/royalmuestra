import MasterPlanButton from "../../shared/MasterPlanButton";
import Textos from "../../constantes/Textos";

const MasterPlan = () => {
  return (
    <section
      id="MasterPlan"
      className="flex flex-col items-center bg-white opacity-90 w-full text-Royal"
    >
      {/* Contenedor de las dos columnas superiores */}
      <div className="z-[12] flex lg:flex-row flex-col items-center px-1 py-1 w-full">
        {/* Columna 1: Logo */}
        <div className="flex flex-col lg:mb-0 w-full md:w-[25%] lg:w-[25%] xl:w-[25%] text-center md:text-left">
          <img
            src="./favicon.ico"
            alt="Logo de la empresa"
            className="mx-auto mb-2 w-50 h-50"
          />
        </div>

        {/* Columna 2: Título y Subtítulo */}
        <div className="z-12 flex flex-col mb-4 lg:mb-0 pl-10 w-full md:w-[35%] lg:w-[35%] xl:w-[35%]">
          <h1 className="mb-4 font-bold text-4xl text-Royal">
            {Textos.masterPlan.titulo}
          </h1>
          <p className='text-resaltar text-xl'>
            {Textos.masterPlan.subTitulo}
          </p>
          <hr className="border-Royal-resaltar mt-4 mb-6 border-t-8 w-16" />
        </div>

        {/* Columna 3: Botón */}
        <div className="flex flex-col w-full md:w-[40%] lg:w-[40%] xl:w-[40%]">
          <MasterPlanButton />
        </div>
      </div>
    </section>
  );
};

export default MasterPlan;
