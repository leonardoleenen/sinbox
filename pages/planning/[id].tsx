import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import ClearContainer from '../../components/container/clear'
import { planificacionService } from '../../services/planificacion.service'
import PivotTableUI from 'react-pivottable/PivotTableUI'
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers'
import 'react-pivottable/pivottable.css'
import TableRenderers from 'react-pivottable/TableRenderers'
import dynamic from 'next/dynamic'
import _ from 'lodash'
import { useRouter } from 'next/router'
import ReactDataSheet from 'react-datasheet'

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })
const PlotlyRenderers = createPlotlyRenderers(Plot)

const Page: NextPage = () => {
    const [tarriffs, setTarriffs] = useState([])
    const [values, setValues] = useState([])
    const [value, setValue] = useState()
    const [grid, setGrid] = useState([])

    const router = useRouter()

    useEffect(() => {
        planificacionService.getTarriffs().then(result => {
            setTarriffs(result)
            const temp = []
            result.forEach((r: any) => {
                r.tarifas.forEach((t: any) => {
                    temp.push({
                        razonSocial: r.razonSocial,
                        cuit: r.cuit,
                        ...t
                    })
                })
            })
            setValues(temp)
        })
    }, [])

    const hableOnChange = e => {
        console.log(e.target.value)
    }

    const values2Grid = vls => {
        const result = vls.map(v => {
            console.log(v)
            return Object.keys(v).map(k => {
                return {
                    value: v[k]
                }
            })
        })
        return result
    }

    if (_.isEmpty(values)) return <div></div>

    const Row = props => {
        return <div>{props.children}</div>
    }

    // console.log(values2Grid(values))

    return (
        <ClearContainer
            title="Sin Nombre"
            actions={
                <div className="flex">
                    <button
                        className="btn btn-error mx-3"
                        onClick={() => router.push('/planning')}
                    >
                        volver
                    </button>
                    <button className="btn btn-primary">Guardar</button>
                    <button className="btn btn-active mx-3">
                        Generar O.P.P
                    </button>
                </div>
            }
        >
            <div>
                <div className="flex ">
                    <div className="p-4">
                        <select
                            className="select w-full max-w-xs"
                            multiple
                            onChange={hableOnChange}
                            style={{ height: '350px' }}
                        >
                            <option disabled selected>
                                Proveedores seleccionados
                            </option>
                            {tarriffs.map((t: any) => (
                                <option key={t.cuit} value={t.cuit}>
                                    {t.razonSocial}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <PivotTableUI
                            data={values}
                            onChange={s => setValue(s)}
                            {...value}
                            renderers={Object.assign(
                                {},
                                TableRenderers,
                                PlotlyRenderers
                            )}
                        />
                    </div>
                </div>
                <div>
                    <ReactDataSheet
                        data={values2Grid(values)}
                        valueRenderer={cell => cell.value}
                        rowRenderer={props => (
                            <div>
                                <Row {...props} />
                            </div>
                        )}
                        onCellsChanged={changes => {
                            const gridTemp = grid.map(row => [...row])
                            changes.forEach(({ cell, row, col, value }) => {
                                grid[row][col] = { ...grid[row][col], value }
                            })
                            setGrid({ gridTemp })
                        }}
                    />
                </div>
            </div>
        </ClearContainer>
    )
}

export default Page
