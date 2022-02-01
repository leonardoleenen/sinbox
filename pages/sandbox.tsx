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
                        'decisionTable_0aym00k',
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
            <iframe
                className="h-screen"
                width="100%"
                height="100%"
                srcDoc='<!DOCTYPE html><html lang="en"><head><title></title><style>html,body,iframe {margin: 0;border: 0;padding: 0;height: 100%;width: 100%;}</style><script src="https://kiegroup.github.io/kogito-online/standalone/dmn/index.js"></script></head><body><script>DmnEditor.open({container: document.body, readOnly: true, initialContent: &apos;<?xml version="1.0" encoding="UTF-8"?><dmn:definitions xmlns:dmn="http://www.omg.org/spec/DMN/20180521/MODEL/" xmlns="http://camunda.org/schema/1.0/dmn" xmlns:dmndi="http://www.omg.org/spec/DMN/20180521/DMNDI/" xmlns:dc="http://www.omg.org/spec/DMN/20180521/DC/" xmlns:di="http://www.omg.org/spec/DMN/20180521/DI/" xmlns:feel="http://www.omg.org/spec/DMN/20180521/FEEL/" xmlns:kie="http://www.drools.org/kie/dmn/1.2" id="definitions_1i4h9a0" name="definitions" typeLanguage="http://www.omg.org/spec/DMN/20180521/FEEL/" namespace="http://camunda.org/schema/1.0/dmn">  <dmn:extensionElements/>  <dmn:inputData id="_7C538763-4046-4FBA-A164-F8A2479431B7" name="entrada">    <dmn:extensionElements/>    <dmn:variable id="_21716D18-1541-47EC-9F94-730F6C514A9F" name="entrada" typeRef="boolean"/>  </dmn:inputData>  <dmn:decision id="_4F704A14-B109-40A1-B2CD-7A3D42B75E2F" name="Salida">    <dmn:extensionElements/>    <dmn:variable id="_3775AC0E-F6A2-4704-B2DB-F1D1568D2E95" name="Salida" typeRef="string"/>    <dmn:informationRequirement id="_4481F583-53E9-4EAF-9CC3-B012C1A29138">      <dmn:requiredInput href="#_7C538763-4046-4FBA-A164-F8A2479431B7"/>    </dmn:informationRequirement>    <dmn:decisionTable id="_1FB13B7D-D4C7-42E2-A75D-F97EA6CE3133" hitPolicy="UNIQUE" preferredOrientation="Rule-as-Row">      <dmn:input id="_45D62627-8892-4B47-8C5B-AB7F215720B3">        <dmn:inputExpression id="_B4FD1FF6-1057-4A76-AEB1-E94F14B24A6D" typeRef="boolean">          <dmn:text>entrada</dmn:text>        </dmn:inputExpression>      </dmn:input>      <dmn:output id="_D6F350E6-70E2-4B4E-8F4E-DC0661FB7C86"/>      <dmn:annotation name="annotation-1"/>      <dmn:rule id="_7295BDA4-4CF6-4AA6-B76A-98AA0FBD3E8C">        <dmn:inputEntry id="_201ACEC8-AC0D-4A25-9346-E59CA3FFCDDF">          <dmn:text>true</dmn:text>        </dmn:inputEntry>        <dmn:outputEntry id="_77BC6C96-E745-4B01-8870-29C777AC76C9">          <dmn:text>"salida"</dmn:text>        </dmn:outputEntry>        <dmn:annotationEntry>          <dmn:text/>        </dmn:annotationEntry>      </dmn:rule>    </dmn:decisionTable>  </dmn:decision>  <dmndi:DMNDI>    <dmndi:DMNDiagram id="DMNDiagram_0j5t5s0" name="DRG">      <di:extension>        <kie:ComponentsWidthsExtension>          <kie:ComponentWidths dmnElementRef="_1FB13B7D-D4C7-42E2-A75D-F97EA6CE3133">            <kie:width>50</kie:width>            <kie:width>100</kie:width>            <kie:width>100</kie:width>            <kie:width>100</kie:width>          </kie:ComponentWidths>        </kie:ComponentsWidthsExtension>      </di:extension>      <dmndi:DMNShape id="dmnshape-drg-_7C538763-4046-4FBA-A164-F8A2479431B7" dmnElementRef="_7C538763-4046-4FBA-A164-F8A2479431B7" isCollapsed="false">        <dmndi:DMNStyle>          <dmndi:FillColor red="255" green="255" blue="255"/>          <dmndi:StrokeColor red="0" green="0" blue="0"/>          <dmndi:FontColor red="0" green="0" blue="0"/>        </dmndi:DMNStyle>        <dc:Bounds x="260" y="333" width="100" height="50"/>        <dmndi:DMNLabel/>      </dmndi:DMNShape>      <dmndi:DMNShape id="dmnshape-drg-_4F704A14-B109-40A1-B2CD-7A3D42B75E2F" dmnElementRef="_4F704A14-B109-40A1-B2CD-7A3D42B75E2F" isCollapsed="false">        <dmndi:DMNStyle>          <dmndi:FillColor red="255" green="255" blue="255"/>          <dmndi:StrokeColor red="0" green="0" blue="0"/>          <dmndi:FontColor red="0" green="0" blue="0"/>        </dmndi:DMNStyle>        <dc:Bounds x="260" y="103" width="100" height="50"/>        <dmndi:DMNLabel/>      </dmndi:DMNShape>      <dmndi:DMNEdge id="dmnedge-drg-_4481F583-53E9-4EAF-9CC3-B012C1A29138-AUTO-TARGET" dmnElementRef="_4481F583-53E9-4EAF-9CC3-B012C1A29138">        <di:waypoint x="310" y="358"/>        <di:waypoint x="310" y="103"/>      </dmndi:DMNEdge>    </dmndi:DMNDiagram>  </dmndi:DMNDI></dmn:definitions>&apos;, origin: "*" })</script></body></html>'
            ></iframe>
        </div>
    )
}

