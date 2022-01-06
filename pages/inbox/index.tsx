import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Container from '../../components/container'
import Header from '../../components/header'
import { businessService } from '../../services/business.service'
import { InboxStore } from '../../store/inbox.store'
import _ from 'lodash'
import moment from 'moment'
import LegalFormPreview from '../../components/legalForm/preview'
import { getToken, tokenDecode } from '../../services/auth.service'

const Page: NextPage = () => {
    const router = useRouter()
    const state = InboxStore.useState(s => s)
    const [companyId, setCompanyId] = useState<string>()
    const [showCompanyData, setShowCompanyData] = useState(false)
    const [showToPreview, setShowToPreview] = useState(false)
    const [legalFormToSign, setLegalFormToSign] = useState<any>(null)
    const [actionType, setActionType] = useState<any>('CHECK')
    const [user, setUser] = useState<User>()

    const loadData = () => {
        businessService.getLegalFormForInbox().then(qs => {
            InboxStore.update(s => {
                s.legalForms = qs.docs.map(d => d.data()) as any
            })
        })
    }

    useEffect(() => {
        loadData()
        const u = tokenDecode(getToken() as string)
        setUser(u)
    }, [])

    const DataCompanyModal = () => {
        return (
            <div className="h-screen w-screen">
                <div></div>
                <iframe
                    className="h-screen w-screen"
                    src={companyId && `/inscription?id=${companyId}`}
                />
            </div>
        )
    }

    const filterForms = (form: LegalForm) => {
        if (user?.role === 'CERT RECEPTIONIST' && form.status === 'APPROVED')
            return true
        if (user?.role === 'CERT SUPERVISOR' && form.status === 'TO CLOSE')
            return true

        if (user?.role === 'RECEPTIONIST' && form.status === 'NEW') return true

        if (user?.role === 'SUPERVISOR' && form.status === 'CHECK') return true

        return false
    }

    const onActionChange = (e: any, index: number) => {
        if (
            e.target.value === 'CHECK' &&
            state.legalForms[index].status === 'APPROVED'
        ) {
            router.push(`/registro/modulo1/?id=${state.legalForms[index].id}`)
            return
        }

        state.legalForms[index]
        setActionType(e.target.value)
        setLegalFormToSign(state.legalForms[index])
        setShowToPreview(true)

        /* if (e.target.value === 'AFORAR')
            alert(
                `Tramite aforado con  el número: ${parseInt(
                    Math.random() * (10000 - 100) + 100
                )}`
            )*/
    }

    const actionAllowed = (action: string, form: LegalForm) => {
        if (action === 'CHECK' && form.aforo && form.status === 'NEW')
            return true
        if (
            action === 'CHECK' &&
            form.status === 'APPROVED' &&
            user?.role === 'CERT RECEPTIONIST'
        )
            return true

        if (
            (action === 'CHECK AND APPROVE' || action === 'CHECK AND REJECT') &&
            (user?.role === 'CERT SUPERVISOR' || user?.role === 'SUPERVISOR')
        )
            return true

        if (
            action === 'AFORAR' &&
            user?.role === 'RECEPTIONIST' &&
            !form.aforo &&
            form.status === 'NEW'
        )
            return true
        return false
    }
    if (showCompanyData) return <DataCompanyModal />

    const InboxContent = () => {
        return (
            <>
                <Header />
                <Container>
                    <div className="my-6">
                        <h2 className="text-2xl mb-2 leading-tight font-bold font-heading">
                            Bandeja de tramites pendientes
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table w-full table-zebra">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Tipo</th>
                                    <th>Referencia</th>
                                    <th>Fecha Solicitud</th>
                                    <th>Presentado por</th>
                                    <th>Accion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.legalForms
                                    .filter(filterForms)
                                    .map((lf: LegalForm, i) => (
                                        <tr key={`form${i + 1}`}>
                                            <th>{i + 1}</th>
                                            <td>{lf.metadata.friendlyName}</td>
                                            <td>{lf.metadata.refForm}</td>
                                            <td>
                                                {moment(
                                                    lf.creator.createdAt
                                                ).format('DD/MM/YYYY HH:mm')}
                                            </td>
                                            <td>{lf.creator.createdBy.name}</td>
                                            <td>
                                                <select
                                                    onChange={(e: any) =>
                                                        onActionChange(e, i)
                                                    }
                                                    className="select select-bordered w-full max-w-xs"
                                                >
                                                    <option>
                                                        Elija una accion
                                                    </option>
                                                    {actionAllowed(
                                                        'AFORAR',
                                                        lf
                                                    ) && (
                                                        <option value="AFORAR">
                                                            Aforar
                                                        </option>
                                                    )}
                                                    {actionAllowed(
                                                        'CHECK',
                                                        lf
                                                    ) && (
                                                        <option value="CHECK">
                                                            Revisar
                                                        </option>
                                                    )}
                                                    {actionAllowed(
                                                        'CHECK AND APPROVE',
                                                        lf
                                                    ) && (
                                                        <option value="CHECK AND APPROVE">
                                                            Revisar y aprobar
                                                        </option>
                                                    )}
                                                    {actionAllowed(
                                                        'CHECK AND REJECT',
                                                        lf
                                                    ) && (
                                                        <option value="CHECK AND REJECT">
                                                            Revisar y rechazar
                                                        </option>
                                                    )}
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </Container>
            </>
        )
    }

    if (!user) return <>Waiting for user</>
    return (
        <div>
            {showToPreview ? (
                <LegalFormPreview
                    onClose={() => {
                        setShowToPreview(false)
                        loadData()
                    }}
                    actionType={actionType}
                    legalForm={legalFormToSign}
                />
            ) : (
                <InboxContent />
            )}
        </div>
    )
}

export default Page
