import React from "react";
import logo from "../../images/logo1.png";
const Footer = () => {
  return (
    <footer>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          marginTop: "40px",
          marginBottom: "60px",
          border: "1px solid #F6F6F6",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: "5px",
          padding: "10px",
          color: "#354156",
          fontFamily: "Eczar",
          fontWeight: "700",
          letterSpacing: "0.02em",
        }}
      >
        <img
          src={logo}
          style={{ maxWidth: "60px", maxHeight: "94px", marginRight: "30px" }}
          alt="logo"
        />
        Designed By Vikas Kendre
      </div>
    </footer>
  );
};

export default Footer;
