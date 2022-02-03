import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import ClearContainer from '../../components/container/clear'
import { JsonForms } from '@jsonforms/react'
import dynamic from 'next/dynamic'
import { materialRenderers, materialCells } from '@jsonforms/material-renderers'
import { UISchemaElement } from '@jsonforms/core'
import { useRouter } from 'next/router'

const DynamicComponentWithNoSSR = dynamic(
    () => import('../../components/jsoneditor'),
    {
        ssr: false
    }
)

const Page: NextPage = () => {
    const [activeTab, setActiveTab] = useState(1)
    const [uiSchema, setUISchema] = useState({
        type: 'Group',
        elements: [
            {
                type: 'Control',
                scope: '#/properties/name',
                label: 'Nombre'
            },
            {
                type: 'Control',
                scope: '#/properties/occupation',
                label: 'Ocupacion'
            },
            {
                type: 'Control',
                scope: '#/properties/birthDate',
                label: 'Fecha de Nacimiento'
            },
            {
                type: 'Control',
                scope: '#/properties/friends'
            }
        ],
        label: 'Datos'
    })
    const [schema, setSchema] = useState(schemaEmpty)
    const [dataForm, setDataForm] = useState({})
    const router = useRouter()
    return (
        <ClearContainer
            title="New Form"
            actions={
                <div className="flex">
                    <button
                        className="btn btn-error mr-6"
                        onClick={() => router.push('/forms/list')}
                    >
                        Volver
                    </button>
                    <button className="btn btn-primary">Guardar</button>
                </div>
            }
        >
            <div className="flex">
                <div className="w-1/3">
                    <div className={`tabs mb-8 `}>
                        <a
                            onClick={() => setActiveTab(1)}
                            className={`tab tab-bordered ${
                                activeTab === 1 && 'tab-active'
                            } `}
                        >
                            <div>Definición de esquema</div>
                        </a>
                        <a
                            onClick={() => setActiveTab(2)}
                            className={`tab tab-bordered ${
                                activeTab === 2 && 'tab-active'
                            }`}
                        >
                            <div>Definición de formulario</div>
                        </a>
                    </div>
                    {activeTab === 2 && (
                        <DynamicComponentWithNoSSR
                            src={uiSchema}
                            updateFunction={setUISchema}
                        />
                    )}
                    {activeTab === 1 && (
                        <DynamicComponentWithNoSSR
                            src={schema}
                            updateFunction={setSchema}
                        />
                    )}
                </div>

                <div className="w-2/3">
                    <JsonForms
                        schema={schema}
                        uischema={uiSchema as UISchemaElement}
                        data={dataForm}
                        renderers={materialRenderers}
                        cells={materialCells}
                        onChange={({ data }) => {
                            setDataForm(data)
                        }}
                    />
                </div>
            </div>
        </ClearContainer>
    )
}

export default Page

const schemaEmpty = {
    type: 'object',
    title: 'Person',
    properties: {
        name: {
            type: 'string',
            minLength: 3
        },
        birthDate: {
            type: 'string',
            format: 'date'
        },
        personalData: {
            type: 'object',
            required: ['age', 'height'],
            properties: {
                age: {
                    type: 'integer',
                    description: 'Please enter your age.'
                },
                height: {
                    type: 'number'
                },
                drivingSkill: {
                    type: 'number',
                    maximum: 10,
                    minimum: 1,
                    default: 7
                }
            }
        },
        friends: {
            type: 'array',
            items: {
                type: 'object',
                title: 'Friend',
                properties: {
                    name: {
                        type: 'string'
                    },
                    isClose: {
                        type: 'boolean'
                    }
                }
            }
        },
        nationality: {
            type: 'string',
            enum: ['DE', 'IT', 'JP', 'US', 'RU', 'Other']
        },
        occupation: {
            type: 'string'
        }
    }
}
