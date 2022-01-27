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
                        'Decision_12h4kee',
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

const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<dmn:definitions xmlns:dmn="http://www.omg.org/spec/DMN/20180521/MODEL/" xmlns="https://kiegroup.org/dmn/_E2B0FD86-ED9A-4C42-995D-0F6CC7BB214F" xmlns:feel="http://www.omg.org/spec/DMN/20180521/FEEL/" xmlns:kie="http://www.drools.org/kie/dmn/1.2" xmlns:dmndi="http://www.omg.org/spec/DMN/20180521/DMNDI/" xmlns:di="http://www.omg.org/spec/DMN/20180521/DI/" xmlns:dc="http://www.omg.org/spec/DMN/20180521/DC/" id="_5417CD0C-ACF8-4BDD-98CB-F29C84E21F47" name="Untitled" typeLanguage="http://www.omg.org/spec/DMN/20180521/FEEL/" namespace="https://kiegroup.org/dmn/_E2B0FD86-ED9A-4C42-995D-0F6CC7BB214F">
  <dmn:extensionElements/>
  <dmn:inputData id="_34575843-A33A-43A2-B3A8-FA6CCC2C0342" name="rol">
    <dmn:extensionElements/>
    <dmn:variable id="_EF43D3F1-3503-42E0-93D9-504142833CFF" name="rol" typeRef="boolean"/>
  </dmn:inputData>
  <dmn:inputData id="_508625D8-3D4E-47B7-9042-8BBD8CE1E1D9" name="currentStep">
    <dmn:extensionElements/>
    <dmn:variable id="_D6373CF8-96ED-4E24-A169-48FDBD7080F9" name="currentStep" typeRef="boolean"/>
  </dmn:inputData>
  <dmn:decision id="_27A8A764-38E2-48EA-B145-0FF1CABA5D29" name="nextStep">
    <dmn:extensionElements/>
    <dmn:variable id="_E4DE9DD2-D1FE-4254-9AD0-983EF82FABB9" name="nextStep" typeRef="string"/>
    <dmn:informationRequirement id="_A45FEFC6-E38F-4CD8-BD1C-004BDDC3B255">
      <dmn:requiredInput href="#_34575843-A33A-43A2-B3A8-FA6CCC2C0342"/>
    </dmn:informationRequirement>
    <dmn:informationRequirement id="_00A841AF-07A0-4807-BE11-89080AC18F10">
      <dmn:requiredInput href="#_508625D8-3D4E-47B7-9042-8BBD8CE1E1D9"/>
    </dmn:informationRequirement>
    <dmn:decisionTable id="_9332C593-A1D5-41D0-AD61-52F33CD9580B" hitPolicy="UNIQUE" preferredOrientation="Rule-as-Row">
      <dmn:input id="_97D6D3CD-4F51-4EFB-ACCB-C97192C54488">
        <dmn:inputExpression id="_24A9D6F2-0BE5-4CB1-9006-B8C536AE968A" typeRef="boolean">
          <dmn:text>currentStep</dmn:text>
        </dmn:inputExpression>
      </dmn:input>
      <dmn:input id="_216716F7-F385-4412-A74F-55B9DFD2AEB3">
        <dmn:inputExpression id="_CF61557B-9BE6-4DB9-BC9B-CE2897D94DA9" typeRef="boolean">
          <dmn:text>rol</dmn:text>
        </dmn:inputExpression>
      </dmn:input>
      <dmn:output id="_30B27B56-6617-4A07-97D5-C418F96E8C7C"/>
      <dmn:annotation name="annotation-1"/>
      <dmn:rule id="_F9EBEF8D-A2BB-41E7-91C7-1BE7E70F5F53">
        <dmn:inputEntry id="_756B1905-8268-4A27-8ECA-9017DABCF26D">
          <dmn:text>true</dmn:text>
        </dmn:inputEntry>
        <dmn:inputEntry id="_360F472F-B88C-46A3-80C7-7006BE44FFC8">
          <dmn:text>true</dmn:text>
        </dmn:inputEntry>
        <dmn:outputEntry id="_4BAEF2D7-02D2-40D4-B07E-912D11DEA408">
          <dmn:text>"new form"</dmn:text>
        </dmn:outputEntry>
        <dmn:annotationEntry>
          <dmn:text/>
        </dmn:annotationEntry>
      </dmn:rule>
    </dmn:decisionTable>
  </dmn:decision>
  <dmndi:DMNDI>
    <dmndi:DMNDiagram id="_DF6168EF-E681-424A-B5EF-F27455BDDF53" name="DRG">
      <di:extension>
        <kie:ComponentsWidthsExtension>
          <kie:ComponentWidths dmnElementRef="_9332C593-A1D5-41D0-AD61-52F33CD9580B">
            <kie:width>50</kie:width>
            <kie:width>100</kie:width>
            <kie:width>100</kie:width>
            <kie:width>160</kie:width>
            <kie:width>100</kie:width>
          </kie:ComponentWidths>
        </kie:ComponentsWidthsExtension>
      </di:extension>
      <dmndi:DMNShape id="dmnshape-drg-_34575843-A33A-43A2-B3A8-FA6CCC2C0342" dmnElementRef="_34575843-A33A-43A2-B3A8-FA6CCC2C0342" isCollapsed="false">
        <dmndi:DMNStyle>
          <dmndi:FillColor red="255" green="255" blue="255"/>
          <dmndi:StrokeColor red="0" green="0" blue="0"/>
          <dmndi:FontColor red="0" green="0" blue="0"/>
        </dmndi:DMNStyle>
        <dc:Bounds x="231" y="273" width="100" height="50"/>
        <dmndi:DMNLabel/>
      </dmndi:DMNShape>
      <dmndi:DMNShape id="dmnshape-drg-_508625D8-3D4E-47B7-9042-8BBD8CE1E1D9" dmnElementRef="_508625D8-3D4E-47B7-9042-8BBD8CE1E1D9" isCollapsed="false">
        <dmndi:DMNStyle>
          <dmndi:FillColor red="255" green="255" blue="255"/>
          <dmndi:StrokeColor red="0" green="0" blue="0"/>
          <dmndi:FontColor red="0" green="0" blue="0"/>
        </dmndi:DMNStyle>
        <dc:Bounds x="398" y="273" width="100" height="50"/>
        <dmndi:DMNLabel/>
      </dmndi:DMNShape>
      <dmndi:DMNShape id="dmnshape-drg-_27A8A764-38E2-48EA-B145-0FF1CABA5D29" dmnElementRef="_27A8A764-38E2-48EA-B145-0FF1CABA5D29" isCollapsed="false">
        <dmndi:DMNStyle>
          <dmndi:FillColor red="255" green="255" blue="255"/>
          <dmndi:StrokeColor red="0" green="0" blue="0"/>
          <dmndi:FontColor red="0" green="0" blue="0"/>
        </dmndi:DMNStyle>
        <dc:Bounds x="315" y="109" width="100" height="50"/>
        <dmndi:DMNLabel/>
      </dmndi:DMNShape>
      <dmndi:DMNEdge id="dmnedge-drg-_A45FEFC6-E38F-4CD8-BD1C-004BDDC3B255-AUTO-TARGET" dmnElementRef="_A45FEFC6-E38F-4CD8-BD1C-004BDDC3B255">
        <di:waypoint x="281" y="298"/>
        <di:waypoint x="365" y="109"/>
      </dmndi:DMNEdge>
      <dmndi:DMNEdge id="dmnedge-drg-_00A841AF-07A0-4807-BE11-89080AC18F10" dmnElementRef="_00A841AF-07A0-4807-BE11-89080AC18F10">
        <di:waypoint x="448" y="298"/>
        <di:waypoint x="365" y="134"/>
      </dmndi:DMNEdge>
    </dmndi:DMNDiagram>
  </dmndi:DMNDI>
</dmn:definitions>`
