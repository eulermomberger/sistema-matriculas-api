require('express-async-errors');
require('dotenv');

const AppError = require('./utils/AppError');
const express = require('express');

const app = express();

const routes = require('./routes');

app.use(express.json());

app.use(routes);

app.use((err, request, response, next) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on Port ${PORT}`);
});
