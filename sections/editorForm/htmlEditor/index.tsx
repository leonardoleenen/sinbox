import axios from 'axios'
import React, { useState } from 'react'
import JSONInput from 'react-json-editor-ajrm'
import locale from 'react-json-editor-ajrm/locale/en'

interface Props {
    schema: any
    onChange: (e: any) => void
    onDataChange: (e: any) => void
    jsonData: any
}

const Component = (props: Props): JSX.Element => {
    const [showPreview, setShowPreview] = useState(false)
    const [parsedHtml, setParsedHtml] = useState('')
    const [loadingParser, setLoadingParser] = useState(false)
    const Preview = () => {
        if (loadingParser) return <div>Parser is loading ...</div>
        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: parsedHtml
                }}
            />
        )
    }
    return (
        <div>
            <div
                onClick={async () => {
                    setLoadingParser(true)
                    setShowPreview(!showPreview)
                    const { data } = await axios.post('/api/htmlEngine', {
                        schema: props.schema,
                        data: { ...props.jsonData }
                    })
                    setLoadingParser(false)
                    setParsedHtml(data.html)
                }}
            >
                <button className="btn btn-small btn-outline">
                    {showPreview ? 'Volver al editor' : 'Previsualizar'}{' '}
                </button>
            </div>

            {showPreview && <Preview />}
            {!showPreview && (
                <div className="flex">
                    <div className="w-2/3">
                        <textarea
                            onChange={e => props.onChange(e.target.value)}
                            value={props.schema}
                            className="textarea"
                            placeholder="Bio"
                            cols={80}
                        ></textarea>
                    </div>
                    <div className="w-1/3">
                        <JSONInput
                            id="html_data"
                            placeholder={props.jsonData}
                            locale={locale}
                            onChange={(e: any) =>
                                props.onDataChange(e.jsObject)
                            }
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Component
