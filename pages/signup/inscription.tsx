import React, { useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { SignUpStore } from '../../store/sigup.store'
import { businessService } from '../../services/business.service'

const Page: NextPage = () => {
    const router = useRouter()
    const state = SignUpStore.useState(s => s)
    const [loading, setLoading] = useState(false)
    const CompanyData = () => {
        return (
            <div className="prose">
                <div className="mb-4">
                    <div className="form-control">
                        <input
                            type="text"
                            onChange={e => {
                                SignUpStore.update(s => {
                                    s.datosEmpresa.grupoEconomico =
                                        e.target.value
                                })
                            }}
                            placeholder="Grupo economico"
                            className="input input-bordered"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <div className="form-control">
                        <select className="select select-bordered w-full max-w-xs">
                            <option>Medio / Tipo de Servicio</option>
                            <option>Periodico</option>
                            <option>Revista</option>
                            <option>TV Abierta</option>
                            <option>TV Cable</option>
                            <option>Radio AM</option>
                            <option>Radio FM</option>
                            <option>Sitio Web</option>
                            <option>Otro Medio grafico</option>
                            <option>Productora de Contenido</option>
                        </select>
                    </div>
                </div>
                <div className="mb-4">
                    <div className="form-control">
                        <input
                            type="text"
                            onChange={e => {
                                SignUpStore.update(s => {
                                    s.datosEmpresa.razonSocial = e.target.value
                                })
                            }}
                            placeholder="Nombre comercial"
                            className="input input-bordered"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <div className="form-control">
                        <input
                            type="text"
                            onChange={e => {
                                SignUpStore.update(s => {
                                    s.datosEmpresa.cuit = e.target.value
                                })
                            }}
                            placeholder="Cuit"
                            className="input input-bordered"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <div className="form-control">
                        <input
                            type="text"
                            placeholder="Nro de IIBB"
                            onChange={e => {
                                SignUpStore.update(s => {
                                    s.datosEmpresa.iibb = e.target.value
                                })
                            }}
                            className="input input-bordered"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <div className="form-control">
                        <input
                            type="text"
                            onChange={e => {
                                SignUpStore.update(s => {
                                    s.datosEmpresa.domicilioLegal =
                                        e.target.value
                                })
                            }}
                            placeholder="Domicilio legal"
                            className="input input-bordered"
                        />
                    </div>
                </div>
                <section>
                    <h2>Destinatario Factura</h2>
                    <div className="mb-4">
                        <div className="form-control">
                            <select className="select select-bordered w-full max-w-xs">
                                <option>Condición frente a AFIP</option>
                                <option>Monotributista</option>
                                <option>Responsable Inscripto</option>
                                <option>Responsable Exento</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="form-control">
                            <input
                                type="text"
                                onChange={e => {
                                    SignUpStore.update(s => {
                                        s.datosEmpresa.destinatarioFactura.nombreComercial =
                                            e.target.value
                                    })
                                }}
                                placeholder="Nombre comercial"
                                className="input input-bordered"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="form-control">
                            <input
                                type="text"
                                onChange={e => {
                                    SignUpStore.update(s => {
                                        s.datosEmpresa.destinatarioFactura.cuit =
                                            e.target.value
                                    })
                                }}
                                placeholder="Cuit"
                                className="input input-bordered"
                            />
                        </div>
                    </div>
                </section>
            </div>
        )
    }

    const PersonalData = () => {
        return <div> Personal </div>
    }
    const goNext = () => {
        router.push('/signup/offer-letter')
    }

    return (
        <div>
            <section className="py-20 flex h-screen ">
                <div className="container px-4 mx-auto">
                    <div className="max-w-2xl mx-auto text-center prose">
                        <div className="max-w-md mb-8 mx-auto">
                            <span className="text-sm text-blueGray-400">
                                Registro nuevo proveedor
                            </span>
                            <h1>Complete todos los datos y pulse finalizar</h1>
                        </div>
                        <div>
                            <div className="prose">
                                <div className="mb-4">
                                    <div className="form-control">
                                        <input
                                            type="text"
                                            onChange={e => {
                                                SignUpStore.update(s => {
                                                    s.datosEmpresa.grupoEconomico =
                                                        e.target.value
                                                })
                                            }}
                                            placeholder="Grupo economico"
                                            className="input input-bordered"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="form-control">
                                        <select
                                            onChange={e => {
                                                SignUpStore.update(s => {
                                                    s.datosEmpresa.medio =
                                                        e.target.value
                                                })
                                            }}
                                            className="select select-bordered w-full "
                                        >
                                            <option>
                                                Medio / Tipo de Servicio
                                            </option>
                                            <option value="PERIODICO">
                                                Periodico
                                            </option>
                                            <option value="REVISRA">
                                                Revista
                                            </option>
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
                                <div className="mb-4 flex ">
                                    <div className="form-control w-full">
                                        <input
                                            type="text"
                                            onChange={e => {
                                                SignUpStore.update(s => {
                                                    s.datosEmpresa.razonSocial =
                                                        e.target.value
                                                })
                                            }}
                                            placeholder="Nombre comercial"
                                            className="input input-bordered"
                                        />
                                    </div>

                                    <div className="form-control ml-4 ">
                                        <label
                                            className="
                                                        w-64
                                                        flex flex-col
                                                        items-center
                                                        px-4
                                                        py-3
                                                        bg-white
                                                        rounded-md
                                                        shadow-md
                                                        tracking-wide
                                                        uppercase
                                                        border border-blue
                                                        cursor-pointer
                                                        hover:bg-purple-600 hover:text-white
                                                        text-purple-600
                                                        ease-linear
                                                        transition-all
                                                        duration-150
                                                    "
                                        >
                                            <i className="fas fa-cloud-upload-alt fa-3x"></i>
                                            <span className="text-base leading-normal">
                                                Contrato Social
                                            </span>
                                            <input
                                                type="file"
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-4 flex">
                                    <div className="form-control w-full">
                                        <input
                                            type="text"
                                            onChange={e => {
                                                SignUpStore.update(s => {
                                                    s.datosEmpresa.cuit =
                                                        e.target.value
                                                })
                                            }}
                                            placeholder="Cuit"
                                            className="input input-bordered"
                                        />
                                    </div>
                                    <div className="form-control ml-4">
                                        <label
                                            className="
                                                        w-64
                                                        flex flex-col
                                                        items-center
                                                        px-4
                                                        py-3
                                                        bg-white
                                                        rounded-md
                                                        shadow-md
                                                        tracking-wide
                                                        uppercase
                                                        border border-blue
                                                        cursor-pointer
                                                        hover:bg-purple-600 hover:text-white
                                                        text-purple-600
                                                        ease-linear
                                                        transition-all
                                                        duration-150
                                                    "
                                        >
                                            <i className="fas fa-cloud-upload-alt fa-3x"></i>
                                            <span className="text-base leading-normal">
                                                Constancia de CUIT
                                            </span>
                                            <input
                                                type="file"
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-4 flex">
                                    <div className="form-control w-full">
                                        <input
                                            type="text"
                                            placeholder="Nro de IIBB"
                                            onChange={e => {
                                                SignUpStore.update(s => {
                                                    s.datosEmpresa.iibb =
                                                        e.target.value
                                                })
                                            }}
                                            className="input input-bordered"
                                        />
                                    </div>
                                    <div className="form-control ml-4">
                                        <label
                                            className="
                                                        w-64
                                                        flex flex-col
                                                        items-center
                                                        px-4
                                                        py-3
                                                        bg-white
                                                        rounded-md
                                                        shadow-md
                                                        tracking-wide
                                                        uppercase
                                                        border border-blue
                                                        cursor-pointer
                                                        hover:bg-purple-600 hover:text-white
                                                        text-purple-600
                                                        ease-linear
                                                        transition-all
                                                        duration-150
                                                    "
                                        >
                                            <i className="fas fa-cloud-upload-alt fa-3x"></i>
                                            <span className="text-base leading-normal">
                                                Constancia de IIBB
                                            </span>
                                            <input
                                                type="file"
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="form-control">
                                        <input
                                            type="text"
                                            onChange={e => {
                                                SignUpStore.update(s => {
                                                    s.datosEmpresa.domicilioLegal =
                                                        e.target.value
                                                })
                                            }}
                                            placeholder="Domicilio legal"
                                            className="input input-bordered"
                                        />
                                    </div>
                                </div>
                                <section>
                                    <h2>Destinatario Factura</h2>
                                    <div className="mb-4">
                                        <div className="form-control">
                                            <select
                                                onChange={e => {
                                                    SignUpStore.update(s => {
                                                        s.datosEmpresa.destinatarioFactura.condicionAfip =
                                                            e.target.value
                                                    })
                                                }}
                                                className="select select-bordered w-full "
                                            >
                                                <option>
                                                    Condición frente a AFIP
                                                </option>
                                                <option value="MONOTRIBUTO">
                                                    Monotributista
                                                </option>
                                                <option value="RESPONSABLE INSCRIPTO">
                                                    Responsable Inscripto
                                                </option>
                                                <option value="RESPONSABLE EXENTO">
                                                    Responsable Exento
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <div className="form-control">
                                            <input
                                                type="text"
                                                onChange={e => {
                                                    SignUpStore.update(s => {
                                                        s.datosEmpresa.destinatarioFactura.nombreComercial =
                                                            e.target.value
                                                    })
                                                }}
                                                placeholder="Nombre comercial"
                                                className="input input-bordered"
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4 flex">
                                        <div className="form-control w-full">
                                            <input
                                                type="text"
                                                onChange={e => {
                                                    SignUpStore.update(s => {
                                                        s.datosEmpresa.destinatarioFactura.cuit =
                                                            e.target.value
                                                    })
                                                }}
                                                placeholder="Cuit"
                                                className="input input-bordered"
                                            />
                                        </div>

                                        <div className="form-control ml-4">
                                            <label
                                                className="
                                                        w-64
                                                        flex flex-col
                                                        items-center
                                                        px-4
                                                        py-3
                                                        bg-white
                                                        rounded-md
                                                        shadow-md
                                                        tracking-wide
                                                        uppercase
                                                        border border-blue
                                                        cursor-pointer
                                                        hover:bg-purple-600 hover:text-white
                                                        text-purple-600
                                                        ease-linear
                                                        transition-all
                                                        duration-150
                                                    "
                                            >
                                                <i className="fas fa-cloud-upload-alt fa-3x"></i>
                                                <span className="text-base leading-normal">
                                                    Constancia de CUIT
                                                </span>
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="flex justify-end items-center">
                                <button
                                    onClick={goNext}
                                    className="py-4 px-8 text-sm text-white font-semibold leading-none bg-blue-600 hover:bg-blue-700 rounded"
                                >
                                    Submit
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
