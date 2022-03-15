import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Header from '../../components/header'
import Container from '../../components/container'
import InternalContainer from '../../components/container/internal'
import { useRouter } from 'next/router'
import moment from 'moment'
import { preventivoService } from '../../services/preventivo.service'

const Page: NextPage = () => {
    const router = useRouter()
    const [preventivos, setPreventivos] = useState<any>([])
    useEffect(() => {
        preventivoService.getPreventivos().then(result => {
            setPreventivos(result)
        })
    }, [])
    return (
        <div>
            <Header />
            <Container>
                <InternalContainer
                    title="Preventivos"
                    actions={
                        <button
                            className="btn btn-primary"
                            onClick={() => router.push('/preventivo/new')}
                        >
                            Nuevo Preventivo
                        </button>
                    }
                >
                    <div>
                        <div className="overflow-x-auto">
                            <table className="table w-full table-zebra">
                                <thead>
                                    <tr>
                                        <th>Nro prev</th>
                                        <th>Titulo</th>
                                        <th>Estado</th>
                                        <th>Cuando</th>
                                        <th>Creado</th>
                                        <th>Actualizado</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {preventivos.map((p: any, i: number) => (
                                        <tr key={`form${i + 1}`}>
                                            <th>
                                                {p.status !== 'draft'
                                                    ? p.id
                                                    : '-'}
                                            </th>
                                            <td>{p.title}</td>
                                            <td>{p.status}</td>
                                            <td>{`${p.mes} - ${p.anio}`}</td>
                                            <td>
                                                {moment(p.createdAt).format(
                                                    'DD/MM/YYYY HH:mm:ss'
                                                )}
                                            </td>
                                            <td>
                                                {moment(p.updatedAt).format(
                                                    'DD/MM/YYYY HH:mm:ss'
                                                )}
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-sm"
                                                    onClick={() =>
                                                        router.push(
                                                            `/preventivo/${p.id}`
                                                        )
                                                    }
                                                >
                                                    Ver
                                                    {`${
                                                        p.status === 'draft'
                                                            ? ' y editar'
                                                            : ''
                                                    } `}
                                                </button>
                                                {p.status === 'approved' && (
                                                    <button
                                                        className="btn btn-sm ml-4"
                                                        onClick={() =>
                                                            router.push(
                                                                `/preventivo/new`
                                                            )
                                                        }
                                                    >
                                                        Ampliar
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </InternalContainer>
            </Container>
        </div>
    )
}

export default Page
