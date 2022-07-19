import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import ClearContainer from '../../components/container/clear'
import { planificacionService } from '../../services/planificacion.service'

import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers'
import 'react-pivottable/pivottable.css'

import dynamic from 'next/dynamic'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { MultiSelect } from 'react-multi-select-component'
import { preventivoService } from '../../services/preventivo.service'

import { customAlphabet } from 'nanoid'
import Icon from '../../components/icon/index'
import { UIPlanningStore } from '../../store/planning.store'
import { workflowService } from '../../services/workflow.service'

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })
const PlotlyRenderers = createPlotlyRenderers(Plot)

const opcionEsCampanias = [
    { label: 'Billetera Santa Fe', value: 'billeteraSantaFe' },
    { label: 'COVID19 2022', value: 'covid192022' },
    { label: 'Genero', value: 'Genero', disabled: true },
    { label: 'Boleto Educativo', value: 'Boleto Educativo' },
    { label: 'Primer Empleo', value: 'Primer Empleo' },
    { label: 'Seguridad 911', value: 'Seguridad 911' },
    { label: 'Fraude', value: 'Fraude' },
    { label: 'Turismo Otoño', value: 'turismoOtoño' },
    { label: 'Partidas Online', value: 'Partidas Online' },
    { label: 'Obras Caminos Rurales', value: 'Obras Caminos Rurales' }
]

