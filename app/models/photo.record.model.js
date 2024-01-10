module.exports = (sequelize, Sequelize) => {
  const PhotoRecord = sequelize.define("photoRecord", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
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
    image: {
      type: Sequelize.STRING,
    },
  });

  return PhotoRecord;
};
