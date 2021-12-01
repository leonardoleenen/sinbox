import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Page: NextPage = () => {
    const router = useRouter()

    return (
        <section className="py-20">
            <div className="container px-4 mx-auto">
                <div className="flex flex-wrap -mx-8">
                    <div className="w-full lg:w-1/2 px-8">
                        <div className="mb-12 lg:mb-0 pb-12 lg:pb-0 border-b lg:border-b-0">
                            <h2 className="mb-4 text-3xl lg:text-4xl font-bold font-heading">
                                Bienvenido
                            </h2>
                            <p className="mb-8 leading-loose text-blueGray-400">
                                A continuación le explicaremos los pasos a
                                seguir para que pueda realizar su primera
                                inscripción como empresa. Para poder realizar
                                presentaciones de certificaciones de servicios
                                es necesario que ud realice el proceso de
                                inscripción como empresa. Para ello debe
                                realizar los pasos que se mencionan a
                                continuación
                            </p>
                            <a
                                className="inline-block text-xs py-4 px-8 text-white font-semibold leading-none bg-blue-600 hover:bg-blue-700 rounded"
                                onClick={() => router.push('/inbox/welcome')}
                                href="#"
                            >
                                Entendido, volver a la bandeja
                            </a>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 px-8">
                        <ul className="space-y-12">
                            <li className="flex -mx-4">
                                <div className="px-4">
                                    <span className="flex w-16 h-16 mx-auto items-center justify-center text-2xl font-bold font-heading rounded-full bg-blue-50 text-blue-600">
                                        1
                                    </span>
                                </div>
                                <div className="px-4">
                                    <h3 className="my-4 text-xl font-semibold">
                                        Registro de empresa
                                    </h3>
                                    <p className="text-blueGray-400 leading-loose">
                                        El alta de empresa es necesario ya que
                                        se deben verificar los datos de la
                                        misma. Por ello deberá proporcionar
                                        información como estatutos sociales,
                                        DDJJ, etc
                                    </p>
                                </div>
                            </li>
                            <li className="flex -mx-4">
                                <div className="px-4">
                                    <span className="flex w-16 h-16 mx-auto items-center justify-center text-2xl font-bold font-heading rounded-full bg-blue-50 text-blue-600">
                                        2
                                    </span>
                                </div>
                                <div className="px-4">
                                    <h3 className="my-4 text-xl font-semibold">
                                        Declaración de administradores
                                        legitimados
                                    </h3>
                                    <p className="text-blueGray-400 leading-loose">
                                        Los administradores legitimados son los
                                        representantes legales. En caso de que
                                        el administrador legitimado sea un
                                        apoderado, deberá proporcionar también
                                        el poder que lo legitima como tal
                                    </p>
                                </div>
                            </li>
                            <li className="flex -mx-4">
                                <div className="px-4">
                                    <span className="flex w-16 h-16 mx-auto items-center justify-center text-2xl font-bold font-heading rounded-full bg-blue-50 text-blue-600">
                                        3
                                    </span>
                                </div>
                                <div className="px-4">
                                    <h3 className="my-4 text-xl font-semibold">
                                        Presentación de certificación de
                                        servicios
                                    </h3>
                                    <p className="text-blueGray-400 leading-loose">
                                        Una vez aprobado el tramite de
                                        inscripción estará en condiciones de
                                        realizar la presentación de
                                        presentaciones de servicios
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Page
