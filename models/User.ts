import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema({
    id: { unique: true, type: String },
    name: String,
    iat: Number,
    identityProvider: String,
    role: String,
    controllerCompanyCuit: { type: String, required: false }
})
userSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret.__v
        delete ret._id
    }
})
export default mongoose.models.User || mongoose.model('User', userSchema)
