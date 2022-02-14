import React from 'react'
import type { NextPage } from 'next'
import { SignUpStore } from '../../store/sigup.store'
import { useForm, useFormState } from 'react-hook-form'
import FileUpload from '../../components/fileupload/fileUpload'
import { useRouter } from 'next/router'

interface FilesOpts {
    type: string
    size: number
    extension: string
    name: string
}

interface Inscription {
    readonly: boolean
    filesOpts?: Array<FilesOpts>
}

const Inscription: NextPage<Inscription> = ({ readonly, filesOpts = [] }) => {
    const state = SignUpStore.useState(s => s)
    const router = useRouter()
    const onSubmit = (data: any) => {
        SignUpStore.update(s => {
            s.datosEmpresa.grupoEconomico = data.grupoEconomico
            s.datosEmpresa.razonSocial.value = data.razonSocial
            s.datosEmpresa.medio = data.medio
            s.datosEmpresa.cuit.value = data.cuit
            s.datosEmpresa.iibb.value = data.iibb
            s.datosEmpresa.domicilioLegal = data.domicilioLegal
            s.datosEmpresa.destinatarioFactura.condicionAfip =
                data.condicionAfipDestinatario
            s.datosEmpresa.destinatarioFactura.nombreComercial =
                data.nombreComercialDestinatario
            s.datosEmpresa.destinatarioFactura.cuit.value =
                data.cuitDestinatario
        })
        router.push('/signup/offer-letter')
    }
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
    return (
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
                            <h1>Complete todos los datos y pulse finalizar</h1>
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
                                            defaultValue={
                                                state.datosEmpresa
                                                    .grupoEconomico
                                            }
                                            readOnly={readonly}
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
                                            disabled={readonly}
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
                                            defaultValue={
                                                state.datosEmpresa.medio
                                            }
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
                                            readOnly={readonly}
                                            type="text"
                                            {...register('razonSocial', {
                                                required: true
                                            })}
                                            defaultValue={
                                                state.datosEmpresa.razonSocial
                                                    .value
                                            }
                                            placeholder="Nombre comercial"
                                            className={`input input-bordered ${
                                                errors.razonSocial &&
                                                dirtyFields.razonSocial &&
                                                touchedFields.razonSocial &&
                                                'input-error'
                                            }`}
                                        />
                                    </div>
                                    <FileUpload
                                        onChange={() => null}
                                        optionalParams={
                                            filesOpts?.length > 0
                                                ? filesOpts?.filter(f => {
                                                      const file =
                                                          f.type ===
                                                          'razonSocial'
                                                      return file
                                                  })
                                                : filesOpts
                                        }
                                        readonly={readonly}
                                        placeholder="Contrato Social"
                                        extensions={['jpg', 'pdf', 'jpeg']}
                                        type="razonSocial"
                                    />
                                </div>
                                <div className="mb-4 flex">
                                    <div className="form-control w-full">
                                        <input
                                            type="number"
                                            defaultValue={
                                                state.datosEmpresa.cuit.value
                                            }
                                            {...register('cuit', {
                                                required: true
                                            })}
                                            readOnly={readonly}
                                            placeholder="Cuit"
                                            className={`input input-bordered ${
                                                errors.cuit &&
                                                dirtyFields.cuit &&
                                                touchedFields.cuit &&
                                                'input-error'
                                            }`}
                                        />
                                    </div>
                                    <FileUpload
                                        onChange={() => null}
                                        optionalParams={filesOpts?.filter(f => {
                                            const file = f.type === 'cuit'
                                            return file
                                        })}
                                        readonly={readonly}
                                        placeholder="Constancia de CUIT"
                                        extensions={['jpg', 'pdf', 'jpeg']}
                                        type="cuit"
                                    />
                                </div>
                                <div className="mb-4 flex">
                                    <div className="form-control w-full">
                                        <input
                                            type="text"
                                            defaultValue={
                                                state.datosEmpresa.iibb.value
                                            }
                                            placeholder="Nro de IIBB"
                                            {...register('iibb', {
                                                required: true
                                            })}
                                            readOnly={readonly}
                                            className={`input input-bordered ${
                                                errors.iibb &&
                                                dirtyFields.iibb &&
                                                touchedFields.iibb &&
                                                'input-error'
                                            }`}
                                        />
                                    </div>
                                    <FileUpload
                                        onChange={() => null}
                                        optionalParams={filesOpts?.filter(f => {
                                            const file = f.type === 'iibb'
                                            return file
                                        })}
                                        readonly={readonly}
                                        placeholder="Constancia de IIBB"
                                        extensions={['jpg', 'pdf', 'jpeg']}
                                        type="iibb"
                                    />
                                </div>
                                <div className="mb-4">
                                    <div className="form-control">
                                        <input
                                            type="text"
                                            defaultValue={
                                                state.datosEmpresa
                                                    .domicilioLegal
                                            }
                                            readOnly={readonly}
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
                                                disabled={readonly}
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
                                                defaultValue={
                                                    state.datosEmpresa
                                                        .destinatarioFactura
                                                        .condicionAfip
                                                }
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
                                                defaultValue={
                                                    state.datosEmpresa
                                                        .destinatarioFactura
                                                        .nombreComercial
                                                }
                                                readOnly={readonly}
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
                                                defaultValue={
                                                    state.datosEmpresa
                                                        .destinatarioFactura
                                                        .cuit.value
                                                }
                                                {...register(
                                                    'cuitDestinatario',
                                                    {
                                                        required: true
                                                    }
                                                )}
                                                readOnly={readonly}
                                                placeholder="Cuit"
                                                className={`input input-bordered ${
                                                    errors.cuitDestinatario &&
                                                    dirtyFields.cuitDestinatario &&
                                                    touchedFields.cuitDestinatario &&
                                                    'input-error'
                                                }`}
                                            />
                                        </div>
                                        <FileUpload
                                            onChange={() => null}
                                            optionalParams={filesOpts?.filter(
                                                f => {
                                                    const file =
                                                        f.type ===
                                                        'destinatarioFactura.cuit'
                                                    return file
                                                }
                                            )}
                                            readonly={readonly}
                                            placeholder="Constancia de CUIT"
                                            extensions={['jpg', 'pdf', 'jpeg']}
                                            type="cuitDestinatario"
                                        />
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
    )
}

export default Inscription
