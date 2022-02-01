import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'

import 'dmn-js/dist/assets/diagram-js.css'
import 'dmn-js/dist/assets/dmn-font/css/dmn-embedded.css'
import 'dmn-js/dist/assets/dmn-js-decision-table-controls.css'
import 'dmn-js/dist/assets/dmn-js-decision-table.css'
import 'dmn-js/dist/assets/dmn-js-drd.css'
import 'dmn-js/dist/assets/dmn-js-literal-expression.css'
import 'dmn-js/dist/assets/dmn-js-shared.css'

const Page: NextPage = () => {
    const [modeler, setModeler] = useState()

    useEffect(() => {
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
        <definitions xmlns="https://www.omg.org/spec/DMN/20191111/MODEL/" xmlns:dmndi="https://www.omg.org/spec/DMN/20191111/DMNDI/" id="definitions_1ed52c1" name="definitions" namespace="http://camunda.org/schema/1.0/dmn" exporter="dmn-js (https://demo.bpmn.io/dmn)" exporterVersion="11.0.2">
          <dmndi:DMNDI>
            <dmndi:DMNDiagram id="DMNDiagram_1071vu4" />
          </dmndi:DMNDI>
        </definitions>
        `
        const dmnJS = new DmnJS({
            container: document.getElementById('canvas'),
            width: '100%',
            height: '100%',
            position: 'absolute'
        })
        dmnJS.importXML(xml, err => {
            if (err) {
                return console.log(err)
            }
        })
        setModeler(dmnJS)
    }, [])

    const save = async () => {
        const { xml } = await modeler.saveXML({ format: true })

        alert('Diagram exported. Check the developer tools!')
        console.log('DIAGRAM', xml)
    }

    return (
        <div>
            <button className="btn btn-primary" onClick={save}>
                save
            </button>
            <div id="canvas"></div>
        </div>
    )
}

export default Page
