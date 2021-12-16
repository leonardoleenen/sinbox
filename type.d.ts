type User = {
    name: string
    iat: number
    id: string
    identityProvider: string
    role: 'PROVIDER' | 'BACKOFFICE'
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

type RegistroPropiedad ={
    actoYMonto: Array<{
        lote:string,
        manzana:string,
        plano:string,
        anio:number

    }>,
    dominio:boolean,
    propiedadHorizontal:boolean,
    departamento:string,
    matricula:string,
    inscripcion: Array<{
        tomo:string,
        folio:string,
        numero:string,
    }>,
    ubicacion:string,
    zona:string,
    localidad:string,
    calle:string,
    numero:string,
    entreCalles:string,
    lote:string,
    manzana:string,
    superficie:string,
    plano:string,
    anio:string,
    arranque:string,
    norte:string,
    sur:string,
    este:string,
    oeste:string,
    noroeste:string,
    noreste:string,
    sureste:string,
    suroeste:string,
    unidad:string,
    parcela:string,
    ubicadaPlanta:string,
    superficie:string,
    valor:string,
    comun:string,
    personaHumana:boolean,
    personaJuridica:boolean,
    humana: Array<{
        apellido:string,
        nombre:string,
        numeroDocumento:string,
        tipoDocumento:string,
        cuit:string,
        fraccion:string
    }>,
    juridica: Array<{
        denominacion:string,
        cuit:string,
        tipo:string,
        fraccion:string
    }>,
}
