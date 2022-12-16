import userEvent from "@testing-library/user-event";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../../../variables/variables";
import "./checkoutcomp.css";
import history from "../../../../history/history";
import Servicepage from "../../../UI/PageComponents/servicePage/ServicePageComp";
import logo from "../../../../Image/Logo.png";
import { RemoveFromCart } from "../../../../Redux/UserRedux/UserActions";

const width = { matches: window.matchMedia("(min-width: 768px)").matches };
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}
function clickhandler() {
  console.log("clicked");
}

const __DEV__ = document.domain === "localhost";
function CheckoutComponent() {
  const cartitems = useSelector((state) => state.user.customer.cart);
  const deleteInactiveOrders = async (orders) => {
    console.log("out of these", orders);
    const FlaggedOrders = orders.filter((order) => order.status === "Inactive");

    console.log("Should delete these", FlaggedOrders);
    FlaggedOrders.map((InactiveOrder) => {
      fetch(`${baseUrl}orders/${InactiveOrder._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
        .then((t) => t.json())
        .then((resp) => console.log(resp));
    });
  };
  const RemoveItemsFromCart = async (order) => {};
  useEffect(() => {
    if (cartitems.length === 0) {
      history.goBack();
    } else {
      document.body.scrollTop = 0;

      cartitems.map((order) => {
        fetch(`${baseUrl}orders/car/${order.carId?.id}`)
          .then((res) => res.json())
          .then((response) => deleteInactiveOrders(response.ordersOfCar));
        return null;
      });
    }
  }, []);
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.user.customer.cars);
  const user = useSelector((state) => state.user.customer);
  var totalPriceArray = [];
  cartitems.map((oneItem) => totalPriceArray.push(oneItem.price));

  var sumTotal = totalPriceArray.reduce((a, b) => a + b, 0);
  console.log(sumTotal);

  var GST = sumTotal * 0.18;
  var FinalTotal = sumTotal + GST;

  console.log(FinalTotal);
  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    cartitems.map((order) => {
      fetch(`${baseUrl}orders/car/${order.carId?.id}`)
        .then((res) => res.json())
        .then((response) => deleteInactiveOrders(response.ordersOfCar));
      return null;
    });
    console.log(cartitems, Math.round(FinalTotal * 100) / 100, "request");
    const data = await fetch(`${baseUrl}razorpay/createOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderItems: cartitems,
        totalPrice: Math.round(FinalTotal * 100) / 100,
      }),
    }).then((t) => t.json());
    console.log(data);

    const options = {
      modal: {
        ondismiss: function () {
          window.location.reload(false);
        },
      },
      key: __DEV__ ? "rzp_live_snZJr9gdg4o8mI" : "rzp_live_snZJr9gdg4o8mI",
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: "Dhullo Car Care",
      description: {},
      image: "https://dhullo.com/static/media/logo.6a2ba261.png",
      handler: async function (response) {
        console.log(response);

        // alert(response.razorpay_payment_id);

        const Confimed = await fetch(`${baseUrl}razorpay/paymentConfirmation`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            razorPayId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
          }),
        })
          .then((t) => t.json())
          .then((res) => {
            console.log("ORDER RETURNED AFTER VERIFCATION", res);
            if (res.existingOrders === undefined) {
              history.push({
                pathname: "/confirmation",
                orders: res.existingOrders,
                status: "failure",
              });
              alert("orders is not reading");
            } else {
              for (let i = 0; i < res.existingOrders.length; i++) {
                fetch(` ${baseUrl.toString()}users/deleteCartItem/${user.id}`, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    packageDuration: res.existingOrders[i]?.packageDuration,
                    service: res.existingOrders[i]?.service,
                    package: res.existingOrders[i]?.package,
                    serviceStartDate: res.existingOrders[i]?.serviceStartDate,
                    carId: res.existingOrders[i]?.carId,
                    price: res.existingOrders[i]?.price,
                  }),
                })
                  .then((rest) => rest.json())
                  .then((resp) => {
                    if (resp?.message !== undefined) {
                      dispatch(RemoveFromCart(res?.existingOrders[i]));
                    }
                  });
              }

              history.push({
                pathname: "/confirmation",
                orders: res?.existingOrders,
                status: "success",
              });
            }
          });
      },
      prefill: {
        name: userEvent.name,
        email: " ",
        phone_number: " ",
      },
      theme: {
        color: "#024A5A",
        hide_topbar: false,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  return (
    <div>
      {cartitems.length > 0 ? (
        <div className="checkout-container">
          <div className="checkout-heading">
            <h1>Order Summary</h1>
          </div>
          <div className="orderBoxCheckout">
            {cartitems.map((item) => (
              <div key={item.id}>
                <div
                  id="checkoutRow"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <p id="checkoutTitle">Car</p>
                  <p id="colonCheckout">:</p>
                  <p id="checkoutData">
                    {cars.map((car) =>
                      car.id === item.carId?.id ? car.details : null
                    )}
                  </p>
                </div>
                <div
                  id="checkoutRow"
                  style={{ display: "flex", alignItems: "top" }}
                >
                  <p id="checkoutTitle">Address</p>
                  <p id="colonCheckout">:</p>
                  <p id="checkoutData">
                    {cars.map((car) =>
                      car.id === item.carId?.id ? car.houseName : null
                    )}
                    ,{" "}
                    {cars.map((car) =>
                      car.id === item.carId.id ? car.streetName : null
                    )}
                    ,
                    {cars.map((car) =>
                      car.id === item.carId.id ? car.pincode : null
                    )}
                  </p>
                </div>
                <div
                  id="checkoutRow"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <p id="checkoutTitle">Service</p>
                  <p id="colonCheckout">:</p>
                  <p id="checkoutData">
                    {item.service.toLowerCase().charAt(0).toUpperCase() +
                      item.service.toLowerCase().slice(1)}
                  </p>
                </div>
                <div
                  id="checkoutRow"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <p id="checkoutTitle">Package</p>
                  <p id="colonCheckout">:</p>
                  <p id="checkoutData">
                    {item.package.toLowerCase().charAt(0).toUpperCase() +
                      item.package.toLowerCase().slice(1).replace(/_/g, " ")}
                  </p>
                </div>
                <div
                  id="checkoutRow"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <p id="checkoutTitle">Order date</p>
                  <p id="colonCheckout">:</p>
                  <p id="checkoutData">{new Date().toDateString().substr(3)}</p>
                </div>
                <div
                  id="checkoutRow"
                  style={{ display: "flex", alignItems: "top" }}
                >
                  <p id="checkoutTitle"> Start date</p>
                  <p id="colonCheckout">:</p>
                  <p id="checkoutData">
                    {new Date(item.serviceStartDate).toDateString().substr(3)}
                  </p>
                </div>

                {item.time ? (
                  <div
                    id="checkoutRow"
                    style={{ display: "flex", alignItems: "top" }}
                  >
                    <p id="checkoutTitle">Service Time </p>
                    <p id="colonCheckout">:</p>
                    <p id="checkoutData">
                      {new Date(item.time)
                        .toTimeString()
                        .toString()
                        .substr(0, 5)}
                    </p>
                  </div>
                ) : null}
                {item.packageDuration && item.packageDuration !== "ONE TIME" ? (
                  <div
                    id="checkoutRow"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <p id="checkoutTitle">Service duration</p>
                    <p id="colonCheckout">:</p>
                    <p id="checkoutData">
                      {item.packageDuration
                        .toLowerCase()
                        .charAt(0)
                        .toUpperCase() +
                        item.packageDuration.toLowerCase().slice(1)}
                    </p>
                  </div>
                ) : null}

                <div
                  id="checkoutRow"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <p id="checkoutTitle">Price</p>
                  <p id="colonCheckout">:</p>
                  <p id="checkoutData">
                    Rs{" "}
                    {Math.round((item.price + item.price * 0.18) * 100) / 100}
                  </p>
                </div>
                <hr style={{}}></hr>
              </div>
            ))}
          </div>

          {/* <div className="CheckoutTotal"> */}
          {/* <div className="CheckoutTotalHeading">
          <h1>TOTAL PRICE</h1>
        </div> */}
          {/* <div>
          {cartitems.map((each) => (
            <div key={each.id} className="totalpriceitems">
              <h1>{each.category}</h1>
              <h1 style={{ color: "orangered", paddingLeft: "1rem" }}>
                Rs.{each.price}
              </h1>
            </div>
          ))}
        </div> */}
          {/* <hr></hr> */}
          {/* <p id="Total" style={{ color: "black", fontSize: "3vh" }}>
              Total :
            </p>
            <p id="Price" style={{ color: "#43C355", fontSize: "3vh" }}>
              Rs.
              {cartitems.reduce(function (tot, arr) {
                return tot + arr.price;
              }, 0)}
              /-
            </p>
          </div> */}
          <div className="checkoutButonContainer">
            <button onClick={displayRazorpay}>CHECK OUT</button>
          </div>
        </div>
      ) : (
        <Servicepage click={clickhandler} />
      )}
    </div>
  );
}
export default CheckoutComponent;
// try {
//       const response = await fetch("http://localhost:5000/api/users/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: ItemSingUp.name,

//           mobileNo: ItemSingUp.phone,
//           email: ItemSingUp.email,
//           password: ItemSingUp.password,
//         }),
//       });
