/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('items').insert([
    {user_id: 1, item_name: 'Playstation 5', description: 'Like-new PS5, barely used. 4K gaming, fast load times. Includes controller, cables. Great deal, act fast! No box.', quantity: 2,},
    {user_id: 1, item_name: 'Xbox 360', description:'older game console devleoped by microsoft release in 2005', quantity: 5},
    {user_id: 2, item_name: 'PC', description:'a modern gaming PC built in 2024 with a 4090 and AMD ryzen 9 7950X', quantity: 1},
    {user_id: 2, item_name: 'Nintendo Switch', description:'an aging gaming console developed by nitendo released in 2017', quantity: 4}
  ]);
};
