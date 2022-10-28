import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Header from '../../components/header'
import Container from '../../components/container'
import InternalPage from '../../components/internalPage'
import { campaniaService } from '../../services/campania.service'

const Page: NextPage = () => {
    const router = useRouter()
    const [list, setList] = useState<Array<any>>([])

    useEffect(() => {
        campaniaService.getAll().then(values => {
            setList(values)
        })
    }, [])

    return (
        <div>
            <Header />
            <Container>
                <InternalPage
                    title="Campañas"
                    rigthActions={
                        <button
                            className="btn btn-primary "
                            onClick={() => router.push('/campania/new')}
                        >
                            Nueva Campaña
                        </button>
                    }
                >
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Nombre</th>
                                    <th>F. Inicio</th>
                                    <th>F. Fin </th>
                                    <th>Suspendida</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.titulo}</td>
                                        <td>{item.fechaInicio}</td>
                                        <td>{item.fechaFin}</td>
                                        <td>{item.suspendida ? 'Si' : 'No'}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-primary"
                                                onClick={() =>
                                                    router.push(
                                                        `/campania/${item.id}`
                                                    )
                                                }
                                            >
                                                Editar
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
