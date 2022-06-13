/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    env: {
        FIREBASE: process.env.FIREBASE,
        MONGODB_DB_NAME: process.env.MONGODB_DB_NAME,
        MONGO_USER: process.env.MONGO_USER,
        MONGO_USER_PASSWORD: process.env.MONGO_USER_PASSWORD,
        KNEX_DB_NAME: process.env.KNEX_DB_NAME,
        KNEX_DB_USER: process.env.KNEX_DB_USER,
        KNEX_DB_PASSWORD: process.env.KNEX_DB_PASSWORD,
        KNEX_HOST: process.env.KNEX_HOST,
        API_URL: process.env.API_URL,
        RULE_ENGINE_URL: process.env.RULE_ENGINE_URL
    }
}
