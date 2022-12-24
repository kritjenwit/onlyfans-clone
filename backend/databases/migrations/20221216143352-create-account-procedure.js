"use strict";

const fs = require("fs");
const path = require("path");
const procAccount = fs.readFileSync(
  path.join(__dirname, "../sql/proc_account.sql"),
  "utf8"
);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.sequelize.query(procAccount);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.query(`DROP PROCEDURE proc_account`);
  },
};
