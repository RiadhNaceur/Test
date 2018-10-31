module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        user_id:{
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_nom: type.STRING,
        user_prenom: type.STRING,
        user_date_nais: type.DATEONLY,
        user_civilite: type.STRING,
        user_adresse: type.STRING,
        user_cp: type.STRING,
        user_email: type.STRING,
        user_password: type.STRING,
      });
}