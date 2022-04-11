import React, { useState } from 'react'

interface Props {
    x_axis: Array<Record<string, string | number | JSX.Element>>
    y_axis: Array<{
        title: string
        index: string
    }>
    itemsPerPage: number
}
/**
 * A Table component orientated to show in x and y axis a matrix of data
 * <p>
 *
 * @param  y_axis  Here you must set the columns with a title to be showed and INDEX  that will be linked to each cell
 * @param  x_axis  You can set any properties only if the keys match with the INDEX of each object column
 * @param  itemsPerPage  How many items you would like to be shown
 */
const Table = (props: Props) => {
    const [currentPage, setCurrentPage] = useState(0)
    const pages =
        props.x_axis.length >= props.itemsPerPage
            ? Math.ceil(props.x_axis.length / props.itemsPerPage)
            : 1
    const modifiedData = Array.from({ length: pages }, (e, index) => {
        const start = index * props.itemsPerPage
        return props.x_axis.slice(start, start + props.itemsPerPage)
    })
    const handleCurrentPage = (selectedPage: number) =>
        setCurrentPage(selectedPage)
    return (
        <>
            <div className='className="overflow-x-auto"'>
                <table className="table w-full table-zebra">
                    <thead>
                        <tr>
                            {props.y_axis.map(column => (
                                <th key={column.index}>{column.title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {modifiedData[currentPage].map((r, i) => (
                            <tr key={i}>
                                {props.y_axis.map(c => {
                                    return (
                                        <td key={c.index}>
                                            {
                                                r[
                                                    Object.keys(r).find(
                                                        index =>
                                                            index === c.index
                                                    ) as string
                                                ]
                                            }
                                        </td>
                                    )
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="btn-group">
                {[...Array(pages)].map((e, i) => {
                    return (
                        <button
                            key={i}
                            className={`btn ${
                                i === currentPage && 'btn-active'
                            }`}
                            onClick={e => {
                                handleCurrentPage(i)
                            }}
                        >
                            {i + 1}
                        </button>
                    )
                })}
            </div>
        </>
    )
}
export default Table
