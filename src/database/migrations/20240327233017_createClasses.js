exports.up = (knex) => knex.schema.createTable('classes', (table) => {
  table.increments('id');
  table.integer('subject_id').references('id').inTable('subjects');
  table.integer('professor_id').references('id').inTable('professors');
  table.integer('shift').notNullable();
  table.integer('max_of_students').notNullable();
  table.timestamp('created_at').default(knex.fn.now());
  table.timestamp('updated_at').default(knex.fn.now());
});

exports.down = (knex) => knex.schema.dropTable('classes');
