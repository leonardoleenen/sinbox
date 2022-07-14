import React, { useEffect } from 'react'
import { jsPDF } from 'jspdf'
import axios from 'axios'
const Sandbox: any = () => {
    const doc = new jsPDF()
    const [myHtml, setMyHtml] = React.useState('')
    useEffect(() => {
        ;(async () => {
            const { data } = await axios.get('/api/handlebars')
            setMyHtml(data.html)
        })()
    }, [])
    // const data: any = {
    //     people: [
    //         {
    //             lastName: 'Fiorenza'
    //         }
    //     ]
    // }
    // let iterating = false
    // const regex = /{([^}]+)}/g
    // let match: RegExpExecArray | null
    // let referenceList = ''
    // while ((match = regex.exec(myHtml))) {
    //     if (
    //         (match[1].includes('#each') &&
    //             Object.keys(data).includes(match[1].split(' ')[1])) ||
    //         (iterating && !match[1].includes('/each'))
    //     ) {
    //         iterating = true
    //         if (match[1].includes('#each')) {
    //             referenceList = match[1].split(' ')[1]
    //             continue
    //         }
    //         console.log(match[1])
    //     } else {
    //         iterating = false
    //     }
    //     if (Object.keys(data).includes(match[1])) {
    //         myHtml = myHtml.replace(match[0], data[match[1]])
    //         variables.push(match[1])
    //     }
    // }
    return (
        <div>
            <button
                onClick={async () => {
                    await doc.html(myHtml)
                    doc.save('my_pdf.pdf')
                }}
            >
                Get my pdf
            </button>
            <div dangerouslySetInnerHTML={{ __html: myHtml }}></div>
        </div>
    )
}
export default Sandbox
