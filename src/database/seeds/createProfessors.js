exports.seed = async (knex) => {
  await knex('professors').del()
  await knex('professors').insert([
    { name: 'Elvandi Da Silva Júnior' },
    { name: 'Vinicius Costa de Souza' },
    { name: 'Tatiana Coreixas' },
    { name: 'Jones Quadros' },
    { name: 'Raphael Leite' },
  ]);
};
