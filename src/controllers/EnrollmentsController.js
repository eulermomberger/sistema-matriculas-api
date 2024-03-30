const knex = require('../database');

const AppError = require('../utils/AppError');

class EnrollmentsController {
  async create(request, response) {
    try {
      await knex.transaction(async (trx) => {
        let { enrollments } = request.body;

        if (!enrollments || !Array.isArray(enrollments) || enrollments.length === 0) {
          throw new AppError('Informe corretamente a matrícula!');
        }

        enrollments = enrollments.map((enrollment) => ({
          class_id: enrollment.class_id,
          user_id: enrollment.user_id,
        }));

        await knex('enrollments').insert(enrollments).transacting(trx);
      });

      return response.status(201).json();
    } catch {
      throw new AppError('Ocorreu um erro ao confirmar sua matrícula! Tente novamente mais tarde.');
    }
  }
}

module.exports = EnrollmentsController;
