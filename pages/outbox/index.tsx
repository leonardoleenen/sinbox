import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Header from '../../components/header'
import { businessService } from '../../services/business.service'
import Container from '../../components/container'
import moment from 'moment'
import LegalFormPreview from '../../components/legalForm/preview'

const Page: NextPage = () => {
    const [list, setList] = useState<Array<LegalForm>>([])
    const [showToPreview, setShowToPreview] = useState(false)
    const [legalForm, setLegalForm] = useState<any>(null)

    useEffect(() => {
        businessService.getLegalFormForOutBox().then(result => {
            setList(result.docs.map(d => d.data() as any))
        })
    }, [])

    const OutBoxContent = () => {
        return (
            <div>
                <Header />
                <Container>
                    <div className="my-6">
                        <h2 className="text-2xl mb-2 leading-tight font-bold font-heading">
                            Bandeja de salida
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
                                {list.map((lf: LegalForm, i) => (
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
                                            <div
                                                className="cursor-pointer"
                                                onClick={() => {
                                                    setShowToPreview(true)
                                                    setLegalForm(lf)
                                                }}
                                            >
                                                Ver documento
                                            </div>
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

    return (
        <div>
            {showToPreview ? (
                <LegalFormPreview
                    onClose={() => {
                        setShowToPreview(false)
                    }}
                    actionType="READONLY"
                    legalForm={legalForm}
                />
            ) : (
                <OutBoxContent />
            )}
        </div>
    )
}

export default Page
