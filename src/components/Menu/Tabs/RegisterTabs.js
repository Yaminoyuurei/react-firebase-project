import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../contexts/AuthContext";

const RegisterTabs = ({ setShowMenu }) => {
  const { signUp, editAccount } = useContext(AuthContext);
  const [error, setError] = useState("");
  const {
    formState: { isSubmitting },
    register,
    handleSubmit,
  } = useForm();

  const handleClose = () => setShowMenu("");

  const onSubmit = async (data) => {
    if ((data.password.length || data.passwordRepeat.length) < 6) {
      setError("Le mot de passe doit contenir 6 charactère minimum");
      return;
    } else if (data.password !== data.passwordRepeat) {
      setError("Les mot de passe ne correspondent pas");
      return;
    }
    try {
      await signUp(data.email, data.password);
      await editAccount({
        displayName: data.pseudo,
      });
      setError("");
      handleClose();
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          setError("Adresse email invalide");
          break;
        case "auth/email-already-in-use":
          setError("Cette adresse email est déjà utilisé");
          break;
        default:
          break;
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="registerPseudo">Pseudo</label>
      <input
        type="text"
        {...register("pseudo", { required: true })}
        id="registerPseudo"
      />
      <label htmlFor="registerEmail">E-mail</label>
      <input
        type="email"
        {...register("email", { required: true })}
        id="registerEmail"
      />
      <label htmlFor="registerPassword">Mot de passe</label>
      <input
        type="password"
        {...register("password", { required: true })}
        id="registerPassword"
      />
      <label htmlFor="registerPasswordRepeat">Répéter le mot de passe</label>
      <input
        type="password"
        {...register("passwordRepeat", { required: true })}
        id="registerPasswordRepeat"
      />
      <p className="error">{error}</p>
      <button className="btn" disabled={isSubmitting} type="submit">
        S'enregistrer
      </button>
    </form>
  );
};

export default RegisterTabs;
