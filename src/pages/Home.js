import { Container } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Home = () => {
  const {currentUser} = useContext(AuthContext)
  return (
  <Container sx={{textAlign:"center"}}>
    <h1>{currentUser?`Bienvenue ${currentUser.displayName}`:"Bienvenue sur le site"}</h1>
  </Container>
  );
};

export default Home;
