/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {first_name: 'robert', last_name:'smith', username:'rsmith', password:'dontstoreplaintextpasswords'},
    {first_name: 'john', last_name:'smith', username:'jsmith', password:'dontstoreplaintextpasswords'}
  ]);
};
