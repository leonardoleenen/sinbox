import { Store } from 'pullstate'

interface ISignUpStore {
    user: any
    userCn: string
    email: string
    personalId: string
    datosEmpresa: Company
    companyInReview?: Company
    loading: boolean
}

export const SignUpStore = new Store<ISignUpStore>({
    user: null,
    userCn: '',
    email: '',
    personalId: '',
    loading: false,
    datosEmpresa: {
        razonSocial: {
            value: '',
            constancia: ''
        },
        grupoEconomico: '',
        medio: '',
        cuit: {
            value: '',
            constancia: ''
        },
        iibb: {
            value: 0,
            constancia: ''
        },
        domicilioLegal: '',
        destinatarioFactura: {
            nombreComercial: '',
            cuit: {
                value: 0,
                constancia: ''
            },
            condicionAfip: ''
        },
        representante: {
            email: '',
            id: '',
            nombreApellido: '',
            telefono: ''
        },
        status: 'PENDING',
        offer: []
    }
})
