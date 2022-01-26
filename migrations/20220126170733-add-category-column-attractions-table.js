module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'attractions',
      'category_id',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories',
          key: 'id',
        },
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('attractions', 'category_id');
  },
};
