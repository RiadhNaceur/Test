module.exports = (sequelize, type) => {
    return sequelize.define('action', {
        action_id:{
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        action_nom: type.STRING,
        action_fonction: type.STRING,
        action_etat: type.BOOLEAN,
      })
}