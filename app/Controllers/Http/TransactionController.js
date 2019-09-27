'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Transaction = use('App/Models/Transaction')

class TransactionController {
  async index ({response}) {
    const transaction=await Transaction.all();

    return response.json({transaction});
  }

  async create ({ request, response, view }) {
  }

  async addTransaction(inventory_id,type,description){     
   var inventory_id=inventory_id;
   var type=type;
   var description=description;
   console.log("Transaction "+" inventory_id "+inventory_id+" type "+type+" description "+description);
   const transaction=new Transaction();

    transaction.fill({
      inventory_id,
      type,
      description
    });
    await transaction.save();

  }

  async store ({ request, response }) {
  }

  async show ({ params,response}) {
    const {id}=params
    const transaction =await Transaction.find(id);
    return response.json({transaction});
  }

  async edit ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
  
}

module.exports = TransactionController
module.exports = new TransactionController();
