const Sequelize = require('sequelize')
const sequelize = require('../../config/db_config')

const Cart = sequelize.define('cart',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allownull:false
    }
})

module.exports = Cart