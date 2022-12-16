import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ReorderPopup.css";
import DatePicker from "react-datepicker";
import { confirmAlert } from "react-confirm-alert";
import {
  addDays,
  setHours,
  getHours,
  getMinutes,
  setMinutes,
  getDay,
  addHours,
  differenceInDays,
} from "date-fns";
import { refreshCart } from "../../../../Redux/UserRedux/UserActions";
import { baseUrl } from "../../../../variables/variables";
import { priceDecider, DurationDecider, returnDiscount } from "../../../price";

export default function ReorderPopup(props) {
  console.log(props, "props in reorderPopu");
  const user = useSelector((state) => state.user.customer);
  const dispatch = useDispatch();
  const [oneTimeDateChanged, setOneTimeDateChanged] = useState(false);
  console.log(props);
  const { order, car } = props;
  const packagesForCar = [
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
  ];
  const packagesForBike = [
    { id: 1, name: "SILVER", value: "SILVER" },
    { id: 2, name: "GOLD", value: "GOLD" },
  ];
  const surfaces = ["INTERIOR", "EXTERIOR", "FULL"];
  const durationArray = ["MONTHLY", "QUARTERLY", "HALF YEARLY", "YEARLY"];

  const [reOrderState, setReorderState] = useState({
    selectedPackage: order.package,
    selectedSurface: order.serviceSurface,
    selectedDate:null,
    selectedTime: null,
    price: order.price,
    selectedDuration: order.packageDuration,
  });

  const tempworkaroundDuration = (carType, service, myPackage, duration) => {
    const subTotalPrice = priceDecider(carType, service, myPackage, duration);
    const discountPrice = DurationDecider(subTotalPrice, duration);
    const discountPercentage = returnDiscount(subTotalPrice, discountPrice);
    return { discountPrice, discountPercentage };
  };
  const addItemsToSyncCart = async () => {
    if (order.packageDuration !== "MONTHLY") {
      if (
        reOrderState.selectedDate === null ||
        reOrderState.selectedTime === null
      ) {
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
                  {"Please enter valid date and time"}
                </p>
                <div className="promptbuttoncontainer">
                  <button
                    className="promptbuttonYes"
                    onClick={() => {
                      onClose();
                      // props.closePopUp();
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
        const response = await fetch(`${baseUrl}users/addCartItem/${user.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            packageDuration: reOrderState.selectedDuration,
            service: order.service,
            package: reOrderState.selectedPackage,
            serviceStartDate:
              reOrderState.selectedTime === null
                ? reOrderState.selectedDate
                : reOrderState.selectedTime,
            carId: car.id,
            price: tempworkaroundDuration(
              car.carType,
              order.service,
              reOrderState.selectedPackage,
              reOrderState.selectedDuration
            ).discountPrice,
          }),
        });
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
                    {reOrderState.selectedPackage
                      .toLowerCase()
                      .charAt(0)
                      .toUpperCase() +
                      reOrderState.selectedPackage
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
                        props.closePopUp();
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
        }
      }
    }
    else {
     if (
       reOrderState.selectedDate === null 
        
     ) {
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
                 {"Please enter valid date and time"}
               </p>
               <div className="promptbuttoncontainer">
                 <button
                   className="promptbuttonYes"
                   onClick={() => {
                     onClose();
                     // props.closePopUp();
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
       const response = await fetch(`${baseUrl}users/addCartItem/${user.id}`, {
         method: "PATCH",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           packageDuration: reOrderState.selectedDuration,
           service: order.service,
           package: reOrderState.selectedPackage,
           serviceStartDate:
             reOrderState.selectedTime === null
               ? reOrderState.selectedDate
               : reOrderState.selectedTime,
           carId: car.id,
           price: tempworkaroundDuration(
             car.carType,
             order.service,
             reOrderState.selectedPackage,
             reOrderState.selectedDuration
           ).discountPrice,
         }),
       });
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
                   {reOrderState.selectedPackage
                     .toLowerCase()
                     .charAt(0)
                     .toUpperCase() +
                     reOrderState.selectedPackage
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
                       props.closePopUp();
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
       }
     }
    }
    
    
  };

  return (
    <div className="reorderPopupContainer">
      <div className="closeContainer">
        <button onClick={() => props.closePopUp()}>x</button>
      </div>
      <div className="fieldAndValue">
        <div id="reoRderField">
          <p>CAR NAME</p>
        </div>
        <div id="reOrderColon">
          <p>:</p>
        </div>
        <div id="reOrderValue">
          <p>{car.details}</p>
        </div>
      </div>
      <div className="fieldAndValue">
        <div id="reoRderField">
          <p>CAR NO</p>
        </div>
        <div id="reOrderColon">
          <p>:</p>
        </div>
        <div id="reOrderValue">
          <p>{car.carNo}</p>
        </div>
      </div>
      <div className="fieldAndValue">
        <div id="reoRderField">
          <p>SERVICE</p>
        </div>
        <div id="reOrderColon">
          <p>:</p>
        </div>
        <div id="reOrderValue">
          <p>{order.service}</p>
        </div>
      </div>
      {order.packageDuration !== "ONE TIME" ? (
        <div className="fieldAndValue">
          <div id="reoRderField">
            <p>PACKAGE</p>
          </div>
          <div id="reOrderColon">
            <p>:</p>
          </div>
          <div id="reOrderValue">
            <select
              onChange={(e) => {
                setReorderState({
                  ...reOrderState,
                  selectedPackage: e.target.value,
                });
              }}
            >
              {packagesForCar.map((onePackage) => (
                <option
                  selected={
                    onePackage.value === reOrderState.selectedPackage
                      ? "selected"
                      : ""
                  }
                  defaultValue={reOrderState.selectedPackage}
                  value={onePackage.value}
                  key={onePackage.id}
                >
                  {onePackage.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
       order.service === "SANITIZATION" || order.service === "DETAILING" ? (
          <div className="fieldAndValue">
            <div id="reoRderField">
              <p>SURFACE</p>
            </div>
            <div id="reOrderColon">
              <p>:</p>
            </div>
            <div id="reOrderValue">
              <select
                onChange={(e) => {
                  setReorderState({
                    ...reOrderState,
                    selectedPackage: e.target.value,
                  });
                }}
              >
                {surfaces.map((oneSurface) => (
                  <option
                    selected={
                      oneSurface === reOrderState.selectedSurface
                        ? "selected"
                        : ""
                    }
                    defaultValue={reOrderState.selectedSurface}
                    value={oneSurface}
                    key={oneSurface}
                  >
                    {oneSurface}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : null
      )}

      <div className="fieldAndValue">
        <div id="reoRderField">
          <p>DATE</p>
        </div>
        <div id="reOrderColon">
          <p>:</p>
        </div>
        <div id="reOrderValue">
          <DatePicker
            minDate={addDays(new Date(), 1)}
            filterDate={(date) => getDay(date) !== 1}
            selected={reOrderState.selectedDate}
            onChange={(carDate) => {
              var hoursDate = setHours(carDate, 0);
              var minutesDate = setMinutes(hoursDate, 0);
              var finalSubscriptionDate = setHours(minutesDate, 8);
              if (order.packageDuration !== "ONE TIME") {
                setReorderState({
                  ...reOrderState,
                  selectedDate: finalSubscriptionDate,
                });
              } else {
                setReorderState({
                  ...reOrderState,
                  selectedDate: finalSubscriptionDate,
                });
                setOneTimeDateChanged(true);
              }
            }}
          />
        </div>
      </div>
      {order.packageDuration === "MONTHLY" ||
      order.packageDuration === "QUARTERLY" ||
      order.packageDuration === "HALF YEARLY" ||
      order.packageDuration === "YEARLY" ? (
        <div className="fieldAndValue">
          <div id="reoRderField">
            <p>DURATION</p>
          </div>
          <div id="reOrderColon">
            <p>:</p>
          </div>
          <div id="reOrderValue">
            <select
              onChange={(e) => {
                setReorderState({
                  ...reOrderState,
                  selectedDuration: e.target.value,
                });
                console.log(e.target.value);
              }}
            >
              {durationArray.map((oneDuration) => (
                <option
                  selected={
                    oneDuration === reOrderState.selectedDuration
                      ? "selected"
                      : ""
                  }
                  defaultValue={reOrderState.selectedDuration}
                  value={oneDuration}
                  key={oneDuration}
                >
                  {oneDuration}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
        <div className="fieldAndValue">
          <div id="reoRderField">
            <p>TIME</p>
          </div>
          <div id="reOrderColon">
            <p>:</p>
          </div>
          <div id="reOrderValue">
              <DatePicker
                disabled={reOrderState.selectedDate === null}
              showTimeSelect={true}
              showTimeSelectOnly
              minTime={setHours(setMinutes(new Date(), 0), 10)}
              maxTime={setHours(setMinutes(new Date(), 30), 18)}
              selected={oneTimeDateChanged ? null : reOrderState.selectedTime}
              timeIntervals={60}
              timeCaption="Time"
              dateFormat="h:mm aa"
              onChange={(mytime) => {
                console.log(reOrderState);

                console.log(mytime);
                var hours = getHours(mytime);
                var mins = getMinutes(mytime);

                var hoursDate = setHours(reOrderState.selectedDate, hours);
                var MinutesDate = setMinutes(hoursDate, mins);
                console.log(MinutesDate);
                setReorderState({
                  ...reOrderState,
                  selectedTime: MinutesDate,
                });
                setOneTimeDateChanged(false);
                console.log(reOrderState);
              }}
            />
          </div>
        </div>
      )}

      <div className="fieldAndValue">
        <div id="reoRderField">
          <p>PRICE</p>
        </div>
        <div id="reOrderColon">
          <p>:</p>
        </div>
        <div id="reOrderValue">
          <p>
            {" "}
            Rs.{" "}
            {
              tempworkaroundDuration(
                car.carType,
                order.service,
                reOrderState.selectedPackage,
                reOrderState.selectedDuration
              ).discountPrice
            }
          </p>
        </div>
      </div>
      {/* <div className="completeCareSection">
        <div className="leftCompleteCare">
          {" "}
          <input type="checkbox"></input>
        </div>
        <div className="rightCompleteCare">
          <p>COMPLETE CARE</p>
          <small>this is testing data to test the description of complete care</small>
        </div>
      </div> */}
      <div className="reOrderPopupBtnContainer">
        <button onClick={() => addItemsToSyncCart()}>ADD TO CART</button>
      </div>
    </div>
  );
}
