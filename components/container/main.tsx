import React from 'react'

interface Props {
    children: Array<JSX.Element>
}

const Component = (props: Props): JSX.Element => {
    return <div>{props.children}</div>
}

export default Component
