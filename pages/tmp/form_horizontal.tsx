import React from 'react'
import type { NextPage } from 'next'

const FormHorizontal: NextPage = () => {
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
                    <h4 className="font-bold text-base">
                        Santa Fe, "Cuna de la Constitución Nacional"
                    </h4>
                </div>
            </div>
            {/*--SUB HEADER--*/}
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
                </div>
                <div className="basis-1/2 text-right">
                    <div>
                        Expediente N°:
                        <strong className="ml-2">4797/2022</strong>
                    </div>
                </div>
                <div className="basis-1/2 text-right">
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
            <div className="border-slate-200 border-b-2 p-4 px-8 mb-4  flex text-xs  text-slate-600">
                <div className="basis-1/4  font-bold">
                    MES DE PUBLICIDAD: 11/2022
                </div>
                <div className="basis-1/2 text-center font-bold">
                    <div>
                        DETALLE DE PUBLICIDAD POR CUENTA Y ORDEN DE NUESTRO
                        CLIENTE
                    </div>
                </div>
            </div>
            <div className=" bg-slate-100  p-4 rounded-lg text-xs mx-8  text-slate-600">
                <div className=" ">
                    <p className="mb-2">
                        Soporte:
                        <strong className="ml-3">
                            LA CALLE Tipo de formato: OTRO 0,00 Exhibición
                            Pantalla LED - PEATONAL SAN MARTÍN ESQUINA URQUIZA
                            (GALERÍA ALMENDRAL) - 12 salidas de 15" diarios -
                            204 spot diarios - Total 3060" diarios 40.000,00
                            hasta 10/11
                        </strong>
                    </p>
                </div>
                <div className="flex flex-row">
                    <div className="">
                        <p className="mb-2">
                            Tema / Tamaño:
                            <strong className="ml-3">1X1(1)</strong>
                        </p>
                        <p className="mb-2">
                            Rat:
                            <strong className="ml-3">0,00</strong>
                        </p>
                        <p className="mb-2">
                            CPR:
                            <strong className="ml-3">0,00</strong>
                        </p>
                    </div>
                </div>
            </div>

            <div className="border-slate-200 border-t-2 p-4 px-8 flex flex-row  text-center items-center mt-8 fixed w-full bottom-0">
                ORIGINAL
            </div>
        </div>
    )
}

export default FormHorizontal
