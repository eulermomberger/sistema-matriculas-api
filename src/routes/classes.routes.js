const { Router } = require('express');

const ClassesController = require('../controllers/ClassesController');

const classesRoutes = Router();

const classesController = new ClassesController();

classesRoutes.get('/', classesController.index);
classesRoutes.post('/', classesController.create);

module.exports = classesRoutes;