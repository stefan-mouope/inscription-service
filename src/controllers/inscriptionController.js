import { publishEvent } from "../config/rabbitmq.js";
import { Eleve, Inscription, Tranche, Payement } from "../models/associations.js";

// ➕ Créer une nouvelle inscription
export const createInscription = async (req, res) => {
  try {
    const { eleve, id_annee, id_classe } = req.body;

    // ✅ Vérification des champs requis
    if (!eleve || !id_annee || !id_classe) {
      return res.status(400).json({ message: "Champs requis manquants" });
    }

    // 📢 Publication de l'événement pour vérifier la classe et l'année académique
    const event_data = {
      id_classe,
      id_annee,
      id_etablissement: eleve.id_etablissement, // ou autre champ selon ton modèle
    };

    // Publier l'événement sur RabbitMQ
    const response = await publishEvent({
      event: "verification_inscription",
      data: event_data,
    });

    console.log("📩 Réponse du service :", response);

    // ✅ Vérification de la validité de la réponse
    if (!response || response.status !== "ok") {
      return res.status(400).json({ message: "Classe ou année invalide" });
    }

    // ✅ Création de l'élève s’il n’existe pas déjà
    // let nouveauEleve = await Eleve.findOne({ where: { matricule: eleve.matricule } });

    if (!nouveauEleve) {
      nouveauEleve = await Eleve.create(eleve);
      console.log("👤 Nouvel élève créé :", nouveauEleve.id);
    }

    // ✅ Création de l’inscription
    const inscription = await Inscription.create({
      id_eleve: nouveauEleve.id,
      id_annee,
      id_classe,
    });

    res.status(201).json({
      message: "Inscription créée avec succès ✅",
      inscription,
    });
  } catch (error) {
    console.error("❌ Erreur lors de la création :", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};


// 📄 Lister toutes les inscriptions
export const getAllInscriptions = async (req, res) => {
  try {
    const inscriptions = await Inscription.findAll({
      include: [
        {
          model: Eleve,
          attributes: ["id_eleve", "nom", "prenom", "adresse", "num_parent"],
        },
        {
          model: Tranche,
          as: "tranches_payees",
          attributes: ["id_tranche", "nom_tranche", "montant"],
          through: { attributes: [] }, // ne renvoie pas la table pivot
        },
      ],
    });

    res.json(inscriptions);
  } catch (error) {
    console.error("Erreur récupération inscriptions :", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// 🔍 Récupérer une inscription spécifique
export const getInscriptionById = async (req, res) => {
  try {
    const { id } = req.params;

    const inscription = await Inscription.findByPk(id, {
      include: [
        { model: Eleve },
        { model: Tranche, as: "tranches_payees" },
      ],
    });

    if (!inscription) {
      return res.status(404).json({ message: "Inscription non trouvée" });
    }

    res.json(inscription);
  } catch (error) {
    console.error("Erreur récupération inscription :", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// 🗑️ Supprimer une inscription
export const deleteInscription = async (req, res) => {
  try {
    const { id } = req.params;

    const inscription = await Inscription.findByPk(id);
    if (!inscription) {
      return res.status(404).json({ message: "Inscription non trouvée" });
    }

    await inscription.destroy();
    res.json({ message: "Inscription supprimée avec succès" });
  } catch (error) {
    console.error("Erreur suppression inscription :", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};


