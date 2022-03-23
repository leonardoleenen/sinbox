// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    development: {
        client: 'pg',
        connection: {
            database: process.env.KNEX_DB_NAME,
            user: process.env.KNEX_DB_USER,
            password: process.env.KNEX_DB_PASSWORD
        },
        seeds: {
            directory: './datastore/seeds'
        }
    },
    staging: {
        client: 'pg',
        connection: {
            database: process.env.KNEX_DB_NAME,
            user: process.env.KNEX_DB_USER,
            password: process.env.KNEX_DB_PASSWORD
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    production: {
        client: 'pg',
        connection: {
            database: process.env.KNEX_DB_NAME,
            user: process.env.KNEX_DB_USER,
            password: process.env.KNEX_DB_PASSWORD
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }
}
