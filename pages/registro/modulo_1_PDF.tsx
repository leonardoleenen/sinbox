import React from 'react'
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Svg,
    Path,
    Line,
    Font
} from '@react-pdf/renderer'
import moment from 'moment'

import _ from 'lodash'
import { debug } from 'console'

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
        fontSize: '12px',
        textAlign: 'center',
        margin: 10
    },
    sectionFirma: {
        color: '#5b5b5f',
        fontSize: '17px',
        textAlign: 'center',
        margin: 20
    },
    sectionFooterBold: {
        fontWeight: 'bold'
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
        marginHorizontal: 'auto',
        alignItems: 'center',
        textAlign: 'center',
        margin: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexGrow: 1
    },
    sectionHeaderNoFlex: {
        color: '#5b5b5f',
        fontSize: '9px',
        marginHorizontal: 'auto',
        alignItems: 'center',
        textAlign: 'center',
        margin: 20
    },
    sectionTitleHeader: {
        color: '#5b5b5f',
        fontSize: '9px',
        marginHorizontal: 'auto',
        alignItems: 'center',
        textAlign: 'center',
        margin: 10
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
    sectionContentHead2: {
        margin: 10,
        display: 'flex',
        flexDirection: 'row'
    },
    sectionContentHeadColumn: {
        display: 'flex',
        flexDirection: 'column'
    },
    sectionContentHeadColumn3: {
        display: 'flex',
        flexDirection: 'column'
    },
    sectionContentHeadColumn2: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 20,
        paddingRight: 40
    },
    sectionContentEspecialidades: {
        color: '#5b5b5f',
        fontSize: '12px',
        backgroundColor: '#987654'
    },
    sectionContentTEXT: {
        margin: 10,
        color: '#5b5b5f',
        fontSize: '12px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    sectionContentTEXTColumn: {
        color: '#949397',
        fontSize: '10px',
        display: 'flex',
        width: '600px',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexGrow: 1
    },
    sectionContentHEADERColumn: {
        color: '#949397',
        fontSize: '10px',
        display: 'flex',
        width: '300px',
        flexDirection: 'column',
        justifyContent: 'space-around',
        flexGrow: 2
    },

    sectionContentEspecialidadColumn: {
        color: '#949397',
        fontSize: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexGrow: 6
    },
    sectionContentEspecialidadColumnBorder2: {
        color: '#949397',
        fontSize: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexGrow: 6,
        borderLeft: '1px solid #5b5b5f',
        paddingLeft: 20
    },

    sectionContentTitle: {
        padding: 5,
        color: '#fff',
        fontSize: '12px',
        fontWeight: 'bold',
        backgroundColor: '#5b5b5f',
        marginBottom: 5,
        textTransform: 'uppercase'
    },

    sectionH2: {
        color: '#5b5b5f',
        fontSize: '16px',
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center'
    },
    sectionH5: {
        color: '#5b5b5f',
        fontSize: '12px',
        textAlign: 'center',
        paddingTop: 20
    },
    sectionH1: {
        color: '#5b5b5f',
        fontSize: '20px',
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center'
    },
    sectionH3: {
        margin: 5,
        color: '#5b5b5f',
        fontSize: '13px',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    sectionEtiqueta: {
        color: '#5b5b5f',
        fontSize: '10px',
        fontWeight: 'extrabold',
        textTransform: 'uppercase'
    },
    sectionEtiquetaTable: {
        color: '#5b5b5f',
        fontSize: '8px',
        alignContent: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        borderBottom: '1px solid #5b5b5f',
        textAlign: 'center'
    },
    sectionContentTable: {
        color: '#5b5b5f',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    sectionContentTableColumnBorder: {
        color: '#949397',
        fontSize: '10px',
        display: 'flex',
        width: '300px',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexGrow: 1,
        borderLeft: '1px solid #5b5b5f',
        borderBottom: '1px solid #5b5b5f',
        borderTop: '1px solid #5b5b5f'
    },
    sectionContentTableColumnBorder2: {
        color: '#949397',
        fontSize: '10px',
        display: 'flex',
        textAlign: 'center',
        width: '180px',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexGrow: 1,
        borderLeft: '1px solid #5b5b5f',
        borderBottom: '1px solid #5b5b5f',
        borderTop: '1px solid #5b5b5f'
    },
    sectionContentTableColumnBorder3: {
        color: '#949397',
        fontSize: '10px',
        display: 'flex',
        width: '300px',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexGrow: 1,
        borderLeft: '1px solid #5b5b5f',
        borderBottom: '1px solid #5b5b5f',
        borderTop: '1px solid #5b5b5f'
    },
    sectionContentTableColumnBorderRigth: {
        color: '#949397',
        fontSize: '10px',
        display: 'flex',
        width: '300px',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexGrow: 1,
        borderLeft: '1px solid #5b5b5f',
        borderRight: '1px solid #5b5b5f',
        borderBottom: '1px solid #5b5b5f',
        borderTop: '1px solid #5b5b5f'
    },

    description: {
        margin: 2,
        textAlign: 'center'
    }
})

