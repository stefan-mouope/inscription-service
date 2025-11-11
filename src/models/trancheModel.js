import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Tranche = sequelize.define("tranche", {
  id_tranche: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nom_tranche: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  montant: {                // <-- Ajout du champ montant
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  id_etablissement: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "tranche",
  timestamps: false,
});

export default Tranche;
