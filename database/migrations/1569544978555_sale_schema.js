'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SaleSchema extends Schema {
  up () {
    this.create('sales', (table) => {
      table.increments()
      table.integer('quantity').notNullable()
      table.float('discount').notNullable()
      table.integer('status').notNullable();
      table.float('total').notNullable()
      table.integer('payment_method').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('product_id').unsigned().references('id').inTable('products')
      table.timestamps()
    })
  }

  down () {
    this.drop('sales')
  }
}

module.exports = SaleSchema
