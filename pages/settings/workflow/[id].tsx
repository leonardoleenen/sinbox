import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import SimpleForm from '../../../components/container/clear'
import { useRouter } from 'next/router'
import { ruleEngine } from '../../../services/rule.engine.service'
import { workflowService } from '../../../services/workflow.service'

const Page: NextPage = () => {
    const [workFlow, setWorkFlow] = useState<WorkflowSpec>({
        id: '',
        ref: '',
        ruleAsset: null,
        ruleAssetStep: '',
        status: 'ENABLED',
        lastUpdated: new Date().getTime()
    })
    const [rules, setRules] = useState<Array<RuleAsset>>([])
    const [isSaving, setIsSaving] = useState(false)
    const router = useRouter()
    useEffect(() => {
        ruleEngine.getAll().then(result => setRules(result))
    }, [])

    const save = () => {
        setIsSaving(true)
        workflowService.saveSpec(workFlow).then(result => {
            setWorkFlow(result)
            setIsSaving(false)
        })
    }
    return (
        <SimpleForm
            title="Sin Titulo"
            onChangeTitle={(value: string) =>
                setWorkFlow({
                    ...workFlow,
                    ref: value
                })
            }
            actions={
                <div>
                    <button
                        className="btn btn-error mr-4"
                        onClick={() => router.push('/settings/workflow/list')}
                    >
                        Volver
                    </button>
                    <button
                        onClick={save}
                        className={`btn btn-primary ${isSaving && 'loading'}`}
                    >
                        Guardar
                    </button>
                </div>
            }
        >
            <div className="w-1/2">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">
                            Reglas para el control del flujo
                        </span>
                    </label>
                    <select
                        className="select select-bordered w-full max-w-xs"
                        onChange={e =>
                            setWorkFlow({
                                ...workFlow,
                                ruleAssetStep: e.target.value
                            })
                        }
                    >
                        {rules.map(rule => (
                            <option key={`actions${rule.id}`} value={rule.id}>
                                {rule.description}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">
                            Reglas para el control de acciones
                        </span>
                    </label>
                    <select
                        onChange={e =>
                            setWorkFlow({
                                ...workFlow,
                                ruleAsset: e.target.value
                            })
                        }
                        className="select select-bordered w-full max-w-xs"
                    >
                        {rules.map(rule => (
                            <option key={`actions${rule.id}`} value={rule.id}>
                                {rule.description}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Habilitado</span>
                    </label>
                    <input
                        type="checkbox"
                        checked={workFlow.status === 'ENABLED' && true}
                        onChange={value =>
                            setWorkFlow({
                                ...workFlow,
                                status: value.target.checked
                                    ? 'ENABLED'
                                    : 'DISABLED'
                            })
                        }
                        className="toggle"
                    />
                </div>
            </div>
        </SimpleForm>
    )
}

export default Page
