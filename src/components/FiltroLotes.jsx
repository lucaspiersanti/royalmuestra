import { useState } from "react";
import swal from "sweetalert";
import Swal from 'sweetalert2';

const FiltroLotes = ({ onDatosFiltrados }) => {
  // Tipos de filtros
  const [numero, setNumero] = useState("");
  const [dimension, setDimension] = useState("");
  const [estado, setEstado] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState("");
  const [precioError, setPrecioError] = useState("");
  const [aplicaFiltro,setAplicaFiltro]=useState(false);

  const precioValidator = () => {
    const numericPattern = /^[0-9]*$/;

    if (!numericPattern.test(precio)) {
      swal("Solo números", "Verifique el valor ingresado", "info");
      setPrecioError("Verifique el valor ingresado");
    }
    setPrecioError("");
  };

  const hamdleSubmit = async (tipo) => {
    let timerInterval;
    if(tipo == 0){
      const datosFiltrados = {
        numeroFiltro:"",
        dimensionFiltro: "" ,
        estadoFiltro:"",
        categoriaFiltro:"",
        precioFiltro:"",
      };
      setAplicaFiltro(false);
      onDatosFiltrados(datosFiltrados);

           Swal.fire({
          title: "Royal Village",
        html: `Eliminando todos los filtros...`,
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => {
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
      resetFormulario();
    }
    else {
      if (numero === "" && dimension === "" && estado === ""&& categoria === ""&& precio === "") {
        swal(
          "Favor de verificar",
          "No hay filtros aplicados",
          "warning"
        );
      } else {
        const datosFiltrados = {
          numeroFiltro:numero,
          dimensionFiltro: dimension ,
          estadoFiltro:estado,
          categoriaFiltro:categoria,
          precioFiltro:precio,
        };

        setAplicaFiltro(true);
        onDatosFiltrados(datosFiltrados);
        Swal.fire({
          title: "Royal Village",
          html: `Aplicando filtros...`,
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => {
            }, 100);
          },
          willClose: () => {
            
            clearInterval(timerInterval);
          }});
        
        resetFormulario();
      }

    }
    
  };

  const resetFormulario = () => {
    setNumero("");
    setDimension("");
    setEstado("");
    setCategoria("");
    setPrecio("");

    //Limpiando errores
    setPrecioError("");
  };

  const handleEstadoChange = (e) => {
    setEstado(e.target.value);
  };

  const handleCategoriaChange = (e) => {
    setCategoria(e.target.value);
  };

  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-1 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Consulta de terrenos</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Podrás filtrar por número de terreno, dimención, estado, categoria, etc.</p>
        </div>
        <div className="md:w-2/3 mx-auto">
          <div className="flex flex-wrap -m-2">

           
              <div className="p-1 w-1/2 ">
                <div className="relative w-full">
                  <label htmlFor="numero" className="leading-7 text-sm text-gray-600">Número</label>
                  <input 
                    value={numero}
                    onChange={(ev) => setNumero(ev.target.value)}
                  type="text" id="numero" name="numero" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
              </div>
              {/* <div className="p-2 w-1/3">
                <div className="relative">
                  <label htmlFor="dimension" className="leading-7 text-sm text-gray-600">Dimension</label>
                  <input 
                    value={dimension}
                    onChange={(ev) => setDimension(ev.target.value)}
                  type="text" id="dimension" name="dimension" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
              </div> */}
              <div className="p-1 w-1/2">
                <div className="relative  w-full">
                  <label htmlFor="estado" className="leading-7 text-sm text-gray-600">Estado</label>
                  <select
                    id="estado"
                    name="estado"
                    value={estado}
                    onChange={handleEstadoChange}
                    style={{ height: '42px' }}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  >
                    <option value="">No aplica</option>
                    <option value="Disponible">Disponible</option>
                    <option value="Reservado">Reservado</option>
                    <option value="Vendido">Vendido</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </div>
          
              <div className="p-1 w-1/2">
                <div className="relative  w-full">
                  <label htmlFor="categoria" className="leading-7 text-sm text-gray-600">Categoria</label>
                  <select
                    id="categoria"
                    name="categoria"
                    value={categoria}
                    onChange={handleCategoriaChange}
                    style={{ height: '42px',width:'100%' }}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  >
                    <option value="">No aplica</option>
                    <option value="Vista a Av.">Vista a Av.</option>
                    <option value="Vista a Verde">Vista a Verde</option>
                    <option value="Vista a Verde y Av.">Vista a Verde y Av.</option>
                    <option value="Vista al Lago">Vista al Lago</option>
                  </select>
                </div>
              </div>
              <div className="p-1 w-1/2">
                <div className="relative w-full">
                  <label htmlFor="precio" className="leading-7 text-sm text-gray-600">Precio</label>
                  <input 
                    value={precio}
                    onChange={(ev) => setPrecio(ev.target.value)}
                    onBlur={() => {
                      precioValidator();
                    }}
                    placeholder="$50000"
                    maxLength={10}
                    pattern="[0-9]*"
                    type="text" 
                    style={{ height: '42px',width:'100%' }}
                    id="precio" name="precio" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                  <p className="text-white bg-red-600">{precioError}</p>
                </div>
              </div>


            <div className="p-1 w-1/2 mt-10">
              <button 
              onClick={() => hamdleSubmit(0)}
              style={{ height: '40px',width:'100%' }}
              className=" text-center text-white bg-red-500 border-0 py-2 focus:outline-none hover:bg-red-600 rounded text-lg">Quitar Filtros</button>
            </div>

            <div className="p-1 w-1/2 mt-10">
              <button 
              onClick={() => hamdleSubmit(1)}
              style={{ height: '40px',width:'100%' }}
              className=" text-center text-white bg-green-500 border-0 py-2  focus:outline-none hover:bg-green-600 rounded text-lg">Filtrar</button>
            </div>
           
              {/* {resultadosEncontrados > 0 && aplicaFiltro && (
                <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                 <p>Se encontraron: {resultadosEncontrados} terrenos</p>
                </div>
              )}
            {resultadosEncontrados == 0 && aplicaFiltro && (
               <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                  <p>No se encontraron terrenos para los filtros ingresados. Deberá refinar su búsqueda. </p>
               </div>
              )} */}

          </div>
        </div>
      </div>
    </section>

  );
};

export default FiltroLotes;


