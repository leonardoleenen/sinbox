import React from 'react'
import type { NextPage } from 'next'

const FormVertical: NextPage = () => {
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
                Proveedor
            </h4>
            <div className=" bg-slate-100  p-4 rounded-lg text-xs mx-8  text-slate-600">
                <div className="flex flex-row">
                    <div className="basis-1/2 mr-8">
                        <p className="mb-2">
                            Razon Social:
                            <strong className="ml-3">312312312312</strong>
                        </p>
                    </div>
                    <div className="basis-1/2 pl-4  ">
                        <p className="mb-2">
                            CUIT:
                            <strong className="ml-3">
                                Responsable Inscripto
                            </strong>
                        </p>
                    </div>
                </div>
            </div>

            <h4 className="font-bold mb-2 text-base text-base mt-6 mx-8">
                Presupuesto aprobado
            </h4>
            <div className=" bg-slate-100  p-4 rounded-lg text-xs mx-8  text-slate-600">
                <div className="flex flex-row border-dashed border-slate-200 border-b-2 mt-4">
                    <div className="basis-1/3 mr-8">
                        <p className="mb-2">
                            Programa:
                            <strong className="ml-3">Por la tarde</strong>
                        </p>
                    </div>
                    <div className="basis-1/3 pl-4  ">
                        <p className="mb-2">
                            Importe:
                            <strong className="ml-3">$ 8,900</strong>
                        </p>
                    </div>
                    <div className="basis-1/3 pl-4  ">
                        <p className="mb-2">
                            Menciones diarias:
                            <strong className="ml-3">16</strong>
                        </p>
                    </div>
                </div>
            </div>
            <div className="border-slate-200 border-t-2 p-4 px-8 flex flex-row  text-center items-center mt-8 bottom-0">
                ORIGINAL
            </div>
        </div>
    )
}

export default FormVertical
