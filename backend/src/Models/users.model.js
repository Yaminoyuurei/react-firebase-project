import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    nom: {
      type: String,
      required: false,
    },
    prenom: {
      type: String,
      required: false,
    },
    birthday: {
      type: String,
      required: false,
    },
    adresse: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("user", UserSchema, "users");
