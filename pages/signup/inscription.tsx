import React, { useState, useLayoutEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { SignUpStore } from '../../store/sigup.store'
import { businessService } from '../../services/business.service'
import { isString } from 'lodash'
import SecurePages from '../../components/signup/securePages'
import { useForm, useFormState } from 'react-hook-form'
const Page: NextPage = () => {
    const router = useRouter()
    const state = SignUpStore.useState(s => s)
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isValid, isDirty },
        getValues
    } = useForm({ mode: 'onChange' })
    const { dirtyFields, touchedFields } = useFormState({
        control
    })
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

    const onSubmit = (data: any) => {
        SignUpStore.update(s => {
            s.datosEmpresa.grupoEconomico = data.grupoEconomico
            s.datosEmpresa.razonSocial = data.razonSocial
            s.datosEmpresa.medio = data.medio
            s.datosEmpresa.cuit = data.cuit
            s.datosEmpresa.iibb = data.iibb
            s.datosEmpresa.domicilioLegal = data.domicilioLegal
            s.datosEmpresa.destinatarioFactura.condicionAfip =
                data.condicionAfipDestinatario
            s.datosEmpresa.destinatarioFactura.nombreComercial =
                data.nombreComercialDestinatario
            s.datosEmpresa.destinatarioFactura.cuit = data.cuitDestinatario
        })
        router.push('/signup/offer-letter')
    }
    return (
        <SecurePages {...state}>
            <div id="inscription">
                <section className="py-20 flex h-screen ">
                    <div className="container px-4 mx-auto">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="max-w-2xl mx-auto text-center prose"
                        >
                            <div className="max-w-md mb-8 mx-auto">
                                <span className="text-sm text-blueGray-400">
                                    Registro nuevo proveedor
                                </span>
                                <h1>
                                    Complete todos los datos y pulse finalizar
                                </h1>
                            </div>
                            <div>
                                <div className="prose">
                                    <div className="mb-4">
                                        <div className="form-control">
                                            <input
                                                type="text"
                                                {...register('grupoEconomico', {
                                                    required: true
                                                })}
                                                placeholder="Grupo economico"
                                                className={`input input-bordered ${
                                                    errors.grupoEconomico &&
                                                    dirtyFields.grupoEconomico &&
                                                    touchedFields.grupoEconomico &&
                                                    'input-error'
                                                }`}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <div className="form-control">
                                            <select
                                                {...register('medio', {
                                                    required: true,
                                                    minLength: {
                                                        value: 3,
                                                        message:
                                                            'Escribi un medio correcto'
                                                    }
                                                })}
                                                className={`select select-bordered w-full  ${
                                                    errors.medio &&
                                                    dirtyFields.medio &&
                                                    touchedFields.medio &&
                                                    'input-error'
                                                }`}
                                                defaultValue=""
                                            >
                                                <option value="">
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
                                                {...register('razonSocial', {
                                                    required: true
                                                })}
                                                placeholder="Nombre comercial"
                                                className={`input input-bordered ${
                                                    errors.razonSocial &&
                                                    dirtyFields.razonSocial &&
                                                    touchedFields.razonSocial &&
                                                    'input-error'
                                                }`}
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
                                                type="number"
                                                {...register('cuit', {
                                                    required: true
                                                })}
                                                placeholder="Cuit"
                                                className={`input input-bordered ${
                                                    errors.cuit &&
                                                    dirtyFields.cuit &&
                                                    touchedFields.cuit &&
                                                    'input-error'
                                                }`}
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
                                                {...register('iibb', {
                                                    required: true
                                                })}
                                                className={`input input-bordered ${
                                                    errors.iibb &&
                                                    dirtyFields.iibb &&
                                                    touchedFields.iibb &&
                                                    'input-error'
                                                }`}
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
                                                {...register('domicilioLegal', {
                                                    required: true
                                                })}
                                                placeholder="Domicilio legal"
                                                className={`input input-bordered ${
                                                    errors.domicilioLegal &&
                                                    dirtyFields.domicilioLegal &&
                                                    touchedFields.domicilioLegal &&
                                                    'input-error'
                                                }`}
                                            />
                                        </div>
                                    </div>
                                    <section>
                                        <h2>Destinatario Factura</h2>
                                        <div className="mb-4">
                                            <div className="form-control">
                                                <select
                                                    {...register(
                                                        'condicionAfipDestinatario',
                                                        {
                                                            required: true,
                                                            minLength: {
                                                                value: 3,
                                                                message:
                                                                    'Escribi un medio correcto'
                                                            }
                                                        }
                                                    )}
                                                    className={`input input-bordered ${
                                                        errors.condicionAfipDestinatario &&
                                                        dirtyFields.condicionAfipDestinatario &&
                                                        touchedFields.condicionAfipDestinatario &&
                                                        'input-error'
                                                    }`}
                                                    defaultValue=""
                                                >
                                                    <option value="">
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
                                                    {...register(
                                                        'nombreComercialDestinatario',
                                                        {
                                                            required: true
                                                        }
                                                    )}
                                                    placeholder="Nombre comercial"
                                                    className={`input input-bordered ${
                                                        errors.nombreComercialDestinatario &&
                                                        dirtyFields.nombreComercialDestinatario &&
                                                        touchedFields.nombreComercialDestinatario &&
                                                        'input-error'
                                                    }`}
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-4 flex">
                                            <div className="form-control w-full">
                                                <input
                                                    type="number"
                                                    {...register(
                                                        'cuitDestinatario',
                                                        {
                                                            required: true
                                                        }
                                                    )}
                                                    placeholder="Cuit"
                                                    className={`input input-bordered ${
                                                        errors.cuitDestinatario &&
                                                        dirtyFields.cuitDestinatario &&
                                                        touchedFields.cuitDestinatario &&
                                                        'input-error'
                                                    }`}
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
                                        type="submit"
                                        disabled={!isDirty || !isValid}
                                        className="btn btn-primary"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </SecurePages>
    )
}

export default Page
