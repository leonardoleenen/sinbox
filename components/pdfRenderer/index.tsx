import jsPDF from 'jspdf'
import React from 'react'
import * as htmlToImage from 'html-to-image'

interface Props {
    downloadable: boolean
    node_reference: HTMLElement
    pdf_name: string
    button_label: string
}

const Component = (props: Props): JSX.Element => {
    const printDocument = async () => {
        htmlToImage
            .toPng(props.node_reference, {
                quality: 1
            })
            .then(function (dataUrl) {
                const link = document.createElement('a')
                link.download = 'my-image-name.jpeg'
                const pdf = new jsPDF()
                pdf.addImage(dataUrl, 'PNG', 0, 0, 180, 0)
                pdf.save(`${props.pdf_name}.pdf`)
            })
    }
    return (
        <div>
            <button onClick={printDocument} className="btn btn-primary">
                {props.button_label}
            </button>
        </div>
    )
}

export default Component
