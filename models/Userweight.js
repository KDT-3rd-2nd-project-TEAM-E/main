const Userweight = function (Sequelize, DataTypes) {
  const model = Sequelize.define(
    "userweight",
    {
      // userid VARCHAR(20) NOT NULL UNIQUE PRIMARY KEY
      userid: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
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
