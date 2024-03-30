const { hash } = require('bcryptjs');

exports.seed = async (knex) => {
  await knex('users').del();
  const password = await hash('senha123', 8);
  await knex('users').insert([
    { email: 'admin@edu.unisinos.br', password, is_admin: true },
  ]);
};
