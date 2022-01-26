import React from 'react'
import type { NextPage } from 'next'
import Header from '../../components/header'
import Container from '../../components/container'
import InternalPage from '../../components/internalPage'
import DmnViewer from 'dmn-js/lib/Viewer'

const dmnXML = `<?xml version="1.0" encoding="UTF-8"?>
  <definitions xmlns="https://www.omg.org/spec/DMN/20191111/MODEL/" xmlns:dmndi="https://www.omg.org/spec/DMN/20191111/DMNDI/" xmlns:dc="http://www.omg.org/spec/DMN/20180521/DC/" id="Definitions_0cqyfxb" name="DRD" namespace="http://camunda.org/schema/1.0/dmn">
    <decision id="Decision_1cm94sj" name="Decision 1">
      <decisionTable id="DecisionTable_0bxpevr">
        <input id="Input_1">
          <inputExpression id="InputExpression_1" typeRef="string">
            <text></text>
          </inputExpression>
        </input>
        <output id="Output_1" typeRef="string" />
      </decisionTable>
    </decision>
    <dmndi:DMNDI>
      <dmndi:DMNDiagram>
        <dmndi:DMNShape dmnElementRef="Decision_1cm94sj">
          <dc:Bounds height="80" width="180" x="100" y="100" />
        </dmndi:DMNShape>
      </dmndi:DMNDiagram>
    </dmndi:DMNDI>
  </definitions>
  `

const Page: NextPage = () => {
    const create = async () => {
        const dmnJS = new DmnViewer({
            container: '#canvas'
        })

        try {
            const { warnings } = await dmnJS.importXML(dmnXML)

            if (warnings.length) {
                console.log('import with warnings', warnings)
            } else {
                console.log('import successful')
            }

            dmnJS.getActiveViewer().get('canvas').zoom('fit-viewport')
        } catch (err) {
            console.log('something went wrong:', err)
        }
    }
    return (
        <div>
            <Header />
            <Container>
                <InternalPage
                    title="New Rule"
                    rigthActions={
                        <button className="btn btn-primary" onClick={create}>
                            Create
                        </button>
                    }
                >
                    <div className="h-full">
                        <div id="canvas" />
                    </div>
                </InternalPage>
            </Container>
        </div>
    )
}

export default Page
