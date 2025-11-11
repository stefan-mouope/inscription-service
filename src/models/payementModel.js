import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Payement = sequelize.define("payement", {
  id_payement: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_tranche: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_inscription: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date_payement: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "payement",
  timestamps: false,
});

export default Payement;
