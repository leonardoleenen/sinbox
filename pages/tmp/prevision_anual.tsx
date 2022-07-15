import React from 'react'
import type { NextPage } from 'next'

const Page: NextPage = () => {
    return (
        <div>
            {/*--HEADER--*/}
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
            {/*--SUB HEADER--*/}
            <div className=" p-4 px-8  text-xs  text-slate-600">
                <div className=" text-right">
                    <div>
                        Fecha:<strong className="ml-2">12/12/2020</strong>
                    </div>
                </div>
            </div>
            {/*--BODY--*/}
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
                Previsión Anual
            </h4>
            <div className=" bg-slate-100  p-4 rounded-lg text-xs mx-8  text-slate-600">
                <div className="flex flex-row">
                    <div className="basis-1/2 mr-8">
                        <p className="mb-2">
                            Referencia:
                            <strong className="ml-3">Radio mitre</strong>
                        </p>
                        <p className="mb-2">
                            Tipo:
                            <strong className="ml-3">Sujeto exento</strong>
                        </p>
                        <p className="mb-2">
                            Nro de Norma:
                            <strong className="ml-3">
                                leenen.maria@gmail.com
                            </strong>
                        </p>
                        <p className="mb-2">
                            Monto Asignado:
                            <strong className="ml-3">+541142728989</strong>
                        </p>
                    </div>
                    <div className="basis-1/2 pl-4  ">
                        <p className="mb-2">
                            Año:
                            <strong className="ml-3">12312312321</strong>
                        </p>
                        <p className="mb-2">
                            Detalle:
                            <strong className="ml-3">+541142728989</strong>
                        </p>
                        <p className="mb-2">
                            Fecha de Norma:
                            <strong className="ml-3">+541142728989</strong>
                        </p>
                        <p className="mb-2">
                            Notificar a:
                            <strong className="ml-3">+541142728989</strong>
                        </p>
                    </div>
                </div>
            </div>
            <div className="border-slate-200 border-t p-4 px-8 grid grid-cols-3 w-full gap-4 items-center absolute bottom-0 text-center">
                <div>va el codigo de barras</div>
                <div className="uppercase font-bold text-sm">Original</div>
                <div>va el codigo el QR</div>
            </div>
        </div>
    )
}

export default Page
