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

const Page: NextPage = () => {
    const router = useRouter()
    const state = InboxStore.useState(s => s)
    const [companyId, setCompanyId] = useState<string>()
    const [showCompanyData, setShowCompanyData] = useState(false)
    const [showToPreview, setShowToPreview] = useState(false)
    const [legalFormToSign, setLegalFormToSign] = useState<any>(null)
    const [actionType, setActionType] = useState<any>('CHECK')

    const loadData = () => {
        businessService.getLegalFormForInbox().then(qs => {
            InboxStore.update(s => {
                s.legalForms = qs.docs.map(d => d.data()) as any
            })
        })
    }
    useEffect(() => {
        loadData()
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

    const onActionChange = (e: any, index: number) => {
        state.legalForms[index]
        setActionType(e.target.value)
        setLegalFormToSign(state.legalForms[index])
        setShowToPreview(true)
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
                                {state.legalForms.map((lf: LegalForm, i) => (
                                    <tr key={`form${i + 1}`}>
                                        <th>{i + 1}</th>
                                        <td>{lf.metadata.friendlyName}</td>
                                        <td>{lf.metadata.refForm}</td>
                                        <td>
                                            {moment(
                                                lf.creator.createdAt
                                            ).format('DD/MM/YYYY HH:mm')}
                                        </td>
                                        <td>{lf.creator.createdBy.cn}</td>
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
                                                {lf.status === 'NEW' && (
                                                    <option value="CHECK">
                                                        Revisar
                                                    </option>
                                                )}
                                                <option value="CHECK AND APPROVE">
                                                    Revisar y aprobar
                                                </option>
                                                <option value="CHECK AND REJECT">
                                                    Revisar y rechazar
                                                </option>
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
