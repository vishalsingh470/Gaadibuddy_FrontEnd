import React, { useState } from "react";

export default function IoclAddcarpage() {
  const [carTypes] = useState(["SUV", "SEDAN", "HATCHBACK", "PREMIUM"]);
  const [car, setCar] = useState({
    carType: "",
    carMake: "",
    carName: "",
    carNumber: "",
    houseno: "111",
    street: "IndianOil",
    pincode: "560095",
  });
  const inputHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setCar({ ...car, [name]: value });
  };
  const onSubmithandler = async () => {
    console.log(car);
    //todo api to add useriocl
  };
  return (
    <div className="iocl-addCustomerContainer">
      <div className="iocl-addCustomerContainer-body">
        <h1>ADD car</h1>
        <select>
          {carTypes.map((oneCarType) => (
            <option>{oneCarType}</option>
          ))}
        </select>
        <input
          onChange={(e) => inputHandler(e)}
          placeholder="carName"
          value={car.carName}
          name="name"
        ></input>
        <input
          onChange={(e) => inputHandler(e)}
          placeholder="carNo"
          value={car.carNo}
          name="mobileNo"
        ></input>
        <input
          onChange={(e) => inputHandler(e)}
          placeholder="carMake"
          value={car.carMake}
          name="carMake"
        ></input>
        <button onClick={() => onSubmithandler()}>SEND</button>
      </div>
    </div>
  );
}
