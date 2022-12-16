import React from "react";

import Servicepage from "../../UI/PageComponents/servicePage/ServicePageComp";
const services = (props) => {
  return (
    <div>
      <Servicepage click={props.click} />
    </div>
  );
};

export default services;
