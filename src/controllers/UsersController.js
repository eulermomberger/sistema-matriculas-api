const knex = require('../database');
const { hash, compare } = require('bcryptjs');

const AppError = require('../utils/AppError');

class UsersController {
  async create(request, response) {
    const { email, password, isAdmin } = request.body;

    if (!email || !password) {
      throw new AppError('Informe todos os campos (email e senha)!');
    }

    let user = await knex('users').where({ email }).first();
    
    if (user) {
      const checkPassword = await compare(password, user.password);
      if (!checkPassword) {
        throw new AppError('Senha incorreta!');
      }
    } else {
      const hashedPassword = await hash(password, 8);

      await knex('users').insert({
        email,
        password: hashedPassword,
        is_admin: isAdmin
      });
      user = await knex('users').where({ email }).first();
    }

    return response.status(201).json({ user });
  }
}

module.exports = UsersController;
