import {
  Box,
  Modal,
  TextField,
  Typography,
  Button,
  FormControl,
} from "@mui/material";

import React, { useContext, useState } from "react";
import { MenuContext } from "../../contexts/MenuContext";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const defaultValues = {
  pseudo: "",
  email: "",
  password: "",
  retypePassword: "",
};

const defaultError = {
  email: [false, ""],
  password: [false, ""],
};
const Signup = () => {
  const { modalState, toggleModals } = useContext(MenuContext);
  const { register, editAccount } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(defaultValues);
  const [error, setError] = useState(defaultError);

  const handleClose = () => toggleModals("");
  const handleError = (type = "none", error = false, text = "") => {
    switch (type) {
      case "email":
        setError({
          email: [error, text],
          password: [false, ""],
        });
        break;
      case "password":
        setError({
          email: [false, ""],
          password: [error, text],
        });
        break;
      default:
        setError(defaultError);
        break;
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if ((formValues.password.length || formValues.retypePassword.length) < 6) {
      handleError("password", true, "6 Charactère minimum");
      return;
    } else if (formValues.password !== formValues.retypePassword) {
      handleError("password", true, "Les mot de passe ne sont pas identique");
      return;
    }
    try {
      await register(formValues.email, formValues.password);
      await editAccount({
        displayName: formValues.pseudo,
      });
      setFormValues(defaultValues);
      handleError();
      handleClose();
      navigate("/private/account");
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          handleError("email", true, "Adresse email invalide");
          break;
        case "auth/email-already-in-use":
          handleError("email", true, "Cette adresse existe déja");
          break;
        default:
          break;
      }
    }
  };
  return (
    <Modal
      open={modalState.registerModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          id="modal-modal-title"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography variant="h5" component="h2">
            S'enregistrer
          </Typography>
          <IconButton color="error" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box id="modal-modal-decription">
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <TextField
                required
                name="pseudo"
                type="text"
                id="signPseudo"
                label="Pseudo"
                value={formValues.pseudo}
                onChange={handleInputChange}
                variant="filled"
              />
              <TextField
                required
                error={error.email[0]}
                name="email"
                type="email"
                id="signEmail"
                label="E-mail"
                value={formValues.email}
                onChange={handleInputChange}
                helperText={error.email[1]}
                variant="filled"
              />
              <TextField
                required
                error={error.password[0]}
                name="password"
                type="password"
                id="signPassword"
                value={formValues.password}
                onChange={handleInputChange}
                label="Mot de passe"
                helperText={error.password[1]}
                variant="filled"
              />
              <TextField
                required
                error={error.password[0]}
                name="retypePassword"
                type="password"
                id="signRetypePassword"
                value={formValues.retypePassword}
                onChange={handleInputChange}
                label="Retaper le mot de passe "
                helperText={error.password[1]}
                variant="filled"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
              >
                Valider
              </Button>
            </FormControl>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};

export default Signup;
