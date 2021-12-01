type User = {
    name: string
    iat: number
    id: string
    identityProvider: string
    role: 'PROVIDER' | 'BACKOFFICE'
    controllerCompanyCuit?: string
}

type Company = {
    razonSocial: string
    grupoEconomico: string
    medio: string
    cuit: string
    iibb: string
    domicilioLegal: string
    destinatarioFactura: {
        condicionAfip: string
        nombreComercial: string
        cuit: string
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
