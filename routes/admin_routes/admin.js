const path = require('path')

const express = require('express')
const adminRouter = express.Router()
const admincontrollers = require('../../controllers/admin')

adminRouter.get('/admin/index',admincontrollers.getadminIndex)
adminRouter.get('/admin/add-product',admincontrollers.addProducts)
adminRouter.post('/admin/add-product-data',admincontrollers.addProductsData)
adminRouter.post('/admin/edit-product-data',admincontrollers.editProductsData)
adminRouter.post('/admin/product/details/:prodid',admincontrollers.getProductDetails)
adminRouter.get('/admin/edit-product/:prodID',admincontrollers.geteditProduct)

adminRouter.post('/admin/product/delete/:prodID',admincontrollers.deleteProduct)

module.exports = adminRouter