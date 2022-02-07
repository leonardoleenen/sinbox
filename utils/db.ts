import mongoose from 'mongoose'
import chalk from 'chalk'
const DB_NAME: string | undefined = process.env.MONGODB_DB_NAME
const MONGO_USER: string | undefined = process.env.MONGO_USER
const MONGO_USER_PASSWORD: string | undefined = process.env.MONGO_USER_PASSWORD
const URI = `mongodb+srv://${MONGO_USER}:${MONGO_USER_PASSWORD}@main.hvqpa.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
if (!URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    )
}
if (!DB_NAME) {
    throw new Error(
        'Please define the MONGODB_DB environment variable inside .env.local'
    )
}
export async function connectToDatabase() {
    await mongoose.connect(URI)
    const db = mongoose.connection
    db.on(
        'error',
        console.error.bind(
            console,
            `${chalk.red('[ERROR] Couldnt connect to db')} `
        )
    )
    db.once('open', function () {
        console.log(`${chalk.green('[DB] Connected succesfully')} `)
    })
}
