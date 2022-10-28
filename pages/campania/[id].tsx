import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import ClearContainer from '../../components/container/clear'
import { workflowService } from '../../services/workflow.service'
import { JsonForms } from '@jsonforms/react'
import { UISchemaElement } from '@jsonforms/core'
import { materialCells, materialRenderers } from '@jsonforms/material-renderers'
import { campaniaService } from '../../services/campania.service'
import { useRouter } from 'next/router'
import { customAlphabet } from 'nanoid'

const Page: NextPage = () => {
    const [titulo, setTitulo] = useState('Sin nombre')
    const { id } = useRouter().query
    const [isLoading, setIsLoading] = useState(false)
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
    const [dataForm, setDataForm] = useState<any>({})
    const router = useRouter()

    useEffect(() => {
        workflowService.getFormSpec('db181633dc').then(fspec => {
            setUISchema(fspec.spec?.uischema)
            setSchema(fspec.spec?.schema)
        })
    }, [])

    useEffect(() => {
        if (id && id !== 'new') {
            setIsLoading(true)
            campaniaService.get(id as string).then(campania => {
                setDataForm(campania)
                setTitulo(campania.titulo)
                setIsLoading(false)
            })
        }
    }, [id])

    // console.log(dataForm)

    const save = async () => {
        setIsLoading(true)
        const nanoId = customAlphabet('1234567890abcdef', 6)
        const result = await campaniaService.save({
            ...dataForm,
            id: dataForm.id || nanoId(),
            titulo: titulo
        })
        setDataForm(result)
        setIsLoading(false)
    }
    return (
        <ClearContainer
            className=""
            title={titulo}
            headTitle={'Edición de campaña'}
            onChangeTitle={(val: string) => setTitulo(val)}
            actions={
                <div className="flex space-x-4">
                    <button
                        className="btn btn-error"
                        onClick={() => router.push('/campania')}
                    >
                        Volver
                    </button>
                    <button
                        className={`btn btn-primary ${isLoading && 'loading'}`}
                        onClick={save}
                    >
                        Guardar
                    </button>
                </div>
            }
        >
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
