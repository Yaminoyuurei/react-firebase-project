import usersModel from "../Models/users.model";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res) => {
  try {
    const users = await usersModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await usersModel.findById(userId);
    
    res.status(200).json({
      _id: user.id,
      pseudo: user.pseudo,
      email: user.email,
      nom: user.nom,
      prenom: user.prenom,
      birthday: user.birthday,
      adresse: user.adresse,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { pseudo, email, nom, prenom, birthday, adresse, token } = req.body;
  const userId = req.params.id;

  try {
    // const existingUser = await usersModel.findOne({
    //   email: email,
    // });
    // if (existingUser) throw new Error("Cet email est déjà utilisé");
    const user = await usersModel.findByIdAndUpdate(userId, {
      $set: {
        pseudo: pseudo,
        email: email,
        nom: nom,
        prenom: prenom,
        birthday: birthday,
        adresse: adresse,
      },
    });
    if (!user) res.status(404).json({ message: "Utilisateur inconnue" });
    
    console.log(`${user.pseudo} à étais modifié`);
    res.status(200).json({
      _id: user._id,
      pseudo: user.pseudo,
      email: user.email,
      nom: user.nom,
      prenom: user.prenom,
      birthday: user.birthday,
      adresse: user.adresse,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await usersModel.findByIdAndDelete(userId);
    if (!user) res.status(404).json({ message: "Utilisateur inconnue" });
    res.status(200).json("Utilisateur Supprimé");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
