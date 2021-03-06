const Sequelize = require("sequelize");
const dbConfig = require("./config/dbconfig");

const Customer = require("../models/Customer");
const Delivery = require("../models/Delivery");
const Motoboy = require("../models/Motoboy");
const Associate = require("../models/Associate");

const connection = new Sequelize(dbConfig);

// Inicialize os modelos para o sequelize
Customer.init(connection);
Delivery.init(connection);
Motoboy.init(connection);
Associate.init(connection);

// Defina os relacionamentos entre os modelos
Customer.associate(connection.models);
Delivery.associate(connection.models);
Motoboy.associate(connection.models);
Associate.associate(connection.models);

module.exports = connection;
