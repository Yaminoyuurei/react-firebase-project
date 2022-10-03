import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/UserContext";

const Account = () => {
  const [currentUser, setCurrentUser] = useContext(UserContext);

  let defaultValues = {
    pseudo: currentUser.pseudo,
    email: currentUser.email,
    nom: currentUser.nom,
    prenom: currentUser.prenom,
    birthday: currentUser.birthday,
    adresse: currentUser.adresse,
    token: currentUser.token,
  };
  const {
    formState: { isSubmitting },
    register,
    handleSubmit,
    setError,
    clearErrors,
  } = useForm({
    defaultValues,
  });
  const submit = async (values) => {
    try {
      clearErrors();
      const response = await fetch(
        `http://192.168.1.39:3333/api/users/${currentUser._id}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "same-origin",
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem("currentUser", JSON.stringify(user));

        setCurrentUser(() => {
          const saved = localStorage.getItem("currentUser");
          const initialValue = JSON.parse(saved);
          return initialValue || "";
        });
      }
    } catch (error) {
      console.log(error);
      setError("generic", {
        type: "generic",
        message: "Il y a eu une erreur !!",
      });
    }
  };
  return (
    <div className="page">
      <h1>Profil</h1>
      <div className="account">
        <div className="accountForm">
          <form onSubmit={handleSubmit(submit)}>
            <label htmlFor="pseudo">Pseudo : </label>
            <br />
            <input {...register("pseudo")} type="text" name="pseudo" id="pseudo" />
            <br />
            <label htmlFor="email">Email : </label>
            <br />
            <input {...register("email")} type="text" name="email" id="email" />
            <br />
            <label htmlFor="nom">Nom : </label>
            <br />
            <input {...register("nom")} type="text" name="nom" id="nom" />
            <br />
            <label htmlFor="prenom">Prénom : </label>
            <br />
            <input {...register("prenom")} type="text" name="prenom" id="prenom" />
            <br />
            <label htmlFor="birthday">Date de naissance :</label>
            <br />
            <input
              {...register("birthday")}
              type="date"
              name="birthday"
              id="birthday"
            />
            <br />
            <label htmlFor="adresse">Adresse :</label>
            <br />
            <textarea
              {...register("adresse")}
              name="adresse"
              id="adresse"
              cols="30"
              rows="3"
            ></textarea>
            <button disabled={isSubmitting} className="btn">
              Enregistrer
            </button>
          </form>
        </div>
        <div className="panel">
          <p>Test</p>
        </div>
      </div>
    </div>
  );
};

export default Account;
