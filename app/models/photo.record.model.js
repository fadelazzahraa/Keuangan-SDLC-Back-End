module.exports = (sequelize, Sequelize) => {
  const PhotoRecord = sequelize.define("photoRecord", {
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
    detail: {
      type: Sequelize.STRING,
    },
    startDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: Sequelize.DATEONLY,
    },
    tag: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    imageDriveId: {
      type: Sequelize.STRING,
    },
    imageDriveName: {
      type: Sequelize.STRING,
    },
    imageTelegramId: {
      type: Sequelize.STRING,
    },
  });

  return PhotoRecord;
};
