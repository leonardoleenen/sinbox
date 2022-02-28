import mongoose from 'mongoose'
const { Schema } = mongoose
const workflowSpecSchema = new Schema({
    id: { unique: true, type: String },
    ref: String,
    ruleAsset: String,
    ruleAssetStep: String,
    status: String,
    data: mongoose.Schema.Types.Mixed,
    lastUpdated: Number
})
workflowSpecSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret.__v
        delete ret._id
    }
})
export default mongoose.models.workflowSpec ||
    mongoose.model('workflowSpec', workflowSpecSchema)
