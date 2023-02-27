import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import {
  Home,
  AccountCircle,
  ExitToApp,
  Description,
  MarkEmailRead,
} from "@mui/icons-material";
import Logo from "./assets/carleton-logo-he.jpg";

import { useNavigate, NavLink } from "react-router-dom";

import { useRecoilState } from "recoil";
import userState from "./State/userAtom.js";

const pages = ["Cause", "Data Privacy", "About Us"];

const ResponsiveAppBar = () => {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [user, setUser] = useRecoilState(userState);

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

  const goBack = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    setUser({ ...user, isAuthenticated: false, token: null });
    navigate("/login");
  };

  return (
    <AppBar position="static" color="transparent">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            className="carletonLogo"
          >
            <a href="https://victorious-water-031e5b310.1.azurestaticapps.net/">
              {" "}
              <img
                src={Logo}
                style={{ aspectRatio: "3059/466", width: "17rem" }}
              ></img>{" "}
            </a>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
            <img
              src={Logo}
              style={{ aspectRatio: "3059/466", width: "17rem" }}
            ></img>
          </Box>
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
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 4 }}
            justifyContent="flex-end"
          >
            {user.token && (
              <NavLink
                to="admin"
                exact="true"
                style={({ isActive }) =>
                  isActive
                    ? {
                        backgroundColor: "#ffe6e5",
                        textDecoration: "none",
                      }
                    : {
                        textDecoration: "none",
                      }
                }
              >
                <Button variant="outlined" startIcon={<MarkEmailRead />}>
                  Recepients
                </Button>
              </NavLink>
            )}

            {user.token && (
              <NavLink
                to="user-data"
                exact="true"
                style={({ isActive }) =>
                  isActive
                    ? {
                        backgroundColor: "#ffe6e5",
                        textDecoration: "none",
                      }
                    : {
                        textDecoration: "none",
                      }
                }
              >
                <Button variant="outlined" startIcon={<Description />}>
                  User Data
                </Button>
              </NavLink>
            )}

            <Button variant="outlined" onClick={goBack} startIcon={<Home />}>
              Home
            </Button>
            <Button
              variant="contained"
              onClick={logout}
              startIcon={user.token ? <ExitToApp /> : <AccountCircle />}
            >
              {user.token ? "Logout" : "Login"}
            </Button>
          </Box>

          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
