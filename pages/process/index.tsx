import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Header from '../../components/header'
import Container from '../../components/container'
import { workflowService } from '../../services/workflow.service'
import _ from 'lodash'
import moment from 'moment'
import { useRouter } from 'next/router'
import InternalContainer from '../../components/container/internal'
import MainContainer from '../../components/container/main'
import Loading from '../../components/loader'
const Page: NextPage = () => {
    const [list, setList] = useState<Array<WorkflowProcess>>()
    const router = useRouter()

    useEffect(() => {
        workflowService.getActiveProcess().then(result => setList(result))
    }, [])

    return (
        <MainContainer>
            <Header />
            <Container>
                {!list ? (
                    <Loading />
                ) : (
                    <InternalContainer title="Procesos Activos">
                        <div>
                            <div className="overflow-x-auto">
                                <table className="table w-full table-zebra">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Tipo</th>
                                            <th>Referencia</th>
                                            <th>Fecha Solicitud</th>
                                            <th>Presentado por</th>
                                            <th>Tarea a realizar</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {list.map((wp: WorkflowProcess, i) => (
                                            <tr key={`form${i + 1}`}>
                                                <th>{i + 1}</th>
                                                <td>
                                                    {wp.evidence[0].form.title}
                                                </td>
                                                <td>{'Falta referenia'}</td>
                                                <td>
                                                    {moment(
                                                        wp.createdAt
                                                    ).format(
                                                        'DD/MM/YYYY HH:mm'
                                                    )}
                                                </td>
                                                <td>{wp.creator.name}</td>
                                                <td>
                                                    <button
                                                        onClick={() =>
                                                            router.push(
                                                                `/process/${wp.id}`
                                                            )
                                                        }
                                                        className="btn btn-sm"
                                                    >
                                                        {
                                                            wp.descriptionCurrentStep
                                                        }
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </InternalContainer>
                )}
            </Container>
        </MainContainer>
    )
}

export default Page
