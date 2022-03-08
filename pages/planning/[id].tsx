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
        title: 'Sin Nombre',
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

    useEffect(() => {
        if (id && id !== 'new') {
            planificacionService.getPlanificacion(id as string).then(result => {
                setPlanificacion(result)
            })
        }
    }, [id])

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
            title={planificacion.title}
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
                                        campania: e.target.value
                                    })
                                }
                                className="input w-full w-64 input-bordered"
                            />
                        </div>
                        <select className="select w-full max-w-xs select-bordered ml-4">
                            <option disabled selected>
                                Medio
                            </option>
                            <option value="TV">TV</option>
                            <option value="RADIO">RADIO</option>
                            <option value="WEB">WEB</option>
                            <option value="VIA PUBLICA">VIA PUBLICA</option>
                        </select>
                        <select
                            onChange={e => {
                                setPlanificacion({
                                    ...planificacion,
                                    mes: e.target.value
                                })
                            }}
                            value={planificacion.mes}
                            className="select w-full max-w-xs select-bordered ml-4"
                        >
                            <option disabled selected>
                                Mes
                            </option>
                            <option value="Enero">Enero</option>
                            <option value="Febrero">Febrero</option>
                            <option value="Marzo">Marzo</option>
                            <option value="Abril">Abril</option>
                            <option value="Mayo">Mayo</option>
                            <option value="Junio">Junio</option>
                            <option value="Junio">Junio</option>
                            <option value="Agosto">Agosto</option>
                            <option value="Septiembre">Septiembre</option>
                            <option value="Octubre">Octubre</option>
                            <option value="Noviembre">Noviembre</option>
                            <option value="Diciembre">Diciembre</option>
                        </select>
                        <select
                            onChange={e => {
                                setPlanificacion({
                                    ...planificacion,
                                    anio: e.target.value
                                })
                            }}
                            value={planificacion.anio}
                            className="select w-full max-w-xs select-bordered ml-4"
                        >
                            <option disabled selected>
                                Año
                            </option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
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
