import React, { useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { SignUpStore } from '../store/sigup.store'

const Page: NextPage = () => {
    const router = useRouter()
    const state = SignUpStore.useState(s => s)
    const [loading, setLoading] = useState(false)

    const [registroPropiedad, setRegistroPropiedad] = useState<{
        acto: string
        lote: Array<{
            lote: string
            manzana: string
            plano: string
        }>
    }>()


    return (
        <div>
            <section >
                <div className=" flex justify-between ">
                    <div><img src='../../logos/logoStaFe.png' /></div>
                    <div>
                        <div className="form-control mt-4 mr-8">
                            <textarea className="textarea h-16" placeholder="Aca van 3 lineas"></textarea>
                            <textarea className="textarea " placeholder="Aca van la fecha"></textarea>
                       
                        </div>
                    </div>
                </div>
                

            </section>
            <section >
                <div className=" ">
                   
                    <div>
                        <div className="form-control px-8 mt-8">
                            <textarea className="textarea h-16 w-full" placeholder="Aca van 3 lineas"></textarea>
                           
                        </div>
                    </div>
                </div>
                

            </section>
        </div>
    )
}

export default Page
