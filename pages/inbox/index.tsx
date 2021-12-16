import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Container from '../../components/container'
import Header from '../../components/header'
import { businessService } from '../../services/business.service'
import { InboxStore } from '../../store/inbox.store'
import _ from 'lodash'

const Page: NextPage = () => {
    const router = useRouter()
    const state = InboxStore.useState(s => s)
    const [companyId, setCompanyId] = useState<string>()
    const [showCompanyData, setShowCompanyData] = useState(false)
    useEffect(() => {
        businessService.getProviderPendingToApprove().then(qs => {
            InboxStore.update(s => {
                s.providersToApprove = qs.docs.map(d => d.data()) as any
            })
        })
    }, [])

    const selectCompany = async (cuit: string) => {
        setCompanyId(await businessService.getCompanyIdByCuit(cuit))
        setShowCompanyData(true)
    }

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
                                <th>Grupo Economico</th>
                                <th>Fecha Solicitud</th>
                                <th>Presentado por</th>
                                <th>Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.providersToApprove.map((e, i) => (
                                <tr key={`form${i + 1}`}>
                                    <th>{i + 1}</th>
                                    <td>Alta proveedor prensa</td>
                                    <td>{e.grupoEconomico}</td>
                                    <td>01/12/2021</td>
                                    <td>{e.representante.nombreApellido}</td>
                                    <td>
                                        <select
                                            onChange={() =>
                                                selectCompany(e.cuit.value)
                                            }
                                            className="select select-bordered w-full max-w-xs"
                                        >
                                            <option>Elija una accion</option>
                                            <option>Revisar </option>
                                            <option>Revisar y aprobar</option>
                                            <option>Revisar y rechazar</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <th>2</th>
                                <td>Alta proveedor prensa</td>
                                <td>FM Radio Santa Fe</td>
                                <td>01/12/2021</td>
                                <td>Francico Alvarez</td>
                                <td>
                                    <select className="select select-bordered w-full max-w-xs">
                                        <option>Elija una accion</option>
                                        <option>Revisar </option>
                                        <option>Revisar y aprobar</option>
                                        <option>Revisar y rechazar</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>3</th>
                                <td>Alta proveedor prensa</td>
                                <td>AM Radio Santa Fe</td>
                                <td>01/12/2021</td>
                                <td>Patricio Molina</td>
                                <td>
                                    <select className="select select-bordered w-full max-w-xs">
                                        <option>Elija una accion</option>
                                        <option>Revisar </option>
                                        <option>Revisar y aprobar</option>
                                        <option>Revisar y rechazar</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>4</th>
                                <td>Certificación servicios Prensa</td>
                                <td>AM Radio Santa Fe</td>
                                <td>03/12/2021</td>
                                <td>Patricio Molina</td>
                                <td>
                                    <select className="select select-bordered w-full max-w-xs">
                                        <option>Elija una accion</option>
                                        <option>Revisar </option>
                                        <option>Revisar y aprobar</option>
                                        <option>Revisar y rechazar</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Container>
        </div>
    )
}

export default Page
