import React from 'react'

interface Props {
    children: JSX.Element
    className?: string
    title: string
}

const Component = (props: Props): JSX.Element => {
    return (
        <div className={` flex justify-center w-full ${props.className}`}>
            <div className="max-w-screen-2xl">
                <div className="my-6">
                    <h2 className="text-2xl mb-2 leading-tight font-bold font-heading">
                        {props.title}
                    </h2>
                </div>
                <div className="p-8 bg-white shadow-lg rounded-lg">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Component
