/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('forms').del()
  await knex('forms').insert([
    {id: 5, description: 'rowValue1'},
    {id: 2, description: 'rowValue2'},
    {id: 67, description: 'rowValue3'}
  ]);
};
