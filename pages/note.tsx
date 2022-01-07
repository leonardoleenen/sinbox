import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { SignUpStore } from '../store/sigup.store'
import Conteiner from '../components/container'
const Page: NextPage = () => {
    const router = useRouter()
    const state = SignUpStore.useState(s => s)
    const [loading, setLoading] = useState(false)

    return (
        <Conteiner>
            <section className="mt-16">
                <div className=" flex justify-between">
                    <div>
                        <img src="../logos/logoStaFe.png" />
                    </div>
                    <div className="w-2/4 ">
                        <div className="form-control text-right mt-4 mr-8">
                            <textarea
                                className="textarea h-14 "
                                placeholder="Texto de 3 lineas"
                            ></textarea>
                            <textarea
                                className="textarea h-4"
                                placeholder="Aca va la fecha"
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div className="form-control text-right mt-4 mr-8">
                    <textarea
                        className="textarea h-3/4 "
                        placeholder="cuerpo"
                    ></textarea>
                </div>
            </section>
        </Conteiner>
    )
}

export default Page
