exports.up = (knex) => knex.schema.createTable('enrollments', (table) => {
  table.increments('id');
  table.integer('class_id').notNullable().references('id').inTable('classes');
  table.integer('user_id').notNullable().references('id').inTable('users');
  table.timestamp('created_at').default(knex.fn.now());
  table.timestamp('updated_at').default(knex.fn.now());

  table.unique(['class_id', 'user_id']);
});

exports.down = (knex) => knex.schema.dropTable('enrollments');
