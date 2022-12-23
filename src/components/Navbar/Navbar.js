import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo1.png";
import { Popover, Box, Avatar, Button, Typography } from "@mui/material";
import EjectIcon from "@mui/icons-material/Eject";
import Form from "../Form/Form";
import { useDispatch } from "react-redux";
import { logOut } from "../../actions/posts";
import { useLocation } from "react-router-dom";

import decode from "jwt-decode";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, user?.token]);

  const logout = () => {
    dispatch(logOut());
    navigate("/");
    setUser(null);
    setAnchorEl(null);
  };

  return (
    // <AppBar position="static" color="inherit">
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        mt: "40px",
        mb: "10px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      {/* logo component */}
      <Box component={Link} to="/">
        <Box
          sx={{ maxWidth: "100px", Height: "60px" }}
          component="img"
          alt="logo"
          loading="lazy"
          src={logo}
        />
      </Box>
      {/* menu logic start */}
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              maxWidth: "97px",
              height: "40px",
              background: "#505BF7",
              borderRadius: "20px 0px 0px 20px",
              display: "flex",
              alignItems: "center",
              color: "white",
            }}
          >
            {user ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Form />
              </Box>
            ) : (
              <Typography
                sx={{
                  textDecoration: "none",
                  fontSize: "16px",
                  fontWeight: "600",
                  ml: "5px",
                  mr: "5px",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                }}
                component={Link}
                to="/auth"
                variant="div"
              >
                <PersonOutlineIcon sx={{ mr: "2px" }} />
                Sign In
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              width: "3px",
              height: "40px",
              background: "#E4EFFF",
            }}
          ></Box>
          <Box
            onClick={() => {
              if (!user) {
                navigate("/auth");
              }
            }}
            sx={{
              width: "35px",
              height: "40px",
              background: "#505BF7",
              borderRadius: "0px 20px 20px 0px",
              display: "flex",
              alignItems: "center",
              color: "white",
              cursor: "pointer",
              mr: "8px",
            }}
          >
            <EjectIcon sx={{ transform: "rotate(180deg)" }} />
          </Box>
          {user && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                ml: "10px",
                mr: "5px",
              }}
            >
              <Avatar
                onClick={handleClick}
                alt={user.result.name}
                src={user?.result?.picture}
                sx={{ backgroundColor: "#354156", cursor: "pointer" }}
              >
                {!user?.result?.picture && (
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    {user.result.name.charAt(0).toUpperCase()}
                  </Typography>
                )}
              </Avatar>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Button onClick={logout} variant="contained">
                  LogOut
                </Button>
              </Popover>
            </Box>
          )}
        </Box>
      </Box>
      {/* menu logic end */}
    </Box>
    // </AppBar>
  );
};

export default Navbar;
