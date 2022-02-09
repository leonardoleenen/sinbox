import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'
const { Schema } = mongoose

const providerSchema = new Schema({
    id: { type: String, unique: true },
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
        value: String,
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
providerSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret.__v
        delete ret._id
    }
})
export default mongoose.models.Provider ||
    mongoose.model('Provider', providerSchema)
