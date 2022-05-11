declare module 'react-json-editor-ajrm/locale/en'
declare module 'react-pivottable/PivotTableUI'
declare module 'react-pivottable/TableRenderers'
declare module 'react-pivottable/PlotlyRenderers'

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
    issuedAt: number
    status: 'ENABLED' | 'DISABLED'
    email: string
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

type FileSpec = {
    id: string
    ref: string
    description: string
}

type FileInstance = {
    id: string
    payload: any
    spec: FileSpec
    ref: string
    url: string
    filledAt: number
    filledBy: User
}

type ActionSpec = {
    id: 'SEND' | 'SIGN AND SEND' | 'SIGN AND FINISH'
    name: string
    ended: boolean
}

type WorkflowProcess = {
    id: string
    spec: WorkflowSpec
    creator: User
    createdAt: number
    currentStep: string
    descriptionCurrentStep?: string
    processComplete: boolean
    evidence: Array<Evidence>
}

type Evidence = {
    data: any
    form: WorkFlowForm
    date: number
    user: User
    action: string
}

type WorkflowSpec = {
    id: string
    ref: string
    ruleAsset: any
    ruleAssetStep: string
    status: 'ENABLED' | 'DISABLED'
    lastUpdated?: number
    description?: string
}

type WorkFlowForm = {
    id: string
    description: string
    title: string
    subTitle?: string
    spec: {
        schema: any
        uischema: schema
    } | null
    data?: any
    lastUpdated: number
    attachments: Array<{
        fieldName: string
        fieldId: string
    }>
}

type ProcessInstance = {
    worflowSpec: WorkflowSpec
    id: string
    currentStep: string
}

type RuleAsset = {
    id: string
    description: string
    spec: string
}

type AnalyticsServicesRegistered = {
    user: string
    key: string
    url: string
    name: string
    id: string
}
