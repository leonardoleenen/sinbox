import React from 'react'
import ReactJson from 'react-json-view'

import JSONInput from 'react-json-editor-ajrm'
import locale from 'react-json-editor-ajrm/locale/en'

interface Props {
    src: any
    updateFunction: any
}

const Component = (props: Props): JSX.Element => {
    return (
        <div className="flex font-mono">
            <JSONInput
                id="a_unique_id"
                placeholder={props.src}
                locale={locale}
                onChange={(e: any) => props.updateFunction(e.jsObject)}
            />
        </div>
    )
}

export default Component
