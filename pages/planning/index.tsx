import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Header from '../../components/header'
import Container from '../../components/container'
import InternalContainer from '../../components/container/internal'
import { planificacionService } from '../../services/planificacion.service'
import { useRouter } from 'next/router'
import moment from 'moment'

const Page: NextPage = () => {
    const router = useRouter()
    const [planificaciones, setPlanificaciones] = useState([])
    useEffect(() => {
        planificacionService
            .getPanificaciones()
            .then(result => setPlanificaciones(result))
    }, [])

    console.log(planificaciones)
    return (
        <div>
            <Header />
            <Container>
                <InternalContainer
                    title="Planificación"
                    actions={
                        <button
                            className="btn btn-primary"
                            onClick={() => router.push('/planning/new')}
                        >
                            Nueva planificación
                        </button>
                    }
                >
                    <div>
                        <div className="overflow-x-auto">
                            <table className="table w-full table-zebra">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Tipo Medio</th>
                                        <th>Titulo</th>
                                        <th>Campaña</th>
                                        <th>Cuando</th>
                                        <th>Creado</th>
                                        <th>Actualizado</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {planificaciones.map((p: any, i) => (
                                        <tr key={`form${i + 1}`}>
                                            <th>{i + 1}</th>
                                            <td>Radio</td>
                                            <td>{p.title}</td>
                                            <td>{p.campania}</td>
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
                                                            `/planning/${p.id}`
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
                    </div>
                </InternalContainer>
            </Container>
        </div>
    )
}

export default Page
