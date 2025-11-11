import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Eleve = sequelize.define("eleve", {
  id_eleve: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adresse: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  num_parent: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_etablissement: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "eleve",
  timestamps: false,
});

export default Eleve;
