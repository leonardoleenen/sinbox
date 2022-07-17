import React from 'react'
import type { NextPage } from 'next'

const FormVertical: NextPage = () => {
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
                            Cuit:
                            <strong className="ml-3">312312312312</strong>
                        </p>
                        <p className="mb-2">
                            Nombre del titular:
                            <strong className="ml-3">Leonardo</strong>
                        </p>
                        <p className="mb-2">
                            Tipo moneda datos basicos:
                            <strong className="ml-3">Pesos Argentinos</strong>
                        </p>
                        <p className="mb-2">
                            Telefono:
                            <strong className="ml-3">3123123123</strong>
                        </p>
                        <p className="mb-2">
                            Sitio Web:
                            <strong className="ml-3">www.</strong>
                        </p>
                    </div>
                    <div className="basis-1/2 pl-4  ">
                        <p className="mb-2">
                            Condicion Frente al Iva:
                            <strong className="ml-3">
                                Responsable Inscripto
                            </strong>
                        </p>
                        <p className="mb-2">
                            Beneficiario:
                            <strong className="ml-3">Leonardo</strong>
                        </p>
                        <p className="mb-2">
                            Tipo de Medio:
                            <strong className="ml-3">web</strong>
                        </p>
                        <p className="mb-2">
                            Email:
                            <strong className="ml-3">leenene@gmail</strong>
                        </p>
                    </div>
                </div>
            </div>

            <h4 className="font-bold mb-2 mt-6 text-base text-base mx-8">
                Domicilio
            </h4>
            <div className=" bg-slate-100  p-4 rounded-lg text-xs mx-8  text-slate-600">
                <div className="flex flex-row">
                    <div className="basis-1/2 mr-8">
                        <p className="mb-2">
                            Calle:
                            <strong className="ml-3">Chocano</strong>
                        </p>
                        <p className="mb-2">
                            Piso:
                            <strong className="ml-3">3</strong>
                        </p>
                        <p className="mb-2">
                            Pais:
                            <strong className="ml-3">Argentina</strong>
                        </p>
                        <p className="mb-2">
                            Localidad:
                            <strong className="ml-3">Lomas de zamora</strong>
                        </p>
                        <p className="mb-2">
                            Observaciones:
                            <strong className="ml-3">chocano</strong>
                        </p>
                    </div>
                    <div className="basis-1/2 pl-4  ">
                        <p className="mb-2">
                            Numero:
                            <strong className="ml-3">195</strong>
                        </p>
                        <p className="mb-2">
                            Departamento:
                            <strong className="ml-3">3</strong>
                        </p>
                        <p className="mb-2">
                            Provincia:
                            <strong className="ml-3">Buenos Aires</strong>
                        </p>
                        <p className="mb-2">
                            Municipio:
                            <strong className="ml-3">lomas de zamora</strong>
                        </p>
                    </div>
                </div>
            </div>
            <h4 className="font-bold mb-2 mt-6 text-base text-base mx-8">
                Datos de Facturacion
            </h4>
            <div className=" bg-slate-100  p-4 rounded-lg text-xs mx-8  text-slate-600">
                <div className="flex flex-row">
                    <div className="basis-1/2 mr-8">
                        <p className="mb-2">
                            Cuit:
                            <strong className="ml-3">3123123123123</strong>
                        </p>
                        <p className="mb-2">
                            Nombre del Responsable:
                            <strong className="ml-3">Leonardo</strong>
                        </p>
                        <p className="mb-2">
                            Telefono:
                            <strong className="ml-3">3213123123123</strong>
                        </p>
                    </div>
                    <div className="basis-1/2 pl-4  ">
                        <p className="mb-2">
                            Nombre del titular:
                            <strong className="ml-3">Leonardo</strong>
                        </p>
                        <p className="mb-2">
                            Email:
                            <strong className="ml-3">leenene@gmail</strong>
                        </p>
                        <p className="mb-2">
                            Telefono Alternativo:
                            <strong className="ml-3">212212</strong>
                        </p>
                    </div>
                </div>
            </div>
            <h4 className="font-bold mb-2 mt-6 text-base text-base mx-8">
                Datos de Contacto
            </h4>
            <div className=" bg-slate-100  p-4 rounded-lg text-xs mx-8  text-slate-600">
                <div className="flex flex-row">
                    <div className="basis-1/2 mr-8">
                        <p className="mb-2">
                            Nombre:
                            <strong className="ml-3">312312312</strong>
                        </p>
                        <p className="mb-2">
                            Telefono:
                            <strong className="ml-3">12312312</strong>
                        </p>
                        <p className="mb-2">
                            Email:
                            <strong className="ml-3">leeenen@gmail.com</strong>
                        </p>
                    </div>
                    <div className="basis-1/2 pl-4  ">
                        <p className="mb-2">
                            Apellido:
                            <strong className="ml-3">Leenen</strong>
                        </p>
                        <p className="mb-2">
                            Telefono Alternativo:
                            <strong className="ml-3">312312312</strong>
                        </p>
                    </div>
                </div>
            </div>
            <h4 className="font-bold mb-2 mt-6 text-base text-base mx-8">
                Legal
            </h4>
            <div className=" bg-slate-100  p-4 rounded-lg text-xs mx-8  text-slate-600">
                <div className="flex flex-row">
                    <div className="basis-1/2 mr-8">
                        <p className="mb-2">
                            Nombre:
                            <strong className="ml-3">Leonardo</strong>
                        </p>
                        <p className="mb-2">
                            Telefono:
                            <strong className="ml-3">3242423</strong>
                        </p>
                        <p className="mb-2">
                            Email:
                            <strong className="ml-3">leenene@gmail.com</strong>
                        </p>
                    </div>
                    <div className="basis-1/2 pl-4  ">
                        <p className="mb-2">
                            Apellido:
                            <strong className="ml-3">Leenen</strong>
                        </p>
                        <p className="mb-2">
                            Telefono Alternativo:
                            <strong className="ml-3">1134566665</strong>
                        </p>
                    </div>
                </div>
            </div>
            <h4 className="font-bold mb-2 mt-6 text-base text-base mx-8">
                Norma
            </h4>
            <div className=" bg-slate-100  p-4 rounded-lg text-xs mx-8  text-slate-600">
                <div className="flex flex-row">
                    <div className="basis-1/2 mr-8">
                        <p className="mb-2">
                            Norma / Resolucion:
                            <strong className="ml-3">312312</strong>
                        </p>
                        <p className="mb-2">
                            Fecha de Vigencia:
                            <strong className="ml-3">15/07/2022</strong>
                        </p>
                    </div>
                    <div className="basis-1/2 pl-4  ">
                        <p className="mb-2">
                            Año:
                            <strong className="ml-3">2022</strong>
                        </p>
                        <p className="mb-2">
                            Numero de Norma:
                            <strong className="ml-3">21321</strong>
                        </p>
                    </div>
                </div>
            </div>
            <h4 className="font-bold mb-2 text-base text-base mt-6 mx-8">
                Programa
            </h4>
            <div className=" bg-slate-100  p-4 rounded-lg text-xs mx-8  text-slate-600">
                <div className="flex flex-row border-dashed border-slate-200 border-b-2 mt-4">
                    <div className="basis-1/2 mr-8">
                        <p className="mb-2">
                            Importe:
                            <strong className="ml-3">$8.999,99</strong>
                        </p>
                    </div>
                    <div className="basis-1/2 pl-4  ">
                        <p className="mb-2">
                            Nombre:
                            <strong className="ml-3">Por la tarde</strong>
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
