'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User=use('App/Models/User');
const AuthorizationService = use('App/Services/AuthorizationService')
const Hash = use('Hash')
const Tokens=use('App/Models/Token');
class UserController {
  
  async login({ request, response,auth}) {
    const {email,password}=request.all();
    const token = await auth.attempt(email,password);
    console.log("email "+email+" password  "+password);
    const user =await User.findByOrFail('email',email);
    if(user){
      //var user_rol=user.rol;
      //console.log("entron en user "+user.id);
      return response.json({
        token,user}
      );
    }
      return response.json({message:'not found'})   
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
    return this.login(...arguments);
  }
  
  async index ({ request, response, view }) {
    const user= await User.all();
    return response.json({user});

  }

  async resetpass ({ request, response, auth }) {
    const users = await auth.getUser();
    const id = users.id
    const { password, newPassword } = request.only(['username', 'password', 'newPassword']);
    
    const user = await User.findByOrFail('id', id)
   
    const passwordCheck = await Hash.verify(password, user.password)

    if (!passwordCheck) {
      return response
        .status(400)
        .send({ message: { error: 'Incorrect password provided' } })
    }

    user.password = newPassword
  
    await user.save()
    return response.json({ message: 'Password Success!'})
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
