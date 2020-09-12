

const Sequelize = require('sequelize')
const sequelize = require('../../config/db_config')

const Product = sequelize.define('products',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allownull:false
    },
    title:Sequelize.STRING,
    specification:Sequelize.STRING,
    amount:Sequelize.STRING,
    imagePath:Sequelize.STRING
})

module.exports = Product