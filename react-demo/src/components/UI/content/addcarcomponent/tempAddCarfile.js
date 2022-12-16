import React, { useState, useEffect, useRef } from "react";
import "./addcarcomponent.css";
import { CarTypes } from "../../../vehiclesData";
import Loader from "react-loader-spinner";
import { baseUrl } from "../../../../variables/variables";

import { useSelector, useDispatch } from "react-redux";
import {
  addCar,
  editCar,
  addCarPage,
} from "../../../../Redux/UserRedux/UserActions";
import history from "../../../../history/history";
import { confirmAlert } from "react-confirm-alert";
let count = 0;
const width = { matches: window.matchMedia("(min-width: 768px)").matches };

const AddCarComponent = (props) => {
  console.log(props);

  const dispatch = useDispatch();

  const [Loading, setLoading] = useState(false);
  const [CarDetails, setCarDetails] = useState({
    carId:
      history.location.state === undefined ? "" : history.location.state.id,
    carname:
      history.location.state === undefined
        ? ""
        : history.location.state.details,
    house_no:
      history.location.state === undefined
        ? ""
        : history.location.state.houseName,
    street:
      history.location.state === undefined
        ? ""
        : history.location.state.streetName,
    pincode:
      history.location.state === undefined
        ? ""
        : history.location.state.pincode,
    landmark:
      history.location.state === undefined
        ? ""
        : history.location.state.society,
    cartypes: CarTypes,
    detectaddress: "",
    lat: "",
    long: "",
    cartype:
      history.location.state === undefined
        ? "SUV"
        : history.location.state.carType,
    carNo:
      history.location.state === undefined ? "" : history.location.state.carNo,
    carMake:
      history.location.state === undefined
        ? ""
        : history.location.state.carMake,
  });
  const [TempCarDetails] = useState({
    carId:
      history.location.state === undefined ? "" : history.location.state.id,
    carname:
      history.location.state === undefined
        ? ""
        : history.location.state.details,
    carMake:
      history.location.state === undefined
        ? ""
        : history.location.state.carMake,
    carNo:
      history.location.state === undefined ? "" : history.location.state.carNo,
    house_no:
      history.location.state === undefined
        ? ""
        : history.location.state.houseName,
    street:
      history.location.state === undefined
        ? ""
        : history.location.state.streetName,
    pincode:
      history.location.state === undefined
        ? ""
        : history.location.state.pincode,
    landmark:
      history.location.state === undefined
        ? ""
        : history.location.state.society,
    cartypes: CarTypes,
    detectaddress: "",
    lat: "",
    long: "",
    cartype:
      history.location.state === undefined
        ? "SUV"
        : history.location.state.carType,
  });
  // const defaultProps = {
  //   center: {
  //     lat: 59.95,
  //     lng: 30.33,
  //   },
  //   zoom: 11,
  // };
  const [error, setError] = useState(false);
  const user = useSelector((state) => state.user);

  const errorPosition = useRef(null);
  useEffect(() => {
    console.log(errorPosition);
    console.log(errorPosition.current?.offsetTop);
    if (errorPosition.current) {
      document.body.scrollTo({
        behavior: "smooth",
        top: width.matches
          ? window.innerHeight / 4
          : errorPosition.current.offsetTop - 250,
      });
    }
    // var tempPosition = document.getElementById("error");

    // if (tempPosition) {
    //   console.log(tempPosition);
    //  console.log(tempPosition.offsetTop);
    //  document.body.scrollBy(0,tempPosition.offsetTop);
    // }
    // else {

    // }
  }, [error]);
  //TODO:fix scrolling
  const [vehicleNo, setvehcileNo] = useState({
    number: "",
  });

  // useEffect(() => {
  //   if ("geolocation" in navigator) {
  //     console.log("Location Available", props);
  //   } else {
  //     console.log("Not Available");
  //   }
  // });
  // const getloc = () => {
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     setCarDetails({
  //       ...CarDetails,
  //       lat: position.coords.latitude,
  //       long: position.coords.longitude,
  //     });
  //   });
  // };
  let btnRef = useRef();

  console.log(` ${baseUrl}cars/${CarDetails.carId}`);
  const inputsHandler = (e) => {
    const { name, value } = e.target;

    // console.log("key is", e.keyCode);
    // console.log("name is", name);
    // console.log("value is", value);

    if (name === "carNo") {
      if (e.keyCode === 8) {
        console.log("IN DELTE KEY PRESSED");
        deleteCarNo();
      } else {
        console.log("in onChange handler");
        // addHyphen();
        //TODO:CHECK FOR INDEX =-1 BEFORE LAST CHARECTER

        var lastCharecter = vehicleNo.number.charAt(
          vehicleNo.number.length - 1
        );

        console.log(
          lastCharecter,
          isAlpha(lastCharecter),
          isAlpha(value),
          "values before"
        );

        if (isAlpha(lastCharecter) === isAlpha(value)) {
          console.log(
            lastCharecter,
            isAlpha(lastCharecter),
            isAlpha(value),
            "values here"
          );
          setvehcileNo({
            ...vehicleNo,
            number: vehicleNo.number.concat(value),
          });

          if (
            !isAlpha(vehicleNo.number.charAt(vehicleNo.number.length - 4)) &&
            !isAlpha(vehicleNo.number.charAt(vehicleNo.number.length - 3)) &&
            !isAlpha(vehicleNo.number.charAt(vehicleNo.number.length - 2)) &&
            !isAlpha(vehicleNo.number.charAt(vehicleNo.number.length - 1))
          ) {
            console.log(
              vehicleNo.number,
              "last digits"
              // isAlpha(vehicleNo.number.charAt(vehicleNo.number.length - 4)),
              // "last 4 digits",
              // vehicleNo.number(vehicleNo.number.length - 4)
            );
            alert("too many charecters", vehicleNo.number);
            setCarDetails({ ...CarDetails, carNo: vehicleNo.number });
            return;
          }
        } else {
          if (vehicleNo.number.length === 0) {
            setvehcileNo({
              ...vehicleNo,
              number: vehicleNo.number.concat(value),
            });
          } else {
            setvehcileNo({
              ...vehicleNo,
              number: vehicleNo.number.concat("-", value),
            });
          }

          // setvehcileNo({
          //   ...vehicleNo,
          //   number: vehicleNo.number.concat(value),
          // });
          console.log("in else", vehicleNo.number);
        }
        console.log(vehicleNo);
      }
    } else {
      //*other fields
      console.log("OTHER FILED");
      console.log("in other field", (count += 1));
      setCarDetails({ ...CarDetails, [name]: value });
    }
  };

  //*    KA-04-HK-8233
  //*ele KA-04-HK-
  var isAlpha = function (ch) {
    return /^[A-Z]$/i.test(ch);
  };
  // function addHyphen() {
  //   console.log("IN HYPHEN ADDING FUNCTION");
  // let ele = document.getElementById("carNo");
  // console.log("VALUE OF THE FIELD", ele.name);
  // ele = ele.value.split("-").join(""); // Remove dash (-) if mistakenly entered.
  // let finalVal = "";
  // if (ele.length < 7) {
  //   finalVal = ele.match(/.{0,2}/g).join("-");
  //   finalVal.concat(document.getElementById("carNo").value);
  //   setCarDetails({ ...CarDetails, carNo: finalVal });
  //   // ele.value = finalVal;
  // } else {
  //   console.log(ele);
  //   if (CarDetails.carNo.length < 13) {
  //     setCarDetails({
  //       ...CarDetails,
  //       carNo: CarDetails.carNo.concat(ele[ele.length - 1]),
  //     });
  //   } else {
  //     setCarDetails({
  //       ...CarDetails,
  //       carNo: CarDetails.carNo.slice(0, -1),
  //     });
  //   }
  // }
  //  let ele = document.getElementById("carNo");

  // }
  function deleteCarNo() {
    console.log("in delete handler");

    setCarDetails({ ...CarDetails, carNo: CarDetails.carNo.slice(0, 1) });
  }
  const validate = () => {
    let carTypeError = "";
    let carNameError = "";
    let houseNoError = "";
    let streetError = "";
    let pinCodeError = "";
    let carMakeError = "";
    let carNoError = "";

    if (CarDetails.cartype === "") {
      carTypeError = "Car Type is required";
    }
    if (CarDetails.carMake === "") {
      carMakeError = "Car make is required";
    }
    if (CarDetails.carname === "") {
      carNameError = "Car name is required";
    }

    if (CarDetails.carname.length < 2 && CarDetails.carname.length > 0) {
      carNameError = "Car name should be greater than 3 letters";
    }
    if (CarDetails.carNo === "") {
      carNoError = "Vehicle no is required";
    }
    if (CarDetails.house_no === "") {
      houseNoError = "House no is required";
    }
    if (CarDetails.house_no.length < 3 && CarDetails.house_no.length > 0) {
      houseNoError = "House No should be greater than 3 letters";
    }
    if (CarDetails.street === "") {
      streetError = "Street is required";
    }
    if (CarDetails.street.length < 3 && CarDetails.street.length > 0) {
      streetError = "Street should be greater than 3 charecters";
    }

    if (CarDetails.pincode.length !== 6) {
      pinCodeError = "Pincode incorrect";
    }
    if (CarDetails.pincode === "") {
      pinCodeError = "pincode  required";
    }

    if (carMakeError) {
      setError({ carMakeError });
      return false;
    }

    if (carNameError) {
      setError({ carNameError });
      return false;
    }
    if (carNoError) {
      setError({ carNoError });
      return false;
    }

    if (carTypeError) {
      setError({ carTypeError });
      return false;
    }

    if (houseNoError) {
      setError({ houseNoError });
      return false;
    }

    if (streetError) {
      setError({ streetError });
      return false;
    }

    if (pinCodeError) {
      setError({ pinCodeError });
      return false;
    }

    return true;
  };
  async function EditHandler() {
    const isValid = validate();
    if (isValid) {
      setError(false);
      setLoading(true);
      //fetch statement to post details to backend

      const response = await fetch(
        ` ${baseUrl.toString()}cars/${CarDetails.carId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            carType: CarDetails.cartype,
            details: CarDetails.carname,
            streetName: CarDetails.street,
            customer: user.customer.id,
            pincode: CarDetails.pincode,
            houseName: CarDetails.house_no,
            carMake: CarDetails.carMake,
            carNo: CarDetails.carNo,
          }),
        }
      );
      if (btnRef.current) {
        btnRef.current.setAttribute("disabled", "disabled");
      }
      const responseData = await response.json();
      console.log(responseData);

      if (responseData.car === undefined) {
        setLoading(false);
        console.log(responseData);
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div className="custom-ui">
                <h3 style={{ textAlign: "center", marginTop: "3%" }}>
                  Unable to add Car.Check Details
                </h3>
                <div className="promptbuttoncontainer">
                  <button className="promptbuttonYes" onClick={onClose}>
                    OK
                  </button>
                </div>
              </div>
            );
          },
        });
      } else {
        dispatch(addCarPage(true));
        dispatch(editCar(responseData.car));
        setLoading(false);
        history.goBack();
      }
      // history.push('/services');
    }
  }
  async function SubmitHandler() {
    const isValid = validate();
    if (isValid) {
      setError(false);
      setLoading(true);
      //fetch statement to post details to backend
      try {
        const response = await fetch(`${baseUrl.toString()}cars/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            carType: CarDetails.cartype,
            details: CarDetails.carname,
            street: CarDetails.street,
            customer: user.customer.id,
            pincode: CarDetails.pincode,
            houseName: CarDetails.house_no,
            carMake: CarDetails.carMake,
            carNo: CarDetails.carNo,
          }),
        });
        if (btnRef.current) {
          btnRef.current.setAttribute("disabled", "disabled");
        }
        const responseData = await response.json();
        console.log(responseData);
        dispatch(addCarPage(true));
        dispatch(addCar(responseData.car));
        setLoading(false);
        history.goBack();
        // history.push('/services');
      } catch (err) {
        setError(false);
        setLoading(false);
        console.log(err);
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div className="custom-ui">
                <h3 style={{ textAlign: "center", marginTop: "3%" }}>
                  UNABLE TO ADD. CHECK ALL DETAILS
                </h3>
                <div className="promptbuttoncontainer">
                  <button className="promptbuttonYes" onClick={onClose}>
                    OK
                  </button>
                </div>
              </div>
            );
          },
        });
      }
    }
  }

  return (
    <div className="addcarcontainer1">
      <h1> CAR DETAILS</h1>

      <div className="selectrow1">
        <label> Vehicle Type*</label>

        <select className="select" name="cartype" onChange={inputsHandler}>
          {CarDetails.cartypes.map((car) => (
            <option
              selected={car.model === CarDetails.cartype ? "selected" : ""}
              key={car.model}
            >
              {car.model}
            </option>
          ))}
        </select>
        {error.carTypeError ? (
          <p
            id="error"
            ref={errorPosition}
            style={{ fontSize: "0.8", color: "red" }}
          >
            {error.carTypeError}
          </p>
        ) : null}
      </div>

      <label>Car Make*</label>
      <div className="carmodel">
        <input
          style={{
            border: error.carMakeError ? "2px solid red" : "2px solid black",
          }}
          required={true}
          placeholder="eg:Maruti,Honda"
          type="text"
          value={CarDetails.carMake}
          name="carMake"
          onChange={inputsHandler}
        ></input>
        {error.carMakeError ? (
          <p
            id="error"
            ref={errorPosition}
            style={{ fontSize: "0.8", color: "red" }}
          >
            {error.carMakeError}
          </p>
        ) : null}
      </div>
      <label>Car Name*</label>
      <div className="carmodel">
        <input
          style={{
            border: error.carNameError ? "2px solid red" : "2px solid black",
          }}
          required={true}
          placeholder="eg: Swift"
          type="text"
          value={CarDetails.carname}
          name="carname"
          onChange={inputsHandler}
        ></input>
        {error.carNameError ? (
          <p id="error" ref={errorPosition}>
            {error.carNameError}
          </p>
        ) : null}
      </div>
      <label>Vehicle No*</label>
      <div className="vehicleNo">
        <p>{vehicleNo.number}</p>
        <input
          style={{
            border: error.carNoError ? "2px solid red" : "2px solid black",
          }}
          id="carNo"
          required={true}
          placeholder={
            vehicleNo.number === "" ? "eg:KA-01-AB-1111" : vehicleNo.number
          }
          type="text"
          value={CarDetails.carNo}
          name="carNo"
          pattern="^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$"
          onChange={inputsHandler}
          // onKeyDown={inputsHandler}
        ></input>
        {error.carNoError ? (
          <p
            id="error"
            ref={errorPosition}
            style={{ fontSize: "0.8", color: "red" }}
          >
            {" "}
            {error.carNoError}
          </p>
        ) : null}
      </div>

      <div>
        <label>House Name*</label>
        <input
          style={{
            border: error.houseNoError ? "2px solid red" : "2px solid black",
          }}
          placeholder="eg:sobha windsor"
          type="text"
          value={CarDetails.house_no}
          name="house_no"
          onChange={inputsHandler}
        ></input>
        {error.houseNoError ? (
          <p
            id="error"
            ref={errorPosition}
            style={{ fontSize: "0.8", color: "red" }}
          >
            {" "}
            {error.houseNoError}
          </p>
        ) : null}
        <label>Street*</label>
        <input
          style={{
            border: error.streetError ? "2px solid red" : "2px solid black",
          }}
          required
          placeholder="eg:Harlur road"
          type="text"
          value={CarDetails.street}
          name="street"
          onChange={inputsHandler}
        ></input>
        {error.streetError ? (
          <p id="error" style={{ fontSize: "0.8", color: "red" }}>
            {" "}
            {error.streetError}
          </p>
        ) : null}
        <label>Pincode*</label>
        <input
          style={{
            border: error.pinCodeError ? "2px solid red" : "2px solid black",
          }}
          placeholder="eg:560097"
          type="tel"
          required="yes"
          pattern="[0-9]{6}"
          value={CarDetails.pincode}
          name="pincode"
          onChange={inputsHandler}
        ></input>
        {error.pinCodeError ? (
          <p
            id="error"
            ref={errorPosition}
            style={{ fontSize: "0.8", color: "red" }}
          >
            {" "}
            {error.pinCodeError}
          </p>
        ) : null}
        <label>Landmark</label>
        <input
          style={{
            border: error.landmark ? "2px solid red" : "2px solid black",
          }}
          placeholder="eg: Near Pizza Hut"
          type="text"
          required="yes"
          value={null}
          name="landmark"
          onChange={inputsHandler}
        ></input>
        <button
          ref={btnRef}
          className="addcarbtn"
          disabled={
            CarDetails.carId === TempCarDetails.carId &&
            CarDetails.carname === TempCarDetails.carname &&
            CarDetails.house_no === TempCarDetails.house_no &&
            CarDetails.pincode === TempCarDetails.pincode &&
            CarDetails.landmark === TempCarDetails.landmark &&
            CarDetails.cartypes === TempCarDetails.cartypes &&
            CarDetails.cartype === TempCarDetails.cartype &&
            CarDetails.carNo === TempCarDetails.carNo &&
            CarDetails.carMake === TempCarDetails.carMake &&
            CarDetails.street === TempCarDetails.street
          }
          style={
            CarDetails.carId === TempCarDetails.carId &&
            CarDetails.carname === TempCarDetails.carname &&
            CarDetails.house_no === TempCarDetails.house_no &&
            CarDetails.pincode === TempCarDetails.pincode &&
            CarDetails.landmark === TempCarDetails.landmark &&
            CarDetails.cartypes === TempCarDetails.cartypes &&
            CarDetails.cartype === TempCarDetails.cartype &&
            CarDetails.carNo === TempCarDetails.carNo &&
            CarDetails.carMake === TempCarDetails.carMake &&
            CarDetails.street === TempCarDetails.street
              ? { opacity: "60%", background: "gray", cursor: "none" }
              : {}
          }
          onClick={TempCarDetails.carId ? EditHandler : SubmitHandler}
        >
          {TempCarDetails.carId ? "SAVE" : "SAVE"}
        </button>
        <div
          style={{
            marginTop: "3%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader
            type="Oval"
            color="#024126"
            height="70"
            width="70"
            visible={Loading}
            style={{
              width: "50%",
              height: "100",
              zIndex: 3000,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default AddCarComponent;
