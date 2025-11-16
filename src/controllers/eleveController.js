import { Eleve } from "../models/associations.js";

// ➕ Créer un élève
// controllers/eleveController.js

export const createEleve = async (req, res) => {
  try {
    const { nom, prenom, adresse, num_parent, id_etablissement } = req.body;

    if (!nom || !prenom || !id_etablissement) {
      return res.status(400).json({ message: "Champs requis manquants" });
    }

    const eleve = await Eleve.create({
      nom,
      prenom,
      adresse,
      num_parent,
      id_etablissement,
    });

    // LOG SÉCURISÉ
    console.log(`Élève créé par ${req.user.username} (${req.user.role}) | ID: ${eleve.id_eleve}`);

    res.status(201).json({
      message: "Élève créé avec succès",
      eleve: {
        id_eleve: eleve.id_eleve,
        nom: eleve.nom,
        prenom: eleve.prenom,
        adresse: eleve.adresse,
        num_parent: eleve.num_parent,
        id_etablissement: eleve.id_etablissement
      },
      créé_par: {
        username: req.user.username,
        role: req.user.role
      }
    });
  } catch (error) {
    console.error("Erreur création élève :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// 📄 Lister tous les élèves
export const getAllEleves = async (req, res) => {
  try {
    const eleves = await Eleve.findAll();
    res.json(eleves);
  } catch (error) {
    console.error("Erreur récupération élèves :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// 🔍 Obtenir un élève par ID
export const getEleveById = async (req, res) => {
  try {
    const { id } = req.params;
    const eleve = await Eleve.findByPk(id);
    if (!eleve) return res.status(404).json({ message: "Élève non trouvé" });

    res.json(eleve);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// 🗑️ Supprimer un élève
export const deleteEleve = async (req, res) => {
  try {
    const { id } = req.params;
    const eleve = await Eleve.findByPk(id);
    if (!eleve) return res.status(404).json({ message: "Élève non trouvé" });

    await eleve.destroy();
    res.json({ message: "Élève supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
