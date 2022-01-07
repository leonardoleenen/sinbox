import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Header from '../../components/header'
import Container from '../../components/container'
import { workflowService } from '../../services/workflow.service'
import _ from 'lodash'
import moment from 'moment'
import { useRouter } from 'next/router'

const Page: NextPage = () => {
    const [list, setList] = useState<Array<WorkflowProcess>>([])
    const router = useRouter()

    useEffect(() => {
        workflowService.getActiveProcess().then(result => setList(result))
    }, [])

    const gotToProcess = (process: WorkflowProcess) => {
        router.push(
            `/forms/simpleFiles?wkfId=${process.spec.id}&step=${process.nextStep.index}&processId=${process.id}`
        )
    }

    return (
        <div>
            <Header />
            <Container>
                <div className="my-6">
                    <h2 className="text-2xl mb-2 leading-tight font-bold font-heading">
                        Procesos activos
                    </h2>
                </div>

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
                                    <th>Accion</th>
                                </tr>
                            </thead>

                            <tbody>
                                {list.map((wp: WorkflowProcess, i) => (
                                    <tr key={`form${i + 1}`}>
                                        <th>{i + 1}</th>
                                        <td>{wp.spec.ref}</td>
                                        <td>{_.last(wp.steps)?.file.ref}</td>
                                        <td>
                                            {moment(wp.createdAt).format(
                                                'DD/MM/YYYY HH:mm'
                                            )}
                                        </td>
                                        <td>{wp.creator.name}</td>
                                        <td>
                                            <button
                                                onClick={() => gotToProcess(wp)}
                                                className="btn btn-success btn-sm"
                                            >
                                                {wp.nextStep.action.name}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Page
