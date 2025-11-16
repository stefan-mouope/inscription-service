import { Student } from "../models/associations.js";

<<<<<<< HEAD
// ➕ Créer un élève
// controllers/eleveController.js

export const createEleve = async (req, res) => {
=======
// ➕ Créer un étudiant
export const createStudent = async (req, res) => {
>>>>>>> origin/yves
  try {
    const { matricule, last_name, first_name, birth_date, adress, sex, phone_parent, school_id } = req.body;

    if (!last_name || !first_name || !school_id) {
      return res.status(400).json({ message: "Champs requis manquants" });
    }

    const student = await Student.create({
      matricule,
      last_name,
      first_name,
      birth_date,
      adress,
      sex,
      phone_parent,
      school_id,
    });
<<<<<<< HEAD

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
=======
    
    res.status(201).json({ message: "Étudiant créé avec succès", student });
  } catch (error) {
    console.error("Erreur création étudiant :", error);
    res.status(500).json({ message: "Erreur serveur", error });
>>>>>>> origin/yves
  }
};

// 📄 Lister tous les étudiants
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (error) {
    console.error("Erreur récupération étudiants :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// 🔍 Obtenir un étudiant par ID
export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByPk(id);
    if (!student) return res.status(404).json({ message: "Étudiant non trouvé" });

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// 🗑️ Supprimer un étudiant
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByPk(id);
    if (!student) return res.status(404).json({ message: "Étudiant non trouvé" });

    await student.destroy();
    res.json({ message: "Étudiant supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
