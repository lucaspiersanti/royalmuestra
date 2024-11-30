import React, { useEffect, useState } from "react";
import { IntroduccionSeccion } from '../../components/shared/IntroduccionSeccion'
import { Cards } from "../../components/shared/Cards";
import { GetLotes as getLotes } from "../../controllers/lotesController";
import { Spinner } from "reactstrap";
import { TablePag } from "../../components/shared/TablePag";

export const ControlGral = () => {
    const [lotes, setLotes] = useState([]);
    const [lotesCargados, setLotesCargados] = useState(false);
    const [cantidadLotesDisponibles, setCantidadLotesDisponibles] = useState(0);
    const [cantidadLotesReservados, setCantidadLotesReservados] = useState(0);
    const [cantidadLotesVendidos, setCantidadLotesVendidos] = useState(0);
    const [isChecked, setIsChecked] = useState(false);

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Enero es 0!
    const yyyy = today.getFullYear();

    const _fecha = dd + '/' + mm + '/' + yyyy;

    const [secciones] = useState([
        {
            id: "1",
            titulo: "Control General",
            subTitulo: "Podrás visualizar el estado general del negocio."
        },
    ]);

    useEffect(() => {
        async function fetchLotes() {
            try {
                const response = await getLotes();
                console.log(response.data);
                response.data.sort((a, b) => a.numero - b.numero);
                setLotes(response.data);

                setCantidadLotesDisponibles(response.data.filter(lote => lote.estado === "Disponible").length);
                setCantidadLotesReservados(response.data.filter(lote => lote.estado === "Reservado").length);
                setCantidadLotesVendidos(response.data.filter(lote => lote.estado === "Vendido").length);
                setLotesCargados(true);
            } catch (error) {
                console.error("Error al cargar lotes:", error);
            }
        }
        fetchLotes();
    }, []);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (

        <section className="text-gray-600 body-font relative h-full w-full">
            <div className="container px-1 py-5 h-full w-full">
                <IntroduccionSeccion _titulo={secciones[0].titulo} _subtitulo={secciones[0].subTitulo}></IntroduccionSeccion>
                <hr className="m-2"></hr>
                {lotesCargados ? (
                    <>
                        <section className="text-gray-600 body-font text-center">
                            <div className="container px-5 py-10 flex flex-wrap w-full">
                                <div className="py-8 md:w-1/4">
                                    <h2 className="text-2xl text-gray-900 font-medium title-font mb-2">TERRENOS </h2>
                                    <p className="text-md mb-2">{_fecha}</p>
                                </div>
                                <div className="md:w-3/4 md:pl-6 text-center ">
                                    <div className="w-full flex flex-wrap">
                                        <Cards _color="green" _cantidad={cantidadLotesDisponibles} _estado={"Disponibles"}></Cards>
                                        <Cards _color="yellow" _cantidad={cantidadLotesReservados} _estado={"Reservados"}></Cards>
                                        <Cards _color="red" _cantidad={cantidadLotesVendidos} _estado={"Vendidos"}></Cards>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div className=" px-1 py-5 body-font text-center">
                            <label>
                                <input className="peer/showLabel absolute scale-0" type="checkbox"
                                    onClick={()=>handleCheckboxChange()}
                                />
                                <span className="block max-h-full max-w-full overflow-hidden rounded-lg bg-gray-100 px-4 py-0 text-grey-900 shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-12">
                                    <h3 className="flex h-14 cursor-pointer items-center font-bold">{!isChecked ? 'Ocultar información' : 'Ver más información'}</h3>
                                    {!isChecked && (<TablePag onLotes={lotes}></TablePag>)}
                                </span>
                            </label>
                        </div>
                    </>
                ) : (
                    <div className="p-5 flex items-center justify-center ">
                        <div>
                            <Spinner animation="border" style={{ color: "#bf8c39" }}></Spinner>
                        </div>
                    </div>
                )}

                <hr className="m-2"></hr>
            </div>
        </section>

    )
}




