import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false, // désactive les logs SQL
  }
);

try {
  await sequelize.authenticate();
  console.log("✅ Connexion à la base MySQL réussie via Sequelize");
} catch (error) {
  console.error("❌ Impossible de se connecter à la base :", error);
}

export default sequelize;
