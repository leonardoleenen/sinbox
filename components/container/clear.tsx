import React from 'react'
import Header from '../header'
interface Props {
    children: JSX.Element
    title: string
    actions: JSX.Element
    onChangeTitle?: any
    className?: string
    headTitle?: string
}

const Component = (props: Props): JSX.Element => {
    return (
        <div className={`bg-gray-100 h-screen ${props.className}`}>
            <Header headTitle={props.headTitle} />
            <div className="px-10">
                <div className="flex justify-between items-center">
                    <div
                        onBlur={e => props.onChangeTitle(e.target.innerText)}
                        className="my-6 text-2xl leading-tight font-bold font-heading text-gray-800"
                    >
                        <h2
                            className=" mb-2"
                            contentEditable={props.onChangeTitle !== undefined}
                        >
                            {props.title}
                        </h2>
                    </div>
                    <div>{props.actions}</div>
                </div>

                <div className="p-8 bg-white rounded-lg shadow-lg">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Component
