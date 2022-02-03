import React from 'react'
import ReactJson from 'react-json-view'

interface Props {
    src: any
    updateFunction: any
}

const Component = (props: Props): JSX.Element => {
    return (
        <div className="flex">
            <ReactJson
                onAdd={e => props.updateFunction(e.updated_src)}
                onEdit={e => props.updateFunction(e.updated_src)}
                onDelete={e => props.updateFunction(e.updated_src)}
                src={props.src}
            />
            <div></div>
        </div>
    )
}

export default Component
