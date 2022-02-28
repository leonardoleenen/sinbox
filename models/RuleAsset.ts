import mongoose from 'mongoose'
const { Schema } = mongoose

const ruleAssetSchema = new Schema({
    id: { unique: true, type: String },
    email: String,
    issuedAt: Number,
    role: String
})
ruleAssetSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret.__v
        delete ret._id
    }
})
export default mongoose.models.RuleAsset ||
    mongoose.model('RuleAsset', ruleAssetSchema)
