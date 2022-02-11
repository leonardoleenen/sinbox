import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { workflowService } from '../../services/workflow.service'
import { ruleEngine } from '../../services/rule.engine.service'
import { materialRenderers, materialCells } from '@jsonforms/material-renderers'
import { JsonForms } from '@jsonforms/react'
import { getToken, tokenDecode } from '../../services/auth.service'
import ClearContainer from '../../components/container/clear'
import Loading from '../../components/loader'
import Success from '../../components/success'
import FileUpload from '../../components/fileupload/fileUpload'

interface FilesOpts {
    type: string
    size: number
    extension: string
    name: string
}

const Page: NextPage = () => {
    const router = useRouter()

    const { wfid, processId } = router.query
    const [formSpec, setFormSpec] = useState<WorkFlowForm>()
    const [rule, setRule] = useState<any>()
    const [dataForm, setDataForm] = useState({})
    const [showSuccess, setShowSuccess] = useState(false)
    const [wfSpec, setWfSpec] = useState<WorkflowSpec | null>(null)

    useEffect(() => {
        ;(async () => {
            if (!wfid) return

            const _wfSpec = await workflowService.getSpec(wfid as string)
            setWfSpec(_wfSpec)
            const user = tokenDecode(getToken() as string)
            const ruleResult = await ruleEngine.execute(
                _wfSpec.ruleAsset as any,
                {
                    signal: 'START',
                    role: user.role
                }
            )

            setRule(ruleResult[0].result)

            if (!ruleResult[0].result) {
                router.push('/403')
                return
            }

            const formSpecResult = await workflowService.getFormSpec(
                ruleResult[0].result.formToShow
            )

            setFormSpec({
                ...formSpecResult,
                spec: {
                    uischema:
                        formSpecResult &&
                        formSpecResult.spec &&
                        formSpecResult.spec.uischema,
                    schema:
                        formSpecResult &&
                        formSpecResult.spec &&
                        formSpecResult.spec.schema
                }
            })
        })()
    }, [wfid])

    if (!formSpec) return <Loading />

    const workflowNextStep = async () => {
        await workflowService.createProcess(
            wfSpec as WorkflowSpec,
            dataForm,
            formSpec
        )

        setShowSuccess(true)
    }

    if (showSuccess)
        return (
            <Success
                title={`Solicitud ${formSpec.title} Enviada correctamente`}
                content={
                    <>
                        <p className="text-sm md:text-base text-white pt-8">
                            Su solicitud ha sido recibida exitosamente. Ahora
                            debe esperar a que el área responsable verifique los
                            datos suministrados. Una vez realizado esto, será
                            notificado por email la conclusión del mismo
                        </p>
                        <button
                            onClick={() => router.push('/process')}
                            className="btn btn-primary mt-8"
                        >
                            Volver
                        </button>
                    </>
                }
            />
        )

    return (
        <ClearContainer
            title={formSpec.title}
            actions={
                <div className="flex">
                    <button
                        onClick={() => router.push('/process')}
                        className="btn  btn-link mr-6 "
                    >
                        Volver
                    </button>
                    <button
                        onClick={workflowNextStep}
                        className="btn btn-primary"
                    >
                        {rule.willBeRequiredDescription}
                    </button>
                </div>
            }
        >
            <div className="p-16">
                <JsonForms
                    schema={formSpec && formSpec.spec && formSpec.spec.schema}
                    uischema={
                        formSpec && formSpec.spec && formSpec.spec.uischema
                    }
                    data={dataForm}
                    renderers={materialRenderers}
                    cells={materialCells}
                    onChange={({ data }) => {
                        setDataForm(data)
                    }}
                />

                <div className="flex">
                    {formSpec.attachments.map((a, index) => (
                        <FileUpload
                            key={a.fieldId}
                            readonly={false}
                            placeholder={a.fieldName}
                            extensions={['pdf']}
                            type="cuit"
                            onChange={(value: string) => {
                                const tempData = {
                                    ...dataForm,
                                    attachements: dataForm.attachements
                                        ? dataForm.attachements
                                        : {}
                                }
                                tempData.attachements[a.fieldId as string] = {
                                    id: a.fieldId,
                                    value: value as string,
                                    description: a.fieldName
                                }
                                setDataForm({
                                    ...tempData
                                })
                            }}
                        />
                    ))}
                </div>
            </div>
        </ClearContainer>
    )
}

export default Page
