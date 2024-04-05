const knex = require('../database');

const AppError = require('../utils/AppError');

class ClassesController {
  async index(request, response) {
    const { user_id: userId } = request.query;

    let query = knex
      .select(
        'classes.id',
        'classes.shift',
        'classes.max_of_students',
        'professors.id AS professor_id',
        'professors.name AS professor_name',
        'subjects.id AS subject_id',
        'subjects.name AS subject_name'
      )
      .from('classes')
      .join('professors', 'professors.id', 'classes.professor_id')
      .join('subjects', 'subjects.id', 'classes.subject_id')
      .groupBy('classes.id')
      .distinct('classes.id');

    const userHasEnrollments = await knex('enrollments')
      .where('user_id', userId)
      .first();

    if (userHasEnrollments) {
      query = query
        .join('enrollments', 'classes.id', 'enrollments.class_id')
        .where('enrollments.user_id', userId);
    }

    const enrollmentsCountSubquery = knex('enrollments')
      .count('*')
      .whereRaw('enrollments.class_id = classes.id')
      .as('number_of_enrollments');

    query = await query.select(enrollmentsCountSubquery);

    const classes = query.map((row) => ({
      id: row.id,
      shift: row.shift,
      max_of_students: row.max_of_students,
      number_of_enrollments: row.number_of_enrollments,
      professor: { id: row.professor_id, name: row.professor_name },
      subject: { id: row.subject_id, name: row.subject_name },
    }));

    return response.status(200).json({ classes, user_has_enrollments: Boolean(userHasEnrollments) });
  }

  async create(request, response) {
    const {
      subject_id: subjectId,
      professor_id: professorId,
      shift,
      max_of_students: maxOfStudents,
    } = request.body;

    if (!subjectId || !professorId || !shift || !maxOfStudents) {
      throw new AppError('Informe todos os campos!');
    }

    const checkClassAlreadyExists = await knex('classes').where({
      professor_id: professorId,
      shift,
    }).first();

    if (checkClassAlreadyExists) {
      throw new AppError('Esse professor já possui uma turma no mesmo turno!');
    }

    await knex('classes').insert({
      subject_id: subjectId,
      professor_id: professorId,
      shift,
      max_of_students: maxOfStudents,
    });

    return response.status(200).json();
  }

  async update(request, response) {
    const {
      professor_id: professorId,
      shift,
      max_of_students: maxOfStudents,
    } = request.body;

    const classId = request.params.id;

    if (!professorId || !shift || !maxOfStudents) {
      throw new AppError('Informe todos os campos!');
    }

    const currentClass = await knex('classes').where({ id: classId }).first();

    if (!currentClass) {
      throw new AppError('Turma não encontrada!');
    }

    await knex('classes').where({ id: classId }).update({
      professor_id: professorId,
      shift,
      max_of_students: maxOfStudents,
    });

    return response.status(200).json();
  }
}

module.exports = ClassesController;
