import React from "react";
import {
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import homeimg from "../../images/homeimg.png";
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
              fontSize: "40px",
              fontWeight: "700",
              lineHeight: "47px",
              color: "#4F5760",
            }}
          >
            <Box component="span" sx={{ color: "#505BF7" }}>
              Home <span></span>
            </Box>
            For Writers And Reader
          </Typography>
          <Typography
            sx={{
              color: "#69768C",
              fontSize: "16px",
              fontWeight: "500",
              mt: "20px",
            }}
          >
            The hassle free blogging platform for engineers thought-leaders, and
            for great minds !
          </Typography>

          <Box
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
                color: "#354156",
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
              maxHeight: { md: "400px", xs: "220px", sm: "260px" },
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Banner;
