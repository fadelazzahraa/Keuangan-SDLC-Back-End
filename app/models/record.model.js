module.exports = (sequelize, Sequelize) => {
  const Record = sequelize.define("record", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    // source: {
    //   type: Sequelize.ENUM("bank_bsi", "bank_jago", "dana"),
    //   allowNull: false,
    // },
    actor: {
      type: Sequelize.ENUM("me", "other"),
      allowNull: false,
    },
    transaction: {
      type: Sequelize.ENUM("debit", "credit"),
      allowNull: false,
    },
    value: {
      type: Sequelize.DECIMAL(12,3),
      allowNull: false,
    },
    detail: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    tag: {
      type: Sequelize.STRING,
    },
  });
  return Record;
};
