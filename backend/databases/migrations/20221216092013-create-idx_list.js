"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("idx_list", {
      idx: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        validate: {
          min: 3_000_000,
        },
      },
    });

    await queryInterface.bulkInsert("idx_list", [
      {
        idx: 3_000_000,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.bulkDelete("idx_list".null, {});
    await queryInterface.dropTable("idx_list");
  },
};
