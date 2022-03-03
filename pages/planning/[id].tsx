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
    const [isSaving, setIsSaving] = useState(false)
    const [planificacion, setPlanificacion] = useState({
        id: '',
        campania: '',
        mes: '',
        anio: '',
        title: '',
        payload: []
    })

    const router = useRouter()

    const { id } = router.query
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

    const save = () => {
        setIsSaving(true)
        planificacionService
            .savePlanificacion({
                ...planificacion,
                payload: values
            })
            .then(result => {
                setIsSaving(false)
                //console.log(result)
                setPlanificacion(result)
            })
    }

    const values2Grid = vls => {
        const result = vls.map(v => {
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

    return (
        <ClearContainer
            className=""
            title="Sin Nombre"
            onChangeTitle={(val: string) =>
                setPlanificacion({
                    ...planificacion,
                    title: val
                })
            }
            actions={
                <div className="flex">
                    <button
                        className="btn btn-error mx-3"
                        onClick={() => router.push('/planning')}
                    >
                        volver
                    </button>
                    <button
                        className={`btn btn-primary ${isSaving && 'loading'}`}
                        onClick={save}
                    >
                        Guardar
                    </button>
                    <button className="btn btn-active mx-3">
                        Generar Borrador de Preventivo
                    </button>
                </div>
            }
        >
            <div className="">
                <div>
                    <div className="text-2xl font-semibold  pt-8 pb-4">
                        Datos de Cabecera
                    </div>
                    <div className="flex">
                        <div>
                            <input
                                type="text"
                                placeholder="Campaña"
                                value={planificacion.campania}
                                onChange={e =>
                                    setPlanificacion({
                                        ...planificacion,
                                        id: e.target.value
                                    })
                                }
                                className="input w-full w-64 input-bordered"
                            />
                        </div>
                        <select className="select w-full max-w-xs select-bordered ml-4">
                            <option disabled selected>
                                Medio
                            </option>
                            <option>TV</option>
                            <option>RADIO</option>
                            <option>WEB</option>
                            <option>VIA PUBLICA</option>
                        </select>
                        <select className="select w-full max-w-xs select-bordered ml-4">
                            <option disabled selected>
                                Mes
                            </option>
                            <option>Enero</option>
                            <option>Febrero</option>
                            <option>Marzo</option>
                            <option>Abril</option>
                            <option>Mayo</option>
                            <option>Junio</option>
                            <option>Julio</option>
                            <option>Agosto</option>
                            <option>Septiembre</option>
                            <option>Octubre</option>
                            <option>Noviembre</option>
                            <option>Diciembre</option>
                        </select>
                        <select className="select w-full max-w-xs select-bordered ml-4">
                            <option disabled selected>
                                Año
                            </option>
                            <option>2022</option>
                            <option>2023</option>
                            <option>2024</option>
                            <option>2025</option>
                        </select>
                    </div>
                </div>
                <div className="text-2xl font-semibold  pt-8 pb-4">
                    Simulador
                </div>
                <div className="flex ">
                    {/* <div className="p-4">
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
                            </div> */}

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

                <div className="text-2xl font-semibold pt-8 pb-4">
                    Cuadros Tarifarios
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
