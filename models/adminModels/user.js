const Sequelize = require('sequelize')
const sequelize = require('../../config/db_config')

const User = sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allownull:false
    },
    name:Sequelize.STRING,
    email:Sequelize.STRING
})

module.exports = User