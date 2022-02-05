import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Container from '../../../components/container'
import { workflowService } from '../../../services/workflow.service'
import InternalPage from '../../../components/container/internal'
import Header from '../../../components/header'
import { useRouter } from 'next/router'

const Page: NextPage = () => {
    const [list, setList] = useState<Array<WorkflowSpec>>([])
    const router = useRouter()
    useEffect(() => {
        workflowService.getList().then(result => setList(result))
    }, [])

    return (
        <div>
            <Header />
            <Container>
                <InternalPage
                    title="Workflows"
                    actions={
                        <button
                            onClick={() =>
                                router.push('/settings/workflow/new')
                            }
                            className="btn btn-primary"
                        >
                            Nuevo workflow
                        </button>
                    }
                >
                    <table className="table w-full table-zebra">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Referencia</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((invite, index) => (
                                <tr key={`invite${index}`}>
                                    <td>{invite.id}</td>
                                    <td>{invite.ref}</td>
                                    <td>{invite.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </InternalPage>
            </Container>
        </div>
    )
}

export default Page
