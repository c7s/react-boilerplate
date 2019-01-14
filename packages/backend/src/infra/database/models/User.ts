export function User(sequelize, DataTypes) {
  return sequelize.define('user', {
    name: DataTypes.STRING,
  });
};
