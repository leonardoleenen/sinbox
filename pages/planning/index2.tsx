import React from 'react'
import type { NextPage } from 'next'
import Calendar from '../../components/calendar'
import Header from '../../components/header'
import Container from '../../components/container'

const Page: NextPage = () => {
    return (
        <div>
            <Header />
            <Container>
                <div className="my-6">
                    <h2 className="text-2xl mb-2 leading-tight font-bold font-heading">
                        Planificación de pauta publicitaria
                    </h2>
                </div>
                <div className="bg-gray-200 w-full flex rounded">
                    <select className="select select-bordered w-full max-w-xs m-4 ">
                        <option disabled="disabled" selected="selected">
                            Provincia
                        </option>
                        <option>Buenos Aires</option>
                        <option>Santa Fe</option>
                    </select>
                    <select className="select select-bordered w-full max-w-xs m-4 ">
                        <option disabled="disabled" selected="selected">
                            Departamento
                        </option>
                        <option>Capital</option>
                        <option>Rosario</option>
                    </select>
                    <select className="select select-bordered w-full max-w-xs m-4 ">
                        <option disabled="disabled" selected="selected">
                            Ciudades
                        </option>
                        <option>Santa Fe</option>
                        <option>Rosario</option>
                    </select>
                    <select className="select select-bordered w-full max-w-xs m-4 ">
                        <option disabled="disabled" selected="selected">
                            Elija el grupo economico
                        </option>
                        <option>telekinesis</option>
                        <option>time travel</option>
                        <option>invisibility</option>
                    </select>

                    <select className="select select-bordered w-full max-w-xs m-4 ">
                        <option disabled="disabled" selected="selected">
                            Elija el medio
                        </option>
                        <option>Radio</option>
                        <option>Television</option>
                        <option>Internet</option>
                    </select>

                    <div className="m-4 flex w-full justify-end">
                        <button className="btn btn-primary">Buscar</button>
                    </div>
                </div>

                <div className="bg-gray-200 w-full flex rounded mt-4">
                    <div className="flex m-4">
                        <div>Importe en OPP: </div>
                        <div className="ml-2"> $20,000,000</div>
                    </div>

                    <div className="flex m-4 ml-24">
                        <div>Importe en OP: </div>
                        <div className="ml-2"> $1,000,000</div>
                    </div>
                </div>
                <Calendar />
                <div className="flex p-4 justify-center pt-8">
                    <button className="btn btn-primary">
                        Guardar estimación
                    </button>
                    <button className="ml-4 btn btn-secondary btn-outline">
                        Generar O.P.Ps
                    </button>
                </div>
            </Container>
        </div>
    )
}

export default Page
