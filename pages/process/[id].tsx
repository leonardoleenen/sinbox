import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { workflowService } from '../../services/workflow.service'
import { ruleEngine } from '../../services/rule.engine.service'
import { materialRenderers, materialCells } from '@jsonforms/material-renderers'
import { JsonForms } from '@jsonforms/react'
import { getToken, tokenDecode } from '../../services/auth.service'
import ClearContainer from '../../components/container/clear'
const Page: NextPage = () => {
    const router = useRouter()
    const { id } = router.query

    const [process, setProcess] = useState<WorkflowProcess>()
    const [formSpec, setFormSpec] = useState<WorkFlowForm>()
    const [rule, setRule] = useState<any>()
    const [isFinalStep, setIsFinalStep] = useState(false)
    const [dataForm, setDataForm] = useState({})
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

            if (!ruleResult[0].result) {
                router.push('/403')
                return
            }
            const formSpecResult = await workflowService.getFormSpec(
                ruleResult[0].result.formToShow
            )

            ruleResult[0].result.isFinalStep &&
                setIsFinalStep(ruleResult[0].result.isFinalStep)

            setFormSpec({
                ...formSpecResult,
                spec: {
                    uischema: JSON.parse(formSpecResult.spec.uischema),
                    schema: JSON.parse(formSpecResult.spec.schema)
                }
            })
        })()
    }, [process])

    const workflowNextStep = async () => {
        await workflowService.moveNext(
            process as WorkflowProcess,
            isFinalStep,
            dataForm,
            formSpec as WorkFlowForm
        )

        router.push('/process')
    }

    if (!formSpec) return <div>loading</div>

    return (
        <ClearContainer
            title={formSpec.title}
            actions={
                <div className="flex">
                    <button
                        onClick={() => router.push('/process')}
                        className="btn btn-error mr-8 "
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={workflowNextStep}
                        className="btn btn-primary "
                    >
                        {rule.willBeRequiredDescription}
                    </button>
                </div>
            }
        >
            <div className="flex">
                <aside>
                    <ul className=" steps steps-vertical">
                        {process?.evidence?.map((e, index: number) => (
                            <li
                                onClick={() => setEvidenceIndex(index)}
                                data-content={
                                    index === evidenceIndex ? '★' : index + 1
                                }
                                key={`evidence${index}`}
                                className="step step-info cursor-pointer"
                            >
                                {e.action}
                            </li>
                        ))}
                        <li
                            onClick={e => {
                                setEvidenceIndex(-1)
                                setDataForm({})
                            }}
                            className="step cursor-pointer"
                        >
                            {process?.currentStep}
                        </li>
                    </ul>
                </aside>
                <div className="p-16 w-full">
                    <JsonForms
                        schema={
                            evidenceIndex === -1
                                ? formSpec.spec.schema.object
                                : process?.evidence[evidenceIndex].form.spec
                                      .schema.object
                        }
                        uischema={
                            evidenceIndex === -1
                                ? formSpec.spec.uischema.object
                                : process?.evidence[evidenceIndex].form.spec
                                      .uischema.object
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
            </div>
        </ClearContainer>
    )
}

export default Page
