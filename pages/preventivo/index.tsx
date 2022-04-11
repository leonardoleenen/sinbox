import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Header from '../../components/header'
import Container from '../../components/container'
import InternalContainer from '../../components/container/internal'
import { useRouter } from 'next/router'
import moment from 'moment'
import { preventivoService } from '../../services/preventivo.service'
import Table from '../../components/Table'

const Page: NextPage = () => {
    const router = useRouter()
    const [preventivos, setPreventivos] = useState<Array<any>>([])
    const [x_axis, setXAxis] = useState<Array<any>>([])
    const y_axis = [
        {
            title: 'Nro prev',
            index: 'nro_prev'
        },
        {
            title: 'Titulo',
            index: 'titulo'
        },
        {
            title: 'Tipo de medio',
            index: 'tipo_medio'
        },
        {
            title: 'Estado',
            index: 'estado'
        },
        {
            title: 'Cuando',
            index: 'cuando'
        },
        {
            title: 'Creado',
            index: 'creado'
        },
        {
            title: 'Actualizado',
            index: 'actualizado'
        },
        {
            title: '',
            index: 'custom'
        }
    ]
    useEffect(() => {
        preventivoService.getPreventivos().then(result => {
            setPreventivos(result)
            result.forEach((p: any) => {
                setXAxis([
                    ...x_axis,
                    {
                        nro_prev: p.status !== 'draft' ? p.id : '-',
                        titulo: p.title,
                        tipo_medio: p.medio,
                        estado: p.status,
                        cuando: `${p.mes} - ${p.anio}`,
                        creado: moment(p.createdAt).format(
                            'DD/MM/YYYY HH:mm:ss'
                        ),
                        actualizado: moment(p.updatedAt).format(
                            'DD/MM/YYYY HH:mm:ss'
                        ),
                        custom: (
                            <div>
                                <button
                                    className="btn btn-sm"
                                    onClick={() =>
                                        router.push(`/preventivo/${p.id}`)
                                    }
                                >
                                    Ver
                                    {`${
                                        p.status === 'draft' ? ' y editar' : ''
                                    } `}
                                </button>
                                {p.status === 'approved' && (
                                    <button
                                        className="btn btn-sm ml-4"
                                        onClick={() =>
                                            router.push(`/preventivo/new`)
                                        }
                                    >
                                        Ampliar
                                    </button>
                                )}
                            </div>
                        )
                    }
                ])
            })
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
                    <Table y_axis={y_axis} x_axis={x_axis} itemsPerPage={2} />
                </InternalContainer>
            </Container>
        </div>
    )
}

export default Page
