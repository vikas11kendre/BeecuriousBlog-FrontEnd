import { TextField, Grid, IconButton } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React from "react";

const Input = ({
  name,
  half,
  handleChange,
  autoFocus,
  label,
  type,
  handleShowPassword,
}) => {
  return (
    <Grid sx={{ p: "10px" }} item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        fullWidth
        variant="outlined"
        label={label}
        onChange={handleChange}
        autoFocus={autoFocus}
        type={type}
        required
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? (
                        <Visibility sx={{ color: "black" }} />
                      ) : (
                        <VisibilityOff sx={{ color: "black" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};

export default Input;
