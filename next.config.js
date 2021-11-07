/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    env: {
        FIREBASE_CONFIG: process.env.FIREBASE_CONFIG
    }
}
