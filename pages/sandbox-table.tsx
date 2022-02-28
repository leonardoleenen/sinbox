import React, { useState } from 'react'
import type { NextPage } from 'next'
import ReactDataSheet from 'react-datasheet'
import 'react-datasheet/lib/react-datasheet.css'

const Page: NextPage = () => {
    const [grid, setGrid] = useState([
        [
            { value: 'Ordinary Bitter' },
            { value: '20 - 35' },
            { value: '5 - 12' },
            { value: 4, attributes: { 'data-foo': 'bar' } }
        ],
        [
            { value: 'Special Bitter' },
            { value: '28 - 40' },
            { value: '6 - 14' },
            { value: 4 }
        ],
        [
            { value: 'ESB' },
            { value: '30 - 45' },
            { value: '6 - 14' },
            { value: 5 }
        ],
        [
            { value: 'Scottish Light' },
            { value: '9 - 20' },
            { value: '6 - 15' },
            { value: 3 }
        ],
        [
            { value: 'Scottish Heavy' },
            { value: '12 - 20' },
            { value: '8 - 30' },
            { value: 4 }
        ],
        [
            { value: 'Scottish Export' },
            { value: '15 - 25' },
            { value: '9 - 19' },
            { value: 4 }
        ],
        [
            { value: 'English Summer Ale' },
            { value: '20 - 30' },
            { value: '3 - 7' },
            { value: 3 }
        ],
        [
            { value: 'English Pale Ale' },
            { value: '20 - 40' },
            { value: '5 - 12' },
            { value: 4 }
        ],
        [
            { value: 'English IPA' },
            { value: '35 - 63' },
            { value: '6 - 14' },
            { value: 4 }
        ],
        [
            { value: 'Strong Ale' },
            { value: '30 - 65' },
            { value: '8 - 21' },
            { value: 4 }
        ],
        [
            { value: 'Old Ale' },
            { value: '30 -65' },
            { value: '12 - 30' },
            { value: 4 }
        ],
        [
            { value: 'Pale Mild Ale' },
            { value: '10 - 20' },
            { value: '6 - 9' },
            { value: 3 }
        ],
        [
            { value: 'Dark Mild Ale' },
            { value: '10 - 24' },
            { value: '17 - 34' },
            { value: 3 }
        ],
        [
            { value: 'Brown Ale' },
            { value: '12 - 25' },
            { value: '12 - 17' },
            { value: 3 }
        ]
    ])

    const columns = [
        { label: 'Style', width: '30%' },
        { label: 'IBUs', width: '20%' },
        { label: 'Color (SRM)', width: '20%' },
        { label: 'Rating', width: '20%' }
    ]

    const Row = props => {
        console.log(props.children)
        return <div> {props.children[1]}</div>
    }

    return (
        <div>
            <ReactDataSheet
                data={grid}
                valueRenderer={cell => cell.value}
                rowRenderer={props => (
                    <div>
                        <Row {...props} />
                    </div>
                )}
                onCellsChanged={changes => {
                    const gridTemp = grid.map(row => [...row])
                    changes.forEach(({ cell, row, col, value }) => {
                        grid[row][col] = { ...grid[row][col], value }
                    })
                    setGrid({ gridTemp })
                }}
            />
        </div>
    )
}

export default Page
