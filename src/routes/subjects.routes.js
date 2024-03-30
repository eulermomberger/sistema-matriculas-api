const { Router } = require('express');

const SubjectsController = require('../controllers/SubjectsController');

const subjectsRoutes = Router();

const subjectsController = new SubjectsController();

subjectsRoutes.get('/', subjectsController.index);
subjectsRoutes.post('/', subjectsController.create);

module.exports = subjectsRoutes;