const table='workflows'

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable(table,t=>{
        t.increments('id').primary()
        t.string('title')
        t.string('subtitle')
        t.string('description')
        t.bigInteger('createdAt')
        t.string('entityId')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists(table)
};
