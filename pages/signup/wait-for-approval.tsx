import React, { useLayoutEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { SignUpStore } from '../../store/sigup.store'
import SecurePages from '../../components/signup/securePages'
const Page: NextPage = () => {
    const router = useRouter()
    const state = SignUpStore.useState(s => s)
    return (
        <SecurePages {...state}>
            <div id="wait-for-approval">
                <section className="h-screen flex items-center pt-20 pb-24 bg-blue-600">
                    <div className="container px-4 mx-auto">
                        <div className="max-w-xl mx-auto text-center">
                            <span className="inline-block text-xs py-1 px-3 bg-blue-500 text-white font-semibold rounded-xl">
                                Proceso recibido
                            </span>
                            <h2 className="my-3 text-3xl md:text-4xl text-white font-bold font-heading pt-8">
                                Solicitud en proceso de revisión
                            </h2>
                            <p className="text-sm md:text-base text-white pt-8">
                                Tenemos un registro con su usuario para la
                                empresa{' '}
                                <b>{state.companyInReview?.razonSocial}</b>.
                                Dicha solicitud se encuentra en proceso de
                                revisión. Por favor aguarde a ser contactado.
                                Dicho contacto se realizará por comunicación
                                oficial al mail{' '}
                                <b>
                                    {state.companyInReview?.representante.email}
                                </b>{' '}
                                el cual ha sido declarado al momento de la
                                inscripción
                            </p>

                            <p className="text-sm md:text-base text-white pt-8">
                                Asimismo le solicitamos que revise su casilla de
                                spam ya que dicha respuesta pudo haber sido
                                enviada a esa carpeta
                            </p>

                            <p className="text-sm md:text-base text-white pt-4">
                                Gracias por su tiempo
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </SecurePages>
    )
}

export default Page
