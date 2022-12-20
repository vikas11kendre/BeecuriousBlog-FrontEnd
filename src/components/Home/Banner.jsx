import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import homeimg from "../../images/homeimg.png";

import Swal from "sweetalert2";
const Banner = () => {
  return (
    <Grid container>
      <Grid sx={{ margin: "auto" }} item xs={12} sm={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: "30px",
            justifyContent: "center",
            maxWidth: "401px",
          }}
        >
          <Typography
            sx={{
              fontSize: "30px",
              fontWeight: "800",

              lineHeight: "47px",
              color: "#354156",
            }}
          >
            <span style={{ color: "#505BF7" }}>Home</span> for writers and
            readers
          </Typography>
          <Typography
            sx={{
              color: "#0A0B0D",
              fontSize: "16px",
              fontWeight: "500",
              mt: "20px",
            }}
          >
            The hassle-free blogging platform for thought-leaders, and curious
            peoples!
          </Typography>

          <Box
            onClick={() => Swal.fire("You need to login first")}
            sx={{
              maxWidth: "188px",
              maxHeight: "44px",
              background: "#FED75B",
              border: "1px solid #F6F6F6",
              borderRadius: "30px",
              p: "6px",
              display: "flex",
              justifyContent: "center",
              mt: "20px",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "700",
                color: "#0A0B0D",
              }}
            >
              Get Started-it's free
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid sx={{ margin: "auto", mt: "10px", mb: "10px" }} item xs={12} sm={6}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: { md: "center", xs: "flex-start" },
          }}
        >
          <Box
            component="img"
            src={homeimg}
            sx={{
              p: "30px",
              maxHeight: { md: "300px", xs: "220px", sm: "260px" },
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Banner;
