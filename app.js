import allRoutes from './routes/route-container'
import gpath from './utility/path'
const Product = require('./models/adminModels/add-product')
const User = require('./models/adminModels/user')
const Cart = require('./models/shop-models/cart')
const CartItem = require('./models/shop-models/cart-item')
const Order = require('./models/shop-models/order')
const orderItem = require('./models/shop-models/order-item')

const Sequelize = require('sequelize')
const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')

const sequelize = require('./config/db_config')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static(path.join(gpath,'public','style.css')));
app.use((req,res,next)=>{
    User.findByPk(1)
    .then(user=>{
        req.user = user
        next()
    })
    .catch(err=>{
        console.log("user funneling error",err)
    })
})

allRoutes.map(r=>app.use(r))

app.engine('ejs', require('ejs').__express);

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

Product.belongsTo(User, {foreignKey: {
    /* use this like `sequelize.define(...)` */
    allowNull: false,
    }})

User.hasMany(Product)
Cart.belongsTo(User)
User.hasOne(Cart)
Cart.belongsToMany(Product,{through:CartItem})
Product.belongsToMany(Cart,{through:CartItem})
Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product,{through:orderItem})
Product.belongsToMany(Order,{through:orderItem})

//sequelize.sync({force:true})
sequelize.sync()
.then(res=>{
    return User.findByPk(1)
})
.then(user=>{
    if(!user){
        return User.create({name:'muthu',email:"muthu@gmail.com"})
    }
    return user
})
.then(user=>{
   return user.createCart() 
})
.then(reslt=>{
    app.listen('3001',(req,res,next)=>{
        console.log("working fine")
    })
})
.catch(err=>{
    console.log("syncccc",err)
})
