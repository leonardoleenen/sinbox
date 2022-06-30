import React, { useState, useEffect } from 'react'
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Svg,
    Image
} from '@react-pdf/renderer'

//Font.register({ family: 'Roboto', src: source });

// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap'
    },
    sectionFooter: {
        color: '#5b5b5f',
        fontSize: '10px',
        textAlign: 'center',
        margin: 10,
        borderTop: '1px solid #ccc',
        borderTopColor: '#5b5b5f'
    },
    sectiontitle: {
        fontSize: '14px',
        color: '#000',
        marginTop: 5,
        textAlign: 'center'
    },
    sectionFooterBold: {
        fontSize: '10px',
        color: '#000',
        marginTop: 15
    },
    sectionFooterRegular: {
        fontWeight: 'light'
    },
    textsize10: {
        fontSize: '10px'
    },

    sectionHeader: {
        color: '#5b5b5f',
        fontSize: '9px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
        margin: 10
    },
    sectionContentHead0: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        color: '#5b5b5f',
        fontSize: '10px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    sectionContentLOGO: {
        fontSize: '10px',
        display: 'flex',
        flexDirection: 'row'
    },
    sectionContentHeadTitle: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        color: '#5b5b5f',
        fontSize: '10px',
        display: 'flex',
        flexDirection: 'column'
    },
    sectionContentHead: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        color: '#5b5b5f',
        fontSize: '10px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    sectionContentHead1: {
        marginTop: 10,
        color: '#5b5b5f',
        fontSize: '10px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    },
    sectionContentHeadRight: {
        color: '#5b5b5f',
        fontSize: '10px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingLeft: 20,
        paddingRight: 20,
        textAlign: 'right'
    },
    sectionContentHead2: {
        marginTop: 10,
        color: '#5b5b5f',
        fontSize: '10px',
        textAlign: 'center',
        padding: 10
    },
    size: {
        marginTop: 10,
        color: '#5b5b5f',
        fontSize: '13px',
        textAlign: 'center',
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20
    },
    sectionContentHead3: {
        marginTop: 10,
        color: '#5b5b5f',
        fontSize: '10px',
        textAlign: 'center',
        padding: 10,
        marginBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    sectionContentHeadLeft: {
        marginTop: 10,
        color: '#5b5b5f',
        fontSize: '10px',
        textAlign: 'left',
        paddingLeft: 20,
        paddingRight: 20
    },

    sectionContentHeadColumn3: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'right'
    },

    m_b_5: {
        marginBottom: 5
    },
    m_b_15: {
        marginBottom: 15
    },
    m_r_10: {
        marginRight: 10
    },
    textRight: {
        marginBottom: 5,
        textAlign: 'right',
        fontWeight: 'bold'
    },
    bold: {
        fontWeight: 'bold'
    }
})

// Create Document Component
export default () => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.sectionContentLOGO}>
                    <Image
                        src="logos/escudo.jpg/"
                        style={{ width: '80px', height: '80px' }}
                    />

                    <View style={styles.sectionContentHeadTitle}>
                        <Text style={styles.sectionFooterBold}>
                            Ministerio de Gobierno y Reforma del Estado
                        </Text>
                        <Text>Secretaría de Comunicación Social</Text>
                        <Text>
                            Dirección General de Publicitaria y Administrativa
                        </Text>
                    </View>
                </View>
                <View style={styles.size}>
                    <Text>
                        Santa Fe, "Cuna de la Constitución Nacional", 25 de
                        Abril de 2022
                    </Text>
                </View>
                <View style={styles.sectionContentHeadRight}>
                    <View style={styles.sectionContentHeadColumn3}>
                        <Text style={styles.textRight}>ORIGINAL</Text>
                    </View>
                </View>

                <View style={styles.sectionContentHeadRight}>
                    <View style={styles.sectionContentHeadColumn3}>
                        <Text style={styles.m_b_5}>
                            ORDEN DE PUBLICIDAD N° : 4797/2022
                        </Text>
                        <Text style={styles.m_b_5}>Expediente Nro.: - -</Text>
                    </View>
                </View>
                <View style={styles.sectionContentHeadLeft}>
                    <Text>Señor Gerente o Administrador de:</Text>
                </View>

                <View style={styles.sectionContentHead2}>
                    <Text>
                        20.902 - WWW.SANTAFEACTUAL.COM - RUBEN DARIO FAIENZA
                    </Text>
                </View>
                <View style={styles.sectionContentHeadLeft}>
                    <Text>
                        Sírvase ordenar la publicación del texto cuyo original
                        se acompaña de acuerdo con la tarifa de ese medio,
                        registrada y/u oficializada ante organismos
                        provinciales, ajustándose a las modalidades que a
                        continuación se detallan:
                    </Text>
                </View>
                <View style={styles.sectionContentHead3}>
                    <Text style={styles.m_r_10}>TEMA: Institucional </Text>
                    <Text>DETALLE: WEB MAYO API</Text>
                </View>
                <View style={styles.sectionContentHead1}>
                    <View style={styles.sectionContentHeadColumn3}>
                        <Text style={styles.m_b_15}>
                            Facturar a: ADMINISTRAC. PROV. DE IMPUESTOS
                        </Text>
                        <Text style={styles.m_b_5}>
                            Fecha de Publicación: MAYO
                        </Text>
                        <Text style={styles.m_b_5}>
                            Detalle: API MORATORIA 2022 -
                        </Text>
                        <Text style={styles.m_b_5}>
                            Medidas: BANNER LATERAL DERECHO 300 X 420 PX
                        </Text>
                        <Text style={styles.m_b_15}>Monto: $ 25.000,00</Text>
                        <Text style={styles.m_b_15}>
                            Tarifa: $ 25.000,00 = $ 25000,00
                        </Text>
                        <Text style={styles.m_b_15}>
                            Resolución N°: 0560/2021
                        </Text>
                    </View>
                </View>
                <View style={styles.sectionContentHeadLeft}>
                    <Text>Saludo atte.-</Text>
                </View>
            </Page>
        </Document>
    )
}
