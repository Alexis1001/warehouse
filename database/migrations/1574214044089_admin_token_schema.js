'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdminTokenSchema extends Schema {
  up () {
    this.create('admin_tokens', (table) => {
      table.increments()
      table.string('token_nav',255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('admin_tokens')
  }
}

module.exports = AdminTokenSchema
