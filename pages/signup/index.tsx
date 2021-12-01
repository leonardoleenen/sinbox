import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { SignUpStore } from '../../store/sigup.store'
const Page: NextPage = () => {
    const router = useRouter()
    const state = SignUpStore.useState(s => s)
    // console.log(state)
    const goNext = () => {
        router.push('/signup/inscription')
    }

    return (
        <section className="py-20">
            <div className="container px-4 mx-auto">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="max-w-md mb-8 mx-auto prose">
                        <span className="text-sm text-blueGray-400">
                            Registro de Usuario
                        </span>
                        <h1>Datos personales de contacto</h1>
                    </div>

                    <div>
                        <div className="mb-4">
                            <div className="form-control">
                                <input
                                    type="text"
                                    onChange={e => {
                                        SignUpStore.update(s => {
                                            s.userCn = e.target.value
                                            s.datosEmpresa.representante.nombreApellido =
                                                e.target.value
                                        })
                                    }}
                                    value={state.userCn}
                                    placeholder="Nombre y Apellido Completo"
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
                                            s.email = e.target.value
                                            s.datosEmpresa.representante.email =
                                                e.target.value
                                        })
                                    }}
                                    value={state.email}
                                    placeholder="Email de contacto"
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
                                            s.personalId = e.target.value
                                            s.datosEmpresa.representante.id =
                                                e.target.value
                                        })
                                    }}
                                    placeholder="Nro de DNI"
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
                                            s.datosEmpresa.representante.telefono =
                                                e.target.value
                                        })
                                    }}
                                    placeholder="Telefono"
                                    className="input input-bordered"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end items-center">
                            <button
                                className="btn btn-primary"
                                disabled={
                                    !state.personalId ||
                                    !state.email ||
                                    !state.userCn
                                        ? true
                                        : false
                                }
                                onClick={goNext}
                            >
                                Continuar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Page
