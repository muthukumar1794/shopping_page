const express = require('express')
const shopRouter = express.Router()
const path = require('path')
const homeControllers = require('../../controllers/home')

shopRouter.get('/shop/index',homeControllers.getHome);
shopRouter.post('/shop/add-to-cart',homeControllers.addToCart)
shopRouter.get('/shop/cart',homeControllers.cartView)
shopRouter.post('/shop/checkout',homeControllers.Checkout)
shopRouter.get('/shop/orders',homeControllers.myOrders)


module.exports = shopRouter