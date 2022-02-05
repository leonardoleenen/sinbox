import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Header from '../../components/header'
import Container from '../../components/container'
import InternalPage from '../../components/internalPage'
import { workflowService } from '../../services/workflow.service'
import { useRouter } from 'next/router'

const Page: NextPage = () => {
    const [list, setList] = useState<Array<WorkFlowForm>>([])
    const router = useRouter()
    useEffect(() => {
        workflowService.getForms().then(result => setList(result))
    }, [])

    return (
        <div>
            <Header />
            <Container>
                <InternalPage
                    title="Form List"
                    rigthActions={
                        <button
                            className="btn btn-primary "
                            onClick={() => router.push('/forms/new')}
                        >
                            New Form
                        </button>
                    }
                >
                    <div>
                        <div className="overflow-x-auto">
                            <table className="table w-full table-zebra">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Titulo</th>
                                        <th>Descripcion</th>
                                        <th>ID</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {list.map((wf: WorkFlowForm, i) => (
                                        <tr key={`form${i + 1}`}>
                                            <th>{i + 1}</th>
                                            <td>{wf.title}</td>
                                            <td>{wf.subTitle}</td>
                                            <td>{wf.id}</td>
                                            <td>
                                                <button
                                                    onClick={() =>
                                                        router.push(
                                                            `/forms/${wf.id}`
                                                        )
                                                    }
                                                    className="btn btn-neutral btn-sm"
                                                >
                                                    Editar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </InternalPage>
            </Container>
        </div>
    )
}

export default Page
