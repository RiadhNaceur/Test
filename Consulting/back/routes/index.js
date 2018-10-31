module.exports = function (app) {
    require("./client")(app);
    require("./expert")(app);
    require("./user")(app);
    require("./role")(app);
    require("./module")(app);
    require("./action")(app);
};