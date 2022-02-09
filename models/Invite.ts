import mongoose from 'mongoose'
const { Schema } = mongoose

const inviteSchema = new Schema({
    id: { unique: true, type: String },
    email: String,
    issuedAt: Number,
    role: String
})
inviteSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret.__v
        delete ret._id
    }
})
export default mongoose.models.Invite || mongoose.model('Invite', inviteSchema)
