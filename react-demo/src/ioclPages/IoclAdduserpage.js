import React, { useState } from "react";
import "./iocl.css";
export default function IoclAdduserpage() {
  const [user, setuser] = useState({
    name: null,
    mobileNo: null,
    email: null,
  });

  const inputHandler = (e) => {
      const { name, value } = e.target;
      console.log(name,value)
    setuser({...user, [name]: value });
  };

  const onSubmithandler = async () => {
      console.log(user);
      //todo api to add useriocl
      
  };
  return (
    <div className="iocl-addCustomerContainer">
      <div className="iocl-addCustomerContainer-body">
        <h1>ADD USER</h1>
        <input
          onChange={(e) => inputHandler(e)}
          placeholder="name"
          value={user.name}
          name="name"
        ></input>
        <input
          onChange={(e) => inputHandler(e)}
          placeholder="mobileNo"
          value={user.mobileNo}
          name="mobileNo"
        ></input>
        <input
          onChange={(e) => inputHandler(e)}
          placeholder="email"
          value={user.email}
          name="email"
        ></input>
        <button onClick={() => onSubmithandler()}>SEND</button>
      </div>
    </div>
  );
}
