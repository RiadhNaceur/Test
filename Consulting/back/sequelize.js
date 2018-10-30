const Sequelize = require('sequelize')
const RoleModel = require('./models/role')


const sequelize = new Sequelize('consulting','root','', {
    host: 'localhost',
    dialect: 'mysql'});

const Role = RoleModel(sequelize, Sequelize)
// BlogTag will be our way of tracking relationship between Blog and Tag models
// each Blog can have multiple tags and each Tag can have multiple blogs


sequelize.sync()
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = Role