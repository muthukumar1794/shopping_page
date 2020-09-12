const path = require('path')
const CartItem = require('../models/shop-models/cart-item')
const Cart = require('../models/shop-models/cart')
const Product = require('../models/adminModels/add-product')
const User = require('../models/adminModels/user')

exports.addToCart = (req,res,next)=>{
    let usercart;
    let newquantity=1

req.user.getCart()
.then(cart=>{
    usercart = cart
    return cart.getProducts({where:{id:req.body.add_to_cart_id}})

})
.then(product=>{

  if(product.length>0){
      const oldQuantity = product[0].cartItem.quantity
       const updatedqty = oldQuantity + newquantity
       return usercart.addProduct(product[0],{through:{quantity:updatedqty}})
        }
        else{

        return Product.findByPk(req.body.add_to_cart_id)
        }
})
.then(product=>{
    usercart.addProduct(product,{through:{quantity:newquantity}})

    res.redirect('/shop/index')
})
}


exports.cartView = (req,res,next)=>{

    req.user.getCart()
    .then(usercart=>{
      return usercart.getProducts()
    })
    .then(products=>{

        res.render(path.join(path.dirname(process.mainModule.filename),'views','product-pages','cart'),{cartproducts:products})
    })
}
exports.getHome = (req,res,next)=>{
   req.user.getProducts()
   .then(products=>{
    res.render(path.join(path.dirname(process.mainModule.filename),'views','product-pages','home'),{products:products})
   })
}

exports.Checkout = (req,res,next)=>{
    let userCart
    req.user.getCart()
    .then(cart=>{
        userCart = cart
       
        return cart.getProducts()
    })
    .then(products=>{
       return req.user.createOrder()
        .then(order=>{
            order.addProduct(products.map(product=>{product.orderItem = {quantity:product.cartItem.quantity}
         
            return product
            }))
    
        })
    })
.then(result=>{
        userCart.setProducts(null)
        res.redirect('/shop/cart')
    })
    .catch(eror=>{
        console.log("order error",eror)
    })
}

exports.myOrders = (req,res,next)=>{
    req.user.getOrders({include:['products']})
    .then(orders=>{
        console.log("ordersdsdsdsd",orders)
        res.render(path.join(path.dirname(process.mainModule.filename),'views','product-pages','my-orders'),{orders:orders})
    })
    .catch(error=>{
        console.log("my orders error",error)
       
    })
    
}