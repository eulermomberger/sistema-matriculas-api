const knex = require('../database');

const AppError = require('../utils/AppError');

class ProfessorsController {
  async index(request, response) {
    const professors = await knex.select().table('professors');

    return response.status(200).json({ professors });
  }

  async create(request, response) {
    const { name } = request.body;

    if (!name) {
      throw new AppError('Informe o nome do professor!');
    }

    const subject = await knex('professors').where({ name }).first();

    if (subject) {
      throw new AppError('Já existe um professor com o mesmo nome!');
    }

    await knex('professors').insert({ name });

    return response.status(201).json();
  }
}

module.exports = ProfessorsController;
