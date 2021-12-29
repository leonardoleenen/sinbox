import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Container from '../../components/container'
import Header from '../../components/header'
import { businessService } from '../../services/business.service'
import { InboxStore } from '../../store/inbox.store'
import _ from 'lodash'
import moment from 'moment'

const Page: NextPage = () => {
    const router = useRouter()
    const state = InboxStore.useState(s => s)
    const [companyId, setCompanyId] = useState<string>()
    const [showCompanyData, setShowCompanyData] = useState(false)
    useEffect(() => {
        businessService.getLegalFormForInbox().then(qs => {
            InboxStore.update(s => {
                s.legalForms = qs.docs.map(d => d.data()) as any
            })
        })
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

    if (showCompanyData) return <DataCompanyModal />
    return (
        <div>
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
                            {state.legalForms.map((lf: LegalForm, i) => (
                                <tr key={`form${i + 1}`}>
                                    <th>{i + 1}</th>
                                    <td>{lf.metadata.friendlyName}</td>
                                    <td>{lf.metadata.refForm}</td>
                                    <td>
                                        {moment(lf.creator.createdAt).format(
                                            'DD/MM/YYYY HH:mm'
                                        )}
                                    </td>
                                    <td>Desconocido</td>
                                    <td>
                                        <select className="select select-bordered w-full max-w-xs">
                                            <option>Elija una accion</option>
                                            <option>Revisar </option>
                                            <option>Revisar y aprobar</option>
                                            <option>Revisar y rechazar</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Container>
        </div>
    )
}

export default Page
