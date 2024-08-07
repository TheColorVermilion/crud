/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    // all passwords are "dog"
    {first_name: 'jack', last_name:'green', username:'jgreen', password:'$2b$10$PRY8H1qs03p7vYd4tf7eseTM37PV1/mQSS6HykX3L/M/lcZoo8gtW'},
    {first_name: 'james', last_name:'brown', username:'jbrown', password:'$2b$10$7nVSiGDDx/646VUhmtEv2Oq6ZDEzVbyzPWrNWvpRBQmHyLenrbjDq'},
    {first_name: 'john', last_name:'red', username:'jred', password:'$2b$10$GVg3L4/JDXhpASjWdDeKHe2J11mT3ftUvJj4MJveQRpKujuSWvBBe'}
  ]);
};
