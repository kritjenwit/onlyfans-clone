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
    await queryInterface.createTable("account", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      app_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      platform: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isban: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
          isBoolean: true,
        },
      },
      lastlogin: {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
          isAfter: new Date(),
        },
      },
      regip: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isIP: true,
        },
      },
      idx: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        validate: {
          min: 3_000_000,
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        validate: {
          isAfter: new Date(),
        },
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        validate: {
          isAfter: new Date(),
        },
      },
    });
    await queryInterface.addIndex("account", ["app_id", "email", "type"], {
      unique: true,
    });

    await queryInterface.createTable("user_profile", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idx: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: true,
      },
      nickname: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "-",
      },
      img_url: {
        allowNull: false,
        type: Sequelize.TEXT,
        defaultValue: "https://www.w3schools.com/w3images/avatar2.png",
      },
      bio: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "Hello",
      },
      gender: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 0,
      },
      web_url: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      visible: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      subscription_price: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        validate: {
          isAfter: new Date(),
        },
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        validate: {
          isAfter: new Date(),
        },
      },
    });
    await queryInterface.addIndex("user_profile", ["idx"], {
      unique: true,
    });

    await queryInterface.createTable("user_wallet", {
      idx: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      point: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 99_999_999,
          isInt: true,
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        validate: {
          isAfter: new Date(),
        },
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        validate: {
          isAfter: new Date(),
        },
      },
    });
    await queryInterface.addIndex("user_wallet", ["idx"], {
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("account");
    await queryInterface.dropTable("user_profile");
    await queryInterface.dropTable("user_wallet");
  },
};
