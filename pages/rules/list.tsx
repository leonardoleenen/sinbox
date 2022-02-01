import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Header from '../../components/header'
import Container from '../../components/container'
import InternalPage from '../../components/internalPage'
import { ruleEngine } from '../../services/rule.engine.service'
import { useRouter } from 'next/router'

const Page: NextPage = () => {
    const [list, setList] = useState([])
    const router = useRouter()

    useEffect(() => {
        ruleEngine.getAll().then(result => setList(result))
    }, [])

    return (
        <div>
            <Header />
            <Container>
                <InternalPage
                    title="Rule List"
                    rigthActions={
                        <button
                            className="btn btn-primary "
                            onClick={() => router.push('/rules/new')}
                        >
                            New Rule
                        </button>
                    }
                >
                    <div>
                        <div className="overflow-x-auto">
                            <table className="table w-full table-zebra">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Regla</th>
                                        <th>Accion</th>
                                        <th>ID</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {list.map((rule: RuleAsset, i: number) => (
                                        <tr key={`form${i + 1}`}>
                                            <th>{i + 1}</th>
                                            <td>{rule.description}</td>
                                            <td>
                                                <button
                                                    onClick={() =>
                                                        router.push(
                                                            `/rules/${rule.id}`
                                                        )
                                                    }
                                                    className="btn btn-primary btn-sm"
                                                >
                                                    Editar
                                                </button>
                                            </td>
                                            <td>{rule.id}</td>
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
