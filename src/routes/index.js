const { Router } = require('express');

const classesRouter = require('./classes.routes');
const enrollmentsRouter = require('./enrollments.routes');
const professorsRouter = require('./professors.routes');
const subjectsRouter = require('./subjects.routes');
const usersRouter = require('./users.routes');

const routes = Router();

routes.use('/classes', classesRouter);
routes.use('/enrollments', enrollmentsRouter);
routes.use('/professors', professorsRouter);
routes.use('/subjects', subjectsRouter);
routes.use('/users', usersRouter);

module.exports = routes;
