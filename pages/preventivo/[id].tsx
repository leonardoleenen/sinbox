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
import { preventivoService } from '../../services/preventivo.service'
import ReactDataSheet from 'react-datasheet'
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })
const PlotlyRenderers = createPlotlyRenderers(Plot)
import { customAlphabet } from 'nanoid'
import { workflowService } from '../../services/workflow.service'
const Page: NextPage = () => {
    const [tarriffs, setTarriffs] = useState([])
    const [values, setValues] = useState<Array<any>>([])
    const [proveedores, setProveedores] = useState([])
    const [value, setValue] = useState()
    const [grid, setGrid] = useState([])
    const [isSaving, setIsSaving] = useState(false)
    const [selectedProveedor, setSelectedProveedor] = useState('')
    const [selectedProvincia, setSelectedProvincia] = useState('')
    const [isSoliciting, setIsSoliciting] = useState(false)
    const [showPlanificacionActiva, setShowPlanificacionActiva] = useState(true)
    const [preventivo, setPreventivo] = useState({
        id: '',
        referencia: '',
        mes: 'enero',
        anio: '2022',
        title: 'Sin Nombre',
        status: 'draft',
        medio: '',
        payload: []
    })
    const router = useRouter()

    const { id } = router.query
    useEffect(() => {
        planificacionService.getTarriffs().then(result => {
            setTarriffs(result)
            const temp: any = []
            result.forEach((r: any, index: number) => {
                r.tarifas.forEach((t: any) => {
                    temp.push({
                        id: r.razonSocial + r.cuit + t.programa,
                        razonSocial: r.razonSocial,
                        provincia: r.provincia,
                        cuit: r.cuit,
                        activo: false,
                        cantidadAsignada: t.cantidad || 0,
                        index,
                        grupo: 'GE1',
                        ...t,
                        segundosSeleccionados: 0,
                        days: Array.from(
                            { length: 31 },
                            (item, index) => index
                        ).map(v => 0)
                    })
                })
            })
            setProveedores(temp)
        })
    }, [])

    useEffect(() => {
        if (id && id !== 'new') {
            preventivoService.getPreventivo(id as string).then(result => {
                setPreventivo(result)
                setValues(result.payload)
            })
        }
    }, [id])

    const save = () => {
        setIsSaving(true)
        const nanoid = customAlphabet('1234567890abcdef', 6)
        preventivoService
            .savePreventivo({
                ...preventivo,
                id: preventivo.id || nanoid(),
                payload: values
            })
            .then(result => {
                setIsSaving(false)
                //console.log(result)
                setPreventivo(result)
            })
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })

    const seleccionarProveedor = (selected: boolean, id: string) => {
        if (selected)
            setValues([...values, proveedores.find((p: any) => p.id === id)])
        else {
            setValues(values.filter(p => p.id !== id))
        }
    }

    const calcularMenciones = (v: any) => {
        return v.days
            .filter((d: number) => d !== 0)
            .reduce(
                (acc: number, val: number) => (acc = Number(acc) + Number(val)),
                0
            )
    }

    const getStats = () => {
        const r: any = {}

        for (const i in values) {
            const importe = r[values[i].cuit] ? r[values[i].cuit].total : 0
            r[values[i].cuit] = {
                total:
                    importe +
                    calcularMenciones(values[i]) *
                        values[i].segundosSeleccionados *
                        values[i].importe,
                razonSocial: values[i].razonSocial + '/1'
            }
        }

        return (
            <div className="flex py-8 justify-center overflow-x-auto w-full">
                {Object.keys(r).map(k => (
                    <div key={k} className="stat shadow mx-4">
                        <div className="stat-desc">ID / Beneficiario</div>
                        <div className="stat-title">{r[k].razonSocial}</div>
                        <div className="stat-value">
                            {formatter.format(r[k].total)}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    const EnPlanificacion = () => {
        getStats()

        if (_.isEmpty(values))
            return (
                <div className="hero py-16 bg-base-200">
                    <div className="hero-content text-center">
                        <div className="max-w-md">
                            <h1 className="text-5xl font-bold">
                                No hay proveedores seleccionados
                            </h1>
                            <p className="py-6">
                                No ha seleccionado ningun proveedor. Por favor
                                haga click en Seleccionar Proveedores o bien en
                                el boton que dice Proveedores Disponibles
                            </p>
                            <button
                                onClick={() =>
                                    setShowPlanificacionActiva(false)
                                }
                                className="btn btn-primary"
                            >
                                Seleccionar proveedores
                            </button>
                        </div>
                    </div>
                </div>
            )
        return (
            <div
                className="overflow-x-auto overflow-y-auto w-full"
                style={{ height: '500px', width: '1200px' }}
            >
                <table className="table w-full table-compac">
                    <thead>
                        <tr>
                            <th>ID/Benef</th>
                            <th>Razon Social</th>
                            <th>Grupo</th>
                            <th>Importe Unit</th>
                            <th>Programa</th>
                            <th>Segundos</th>
                            <th>Menciones</th>
                            <th>Menciones x Seg</th>
                            <th>Total Pesos</th>
                            {Array.from(
                                { length: 30 },
                                (item, index) => index
                            ).map(v => (
                                <th key={`day${v}`}>{v + 1}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {values.map((v: any, row: number) => (
                            <tr
                                className={!v.activo ? 'bg-gray-50' : ''}
                                key={`${row}`}
                            >
                                <td>{`${v.razonSocial}/1`}</td>
                                <td>{v.razonSocial}</td>
                                <td>{v.grupo}</td>
                                <td>{formatter.format(v.importe)}</td>
                                <td>{v.programa}</td>
                                <td>
                                    <input
                                        value={v.segundosSeleccionados}
                                        onChange={e => {
                                            const cell: any = values[row]
                                            cell.segundosSeleccionados =
                                                e.target.value
                                            const listTemp: any[] =
                                                Object.assign([], values)
                                            listTemp[row] = cell
                                            setValues(listTemp)
                                        }}
                                        className="input input-bordered input-xs  w-16"
                                    />
                                </td>

                                <td>{calcularMenciones(v)}</td>
                                <td>
                                    {calcularMenciones(v) *
                                        v.segundosSeleccionados}
                                </td>
                                <td
                                    className={
                                        v.segundosSeleccionados !== 0 &&
                                        calcularMenciones(v) !== 0
                                            ? 'bg-green-100'
                                            : ''
                                    }
                                >
                                    {formatter.format(
                                        calcularMenciones(v) *
                                            v.segundosSeleccionados *
                                            v.importe
                                    )}
                                </td>
                                {Array.from(
                                    { length: 31 },
                                    (item, index) => index
                                ).map(day => (
                                    <td key={`day${day}`}>
                                        <input
                                            type="number"
                                            value={v.days[day]}
                                            onChange={e => {
                                                const cell: any = values[row]
                                                cell.days[day] = e.target.value
                                                const listTemp: any[] =
                                                    Object.assign([], values)
                                                listTemp[row] = cell
                                                setValues(listTemp)
                                            }}
                                            placeholder="0"
                                            className="input input-bordered input-xs  w-12"
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
    const ListaProveedores = () => {
        const filterByProvincia = (e: any) => {
            if (e.provincia === selectedProvincia || selectedProvincia == '')
                return e
        }
        const filterByProveedor = (e: any) => {
            if (e.cuit === selectedProveedor || selectedProveedor === '')
                return e
        }
        return (
            <div
                className="overflow-x-auto overflow-y-auto w-full"
                style={{ height: '500px' }}
            >
                <div className="flex w-full justify-between mb-4">
                    <select
                        className="select select-bordered w-full max-w-xs"
                        defaultValue={selectedProvincia}
                        onChange={e => setSelectedProvincia(e.target.value)}
                    >
                        <option disabled selected value="">
                            Listar por Provincia
                        </option>
                        <option value="">Todos</option>
                        <option>Santa Fe</option>
                        <option>Buenos Aires</option>
                    </select>
                    <select
                        className="select select-bordered w-full max-w-xs"
                        defaultValue={selectedProveedor}
                        onChange={e => {
                            setSelectedProveedor(e.target.value)
                        }}
                    >
                        <option disabled selected value="">
                            Listar por Proveedores
                        </option>
                        <option value="">Todos</option>
                        {proveedores.map((proveedor: any) => {
                            return (
                                <option
                                    key={proveedor.cuit}
                                    value={proveedor.cuit}
                                >
                                    {proveedor.razonSocial}
                                </option>
                            )
                        })}
                    </select>
                    <div className="w-64 flex">
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Search…"
                                className="input input-bordered"
                            />
                            <button className="btn btn-square">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <table className="table w-full table-compac">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Razon Social</th>
                            <th>Programa</th>
                            <th>Unidad</th>
                            <th>Importe Unit</th>
                        </tr>
                    </thead>

                    <tbody>
                        {proveedores
                            .filter(filterByProvincia)
                            .filter(filterByProveedor)
                            .map((v: any, row: number) => (
                                <tr
                                    className={!v.activo ? 'bg-gray-50' : ''}
                                    key={`${row}`}
                                >
                                    <td>
                                        <input
                                            type="checkbox"
                                            className="toggle"
                                            checked={v.activo}
                                            onChange={e => {
                                                const cell: any =
                                                    proveedores[row]
                                                cell.activo = e.target.checked
                                                const listTemp: any[] =
                                                    Object.assign(
                                                        [],
                                                        proveedores
                                                    )
                                                listTemp[row] = cell
                                                setProveedores(listTemp as any)
                                                seleccionarProveedor(
                                                    e.target.checked,
                                                    v.id
                                                )
                                            }}
                                        />
                                    </td>
                                    <td>{v.razonSocial}</td>
                                    <td>{v.programa}</td>
                                    <td>{v.unidad}</td>
                                    <td>{formatter.format(v.importe)}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        )
    }
    return (
        <ClearContainer
            className=""
            title={preventivo.title}
            headTitle={'Edición de preventivo'}
            onChangeTitle={(val: string) =>
                setPreventivo({
                    ...preventivo,
                    title: val
                })
            }
            actions={
                <div className="flex">
                    <button
                        className="btn btn-error mx-3"
                        onClick={() => router.push('//preventivo')}
                    >
                        volver
                    </button>
                    {preventivo.status === 'draft' && (
                        <button
                            className={`btn btn-primary ${
                                isSaving && 'loading'
                            }`}
                            disabled={
                                preventivo.title !== '' &&
                                preventivo.referencia !== '' &&
                                preventivo.anio !== '' &&
                                preventivo.mes !== '' &&
                                values.length > 0
                                    ? false
                                    : true
                            }
                            onClick={save}
                        >
                            Guardar
                        </button>
                    )}

                    {preventivo.status == 'draft' && (
                        <button
                            className={`btn btn-active mx-3 ${
                                isSaving && 'loading'
                            }`}
                            disabled={preventivo.id === '' ? true : false}
                            onClick={async () => {
                                setIsSoliciting(true)
                                const data: any = {
                                    asignado: 1,
                                    cantidadMedios: 3,
                                    detalle: 'detalle',
                                    disponible: 1,
                                    estado: 'estado',
                                    fechaBaja: '2022-03-16',
                                    fechaDesde: '2022-03-16',
                                    fechaHasta: '2022-03-16',
                                    fechaRegistro: '2022-03-16',
                                    mediosAsignados: [],
                                    nombre: 'nombre',
                                    preventivoNro: preventivo.id,
                                    utilizado: 1
                                }
                                const r: any = {}

                                for (const i in values) {
                                    const importe = r[values[i].cuit]
                                        ? r[values[i].cuit].total
                                        : 0
                                    data.mediosAsignados.push({
                                        cuit: values[i].cuit,
                                        programa: values[i].programa,
                                        montoAsignado:
                                            importe +
                                            calcularMenciones(values[i]) *
                                                values[i]
                                                    .segundosSeleccionados *
                                                values[i].importe,
                                        medio: values[i].razonSocial
                                    })
                                }

                                await workflowService.createProcess(
                                    await workflowService.getSpec('WrHWs4NumN'),
                                    data,
                                    await workflowService.getFormSpec(
                                        'rEmxH6U2EH'
                                    )
                                )
                                await preventivoService.setWaitingPreventivo(
                                    preventivo.id
                                )
                                setIsSoliciting(false)
                                router.back()
                            }}
                        >
                            Solicitar preventivo
                        </button>
                    )}
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
                                placeholder="Referencia"
                                value={preventivo.referencia}
                                onChange={e =>
                                    setPreventivo({
                                        ...preventivo,
                                        referencia: e.target.value
                                    })
                                }
                                className="input w-full w-64 input-bordered"
                            />
                        </div>
                        <select
                            className="select w-full max-w-xs select-bordered ml-4"
                            onChange={e => {
                                setPreventivo({
                                    ...preventivo,
                                    medio: e.target.value
                                })
                            }}
                            value={preventivo.medio}
                        >
                            <option disabled selected>
                                Medio
                            </option>
                            <option value="TV">TV</option>
                            <option value="RADIO">RADIO</option>
                            {/* <option value="WEB">WEB</option>
                            <option value="VIA PUBLICA">VIA PUBLICA</option>*/}
                        </select>
                        <select
                            onChange={e => {
                                setPreventivo({
                                    ...preventivo,
                                    mes: e.target.value
                                })
                            }}
                            value={preventivo.mes}
                            className="select w-full max-w-xs select-bordered ml-4"
                        >
                            <option value="none" disabled selected hidden>
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
                                setPreventivo({
                                    ...preventivo,
                                    anio: e.target.value
                                })
                            }}
                            value={preventivo.anio}
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
                {/* <div className="text-2xl font-semibold  pt-8 pb-4">
                    Simulador
                </div>
                <div className="flex ">
                    

                    <div>
                        <PivotTableUI
                            data={values.filter(v => v.activo)}
                            onChange={s => setValue(s)}
                            {...value}
                            renderers={Object.assign(
                                {},
                                TableRenderers,
                                PlotlyRenderers
                            )}
                        />
                    </div>
                            </div> */}

                {getStats()}

                <div className="text-2xl font-semibold pt-8 pb-4">
                    Cuadros Tarifarios
                </div>
                <div className="tabs tabs-boxed mb-8 bg-white">
                    <a
                        className={`tab ${
                            showPlanificacionActiva && 'tab-active'
                        }`}
                        onClick={() => setShowPlanificacionActiva(true)}
                    >
                        Planficacion Activa
                    </a>
                    <a
                        className={`tab ${
                            !showPlanificacionActiva && 'tab-active'
                        }`}
                        onClick={() => setShowPlanificacionActiva(false)}
                    >
                        Proveedores Disponibles
                    </a>
                </div>
                {showPlanificacionActiva ? (
                    <EnPlanificacion />
                ) : (
                    <ListaProveedores />
                )}
            </div>
        </ClearContainer>
    )
}

export default Page
