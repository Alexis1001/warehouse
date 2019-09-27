'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Inventory=use('App/Models/Inventory')
const Product=use('App/Models/Product')
const AuthorizationService = use('App/Services/AuthorizationService')

class InventoryController {

  async index ({response}) {
    const inventory= await Inventory.all();
    return response.json({inventory});
  }
  async create ({ request, response, view }) {
  }

  async store ({ request, response,auth}) {
    const user= await auth.getUser();
    const {quantity,price,tax,user_id,product_id}=request.all();
    
    const inventory=new Inventory();
    inventory.fill({
      quantity,
      price,
      tax,
      user_id,
      product_id
    });
  
    AuthorizationService.AdminPrivileges(user.rol);
    await inventory.save();
    return response.json({inventory}); 
  }


  async show ({ params, response}) {
    const {id}=params;
    const inventory= await Inventory.find(id);
    return response.json({inventory});

  }

  async edit ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params,response,auth }) {
    const user= await auth.getUser();
    const {id}=params;
    const inventory= await Inventory.find(id);
    AuthorizationService.AdminPrivileges(user.rol);
   if(inventory==null){
      return response.json({error:'not exist product'})
    }
    else{
      await inventory.delete();
      return response.json({inventory});
    }

  }
}

module.exports = InventoryController
module.exports = new InventoryController();
