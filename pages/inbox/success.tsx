import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
const Page: NextPage = () => {
    const router = useRouter()
    return (
        <div>
            <section className="h-screen flex items-center pt-20 pb-24 bg-blue-600">
                <div className="container px-4 mx-auto">
                    <div className="max-w-xl mx-auto text-center">
                        <span className="inline-block text-xs py-1 px-3 bg-blue-500 text-white font-semibold rounded-xl">
                            Proceso recibido
                        </span>
                        <h2 className="my-3 text-3xl md:text-4xl text-white font-bold font-heading pt-8">
                            Solicitud finalizada con éxito
                        </h2>
                        <p className="text-sm md:text-base text-white pt-8">
                            Su solicitud ha sido recibida exitosamente. Ahora
                            debe esperar a que el área responsable verifique los
                            datos suministrados. Una vez realizado esto, será
                            notificado por email la conclusión del mismo
                        </p>
                        <p className="text-sm md:text-base text-white pt-4">
                            Una vez que este finalizado y aprobado podrá
                            ingresar con su email para poder realizar la
                            presentación de las certificaciones que desee
                        </p>
                        <p className="text-sm md:text-base text-white pt-4">
                            Gracias por su tiempo
                        </p>
                        <div className="mt-10">
                            <a
                                className="inline-block py-4 px-8 text-xs text-blue-600 hover:text-white font-semibold leading-none bg-white hover:bg-blue-600 border hover:border-white rounded transition duration-300"
                                onClick={() => router.push('/inbox')}
                            >
                                Volver a la bandeja de entrada
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Page
