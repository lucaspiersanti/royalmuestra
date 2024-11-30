import HeaderBasico from "../components/HeaderBasico";

const PoliticasPrivacidadPage = () => {
  return (
    <>
      <HeaderBasico></HeaderBasico>
      <section className="body-font h-[90%] w-full bg-clip-padding backdrop-filter backdrop-blur bg-opacity-20 backdrop-saturate-50 backdrop-contrast-150">
        <div className="container px-5 py-24 mx-auto ">
          <div className="flex flex-col text-center w-full mb-20 ">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 font-medium text-white m-50">
              Políticas de Privacidad
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-white text-justify">
              En estricto cumplimiento de la Ley 25.326 de Protección de Datos
              Personales, la información proporcionada será tratada con la más
              absoluta confidencialidad y seguridad. Sus datos serán utilizados
              exclusivamente con el fin de mantenerlo/a informado/a sobre el
              avance del proyecto en el que está involucrado/a y para brindarle
              asesoramiento personalizado. <br></br> <br></br> En nuestro
              compromiso por resguardar su privacidad, garantizamos que sus
              datos serán tratados con la debida diligencia y conforme a las
              normativas legales vigentes. Apreciamos la confianza que ha
              depositado en nosotros y nos comprometemos a utilizar la
              información de manera responsable y únicamente con los fines
              mencionados.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default PoliticasPrivacidadPage;
