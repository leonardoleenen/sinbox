import { QueryRenderer } from '@cubejs-client/react'
import React from 'react'
import cubejs, { Query } from '@cubejs-client/core'

interface Props {
    title: string
    subtitle: string
    query: Query
}
const cubejsApi = cubejs(
    '9658fb39399243ae8360c77e4f8fbbe7e10c2657eb864d1362d687a9a158e5c51d0b49e7b457e462e5a0de1e91d66726b2d330faf9253085c1a68',
    { apiUrl: 'http://localhost:4000/cubejs-api/v1' }
)
const Component = (props: Props): JSX.Element => {
    return (
        <QueryRenderer
            query={props.query}
            cubejsApi={cubejsApi}
            render={({ resultSet }) => {
                if (!resultSet) {
                    return 'Loading Analytics...'
                }
                return (
                    <div className="stats shadow">
                        <div className="stat">
                            <div className="stat-title">{props.title}</div>
                            <div className="stat-value">
                                {Object.values(resultSet.rawData()[0])}
                            </div>
                            <div className="stat-desc">{props.subtitle}</div>
                        </div>
                    </div>
                )
            }}
        />
    )
}

export default Component
