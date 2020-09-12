const Sequelize = require('sequelize')
const sequelize = require('../../config/db_config')

const CartItem = sequelize.define('cartItem',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allownull:false
    },
    quantity:Sequelize.INTEGER
})

module.exports = CartItem