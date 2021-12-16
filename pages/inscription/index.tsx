import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { SignUpStore } from '../../store/sigup.store'
import { businessService } from '../../services/business.service'
import Inscription from '../../components/inscription'
import Loader from '../../components/loader/index'
import { firebaseManager } from '../../services/firebase.services'
const InscriptionPage: NextPage = () => {
    const router = useRouter()
    const { id } = router.query
    const [files, setFiles] = useState()
    const state = SignUpStore.useState(s => s)

    useEffect(() => {
        ;(async () => {
            if (id) {
                const company = await businessService.getCompany(id.toString())
                if(!company){
                    console.error('No id provided')
                    router.push('/')
                }else{
                    firebaseManager.getFilesByProvider(company).then((res: any) => {
                        setFiles(res)
                    })
                    SignUpStore.update(s => {
                        s.datosEmpresa = company
                        s.loading = false
                    })
                }
                
            }
        })()
    }, [id])

    return (
        <>
            {state.loading ? (
                <Loader />
            ) : (
                <Inscription filesOpts={files} readonly={true}></Inscription>
            )}
        </>
    )
}

export default InscriptionPage
