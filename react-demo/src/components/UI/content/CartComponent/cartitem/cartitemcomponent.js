import {
  addDays,
  differenceInDays,
  differenceInHours,
  getDay,
  getHours,
  getMinutes,
  setHours,
  setMinutes,
  addHours,
  isAfter,
  isEqual,
} from "date-fns";
import history from "../../../../../history/history";
import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import DatePicker from "react-datepicker";
import Loader from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import emptycart from "../../../../../Image/emptycart.png";
import Washing from "../../../../../Image/WashingCart.PNG";
import Sanitization from "../../../../../Image/SanitizationCart.PNG";
import Detailing from "../../../../../Image/DetailingCart.PNG";
import jumpStart from "../../../../../Image/jumpStartCart.png";
import bikeCart from "../../../../../Image/cartBike.png";
import waxingCart from "../../../../../Image/waxing.png";
import {
  priceDecider,
  DurationDecider,
  returnDiscount,
} from "../../../../price";
import {
  refreshCart,
  RemoveFromCart,
} from "../../../../../Redux/UserRedux/UserActions";
import { baseUrl } from "../../../../../variables/variables";
import "../cartitem/cartitem.css";
import { TotalPrice } from "./TotalpriceComponent";
import { compareAsc } from "date-fns";

const width = { matches: window.matchMedia("(min-width: 768px)").matches };

