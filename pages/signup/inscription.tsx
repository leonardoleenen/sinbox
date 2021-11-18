import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Page: NextPage = () => {
    const router = useRouter()

    const CompanyData = () => {
        return (
            <div className="prose">
                <div className="mb-4">
                    <div className="form-control">
                        <input
                            type="text"
                            placeholder="Razon Social"
                            className="input input-bordered"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <div className="form-control">
                        <input
                            type="text"
                            placeholder="Cuit"
                            className="input input-bordered"
                        />
                    </div>
                </div>
                <section>
                    <h2>Apoderados / Reprentantes legales</h2>
                    <div className="flex justify-between">
                        <section className="flex">
                            <div className="form-control">
                                <input
                                    type="text"
                                    placeholder="Nombre y Apellido"
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="form-control">
                                <input
                                    type="text"
                                    placeholder="DNI"
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="form-control">
                                <input
                                    type="text"
                                    placeholder="Email"
                                    className="input input-bordered"
                                />
                            </div>
                            <button className="btn btn-outline btn-primary">
                                Agregar
                            </button>
                        </section>
                    </div>
                </section>
            </div>
        )
    }

    const PersonalData = () => {
        return <div> Personal </div>
    }

    return (
        <div>
            <section className="py-20 flex h-screen ">
                <div className="container px-4 mx-auto">
                    <div className="max-w-2xl mx-auto text-center prose">
                        <div className="max-w-md mb-8 mx-auto">
                            <span className="text-sm text-blueGray-400">
                                Registro nueva persona física
                            </span>
                            <h1>Complete todos los datos y pulse finalizar</h1>
                        </div>
                        <div>
                            <div className="mb-4 text-sm">
                                <span className="mr-4 font-semibold">
                                    Tipo de Inscripción
                                </span>
                                <label className="mr-4">
                                    <input
                                        className="mr-1"
                                        type="radio"
                                        name="department"
                                        value="1"
                                    />
                                    <span>Persona Fisica</span>
                                </label>
                                <label>
                                    <input
                                        className="mr-1"
                                        type="radio"
                                        name="department"
                                        value="2"
                                    />
                                    <span>Persona Juridica</span>
                                </label>
                            </div>
                            <CompanyData />
                            <div className="flex justify-end items-center">
                                <button
                                    onClick={() =>
                                        router.push('/inbox/success')
                                    }
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
