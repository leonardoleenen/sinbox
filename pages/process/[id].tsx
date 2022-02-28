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
import moment from 'moment'

interface FilesOpts {
    type: string
    size: number
    extension: string
    name: string
}

const Page: NextPage = () => {
    const router = useRouter()
    const { id } = router.query

    const [showSuccess, setShowSuccess] = useState(false)
    const [process, setProcess] = useState<WorkflowProcess>()
    const [formSpec, setFormSpec] = useState<WorkFlowForm>()
    const [rule, setRule] = useState<any>()
    const [isFinalStep, setIsFinalStep] = useState(false)
    const [dataForm, setDataForm] = useState<{
        id: string
        description: string
        value: string
        attachements: any
    }>({
        id: '',
        description: '',
        value: '',
        attachements: {}
    })
    const [evidenceIndex, setEvidenceIndex] = useState(-1)

    useEffect(() => {
        ;(async () => {
            if (!id) return
            const _process = await workflowService.getProcess(id as string)
            setProcess(_process)
        })()
    }, [id])

    useEffect(() => {
        ;(async () => {
            if (!process) return
            const _wfSpec = process.spec

            const user = tokenDecode(getToken() as string)
            const ruleResult = await ruleEngine.execute(
                _wfSpec.ruleAsset as any,
                {
                    signal: process.currentStep,
                    role: user.role
                }
            )

            setRule(ruleResult[0].result)

            if (!ruleResult[0].result && !process.processComplete) {
                router.push('/403')
                return
            }
            const formSpecResult = !process.processComplete
                ? await workflowService.getFormSpec(
                      ruleResult[0].result.formToShow
                  )
                : process.evidence[0].form

            !process.processComplete &&
                ruleResult[0].result.isFinalStep &&
                setIsFinalStep(ruleResult[0].result.isFinalStep)

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

            process.processComplete && setEvidenceIndex(0)
        })()
    }, [process])

    const workflowNextStep = async () => {
        await workflowService.moveNext(
            process as WorkflowProcess,
            isFinalStep,
            dataForm,
            formSpec as WorkFlowForm
        )
        setShowSuccess(true)
    }

    if (!formSpec) return <Loading />

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

    let attachements =
        evidenceIndex === -1
            ? formSpec.attachments &&
              formSpec.attachments.map(v => {
                  return { id: v.fieldId, description: v.fieldName }
              })
            : process?.evidence[evidenceIndex].data.attachements &&
              Object.keys(
                  process?.evidence[evidenceIndex].data.attachements
              ).map(
                  (k: string) =>
                      process?.evidence[evidenceIndex].data.attachements[k]
              )

    console.log(dataForm)
    if (!attachements) attachements = []

    return (
        <ClearContainer
            title={formSpec.title}
            actions={
                <div className="flex">
                    <button
                        onClick={() =>
                            process?.processComplete
                                ? router.push('/process/completed')
                                : router.push('/process')
                        }
                        className="btn btn-error mr-8 "
                    >
                        {process?.processComplete ? 'Volver' : 'Cancelar'}
                    </button>

                    {!process?.processComplete && (
                        <button
                            onClick={workflowNextStep}
                            className="btn btn-primary "
                        >
                            {rule.willBeRequiredDescription}
                        </button>
                    )}
                </div>
            }
        >
            <div className="flex">
                <div className="w-64 bg-gray-100 mr-4 shadow rounded-lg">
                    <ul className=" steps steps-vertical px-4">
                        {process?.evidence?.map((e, index: number) => (
                            <li
                                onClick={() => setEvidenceIndex(index)}
                                data-content={
                                    index === evidenceIndex ? '★' : index + 1
                                }
                                key={`evidence${index}`}
                                className="step step-info cursor-pointer "
                            >
                                <div className="text-left">
                                    <div>{e.action}</div>
                                    <div className="text-xs">
                                        {moment(e.date).format(
                                            'DD/MM/YYYY HH:mm:ss'
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                        {!process?.processComplete && (
                            <li
                                onClick={e => {
                                    setEvidenceIndex(-1)
                                    setDataForm({
                                        id: '',
                                        description: '',
                                        value: '',
                                        attachements: {}
                                    })
                                }}
                                className="step cursor-pointer"
                            >
                                {process?.currentStep}
                            </li>
                        )}
                    </ul>
                </div>
                <div className="w-full">
                    <div className="w-full">
                        <JsonForms
                            schema={
                                evidenceIndex === -1
                                    ? formSpec.spec.schema
                                    : process?.evidence[evidenceIndex].form.spec
                                          .schema
                            }
                            uischema={
                                evidenceIndex === -1
                                    ? formSpec.spec.uischema
                                    : process?.evidence[evidenceIndex].form.spec
                                          .uischema
                            }
                            data={
                                evidenceIndex === -1
                                    ? dataForm
                                    : process?.evidence[evidenceIndex].data
                            }
                            renderers={materialRenderers}
                            cells={materialCells}
                            readonly={evidenceIndex !== -1}
                            onChange={({ data }) => setDataForm(data)}
                        />
                    </div>
                    <div className="flex">
                        {attachements.map((a, index) => (
                            <FileUpload
                                key={a.id}
                                defaultFilePath={a.value}
                                readonly={
                                    process?.processComplete ||
                                    evidenceIndex !== -1
                                }
                                placeholder={a.description}
                                extensions={['pdf']}
                                type="cuit"
                                onChange={(value: string) => {
                                    const tempData = {
                                        ...dataForm
                                    }
                                    tempData.attachements[a.id as string] = {
                                        id: a.id,
                                        value: value as string,
                                        description: a.description
                                    }
                                    setDataForm({
                                        ...tempData
                                    })
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </ClearContainer>
    )
}

export default Page
