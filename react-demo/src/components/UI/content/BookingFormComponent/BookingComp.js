import {
  addDays,
  addHours,
  getDay,
  getHours,
  getMinutes,
  isEqual,
  setHours,
  setMinutes,
} from "date-fns";
import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import DatePicker from "react-datepicker";
import { useId } from "react-id-generator";
import Loader from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CarBox } from "../../../../globaStyles/styleElements";
import edit from "../../../../Image/edit.svg";
import plus from "../../../../Image/plus.svg";
import { loginOpen } from "../../../../Redux/LoginToggle/LoginActions";
import { addCar, refreshCart } from "../../../../Redux/UserRedux/UserActions";
import { baseUrl } from "../../../../variables/variables";
import { DurationDecider, priceDecider, returnDiscount } from "../../../price";
import "./OtherBookingComp.css";
const BookingForm = (props) => {
  const user = useSelector((state) => state.user.customer);
  const [cars] = useState(user.cars);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.user.customer.cart);
  const [itemId] = useId();
  console.log("baseurl", baseUrl);
  let tempcars = [];
  let tempPackage = [];
  let duration = ["MONTHLY", "QUARTERLY", "HALF YEARLY", "YEARLY"];
  let surfaces = [];
  if (props.surface === "INTERIOR") {
    surfaces = ["EXTERIOR"];
  } else if (props.surface === "EXTERIOR") {
    surfaces = ["INTERIOR"];
  } else if (props.surface === "FULL") {
    surfaces = [];
  }

  const [item, setItem] = useState({
    id: itemId,
    mytime: null,
    mycars: [], //todo change myCar to object/ change it to id
    package: [props.surface],
    duration: "MONTHLY",
    cardate: null,
  });
  const ResetState = () => {
    console.log("resetting state started");
    const tempArray = [];
    setItem({ ...item, mycars: tempArray });
    console.log("resetting state finished");
  };
  const addOnlyNewVehicle = (newVehicles) => {
    function comparer(otherArray) {
      return function (current) {
        return (
          otherArray.filter(function (other) {
            return other.id === current.id;
          }).length === 0
        );
      };
    }

    var onlyInA = newVehicles.filter(comparer(user.cars));
    var onlyInB = user?.cars?.filter(comparer(newVehicles));

    const result = onlyInA.concat(onlyInB);

    result.map((oneCar) => dispatch(addCar(oneCar)));
  };

  const upDateUserVehicles = () => {
    fetch(`${baseUrl}cars/customer/${user.id}`)
      .then((res) => res.json())
      .then((resp) => {
        console.log(resp);
        if (resp.car !== undefined) {
          addOnlyNewVehicle(resp.car);
        }
      })
      .catch((err) => console.log(err, "error while updating cars"));
  };
  useEffect(() => {
    upDateUserVehicles();
    console.log(props.category, "here");
  }, []);

  const [refresh, setRefresh] = useState(false);

  const [Loading, setLoading] = useState(false);

  const width = { matches: window.matchMedia("(min-width: 768px)").matches };

  // const LoginToggle = useSelector((state) => state.loginToggle);
  const isSignedIn = useSelector((state) => state.user.UserSignedIn);

  const [disables] = useState({
    id: "",
    state: true,
  });
  console.log(disables);

  const [defaultDate] = useState(setHours(setMinutes(new Date(), 0), 10));

  useEffect(() => {
    if (props.surface !== "FULL")
      setItem({ ...item, package: [props.surface], mycars: [] });
    else {
      setItem({ ...item, package: ["INTERIOR", "EXTERIOR"], mycars: [] });
    }
  }, [props.surface]);

  // const [sumtotal, setSumTotal] = useState({ Total: 0 });
  // const [packageArray, setPackageArray] = useState({
  //   package: [],
  // });

  const handleSurafe = (e) => {
    const { name, checked, value, type } = e.target;
    console.log(
      name,
      checked,
      value,
      type,
      `${props.category.replace(/\s/g, "")}_WITH_COMPLETE_CARE`,
      "here"
    );
    if (type === "checkbox") {
      if (checked === true) {
        if (
          value === `${props.category.replace(/\s/g, "")}_WITH_COMPLETE_CARE`
        ) {
          tempPackage = item.package.concat(value);
          setItem({
            ...item,
            package: [
              `${props.category.replace(/\s/g, "")}_WITH_COMPLETE_CARE`,
            ],
          });
          console.log(item);
        } else {
          tempPackage = item.package.concat(value);
          setItem({ ...item, package: tempPackage });
          console.log(item);
        }
      } else {
        setItem({
          ...item,
          package: item.package.filter(function (val) {
            return val !== value;
          }),
        });
        console.log(item);
      }
    } else setItem({ ...item, [name]: value });

    console.log(item);
  };
  const twoWheelers = cars?.filter(
    (oneCar) => oneCar.carType === "TWO WHEELER"
  );
  let twoWheelerID = [];
  if (twoWheelers !== undefined && twoWheelers?.length !== 0) {
    twoWheelers.map((bike) => twoWheelerID.push(bike.id));
  }
  console.log(twoWheelers, twoWheelerID);
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === "checkbox") {
      if (checked === true) {
        tempcars = item.mycars.concat(value);
        setItem({
          ...item,
          mycars: tempcars,
          package:
            item.package.length === 0 || item.mycars.length === 0
              ? []
              : item.package,
        });
      } else {
        setItem({
          ...item,
          package: [],
          mycars: item.mycars.filter(function (val) {
            return val !== value;
          }),
        });
      }
    } else setItem({ ...item, [name]: value });
    console.log(item);
  };
  const handleChangeDiffrently = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === "checkbox") {
      if (checked === true) {
        setItem({
          mycars: [value],
          package:
            item.service === "DETAILING" || item.service === "SANITIZATION"
              ? item.package.length === 0 || item.mycars.length === 0
                ? []
                :   [props.surface]
              :   [props.surface],
        });
      } else {
        setItem({
          ...item,
          package: [],
          mycars: item.mycars.filter(function (val) {
            return val !== value;
          }),
        });
      }
    } else setItem({ ...item, [name]: value });
    console.log(item);
  };

  console.log(item);

  let finaltempcars = [];
  for (let i = 0; i < item.mycars.length; i++) {
    finaltempcars.push({});
  }
  const carTypeHanler = (carToCheck) => {
    var car = cars.filter((onecar) => onecar.id === carToCheck.mycar);
    return car[0]?.carType;
  };
  const carIdhandler = (carToCheck) => {
    var car = cars.filter((onecar) => onecar.id === carToCheck.mycar);
    return car[0]?.id;
  };
  const carStreethandler = (carToCheck) => {
    var car = cars.filter((onecar) => onecar.id === carToCheck.mycar);
    return car[0]?.streetName;
  };
  const carHousehandler = (carToCheck) => {
    var car = cars.filter((onecar) => onecar.id === carToCheck.mycar);
    return car[0]?.houseName;
  };
  const carPinCodehandler = (carToCheck) => {
    var car = cars.filter((onecar) => onecar.id === carToCheck.mycar);
    return car[0]?.pincode;
  };

  const packageDecider = (packages) => {
    if (packages.length > 1) {
      return "FULL";
    } else {
      return packages[0];
    }
  };
  for (let i = 0; i < item.mycars.length; i++) {
    finaltempcars[i].id = Math.floor(Math.random() * 100);
    finaltempcars[i].customerId = user.id;
    finaltempcars[i].orderDate = new Date();

    finaltempcars[i].serviceStartDate = item.cardate;
    finaltempcars[i].time = item.mytime;
    finaltempcars[i].mycar = item.mycars[i];
    finaltempcars[i].serviceDays = item.serviceDays;
    finaltempcars[i].packageDuration =
      item.duration !== undefined ? item.duration : "ONE TIME";

    finaltempcars[i].carType = carTypeHanler(finaltempcars[i]);
    finaltempcars[i].carId = carIdhandler(finaltempcars[i]);
    finaltempcars[i].streetName = carStreethandler(finaltempcars[i]);
    finaltempcars[i].houseName = carHousehandler(finaltempcars[i]);
    finaltempcars[i].pincode = carPinCodehandler(finaltempcars[i]);

    //todo change timings for packages here

    //todo take service start date and append time n send it
    if (
      props.category === "ONE TIME" ||
      props.category === "SILVER" ||
      props.category === "GOLD" ||
      props.category === "PLATINUM"
    ) {
      finaltempcars[i].service = "WASHING";
      finaltempcars[i].package = item.package[0] || props.category;
    } else if (props.category === "SANITIZATION") {
      finaltempcars[i].service = props.category;
      finaltempcars[i].package = packageDecider(item.package);
    } else if (props.category === "DETAILING") {
      finaltempcars[i].service = "DETAILING";
      finaltempcars[i].package = packageDecider(item.package);
    } else if (props.category === "JUMPSTART") {
      finaltempcars[i].service = props.category;
      finaltempcars[i].package = "ONE TIME";
    } else if (props.category === "WAXING") {
      finaltempcars[i].service = props.category;
      finaltempcars[i].package = "ONE TIME";
    } else {
      finaltempcars[i].service = props.category;
      finaltempcars[i].package = props.category;
    }
    // finaltempcars[i].serviceprice = ServicePrice(props.category);
    // finaltempcars[i].categoryprice = CarTypePrice(
    //   carTypeHanler(finaltempcars[i])
    // );
    finaltempcars[i].subTotal = priceDecider(
      carTypeHanler(finaltempcars[i]),
      finaltempcars[i].service,
      finaltempcars[i].package === undefined
        ? undefined
        : finaltempcars[i].package,
      finaltempcars[i].packageDuration
    );
    finaltempcars[i].DiscounterPrice = DurationDecider(
      finaltempcars[i].subTotal,
      finaltempcars[i].packageDuration
    );
    finaltempcars[i].discountPercent = returnDiscount(
      finaltempcars[i].subTotal,
      finaltempcars[i].DiscounterPrice
    );
    console.log(finaltempcars[i].DiscounterPrice);
    console.log(finaltempcars[i].subTotal);
    // finaltempcars[i].durationPrice = DurationPrice(
    //   finaltempcars[i].packageDuration,
    //   finaltempcars[i].serviceprice + finaltempcars[i].categoryprice
    // );
    console.log(finaltempcars[i].subTotal);
    finaltempcars[i].price = finaltempcars[i].DiscounterPrice;
  }
  const addItemstoSyncCart = async (order) => {
    let tempOrders = [];

    let existingItems = cartItems.filter(
      (cart) =>
        isEqual(
          new Date(Date.parse(order.time)),
          new Date(Date.parse(cart.serviceStartDate))
        ) && cart.carId === order.carId
    );

    console.log(existingItems);

    if (existingItems.length > 0) {
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
                Item already present
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
      cars.map((car) => {
        car.orders.forEach((order) => tempOrders.push(order));
      });
      if (tempOrders.length === 0) {
        console.log(baseUrl);
        await setLoading(true);
        const response = await fetch(`${baseUrl}users/addCartItem/${user.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            packageDuration: order.packageDuration,
            service: order.service,
            package: order.package,
            serviceStartDate:
              order.time === null || order.time === undefined
                ? addHours(new Date(order.serviceStartDate), 9)
                : order.time,
            carId: order.carId.toString(),
            price: order.DiscounterPrice,
          }),
        });

        const responseData = await response.json();
        await console.log(responseData);
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
                    {responseData}
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
          setLoading(false);
        } else {
          dispatch(refreshCart(responseData.customer.cart));

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
                    {order.package.toLowerCase().charAt(0).toUpperCase() +
                      order.package.toLowerCase().slice(1).replace(/_/g, " ") +
                      " " +
                      order.service.toLowerCase().charAt(0).toUpperCase() +
                      order.service.toLowerCase().slice(1) +
                      " " +
                      " added to cart "}
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

          props.togglePress(props.category);
        }
      } else {
        let alreadyActiveOrders = tempOrders.filter(
          (tempOrder) =>
            tempOrder.service === order.service &&
            tempOrder.package === order.package &&
            tempOrder.carId === order.carId &&
            isEqual(
              new Date(Date.parse(order.time)),
              new Date(Date.parse(tempOrder.serviceStartDate))
            )
        );

        if (alreadyActiveOrders.length > 0) {
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
                    {"Already present in orders"}
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
          await setLoading(true);
          console.log(baseUrl);
          const response = await fetch(
            `${baseUrl}users/addCartItem/${user.id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                packageDuration: order.packageDuration,
                service: order.service,
                package: order.package,
                serviceStartDate:
                  order.time === null || order.time === undefined
                    ? addHours(new Date(order.serviceStartDate), 8)
                    : order.time,
                carId: order.carId.toString(),
                price: order.DiscounterPrice,
              }),
            }
          );

          const responseData = await response.json();
          await console.log(responseData);
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
                      {responseData}
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
            setLoading(false);
          } else {
            dispatch(refreshCart(responseData.customer.cart));

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
                      {order.package.toLowerCase().charAt(0).toUpperCase() +
                        order.package
                          .toLowerCase()
                          .slice(1)
                          .replace(/_/g, " ") +
                        " " +
                        order.service.toLowerCase().charAt(0).toUpperCase() +
                        order.service.toLowerCase().slice(1) +
                        " " +
                        " added to cart "}
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

            props.togglePress(props.category);
          }
        }
      }
    } //TODO: testing todo

    await setLoading(false);
  };
  useEffect(() => {
    ResetState();
    console.log(item, ResetState);
  }, [props.category]);

  const loginInBooking = async () => {
    await dispatch(loginOpen());
    await props.togglePress(props.category);
  };

  return (
    <div className="bookingform">
      <div className="bookingform-left">
        <h2>{props.category}</h2>
        {cars !== undefined ? (
          <div
            className={
              cars.length !== 0 ? "carbox-container" : "carbox-container_null"
            }
          >
            {cars.map((onecar) =>
              (props.category === "ONE TIME" ||
                props.category === "SANITIZATION" ||
                props.category === "DETAILING" ||
                props.category === "PLATINUM" ||
                props.category === "JUMPSTART" ||
                props.category === "WAXING" ||
                item.package.includes(
                  `${props.category.replace(/\s/g, "")}_WITH_COMPLETE_CARE`
                )) &&
              onecar.carType === "TWO WHEELER" ? (
                <CarBox
                  key={onecar.id}
                  service={props.category}
                  disabled={true}
                  style={{ opacity: "30%" }}
                >
                  <div className="checkBox">
                    {props.category === "ONE TIME" ||
                    props.category === "SANITIZATION" ||
                    props.category === "DETAILING" ||
                    props.category === "JUMPSTART" ||
                    props.category === "WAXING" ? (
                      <input
                        checked={item.mycars[0] === onecar.id ? true : false}
                        disabled={true}
                        type="checkbox"
                        name={onecar.details}
                        value={onecar.id}
                        onChange={
                          props.category === "ONE TIME" ||
                          props.category === "SANITIZATION" ||
                          props.category === "DETAILING" ||
                          props.category === "JUMPSTART" ||
                          props.category === "WAXING"
                            ? handleChangeDiffrently
                            : handleChange
                        }
                        className="enabled"
                      />
                    ) : (
                      <input
                        checked={item.mycars.length !== 0 ? true : false}
                        disabled={true}
                        type="checkbox"
                        name={onecar.details}
                        value={onecar.id}
                        onChange={
                          props.category === "ONE TIME" ||
                          props.category === "SANITIZATION" ||
                          props.category === "DETAILING" ||
                          props.category === "JUMPSTART" ||
                          props.category === "WAXING"
                            ? handleChangeDiffrently
                            : handleChange
                        }
                        className="enabled"
                      />
                    )}
                  </div>

                  <div>
                    <p>{onecar.details}</p>
                    <p>{onecar.houseName}</p>
                    {/* <h3>{onecar.streetName}</h3> */}
                    <p>{onecar.pincode}</p>
                  </div>
                  <div>
                    <Link
                      to={{
                        pathname: "/addcar",
                        state: onecar,
                      }}
                    >
                      <img disabled={true} alt={edit} src={edit}></img>
                    </Link>
                  </div>
                </CarBox>
              ) : (
                <CarBox
                  key={onecar.id}
                  service={props.category}
                  disabled={
                    onecar.details === disables.id[0]?.details &&
                    (props.category === "ONE TIME" ||
                      props.category === "SANITIZATION" ||
                      props.category === "DETAILING" ||
                      props.category === "JUMPSTART" ||
                      props.category === "WAXING")
                      ? true
                      : false
                  }
                >
                  <div className="checkBox">
                    {props.category === "ONE TIME" ||
                    props.category === "SANITIZATION" ||
                    props.category === "DETAILING" ||
                    props.category === "JUMPSTART" ||
                    props.category === "WAXING" ? (
                      <input
                        checked={item.mycars[0] === onecar.id ? true : false}
                        disabled={
                          onecar.details === disables.id[0]?.details &&
                          (props.category === "ONE TIME" ||
                            props.category === "SANITIZATION" ||
                            props.category === "DETAILING" ||
                            props.category === "JUMPSTART")
                            ? disables.state
                            : false
                        }
                        type="checkbox"
                        name={onecar.details}
                        value={onecar.id}
                        onChange={
                          props.category === "ONE TIME" ||
                          props.category === "SANITIZATION" ||
                          props.category === "DETAILING" ||
                          props.category === "JUMPSTART" ||
                          props.category === "WAXING"
                            ? handleChangeDiffrently
                            : handleChange
                        }
                        className="enabled"
                      />
                    ) : (
                      <input
                        disabled={
                          onecar.details === disables.id[0]?.details &&
                          (props.category === "ONE TIME" ||
                            props.category === "SANITIZATION" ||
                            props.category === "DETAILING" ||
                            props.category === "JUMPSTART")
                            ? disables.state
                            : false
                        }
                        type="checkbox"
                        name={onecar.details}
                        value={onecar.id}
                        onChange={
                          props.category === "ONE TIME" ||
                          props.category === "SANITIZATION" ||
                          props.category === "DETAILING" ||
                          props.category === "JUMPSTART" ||
                          props.category === "WAXING"
                            ? handleChangeDiffrently
                            : handleChange
                        }
                        className="enabled"
                        checked={item.mycars.includes(onecar.id) ? true : false}
                      />
                    )}
                  </div>

                  <div>
                    <p>{onecar.details}</p>
                    <p>{onecar.houseName}</p>

                    <p>{onecar.pincode}</p>
                  </div>
                  <div>
                    <Link
                      to={{
                        pathname: "/addcar",
                        state: onecar,
                      }}
                    >
                      <img alt={edit} src={edit}></img>
                    </Link>
                  </div>
                </CarBox>
              )
            )}
            <div
              style={
                !width.matches && cars.length === 0
                  ? {
                      position: "relative",
                      left: "16vw",
                    }
                  : {}
              }
              className="addNewCarButtonContainer"
            >
              {isSignedIn ? (
                <div className="addnewCarButton">
                  <Link
                    to={{
                      pathname: "/addcar",
                      click: props.click,
                    }}
                  >
                    <img alt={plus} src={plus}></img>
                  </Link>
                </div>
              ) : null}
              <strong>Add Car</strong>
            </div>
          </div>
        ) : (
          <div className="addNewCarButtonContainerLoggedOut">
            <div className="addnewCarButtonLoggedOut">
              <Link
                style={{ marginBottom: "1rem  " }}
                to={width.matches ? "#" : "/signin"}
                onClick={width.matches ? () => loginInBooking() : null}
              >
                <img alt={plus} src={plus}></img>
              </Link>
            </div>
            <strong>Add Car</strong>
          </div>
        )}
        {(props.category === "DETAILING" ||
          props.category === "SANITIZATION") &&
        isSignedIn ? (
          <div className="surfaceContainer">
            {surfaces.map((surface, index) => (
              <div
                className="checkBoxSurface"
                style={
                  width.matches
                    ? {
                        display: "flex",
                        position: "relative",
                        justifyContent: "center",
                        margin: "1rem",

                        marginLeft: "0.5rem",

                        minWidth: "30%",
                        marginLeft: "-4.8%",
                      }
                    : {
                        display: "flex",
                        justifyContent: "center",
                        margin: "0.4rem",
                        minWidth: "40%",
                      }
                }
              >
                <input
                  type="checkbox"
                  name="package"
                  value={surface}
                  onChange={handleSurafe}
                  checked={
                    item.package.length < 2 ? item.package[0] === surface : true
                  }
                />
                <p> {`ADD ${surface}`}</p>
              </div>
            ))}
          </div>
        ) : null}
        {isSignedIn &&
        (props.category === "ONE TIME" ||
          props.category === "SILVER" ||
          props.category === "GOLD") ? (
          <div className="completeCareSection">
            <div className="leftCompleteCare">
              <input
                disabled={
                  finaltempcars.length === 0 ||
                  twoWheelerID.includes(item.mycars[item.mycars.length - 1])
                }
                type="checkbox"
                name="package"
                value={`${props.category.replace(
                  /\s/g,
                  ""
                )}_WITH_COMPLETE_CARE`}
                onChange={handleSurafe}
                checked={
                  finaltempcars.length !== 0 &&
                  item.package[0] ===
                    `${props.category.replace(/\s/g, "")}_WITH_COMPLETE_CARE`
                    ? true
                    : false
                }
              />
            </div>
            <div className="rightCompleteCare">
              <p> COMPLETE CARE</p>
              <small>
                Includes waxing, underhood dusting, deep interior cleaning,
                dashboard and tyre polish.
              </small>
            </div>
          </div>
        ) : null}
        <div className="priceRowService">
          {isSignedIn ? (
            <div
              style={
                width.matches
                  ? {
                      display: "flex",
                      alignItems: "center",
                      width: "100vw",
                      marginLeft: "-2vw",
                    }
                  : { display: "flex", alignItems: "center", width: "100vw" }
              }
            >
              <p style={{ marginRight: "1.2rem" }}>Price :</p>
              <div className="priceValues">
                <p style={{ marginRight: "10%" }}>{"Rs"}</p>
                <p
                  style={{
                    letterSpacing: "2px",
                    fontWeight: "normal",
                    fontSize: width.matches ? "1vw" : "85%",
                    marginLeft: width.matches ? "1%" : "1%",
                  }}
                >
                  {finaltempcars.reduce(function (tot, arr) {
                    return Math.round((tot + arr.price) * 100) / 100;
                  }, 0)}
                </p>
                {finaltempcars.length === 0 ||
                finaltempcars[0]?.discountPercent === 0 ? null : (
                  <p
                    style={{
                      letterSpacing: "2px",
                      fontWeight: "normal",
                      fontSize: width.matches ? "1vw" : "85%",
                      marginLeft: width.matches ? "5%" : "1%",
                    }}
                  >
                    <del style={{ color: "black" }}>
                      Rs
                      {finaltempcars.reduce(function (tot, arr) {
                        return Math.round((tot + arr.subTotal) * 100) / 100;
                      }, 0)}
                    </del>
                  </p>
                )}
              </div>

              {finaltempcars.length === 0 ? null : (
                <div
                  style={{
                    display: "flex",
                    width: "15vh",
                    marginLeft: width.matches ? "3%" : "5%",
                  }}
                >
                  {finaltempcars[0]?.discountPercent === 0 ? null : (
                    <p
                      style={{
                        color: "red",
                        fontSize: width.matches ? "1vw" : "85%",
                        fontWeight: "normal",
                        marginLeft: "15%",
                      }}
                    >
                      {finaltempcars[0]?.discountPercent}% off
                    </p>
                  )}
                </div>
              )}
            </div>
          ) : null}
        </div>
        <div>
          {props.category === "DETAILING" ||
          props.category === "SANITIZATION" ? (
            <div
              style={
                item.mycars.length === 0 || item.package?.length === 0
                  ? { display: "flex", flexDirection: "column", opacity: "30%" }
                  : { display: "flex", flexDirection: "column" }
              }
            >
              <label style={{ marginBottom: "-0.8rem" }}>Select Date</label>
              <DatePicker
                onFocus={(e) => (e.target.readOnly = true)}
                disabledKeyboardNavigation={true}
                popperPlacement="top-start"
                closeOnScroll={width.matches ? true : false}
                style={
                  item.mycars.length === 0 ||
                  item.package?.length === 0 ||
                  item.cardate === undefined
                    ? {
                        border: "2px solid grey",
                        opacity: "40%",
                        backgroundColor: "grey",
                      }
                    : {}
                }
                filterDate={(date) => getDay(date) !== 1}
                disabled={
                  item.mycars.length === 0 || item.package.length === 0
                    ? true
                    : false
                }
                selected={item.cardate || null}
                onChange={(cardate) => {
                  var serviceDays = [];
                  if (props.category === "SILVER") {
                    if (
                      getDay(cardate) === 0 ||
                      getDay(cardate) === 3 ||
                      getDay(cardate) === 5
                    ) {
                      serviceDays = [0, 3, 5];
                    } else {
                      serviceDays = [2, 4, 6];
                    }
                  } else if (
                    props.category === "DETAILING" ||
                    props.category === "SANITIZATION" ||
                    props.category === "JUMPSTART" ||
                    props.category === "WAXING"
                  ) {
                    let tempDay = getDay(cardate);
                    let tempServiceDay = [];
                    tempServiceDay.push(tempDay);
                    serviceDays = tempServiceDay;
                  } else {
                    serviceDays = [0, 2, 3, 4, 5, 6];
                  }

                  setItem({
                    ...item,
                    cardate: cardate,
                    serviceDays: serviceDays,
                  });
                }}
                minDate={addDays(new Date(), 1)}
              />
            </div>
          ) : (
            <div
              style={
                item.mycars.length === 0
                  ? { display: "flex", flexDirection: "column", opacity: "30%" }
                  : { display: "flex", flexDirection: "column" }
              }
            >
              <label style={{ marginBottom: "-0.8rem" }}>Select Date</label>
              <DatePicker
                onFocus={(e) => (e.target.readOnly = true)}
                disabledKeyboardNavigation={true}
                popperPlacement="top-start"
                closeOnScroll={width.matches ? true : false}
                style={
                  item.mycars.length === 0
                    ? {
                        display: "flex",
                        flexDirection: "column",
                        opacity: "30%",
                      }
                    : { opacity: "100%" }
                }
                filterDate={(date) => getDay(date) !== 1}
                disabled={item.mycars.length === 0 ? true : false}
                //  className={item.mycars.length === 0 ? "disabled" : "enabled"}
                selected={item.cardate || null}
                onChange={(cardate) => {
                  var serviceDays = [];
                  if (props.category === "SILVER") {
                    if (
                      getDay(cardate) === 0 ||
                      getDay(cardate) === 3 ||
                      getDay(cardate) === 5
                    ) {
                      serviceDays = [0, 3, 5];
                    } else {
                      serviceDays = [2, 4, 6];
                    }
                  } else if (
                    props.category === "ONE TIME" ||
                    props.category === "JUMPSTART" ||
                    props.category === "WAXING"
                  ) {
                    serviceDays = [cardate];
                  } else {
                    serviceDays = [0, 2, 3, 4, 5, 6];
                  }

                  setItem({
                    ...item,
                    cardate: cardate,
                    serviceDays: serviceDays,
                  });
                }}
                minDate={
                  props.category === "JUMPSTART"
                    ? addDays(new Date(), 0)
                    : addDays(new Date(), 1)
                }
              />
            </div>
          )}
        </div>
        {props.category === "SANITIZATION" ||
        props.category === "DETAILING" ||
        props.category === "ONE TIME" ||
        props.category === "JUMPSTART" ||
        props.category === "WAXING" ? (
          <div
            className="timeContainerService"
            style={
              props.category === "ONE TIME" ||
              props.category === "JUMPSTART" ||
              props.category === "WAXING"
                ? item.mycars.length === 0 || item.cardate === undefined
                  ? { opacity: "40%" }
                  : {}
                : item.mycars.length === 0 ||
                  item.package.length === 0 ||
                  item.cardate === undefined
                ? { opacity: "40%" }
                : {}
            }
          >
            <label style={{ position: "relative", bottom: "-15%" }}>
              Select Time
            </label>
            <DatePicker
              onFocus={(e) => (e.target.readOnly = true)}
              disabledKeyboardNavigation={true}
              selected={item.mytime}
              popperPlacement="top-start"
              closeOnScroll={width.matches ? true : false}
              filterDate={(date) => getDay(date) !== 1}
              minTime={
                props.category === "JUMPSTART"
                  ? new Date(item.cardate).toDateString() ===
                    new Date().toDateString()
                    ? setHours(
                        setMinutes(new Date(), 0),
                        getHours(new Date()) + 1
                      )
                    : setHours(setMinutes(new Date(), 0), 8)
                  : setHours(setMinutes(new Date(), 0), 10)
              }
              maxTime={
                props.category === "JUMPSTART"
                  ? setHours(setMinutes(new Date(), 0), 18)
                  : setHours(setMinutes(new Date(), 0), 18)
              }
              disabled={
                props.category === "ONE TIME" ||
                props.category === "JUMPSTART" ||
                props.category === "WAXING"
                  ? item.mycars.length === 0 || item.cardate === undefined
                    ? true
                    : false
                  : item.mycars.length === 0 ||
                    item.package.length === 0 ||
                    item.cardate === undefined
                  ? true
                  : false
              }
              onChange={(mytime) => {
                console.log(item);

                console.log(mytime);
                var hours = getHours(mytime);
                var mins = getMinutes(mytime);
                console.log(hours, mins);
                console.log(item.serviceStartDate);
                var hoursDate = setHours(item.cardate, hours);
                var MinutesDate = setMinutes(hoursDate, mins);
                console.log(MinutesDate);
                setItem({
                  ...item,
                  mytime: MinutesDate,
                });
                console.log(item);
              }}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={60}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
          </div>
        ) : (
          <div
            className="durationContainerService"
            style={
              item.mycars.length === 0
                ? {
                    display: "flex",
                    flexDirection: "column",
                    opacity: "30%",
                  }
                : { display: "flex", flexDirection: "column" }
            }
          >
            <label
              style={
                width.matches
                  ? { marginBottom: "0rem" }
                  : { marginBottom: "0.5rem" }
              }
            >
              Select Duration
            </label>
            <select
              name="duration"
              onChange={handleChange}
              style={
                item.mycars.length === 0
                  ? {
                      opacity: "80%",
                      backgroundColor: "#F5F3F1",
                      border: "2px solid black",
                    }
                  : {}
              }
              className={item.mycars.length === 0 ? "disabled" : "enabled"}
            >
              {duration.map((oneduration) => (
                <option
                  value={oneduration}
                  key={oneduration}
                  selected={oneduration === item.duration ? "selected" : ""}
                >
                  {oneduration}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="buttonrow" style={{ marginTop: "2rem" }}>
          {props.category === "DETAILING" ||
          props.category === "SANITIZATION" ? (
            <button
              disabled={
                item.mycars.length === 0 || item.package.length === 0
                  ? true
                  : false
              }
              style={
                item.mycars.length === 0 || item.package.length === 0
                  ? { opacity: "60%", background: "#232324" }
                  : {}
              }
              className={
                item.mycars.length === 0 || item.package.length === 0
                  ? "disabled"
                  : "enabled"
              }
              onClick={() => {
                finaltempcars.map((onecar) => {
                  console.log(finaltempcars, "before cart");
                  if (
                    onecar.serviceStartDate === null ||
                    onecar.serviceStartDate === undefined ||
                    onecar.time === undefined ||
                    onecar.time === null
                  ) {
                    alert("Time is not added");
                  } else {
                    addItemstoSyncCart(onecar);
                  }
                });
              }}
            >
              ADD TO CART
            </button>
          ) : (
            <button
              disabled={
                item.mycars.length === 0 ||
                item.cardate === null ||
                item.mytime === undefined
                  ? true
                  : false
              }
              style={
                item.mycars.length === 0 ||
                item.cardate === null ||
                item.mytime === undefined
                  ? { opacity: "60%", background: "#232324" }
                  : {}
              }
              className={item.mycars.length === 0 ? "disabled" : "enabled"}
              onClick={() => {
                console.log(item, "item");

                if (item.cardate === null) {
                  alert("Date and time can't be empty");
                } else if (item.mytime === undefined) {
                  alert("Date and time can't be empty");
                } else {
                  finaltempcars.map((onecar) => {
                    addItemstoSyncCart(onecar);
                  });
                }
              }}
            >
              {Loading ? (
                <Loader
                  type="Oval"
                  color="white"
                  height="30"
                  width="60"
                  visible={Loading}
                  style={
                    width.matches
                      ? {
                          width: "60%",

                          zIndex: 3000,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                          marginLeft: "2vw",
                        }
                      : {
                          width: "60%",

                          zIndex: 3000,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",

                          marginLeft: "8vw",
                        }
                  }
                />
              ) : (
                "ADD TO CART"
              )}
            </button>
          )}
        </div>
      </div>

      <div className="bookingform-right"></div>
    </div>
  );
};
export default BookingForm;
