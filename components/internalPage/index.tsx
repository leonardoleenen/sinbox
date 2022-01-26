import React from 'react'

interface Props {
    className?: string
    title: string
    rigthActions?: JSX.Element
    children: JSX.Element
}

const Component = (props: Props): JSX.Element => {
    return (
        <div className={`px-4 ${props.className}`}>
            <div className="flex justify-between py-8 items-center">
                <div className="text-2xl font-semibold">{props.title}</div>
                {props.rigthActions && <div>{props.rigthActions}</div>}
            </div>
            <div className="w-full h-full bg-white p-6 rounded shadow-sm">
                {props.children}
            </div>
        </div>
    )
}

export default Component
