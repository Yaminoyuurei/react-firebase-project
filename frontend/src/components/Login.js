import React, { useContext, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
// import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

const Login = (props) => {
  const [, setAuth] = useContext(AuthContext);
  const [, setCurrentUser] = useContext(UserContext);
  const { showLogin, setShowLogin } = props;
  const [errors,setErrors]= useState("")
  
  // let navigate = useNavigate();

  let defaultValues = {
    pseudo: "",
    password: "",
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
      setErrors("")
      const response = await fetch("http://localhost:3333/api/users/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const user = await response.json();
        Cookies.set("jwt", user.token);
        setAuth(() => {
          const savedCookie = Cookies.get("jwt");
          return savedCookie || "";
        });
        localStorage.setItem("currentUser", JSON.stringify(user));

        setCurrentUser(() => {
          const saved = localStorage.getItem("currentUser");
          const initialValue = JSON.parse(saved);
          return initialValue || "";
        });

        setShowLogin("hide")
      }
    } catch (error) {
      console.log(error);
      setErrors("Le pseudo ou le mot de passe est incorrect")
      setError("generic", {
        type: "generic",
        message: "Il y a eu une erreur !!",
      });
    }
  };
    return (
      <OutsideClickHandler
        onOutsideClick={() => {
          setShowLogin("hide");
        }}
      >
        <div className={showLogin}>
          <form onSubmit={handleSubmit(submit)}>
            <label htmlFor="connect-pseudo">Pseudo : </label>
            <br />
            <input
              {...register("pseudo")}
              type="text"
              name="pseudo"
              id="connect-pseudo"
            />
            <br />

            <label htmlFor="connect-password">Mot de passe :</label>
            <br />
            <input
              {...register("password")}
              type="password"
              name="password"
              id="connect-password"
            />
            <br />
            <p className="error">{errors}</p>
            <button disabled={isSubmitting} className="btn">
              Se connecter
            </button>
          </form>
        </div>
      </OutsideClickHandler>
    );
  }


export default Login;