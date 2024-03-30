const { Router } = require('express');

const ProfessorsController = require('../controllers/ProfessorsController');

const professorsRoutes = Router();

const professorsController = new ProfessorsController();

professorsRoutes.get('/', professorsController.index);
professorsRoutes.post('/', professorsController.create);

module.exports = professorsRoutes;
