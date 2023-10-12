import React from "react";
import { Link } from "react-router-dom";

const AppShell = ({ children, heading }) => {
  return (
    <div>
      <header>
        <Link to="/drugs"><img style={{ width: '150px' }} src="/drugs/xogeneLogo.png" alt="Xogene Logo"/></Link>
        <h2>{heading}</h2>
        <div></div>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default AppShell;
