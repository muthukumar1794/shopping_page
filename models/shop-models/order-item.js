const Sequelize = require('sequelize')

const sequelize = require('../../config/db_config')

const orderItem = sequelize.define('orderItem',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    quantity:Sequelize.INTEGER
})

module.exports = orderItem