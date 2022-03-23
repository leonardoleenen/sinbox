import cubejs, { Query } from '@cubejs-client/core'
import { QueryRenderer } from '@cubejs-client/react'
import React from 'react'
import { Bar, BarChart, Tooltip, XAxis, YAxis } from 'recharts'
interface Props {
    query: Query
}
const cubejsApi = cubejs(
    '9658fb39399243ae8360c77e4f8fbbe7e10c2657eb864d1362d687a9a158e5c51d0b49e7b457e462e5a0de1e91d66726b2d330faf9253085c1a68',
    { apiUrl: 'http://localhost:4000/cubejs-api/v1' }
)
const barChart = (props: Props): JSX.Element => {
    return (
        <QueryRenderer
            query={props.query}
            cubejsApi={cubejsApi}
            render={({ resultSet }) => {
                if (!resultSet) {
                    return 'Loading Analytics...'
                }
                return (
                    <BarChart
                        width={600}
                        height={300}
                        data={resultSet.rawData()}
                    >
                        <XAxis
                            dataKey={Object.keys(resultSet.rawData()[0])[0]}
                            stroke="#8884d8"
                        />
                        <YAxis />
                        <Tooltip />
                        <Bar
                            barSize={30}
                            dataKey={Object.keys(resultSet.rawData()[0])[0]}
                            stroke="#8884d8"
                        />
                    </BarChart>
                )
            }}
        />
    )
}

export default barChart
