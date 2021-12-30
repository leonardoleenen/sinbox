type User = {
    name: string
    iat: number
    id: string
    identityProvider: string
    role:
        | 'PROVIDER'
        | 'BACKOFFICE'
        | 'ESCRIBANO'
        | 'SUPERVISOR'
        | 'RECEPTIONIST'
        | 'CERT RECEPTIONIST'
        | 'CERT SUPERVISOR'
    controllerCompanyCuit?: string
}

type Company = {
    razonSocial: {
        value: string
        constancia: string
    }
    grupoEconomico: string
    medio: string
    cuit: {
        value: string
        constancia: string
    }
    iibb: {
        value: number
        constancia: string
    }
    domicilioLegal: string
    destinatarioFactura: {
        condicionAfip: string
        nombreComercial: string
        cuit: {
            value: number
            constancia: string
        }
    }
    representante: {
        email: string
        id: string
        nombreApellido: string
        telefono: string
    }
    status: 'APPROVED' | 'PENDING' | 'CANCELED'
    offer: Array<TariffOffer>
}

type TariffOffer = {
    nombreComercial: string
    medio: string
    precio: number
}

type LegalForm = {
    id: any
    metadata: {
        type: string
        friendlyName: string
        refForm: string
    }
    payload: any
    status: 'NEW' | 'APPROVED' | 'TO CLOSE' | 'CLOSED' | 'CHECK'

    creator: {
        createdAt: number
        createdBy: any
        signature: string
    }
    signature?: {
        signedAt: number
        signedBy: User
        signature: string
    }
    aforo?: string
}

type UserInvite = {
    id: string
    email: string
    issuedAt: number
    role: string
}