// Create Document Component
export default () => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.sectionContentTEXT}>
                    <View style={styles.sectionContentHEADERColumn}>
                        <Svg
                            id="Capa_1"
                            height="80px"
                            viewBox="0 0 56.48 66.44"
                        >
                            <image
                                width="85"
                                height="100px"
                                href="data:image/jpeg;base64,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"
                                transform="matrix(0.6644 0 0 0.6644 0 0)"
                            ></image>
                        </Svg>

                        <Text style={styles.sectionH5}>
                            Ministerio de Justicia y Derechos Humanos
                            <br />
                        </Text>
                        <Text style={styles.sectionH3}>
                            PROVINCIA DE SANTA FE <br />
                            REGISTRO GENERAL ROSARIO
                        </Text>
                    </View>

                    <View style={styles.sectionContentTEXTColumn}>
                        <View style={styles.sectionHeaderNoFlex}>
                            <Text style={styles.sectionH1}>
                                MODULO Nº 1<br />
                                DOMINIO
                                <br />
                            </Text>
                            <Text style={styles.sectionH3}>
                                SOLICITUD DE CERTIFICACION <br />
                            </Text>
                            <Text>
                                (Artículo 23 de la Ley Nacional 17.801) <br />
                            </Text>
                            <Text style={styles.sectionH3}>
                                SITUACION JURIDICA DEL INMUEBLE (DOMINIO Y SUS
                                CONDICIONES) <br />
                            </Text>
                            <Text>
                                (Art. 39 al 43 y 47 Ley Provincial 6.435)
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.sectionContentTitle}>
                    <Text>1. Acto y Monto</Text>
                </View>
                <View style={styles.sectionFooter}>
                    <Text style={styles.sectionFooterBold}>
                        TRATANDOSE DE FRACCION/ES DE UNA MAYOR AREA INSCRIPTA,
                        DETERMINAR:
                    </Text>
                </View>

                <View style={styles.sectionContentTable}>
                    <View style={styles.sectionContentTableColumnBorder}>
                        <Text style={styles.sectionEtiquetaTable}>Lote</Text>
                        <Text style={styles.description}>SUR 45</Text>
                    </View>
                    <View style={styles.sectionContentTableColumnBorder3}>
                        <Text style={styles.sectionEtiquetaTable}>Manzana</Text>
                        <Text style={styles.description}>45</Text>
                    </View>
                    <View style={styles.sectionContentTableColumnBorder3}>
                        <Text style={styles.sectionEtiquetaTable}>Plano</Text>
                        <Text style={styles.description}>Aqw 1234</Text>
                    </View>
                    <View style={styles.sectionContentTableColumnBorderRigth}>
                        <Text style={styles.sectionEtiquetaTable}>Año</Text>
                        <Text style={styles.description}>2021</Text>
                    </View>
                </View>
                <View style={styles.sectionFooter}>
                    <Text style={styles.sectionFooterBold}></Text>
                </View>

                <View style={styles.sectionContentTitle}>
                    <Text>2. Datos de Inscripcion</Text>
                </View>

                <View style={styles.sectionContentTEXT}>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            Dominio :{' '}
                            <Text style={styles.sectionEtiqueta}></Text>
                        </Text>
                    </View>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            Propiedad Horizontal:{' '}
                            <Text style={styles.sectionEtiqueta}>SI</Text>
                        </Text>
                    </View>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            Departamento:{' '}
                            <Text style={styles.sectionEtiqueta}></Text>
                        </Text>
                    </View>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            Matricula:{' '}
                            <Text style={styles.sectionEtiqueta}>9098899</Text>{' '}
                        </Text>
                    </View>
                </View>

                <View style={styles.sectionContentTable}>
                    <View style={styles.sectionContentTableColumnBorder}>
                        <Text style={styles.sectionEtiquetaTable}>Tomo</Text>
                        <Text style={styles.description}>Aqw 1234</Text>
                    </View>
                    <View style={styles.sectionContentTableColumnBorder3}>
                        <Text style={styles.sectionEtiquetaTable}>Folio</Text>
                        <Text style={styles.description}>12333334</Text>
                    </View>
                    <View style={styles.sectionContentTableColumnBorderRigth}>
                        <Text style={styles.sectionEtiquetaTable}>Numero</Text>
                        <Text style={styles.description}>1234</Text>
                    </View>
                </View>
                <View style={styles.sectionFooter}>
                    <Text style={styles.sectionFooterBold}></Text>
                </View>

                <View style={styles.sectionContentTitle}>
                    <Text>3. Datos del inmueble segun titulo inscripto</Text>
                </View>

                <View style={styles.sectionContentTEXT}>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            Distrito :{' '}
                            <Text style={styles.sectionEtiqueta}>
                                LOMAS DE ZAMORA
                            </Text>
                        </Text>
                    </View>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            Zona:{' '}
                            <Text style={styles.sectionEtiqueta}>
                                LOMAS DE ZAMORA
                            </Text>
                        </Text>
                    </View>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            Localidad:{' '}
                            <Text style={styles.sectionEtiqueta}>
                                LOMAS DE ZAMORA
                            </Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.sectionContentTEXT}>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            Calle :{' '}
                            <Text style={styles.sectionEtiqueta}>
                                SANTOS CHOCANO
                            </Text>
                        </Text>
                    </View>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            Numero:{' '}
                            <Text style={styles.sectionEtiqueta}>345</Text>
                        </Text>
                    </View>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            Entre calles:{' '}
                            <Text style={styles.sectionEtiqueta}>
                                VIENA Y ESTOCOLMO
                            </Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.sectionContentTEXT}>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            Lote :{' '}
                            <Text style={styles.sectionEtiqueta}>5O</Text>
                        </Text>
                    </View>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            Manzana:{' '}
                            <Text style={styles.sectionEtiqueta}>345</Text>
                        </Text>
                    </View>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            Superficie:{' '}
                            <Text style={styles.sectionEtiqueta}>VEC 3454</Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.sectionContentTEXT}>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            Plano:{' '}
                            <Text style={styles.sectionEtiqueta}>VEC 3454</Text>
                        </Text>
                    </View>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            Año:{' '}
                            <Text style={styles.sectionEtiqueta}>1983</Text>
                        </Text>
                    </View>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            Arranque :{' '}
                            <Text style={styles.sectionEtiqueta}>5O</Text>
                        </Text>
                    </View>
                </View>

                <View style={styles.sectionFooter}>
                    <Text style={styles.sectionFooterBold}>
                        RUMBOS, MEDIDAS LINEALES Y LINDEROS (Adaptar las
                        iniciales a los rumbos si no coinciden con las aquí
                        previstas):
                    </Text>
                </View>
                <View style={styles.sectionContentTEXT}>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            NORTE :{' '}
                            <Text style={styles.sectionEtiqueta}>5O</Text>
                        </Text>
                    </View>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            SUR: <Text style={styles.sectionEtiqueta}>345</Text>
                        </Text>
                    </View>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            ESTE:{' '}
                            <Text style={styles.sectionEtiqueta}>VEC 3454</Text>
                        </Text>
                    </View>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            OESTE:{' '}
                            <Text style={styles.sectionEtiqueta}>VEC 3454</Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.sectionContentTEXT}>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            NOROESTE:{' '}
                            <Text style={styles.sectionEtiqueta}>1983</Text>
                        </Text>
                    </View>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            SUDOESTE:{' '}
                            <Text style={styles.sectionEtiqueta}>1983</Text>
                        </Text>
                    </View>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            NORESTE:{' '}
                            <Text style={styles.sectionEtiqueta}>1983</Text>
                        </Text>
                    </View>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            SUDESTE:{' '}
                            <Text style={styles.sectionEtiqueta}>1983</Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.sectionFooter}>
                    <Text style={styles.sectionFooterBold}>
                        Cuando es propiedad horizontal:
                    </Text>
                </View>
                <View style={styles.sectionContentTEXT}>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            Unidad:{' '}
                            <Text style={styles.sectionEtiqueta}>VEC 3454</Text>
                        </Text>
                    </View>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            Parcela:{' '}
                            <Text style={styles.sectionEtiqueta}>1983</Text>
                        </Text>
                    </View>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            Planta :{' '}
                            <Text style={styles.sectionEtiqueta}>5O</Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.sectionContentTEXT}>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            Superficie:{' '}
                            <Text style={styles.sectionEtiqueta}>VEC 3454</Text>
                        </Text>
                    </View>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            Comun:{' '}
                            <Text style={styles.sectionEtiqueta}>1983</Text>
                        </Text>
                    </View>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            Valor proporcional(%) :{' '}
                            <Text style={styles.sectionEtiqueta}>5O</Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.sectionContentTitle}>
                    <Text>
                        4. TITULAR / ES DE DOMINIO SEGUN TITULO INSCRIPTO
                        PERSONA HUMANA
                    </Text>
                </View>

                <View style={styles.sectionContentTable}>
                    <View style={styles.sectionContentTableColumnBorder}>
                        <Text style={styles.sectionEtiquetaTable}>Nombre</Text>
                        <Text style={styles.description}>Maria Noel</Text>
                    </View>
                    <View style={styles.sectionContentTableColumnBorder3}>
                        <Text style={styles.sectionEtiquetaTable}>
                            Apellido
                        </Text>
                        <Text style={styles.description}>Leenen</Text>
                    </View>
                    <View style={styles.sectionContentTableColumnBorder3}>
                        <Text style={styles.sectionEtiquetaTable}>
                            Tipo y Nro Doc
                        </Text>
                        <Text style={styles.description}>DU 4333344433</Text>
                    </View>
                    <View style={styles.sectionContentTableColumnBorderRigth}>
                        <Text style={styles.sectionEtiquetaTable}>CUIT</Text>
                        <Text style={styles.description}>4333344433</Text>
                    </View>
                    <View style={styles.sectionContentTableColumnBorderRigth}>
                        <Text style={styles.sectionEtiquetaTable}>
                            Fraccion
                        </Text>
                        <Text style={styles.description}>4333344433</Text>
                    </View>
                </View>
                <View style={styles.sectionFooter}>
                    <Text style={styles.sectionFooterBold}></Text>
                </View>
                <View style={styles.sectionContentTitle}>
                    <Text>
                        4. TITULAR / ES DE DOMINIO SEGUN TITULO INSCRIPTO
                        PERSONA JURIDICA
                    </Text>
                </View>

                <View style={styles.sectionContentTable}>
                    <View style={styles.sectionContentTableColumnBorder}>
                        <Text style={styles.sectionEtiquetaTable}>
                            Denominacion
                        </Text>
                        <Text style={styles.description}></Text>
                    </View>
                    <View style={styles.sectionContentTableColumnBorder3}>
                        <Text style={styles.sectionEtiquetaTable}>Tipo</Text>
                        <Text style={styles.description}></Text>
                    </View>
                    <View style={styles.sectionContentTableColumnBorder3}>
                        <Text style={styles.sectionEtiquetaTable}>CUIT</Text>
                        <Text style={styles.description}></Text>
                    </View>

                    <View style={styles.sectionContentTableColumnBorderRigth}>
                        <Text style={styles.sectionEtiquetaTable}>
                            Fraccion
                        </Text>
                        <Text style={styles.description}></Text>
                    </View>
                </View>
                <View style={styles.sectionFooter}>
                    <Text style={styles.sectionFooterBold}></Text>
                </View>

                <View style={styles.sectionContentTitle}>
                    <Text>5. Solicitante</Text>
                </View>

                <View style={styles.sectionContentTEXT}>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            Registro Nro :{' '}
                            <Text style={styles.sectionEtiqueta}>342342</Text>
                        </Text>
                    </View>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            Localidad:{' '}
                            <Text style={styles.sectionEtiqueta}>
                                LOMAS DE ZAMORA
                            </Text>
                        </Text>
                    </View>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            Provincia:{' '}
                            <Text style={styles.sectionEtiqueta}>
                                Buenos Aires
                            </Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.sectionContentTEXT}>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            Domicilia :{' '}
                            <Text style={styles.sectionEtiqueta}>
                                Azara 342
                            </Text>
                        </Text>
                    </View>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            Telefono:{' '}
                            <Text style={styles.sectionEtiqueta}>
                                +5411234566778
                            </Text>
                        </Text>
                    </View>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            {' '}
                            <Text style={styles.sectionEtiqueta}></Text>
                        </Text>
                    </View>
                </View>

                <View style={styles.sectionContentTitle}>
                    <Text>6. Se agregan</Text>
                </View>

                <View style={styles.sectionContentTEXT}>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            ANEXOS CONTINUANDO RUBRO / S Nº :{' '}
                            <Text style={styles.sectionEtiqueta}>342342</Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.sectionContentTitle}>
                    <Text>7. Observaciones</Text>
                </View>

                <View style={styles.sectionContentTEXT}>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            Observaciones :{' '}
                            <Text style={styles.sectionEtiqueta}>342342</Text>
                        </Text>
                    </View>
                </View>

                <View style={styles.sectionFirma}>
                    <Text style={styles.sectionFooterBold}>
                        SIGNATURE: FIRMA ELECTRONICA
                    </Text>
                </View>
                <View style={styles.sectionFooter}>
                    <Text style={styles.sectionFooterBold}>
                        PARA USO EXCLUSIVO DEL REGISTRO
                    </Text>
                </View>
                <View style={styles.sectionContentTitle}>
                    <Text>8. NO PUEDE DESPACHARSE</Text>
                </View>

                <View style={styles.sectionContentTEXT}>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            La solicitud por causa :{' '}
                            <Text style={styles.sectionEtiqueta}>342342</Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.sectionContentTitle}>
                    <Text>
                        9. EL INMUEBLE DETERMINADO EN EL RUBRO 3 CONSTA A NOMBRE
                        DE LA/S PERSONAS DETERMINADA/S EN EL RUBRO 4
                    </Text>
                </View>

                <View style={styles.sectionContentTEXT}>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            Solicitud Nro :{' '}
                            <Text style={styles.sectionEtiqueta}>342342</Text>
                        </Text>
                    </View>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            Fecha:{' '}
                            <Text style={styles.sectionEtiqueta}>
                                21/12/2021
                            </Text>
                        </Text>
                    </View>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            Antecede:{' '}
                            <Text style={styles.sectionEtiqueta}>
                                Buenos Aires
                            </Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.sectionContentTitle}>
                    <Text>
                        10. ADVERTENCIA: CERTIFICACIONES VIGENTES (con prioridad
                        respecto de la presente: Art. 42 Ley 6435)
                    </Text>
                </View>

                <View style={styles.sectionContentTable}>
                    <View style={styles.sectionContentTableColumnBorder}>
                        <Text style={styles.sectionEtiquetaTable}>Fecha</Text>
                        <Text style={styles.description}>21/12/2021</Text>
                    </View>
                    <View style={styles.sectionContentTableColumnBorder3}>
                        <Text style={styles.sectionEtiquetaTable}>
                            Certificado
                        </Text>
                        <Text style={styles.description}>1212</Text>
                    </View>
                    <View style={styles.sectionContentTableColumnBorder3}>
                        <Text style={styles.sectionEtiquetaTable}>
                            Operacion
                        </Text>
                        <Text style={styles.description}>DU 4333344433</Text>
                    </View>
                    <View style={styles.sectionContentTableColumnBorderRigth}>
                        <Text style={styles.sectionEtiquetaTable}>
                            Escribano o Juzgado
                        </Text>
                        <Text style={styles.description}>4333344433</Text>
                    </View>
                    <View style={styles.sectionContentTableColumnBorderRigth}>
                        <Text style={styles.sectionEtiquetaTable}>Reg</Text>
                        <Text style={styles.description}>4333344433</Text>
                    </View>
                    <View style={styles.sectionContentTableColumnBorderRigth}>
                        <Text style={styles.sectionEtiquetaTable}>
                            Localidad
                        </Text>
                        <Text style={styles.description}>4333344433</Text>
                    </View>
                    <View style={styles.sectionContentTableColumnBorderRigth}>
                        <Text style={styles.sectionEtiquetaTable}>Plazo</Text>
                        <Text style={styles.description}>4333344433</Text>
                    </View>
                </View>
                <View style={styles.sectionFooter}>
                    <Text style={styles.sectionFooterBold}></Text>
                </View>
                <View style={styles.sectionContentTitle}>
                    <Text>
                        11. POR EL INMUEBLE DETERMINADO EN LA SOLICITUD SE
                        REGISTRA:
                    </Text>
                </View>
                <View style={styles.sectionFooter}>
                    <Text style={styles.sectionFooterBold}>
                        HIPOTECA - Inscripcion
                    </Text>
                </View>

                <View style={styles.sectionContentTable}>
                    <View style={styles.sectionContentTableColumnBorder}>
                        <Text style={styles.sectionEtiquetaTable}>Tomo</Text>
                        <Text style={styles.description}>432423</Text>
                    </View>
                    <View style={styles.sectionContentTableColumnBorder3}>
                        <Text style={styles.sectionEtiquetaTable}>Folio</Text>
                        <Text style={styles.description}>1212</Text>
                    </View>
                    <View style={styles.sectionContentTableColumnBorderRigth}>
                        <Text style={styles.sectionEtiquetaTable}>Numero</Text>
                        <Text style={styles.description}>DU 4333344433</Text>
                    </View>
                </View>
                <View style={styles.sectionFooter}>
                    <Text style={styles.sectionFooterBold}>Escrituracion</Text>
                </View>

                <View style={styles.sectionContentTable}>
                    <View style={styles.sectionContentTableColumnBorder}>
                        <Text style={styles.sectionEtiquetaTable}>Fecha</Text>
                        <Text style={styles.description}>21/12/2021</Text>
                    </View>
                    <View style={styles.sectionContentTableColumnBorder3}>
                        <Text style={styles.sectionEtiquetaTable}>
                            Registro
                        </Text>
                        <Text style={styles.description}>1212</Text>
                    </View>
                    <View style={styles.sectionContentTableColumnBorder3}>
                        <Text style={styles.sectionEtiquetaTable}>
                            Localidad
                        </Text>
                        <Text style={styles.description}>Lomas de Zamora</Text>
                    </View>
                    <View style={styles.sectionContentTableColumnBorder3}>
                        <Text style={styles.sectionEtiquetaTable}>
                            Escribano
                        </Text>
                        <Text style={styles.description}>
                            Leonardo G Leenen
                        </Text>
                    </View>
                    <View style={styles.sectionContentTableColumnBorderRigth}>
                        <Text style={styles.sectionEtiquetaTable}>Monto</Text>
                        <Text style={styles.description}></Text>
                    </View>
                </View>

                <View style={styles.sectionFooter}>
                    <Text style={styles.sectionFooterBold}>Embargos</Text>
                </View>

                <View style={styles.sectionContentTable}>
                    <View style={styles.sectionContentTableColumnBorder}>
                        <Text style={styles.sectionEtiquetaTable}>Fecha</Text>
                        <Text style={styles.description}>21/12/2021</Text>
                    </View>
                    <View style={styles.sectionContentTableColumnBorder3}>
                        <Text style={styles.sectionEtiquetaTable}>Tomo</Text>
                        <Text style={styles.description}>1212</Text>
                    </View>
                    <View style={styles.sectionContentTableColumnBorder3}>
                        <Text style={styles.sectionEtiquetaTable}>Folio</Text>
                        <Text style={styles.description}>Lomas de Zamora</Text>
                    </View>
                    <View style={styles.sectionContentTableColumnBorder3}>
                        <Text style={styles.sectionEtiquetaTable}>Numero</Text>
                        <Text style={styles.description}>
                            Leonardo G Leenen
                        </Text>
                    </View>
                    <View style={styles.sectionContentTableColumnBorderRigth}>
                        <Text style={styles.sectionEtiquetaTable}>Fecha</Text>
                        <Text style={styles.description}></Text>
                    </View>
                </View>

                <View style={styles.sectionFooter}>
                    <Text style={styles.sectionFooterBold}></Text>
                </View>

                <View style={styles.sectionContentTable}>
                    <View style={styles.sectionContentTableColumnBorder}>
                        <Text style={styles.sectionEtiquetaTable}>Juzgado</Text>
                        <Text style={styles.description}>21/12/2021</Text>
                    </View>
                    <View style={styles.sectionContentTableColumnBorder3}>
                        <Text style={styles.sectionEtiquetaTable}>
                            Profesional que intervino
                        </Text>
                        <Text style={styles.description}>
                            Juan Manuel Caneva
                        </Text>
                    </View>
                    <View style={styles.sectionContentTableColumnBorderRigth}>
                        <Text style={styles.sectionEtiquetaTable}>Monto</Text>
                        <Text style={styles.description}></Text>
                    </View>
                </View>
                <View style={styles.sectionContentTEXT}>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            OTROS DERECHOS, MEDIDAS CAUTELARES, RESTRICCIONES Y
                            AFECTACIONES U OTRAS CONSTANCIAS :{' '}
                            <Text style={styles.sectionEtiqueta}>342342</Text>
                        </Text>
                    </View>
                </View>

                <View style={styles.sectionContentTitle}>
                    <Text>12. Se agregan</Text>
                </View>

                <View style={styles.sectionContentTEXT}>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            ANEXOS CONTINUANDO RUBRO / S Nº :{' '}
                            <Text style={styles.sectionEtiqueta}>342342</Text>
                        </Text>
                    </View>
                </View>

                <View style={styles.sectionContentTEXT}>
                    <View style={styles.sectionContentTEXTColumn}>
                        <Text>
                            DESPACHO: El presente CERTIFICADO se expide a la
                            cero (0) hora de la fecha de presentación de la
                            solicitud y con el resultado expresado en el/los
                            RUBRO/S
                            .........................................................................................................(Art.
                            40 y sgtes. Ley Provincial Nº 6435), sobre la base
                            de las referencias aportadas por el solicitante y a
                            los efectos expresamente determinados por el mismo).{' '}
                        </Text>
                    </View>
                </View>
                <View style={styles.sectionFirma}>
                    <Text style={styles.sectionFooterBold}>
                        SIGNATURE: FIRMA ELECTRONICA
                    </Text>
                </View>
            </Page>
        </Document>
    )
}
