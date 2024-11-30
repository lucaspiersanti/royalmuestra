import React from "react";

export const Cards = ({ _color, _cantidad, _estado }) => {
   
    return (
        <div className={`flex-shrink-0 ml-6 relative overflow-hidden bg-${_color}-500 rounded-lg max-w-xs shadow-lg`}>
            <div className="relative pt-10 px-10 flex items-center justify-center">
                <div className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3" style={{background: "radial-gradient(black, transparent 60%)", transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)", opacity: "0.2"}}></div>
                <span className={`block bg-white rounded-full text-${_color}-500 text-xl font-bold px-3 py-2 leading-none flex items-center`}>{_cantidad}</span>
            </div>
            <div className="relative text-white px-6 pb-6 mt-6">
                <div className="flex justify-between">
                    <span className="block font-semibold text-xl">{_estado}</span>
                </div>
            </div>
        </div>

    )
}
