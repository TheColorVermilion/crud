/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('items').insert([
    {user_id: 1, item_name: 'Playstation 5', description: 'this description is over 100 characters:Like-new PS5, barely used. 4K gaming, fast load times. Includes controller, cables. Great deal, act fast! No box.', quantity: 2, price:'$200', imageLink: "https://upload.wikimedia.org/wikipedia/commons/7/77/Black_and_white_Playstation_5_base_edition_with_controller.png"},
    {user_id: 1, item_name: 'Xbox 360', description:'older game console devleoped by microsoft release in 2005', quantity: 5, price:'$600', imageLink: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Xbox-360S-Console-Set.jpg/1024px-Xbox-360S-Console-Set.jpg"},
    {user_id: 2, item_name: 'PC', description:'a modern gaming PC built in 2024 with a 4090 and AMD ryzen 9 7950X', quantity: 1, price:'$400', imageLink: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Das_Innenleben_eines_Gaming-PCs_aus_2021_20211126_HOF08249_RAW-Export_20220714004140.png/1920px-Das_Innenleben_eines_Gaming-PCs_aus_2021_20211126_HOF08249_RAW-Export_20220714004140.png"},
    {user_id: 2, item_name: 'Nintendo Switch', description:'an aging gaming console developed by nitendo released in 2017', quantity: 4, price:'$300', imageLink: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Nintendo-Switch-wJoyCons-BlRd-Standing-FL.jpg/2560px-Nintendo-Switch-wJoyCons-BlRd-Standing-FL.jpg"}
  ]);
};
