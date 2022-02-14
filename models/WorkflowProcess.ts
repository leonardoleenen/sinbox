import mongoose from 'mongoose'
const { Schema } = mongoose
const workflowProcessSchema = new Schema({
    id: { unique: true, type: String },
    spec: Schema.Types.Mixed,
    creator: Schema.Types.Mixed,
    createdAt: Number,
    currentStep: String,
    descriptionCurrentStep: String,
    processComplete: Boolean,
    evidence: []
})
workflowProcessSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret.__v
        delete ret._id
    }
})
export default mongoose.models.workflowProcess ||
    mongoose.model('Invite', workflowProcessSchema)
