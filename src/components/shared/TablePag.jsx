import React, { useEffect, useState } from "react";

export const TablePag = ({ onLotes }) => {
    const [lotesTotales, setLotesTotales] = useState(0);
    const [lotesEstado, setLotesEstado] = useState([]);
    const [activeButton, setActiveButton] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = lotesEstado.slice(indexOfFirstItem, indexOfLastItem);

    const mostrarLotes = (_filtro) => {
        setActiveButton(_filtro);
        onLotes.sort((a, b) => a.numero - b.numero);
        let lotesAux;
        switch (_filtro) {
            case 1:
                lotesAux=onLotes.filter(lote => lote.estado === "Disponible")
                setLotesEstado(lotesAux);
                setLotesTotales(lotesAux.length);

                break;
            case 2:
                lotesAux=onLotes.filter(lote => lote.estado === "Reservado")
                setLotesEstado(lotesAux);
                setLotesTotales(lotesAux.length);
                break;
            case 3:
                lotesAux=onLotes.filter(lote => lote.estado === "Vendido")
                setLotesEstado(lotesAux);
                setLotesTotales(lotesAux.length);
                break;
            default:
            setLotesEstado(onLotes);
            setLotesTotales(onLotes.length);
            break;


        }

    }

    useEffect(() => {
        mostrarLotes();
        setActiveButton(0)
    }, []);
    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);



    return (
        <section className="container px-4 mx-auto">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div className="flex items-center gap-x-3">
                    <h2 className="text-lg font-medium text-gray-800 dark:text-white">Terrenos encontrados</h2>

                    <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{lotesTotales}</span>
                </div>

            </div>

            <div className="mt-6 md:flex md:items-center md:justify-between">
                <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
                    <button
                       className={`px-5 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm dark:text-gray-300 ${activeButton === 0 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                       onClick={() => mostrarLotes(0)}
                    >
                        Ver todos
                    </button>

                    <button
                      className={`px-5 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm dark:text-gray-300 ${activeButton === 1 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                      onClick={() => mostrarLotes(1)}
                    >
                        Disponibles
                    </button>

                    <button    
                        className={`px-5 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm dark:text-gray-300 ${activeButton === 2 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                        onClick={() => mostrarLotes(2)}>
                        Reservados
                    </button>
                    <button 
                       className={`px-5 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm dark:text-gray-300 ${activeButton === 3 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                       onClick={() => mostrarLotes(3)}>
                        Vendidos
                    </button>
                </div>

            </div>

            <div className="flex flex-col mt-6">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            {lotesTotales>0 ?(
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <span>Terreno</span>
                                    </th>

                                    <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        Estado
                                    </th>

                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        Categoria
                                    </th>

                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Vendedor</th>

                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Consultado</th>

                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                {currentItems.map((lote, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                            <div>
                                                <h2 className="font-medium text-gray-800 dark:text-white ">{lote.numero}</h2>
                                            </div>
                                        </td>
                                        {lote.estado === "Disponible" &&(
                                            <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                                <div className={`inline px-3 py-1 text-sm font-normal rounded-full text-green-500 gap-x-2 bg-green-100/60 dark:bg-gray-800`}>
                                                    {lote.estado}
                                                </div>
                                            </td>
                                        )}
                                                                                {lote.estado === "Reservado" &&(
                                            <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                                <div className={`inline px-3 py-1 text-sm font-normal rounded-full text-yellow-500 gap-x-2 bg-yellow-100/60 dark:bg-gray-800`}>
                                                    {lote.estado}
                                                </div>
                                            </td>
                                        )}
                                                                                {lote.estado === "Vendido" &&(
                                            <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                                <div className={`inline px-3 py-1 text-sm font-normal rounded-full text-red-500 gap-x-2 bg-red-100/60 dark:bg-gray-800`}>
                                                    {lote.estado}
                                                </div>
                                            </td>
                                        )}

                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                            <div>
                                                <h4 className="text-gray-700 dark:text-gray-200">{lote.categoria}</h4>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                            <div>
                                                <h4 className="text-gray-700 dark:text-gray-200">-</h4>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                            <div>
                                                <h4 className="text-gray-700 dark:text-gray-200">-</h4>
                                            </div>
                                        </td>

                                    </tr>
                                ))}

                            </tbody>
                        </table>
                            ):
                            <p className="text-red-500 text-xl-center bold" >No se encontraron resultados </p>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 mb-6 sm:flex sm:items-center sm:justify-between ">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    Terrenos <span className="font-medium text-gray-700 dark:text-gray-100">{indexOfFirstItem + 1} hasta {indexOfLastItem}</span>
                </div>
                {/* Paginación */}
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="mr-2 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded"
                    >
                        Anterior
                    </button>

                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === Math.ceil(onLotes.length / itemsPerPage)}
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded"
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </section>
    )
}
