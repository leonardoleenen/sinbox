import React from 'react'
import type { NextPage } from 'next'
import Container from '../components/container'
import Header from '../components/header'
import InternalPage from '../components/internalPage'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Page: NextPage = () => {
    const router = useRouter()
    return (
        <div>
            <Header />
            <Container>
                <InternalPage title="Bienvenido ">
                    <div className="grid grid-cols-3 gap-4">
                        <div
                            className=" cursor-pointer card w-96 bg-lime-50 shadow-xl"
                            onClick={() => router.push('/process')}
                        >
                            <div className="card-body">
                                <h2 className="card-title">
                                    Bandeja de trabajo
                                </h2>
                                <p>
                                    Módulo que gestionar los tramites que son
                                    enviados o bien iniciar uno nuevo
                                </p>
                            </div>
                            <figure>
                                <Image
                                    src={`/illustrations/planificacion.svg`}
                                    alt={'Analytics'}
                                    width={250}
                                    height={250}
                                />
                            </figure>
                        </div>
                        <div
                            className=" cursor-pointer card w-96 shadow-xl"
                            onClick={() => router.push('/preventivo')}
                        >
                            <div className="card-body">
                                <h2 className="card-title">Preventivo</h2>
                                <p>Módulo que gestionar los preventivos</p>
                            </div>
                            <figure>
                                <Image
                                    src={`/illustrations/planificacion.svg`}
                                    alt={'Analytics'}
                                    width={250}
                                    height={250}
                                />
                            </figure>
                        </div>
                        <div
                            className="  cursor-pointer  card w-96  shadow-xl"
                            onClick={() => router.push('/planning')}
                        >
                            <div className="card-body">
                                <h2 className="card-title">Planificacion</h2>
                                <p>
                                    Módulo que gestionar la planificación de las
                                    pautas publicitarias
                                </p>
                            </div>
                            <figure>
                                <Image
                                    src={`/illustrations/planificacion.svg`}
                                    alt={'Analytics'}
                                    width={250}
                                    height={250}
                                />
                            </figure>
                        </div>

                        <div className="  cursor-pointer  card w-96 bg-gray-100  shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">Seguridad</h2>
                                <p>
                                    Permite gestionar la seguridad de la
                                    aplicación
                                </p>
                            </div>
                            <figure>
                                <Image
                                    src={`/illustrations/planificacion.svg`}
                                    alt={'Analytics'}
                                    width={250}
                                    height={250}
                                />
                            </figure>
                        </div>

                        <div className="  cursor-pointer  card w-96 bg-gray-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">Analytics</h2>
                                <p>
                                    Módulo que permite visualizar los datos
                                    analiticos de la plataforma
                                </p>
                            </div>
                            <figure>
                                <Image
                                    src={`/illustrations/analytics.svg`}
                                    alt={'Analytics'}
                                    width={250}
                                    height={250}
                                />
                            </figure>
                        </div>
                    </div>
                </InternalPage>
            </Container>
        </div>
    )
}

export default Page
