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

    const { wfid, processId } = router.query
    const [formSpec, setFormSpec] = useState<WorkFlowForm>()
    const [rule, setRule] = useState<any>()
    const [dataForm, setDataForm] = useState({})

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
                    uischema: JSON.parse(formSpecResult.spec.uischema),
                    schema: JSON.parse(formSpecResult.spec.schema)
                }
            })
        })()
    }, [wfid])

    if (!formSpec) return <div>loading</div>

    const workflowNextStep = () => {
        workflowService.createProcess(
            wfSpec as WorkflowSpec,
            dataForm,
            formSpec
        )
    }

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
                    data={dataForm}
                    renderers={materialRenderers}
                    cells={materialCells}
                    onChange={({ data }) => {
                        setDataForm(data)
                    }}
                />
            </div>
        </div>
    )
}

export default Page
