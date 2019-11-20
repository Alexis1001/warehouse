'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const AdminToken=use('App/Models/AdminToken');

class AdminTokenController {

  async index ({ request, response, view }) {
  }

  async create ({ request, response, view }) {
  }

  async store ({ request, response }) {
    const data=request.all();
    const adminToken=new AdminToken();
    adminToken.token_nav=data.token_nav;
    await adminToken.save();
    return response.json({adminToken});
  }

  async show ({ params, request, response, view }) {
    const id=params.id;
    const adminToken=await AdminToken.find(id);
    return response.json({adminToken})
  }

  async edit ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = AdminTokenController
