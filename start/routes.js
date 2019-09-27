'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(() => {
  //routes users
  Route.post('user/login','UserController.login');
  Route.post('user/register','UserController.register');

  //routes products 
  Route.get('product','ProductController.index');//(cashier and admin )  list all product
  Route.get('product/:id','ProductController.show'); //(cashier and admin ) show a product
  Route.post('product','ProductController.store');// (admin) create product insert in tree  tables in products,inventories and transactions
  Route.put('product/remove/:id/:cantidad','ProductController.DeletePieces');//(admin) update  delete by expired pieces
  Route.put('product/add/:id/:pieces','ProductController.AddPieces');//(admin ) update  add new pieces  
  //Route.delete('product/:id','ProductController.destroy');//(admin) destroy a product when have cero piece
  //Route.put('product/:id','ProductController.update')//(admin) update  a product change price and iva
  
  //routes inventory
  Route.get('inventory','InventoryController.index');//(cashier and admin )  list all inventory 
  Route.get('inventory/:id','InventoryController.show');//(cashier and admin )  show a inventory 
  
  // routes transaction 
  Route.get('transaction','TransactionController.index');//(cashier and admin) all transaction 
  Route.get('transaction/:id','TransactionController.show');//(cashier and admin) all transaction 

  // routes sales 
  Route.post('sales/:ProductId','SaleController.store');//(cashier and admin) 
  Route.get('sales','SaleController.index');//(cashier and admin) permissions creted
  Route.get('sales/:id','SaleController.show');//(cashier and admin) 

  
}).prefix('api/v1/');