/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Container from '../../../components/container'
import { workflowService } from '../../../services/workflow.service'
import InternalPage from '../../../components/container/internal'
import Header from '../../../components/header'
import { useRouter } from 'next/router'
import { ruleEngine } from '../../../services/rule.engine.service'
import { customAlphabet } from 'nanoid'
import _ from 'lodash'
const Page: NextPage = () => {
    const [list, setList] = useState<Array<WorkflowSpec>>([])
    const router = useRouter()
    useEffect(() => {
        workflowService.getList().then(result => {
            const sortedArray = _.orderBy(result, ['ref'], 'asc')
            setList(sortedArray)
        })
    }, [])
    const copyWorkflow = async (id: string) => {
        const { ruleAsset, ruleAssetStep, ref } = await workflowService.getSpec(
            id
        )
        const retrievedRuleAsset = await ruleEngine.get(ruleAsset)
        const retrievedRuleAssetStep = await ruleEngine.get(ruleAssetStep)
        const ruleAssetCopy = {
            ...retrievedRuleAsset,
            id: customAlphabet('1234567890abcdef', 10)(),
            description: `${retrievedRuleAsset.description} - copia`
        }
        const ruleAssetStepCopy = {
            ...retrievedRuleAssetStep,
            id: customAlphabet('1234567890abcdef', 10)(),
            description: `${retrievedRuleAssetStep.description} - copia`
        }
        await ruleEngine.save(ruleAssetCopy)
        await ruleEngine.save(ruleAssetStepCopy)
        const workflowToSave: WorkflowSpec = {
            id: customAlphabet('1234567890abcdef', 10)(),
            ref: `${ref} - copia`,
            ruleAsset: ruleAssetCopy.id,
            ruleAssetStep: ruleAssetStepCopy.id,
            status: 'ENABLED'
        }
        await workflowService.saveSpec(workflowToSave)
        const newList = [...list, workflowToSave]
        const sortedArray = _.orderBy(newList, ['ref'], 'asc')
        setList(sortedArray)
    }
    return (
        <div>
            <Header />
            <Container>
                <InternalPage
                    title="Workflows"
                    actions={
                        <button
                            onClick={() =>
                                router.push('/settings/workflow/new')
                            }
                            className="btn btn-primary"
                        >
                            Nuevo workflow
                        </button>
                    }
                >
                    <table className="table w-full table-zebra">
                        <thead>
                            <tr>
                                <th>Referencia</th>
                                <th>Regla Acciones Posibles</th>
                                <th>Regla Control de Flujo</th>
                                <th>Estado</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((invite, index) => (
                                <tr key={`invite${index}`}>
                                    <td>{invite.ref}</td>
                                    <td>
                                        <a
                                            target={`_blank`}
                                            className="link link-primary"
                                            href={`/rules/${invite.ruleAsset}`}
                                        >
                                            {invite.ruleAsset}
                                        </a>
                                    </td>
                                    <td>
                                        <a
                                            target={`_blank`}
                                            className="link link-primary"
                                            href={`/rules/${invite.ruleAssetStep}`}
                                        >
                                            {invite.ruleAssetStep}
                                        </a>
                                    </td>
                                    <td>{invite.status}</td>
                                    <td>
                                        <button
                                            onClick={e => {
                                                copyWorkflow(invite.id)
                                            }}
                                            className="btn btn-primary"
                                        >
                                            Clonar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </InternalPage>
            </Container>
        </div>
    )
}

export default Page
