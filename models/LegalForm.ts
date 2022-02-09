import mongoose from 'mongoose'
const { Schema } = mongoose

const legalFormSchema = new Schema({
    id: { unique: true, type: String },
    metadata: {
        type: String,
        friendlyName: String,
        refForm: String
    },
    payload: Schema.Types.Mixed,
    status: String,
    creator: {
        createdAt: Number,
        createdBy: Schema.Types.Mixed,
        signature: String
    },
    signature: {
        signedAt: Number,
        signedBy: Schema.Types.Mixed,
        signature: String
    },
    aforo: String
})
legalFormSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret.__v
        delete ret._id
    }
})
export default mongoose.models.LegalForm ||
    mongoose.model('LegalForm', legalFormSchema)
