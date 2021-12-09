import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { SignUpStore } from '../../store/sigup.store'
import _ from 'lodash'
import { businessService } from '../../services/business.service'
import Loader from '../../components/loader'
import SecurePages from '../../components/signup/securePages'

const Page: NextPage = () => {
    const router = useRouter()
    const state = SignUpStore.useState(s => s)
    const [offer, setOffer] = useState<TariffOffer>({
        nombreComercial: '',
        precio: 0,
        medio: ''
    })
    const [offers, setOffers] = useState<Array<TariffOffer>>([])
    const add = () => {
        setOffers([...offers, offer])
        setOffer({
            medio: '',
            precio: 0,
            nombreComercial: ''
        })
    }

    const remove = (index: number) => {
        setOffers(offers.filter((e, i) => i !== index))
    }
    const saveSignUp = async () => {
        SignUpStore.update(s => {
            s.loading = true
        })
        await businessService.saveCompany(
            {
                ...state.datosEmpresa,
                representante: {
                    email: state.email,
                    id: state.user.uid,
                    nombreApellido: state.userCn,
                    telefono: state.datosEmpresa.representante.telefono
                },
                offer: offers
            },
            {
                iat: 1234,
                id: state.user.uid,
                identityProvider: state.user.providerId,
                role: 'PROVIDER',
                name: state.userCn,
                controllerCompanyCuit: state.datosEmpresa.cuit
            }
        )
        router.push('/signup/success')
    }

    if (state.loading) return <Loader />
    return (
        <SecurePages {...state}>
            <section className="py-20" id="offer-letter">
                <div className="container px-4 mx-auto">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="max-w-md mb-8 mx-auto prose">
                            <span className="text-sm text-blueGray-400">
                                Tarifas
                            </span>
                            <h1>Valor del servicio prestado</h1>
                        </div>

                        <form>
                            <div className="mb-4 flex">
                                <div className="form-control w-full">
                                    <input
                                        type="text"
                                        value={offer.nombreComercial}
                                        onChange={e =>
                                            setOffer({
                                                ...offer,
                                                nombreComercial: e.target.value
                                            })
                                        }
                                        placeholder="Nombre comercial"
                                        className="input input-bordered"
                                    />
                                </div>
                                <div className="form-control ml-4">
                                    <select
                                        onChange={e => {
                                            setOffer({
                                                ...offer,
                                                medio: e.target.value
                                            })
                                        }}
                                        className="select select-bordered w-full"
                                    >
                                        <option>
                                            Medio / Tipo de Servicio
                                        </option>
                                        <option value="PERIODICO">
                                            Periodico
                                        </option>
                                        <option value="REVISTA">Revista</option>
                                        <option value="TV ABIERTA">
                                            TV Abierta
                                        </option>
                                        <option value="TV CABLE">
                                            TV Cable
                                        </option>
                                        <option value="RADIO AM">
                                            Radio AM
                                        </option>
                                        <option value="RADIO FM">
                                            Radio FM
                                        </option>
                                        <option value="SITIO WEB">
                                            Sitio Web
                                        </option>
                                        <option value="OTRO MEDIO">
                                            Otro Medio grafico
                                        </option>
                                        <option value="PRODUCTORA DE CONTENIDO">
                                            Productora de Contenido
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-4 flex">
                                <div className="form-control w-full">
                                    <label className="input-group input-group-md">
                                        <input
                                            type="number"
                                            value={offer.precio}
                                            onChange={e =>
                                                setOffer({
                                                    ...offer,
                                                    precio: parseInt(
                                                        e.target.value
                                                    )
                                                })
                                            }
                                            className="input input-bordered"
                                        />
                                        <span>ARS por minuto</span>
                                    </label>
                                </div>
                            </div>

                            <div className="mb-4 flex w-full items-center justify-between">
                                <div className="alert alert-info">
                                    <div className="flex-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            className="w-6 h-6 mx-2 stroke-current"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            ></path>
                                        </svg>
                                        <label>
                                            Los precios deben ser expresados iva
                                            incluido
                                        </label>
                                    </div>
                                </div>
                                <button
                                    className="btn btn-accent btn-outline"
                                    onClick={add}
                                    disabled={
                                        !offer.medio ||
                                        !offer.nombreComercial ||
                                        offer.precio <= 0
                                    }
                                    type="submit"
                                >
                                    Agregar
                                </button>
                            </div>
                        </form>
                        {!_.isEmpty(offers) && (
                            <div>
                                <section className="prose pt-16">
                                    <h2>Cuadro tarifario</h2>
                                    <div className="overflow-x-auto">
                                        <table className="table w-full">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Nombre Comecial</th>
                                                    <th>Medio</th>
                                                    <th>Precio $/m</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {offers.map((o, index) => (
                                                    <tr key={`idx${index}`}>
                                                        <td className="flex justify-center">
                                                            <svg
                                                                onClick={() =>
                                                                    remove(
                                                                        index
                                                                    )
                                                                }
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5 text-red-500 cursor-pointer"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                />
                                                            </svg>
                                                        </td>
                                                        <td>
                                                            {o.nombreComercial}
                                                        </td>
                                                        <td>{o.medio}</td>
                                                        <td>{`$ ${o.precio}`}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </section>
                                <section className="pt-16">
                                    <button
                                        className="btn btn-primary"
                                        onClick={saveSignUp}
                                    >
                                        Finalizar
                                    </button>
                                </section>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </SecurePages>
    )
}

export default Page
