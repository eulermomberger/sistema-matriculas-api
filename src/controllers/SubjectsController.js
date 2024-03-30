const knex = require('../database');

const AppError = require('../utils/AppError');

class SubjectsController {
  async index(request, response) {
    const subjects = await knex.select().table('subjects');

    return response.status(200).json({ subjects });
  }

  async create(request, response) {
    const { name } = request.body;

    if (!name) {
      throw new AppError('Informe o nome da disciplina!');
    }

    const subject = await knex('subjects').where({ name }).first();

    if (subject) {
      throw new AppError('Já existe uma disciplina com o mesmo nome!');
    }

    await knex('subjects').insert({ name });

    return response.status(201).json();
  }
}

module.exports = SubjectsController;
