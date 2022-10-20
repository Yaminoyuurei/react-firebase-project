import { Avatar, Box, Button, Container, Divider, IconButton, Typography } from "@mui/material";
import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer>
      <Container sx={{ textAlign: "center" }}>
        <Divider variant="middle" sx={{m:2}}/>
          <Avatar src={logo} sx={{m:"auto"}}/>
        <Box>
          <Button>Conditions d'utilisations</Button>
          <Button>Politique de confidentialité</Button>
        </Box>
        <Box>
          <IconButton>
            <GitHubIcon/>
          </IconButton>
          <IconButton>
            <LinkedInIcon/>
          </IconButton>
        </Box>
        <Typography variant="subtitle2">© 2022 Yaminoyuurei</Typography>
      </Container>
    </footer>
  );
};

export default Footer;