function CartItem(props) {
  const [Loading, setLoading] = useState({
    uId: "",
    status:false
  });
  const dispatch = useDispatch();
  const [oneTimeDateChanged, setOneTimeDateChanged] = useState({service:"", status:false});
  const cart = useSelector((state) => state.user.customer.cart);
  const user = useSelector((state) => state.user.customer);
  const [cars] = useState(user.cars);

  const [tempCart] = useState({
    newDate: "",
    newTime: "",
    newDuration: "",
    duration: ["MONTHLY", "QUARTERLY", "HALF YEARLY", "YEARLY"],
  });
  const tempworkaroundDuration = (carId, service, mypackage, duration) => {
    const subTotalPrice = priceDecider(
      carTypeHanler(carId),
      service,
      mypackage,
      duration
    );
    const discountPrice = DurationDecider(subTotalPrice, duration);

    const discountPercentage = returnDiscount(subTotalPrice, discountPrice);
    return { discountPrice, discountPercentage };
  };
  const [packages] = useState([
    { id: 1, name: "SILVER", value: "SILVER" },
    { id: 2, name: "GOLD", value: "GOLD" },
    {
      id: 3,
      name: "SILVER + COMPLETE CARE",
      value: "SILVER_WITH_COMPLETE_CARE",
    },
    {
      id: 4,
      name: "GOLD + COMPLETE CARE",
      value: "GOLD_WITH_COMPLETE_CARE",
    },
     
  ]);
  const [packagesPlatinum] = useState([
    { id: 1, name: "SILVER", value: "SILVER" },
    { id: 2, name: "GOLD", value: "GOLD" },
    {
      id: 3,
      name: "PLATINUM",
      value: "PLATINUM",
    },
    {
      id: 4,
      name: "SILVER + COMPLETE CARE",
      value: "SILVER_WITH_COMPLETE_CARE",
    },
     
  ]);
  const oneTimePackages = [
    {
      id: 1,
      name: "ONE TIME",
      value: "ONE TIME",
    },
    {
      id: 2,
      name: "ONETIME + COMPLETE CARE",
      value: "ONETIME_WITH_COMPLETE_CARE",
    },
  ];
  const [bikePackages] = useState([
    { id: 1, name: "SILVER", value: "SILVER" },
    { id: 2, name: "GOLD", value: "GOLD" },
  ]);
  const [Surfaces] = useState(["INTERIOR", "EXTERIOR", "FULL"]);
  console.log(tempCart);
  const [dateError, setDateError] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [toggle, setToggle] = useState(0);
  const checkDatesValidity = () => {
    //todo put a condition for 'JUMPSTART'
    for (let i = 0; i < cart?.length; i++) {
      if (cart[i].service === "JUMPSTART") {
        //todo   allow 0
        if (
          differenceInHours(new Date(),new Date(cart[i].serviceStartDate)) > 1
        ) {
          setDateError(true);
          setToggle(toggle + 1);
        } else {
          setToggle(false);
        }
      } else {
        //todo newDate() >= service startdate 

        if (
          isAfter(
            setHours(new Date(), 0),
            setHours(new Date(cart[i].serviceStartDate), 0)
          ) ||
          isEqual(
            setHours(new Date(), 0),
            setHours(new Date(cart[i].serviceStartDate), 0)
          )
        ) {
          console.log(
            "here",
            "diffrence",
            differenceInDays(
              setHours(new Date(cart[i].serviceStartDate), 0),
              setHours(new Date(), 0)
            ),
            "serviceStartDate set to 0",
            setHours(new Date(cart[i].serviceStartDate), 0),
            "Date set to 0",
            setHours(new Date(), 0)
          );
          setDateError(true);
          setToggle(true);
        } else {
          
          setToggle(false);
        }
      }
    }
  };

  useEffect(() => {
    document.body.scrollTop = 0;
    props.click();
    fetch(`${baseUrl}users/${user.id}`)
      .then((res) => res.json())
      .then((resp) => dispatch(refreshCart(resp.customer.cart)));
    if (cart !== undefined) {
      checkDatesValidity();
    }
  }, []);

  var totalPriceArray = [];
  if (cart !== undefined) {
    cart.map((oneItem) =>
      totalPriceArray.push(Math.round(oneItem.price * 100) / 100)
    );
  }

  var sumTotal = totalPriceArray.reduce((a, b) => a + b, 0);

  const getCarByCarId = async (carId) => {
    let Car = "";
    await fetch(`${baseUrl}cars/${carId}`)
      .then((res) => res.json())
      .then((resp) => {
        Car = resp.car;
      })
      .catch((err) => console.log(err));
    return Car;
  };
  const oneTimeUpdateCart = async (item, date) => {
    await setLoading({
      status: true,
      uId: `${item.carId?.id}_${item.service}`,
    });
    const response = await fetch(
      ` ${baseUrl.toString()}users/updateCartItem/${user.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageDuration: item.packageDuration,
          service: item.service,
          package: item.package,
          serviceStartDate: Date.parse(new Date(date)),
          carId: item.carId?.id,
          price: item.price,
        }),
      }
    );
    const responseData = await response.json();
    if (responseData.customer === undefined) {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="custom-ui">
              <p
                style={{
                  textAlign: "center",
                  marginTop: "3%",
                }}
              >
                UNABLE TO ADD ITEM
              </p>
              <div className="promptbuttoncontainer">
                <button
                  className="promptbuttonYes"
                  onClick={() => {
                    onClose();
                    // dispatch(RemoveFromCart(item));
                  }}
                >
                  <small>Yes</small>
                </button>
              </div>
            </div>
          );
        },
      });
     await setLoading({
       status: false,
       uId: `${item.carId?.id}_${item.service}`,
     });
    } else {
      dispatch(refreshCart(responseData.customer.cart));
    }

    await setLoading({
      status: false,
      uId: `${item.carId?.id}_${item.service}`,
    });
  };
  const syncUpdateCart = async (item, date) => {
    const tempDate = addHours(new Date(date), 0);
    await setLoading({
      status: true,
      uId: `${item.carId?.id}_${item.service}`,
    });
    await console.log("date is" + date);
    const response = await fetch(
      ` ${baseUrl.toString()}users/updateCartItem/${user.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageDuration: item.packageDuration,
          service: item.service,
          package: item.package,
          serviceStartDate: addHours(new Date(tempDate), 10),
          carId: item.carId?.id,
          price: item.price,
        }),
      }
    );
    const responseData = await response.json();
    if (responseData.customer === undefined) {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="custom-ui">
              <p
                style={{
                  textAlign: "center",
                  marginTop: "3%",
                }}
              >
                UNABLE TO ADD ITEM
              </p>
              <div className="promptbuttoncontainer">
                <button
                  className="promptbuttonYes"
                  onClick={() => {
                    onClose();
                    // dispatch(RemoveFromCart(item));
                  }}
                >
                  <small>Yes</small>
                </button>
              </div>
            </div>
          );
        },
      });
      await setLoading({
        status: false,
        uId: `${item.carId?.id}_${item.service}`,
      });
    } else {
      dispatch(refreshCart(responseData.customer.cart));
    }

    await setLoading({
      status: false,
      uId: `${item.carId?.id}_${item.service}`,
    });
  };
  const syncUpdatePackage = async (item, mypackage) => {
    console.log(item,"items", "packages",mypackage)
    await setLoading({
      status: true,
      uId: `${item.carId?.id}_${item.service}`,
    });
    const carDetails = await getCarByCarId(item.carId?.id);
    console.log(carDetails);
    const response = await fetch(
      ` ${baseUrl.toString()}users/updateCartItem/${user.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageDuration: item.packageDuration,
          service: item.service,
          package: mypackage,
          serviceStartDate: new Date(Date.parse(item.serviceStartDate)),
          carId: item.carId?.id,
          price: tempworkaroundDuration(
            item.carId?.id,
            item.service,
            mypackage,
            item.packageDuration
          ).discountPrice,
        }),
      }
    );
    const responseData = await response.json();
    if (responseData.customer === undefined) {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="custom-ui">
              <p
                style={{
                  textAlign: "center",
                  marginTop: "3%",
                }}
              >
                Unable to Change Package
              </p>
              <div className="promptbuttoncontainer">
                <button
                  className="promptbuttonYes"
                  onClick={() => {
                    onClose();
                    // dispatch(RemoveFromCart(item));
                  }}
                >
                  <small>OK</small>
                </button>
              </div>
            </div>
          );
        },
      });
      await setLoading({
        status: false,
        uId: `${item.carId?.id}_${item.service}`,
      });
    } else {
      console.log(responseData.customer.cart);
      dispatch(refreshCart(responseData.customer.cart));
    }

    await setLoading({
      status: false,
      uId: `${item.carId?.id}_${item.service}`,
    });
  };
  const carTypeHanler = (carToCheck) => {
    console.log(carToCheck);
    var car = cars.filter((onecar) => onecar.id === carToCheck);
    return car[0]?.carType;
  };
  const syncUpdateCartDuration = async (item, duration) => {
    await setLoading({
      status: true,
      uId: `${item.carId?.id}_${item.service}`,
    });

    
    console.log(
      item.carId?.id,
      item.service,
      item.package,
      duration,
      "here"
    );
    const response = await fetch(
      ` ${baseUrl.toString()}users/updateCartItem/${user.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageDuration: duration,
          service: item.service,
          package: item.package,
          serviceStartDate: new Date(Date.parse(item.serviceStartDate)),
          carId: item.carId?.id,
          price: tempworkaroundDuration(
            item.carId?.id,
            item.service,
            item.package,
            duration
          ).discountPrice,
        }),
      }
    );
    const responseData = await response.json();
    if (responseData.customer === undefined) {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="custom-ui">
              <p
                style={{
                  textAlign: "center",
                  marginTop: "3%",
                }}
              >
                Unable to Change Duration
              </p>
              <div className="promptbuttoncontainer">
                <button
                  className="promptbuttonYes"
                  onClick={() => {
                    onClose();
                    // dispatch(RemoveFromCart(item));
                  }}
                >
                  <small>OK</small>
                </button>
              </div>
            </div>
          );
        },
      });
      await setLoading({
        status: false,
        uId: `${item.carId?.id}_${item.service}`,
      });
    } else {
      console.log(responseData.customer.cart);
      dispatch(refreshCart(responseData.customer.cart));
    }

     await setLoading({
       status: false,
       uId: `${item.carId?.id}_${item.service}`,
     });
  };
  const deleteSyncCart = async (cartItem) => {
    const response = await fetch(
      ` ${baseUrl.toString()}users/deleteCartItem/${user.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageDuration: cartItem.packageDuration,
          service: cartItem.service,
          package: cartItem.package,
          serviceStartDate: cartItem.serviceStartDate,
          carId: cartItem.carId?.id,
          price: cartItem.price,
        }),
      }
    );
    const responseData = await response.json();
    await console.log(responseData);
    if (responseData.message === undefined) {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="custom-ui">
              <p
                style={{
                  textAlign: "center",
                  marginTop: "3%",
                }}
              >
                Unable to Delete
              </p>
              <div className="promptbuttoncontainer">
                <button
                  className="promptbuttonYes"
                  onClick={() => {
                    onClose();
                    // dispatch(RemoveFromCart(item));
                  }}
                >
                  <small>OK</small>
                </button>
              </div>
            </div>
          );
        },
      });
    } else {
      console.log(cartItem);
      dispatch(RemoveFromCart(cartItem));
      window.location.reload(false);
    }
  };

  return (
    <div className="cartItemBody">
      {cart === undefined || cart.length === 0 ? (
        <div className="emptyCart">
          <img src={emptycart} alt="emptycart" />
          <h1>Cart Is Empty</h1>
        </div>
      ) : (
        <div className="fullCart">
          <h1 className="headingCart">MY CART</h1>

          <div className="fullCartBody">
            <div className="leftCartContainer">
              {cart.map((item, index) => (
                <div className="leftCartComponent" key={item.id}>
                  <div className="cart1">
                    {item.carId?.carType === "TWO WHEELER" ? (
                      <img src={bikeCart} alt="cart" />
                    ) : null}
                    {item.service === "WASHING" ? (
                      item.carId?.carType === "TWO WHEELER" ? (
                        <img src={bikeCart} alt="cart" />
                      ) : (
                        <img src={Washing} alt="cart" />
                      )
                    ) : null}
                    {item.service === "SANITIZATION" ? (
                      <img src={Sanitization} alt="cart" />
                    ) : null}
                    {item.service === "DETAILING" ? (
                      <img src={Detailing} alt="cart" />
                    ) : null}
                    {item.service === "JUMPSTART" ? (
                      <img src={jumpStart} alt="cart" />
                    ) : null}
                    {item.service === "WAXING" ? (
                      <img
                        style={{
                          width: width.matches ? "60%" : null,
                          marginLeft: width.matches ? "20%" : null,
                        }}
                        src={waxingCart}
                        alt="cart"
                      />
                    ) : null}
                    <div className="cartServiceName">
                      <p className="cartcar">{item.service}</p>
                    </div>
                    {width.matches ? (
                      <div className="lineContainer">
                        {index !== cart.length - 1 ? <hr></hr> : null}
                      </div>
                    ) : null}
                  </div>

                  <div className="cart2">
                    <div className="cartCarName">
                      <p>
                        {user.cars.map((car) =>
                          car.id === item.carId?.id ? car.details : null
                        )}
                      </p>
                      <p style={{ marginLeft: "4%" }}>
                        {user.cars.map((car) =>
                          car.id === item.carId?.id ? car.carNo : null
                        )}
                      </p>
                    </div>

                    <div className="dateContainerCart">
                      <label id="cartLabels">Date</label>
                      <DatePicker
                        closeOnScroll={width.matches ? true : false}
                        minDate={addDays(new Date(), 1)}
                        filterDate={(date) => getDay(date) !== 1}
                        selected={Date.parse(
                          item.serviceStartDate
                            ? item.serviceStartDate
                            : item.date
                        )}
                        onChange={(cardate) => {
                          var hours = getHours(cardate);

                          var mins = getMinutes(cardate);

                          var hoursDate = setHours(cardate, 0);

                          var MinutesDate = setMinutes(hoursDate, mins);

                          if (
                            item.package === "ONE TIME" ||
                            item.service === "SANITIZATION" ||
                            item.service === "JUMPSTART" ||
                            item.service === "DETAILING" ||
                            item.service === "WAXING"
                          ) {
                            setOneTimeDateChanged({
                              service: item.service,
                              status: true,
                            });
                            oneTimeUpdateCart(
                              item,
                              setHours(new Date(MinutesDate), 10)
                            );
                          } else {
                            syncUpdateCart(item, MinutesDate);
                          }
                        }}
                      />
                    </div>
                    {item.package === "SILVER" ||
                    item.package === "GOLD" ||
                    item.package === "PLATINUM" ||
                    item.package === "ONE TIME" ||
                    item.package === "ONETIME_WITH_COMPLETE_CARE" ||
                    item.package === "SILVER_WITH_COMPLETE_CARE" ||
                    item.package === "GOLD_WITH_COMPLETE_CARE" ||
                    item.service === "WAXING" ? null : ( // </div> //   </p> //       item.package.toLowerCase().slice(1)} //     {item.package.toLowerCase().charAt(0).toUpperCase() + //   <p> // <div className="cartPackageName">
                      <div className="durationContainerCart">
                        <label id="cartLabels">Package</label>
                        <select
                          option={Surfaces}
                          name="packageDuration"
                          onChange={(e) => {
                            console.log(e.target.value, "changged");
                            syncUpdatePackage(item, e.target.value);
                          }}
                        >
                          {Surfaces.map((onePackage) => (
                            <option
                              value={onePackage}
                              key={onePackage}
                              selected={
                                onePackage === item.package ? "selected" : ""
                              }
                            >
                              {onePackage}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    {item.packageDuration === "ONE TIME" ||
                    item.package === "ONETIME_WITH_COMPLETE_CARE" ? (
                      <div className="timeContainerCart">
                        <label id="cartLabels">Time</label>
                        <DatePicker
                          minTime={
                            item.service === "JUMPSTART"
                              ? new Date(
                                  item.serviceStartDate
                                ).toDateString() === new Date().toDateString()
                                ? setHours(
                                    setMinutes(new Date(), 0),
                                    getHours(new Date()) + 1
                                  )
                                : setHours(setMinutes(new Date(), 0), 8)
                              : setHours(setMinutes(new Date(), 0), 10)
                          }
                          maxTime={
                            item.service === "JUMPSTART"
                              ? setHours(setMinutes(new Date(), 0), 18)
                              : setHours(setMinutes(new Date(), 0), 18)
                          }
                          closeOnScroll={width.matches ? true : false}
                          selected={
                            oneTimeDateChanged.service === item.service &&
                            oneTimeDateChanged.status
                              ? null
                              : Date.parse(item.serviceStartDate)
                          }
                          showTimeSelect
                          showTimeSelectOnly={true}
                          filterDate={(date) => getDay(date) !== 1}
                          timeIntervals={60}
                          onChange={(cardate) => {
                            setOneTimeDateChanged({
                              service: item.service,
                              status: false,
                            });
                            var hours = getHours(cardate);
                            console.log(hours);
                            var mins = getMinutes(cardate);
                            console.log(mins);
                            var hoursDate = setHours(
                              new Date(item.serviceStartDate),
                              hours
                            );
                            console.log(hoursDate);
                            var MinutesDate = setMinutes(hoursDate, mins);
                            console.log(MinutesDate, "CHANGED ONE TIME DATE ");
                            oneTimeUpdateCart(item, MinutesDate);
                          }}
                          dateFormat="h:mm aa"
                          placeholderText="Select Time"
                          popperPlacement="bottom-start"
                        />
                      </div>
                    ) : null}
                    {(item.service !== "JUMPSTART" &&
                      item.service !== "WAXING" &&
                      item.package === "ONE TIME") ||
                    item.package === "SILVER" ||
                    item.package === "GOLD" ||
                    item.package === "ONETIME_WITH_COMPLETE_CARE" ||
                    item.package === "SILVER_WITH_COMPLETE_CARE" ||
                    (item.package === "GOLD_WITH_COMPLETE_CARE" &&
                      item.package !== "PLATINUM") ? (
                      <div className="durationContainerCart  smallFontDropDown">
                        <label id="cartLabels">Package</label>
                        <select
                          option={
                            item.carId?.carType === "TWO WHEELER"
                              ? bikePackages
                              : packages
                          }
                          name="packageDuration"
                          onChange={(e) => {
                            console.log(e.target.value, "package");

                            syncUpdatePackage(item, e.target.value);
                          }}
                        >
                          {item.carId?.carType === "TWO WHEELER"
                            ? bikePackages.map((onePackage) => (
                                <option
                                  value={onePackage.value}
                                  key={onePackage.id}
                                  selected={
                                    onePackage.value === item.package
                                      ? "selected"
                                      : ""
                                  }
                                >
                                  {onePackage.name}
                                </option>
                              ))
                            : item.package === "ONE TIME" ||
                              item.package === "ONETIME_WITH_COMPLETE_CARE"
                            ? oneTimePackages.map((onePackage) => (
                                <option
                                  value={onePackage.value}
                                  key={onePackage.id}
                                  selected={
                                    onePackage.value === item.package
                                      ? "selected"
                                      : ""
                                  }
                                >
                                  {onePackage.name}
                                </option>
                              ))
                            : packages.map((onePackage) => (
                                <option
                                  value={onePackage.value}
                                  key={onePackage.id}
                                  selected={
                                    onePackage.value === item.package
                                      ? "selected"
                                      : ""
                                  }
                                >
                                  {onePackage.name}
                                </option>
                              ))}
                        </select>
                      </div>
                    ) : item.service === "WASHING" ? (
                      <div className="durationContainerCart smallFontDropDown">
                        <label id="cartLabels">Package</label>
                        <select
                          option={
                            item.carId?.carType === "TWO WHEELER"
                              ? bikePackages
                              : packages
                          }
                          name="packageDuration"
                          onChange={(e) => {
                            console.log(e.target.value, "package");

                            syncUpdatePackage(item, e.target.value);
                          }}
                        >
                          {item.carId?.carType === "TWO WHEELER"
                            ? bikePackages.map((onePackage) => (
                                <option
                                  value={onePackage.value}
                                  key={onePackage.id}
                                  selected={
                                    onePackage.value === item.package
                                      ? "selected"
                                      : ""
                                  }
                                >
                                  {onePackage.name}
                                </option>
                              ))
                            : item.package === "ONE TIME" ||
                              item.package === "ONETIME_WITH_COMPLETE_CARE"
                            ? oneTimePackages.map((onePackage) => (
                                <option
                                  value={onePackage.value}
                                  key={onePackage.id}
                                  selected={
                                    onePackage.value === item.package
                                      ? "selected"
                                      : ""
                                  }
                                >
                                  {onePackage.name}
                                </option>
                              ))
                            : packagesPlatinum.map((onePackage) => (
                                <option
                                  value={onePackage.value}
                                  key={onePackage.id}
                                  selected={
                                    onePackage.value === item.package
                                      ? "selected"
                                      : ""
                                  }
                                >
                                  {onePackage.name}
                                </option>
                              ))}
                        </select>
                      </div>
                    ) : null}
                    {item.packageDuration !== "ONE TIME" ? (
                      <div className="durationContainerCart">
                        <label id="cartLabels">Duration</label>
                        <select
                          option={tempCart.duration}
                          name="packageDuration"
                          onChange={(e) => {
                            console.log(e.target.value);
                            syncUpdateCartDuration(item, e.target.value);
                          }}
                        >
                          {tempCart.duration.map((oneduration) => (
                            <option
                              value={oneduration}
                              key={oneduration}
                              selected={
                                oneduration === item.packageDuration
                                  ? "selected"
                                  : ""
                              }
                            >
                              {oneduration}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : null}

                    <div className="priceContainerCart">
                      <h3 className="cartprice">
                        {`Price : Rs.
                         ${Math.round(item.price * 100) / 100}`}
                      </h3>
                    </div>
                    {Loading.status &&
                    Loading.uId === `${item.carId?.id}_${item.service}` ? (
                      <Loader
                        type="Oval"
                        color="#024126"
                        height="40"
                        width="40"
                        visible={Loading.status}
                        style={
                          width.matches
                            ? {
                                width: "50%",
                                height: "100",
                                zIndex: 3000,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "relative",
                                left: "14%",
                                top: "-14%",
                              }
                            : {
                                width: "50%",
                                height: "100",
                                zIndex: 3000,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "relative",
                                left: "30%",
                              marginTop: "-15%",
                                marginBottom:'20%'
                              }
                        }
                      />
                    ) : null}
                    <div className="removeButtonContainerCart">
                      <button
                        className="cartremovebtn"
                        onClick={() =>
                          confirmAlert({
                            customUI: ({ onClose }) => {
                              return (
                                <div className="custom-ui">
                                  <p
                                    style={{
                                      textAlign: "center",
                                      marginTop: "3%",
                                    }}
                                  >
                                    Delete Item?
                                  </p>
                                  <div className="promptbuttoncontainer">
                                    <button
                                      className="promptbuttonNo"
                                      onClick={onClose}
                                    >
                                      <small>No</small>
                                    </button>
                                    <button
                                      className="promptbuttonYes"
                                      onClick={() => {
                                        deleteSyncCart(item);
                                        onClose();
                                        // dispatch(RemoveFromCart(item));
                                      }}
                                    >
                                      <small>Yes</small>
                                    </button>
                                  </div>
                                </div>
                              );
                            },
                          })
                        }
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                  {width.matches ? null : (
                    <div className="lineContainer">
                      {index !== cart.length - 1 ? <hr></hr> : null}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="rightCart">
              <TotalPrice
                subTotal={Math.round(sumTotal * 100) / 100}
                GST={Math.round(sumTotal * 0.18 * 100) / 100}
              />

              <button
                onClick={async () => {
                  await checkDatesValidity();
                  !toggle && !oneTimeDateChanged.status
                    ? history.push("checkout")
                    : confirmAlert({
                        customUI: ({ onClose }) => {
                          return (
                            <div className="custom-ui">
                              <p
                                style={{
                                  textAlign: "center",
                                  marginTop: "3%",
                                }}
                              >
                                Please make sure date and time are correctly
                                entered.
                              </p>
                              <div className="promptbuttoncontainer">
                                <button
                                  className="promptbuttonYes"
                                  onClick={() => {
                                    onClose();
                                    // dispatch(RemoveFromCart(item));
                                  }}
                                >
                                  <small>OK</small>
                                </button>
                              </div>
                            </div>
                          );
                        },
                      });
                }}
              >
                {"PLACE ORDER"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItem;
