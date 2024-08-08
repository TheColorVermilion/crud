/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('items', (table)=>{
    table.increments('item_id');
    table.integer('user_id').notNullable();
    table.string('item_name').notNullable();
    table.string('description');
    table.integer('quantity');
    table.string('price')
    table.string('imageLink')
      table.foreign('user_id').references('users.id').onDelete('CASCADE');

  })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table('items', (table)=>{
    table.dropForeign('user_id')

  }).then(()=> knex.schema.dropTableIfExists('items'))

};
