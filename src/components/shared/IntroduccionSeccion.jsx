import React from 'react'

export const IntroduccionSeccion = ({_titulo,_subtitulo}) => {


  return (
    <div className="flex flex-col text-center w-full mb-6">
    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
      {_titulo}
    </h1>
    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
    {_subtitulo}
    </p>
  </div>
  )
}
