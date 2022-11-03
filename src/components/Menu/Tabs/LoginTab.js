import React, { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../contexts/AuthContext";

const LoginTab = ({ setShowMenu }) => {
  const { logIn } = useContext(AuthContext);
  const [error, setError] = useState("");
  const {
    formState: { isSubmitting },
    register,
    handleSubmit,
  } = useForm();

  const handleClose = () => setShowMenu("");
  const onSubmit = async (data) => {
    try {
      await logIn(data.email, data.password);
      handleClose();
      setError("");
    } catch (error) {
      setError("email ou mot de passe invalide");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="loginEmail">E-mail</label>
      <input
        type="email"
        {...register("email", { required: true })}
        id="loginEmail"
      />

      <label htmlFor="loginPassword">Mot de passe</label>
      <input
        type="password"
        {...register("password", { required: true })}
        id="loginPassword"
      />
      <p className="error">{error}</p>
      <button className="btn" disabled={isSubmitting} type="submit">
        Se connecter
      </button>
    </form>
  );
};

export default LoginTab;
