exports.up = function(knex) {
  return knex.schema.createTable('users', table =>{
    table.increments();
    table.string('username').notNullable().index().unique()
    table.string('password').notNullable()
    table.string('name').notNullable()
  })
};

exports.down = function(knex) {
   return knex.schema.dropTableIfExists('users');
};
