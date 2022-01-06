/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import SecurePages from '../../components/signup/securePages'
import { SignUpStore } from '../../store/sigup.store'
import { useForm, useFormState } from 'react-hook-form'
const Page: NextPage = props => {
    const router = useRouter()
    const state = SignUpStore.useState(s => s)
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isValid, isDirty }
    } = useForm({ mode: 'onChange' })
    const onSubmit = (data: any) => {
        SignUpStore.update(s => {
            s.userCn = data.nombreApellido
            s.datosEmpresa.representante.nombreApellido = data.nombreApellido
            s.email = data.email
            s.datosEmpresa.representante.email = data.email
            s.personalId = data.dni
            s.datosEmpresa.representante.id = data.dni
            s.datosEmpresa.representante.telefono = data.phone
            s.loading = !s.loading
        })
        router.push('/signup/inscription')
    }
    const { dirtyFields, touchedFields } = useFormState({
        control
    })
    return (
        <SecurePages {...state}>
            <section className="py-20" id="signup">
                <div className="container px-4 mx-auto">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="max-w-md mb-8 mx-auto prose">
                            <span className="text-sm text-blueGray-400">
                                Registro de Usuario
                            </span>
                            <h1>Datos personales de contacto</h1>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <div className="form-control">
                                    <input
                                        type="text"
                                        {...register('nombreApellido', {
                                            required: true
                                        })}
                                        defaultValue={state.userCn}
                                        placeholder="Nombre y Apellido Completo"
                                        className={`input input-bordered ${
                                            errors.nombreApellido &&
                                            dirtyFields.nombreApellido &&
                                            touchedFields.nombreApellido &&
                                            'input-error'
                                        }`}
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="form-control">
                                    <input
                                        type="text"
                                        {...register('email', {
                                            required: true
                                        })}
                                        defaultValue={state.email}
                                        placeholder="Email de contacto"
                                        className={`input input-bordered ${
                                            errors.email &&
                                            dirtyFields.email &&
                                            touchedFields.email &&
                                            'input-error'
                                        }`}
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="form-control">
                                    <input
                                        type="number"
                                        {...register('dni', {
                                            required: true
                                        })}
                                        placeholder="Nro de DNI"
                                        className={`input input-bordered ${
                                            errors.dni &&
                                            dirtyFields.dni &&
                                            touchedFields.dni &&
                                            'input-error'
                                        }`}
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="form-control">
                                    <input
                                        type="tel"
                                        {...register('phone', {
                                            required: true
                                        })}
                                        placeholder="Telefono"
                                        className={`input input-bordered ${
                                            errors.phone &&
                                            dirtyFields.phone &&
                                            touchedFields.phone &&
                                            'input-error'
                                        }`}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end items-center">
                                <button
                                    className="btn btn-primary"
                                    disabled={!isDirty || !isValid}
                                    type="submit"
                                >
                                    Continuar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </SecurePages>
    )
}

export default Page
