'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ProductException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error,{response}) {
    response.status(406).json({error:"Not Admin privileges"});
 }
}

module.exports = ProductException
