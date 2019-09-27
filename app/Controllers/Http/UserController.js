'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User=use('App/Models/User');
const AuthorizationService = use('App/Services/AuthorizationService')

class UserController {
  
  async login({ request, response,auth}) {
    const {email,password}=request.all();
    const token = await auth.attempt(email,password);
    return response.json(token);
  
  }

  async register({request,response}) {
    const {username,email,password,rol}=request.all();
    const user= new User();
    user.fill({
      username,
      email,
      password,
      rol
    });
    AuthorizationService.verifyRegistration(user)
    await user.save()
    return response.json({user});
  }
  
  async index ({ request, response, view }) {
    const user= User.all();
    return response.json({user});
  }
  async create ({ request, response, view }) {
  }
  async store ({ request, response }) {
  }
  async show ({ params, request, response, view }) {
  }
  async edit ({ params, request, response, view }) {
  }
  async update ({ params, request, response }) {
  }
  async destroy ({ params, request, response }) {
  }
}

module.exports = UserController
