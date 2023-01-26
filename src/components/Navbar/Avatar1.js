import { Avatar, Button, Popover, Typography, Box } from "@mui/material";

import React from "react";

const Avatar1 = ({ user, logout, anchorEl, setAnchorEl }) => {
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
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
  );
};

export default Avatar1;
