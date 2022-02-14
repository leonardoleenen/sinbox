import mongoose from 'mongoose'
const { Schema } = mongoose
const workflowFormSchema = new Schema({
    id: { unique: true, type: String },
    description: String,
    title: String,
    subTitle: String,
    spec: {
        schema: mongoose.Schema.Types.Mixed,
        uischema: mongoose.Schema.Types.Mixed
    },
    data: mongoose.Schema.Types.Mixed,
    lastUpdated: Number,
    attachments: [{}]
})
workflowFormSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret.__v
        delete ret._id
    }
})
export default mongoose.models.workflow ||
    mongoose.model('Invite', workflowFormSchema)
