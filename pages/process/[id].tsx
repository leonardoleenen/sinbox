import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { workflowService } from '../../services/workflow.service'
import { ruleEngine } from '../../services/rule.engine.service'
import { materialRenderers, materialCells } from '@jsonforms/material-renderers'
import { JsonForms } from '@jsonforms/react'
import { getToken, tokenDecode } from '../../services/auth.service'

const Page: NextPage = () => {
    const router = useRouter()
    const { id } = router.query

    const [process, setProcess] = useState<WorkflowProcess>()
    const [formSpec, setFormSpec] = useState<WorkFlowForm>()
    const [rule, setRule] = useState<any>()
    const [isFinalStep, setIsFinalStep] = useState(false)
    const data: any = {}

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

            console.log(ruleResult)

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

    const workflowNextStep = () => {
        workflowService.moveNext(process as WorkflowProcess, isFinalStep)
    }

    if (!formSpec) return <div>loading</div>

    return (
        <div>
            <div className="flex">
                <button onClick={workflowNextStep} className="btn btn-primary">
                    {rule.willBeRequiredDescription}
                </button>
            </div>
            <div className="p-16">
                <JsonForms
                    schema={formSpec.spec.schema.object}
                    uischema={formSpec.spec.uischema.object}
                    data={data}
                    renderers={materialRenderers}
                    cells={materialCells}
                    onChange={({ data, _errors }) => console.log(data)}
                />
            </div>
        </div>
    )
}

export default Page
