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
                    <h4 className="font-bold text-base ">
                        Santa Fe,
                        <br /> "Cuna de la Constitución Nacional"
                    </h4>
                </div>
            </div>
            <div className=" p-4 px-8  text-xs  text-slate-600">
                <div className=" text-right">
                    <div>
                        Fecha:<strong className="ml-2"></strong>
                    </div>
                </div>
            </div>
            <div className=" p-4  text-xs px-8  mb-4 text-slate-600">
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
            <h4 className="font-bold mb-2 text-base text-base mx-8">
                Datos de la campaña
            </h4>
            <div className=" bg-slate-100  p-4 rounded-lg text-xs mx-8  text-slate-600">
                <div className="flex flex-row">
                    <div className="basis-1/2 mr-8">
                        <p className="mb-2">
                            Tipo:
                            <strong className="ml-3"></strong>
                        </p>
                        <p className="mb-2">
                            Año:
                            <strong className="ml-3"></strong>
                        </p>
                    </div>
                    <div className="basis-1/2 pl-4  ">
                        <p className="mb-2">
                            mes:
                            <strong className="ml-3"></strong>
                        </p>
                    </div>
                </div>
                <h4 className="text-base  font-bold mb-2 mt-4">Distribucion</h4>
                <div className="flex flex-row border-dashed border-slate-200 border-b-2">
                    <div className="basis-1/2 mr-8">
                        <p className="mb-2">
                            Grupo Econimico:
                            <strong className="ml-3"></strong>
                        </p>
                        <p className="mb-2">
                            Valor Segundo:
                            <strong className="ml-3"></strong>
                        </p>
                        <p className="mb-2">
                            Segundos:
                            <strong className="ml-3"></strong>
                        </p>
                    </div>
                    <div className="basis-1/2 pl-4  ">
                        <p className="mb-2">
                            Menciones:
                            <strong className="ml-3"></strong>
                        </p>
                        <p className="mb-2">
                            Medio:
                            <strong className="ml-3"></strong>
                        </p>
                        <p className="mb-2">
                            Programa:
                            <strong className="ml-3"></strong>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
