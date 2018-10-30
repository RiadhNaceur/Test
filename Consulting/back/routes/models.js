var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
var connection = new sequelize('consulting','root','', {
    host: 'localhost',
    dialect: 'mysql'});

//var User = require('../models/dataSchema');

const User = connection.define('users', {
    user_id:{
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_nom: sequelize.STRING,
    user_prenom: sequelize.STRING,
    user_date_nais: sequelize.DATEONLY,
    user_civilite: sequelize.STRING,
    user_adresse: sequelize.STRING,
    user_cp: sequelize.STRING,
    user_email: sequelize.STRING,
    user_password: sequelize.STRING,
  });

  const Role = connection.define('role', {
    role_id:{
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_nom: sequelize.STRING,
    user_etat: sequelize.BOOLEAN,
  });

  const Module = connection.define('module', {
    module_id:{
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    module_nom: sequelize.STRING,
    module_etat: sequelize.BOOLEAN,
  });

  const Action = connection.define('action', {
    action_id:{
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    action_nom: sequelize.STRING,
    action_fonction: sequelize.STRING,
    action_etat: sequelize.BOOLEAN,
  });

  const Roleaction = connection.define('roleactions', {
    roleaction_id:{
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
  });


  User.belongsTo(Role, {foreignKey: 'role_id'});
  Action.belongsTo(Module, {foreignKey: 'module_id'});

  Action.belongsToMany(Role, {through: 'roleactions', foreignKey: 'action_id'});
Role.belongsToMany(Action, {through: 'roleactions', foreignKey: 'role_id'});
connection.sync();
console.log('connected to Mysql')

module.exports = router;