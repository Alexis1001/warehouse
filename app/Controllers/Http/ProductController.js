'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const AuthorizationService=use('App/Services/AuthorizationService')
const Product=use('App/Models/Product');
const  Inventory=use('App/Models/Inventory');
const  TransactionController=use("App/Controllers/Http/TransactionController");
const Helpers = use('Helpers')
class ProductController {

  async index ({response}) {
    const product=await Product.all();
    return response.json({product});
  }

  async create ({ request, response}) {
  }
  
  async store ({ request, response,auth}) {
    const user= await auth.getUser();
   // const {name,description,image,quantity,price,tax}=request.all();
    const data = request.all();
    
    console.log("1 data name "+data.name);
    console.log("2 data description "+data.description);
    console.log("3 data image "+data.image);
    console.log("4 data qunatoty "+data.quantity);
    console.log("5 data price "+data.price);
    console.log("6 data tax "+data.tax);
  
    const product=new Product();
    const inventory=new Inventory();
    AuthorizationService.AdminPrivileges(user.rol);
    var code=Math.random() * (1000000-1000)+10000;
    console.log("code  "+code);

    product.code=code;
    product.name=data.name;
    product.description=data.description;
    product.image=data.image;
   

    console.log("1 product code "+product.code);
    console.log("2 product name "+product.name);
    console.log("3 product description "+product.description);
    console.log("4 product imagen "+product.image);

    const IMG = request.file('image')
    product.image=product.name+'.'+IMG.subtype

    await IMG.move(Helpers.publicPath('uploads/'+product.name),{
      name:product.image
    })

    //product.image ='/uploads/'+'imagen'+'/'+product.image;

    product.image ='/uploads/'+product.name+'/'+product.image;

    await product.save(); 
  

    console.log("id del producto "+product.id);
    console.log("id del usuario "+auth.user.id);

    inventory.fill({
      quantity:data.quantity,
      price:data.price,
      tax:data.tax,
      product_id:product.id,
      user_id: auth.user.id
    });  
   
    await inventory.save();
   
    const PRODUCT={
      Product:{
        id:product.id,
        code:code,
        name:data.name,
        description:data.description,
        image:data.image,
      },
      Inventory:{
       quantity:data.quantity,
       price:data.price,
       tax:data.tax,
       product_id: product.id,
       user_id: auth.user.id,
      }
    };
    var describe=" product  added "+inventory.quantity+" "+product.name;
    TransactionController.addTransaction(inventory.id,1,describe);

    return response.json({PRODUCT});
  }

  async DeletePieces({response,params,auth,request}){
    const user= await auth.getUser();
    const product_id=params.id;
    //const quantity_remove=params.cantidad;//primero
    //const {quantity_remove}=request.all();//segundo
    const data=request.all();
    var quantity_remove=data.quantity_remove;
    console.log("product_id "+product_id+" quantity to remove  "+quantity_remove);
    const {id}=params;
    const product=await Product.find(id);
    const inventory=await Inventory.find(id);
    
    AuthorizationService.AdminPrivileges(user.rol);

    try{

     if(inventory.quantity>0&&quantity_remove<=inventory.quantity){
       const deleted =inventory.quantity-quantity_remove;
       console.log("product name "+product.name+" quantity total "+inventory.quantity+" quantity resulting "+deleted)
       inventory.merge({ quantity: deleted });
       await inventory.save();
       var describe="pieces deleted by expired quantity "+quantity_remove+" "+product.name;
       TransactionController.addTransaction(inventory.id,3,describe);

       return response.json({inventory});
      }

      else{
        return response.json({message:"no tienes producto que eliminar"})
      }
    
    }catch(err){
      return response.json(err.message);
    }
   
    
  }
  
  async AddPieces({response,params,auth}){
    const user= await auth.getUser();
    const product_id=params.id;
    const quantity_add=params.pieces;
    console.log("product id "+product_id+" quantity to add  "+quantity_add);
    const {id}=params;
    const product=await Product.find(id);
    const inventory=await Inventory.find(id);
    
    AuthorizationService.AdminPrivileges(user.rol);
    
    try{
      const add_pieces=parseInt(inventory.quantity)+parseInt(quantity_add);
      console.log("product name "+product.name+" quantity total "+inventory.quantity+" quantity resulting "+add_pieces);
      inventory.merge({ quantity: add_pieces });
      await inventory.save();
      var describe="new pieces added quantity "+quantity_add+" "+product.name;
      TransactionController.addTransaction(inventory.id,1,describe);

    }catch(err){

      return response.json(err.message);
    }

    return response.json({inventory});
  }

  async destroy ({response,params,auth}) {
    const user=await auth.getUser();
    const {id}=params;
    const product= await Product.find(id);

    AuthorizationService.AdminPrivileges(user.rol);

    if(product==null){
      return response.json({error:'not exist product'})
    }
    else{
      await product.delete();
      return response.json({product});
    }
  
  }

  async show ({response,params}) {
    const {id}=params  
    const product= await Product.find(id);
    return  response.json({product})
  }
  async edit ({ params, request, response, view }) {
  }
  async update ({ params, request, response ,auth}) {
  }

}

module.exports = ProductController
