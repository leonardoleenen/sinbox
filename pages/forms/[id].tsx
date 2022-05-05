import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import ClearContainer from '../../components/container/clear'

import dynamic from 'next/dynamic'
import { materialRenderers, materialCells } from '@jsonforms/material-renderers'
import { UISchemaElement } from '@jsonforms/core'
import { JsonForms } from '@jsonforms/react'
import Loading from '../../components/loader'

import { useRouter } from 'next/router'
import { workflowService } from '../../services/workflow.service'
import { format } from 'path/posix'

const DynamicComponentWithNoSSR = dynamic(
    () => import('../../components/jsoneditor'),
    {
        ssr: false
    }
)

const Page: NextPage = () => {
    const [activeTab, setActiveTab] = useState(2)
    const [isSaving, setIsSaving] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [uiSchema, setUISchema] = useState({
        type: 'Group',
        elements: [
            {
                type: 'Control',
                scope: '#/properties/name',
                label: 'Nombre'
            }
        ],
        label: 'Datos'
    })
    const [schema, setSchema] = useState(schemaEmpty)
    const [dataForm, setDataForm] = useState({})
    const router = useRouter()
    const [wfForm, setWfForm] = useState<WorkFlowForm>({
        id: '',
        description: '',
        spec: null,
        subTitle: '',
        title: 'Sin Titulo',
        lastUpdated: new Date().getTime(),
        attachments: []
    })

    const { id } = router.query

    useEffect(() => {
        if (!id || id === 'new') {
            setIsLoading(false)
            return
        } else {
            workflowService.getFormSpec(id as string).then(fspec => {
                setIsLoading(false)
                setWfForm(fspec)
                setUISchema(fspec.spec?.uischema)
                setSchema(fspec.spec?.schema)
            })
        }
    }, [id])

    const save = () => {
        setIsSaving(true)
        workflowService
            .saveFormSpec({
                ...wfForm,
                spec: {
                    schema,
                    uischema: uiSchema
                }
            })
            .then(r => {
                setWfForm(r)
                setIsSaving(false)
            })
    }

    if (isLoading) return <Loading />
    return (
        <ClearContainer
            title={wfForm.title}
            onChangeTitle={(e: string) =>
                setWfForm({
                    ...wfForm,
                    title: e
                })
            }
            actions={
                <div className="flex">
                    <button
                        className="btn btn-error mr-6"
                        onClick={() => router.push('/forms/list')}
                    >
                        Volver
                    </button>
                    <button
                        className={`btn btn-primary ${isSaving && 'loading'}`}
                        onClick={save}
                    >
                        Guardar
                    </button>
                </div>
            }
        >
            <div className="flex">
                <div className="w-1/3">
                    <div className={`tabs mb-8 `}>
                        <a
                            onClick={() => setActiveTab(2)}
                            className={`tab tab-bordered ${
                                activeTab === 2 && 'tab-active'
                            }`}
                        >
                            <div>Definición de formulario</div>
                        </a>
                        <a
                            onClick={() => setActiveTab(1)}
                            className={`tab tab-bordered ${
                                activeTab === 1 && 'tab-active'
                            } `}
                        >
                            <div>Definición de esquema</div>
                        </a>
                    </div>

                    {activeTab === 1 && (
                        <DynamicComponentWithNoSSR
                            src={schema}
                            updateFunction={setSchema}
                        />
                    )}
                    {activeTab === 2 && (
                        <DynamicComponentWithNoSSR
                            src={uiSchema}
                            updateFunction={setUISchema}
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
