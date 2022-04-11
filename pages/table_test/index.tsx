import React from 'react'
import type { NextPage } from 'next'
import Table from '../../components/Table/index'

const Page: NextPage = () => {
    return (
        <div>
            <Table
                y_axis={[
                    { title: 'Nombre', index: 'nombre' },
                    { title: 'Edad', index: 'edad' },
                    { title: 'Peso', index: 'peso' },
                    { title: 'Custom', index: 'custom' }
                ]}
                x_axis={[
                    {
                        nombre: 'alex',
                        edad: '12',
                        peso: '12kg',
                        custom: <button className="font-bold">Text</button>
                    },
                    {
                        nombre: 'pepito',
                        edad: '19',
                        peso: '20kg',
                        custom: <button className="font-bold">Text</button>
                    },
                    {
                        nombre: 'Juan',
                        edad: '19',
                        peso: '20kg',
                        custom: <button className="font-bold">Text</button>
                    },
                    {
                        nombre: 'Rodrigo',
                        edad: '19',
                        peso: '20kg',
                        custom: <button className="font-bold">Text</button>
                    },
                    {
                        nombre: 'Hernesto',
                        edad: '19',
                        peso: '20kg',
                        custom: <button className="font-bold">Text</button>
                    },
                    {
                        nombre: 'Francisco',
                        edad: '19',
                        peso: '20kg',
                        custom: <button className="font-bold">Text</button>
                    }
                ]}
                itemsPerPage={2}
            ></Table>
        </div>
    )
}

export default Page
