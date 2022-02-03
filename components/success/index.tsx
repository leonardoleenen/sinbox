import React from 'react'

interface Props {
    title: string
    content: JSX.Element
}

const Component = (props: Props): JSX.Element => {
    return (
        <div id="success">
            <section className="h-screen flex items-center pt-20 pb-24 bg-blue-600">
                <div className="container px-4 mx-auto">
                    <div className="max-w-xl mx-auto text-center">
                        <span className="inline-block text-xs py-1 px-3 bg-blue-500 text-white font-semibold rounded-xl">
                            {props.title}
                        </span>
                        <h2 className="my-3 text-3xl md:text-4xl text-white font-bold font-heading pt-8">
                            Solicitud enviada con éxito
                        </h2>
                        {props.content}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Component
