module.exports = (sequelize, Sequelize) => {
  const categoryRecord = sequelize.define("categoryRecord", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    categoryType: {
      type: Sequelize.ENUM("debit", "credit"),
      allowNull: false,
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return categoryRecord;
};
