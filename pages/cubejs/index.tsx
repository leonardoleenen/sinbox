import React from 'react'
import type { NextPage } from 'next'
import BarChart from '../../components/analytics/barChart'
import { useState } from 'react'
import Stats from '../../components/analytics/stats'

const Page: NextPage = () => {
    const [queryParams, setQueryParams] = useState({
        measures: ['']
    })
    return (
        <div>
            <div className="flex flex-col justify-center items-center">
                <h1 className="bold text-xl">Parametros de analiticas</h1>
                <select
                    name="filters"
                    value={queryParams.measures[0]}
                    onChange={e => {
                        setQueryParams({
                            measures: [e.target.value]
                        })
                    }}
                >
                    <option disabled selected value={''}>
                        Seleccione una opcion
                    </option>
                    <option value="Pasajeros.count">
                        Cantidad de pasajeros
                    </option>
                    <option value="Estaciones.count">
                        Cantidad de estaciones
                    </option>
                    <option value="Trenes.count">Cantidad de trenes</option>
                    <option value="Viajes.count">Cantidad de viajes</option>
                </select>
            </div>
            <BarChart query={queryParams} />
            <Stats query={queryParams} title="Test" subtitle="Subtitle test" />
        </div>
    )
}

export default Page
