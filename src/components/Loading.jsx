import { Spinner } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'



const Loading =() => {

  return (
    <>
        <div className="absolute items-center top-0 left-0 right-0 bottom-0 bg-black/20 z-[2]" />
        <div className=" flex items-center justify-center h-screen mt-10">
            {/* Overlay */}
            <div className="text-white z-[2] mt-[-10rem] flex flex-col items-center">
                <img loading="lazy" src="./favicon.ico" />
                <h1 className="pt-5 pb-0 text-5xl text-yellow-600 font-serif">
                    ROYAL VILLAGE
                </h1>
                <p className="pt-2 pb-5 text-xl">Cargando...</p>
                <Spinner animation="border" style={{color: "#bf8c39"}}></Spinner>
            </div>
        </div>
    </>
    );
}

export default Loading;