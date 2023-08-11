module.exports = (sequelize, Sequelize) => {
  const SourceRecord = sequelize.define("sourceRecord", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    sourceType: {
      type: Sequelize.ENUM("bankAccount", "eWallet", "wallet", "other"),
      allowNull: false,
    },
    source: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return SourceRecord;
};
