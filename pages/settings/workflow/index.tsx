import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Container from '../../../components/container'
import { workflowService } from '../../../services/workflow.service'
const Page: NextPage = () => {
    const [list, setList] = useState<Array<WorkflowSpec>>([])
    useEffect(() => {
        workflowService.getList().then(result => setList(result))
    }, [])

    return (
        <div>
            <Container>
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
            </Container>
        </div>
    )
}

export default Page
