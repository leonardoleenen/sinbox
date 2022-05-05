/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'

import 'dmn-js/dist/assets/diagram-js.css'
import 'dmn-js/dist/assets/dmn-font/css/dmn-embedded.css'
import 'dmn-js/dist/assets/dmn-js-decision-table-controls.css'
import 'dmn-js/dist/assets/dmn-js-decision-table.css'
import 'dmn-js/dist/assets/dmn-js-drd.css'
import 'dmn-js/dist/assets/dmn-js-literal-expression.css'
import 'dmn-js/dist/assets/dmn-js-shared.css'
import Loading from '../../components/loader'
import { useRouter } from 'next/router'
import { ruleEngine } from '../../services/rule.engine.service'
import ClearContainer from '../../components/container/clear'

const xmlEmpty = `<?xml version="1.0" encoding="UTF-8"?>
        <definitions xmlns="https://www.omg.org/spec/DMN/20191111/MODEL/" xmlns:dmndi="https://www.omg.org/spec/DMN/20191111/DMNDI/" id="definitions_1ed52c1" name="definitions" namespace="http://camunda.org/schema/1.0/dmn" exporter="dmn-js (https://demo.bpmn.io/dmn)" exporterVersion="11.0.2">
          <dmndi:DMNDI>
            <dmndi:DMNDiagram id="DMNDiagram_1071vu4" />
          </dmndi:DMNDI>
        </definitions>
        `

const Page: NextPage = () => {
    const [modeler, setModeler] = useState<any>()
    const [rule, setRule] = useState<RuleAsset | any>()
    const router = useRouter()
    const [isSaving, setIsSaving] = useState(false)
    const { id } = router.query
    useEffect(() => {
        ;(async () => {
            if (!id) return

            const _rule = await ruleEngine.get(id as string)

            const xml = _rule.spec

            const DmnEditor = require('@kogito-tooling/kie-editors-standalone/dist/dmn')
            const editor = DmnEditor.open({
                container: document.getElementById('dmn-editor-container'),
                initialContent: Promise.resolve(xml),
                readOnly: false
            })
            setModeler(editor)
            setRule(_rule)
        })()
    }, [id])

    const save = async () => {
        const { xml } = await modeler.getContent()
        setIsSaving(true)
        modeler.getContent().then((c: any) => {
            ruleEngine
                .save({
                    ...rule,
                    spec: c
                })
                .then(() => setIsSaving(false))
        })
    }

    return (
        <div>
            {!rule && <Loading />}
            <ClearContainer
                className={!rule ? 'hidden' : ''}
                title={rule?.description}
                onChangeTitle={(value: any) =>
                    setRule({
                        ...rule,
                        description: value
                    })
                }
                actions={
                    <div className="flex">
                        <button
                            className="btn btn-error mr-4"
                            onClick={() => router.push('/rules/list')}
                        >
                            Volver
                        </button>
                        <button
                            onClick={save}
                            className={`btn btn-primary ${
                                isSaving && 'loading'
                            }`}
                        >
                            Guardar
                        </button>
                    </div>
                }
            >
                <div className="h-screen" id="dmn-editor-container"></div>
            </ClearContainer>
        </div>
    )
}

export default Page
