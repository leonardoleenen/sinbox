import React, { useState } from 'react'
import type { NextPage } from 'next'
import { person } from '@jsonforms/examples'
import { materialRenderers, materialCells } from '@jsonforms/material-renderers'
import { JsonForms } from '@jsonforms/react'

const Page: NextPage = () => {
    const schema = person.schema
    const uischema = person.uischema
    const initialData = person.data

    const [data, setData] = useState(initialData)
    console.log(data)
    return (
        <div className="App">
            <JsonForms
                schema={schema}
                uischema={uischema}
                data={data}
                renderers={materialRenderers}
                cells={materialCells}
                onChange={({ data, _errors }) => setData(data)}
            />
        </div>
    )
}

export default Page
