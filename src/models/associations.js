import Eleve from "./eleveModel.js";
import Inscription from "./inscriptionModel.js";
import Tranche from "./trancheModel.js";
import Payement from "./payementModel.js";



// 🧑‍🎓 Un élève a plusieurs inscriptions
Eleve.hasMany(Inscription, { foreignKey: "id_eleve" });
Inscription.belongsTo(Eleve, { foreignKey: "id_eleve" });



Inscription.belongsToMany(Tranche, {
  through: Payement,
  foreignKey: "id_inscription",
  otherKey: "id_tranche",
  as: "tranches_payees",
});



Tranche.belongsToMany(Inscription, {
  through: Payement,
  foreignKey: "id_tranche",
  otherKey: "id_inscription",
  as: "inscriptions_associees",
});



Payement.belongsTo(Inscription, { foreignKey: "id_inscription" });
Payement.belongsTo(Tranche, { foreignKey: "id_tranche" });



// ✅ Exporter tous les modèles
export { Eleve, Inscription, Tranche, Payement };
