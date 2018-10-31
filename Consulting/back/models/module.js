module.exports = (sequelize, type) => {
    return sequelize.define('module', {
        module_id:{
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        module_nom: type.STRING,
        module_etat: type.BOOLEAN
    })
}