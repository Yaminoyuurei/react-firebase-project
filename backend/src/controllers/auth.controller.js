import usersModel from "../Models/users.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, "LaCle", { expiresIn: maxAge });
};

export const register = async (req, res) => {
  const { pseudo, email, password } = req.body;
  try {
    const existingUser = await usersModel.findOne({
      pseudo: pseudo,
      email: email,
    });
    if (existingUser)
      throw new Error("Cet email ou ce pseudo est déjà utilisé");
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await usersModel.create({
      pseudo: pseudo,
      email: email,
      password: hashedPassword,
    });

    res.status(200).json({
      user: {
        pseudo: user.pseudo,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const login = async (req, res) => {
  const { pseudo, password } = req.body;
  try {
    const user = await usersModel.findOne({
      pseudo: pseudo,
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      console.log("Login for "+pseudo);
      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge });
      res.status(200).json({
        _id: user._id,
        pseudo: user.pseudo,
        email: user.email,
        token: token,
      });
    } else {
      return res.status(400).json({ user: false });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const logout = async (req, res) => {
    try{
      res.cookie("jwt", "", { maxAge: 1 });
      res.status(200).json({ token: "Token expired" });
      console.log("user disconnected");
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }

};
