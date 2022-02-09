/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    env: {
        FIREBASE: process.env.FIREBASE,
        MONGODB_DB_NAME: process.env.MONGODB_DB_NAME,
        MONGO_USER: process.env.MONGO_USER,
        MONGO_USER_PASSWORD: process.env.MONGO_USER_PASSWORD,
        STORE: process.env.STORE,
        API_URL: process.env.API_URL
    }
}
