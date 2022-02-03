import React from 'react'

interface Props {
    children: JSX.Element
    className?: string
    title: string
    actions?: JSX.Element
}

const Component = (props: Props): JSX.Element => {
    return (
        <div className={` flex justify-center w-full ${props.className}`}>
            <div className="max-w-screen-2xl">
                <div className="flex my-6 justify-between">
                    <h2 className="text-2xl mb-2 leading-tight font-bold font-heading">
                        {props.title}
                    </h2>
                    {props.actions}
                </div>
                <div className="p-8 bg-white shadow-lg rounded-lg">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Component
