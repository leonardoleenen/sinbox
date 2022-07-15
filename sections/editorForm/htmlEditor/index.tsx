import React, { useState } from 'react'
import JSONInput from 'react-json-editor-ajrm'
import locale from 'react-json-editor-ajrm/locale/en'

interface Props {
    schema: any
    onChange: (e: any) => void
}

const Component = (props: Props): JSX.Element => {
    const [showPreview, setShowPreview] = useState(false)

    const Preview = () => {
        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: props.schema
                }}
            />
        )
    }

    const data = {}
    return (
        <div>
            <div onClick={() => setShowPreview(!showPreview)}>
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
                            placeholder={data}
                            locale={locale}
                            onChange={(e: any) => console.log(e)}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Component
