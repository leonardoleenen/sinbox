import mongoose from 'mongoose'
const { Schema } = mongoose

const companySchema = new Schema({
    razonSocial: {
        value: String,
        constancia: String
    },
    grupoEconomico: String,
    medio: String,
    cuit: {
        value: String,
        constancia: String
    },
    iibb: {
        value: Number,
        constancia: String
    },
    domicilioLegal: String,
    destinatarioFactura: {
        condicionAfip: String,
        nombreComercial: String,
        cuit: {
            value: Number,
            constancia: String
        }
    },
    representante: {
        email: String,
        id: String,
        nombreApellido: String,
        telefono: String
    },
    status: String,
    offer: []
})
