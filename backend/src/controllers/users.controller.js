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
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { pseudo, email, password } = req.body;
  const userId = req.params.id;

  try {
    const existingUser = await usersModel.findOne({
      email: email,
    });
    if (existingUser) throw new Error("Cet email est déjà utilisé");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await usersModel.findByIdAndUpdate(userId, {
      $set: {
        pseudo: pseudo,
        email: email,
        password: hashedPassword,
      },
    });
    if (!user) res.status(404).json({message: "Utilisateur inconnue"})

    res.status(200).json("L'utilisateur à été modifié");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
    const userId = req.params.id
    try {
      const user = await usersModel.findByIdAndDelete(userId)
      if (!user) res.status(404).json({message: "Utilisateur inconnue"})
      res.status(200).json("Utilisateur Supprimé");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

