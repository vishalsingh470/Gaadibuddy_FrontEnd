import React from "react";

import "./DrawerToggleButton.css";

const drawerToggleButton = (props) => (
  <button className="toggle-button" onClick={props.click}>
    <div className="toggle-button__line" style={{ marginBottom: "0.3rem" }} />
    <div className="toggle-button__line"   />
    <div className="toggle-button__line" style={{ marginTop: "0.3rem" }} />
  </button>
);

export default drawerToggleButton;