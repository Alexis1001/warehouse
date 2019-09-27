'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Product=use('App/Models/Product');
const Inventory=use('App/Models/Inventory');
const Transaction=use('App/Models/Transaction')
const Sale=use('App/Models/Sale');
const TransactionController=use("App/Controllers/Http/TransactionController");


class SaleController {
 
  async index ({ request, response, view }) {
    const sale= await Sale.all();
    response.json({sale});  
  }

  async create ({ request, response, view }) {
  }
  
  async store ({ request,response,params,auth}) {
    const user= await auth.getUser();
    
    const {quantity,discount,status,paymenth_method}=request.all();
    const productId=params.ProductId; 
    const product= await Product.find(productId);
    const product_id=product.id;
    const inventory= await Inventory.find(product_id);
    const sale=new Sale();  
   
      if(quantity>inventory.quantity){
       return response.json({message:"insufficient products"});
      } 

      else{
        var quantity_sales=quantity;
        var price_inventory=inventory.price;
        var tax_inventory=inventory.tax;
        console.log("cantidad de producto "+quantity_sales+" precio por producto "+price_inventory+" iva del producto "+tax_inventory);
      
        var iva=quantity_sales*price_inventory*tax_inventory;
        var Subtotal=quantity_sales*price_inventory+iva;
        var total=Subtotal-discount;
        var tot=quantity_sales*price_inventory;
        console.log("total : "+tot);
        console.log("Iva resultante : "+iva);
        console.log("total + Iva : "+Subtotal);
        console.log("total - descuento : "+total);
        console.log("cantidad "+quantity+" discount "+discount+" status "+status+" pago "+paymenth_method);
        
        sale.fill({
          quantity,
          discount,
          status,
          total,
          payment_method:paymenth_method,      
          user_id:auth.user.id,
          product_id:product_id
        });
        await sale.save(); 
       
        var inventory_id=inventory.id;
        var type=2;
        var description="sold product succes "+quantity_sales+" "+product.name;  
        TransactionController.addTransaction(inventory_id,type,description)
        this.UpdateInventory(inventory_id,quantity_sales);
        return response.json({sale}); 
      }
    
  }

  async UpdateInventory(inventory_id,quantity_sales){
    var inventory_id=inventory_id;
    var quantity_sales=quantity_sales;
    const inventory= await Inventory.find(inventory_id);
    var total=inventory.quantity-quantity_sales;
    inventory.merge({ quantity:total});
    await inventory.save();
  } 
   
  async show ({ params, request, response, view }) {
    const {id}=params;
    const sale=await Sale.find(id);
    return response.json({sale});
  }

  async edit ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }

}

module.exports = SaleController
