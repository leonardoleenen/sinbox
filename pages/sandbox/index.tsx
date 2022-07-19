import React, { useEffect } from 'react'
import { jsPDF } from 'jspdf'
import axios from 'axios'
import PDFRenderer from '../../components/pdfRenderer/index'
const Sandbox: any = () => {
    return (
        <div>
            <PDFRenderer
                downloadable={true}
                pages={[
                    {
                        html: 'http://localhost:3000/tmp/form_vertical',
                        data: {
                            foo: 'bar'
                        }
                    },
                    {
                        html: '<h1>{{foo}}</h1>',
                        data: {
                            foo: 'bar'
                        }
                    }
                ]}
                pdf_name="test"
                button_label="Generate PDF"
            ></PDFRenderer>
        </div>
    )
}
export default Sandbox
