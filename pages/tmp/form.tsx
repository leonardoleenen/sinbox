import React from 'react'
import type { NextPage } from 'next'

const Page: NextPage = () => {
    return (
        <div>
            <div className="border-slate-200 border-b-2 p-4 px-8 flex flex-row items-center">
                <div className="basis-1/2">
                    <img
                        src="../logos/SantaFe_Marca_blanco.png"
                        className="float-left pr-4"
                    />
                    <h4 className="font-bold text-base">
                        Ministerio de Gestión Publica
                    </h4>
                    <p className="text-xs text-slate-500">
                        Secretaría de Comunicación Social
                    </p>
                    <p className="text-xs text-slate-500">
                        Dirección General de Publicitaria y Administrativa
                    </p>
                </div>
                <div className="basis-1/2 text-right">
                    <h4 className="font-bold text-base">
                        Santa Fe, Cuna de la Constitución Nacional
                    </h4>
                </div>
            </div>
            <div className="border-slate-200 border-b-2 p-4 px-8 border-dashed flex text-xs  text-slate-600">
                <div className="basis-1/2">
                    Campaña:
                    <strong className="ml-2">
                        Secretaria de Medios y Comunicacion Publica -
                        Coronavirus-Nuevas Medidas de Aislamiento Octubre/2020
                    </strong>
                </div>
                <div className="basis-1/2 text-right">
                    <div>
                        Orden de Publicidad N°:
                        <strong className="ml-2">12/12/2020</strong>
                    </div>
                    <div>
                        Expediente N°:
                        <strong className="ml-2">4797/2022</strong>
                    </div>
                    <div>
                        Fecha:
                        <strong className="ml-2">{{ fechaRegistro }}</strong>
                    </div>
                </div>
            </div>
            <div className=" p-4  text-xs px-8  text-slate-600">
                <h4 className="font-bold mb-4">
                    Señor Gerente o Administrador de:
                </h4>
                <p>
                    Sírvase ordenar la publicación del texto cuyo original se
                    acompaña de acuerdo con la tarifa de ese medio, registrada
                    y/u oficializada ante organismos provinciales, ajustándose a
                    las modalidades que a continuación se detallan:
                </p>
            </div>
        </div>
    )
}

export default Page
