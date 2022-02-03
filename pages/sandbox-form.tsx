import React, { useState } from 'react'
import type { NextPage } from 'next'

import JsonFormsEditor, {
    defaultSchemaDecorators,
    propertySchemaProvider
} from '@jsonforms/editor'

const Page: NextPage = () => {
    return (
        <JsonFormsEditor
            schemaProviders={[propertySchemaProvider]}
            schemaDecorators={defaultSchemaDecorators}
        />
    )
}

export default Page
