"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Customers",
      [
        {
          associateId: "1",
          companyname: "mini Miniaturas",
          cnpj: 65755215000168,
          address: "Avenida Cronos, 45",
        },
        {
          associateId: "1",
          companyname: "VISÃO televisores",
          cnpj: 24230226000147,
          address: "Avenida Hera, 450",
        },
        {
          associateId: "2",
          companyname: "LUME Luminárias",
          cnpj: 95448345000119,
          address: "Avenida Atena, 400",
        },
        {
          associateId: "2",
          companyname: "ESC Escapamentos",
          cnpj: 901393060008516,
          address: "Avenida Das Árvores, 405",
        },
        {
          associateId: "3",
          companyname: "PARA Parachoques",
          cnpj: 81409058000195,
          address: "Avenida Dos Arbustos, 504",
        },
        {
          associateId: "4",
          companyname: "FUTE Chuteiras",
          cnpj: 58952499000117,
          address: "Avenida Das Mudinhas, 5004",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Customers", null, {});
  },
};
