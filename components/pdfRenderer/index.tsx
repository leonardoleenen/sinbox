import axios from 'axios'
import jsPDF from 'jspdf'
import React from 'react'

interface Props {
    downloadable: boolean
    pages: Array<{
        html: string
        data: any
    }>
    pdf_name: string
    button_label: string
}

const Component = (props: Props): JSX.Element => {
    const doc = new jsPDF('p', 'pt', 'letter')
    const [myPages, setMyPages] = React.useState([])
    return (
        <div>
            <button
                onClick={async () => {
                    const {
                        data: { pages }
                    } = await axios.post('/api/htmlToPdf', {
                        pages: props.pages
                    })
                    setMyPages(pages)
                    await doc.html(pages[0])
                    if (pages.length > 1) {
                        for (let index = 0; index < pages.length; index++) {
                            if (index > 0) {
                                doc.addPage('letter', 'p')
                                await doc.html(pages[index], {
                                    callback: function (doc) {
                                        //staff
                                    },
                                    y: 792
                                })
                            }
                        }
                    }
                    doc.save(`${props.pdf_name}.pdf`)
                }}
            >
                {props.button_label}
            </button>
        </div>
    )
}

export default Component
