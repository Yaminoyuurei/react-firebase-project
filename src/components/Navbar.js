import React, { useContext, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  MenuItem,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Link, useNavigate } from "react-router-dom";
import { MenuContext } from "../contexts/MenuContext";
import logo from "../assets/logo.png";
import { AuthContext } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase-config";

const pages = [
  { name: "News", link: "/coucou" },
  { name: "Météo", link: "/la" },
  { name: "Contact", link: "/forme" },
];

const Navbar = () => {
  const { toggleModals } = useContext(MenuContext);
  const { currentUser } = useContext(AuthContext);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigate = (handle, link) => {
    handle();
    navigate(link);
  };
  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      alert("For some Reason we can't disconnect");
    }
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton onClick={() => navigate("/")}>
            <Avatar
              src={logo}
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  sx={{ p: 1 }}
                  key={page.name}
                  onClick={() => handleNavigate(handleCloseNavMenu, page.link)}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Link to="/">
            <Avatar
              src={logo}
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
          </Link>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => handleNavigate(handleCloseNavMenu, page.link)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {!currentUser ? (
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
            ) : (
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Profil" src={currentUser.photoURL}>
                  {currentUser.displayName[0]}
                </Avatar>
              </IconButton>
            )}

            {/* Account Menu */}
            {!currentUser ? (
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  onClick={() => {
                    toggleModals("login");
                    handleCloseUserMenu();
                  }}
                >
                  <LoginIcon />
                  <Typography textAlign="right" sx={{ p: 1 }}>
                    Se Connecter
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    toggleModals("register");
                    handleCloseUserMenu();
                  }}
                >
                  <VpnKeyIcon />
                  <Typography textAlign="center" sx={{ p: 1 }}>
                    S'enregistrer
                  </Typography>
                </MenuItem>
              </Menu>
            ) : (
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  onClick={() => {
                    navigate("/private/account");
                    handleCloseUserMenu();
                  }}
                >
                  <PersonIcon />
                  <Typography textAlign="center" sx={{ p: 1 }}>
                    Profil
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    logOut();
                    handleCloseUserMenu();
                  }}
                >
                  <LogoutIcon sx={{ color: "red" }} />
                  <Typography textAlign="center" sx={{ p: 1 }} color="red">
                    Déconnection
                  </Typography>
                </MenuItem>
              </Menu>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
