import React from 'react'
import type { NextPage } from 'next'
import Header from '../../components/header'

const Page: NextPage = () => {
    return (
        <div>
            <Header />
            <section className="py-20">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-12">
                        <div className="lg:w-1/3 lg:pr-16 mb-2 lg:mb-8">
                            <h2 className="text-3xl md:text-4xl font-bold font-heading">
                                Preguntas frecuentes
                            </h2>
                        </div>
                        <div className="text-sm lg:text-base lg:w-1/3">
                            <p className="leading-loose text-blueGray-500">
                                Si tiene alguna otra duda por favor envie un
                                correo a soporte@prensasantafe.gob.ar
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                            <h4 className="mb-2 md:mb-4 text-xl font-semibold">
                                Puedo administrar mas de una empresa?
                            </h4>
                            <p className="text-sm md:text-base leading-loose text-blueGray-500">
                                Por el momento no, solo una empresa por usuario.
                                En versiones futuras se podrá mas de una empresa
                            </p>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                            <h4 className="mb-2 md:mb-4 text-xl font-semibold">
                                La presentación de un tramite implica la
                                aceptación del mismo?{' '}
                            </h4>
                            <p className="text-sm md:text-base leading-loose text-blueGray-500">
                                No. El hecho de presentar el tramite no da por
                                sentado el cumplimiento de la obligación ya que
                                el mismo debe pasar por un proceso de aprobación
                                interno
                            </p>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                            <h4 className="mb-2 md:mb-4 text-xl font-semibold">
                                Puedo presentar más de una certificación a la
                                vez?
                            </h4>
                            <p className="text-sm md:text-base leading-loose text-blueGray-500">
                                Si, se pueden presentar todas las
                                certificaciones que se quiera. El área luego las
                                evaluará y aprobará en caso que corresponda
                            </p>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                            <h4 className="mb-2 md:mb-4 text-xl font-semibold">
                                Puedo presentar certificaciones de terceros?{' '}
                            </h4>
                            <p className="text-sm md:text-base leading-loose text-blueGray-500">
                                Solo los representantes legales y apoderados
                                (que hayan presentado poder) pueden realizar
                                presentaciones
                            </p>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                            <h4 className="mb-2 md:mb-4 text-xl font-semibold">
                                Las certificaciones tienen vencimiento?{' '}
                            </h4>
                            <p className="text-sm md:text-base leading-loose text-blueGray-500">
                                No,{' '}
                            </p>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                            <h4 className="mb-2 md:mb-4 text-xl font-semibold">
                                Puedo presentar certificaciones de convenios
                                pendientes a aprobar
                            </h4>
                            <p className="text-sm md:text-base leading-loose text-blueGray-500">
                                No, solo aquellas que tengan un convenio activo
                                y válido
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Page
