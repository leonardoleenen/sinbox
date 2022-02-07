import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema({
    name: String,
    iat: Number,
    identityProvider: String,
    role: String,
    controllerCompanyCuit: { type: String, required: false }
})
export default mongoose.models.Provider || mongoose.model('User', userSchema)
