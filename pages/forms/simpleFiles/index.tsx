import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Container from '../../../components/container'
import FileUpload from '../../../components/fileupload/fileUpload'
import { useRouter } from 'next/router'
import { workflowService } from '../../../services/workflow.service'
const Page: NextPage = () => {
    const router = useRouter()

    const wkfId = router.query.wkfId as string
    const step = router.query.step as any

    const [spec, setSpec] = useState<WorkflowSpec>()

    useEffect(() => {
        if (wkfId)
            workflowService.getSpec(wkfId as string).then(result => {
                setSpec(result)
            })
    }, [wkfId])

    const send = () => {}

    return (
        <Container>
            <div className="py-8 px-4 flex justify-end">
                {spec && (
                    <button onClick={send} className="btn btn-primary">
                        {spec.steps[step].requireSignature
                            ? 'Firmar y enviar'
                            : 'Enviar'}
                    </button>
                )}
            </div>

            <div className="my-6">
                <h2 className="text-2xl mb-2 leading-tight font-bold font-heading">
                    {spec && spec.steps[step].fileToFill.description}
                </h2>
            </div>

            <div className="p-10 card bg-base-200 w-full">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Referencia</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Por favor, ingrese un texto de referencia"
                        className="input"
                    />
                </div>
            </div>

            <FileUpload showFullScreen={true} extensions={['pdf']} type="pdf" />
        </Container>
    )
}

export default Page
