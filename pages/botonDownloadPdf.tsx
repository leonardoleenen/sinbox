import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { SignUpStore } from '../store/sigup.store'
import Conteiner from '../components/container'
import { PDFDownloadLink } from '@react-pdf/renderer'
import Opp from './opp'
const Page: NextPage = () => {
    const router = useRouter()
    const state = SignUpStore.useState(s => s)
    const [loading, setLoading] = useState(false)

    return (
        <Conteiner>
            <section className="mt-16">
                <div className=" flex justify-between">
                    <div className="w-2/4 ">
                        <PDFDownloadLink document={<Opp />} fileName="OPP.pdf">
                            {({ blob, url, loading, error }) => {
                                console.log(Opp)
                                return loading
                                    ? 'Loading document...'
                                    : 'Descargar OPP'
                            }}
                        </PDFDownloadLink>
                    </div>
                </div>
            </section>
        </Conteiner>
    )
}

export default Page
