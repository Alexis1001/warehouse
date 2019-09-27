'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class UserException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error,{response}) {
      return response.status(406).json({error:'Not Acceptable'});
   }
}

module.exports = UserException
