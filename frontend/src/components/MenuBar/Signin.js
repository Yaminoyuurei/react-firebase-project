import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { MenuContext } from "../../context/MenuContext";

const Signin = (props) => {
  const {setTabs}=props
  const [, setAuth] = useContext(AuthContext);
  const [, setCurrentUser] = useContext(UserContext);
  const [, setShowMenu] = useContext(MenuContext)
  const [errors,setErrors]= useState("")
  
  // let navigate = useNavigate();

  let defaultValues = {
    pseudo: "",
    email:"",
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
      const response = await fetch("http://localhost:3333/api/users/register", {
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
        setShowMenu("hide")
        setTabs(3)
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
        <div className="Form">
          <form onSubmit={handleSubmit(submit)}>
            <label htmlFor="register-pseudo">Pseudo : </label>
            <br />
            <input
              {...register("pseudo")}
              type="text"
              name="pseudo"
              id="register-pseudo"
            />
            <br />
            <label htmlFor="register-password">E-mail :</label>
            <br />
            <input
              {...register("email")}
              type="email"
              name="email"
              id="register-email"
            />
            <br />
            <label htmlFor="register-password">Mot de passe :</label>
            <br />
            <input
              {...register("password")}
              type="password"
              name="password"
              id="register-password"
            />
            <br />
            <p className="error">{errors}</p>
            <button disabled={isSubmitting} className="btn">
              S'enregistrer
            </button>
          </form>
        </div>
    );
  }


export default Signin;
