
const Precios = () => {
  return (
    <section className="text-gray-200 body-font overflow-hidden bg-gray-900">
    <div className="container px-1 py-24 mx-auto">
      <div className="flex flex-col text-center w-full mb-20">
        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">Precios</h1>
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-200">Explora las opciones de inversión: precios de terrenos en nuestro exclusivo barrio.</p>
      </div>
      <div className="xl:flex xl:flex-nowrap -m-4">
        <div className="p-4 xl:w-[40%] md:w-full w-full">
          <div className="h-full p-6 rounded-lg border-2 border-yellow-600 flex flex-col relative overflow-hidden">
          <span className="bg-yellow-600 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">OPORTUNIDAD</span>
            <h2 className="text-sm tracking-widest title-font mt-4 mb-3 font-medium">ETAPA 0</h2>
            <h1 className="text-5xl text-gray-200 pb-4 mb-1  leading-none">U$D 50.000</h1>
            <p className="flex items-center text-gray-100 mb-4 pb-4 border-b border-gray-200">
              <span className="w-4 h-4  mr-2 inline-flex items-center justify-center bg-yellow-600 text-white rounded-full flex-shrink-0">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </span>Bonificaciones por pago al contado.
            </p>
            {/* <h2 className="text-sm tracking-widest title-font mb-4 font-medium ">Pago en efectivo 20% de descuento.</h2> */}
           
            <p className="flex items-center text-gray-200 mt-2 mb-2">
              <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-600 text-white rounded-full flex-shrink-0">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </span>Pago inicial del 30% (U$D 15.000)
            </p>
            <p className="flex items-center text-gray-200 mb-2">
              <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-600 text-white rounded-full flex-shrink-0">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </span>24 cuotas sin interés de U$D 1.458,33
            </p>
            <p className="flex items-center text-gray-200 mb-2">
              <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-600 text-white rounded-full flex-shrink-0">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </span>Consulte por otros planes de pago.
            </p>
            <p className="flex items-center text-gray-100 mt-4 pt-4 border-t border-gray-200">
              <span className="w-4 h-4  mr-2 inline-flex items-center justify-center bg-yellow-600 text-white rounded-full flex-shrink-0">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </span>Primera entrega: Diciembre 2024.
            </p>
          </div>
        </div>
        <div className="p-4 xl:w-[20%] md:w-full w-full  ">
          <div className="h-full justify-center p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
            <span className="bg-gray-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">DIMENSIONES</span>
            <p className="text-md flex items-center mt-4 text-gray-100 pb-4">
              <span className="w-4 h-4  mr-2 inline-flex items-center justify-center bg-gray-600 text-white rounded-full flex-shrink-0">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </span>Lotes desde.
            </p>
            {/* <h2 className="text-sm tracking-widest title-font mb-1 font-medium"></h2> */}
            <h1 className="text-5xl text-white leading-none flex items-center pb-4 mb-4 border-b border-gray-400">
              <span>1.000 </span>
              <span className="text-lg ml-4 font-normal text-gray-300"> m<sup>2</sup></span>
            </h1>
            {/* <p className="text-md flex items-center text-gray-100 pb-4">
              <span className="w-4 h-4  mr-2 inline-flex items-center justify-center bg-gray-600 text-white rounded-full flex-shrink-0">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </span>Lotes hasta.
            </p>        
            <h1 className="text-5xl text-white leading-none flex  items-center pb-4 mb-4 border-b border-gray-400">
              <span>1.600 </span>
              <span className="text-lg ml-4 font-normal text-gray-300"> m<sup>2</sup></span>
            </h1> */}
           </div>
        </div>  
        <div className="p-4 xl:w-[40%] md:w-full w-full ">
          <div className="h-full p-6 justify-center rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden">
            <span className="bg-indigo-500 text-white mb-4 px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">OPCIONES</span>
            <h2 className="text-sm tracking-widest title-font mb-4 mt-4 font-medium">LOTES POR CATEGORIAS</h2>
            
            <p className="text-2xl flex items-center text-gray-100 mb-4 pb-4 border-b border-gray-700 mt-6 ">
              <span className="w-4 h-4  mr-2 inline-flex items-center justify-center bg-indigo-600 text-white rounded-full flex-shrink-0">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </span>Con vista Verde.
            </p>
            <p className="text-2xl flex items-center text-gray-100 mb-4 pb-4 border-b border-gray-700">
              <span className="w-4 h-4  mr-2 inline-flex items-center justify-center bg-indigo-600 text-white rounded-full flex-shrink-0">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </span>Con vista a Avenida.
            </p>
 
            <p className="text-2xl flex items-center text-gray-100 mb-4 pb-4 border-b border-gray-700">
              <span className="w-4 h-4  mr-2 inline-flex items-center justify-center bg-indigo-600 text-white rounded-full flex-shrink-0">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </span>Con vista Verde y Avenidas.
            </p>
            <p className="text-2xl flex items-center text-gray-100 mb-4 pb-4 border-b border-gray-700">
              <span className="w-4 h-4  mr-2 inline-flex items-center justify-center bg-indigo-600 text-white rounded-full flex-shrink-0">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </span>Con vista al Lago.
            </p>
           </div>
        </div>     
      </div>
    </div>
  </section>
  );
};


export default Precios;
