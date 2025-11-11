import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Inscription = sequelize.define("inscription", {
  id_inscription: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_annee: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_eleve: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_classe: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "inscription",
  timestamps: false,
});

export default Inscription;
