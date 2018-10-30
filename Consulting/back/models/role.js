module.exports = (sequelize, type) => {
    return sequelize.define('role', {
        role_id:{
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        role_nom: type.STRING,
        role_etat: type.BOOLEAN,
      })
}