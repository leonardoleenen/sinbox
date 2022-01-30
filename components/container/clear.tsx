import React from 'react'

interface Props {
    children: JSX.Element
    title: string
    actions: JSX.Element
}

const Component = (props: Props): JSX.Element => {
    return (
        <div className="bg-gray-100 h-screen p-16">
            <div className="flex justify-between items-center">
                <div className="my-6">
                    <h2 className="text-2xl mb-2 leading-tight font-bold font-heading">
                        {props.title}
                    </h2>
                </div>
                <div>{props.actions}</div>
            </div>

            <div className="p-8 bg-white rounded-lg shadow-lg">
                {props.children}
            </div>
        </div>
    )
}

export default Component
