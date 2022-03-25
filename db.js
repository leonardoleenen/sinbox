/* eslint-disable @typescript-eslint/no-var-requires */
const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
export const database = require('knex')(configuration)
