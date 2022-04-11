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
import { ruleEngine } from '../../services/rule.engine.service'
import { getToken, tokenDecode } from '../../services/auth.service'
const Page: NextPage = () => {
    const [list, setList] = useState<Array<WorkflowProcess>>()
    const router = useRouter()
    const [processes, setProcesses] = useState<Array<WorkflowSpec>>([])

    useEffect(() => {
        workflowService
            .getActiveProcess()
            .then(result => setList(result))
            .catch(err => {
                router.push('/503')
                return
            })

        workflowService.getList().then(async wList => {
            const _process = []
            for (const index in wList) {
                const rule = await ruleEngine.execute(wList[index].ruleAsset, {
                    role: tokenDecode(getToken() as string)
                        ? tokenDecode(getToken() as string).role
                        : '',
                    signal: 'START'
                })

                if (rule['0'].result) {
                    _process.push(wList[index])
                }

                // console.log(rule)
            }

            setProcesses(_process)
        })
    }, [])

    const Empty = () => {
        return (
            <div className="hero min-h-screen bg-gray-100">
                <div className="text-center hero-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">
                            Bienvenido!!{' '}
                        </h1>
                        <p className="mb-5">
                            Aun no tienes ningun proceso iniciado. Para iniciar
                            uno, por favor haz click en el boton de Nuevo
                            Proceso
                        </p>
                        <div className="dropdown">
                            <div tabIndex={0} className="m-1 btn">
                                Nuevo Proceso
                            </div>
                            <ul
                                tabIndex={0}
                                className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
                            >
                                {processes.map((p, index: number) => (
                                    <li
                                        onClick={() =>
                                            router.push(
                                                `/process/new?wfid=${p.id}`
                                            )
                                        }
                                        key={`form${index}`}
                                    >
                                        <a>{p.ref}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const FilledTable = () => {
        return (
            <InternalContainer
                title="Procesos Activos"
                actions={
                    !_.isEmpty(processes) ? (
                        <div className="dropdown">
                            <div tabIndex={0} className="m-1 btn">
                                Nuevo Proceso
                            </div>
                            <ul
                                tabIndex={0}
                                className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
                            >
                                {processes.map((p, index: number) => (
                                    <li
                                        onClick={() =>
                                            router.push(
                                                `/process/new?wfid=${p.id}`
                                            )
                                        }
                                        key={`form${index}`}
                                    >
                                        <a>{p.ref}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <></>
                    )
                }
            >
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
                                {list &&
                                    list.map((wp: WorkflowProcess, i) => (
                                        <tr key={`form${i + 1}`}>
                                            <th>{i + 1}</th>
                                            <td>
                                                {wp.evidence &&
                                                    wp.evidence[0].form.title}
                                            </td>
                                            <td>
                                                {wp.evidence[0].data
                                                    .referencia ||
                                                    wp.evidence[0].data.cuit}
                                            </td>
                                            <td>
                                                {moment(wp.createdAt).format(
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
                                                    {wp.descriptionCurrentStep}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </InternalContainer>
        )
    }
    return (
        <MainContainer>
            <Header />
            <Container>
                {!list ? (
                    <Loading />
                ) : _.isEmpty(list) ? (
                    <Empty />
                ) : (
                    <FilledTable />
                )}
            </Container>
        </MainContainer>
    )
}

export default Page