const Page: NextPage = () => {
    const [tarriffs, setTarriffs] = useState([])
    const [activeTab, setActiveTab] = useState('planificacionActiva')
    const [values, setValues] = useState<Array<any>>([])
    const [proveedores, setProveedores] = useState([])
    const [value, setValue] = useState()
    const [grid, setGrid] = useState([])
    const [isSaving, setIsSaving] = useState(false)
    const [showPlanificacionActiva, setShowPlanificacionActiva] = useState(true)
    const [preventivos, setPreventivos] = useState<Array<any>>([])
    const [rowSelected, setRowSelected] = useState<any>(null)
    const [procesandoOrdenes, setProcesandoOrdenes] = useState(false)
    const [beneficiarioSeleccionado, setBeneficiarioSeleccionado] =
        useState(null)
    const [planificacion, setPlanificacion] = useState({
        id: '',
        campania: '',
        mes: '',
        anio: '',
        title: 'Sin Nombre',
        payload: [],
        status: 'draft'
    })

    const router = useRouter()
    const { id } = router.query
    useEffect(() => {
        ;(async () => {
            const retrievedPreventivos =
                await preventivoService.getPreventivos()
            setPreventivos(retrievedPreventivos)
        })()
        planificacionService.getTarriffs().then(result => {
            setTarriffs(result as any)
            const temp: any = []
            result.forEach((r: any, index: number) => {
                r.tarifas.forEach((t: any) => {
                    temp.push({
                        id: r.razonSocial + r.cuit + t.programa,
                        razonSocial: r.razonSocial,
                        cuit: r.cuit,
                        activo: false,
                        cantidadAsignada: t.cantidad,
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
            planificacionService.getPlanificacion(id as string).then(result => {
                setPlanificacion(result)
                setValues(result.payload)
            })
        }
    }, [id])

    const save = () => {
        setIsSaving(true)
        const nanoid = customAlphabet('1234567890abcdef', 6)
        planificacionService
            .savePlanificacion({
                ...planificacion,
                status: 'draft',
                id: planificacion.id || nanoid(),
                payload: values
            })
            .then(result => {
                setIsSaving(false)
                //console.log(result)
                setPlanificacion(result)
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
                razonSocial: values[i].razonSocial + '/1',
                cuit: values[i].cuit
            }
        }

        return (
            <div className=" w-full overflow-x-auto">
                <div className="flex py-8 justify-center ">
                    {Object.keys(r).map(k => (
                        <div
                            key={k}
                            className="stat shadow mx-4"
                            style={{ width: '350px' }}
                        >
                            <div
                                className="stat-figure text-primary"
                                onClick={() =>
                                    setBeneficiarioSeleccionado(r[k].cuit)
                                }
                            >
                                {r[k].cuit === beneficiarioSeleccionado ? (
                                    <PencilFilled />
                                ) : (
                                    <PencilOutLinded />
                                )}
                            </div>
                            <div className="stat-desc">ID / Beneficiario</div>
                            <div className="stat-title">{r[k].razonSocial}</div>
                            <div className="stat-value">
                                {formatter.format(r[k].total)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const Campaign = () => {
        const campainSelected = UIPlanningStore.useState(
            s => s.campainsSelected
        )

        const id = rowSelected ? rowSelected.id : ''

        const campaniasSelecionadas = values
            .filter(v => v.id === id)
            .map(c => c.campania)
            .filter(c => c !== undefined)
            .map(v => v.value)

        return (
            <div>
                <MultiSelect
                    className="w-full"
                    options={opcionEsCampanias.filter(
                        v => campaniasSelecionadas.indexOf(v.value) === -1
                    )}
                    value={campainSelected}
                    onChange={(e: any) =>
                        UIPlanningStore.update(s => {
                            s.campainsSelected = e
                        })
                    }
                    labelledBy="Select"
                />
            </div>
        )
    }

    const BottonSeleccionarCampania = () => {
        const campainSelected = UIPlanningStore.useState(
            s => s.campainsSelected
        )

        const split = (rowsFilled: Array<any>) => {
            const index = values.map(m => m.id).indexOf(rowsFilled[0].id)
            const copyOfValues = [...values]
            copyOfValues[index].campania = rowsFilled[0].campania

            setValues(
                _.sortBy([...copyOfValues, ...rowsFilled.slice(1)], v => v.id)
            )

            UIPlanningStore.update(s => {
                s.campainsSelected = []
            })
        }

        return (
            <div className="modal-action">
                <label htmlFor="my-modal" className="btn btn-error">
                    Cancelar
                </label>
                <label
                    htmlFor="my-modal"
                    className="btn"
                    onClick={() => {
                        const rowsFilled = campainSelected.map(
                            (c: any, index: number) => {
                                return {
                                    ...(rowSelected as any),
                                    campania: c,
                                    days: Array(31).fill(0),
                                    segundosSeleccionados: 0
                                }
                            }
                        )
                        split(rowsFilled)
                    }}
                >
                    Definir campañas
                </label>
            </div>
        )
    }

    const EnPlanificacion = () => {
        if (_.isEmpty(values))
            return (
                <div className="hero py-16 bg-base-200">
                    <div className="hero-content text-center">
                        <div className="max-w-md">
                            <h1 className="text-5xl font-bold">
                                Sin planificaciones
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
                style={{ height: '500px', width: '100%' }}
            >
                <input type="checkbox" id="my-modal" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box  w-11/12 max-w-5xl ">
                        <h3 className="font-bold text-lg">
                            Configuración de campañas
                        </h3>
                        <div className="flex w-full pt-2">
                            <div className="w-1/2 px-2 prose">
                                <p>
                                    Al seleccionar las campañas el sistema
                                    abrirá (o cerrara) el renglon de acuerdo a
                                    la cantidad de campañas que haya
                                    seleccionado
                                </p>
                                <p>
                                    Por ello es importante que tenga en cuenta
                                    que todos los valores volveran a cero
                                </p>
                                <p>
                                    Es decir, si está agregando campañas las
                                    nuevas filas quedarán en cero
                                </p>
                                <p>
                                    En caso de quitar campañas el valor de los
                                    acumulados se agregarán en la primer fila
                                </p>
                            </div>
                            <div className="w-1/2">
                                <Campaign />
                            </div>
                        </div>
                        <BottonSeleccionarCampania />
                    </div>
                </div>

                <table className="table w-full table-compac">
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>GE</th>
                            <th>Medio</th>
                            <th>Programa</th>
                            <th>Campaña</th>
                            <th>Grupo</th>
                            <th>Importe Unit</th>

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
                                <td
                                    className="cursor-pointer"
                                    onClick={e => {
                                        setValues(
                                            values.filter(
                                                value => value.id !== v.id
                                            )
                                        )
                                    }}
                                >
                                    <Icon stroke={1} type="REMOVE"></Icon>
                                </td>
                                <td>
                                    <label
                                        htmlFor="my-modal"
                                        className="btn modal-button btn-primary btn-sm"
                                        onClick={() => setRowSelected(v)}
                                    >
                                        Definir Campañas
                                    </label>
                                </td>

                                <td>{`1`}</td>
                                <td>{v.razonSocial}</td>
                                <td>{v.programa}</td>
                                <td>
                                    <div
                                        className={`${
                                            v.campania && 'bg-green-300'
                                        }  w-full h-full px-4 py-2`}
                                    >
                                        {(v.campania && v.campania.label) ||
                                            'Sin Definir'}
                                    </div>
                                </td>
                                <td>{v.grupo}</td>
                                <td>{formatter.format(v.importe)}</td>

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
        return (
            <div
                className="overflow-x-auto overflow-y-auto w-full"
                style={{ height: '500px' }}
            >
                <table className="table w-full table-compac">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Razon Social</th>
                            <th>Unidad</th>
                            <th>Cantidad</th>
                            <th>Importe Unit</th>
                            <th>Programa</th>
                        </tr>
                    </thead>

                    <tbody>
                        {proveedores.map((v: any, row: number) => (
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
                                            const cell: any = proveedores[row]
                                            cell.activo = e.target.checked
                                            const listTemp: any[] =
                                                Object.assign([], proveedores)
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
                                <td>{v.unidad}</td>
                                <td>{v.cantidad}</td>
                                <td>{formatter.format(v.importe)}</td>
                                <td>{v.programa}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    const TotalBeneficiarios = () => {
        const r: any = {}

        for (const i in values) {
            const importe = r[values[i].cuit] ? r[values[i].cuit].total : 0
            r[values[i].cuit] = {
                total:
                    importe +
                    calcularMenciones(values[i]) *
                        values[i].segundosSeleccionados *
                        values[i].importe,
                razonSocial: values[i].razonSocial + '/1',
                cuit: values[i].cuit
            }
        }

        return (
            <div>
                <table className="table w-full table-compac">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Accion</th>
                            <th>Razon Social</th>
                            <th>Importe</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(r).map((k: any, index: number) => (
                            <tr key={index + 1}>
                                <th>{index + 1}</th>
                                <th>
                                    <button
                                        onClick={() => {
                                            setBeneficiarioSeleccionado(
                                                r[k].cuit
                                            )
                                            setActiveTab('planificacionActiva')
                                        }}
                                        className="btn btn-sm bt-primary"
                                    >
                                        Planificar
                                    </button>
                                </th>
                                <td>{r[k].razonSocial}</td>
                                <td>{formatter.format(r[k].total)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    const havePlanificacionSinCampania = () => {
        return !_.isEmpty(values.filter(v => v.campania === undefined))
    }

    const iniciarOrdenesPublicidad = async () => {
        setProcesandoOrdenes(true)

        for (const k in values) {
            if (values[k].campania) {
                const data = {
                    referencia: `Ord. Pub. ${values[k].razonSocial} ${values[k].campania.label}`,
                    campania: values[k].campania.label,
                    medio: values[k].razonSocial,
                    mes: planificacion.mes,
                    cuit: values[k].cuit,
                    cuadroTarifario: [
                        {
                            importeUnitario: values[k].importe,
                            menciones: calcularMenciones(values[k]),
                            programa: values[k].programa,
                            medio: values[k].razonSocial
                        }
                    ],
                    nroOrdenPublicidad: planificacion.id
                }

                await workflowService.createProcess(
                    await workflowService.getSpec('6667f352b3'),
                    data,
                    await workflowService.getFormSpec('c4b50fc96d')
                )
                await planificacionService.setWaitingPlanning(planificacion.id)
            }
        }
        router.push('/planning')
        // setProcesandoOrdenes(false)
    }

    return (
        <ClearContainer
            className=""
            title={planificacion.title}
            headTitle={'Edición Planificación'}
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
                    {planificacion.status === 'draft' && (
                        <button
                            disabled={
                                values.length === 0 &&
                                planificacion.campania !== ''
                                    ? true
                                    : false
                            }
                            className={`btn btn-primary ${
                                isSaving && 'loading'
                            }`}
                            onClick={save}
                        >
                            Guardar
                        </button>
                    )}
                    {planificacion.status === 'draft' && (
                        <button
                            disabled={
                                planificacion.id === '' ||
                                havePlanificacionSinCampania()
                            }
                            onClick={iniciarOrdenesPublicidad}
                            className={`btn btn-active mx-3 ${
                                procesandoOrdenes && 'loading'
                            }`}
                        >
                            <AlertIcon />
                            Iniciar Ordenes de publicidad
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
                        <select
                            onChange={e => {
                                preventivos?.filter(p => {
                                    if (e.target.value === p.id) {
                                        setValues(p.payload)
                                    }
                                })
                            }}
                            className="select w-full max-w-xs select-bordered mr-4"
                            defaultValue=""
                        >
                            <option disabled selected>
                                Preventivo
                            </option>
                            {preventivos
                                ?.filter(p => p.status === 'approved')
                                .map(p => {
                                    return (
                                        <option key={p.id} value={p.id}>
                                            {`${p.medio} - ${p.mes} ${p.anio}`}
                                        </option>
                                    )
                                })}
                        </select>
                        <div>
                            <input
                                type="text"
                                placeholder="Referencia"
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
                    </div>
                </div>

                <div className="text-2xl font-semibold pt-8 pb-4">
                    Cuadros Tarifarios
                </div>
                <div className="tabs tabs-boxed mb-8 bg-white">
                    <a
                        className={`tab ${
                            activeTab === 'totalBeneficiarios' && 'tab-active'
                        }`}
                        onClick={() => setActiveTab('totalBeneficiarios')}
                    >
                        Total Beneficiarios
                    </a>
                    <a
                        className={`tab ${
                            activeTab === 'planificacionActiva' && 'tab-active'
                        }`}
                        onClick={() => setActiveTab('planificacionActiva')}
                    >
                        Planficacion Activa
                    </a>
                    <a
                        className={`tab ${
                            activeTab === 'proveedoresDisponibles' &&
                            'tab-active'
                        }`}
                        onClick={() => setActiveTab('proveedoresDisponibles')}
                    >
                        Proveedores Disponibles
                    </a>
                </div>
                {activeTab === 'totalBeneficiarios' && <TotalBeneficiarios />}
                {activeTab === 'planificacionActiva' && <EnPlanificacion />}
                {activeTab === 'proveedoresDisponibles' && <ListaProveedores />}
            </div>
        </ClearContainer>
    )
}

export default Page

const PencilFilled = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
    )
}

const PencilOutLinded = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
        </svg>
    )
}

const AlertIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mx-2"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
            />
        </svg>
    )
}

const Adjustment = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
        </svg>
    )
}
