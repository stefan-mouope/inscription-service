import { Payement, Inscription, Tranche } from "../models/associations.js";

// ➕ Enregistrer un paiement
export const createPayement = async (req, res) => {
  try {
    const { id_inscription, id_tranche } = req.body;

    if (!id_inscription || !id_tranche) {
      return res.status(400).json({ message: "Champs requis manquants" });
    }

    // Vérifie si les clés étrangères existent
    const inscription = await Inscription.findByPk(id_inscription);
    const tranche = await Tranche.findByPk(id_tranche);

    if (!inscription || !tranche) {
      return res.status(404).json({ message: "Inscription ou tranche introuvable" });
    }

    // Vérifie si le paiement existe déjà pour cette tranche
    const existant = await Payement.findOne({
      where: { id_inscription, id_tranche },
    });

    if (existant) {
      return res.status(400).json({ message: "Paiement déjà enregistré pour cette tranche" });
    }

    // Création du paiement sans montant, car il est fixe pour la tranche
    const payement = await Payement.create({ id_inscription, id_tranche });

    // Retourne le paiement avec le montant de la tranche inclus
    const payementAvecMontant = await Payement.findByPk(payement.id_payement, {
      include: [
        { model: Inscription, attributes: ["id_inscription", "id_eleve", "id_classe"] },
        { model: Tranche, attributes: ["nom_tranche", "montant"] }, // Montant ici vient de la tranche
      ],
    });

    res.status(201).json({ message: "Paiement enregistré avec succès", payement: payementAvecMontant });
  } catch (error) {
    console.error("Erreur création paiement :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// 📄 Lister tous les paiements avec montant de la tranche
export const getAllPayements = async (req, res) => {
  try {
    const payements = await Payement.findAll({
      include: [
        { model: Inscription, attributes: ["id_inscription", "id_eleve", "id_classe"] },
        { model: Tranche, attributes: ["nom_tranche", "montant"] },
      ],
    });
    res.json(payements);
  } catch (error) {
    console.error("Erreur récupération paiements :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// 🔍 Obtenir un paiement par ID avec montant de la tranche
export const getPayementById = async (req, res) => {
  try {
    const { id } = req.params;
    const payement = await Payement.findByPk(id, {
      include: [
        { model: Inscription, attributes: ["id_inscription", "id_eleve", "id_classe"] },
        { model: Tranche, attributes: ["nom_tranche", "montant"] },
      ],
    });

    if (!payement) return res.status(404).json({ message: "Paiement non trouvé" });

    res.json(payement);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
