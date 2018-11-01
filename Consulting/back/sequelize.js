const Sequelize = require('sequelize')

const RoleModel = require('./models/role')
const ModuleModel = require('./models/module')
const ActionModel = require('./models/action')
const UserModel = require('./models/user')

const sequelize = new Sequelize('consulting','root','', {
    host: 'localhost',
    dialect: 'mysql'});

const Role = RoleModel(sequelize, Sequelize)
const Module = ModuleModel(sequelize, Sequelize)
const Action = ActionModel(sequelize, Sequelize)
const User = UserModel(sequelize, Sequelize)


User.belongsTo(Role, {foreignKey: 'role_id'});



Action.belongsTo(Module, {foreignKey: 'module_id'});
Module.hasMany(Action, {foreignKey: 'module_id'});

Action.belongsToMany(Role, {through: 'roleactions', foreignKey: 'action_id'});
Role.belongsToMany(Action, {through: 'roleactions', foreignKey: 'role_id'});

sequelize.sync()
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {Role, Module, Action, User}