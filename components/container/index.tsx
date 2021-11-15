import React from 'react'

interface Props {
    children: any
}

const Component = (props: Props): JSX.Element => {
    return <div className="container px-4 mx-auto">{props.children}</div>
}

export default Component
