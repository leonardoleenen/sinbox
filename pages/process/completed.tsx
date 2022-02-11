import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Container from '../../components/container'
import InternalPage from '../../components/container/internal'
import Header from '../../components/header'
import { workflowService } from '../../services/workflow.service'
import { useRouter } from 'next/router'

const Page: NextPage = () => {
    const [process, setProcess] = useState<Array<WorkflowProcess>>([])
    const router = useRouter()
    useEffect(() => {
        workflowService.getCompletedProcess().then(r => setProcess(r))
    }, [])
    return (
        <div>
            <Header />
            <Container>
                <InternalPage title="Procedimientos completados">
                    <div>
                        <table className="table w-full table-zebra">
                            <thead>
                                <tr>
                                    <th>Tipo</th>
                                    <th>Referencia</th>
                                    <th>Fecha Solicitud</th>
                                    <th>Presentado por</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {process.map(p => (
                                    <tr key={`${p.id}`}>
                                        <td>{p.spec.ref}</td>
                                        <td>{p.evidence[0].data.referencia}</td>
                                        <td>{p.createdAt}</td>
                                        <td>{p.creator.name}</td>
                                        <td>
                                            <button
                                                onClick={() =>
                                                    router.push(
                                                        '/process/' + p.id
                                                    )
                                                }
                                                className="btn btn-neutral btn-sm"
                                            >
                                                Ver
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </InternalPage>
            </Container>
        </div>
    )
}

export default Page
