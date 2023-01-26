import { Box, Typography } from "@mui/material";

import React from "react";
import { useNavigate } from "react-router-dom";

const Heading = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",

        justifyContent: "space-between",
        flexDirection: { sm: "row", xs: "column" },
        border: "2px solid #F6F6F6",
        boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "10px",
        p: "12px",
        pl: { lg: "60px" },
        pr: { lg: "60px" },
      }}
    >
      <div sx={{ display: "flex", flexDirection: "column", flexBasis: "50%" }}>
        <Typography
          sx={{
            fontFamily: "Eczar",
            fontWeight: "700",
            fontSize: { md: "40px", sm: "30px", xs: "30px" },
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            letterSpacing: "0.02em",
            color: "#354156",
            mt: "20px",
          }}
        >
          Publish your
          <br />
          <span
            style={{
              color: "#3843DA",
              fontFamily: "Eczar",
              fontWeight: "700",

              letterSpacing: "0.02em",
            }}
          >
            Passions&nbsp;
          </span>
          your way
        </Typography>
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: "14px",

            color: "#6B7782",
            maxWidth: "370px",
            mt: "6px",
          }}
        >
          Discover stories, thinking, and expertise from writers on any topic.{" "}
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            background: "#FFE9A2",

            borderRadius: "26px",
            width: "160px",
            height: "34px",
            alignItems: "center",
            marginTop: "24px",
            marginBottom: "24px",
          }}
        >
          <Typography
            onClick={() => navigate("/CreatePost")}
            sx={{
              color: "#343A40",
              fontWeight: "600",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Get Started -it's free
          </Typography>
        </div>
      </div>
      <Box
        sx={{
          maxHeight: "270px",
          display: "flex",
          flexBasis: "50%",
          justifyContent: {
            md: "center",
            lg: "center",
            sm: "flex-start",
            xs: "center",
          },
        }}
      >
        <img
          src="https://res.cloudinary.com/dx0ff6hy4/image/upload/v1674716072/dekbj34u1hk3qlkwcigo.png"
          alt="vkblog"
          loading="lazy"
          style={{
            maxWidth: "300px",
            maxHeight: "350px",
            objectFit: "contain",
          }}
        />
      </Box>
    </Box>
  );
};

export default Heading;
