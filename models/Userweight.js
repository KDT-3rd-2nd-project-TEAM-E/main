const Userweight = function (Sequelize, DataTypes) {
  const model = Sequelize.define(
    "userweight",
    {
      // id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      // userid VARCHAR(20) NOT NULL
      userid: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      // Date DATETIME DEFAULT NOW(),
      Date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"), // defaultValue: Sequelize.literal("NOW()")
      },
      // weight INT
      weight: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "userweight",
      freezeTableName: true,
      timestamps: false,
    }
  );

  return model;
};

module.exports = Userweight;
