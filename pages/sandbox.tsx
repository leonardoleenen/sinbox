import React from 'react'
import type { NextPage } from 'next'
import { decisionTable } from '@hbtgmbh/dmn-eval-js'

const Page: NextPage = () => {
    const execute = () => {
        decisionTable
            .parseDmnXml(xmlContent)
            .then(decisions => {
                // DMN was successfully parsed
                const context = {
                    // your input for decision execution goes in here
                }

                try {
                    const data = decisionTable.evaluateDecision(
                        'decisionPrimary',
                        decisions,
                        context
                    )
                    // data is the output of the decision execution
                    // it is an array for hit policy COLLECT and RULE ORDER, and an object else
                    // it is undefined if no rule matched

                    console.log(data) // do something with the data
                } catch (err) {
                    // failed to evaluate rule, maybe the context is missing some data?
                    console.log(err)
                }
            })
            .catch(err => {
                // failed to parse DMN XML: either invalid XML or valid XML but invalid DMN
                console.log(err)
            })
    }
    return (
        <div>
            <button onClick={execute} className="btn btn-primary">
                Push{' '}
            </button>
        </div>
    )
}

export default Page

const xmlContent = `<definitions xmlns:dmn="http://www.omg.org/spec/DMN/20180521/MODEL/" xmlns="https://kiegroup.org/dmn/_45116061-5215-4295-937F-09DACBF3B6EA" xmlns:feel="http://www.omg.org/spec/DMN/20180521/FEEL/" xmlns:kie="http://www.drools.org/kie/dmn/1.2" xmlns:dmndi="http://www.omg.org/spec/DMN/20180521/DMNDI/" xmlns:di="http://www.omg.org/spec/DMN/20180521/DI/" xmlns:dc="http://www.omg.org/spec/DMN/20180521/DC/" id="_CCFA6745-28CF-4B8F-A696-7FB8F2976741" name="Untitled" typeLanguage="http://www.omg.org/spec/DMN/20180521/FEEL/" namespace="https://kiegroup.org/dmn/_45116061-5215-4295-937F-09DACBF3B6EA">
<extensionElements/>
<inputData id="_E73EA9FA-F1CC-4126-995B-A3AE28C7E8CA" name="prueba">
  <extensionElements/>
  <variable id="_5CDD8D94-40F9-4AB3-8747-6D527529C03C" name="prueba"/>
</inputData>
<decision id="_ED6CEAE0-FFC9-4759-8072-E355DFC6CB27" name="resultado">
  <extensionElements/>
  <variable id="_1350009A-91A9-4DF2-B252-DDBE1104A6DF" name="resultado" typeRef="string"/>
  <informationRequirement id="_82267FD5-5615-4EA5-ACAC-07C25AF2863E">
    <requiredInput href="#_E73EA9FA-F1CC-4126-995B-A3AE28C7E8CA"/>
  </informationRequirement>
  <decisionTable id="_5CC05674-E385-4E05-9546-38930F873BE3" hitPolicy="UNIQUE" preferredOrientation="Rule-as-Row">
    <input id="_18B7BD4A-CD41-4ECC-A027-5485685E1AB1">
      <inputExpression id="_8287DCE2-05D3-4F5B-A8E8-AB10A9F2282E" typeRef="boolean">
        <text>prueba</text>
      </inputExpression>
    </input>
    <output id="_5873459D-55C6-4180-A828-8791EE624952"/>
    <annotation name="annotation-1"/>
    <rule id="_6E0958D3-2F83-4DC6-9231-97F55944B700">
      <inputEntry id="_EDA112FF-582E-41A1-8E68-A56D21445AD0">
        <text>true</text>
      </inputEntry>
      <outputEntry id="_5AF8B1E3-AE88-4E68-AEA4-1481299F2A40">
        <text>salio</text>
      </outputEntry>
      <annotationEntry>
        <text/>
      </annotationEntry>
    </rule>
  </decisionTable>
</decision>
<dmndi:DMNDI>
  <dmndi:DMNDiagram id="_4878A232-EA5A-40E5-9A57-63A25D942DBD" name="DRG">
    <di:extension>
      <kie:ComponentsWidthsExtension>
        <kie:ComponentWidths dmnElementRef="_5CC05674-E385-4E05-9546-38930F873BE3">
          <kie:width>50</kie:width>
          <kie:width>100</kie:width>
          <kie:width>100</kie:width>
          <kie:width>100</kie:width>
        </kie:ComponentWidths>
      </kie:ComponentsWidthsExtension>
    </di:extension>
    <dmndi:DMNShape id="dmnshape-drg-_E73EA9FA-F1CC-4126-995B-A3AE28C7E8CA" dmnElementRef="_E73EA9FA-F1CC-4126-995B-A3AE28C7E8CA" isCollapsed="false">
      <dmndi:DMNStyle>
        <dmndi:FillColor red="255" green="255" blue="255"/>
        <dmndi:StrokeColor red="0" green="0" blue="0"/>
        <dmndi:FontColor red="0" green="0" blue="0"/>
      </dmndi:DMNStyle>
      <dc:Bounds x="316" y="317" width="100" height="50"/>
      <dmndi:DMNLabel/>
    </dmndi:DMNShape>
    <dmndi:DMNShape id="dmnshape-drg-_ED6CEAE0-FFC9-4759-8072-E355DFC6CB27" dmnElementRef="_ED6CEAE0-FFC9-4759-8072-E355DFC6CB27" isCollapsed="false">
      <dmndi:DMNStyle>
        <dmndi:FillColor red="255" green="255" blue="255"/>
        <dmndi:StrokeColor red="0" green="0" blue="0"/>
        <dmndi:FontColor red="0" green="0" blue="0"/>
      </dmndi:DMNStyle>
      <dc:Bounds x="469" y="139" width="100" height="50"/>
      <dmndi:DMNLabel/>
    </dmndi:DMNShape>
    <dmndi:DMNEdge id="dmnedge-drg-_82267FD5-5615-4EA5-ACAC-07C25AF2863E-AUTO-TARGET" dmnElementRef="_82267FD5-5615-4EA5-ACAC-07C25AF2863E">
      <di:waypoint x="366" y="342"/>
      <di:waypoint x="519" y="139"/>
    </dmndi:DMNEdge>
  </dmndi:DMNDiagram>
</dmndi:DMNDI>
</definitions>`
