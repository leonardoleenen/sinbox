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
        razonSocial: '',
        grupoEconomico: '',
        medio: '',
        cuit: '',
        iibb: '',
        domicilioLegal: '',
        destinatarioFactura: {
            nombreComercial: '',
            cuit: '',
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
