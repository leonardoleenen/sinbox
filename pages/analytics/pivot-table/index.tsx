import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import PivotTableUI from 'react-pivottable/PivotTableUI'
import 'react-pivottable/pivottable.css'
import TableRenderers from 'react-pivottable/TableRenderers'
import dynamic from 'next/dynamic'
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers'
import _ from 'lodash'
import { analyticsService } from '../../../services/analytics.service'
import Container from '../../../components/container/index'
import InternalPage from '../../../components/container/internal'
import Header from '../../../components/header'

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })

const PlotlyRenderers = createPlotlyRenderers(Plot)

// see documentation for supported input formats
const data = [
    {
        proveedor: 'Cadena 3',
        provincia: 'Santa Fe',
        departamento: 'Santa Fe',
        programa: 'Uno de muchos',
        mes: 'julio',
        anio: 2020,
        totalMes: 30
    },
    {
        proveedor: 'Cadena 3',
        provincia: 'Santa Fe',
        departamento: 'Rosario',
        programa: 'Uno de muchos',
        mes: 'julio',
        anio: 2020,
        totalMes: 10
    }
]
const Page: NextPage = () => {
    const [value, setValue] = useState()
    const [data, setData] = useState([])
    const [services, setServices] = useState<
        Array<AnalyticsServicesRegistered>
    >([])

    useEffect(() => {
        analyticsService.getServicesRegistered().then(r => setServices(r))
    }, [])

    const fetchData = (service: AnalyticsServicesRegistered) => {
        service &&
            analyticsService
                .getData(service)
                .then(result => setData(result as any))
    }

    if (_.isEmpty(data))
        return (
            <div>
                <Header />
                <Container>
                    <div className="hero min-h-screen bg-base-200">
                        <div className="text-center hero-content">
                            <div className="max-w-md">
                                <h1 className="mb-5 text-5xl font-bold">
                                    Bienvenido
                                </h1>
                                <p className="mb-5">
                                    Bienvenido al módulo de analitica,
                                    exploración de datos con tablas pivoteantes.
                                    Para continuar por favor seleccione el
                                    servicio que desea consultar
                                </p>
                                <select
                                    onChange={e =>
                                        fetchData(
                                            services.find(
                                                s => s.id === e.target.value
                                            ) as AnalyticsServicesRegistered
                                        )
                                    }
                                    className="select select-bordered w-full max-w-xs"
                                >
                                    <option>Selecione un servicio</option>
                                    {services.map(s => (
                                        <option key={s.id} value={s.id}>
                                            {s.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        )
    return (
        <div>
            <Header />
            <Container>
                <InternalPage
                    title="Analytics"
                    actions={
                        <select
                            onChange={e =>
                                fetchData(
                                    services.find(
                                        s => s.id === e.target.value
                                    ) as AnalyticsServicesRegistered
                                )
                            }
                            className="select select-bordered w-full max-w-xs"
                        >
                            <option>Selecione un servicio</option>
                            {services.map(s => (
                                <option key={s.id} value={s.id}>
                                    {s.name}
                                </option>
                            ))}
                        </select>
                    }
                >
                    <PivotTableUI
                        data={data}
                        onChange={(s: any) => setValue(s)}
                        {...value}
                        renderers={Object.assign(
                            {},
                            TableRenderers,
                            PlotlyRenderers
                        )}
                    />
                </InternalPage>
            </Container>
        </div>
    )
}

export default Page
