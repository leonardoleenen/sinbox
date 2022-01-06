import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { SignUpStore } from '../../store/sigup.store'
import { businessService } from '../../services/business.service'
import { webAuthn, Assertion } from '../../services/webauthn.service'
import { getToken, tokenDecode } from '../../services/auth.service'

const Page: NextPage = () => {
    const router = useRouter()
    const state = SignUpStore.useState(s => s)
    const [loading, setLoading] = useState(false)
    const { id } = router.query
    const [legalForm, setLegalForm] = useState<any>()
    const [actoMonto, setActoMonto] = useState('')
    const [user, setUser] = useState<User>()
    const [mode, setMode] = useState<'NEW' | 'EDIT CERT' | 'READONLY'>('NEW')

    useEffect(() => {
        if (id) {
            const u = tokenDecode(getToken() as string)
            setUser(u)
            if (u.role === 'CERT RECEPTIONIST') setMode('EDIT CERT')
            businessService
                .getLegalForm(id as string)
                .then(result => setLegalForm(result))
        }
    }, [id])
    const [registroPropiedad, setRegistroPropiedad] = useState<{
        acto: string
        lote: Array<{
            lote: string
            manzana: string
            plano: string
        }>
    }>()

    function arrayBufferToBase64(buffer: any) {
        let binary = ''
        const bytes = new Uint8Array(buffer)
        const len = bytes.byteLength
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i])
        }
        return window.btoa(binary)
    }

    const save = (signature: string) => {
        businessService.saveLegalForm({
            id: null,
            metadata: {
                type: 'REGISTRO SANTA FE',
                friendlyName: 'Registro propiedad Santa Fe',
                refForm: actoMonto
            },
            payload: {
                name: 'blalba'
            },
            status: 'NEW',
            creator: {
                createdAt: new Date().getTime(),
                createdBy: tokenDecode(getToken() as string),
                signature
            }
        })
    }

    const complete = async () => {
        await businessService.saveLegalForm({
            ...legalForm,
            status: 'TO CLOSE'
        })
        await signWebAuthn()
    }

    const signWebAuthn = async () => {
        //!! DATA THAT MUST BE PASSED IN ORDER TO GENERATE PUBLIC KEY
        /*Options: Obtain from state | this is a placeholder*/
        const test = {
            name: 'Alex',
            displayName: 'Fiorenza'
        }
        //!! OBJECT OF FORM TO PASS TO CHALLENGE
        const challengeTest = {
            testField: 'Morpheo',
            testField2: 'Neo',
            testField3: 'Trinity'
        }
        const credentials = await webAuthn.createCredentials(
            test,
            {
                storeCredentials: false
            },
            challengeTest
        )
        if (credentials) {
            //Contains response.signature
            const assertion: any = await webAuthn.getCredentials(
                false,
                credentials
            )

            if (user && user.role === 'CERT RECEPTIONIST')
                return router.push('/inbox')
            else {
                await save(arrayBufferToBase64(assertion.response.signature))
                router.push('/registro/success')
            }
        }
    }

    return (
        <div>
            <section className="py-20 flex h-screen ">
                <div className="container px-4 mx-auto">
                    <div className="max-w-2xl mx-auto text-center ">
                        <div className="max-w-md mb-8 mx-auto prose">
                            <span className="text-sm text-blueGray-400">
                                Registro General Rosario
                            </span>
                            <h1 className="text-lg text-blueGray-400">
                                Modulo N 1 Dominio
                            </h1>
                        </div>
                        <div>
                            <div className="">
                                <div className="card  card shadow-lg">
                                    <div className="card-body">
                                        <h3 className="card-title">
                                            1.Acto y Monto
                                        </h3>
                                        <div className="mb-4">
                                            <div className="form-control">
                                                <input
                                                    disabled={mode !== 'NEW'}
                                                    value={actoMonto}
                                                    onChange={e =>
                                                        setActoMonto(
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    placeholder="Acto y monto"
                                                    className="input input-bordered"
                                                />
                                            </div>
                                        </div>
                                        <div className="max-w-md mb-8 mx-auto">
                                            <span className="text-sm text-blueGray-400">
                                                Tratandose de fraccion/es de una
                                                mayor area inscripta,determinar:
                                            </span>
                                        </div>
                                        <div className="mb-4 flex">
                                            <div className="form-control w-full">
                                                <input
                                                    type="text"
                                                    placeholder="Lote"
                                                    className="input input-bordered"
                                                />
                                            </div>
                                            <div className="form-control w-full ml-4">
                                                <input
                                                    type="text"
                                                    placeholder="Manzana"
                                                    className="input input-bordered"
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-4 flex">
                                            <div className="form-control w-full">
                                                <input
                                                    type="text"
                                                    placeholder="Plano"
                                                    className="input input-bordered"
                                                />
                                            </div>
                                            <div className="form-control w-full ml-4">
                                                <input
                                                    type="text"
                                                    placeholder="Año"
                                                    className="input input-bordered"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-8 flex ">
                                            <div className="form-control">
                                                <button className="btn btn-outline btn-sm">
                                                    Agregar
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mb-4 ">
                                            <div className="overflow-x-auto">
                                                <table className="table w-full table-compact">
                                                    <thead>
                                                        <tr>
                                                            <th>Lote/s</th>
                                                            <th>Manzana</th>
                                                            <th> Plano N </th>
                                                            <th> Año</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th>1</th>
                                                            <td></td>
                                                            <td></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <section>
                                    <div className="card  card shadow-lg mt-8">
                                        <div className="card-body">
                                            <h3 className="card-title">
                                                2. Datos de inscripcion
                                            </h3>

                                            <div className="mb-4 flex">
                                                <div className="form-control w-full">
                                                    <label className="cursor-pointer label">
                                                        <span className="label-text">
                                                            Dominio
                                                        </span>
                                                        <input
                                                            type="checkbox"
                                                            className="toggle toggle-primary"
                                                        />
                                                    </label>
                                                </div>
                                                <div className="form-control w-full">
                                                    <label className="cursor-pointer label">
                                                        <span className="label-text">
                                                            Propiedad horizontal
                                                        </span>
                                                        <input
                                                            type="checkbox"
                                                            className="toggle toggle-primary"
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="mb-4 flex">
                                                <div className="form-control w-full">
                                                    <input
                                                        type="text"
                                                        placeholder="Departamento"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                                <div className="form-control w-full ml-4">
                                                    <input
                                                        type="text"
                                                        placeholder="Matricula"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                            </div>

                                            <div className="mb-2 flex ">
                                                <div className="form-control w-full">
                                                    <input
                                                        type="text"
                                                        placeholder="Tomo"
                                                        className="input input-bordered"
                                                    />
                                                </div>

                                                <div className="form-control ml-4 w-full ">
                                                    <input
                                                        type="text"
                                                        placeholder="Folio"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                                <div className="form-control ml-4 w-full ">
                                                    <input
                                                        type="text"
                                                        placeholder="Numero"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                            </div>

                                            <div className="mb-8 flex ">
                                                <div className="form-control">
                                                    <button className="btn btn-outline btn-sm">
                                                        Agregar
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mb-4 ">
                                                <div className="overflow-x-auto">
                                                    <table className="table w-full">
                                                        <thead>
                                                            <tr>
                                                                <th>Tomo</th>
                                                                <th>Folio</th>
                                                                <th>Numero</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th>1</th>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <div className="card  card shadow-lg mt-6">
                                        <div className="card-body">
                                            <h3 className="card-title">
                                                3. Datos de Inmueble segun
                                                titulo inscripto
                                            </h3>
                                            <div className="mb-4 flex">
                                                <div className="form-control w-full">
                                                    <input
                                                        type="text"
                                                        placeholder="Ubicacion / Distrito"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                            </div>

                                            <div className="mb-4 flex">
                                                <div className="form-control w-full ">
                                                    <input
                                                        type="text"
                                                        placeholder="Zona"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                                <div className="form-control w-full ml-4">
                                                    <input
                                                        type="text"
                                                        placeholder="Localidad"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4 flex">
                                                <div className="form-control w-full">
                                                    <input
                                                        type="text"
                                                        placeholder="Calle"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                                <div className="form-control w-full ml-4">
                                                    <input
                                                        type="text"
                                                        placeholder="numero"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                            </div>

                                            <div className="mb-4 ">
                                                <div className="form-control w-full">
                                                    <input
                                                        type="text"
                                                        placeholder="Entre calles"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4 flex ">
                                                <div className="form-control w-full">
                                                    <input
                                                        type="text"
                                                        placeholder="Lote"
                                                        className="input input-bordered"
                                                    />
                                                </div>

                                                <div className="form-control ml-4 w-full ml-4 ">
                                                    <input
                                                        type="text"
                                                        placeholder="Manzana"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4 flex ">
                                                <div className="form-control w-full">
                                                    <input
                                                        type="text"
                                                        placeholder="Superficie"
                                                        className="input input-bordered"
                                                    />
                                                </div>

                                                <div className="form-control ml-4 w-full ">
                                                    <input
                                                        type="text"
                                                        placeholder="Plano"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                            </div>

                                            <div className="mb-4 flex ">
                                                <div className="form-control w-full">
                                                    <input
                                                        type="text"
                                                        placeholder="Año"
                                                        className="input input-bordered"
                                                    />
                                                </div>

                                                <div className="form-control ml-4 w-full ">
                                                    <input
                                                        type="text"
                                                        placeholder="Arranque"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                            </div>
                                            <div className="max-w-md mb-8 mx-auto">
                                                <span className="text-sm text-blueGray-400">
                                                    Rumbos, medidas lineales y
                                                    linderos (adaptar las
                                                    iniciales a los rumbos si no
                                                    coinciden con las aqui
                                                    previstas)
                                                </span>
                                            </div>
                                            <div className="mb-4 flex">
                                                <div className="form-control w-full">
                                                    <input
                                                        type="text"
                                                        placeholder="N "
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                                <div className="form-control w-full ml-4">
                                                    <input
                                                        type="text"
                                                        placeholder="S"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4 flex">
                                                <div className="form-control w-full">
                                                    <input
                                                        type="text"
                                                        placeholder="E"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                                <div className="form-control w-full ml-4">
                                                    <input
                                                        type="text"
                                                        placeholder="O"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4 flex">
                                                <div className="form-control w-full">
                                                    <input
                                                        type="text"
                                                        placeholder="NO "
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                                <div className="form-control w-full ml-4">
                                                    <input
                                                        type="text"
                                                        placeholder="NE"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                            </div>

                                            <div className="mb-4 flex">
                                                <div className="form-control w-full">
                                                    <input
                                                        type="text"
                                                        placeholder="SO "
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                                <div className="form-control w-full ml-4">
                                                    <input
                                                        type="text"
                                                        placeholder="SE"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                            </div>
                                            <div className="max-w-md mb-8 mx-auto">
                                                <span className="text-sm text-blueGray-400">
                                                    Cuando es propiedad
                                                    horizontal
                                                </span>
                                            </div>

                                            <div className="mb-4 flex ">
                                                <div className="form-control w-full">
                                                    <input
                                                        type="text"
                                                        placeholder="Unidad"
                                                        className="input input-bordered"
                                                    />
                                                </div>

                                                <div className="form-control ml-4 w-full ">
                                                    <input
                                                        type="text"
                                                        placeholder="Parcela/s"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                                <div className="form-control ml-4 w-full ">
                                                    <input
                                                        type="text"
                                                        placeholder="Ubicada en planta/s"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                            </div>

                                            <div className="mb-4 flex ">
                                                <div className="form-control w-full">
                                                    <input
                                                        type="text"
                                                        placeholder="Superficies (m2)"
                                                        className="input input-bordered"
                                                    />
                                                </div>

                                                <div className="form-control ml-4 w-full ">
                                                    <input
                                                        type="text"
                                                        placeholder="Comun"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                                <div className="form-control ml-4 w-full ">
                                                    <input
                                                        type="text"
                                                        placeholder="Valor Proporcional"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <div className="card  card shadow-lg mt-6">
                                        <div className="card-body">
                                            <h3 className="card-title">
                                                4. Titular/es de dominio segun
                                                titulo inscripto
                                            </h3>

                                            <div className="mb-4 flex">
                                                <div className="form-control w-full">
                                                    <label className="cursor-pointer label">
                                                        <span className="label-text">
                                                            Persona humana
                                                        </span>
                                                        <input
                                                            type="checkbox"
                                                            className="toggle toggle-primary"
                                                        />
                                                    </label>
                                                </div>
                                                <div className="form-control w-full"></div>
                                            </div>
                                            <div className="mb-4 flex">
                                                <div className="form-control w-full">
                                                    <input
                                                        type="text"
                                                        placeholder="Apellido"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                                <div className="form-control w-full ml-4">
                                                    <input
                                                        type="text"
                                                        placeholder="Nombre"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4 flex">
                                                <div className="form-control w-full">
                                                    <select className="select select-bordered select-primary w-full max-w-xs">
                                                        <option
                                                            disabled
                                                            selected
                                                        >
                                                            Tipo de Documento
                                                        </option>
                                                        <option>DNI</option>
                                                        <option>CI</option>
                                                        <option>
                                                            PASAPORTE
                                                        </option>
                                                    </select>
                                                </div>
                                                <div className="form-control w-full ml-4">
                                                    <input
                                                        type="text"
                                                        placeholder="Nro de Doc"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4 flex">
                                                <div className="form-control w-full">
                                                    <input
                                                        type="text"
                                                        placeholder="CUIL/CUIT/CDI"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                                <div className="form-control w-full ml-4">
                                                    <input
                                                        type="text"
                                                        placeholder="Fraccion"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-8 flex ">
                                                <div className="form-control">
                                                    <button className="btn btn-outline btn-sm">
                                                        Agregar
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mb-8 ">
                                                <div className="overflow-x-auto">
                                                    <table className="table w-full">
                                                        <thead>
                                                            <tr>
                                                                <th>Nombre</th>
                                                                <th>
                                                                    Apellido
                                                                </th>
                                                                <th>
                                                                    Tipo Doc
                                                                </th>
                                                                <th>Nro Doc</th>
                                                                <th>CUIL</th>
                                                                <th>
                                                                    Fraccion
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th></th>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                            <div className="mb-4 flex">
                                                <div className="form-control w-full">
                                                    <label className="cursor-pointer label">
                                                        <span className="label-text">
                                                            Persona Juridica
                                                        </span>
                                                        <input
                                                            type="checkbox"
                                                            className="toggle toggle-primary"
                                                        />
                                                    </label>
                                                </div>
                                                <div className="form-control w-full"></div>
                                            </div>
                                            <div className="mb-4 flex">
                                                <div className="form-control w-full">
                                                    <input
                                                        type="text"
                                                        placeholder="Denominacion"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                                <div className="form-control w-full ml-4">
                                                    <input
                                                        type="text"
                                                        placeholder="Tipo"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4 flex">
                                                <div className="form-control w-full">
                                                    <input
                                                        type="text"
                                                        placeholder="Cuit"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                                <div className="form-control w-full ml-4">
                                                    <input
                                                        type="text"
                                                        placeholder="Fraccion"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-8 flex ">
                                                <div className="form-control">
                                                    <button className="btn btn-outline btn-sm">
                                                        Agregar
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mb-4 ">
                                                <div className="overflow-x-auto">
                                                    <table className="table w-full">
                                                        <thead>
                                                            <tr>
                                                                <th>
                                                                    Denominacion
                                                                </th>
                                                                <th>Tipo</th>
                                                                <th>Cuit</th>
                                                                <th>
                                                                    Fraccion
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th>1</th>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <div className="card  card shadow-lg mt-8">
                                        <div className="card-body">
                                            <h3 className="card-title">
                                                5. Solicitante
                                            </h3>

                                            <div className="mb-4 ">
                                                <div className="form-control w-full">
                                                    <input
                                                        type="text"
                                                        placeholder="Solicitante"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4 flex">
                                                <div className="form-control w-full">
                                                    <input
                                                        type="text"
                                                        placeholder="Registro Nro"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                                <div className="form-control w-full ml-4">
                                                    <input
                                                        type="text"
                                                        placeholder="Localidad"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4 flex">
                                                <div className="form-control w-full">
                                                    <input
                                                        type="text"
                                                        placeholder="Provincia"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                                <div className="form-control w-full ml-4">
                                                    <input
                                                        type="text"
                                                        placeholder="Domicilio"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4 flex">
                                                <div className="form-control w-full">
                                                    <input
                                                        type="text"
                                                        placeholder="Telefono"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                                <div className="form-control w-full ml-4"></div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section>
                                    <div className="card  card shadow-lg mt-8">
                                        <div className="card-body">
                                            <h3 className="card-title">
                                                6. Se agregar
                                            </h3>

                                            <div className="mb-4 ">
                                                <div className="form-control w-full">
                                                    <input
                                                        type="text"
                                                        placeholder="Anexos continuando rubro S/n"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section>
                                    <div className="card  card shadow-lg mt-8">
                                        <div className="card-body">
                                            <h3 className="card-title">
                                                7.Observaciones
                                            </h3>

                                            <div className="mb-4 ">
                                                <div className="form-control w-full">
                                                    <textarea
                                                        className="textarea h-24 textarea-bordered"
                                                        placeholder="Otros Datos, enmiendas,etc"
                                                    ></textarea>
                                                </div>

                                                {mode === 'NEW' && (
                                                    <div className="form-control w-full ">
                                                        <button
                                                            onClick={
                                                                signWebAuthn
                                                            }
                                                            className="btn btn-primary mt-8"
                                                        >
                                                            Firma del escribano
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <div className="max-w-md mb-8 mt-24 mx-auto">
                                    <h1>Para uso exclusivo del registro</h1>
                                </div>
                                <section>
                                    <div className="card  card shadow-lg mt-8">
                                        <div className="card-body">
                                            <h3 className="card-title">
                                                8. No puede despacharse la
                                                solicitud por causa de:
                                            </h3>

                                            <div className="mb-4 ">
                                                <div className="form-control w-full">
                                                    <textarea
                                                        className="textarea h-24 textarea-bordered"
                                                        disabled={
                                                            mode !== 'EDIT CERT'
                                                        }
                                                        placeholder="Otros Datos, enmiendas,etc"
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <div className="card  card shadow-lg mt-8">
                                        <div className="card-body">
                                            <h3 className="card-title">
                                                9. El Inmueble determinado en el
                                                rubro 3 consta a nombre de la/s
                                                personas determinada/s en el
                                                rubro 4
                                            </h3>

                                            <div className="mb-4 flex ">
                                                <div className="form-control w-full">
                                                    <input
                                                        type="text"
                                                        disabled
                                                        placeholder="solicitud Nro"
                                                        className="input input-bordered"
                                                    />
                                                </div>

                                                <div className="form-control ml-4 w-full ">
                                                    <input
                                                        type="text"
                                                        disabled
                                                        placeholder="Fecha"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                                <div className="form-control ml-4 w-full ">
                                                    <input
                                                        type="text"
                                                        disabled
                                                        placeholder="Antecede"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section>
                                    <div className="card  card shadow-lg mt-8">
                                        <div className="card-body">
                                            <h3 className="card-title">
                                                10. ADVERTENCIA: CERTIFICACIONES
                                                VIGENTES
                                            </h3>
                                            <span>
                                                (con prioridad respecto de la
                                                presente: Art. 42 Ley 6435)
                                            </span>
                                            <div className="mb-4 flex ">
                                                <div className="form-control w-full">
                                                    <input
                                                        type="text"
                                                        disabled
                                                        placeholder="Fecha"
                                                        className="input input-bordered"
                                                    />
                                                </div>

                                                <div className="form-control ml-4 w-full ">
                                                    <input
                                                        type="text"
                                                        disabled
                                                        placeholder="Certificado"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                                <div className="form-control ml-4 w-full ">
                                                    <input
                                                        type="text"
                                                        disabled
                                                        placeholder="Operacion"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4 flex ">
                                                <div className="form-control w-full">
                                                    <input
                                                        type="text"
                                                        disabled
                                                        placeholder="Escribano o juzgado"
                                                        className="input input-bordered"
                                                    />
                                                </div>

                                                <div className="form-control ml-4 w-full ">
                                                    <input
                                                        type="text"
                                                        disabled
                                                        placeholder="Reg nro"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                                <div className="form-control ml-4 w-full ">
                                                    <input
                                                        type="text"
                                                        disabled
                                                        placeholder="Localidad"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4 flex ">
                                                <div className="form-control w-full">
                                                    <input
                                                        type="text"
                                                        disabled
                                                        placeholder="Plazo"
                                                        className="input input-bordered"
                                                    />
                                                </div>

                                                <div className="form-control ml-4 w-full "></div>
                                                <div className="form-control ml-4 w-full "></div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section>
                                    <div className="card  card shadow-lg mt-8">
                                        <div className="card-body">
                                            <h3 className="card-title">
                                                11. Por el inmueble determinado
                                                en la solicitud se registra{' '}
                                            </h3>

                                            <h5>Hipoteca - Inscripcion </h5>
                                            <div className="mb-4 flex ">
                                                <div className="form-control w-full">
                                                    <input
                                                        type="text"
                                                        disabled
                                                        placeholder="Tomo"
                                                        className="input input-bordered"
                                                    />
                                                </div>

                                                <div className="form-control ml-4 w-full ">
                                                    <input
                                                        type="text"
                                                        disabled
                                                        placeholder="Folio"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                                <div className="form-control ml-4 w-full ">
                                                    <input
                                                        type="text"
                                                        disabled
                                                        placeholder="Numero"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                            </div>
                                            <h5>Escrituracion </h5>
                                            <div className="mb-4 flex ">
                                                <div className="form-control w-full">
                                                    <input
                                                        type="text"
                                                        disabled
                                                        placeholder="Fecha"
                                                        className="input input-bordered"
                                                    />
                                                </div>

                                                <div className="form-control ml-4 w-full ">
                                                    <input
                                                        type="text"
                                                        disabled
                                                        placeholder="Reg nro"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                            </div>

                                            <div className="mb-4 flex ">
                                                <div className="form-control w-full">
                                                    <input
                                                        type="text"
                                                        disabled
                                                        placeholder="Localidad"
                                                        className="input input-bordered"
                                                    />
                                                </div>

                                                <div className="form-control ml-4 w-full ">
                                                    <input
                                                        type="text"
                                                        disabled
                                                        placeholder="Escribano"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                            </div>
                                            <h5>Monto </h5>
                                            <div className="mb-4 flex ">
                                                <div className="form-control w-full">
                                                    <input
                                                        type="text"
                                                        disabled
                                                        placeholder="Fecha"
                                                        className="input input-bordered"
                                                    />
                                                </div>

                                                <div className="form-control ml-4 w-full ">
                                                    <input
                                                        type="text"
                                                        disabled
                                                        placeholder="Reg nro"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                            </div>
                                            <h5>
                                                Embargos u otras medidas -
                                                Anotación{' '}
                                            </h5>
                                            <div className="mb-4 flex ">
                                                <div className="form-control w-full">
                                                    <input
                                                        type="text"
                                                        disabled
                                                        placeholder="Tomo"
                                                        className="input input-bordered"
                                                    />
                                                </div>

                                                <div className="form-control ml-4 w-full ">
                                                    <input
                                                        type="text"
                                                        disabled
                                                        placeholder="Folio"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4 flex ">
                                                <div className="form-control w-full">
                                                    <input
                                                        type="text"
                                                        disabled
                                                        placeholder="numero"
                                                        className="input input-bordered"
                                                    />
                                                </div>

                                                <div className="form-control ml-4 w-full ">
                                                    <input
                                                        type="text"
                                                        disabled
                                                        placeholder="Fecha"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4 flex ">
                                                <div className="form-control w-full">
                                                    <input
                                                        type="text"
                                                        disabled
                                                        placeholder="Juzgado"
                                                        className="input input-bordered"
                                                    />
                                                </div>

                                                <div className="form-control ml-4 w-full ">
                                                    <input
                                                        type="text"
                                                        disabled
                                                        placeholder="Profesional que intervino"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4 flex ">
                                                <div className="form-control w-full">
                                                    <input
                                                        type="text"
                                                        disabled
                                                        placeholder="monto"
                                                        className="input input-bordered"
                                                    />
                                                </div>

                                                <div className="form-control ml-4 w-full "></div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <div className="card  card shadow-lg mt-8">
                                        <div className="card-body">
                                            <h3 className="card-title">
                                                12. Se agregan{' '}
                                            </h3>

                                            <div className="mb-4  ">
                                                <div className="form-control w-full">
                                                    <input
                                                        type="text"
                                                        disabled
                                                        placeholder="ANEXOS CONTINUANDO RUBRO/ S Nº:"
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                                {mode === 'EDIT CERT' &&
                                                    legalForm && (
                                                        <div className="form-control mt-3 ">
                                                            <button
                                                                onClick={
                                                                    complete
                                                                }
                                                                className="btn"
                                                                role="button"
                                                            >
                                                                Firmar
                                                                funcionario del
                                                                registro
                                                            </button>
                                                        </div>
                                                    )}
                                                <div></div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="flex justify-end items-center mt-8">
                                <button className="py-4 px-8 text-sm text-white font-semibold leading-none bg-blue-600 hover:bg-blue-700 rounded">
                                    Enviar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Page