export default Page

const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="https://www.omg.org/spec/DMN/20191111/MODEL/" xmlns:dmndi="https://www.omg.org/spec/DMN/20191111/DMNDI/" xmlns:dc="http://www.omg.org/spec/DMN/20180521/DC/" xmlns:di="http://www.omg.org/spec/DMN/20180521/DI/" id="definitions_0r1tqka" name="definitions" namespace="http://camunda.org/schema/1.0/dmn" exporter="dmn-js (https://demo.bpmn.io/dmn)" exporterVersion="11.0.2">
  <decision id="decision_0l2csky" name="Tabla Prueba">
    <informationRequirement id="InformationRequirement_1tofrcs">
      <requiredInput href="#InputData_19xa8t3" />
    </informationRequirement>
    <decisionTable id="decisionTable_0aym00k">
      <input id="input1" label="EsVerdadero">
        <inputExpression id="inputExpression1" typeRef="boolean">
          <text></text>
        </inputExpression>
      </input>
      <output id="output1" label="SalidaOne" name="salidaOne" typeRef="string" />
      <output id="OutputClause_0vtayp5" label="SalidaTwo" name="salidaTwo" typeRef="string" />
      <rule id="DecisionRule_0mktq6f">
        <inputEntry id="UnaryTests_0x0u1f6">
          <text>true</text>
        </inputEntry>
        <outputEntry id="LiteralExpression_1agjy4i">
          <text>"salidaone"</text>
        </outputEntry>
        <outputEntry id="LiteralExpression_0wd5zrp">
          <text>" salidatwo""</text>
        </outputEntry>
      </rule>
    </decisionTable>
  </decision>
  <inputData id="InputData_19xa8t3" name="EsVerdadero" />
  <dmndi:DMNDI>
    <dmndi:DMNDiagram id="DMNDiagram_0y73c3t">
      <dmndi:DMNShape id="DMNShape_0fk9dki" dmnElementRef="decision_0l2csky">
        <dc:Bounds height="80" width="180" x="150" y="150" />
      </dmndi:DMNShape>
      <dmndi:DMNShape id="DMNShape_0aktk1o" dmnElementRef="InputData_19xa8t3">
        <dc:Bounds height="45" width="125" x="177" y="317" />
      </dmndi:DMNShape>
      <dmndi:DMNEdge id="DMNEdge_0g1vc1u" dmnElementRef="InformationRequirement_1tofrcs">
        <di:waypoint x="240" y="317" />
        <di:waypoint x="240" y="250" />
        <di:waypoint x="240" y="230" />
      </dmndi:DMNEdge>
    </dmndi:DMNDiagram>
  </dmndi:DMNDI>
</definitions>`
