const { Router } = require('express');

const EnrollmentsController = require('../controllers/EnrollmentsController');

const enrollmentsRoutes = Router();

const enrollmentsController = new EnrollmentsController();

enrollmentsRoutes.post('/', enrollmentsController.create);
// enrollmentsRoutes.delete('/', enrollmentsController.delete);

module.exports = enrollmentsRoutes;
