'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable('sp_guidelines_metadata', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      //foreign key usage
      guideline_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'sp_guidelines',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      description: {
        type: Sequelize.TEXT,
      },
      target_scale: {
        type: Sequelize.STRING,
      },
      integrates_gender: {
        type: Sequelize.STRING,
      },
      participants: {
        type: Sequelize.STRING,
      },
      methods: {
        type: Sequelize.STRING,
      },
      input_types: {
        type: Sequelize.STRING,
      },
      expected_outputs: {
        type: Sequelize.STRING,
      },
      human_resources: {
        type: Sequelize.STRING,
      },
      estimated_time: {
        type: Sequelize.STRING,
      },
      strengths: {
        type: Sequelize.TEXT,
      },
      limitations: {
        type: Sequelize.STRING,
      },
      is_tested_online: {
        type: Sequelize.STRING,
      },
      key_references: {
        type: Sequelize.STRING,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.dropTable('sp_guidelines_metadata');
  }
};
