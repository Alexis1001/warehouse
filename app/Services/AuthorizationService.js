const UserException=use('App/Exceptions/UserException')
const ProductException=use('App/Exceptions/ProductException')

class AuthorizationService{

    verifyRegistration(user){
        if(user.rol>2||user.rol<1){
            throw new  UserException();
        }
    }
    
    AdminPrivileges(rol){
       if(rol!=1){
           throw new  ProductException();
        }
     }
     


}

module.exports = new AuthorizationService();