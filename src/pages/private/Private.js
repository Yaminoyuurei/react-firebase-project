import { Container } from "@mui/material";
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Private = () => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/" />;
  }
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default Private;
