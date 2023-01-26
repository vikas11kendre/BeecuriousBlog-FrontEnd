import React, { useState, useEffect, useCallback, lazy } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import logo from "../../images/logo1.png";

import { logOut } from "../../actions/posts";

import decode from "jwt-decode";

const Avatar1 = lazy(() => import("./Avatar1"));

const PersonOutlineIcon = lazy(() =>
  import("@mui/icons-material/PersonOutline")
);
const EjectIcon = lazy(() => import("@mui/icons-material/Eject"));
const Box = lazy(() => import("@mui/material/Box"));
const Typography = lazy(() => import("@mui/material/Typography"));
const EditIcon = lazy(() => import("@mui/icons-material/Edit"));

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const logout = useCallback(() => {
    dispatch(logOut());
    navigate("/");
    setUser(null);
    setAnchorEl(null);
  }, [navigate, dispatch]);
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, user?.token, logout]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        mt: { lg: "15px", md: "30px", sm: "30px", xs: "30px" },
        mb: "10px",
        pt: "2px",
        border: "1px solid #F6F6F6 ",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      {/* logo component */}
      <Box component={Link} to="/">
        <Box
          sx={{ maxWidth: "100px", maxHeight: "60px", m: "4px" }}
          component="img"
          alt="blog"
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
                <Typography
                  onClick={() => {
                    // dispatch(setId(null));
                    navigate("/CreatePost");
                  }}
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    mr: "5px",
                  }}
                >
                  <EditIcon sx={{ ml: "6px", mr: "8px" }} />
                  Write
                </Typography>
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
            <Avatar1
              user={user}
              logout={logout}
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
            />
          )}
        </Box>
      </Box>
      {/* menu logic end */}
    </Box>
    // </AppBar>
  );
};

export default Navbar;
