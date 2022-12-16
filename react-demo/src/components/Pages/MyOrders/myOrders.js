import moment from "moment";
import React, { useState } from "react";
import sad from "../../../Image/sad.webp";
import AlternateSub from "../../UI/content/ActiveSubscriptionComponent/alternateSub";
import "./myOrders.css";
import Myordersuseform from "./myOrders.useform";
import RenewNotification from "./RenewNotification/RenewNotification";
import ReorderPopup from "./ReorderPopup/ReorderPopup";
import RIghtOrder from "./RIghtOrder";
import { differenceInDays, format } from "date-fns";
const MyOrders = (props) => {
  const {
    DoubleClickHandler,
    filteredServices,
    getBase64,
    myCar,
    rightData,
    setCar,
    temp,
    carsWithOrder,
    user,
    superdailyStatus,
    ordersToBeRenewed,
    pastOrders,
  } = Myordersuseform(props);
  const width = { matches: window.matchMedia("(min-width: 768px)").matches };
  let tempWashing = [];
  const [popupToggle, setPopupToggle] = useState({
    toggle: false,
    selectedOrder: null,
  });

  const [presentOrderToggle, setPresentOrderToggle] = useState(true);
  const toggleReorderPopup = (order) => {
    setPopupToggle({ toggle: true, selectedOrder: order });
  };

  let pastOrdersWashing = pastOrders?.filter(
    (oneOrder) =>
      oneOrder.packageDuration === "MONTHLY" ||
      oneOrder.packageDuration === "QARTERLY" ||
      oneOrder.packageDuration === "HALF YEARLY" ||
      oneOrder.packageDuration === "YEARLY"
  );

  let finalPastOrderWashing = [];
  if (pastOrdersWashing === undefined) {
  } else {
    pastOrdersWashing.map((order) => {
      tempWashing.push({
        days: differenceInDays(new Date(), new Date(order.serviceEndDate)),
        Order: order,
      });
    });
    console.log(tempWashing, "dates in washing difffrence");
    if (tempWashing.length !== 0) {
      const temp1 = tempWashing.reduce(function (a, b) {
        return a.days < b.days ? a : b;
      });

      console.log(temp1);

      finalPastOrderWashing = [temp1.Order];
    }
  }
  // pastOrdersWashing = [pastOrdersWashing[pastOrdersWashing.length - 1]];

  console.log(finalPastOrderWashing);
  const pastOrdersOneTime = pastOrders?.filter(
    (oneOrder) => oneOrder.packageDuration !== "MONTHLY"
  );

  return (
    <div>
      {carsWithOrder.length === 0 ? (
        <div className="noMyOrders">
          <img src={sad} alt={sad}></img>
          <h1 style={{ height: "100vh", textAlign: "center" }}>
            No Orders Yet
          </h1>
        </div>
      ) : (
        <div
          className="myOrderMainContainer"
          id={popupToggle.toggle ? "open" : "close"}
        >
          {popupToggle.toggle ? (
            <ReorderPopup
              closePopUp={() => {
                setPopupToggle({ ...popupToggle, toggle: false });
              }}
              order={popupToggle.selectedOrder}
              car={myCar}
            />
          ) : null}

          <div>
            <h1 style={{ textAlign: "center" }}>MY ORDERS</h1>
          </div>
          <div className="present-past-toggle">
            <button
              style={{
                textDecorationColor: "#D8401E",

                color: presentOrderToggle ? "#D8401E" : "black",
                borderBottomStyle: presentOrderToggle ? "solid" : "none",
              }}
              onClick={() => setPresentOrderToggle(true)}
            >
              PRESENT
            </button>{" "}
            <button
              style={{
                borderBottomStyle: !presentOrderToggle ? "solid" : "none",
                textDecorationColor: "#B00F00",
                color: !presentOrderToggle ? "#B00F00" : "black",
              }}
              onClick={() => setPresentOrderToggle(false)}
            >
              PAST
            </button>{" "}
          </div>
          <div className="myOrders-picker-container">
            <div className="myOrders-cars-picker">
              {carsWithOrder.map((oneCar) => (
                <div
                  onClick={() => setCar(oneCar)}
                  id="carPicker"
                  className="carPickerClass"
                  key={oneCar.id}
                  style={{
                    backgroundColor:
                      oneCar?.details === myCar?.details ? "#024126" : "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRight:
                      oneCar.details ===
                      carsWithOrder[carsWithOrder.length - 1].details
                        ? "2px solid #024126"
                        : "none",
                    borderTopRightRadius:
                      oneCar.details ===
                      carsWithOrder[carsWithOrder.length - 1].details
                        ? "5px"
                        : "none",
                    borderBottomRightRadius:
                      oneCar.details ===
                      carsWithOrder[carsWithOrder.length - 1].details
                        ? "5px"
                        : "none",

                    borderLeft:
                      oneCar.details ===
                      carsWithOrder[carsWithOrder.length - 1].details
                        ? "2px solid #024126"
                        : "2px solid #024126",
                  }}
                >
                  <div className="oneCarBox">
                    <p
                      style={{
                        color:
                          oneCar.details === myCar.details ? "white" : "black",

                        height: width.matches ? "2rem" : "1.5rem",
                        minWidth: width.matches ? "5rem" : "18rem",
                        paddingLeft: width.matches ? "0%" : "0%",
                        paddingRight: width.matches ? "0%" : "0%",
                        fontSize: width.matches ? "normal" : "smaller",
                        whiteSpace: "wrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        paddingBottom: width.matches ? "0%" : "1%",
                      }}
                    >
                      {oneCar.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="renewNotificationsContainer">
            {ordersToBeRenewed.length !== 0 ? (
              <RenewNotification
                orders={ordersToBeRenewed}
                toggleReorderPopup={(o) => toggleReorderPopup(o)}
                car={myCar}
              />
            ) : null}
          </div>

          {superdailyStatus.length === 0 ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h1>No Orders yet</h1>
            </div>
          ) : (
            <div>
              {presentOrderToggle ? (
                <div className="carCard">
                  <div key={myCar.id} className="oneOrderBox">
                    <div className="ActiveOrdersContainer">
                      <div className="leftOrder">
                        <AlternateSub
                          superdailyStatus={superdailyStatus}
                          doubleClickHandler={DoubleClickHandler}
                        />
                      </div>
                      <div className="rightOrder">
                        <div style={{ display: "flex" }}>
                          <p id="myOrdersTopic">Car Name</p>
                          <p>:</p>
                          <p id="myOrdersData">{myCar.details}</p>
                        </div>
                        <div style={{ display: "flex" }}>
                          <p id="myOrdersTopic">Car No</p>
                          <p>:</p>
                          <p id="myOrdersData">
                            {user.cars.map((car) =>
                              car.details === myCar.details ? car.carNo : null
                            )}
                          </p>
                        </div>
                        {rightData.filteredOrders.length === 0 ? (
                          temp.length !== 0 &&
                          new Date(
                            filteredServices[0]?.dailySchedules[0]?.start
                          ).toDateString() === new Date().toDateString() ? (
                            <div>
                              <div style={{ display: "flex" }}>
                                <p id="myOrdersTopic">Service</p>
                                <p>:</p>
                                <p id="myOrdersData">{temp[0].service}</p>
                              </div>
                              {temp[0].service === "WASHING" &&
                              temp[0].service !== "DETAILING" ? (
                                <div style={{ display: "flex" }}>
                                  <p id="myOrdersTopic">Package</p>
                                  <p>:</p>
                                  <p id="myOrdersData">
                                    {temp[0].serviceType === "One Time"
                                      ? "ONE TIME"
                                      : temp[0].serviceSurface.replace(
                                          /_/g,
                                          " "
                                        )}
                                  </p>{" "}
                                </div>
                              ) : null}
                              <div>
                                {temp[0].service === "DETAILING" ? (
                                  <div style={{ display: "flex" }}>
                                    <p id="myOrdersTopic">Package</p>
                                    <p>:</p>
                                    <p id="myOrdersData">
                                      {temp[0].serviceSurface.replace(
                                        /_/g,
                                        " "
                                      )}
                                    </p>
                                  </div>
                                ) : null}
                              </div>
                              <div>
                                {temp[0].serviceType === "Daily" ? (
                                  <div style={{ display: "flex" }}>
                                    <p id="myOrdersTopic">Surface</p>
                                    <p>:</p>
                                    <p id="myOrdersData">
                                      {temp[0].serviceSurface}
                                    </p>
                                  </div>
                                ) : null}
                              </div>

                              <div style={{ display: "flex" }}>
                                <p id="myOrdersTopic">Date</p>
                                <p>:</p>
                                <p id="myOrdersData">
                                  {moment(temp[0].start)
                                    .toString()
                                    .substr(0, 11)}
                                </p>
                              </div>
                              <div style={{ display: "flex" }}>
                                <p id="myOrdersTopic">Time</p>
                                <p>:</p>
                                <p id="myOrdersData">
                                  {moment(temp[0].start)
                                    .toString()
                                    .substr(15, 6)}
                                </p>
                              </div>

                              {temp[0].imageUrl !== undefined ? (
                                <div className="myOrdersImage">
                                  <img
                                    src={temp[0].imageUrl}
                                    alt={temp[0].imageUrl}
                                  ></img>{" "}
                                </div>
                              ) : null}

                              <div className="myOrdersLineContainer">
                                <hr></hr>
                              </div>
                            </div>
                          ) : (
                            <div
                              style={{
                                display: "flex",
                                marginTop: "5%",
                              }}
                            >
                              <p>NO ORDERS THIS DAY</p>
                            </div>
                          )
                        ) : (
                          <div>
                            {rightData.filteredOrders.map((oneOrder) => (
                              <div>
                                {/* empty as it acts as something that re-renders image component */}
                                <RIghtOrder
                                  orderDetails={oneOrder}
                                  image={oneOrder.updatedImage}
                                />
                                <div style={{ display: "flex" }}>
                                  <p id="myOrdersTopic">Service</p>
                                  <p>:</p>
                                  <p id="myOrdersData">
                                    {oneOrder?.service === undefined
                                      ? temp.service
                                      : oneOrder?.service}
                                  </p>
                                </div>
                                {oneOrder?.service === "WASHING" &&
                                oneOrder?.service !== "DETAILING" ? (
                                  <div style={{ display: "flex" }}>
                                    <p id="myOrdersTopic">Package</p>
                                    <p>:</p>
                                    <p id="myOrdersData">
                                      {oneOrder?.serviceType === "One Time"
                                        ? "ONE TIME"
                                        : filteredServices[filteredServices.length-1]?.package.replace(
                                            /_/g,
                                            " "
                                          )}
                                    </p> 
                                  </div>
                                ) : null}
                                <div>
                                  {oneOrder.service === "DETAILING" ? (
                                    <div style={{ display: "flex" }}>
                                      <p id="myOrdersTopic">Package</p>
                                      <p>:</p>
                                      <p id="myOrdersData">
                                        {oneOrder.serviceSurface === undefined
                                          ? temp.serviceSurface.replace(
                                              /_/g,
                                              " "
                                            )
                                          : oneOrder.serviceSurface.replace(
                                              /_/g,
                                              " "
                                            )}
                                      </p>
                                    </div>
                                  ) : null}
                                </div>
                                <div>
                                  {oneOrder.serviceType === "Daily" ? (
                                    <div style={{ display: "flex" }}>
                                      <p id="myOrdersTopic">Surface</p>
                                      <p>:</p>
                                      <p id="myOrdersData">
                                        {oneOrder.serviceSurface}
                                      </p>
                                    </div>
                                  ) : null}
                                </div>

                                <div style={{ display: "flex" }}>
                                  <p id="myOrdersTopic">Date</p>
                                  <p>:</p>
                                  <p id="myOrdersData">
                                    {moment(oneOrder?.start)
                                      .toString()
                                      .substr(0, 11)}
                                  </p>
                                </div>
                                <div style={{ display: "flex" }}>
                                  <p id="myOrdersTopic">Time</p>
                                  <p>:</p>
                                  <p id="myOrdersData">
                                    {moment(oneOrder?.start)
                                      .toString()
                                      .substr(15, 6)}
                                  </p>
                                </div>

                                {oneOrder.updatedImage !== undefined ? (
                                  <div className="myOrdersImage">
                                    <img
                                      src={`data:image/png;base64,${oneOrder.updatedImage}`}
                                      alt={oneOrder.updatedImage}
                                    ></img>
                                  </div>
                                ) : null}

                                <div className="myOrdersLineContainer">
                                  <hr></hr>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="indicationContainer">
                          <div className="oneIndication">
                            <div className="completed"></div>
                            <small>COMPLETED</small>
                          </div>
                          <div className="oneIndication">
                            <div className="missed"></div>
                            <small>MISSED</small>
                          </div>
                          <div className="oneIndication">
                            <div className="pending"></div>
                            <small>PENDING</small>
                          </div>
                          <div className="oneIndication">
                            <div className="carnotpresent"></div>
                            <small
                              style={{ marginTop: width.matches ? 0 : "-0.5%" }}
                            >
                              CAR NOT PRESENT
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                </div>
              ) : (
                <div>
                  {pastOrders?.length === 0 ? (
                    <div className="pastOrdersEmptyCOntainer">
                      <h1>NO PAST ORDERS</h1>
                    </div>
                  ) : (
                    <div className="pastOrders-heading">
                      <h1 style={{ textAlign: "center" }}>PAST ORDERS</h1>
                      {finalPastOrderWashing?.length !== 0 ? (
                        <div className="pastSubscriptons">
                          {finalPastOrderWashing.map((onePastWashing) => (
                            <div className="onePastOrderBox">
                              <div className="PastOrderField">
                                <small>SERVICE</small>
                                <div id="pastOrderValue">
                                  {onePastWashing !== undefined
                                    ? onePastWashing.service
                                        .toLowerCase()
                                        .charAt(0)
                                        .toUpperCase() +
                                      onePastWashing.service
                                        .toLowerCase()
                                        .slice(1)
                                    : ""}
                                </div>
                              </div>
                              <div className="PastOrderField">
                                <small>PACKAGE</small>
                                <div id="pastOrderValue">
                                  {onePastWashing.package
                                    .toLowerCase()
                                    .charAt(0)
                                    .toUpperCase()
                                    .replace(/_/g, " ") +
                                    onePastWashing.package
                                      .toLowerCase()
                                      .slice(1)
                                      .replace(/_/g, " ")}
                                </div>
                              </div>
                              <div className="PastOrderField">
                                <small>AMOUNT PAID</small>
                                <div id="pastOrderValue">
                                  {onePastWashing.amountPaid / 100}
                                </div>
                              </div>
                              <div className="PastOrderField">
                                <small>SERVICE DATE</small>
                                <div id="pastOrderValue">
                                  {`${format(
                                    new Date(onePastWashing.serviceStartDate),
                                    "MMMM"
                                  )}  
                      ${format(
                        new Date(onePastWashing.serviceStartDate),
                        "dd"
                      )}  
                      ${format(
                        new Date(onePastWashing.serviceStartDate),
                        "yyyy"
                      )} `}
                                </div>
                              </div>
                              {/* <div className="PastOrderField">
                    <div id="pastOrderValue">
                      {new Date(onePastWashing.serviceEndDate).toDateString()}
                    </div>
                  </div> */}
                              <div className="pastOrderBoxButton">
                                <button
                                  onClick={() =>
                                    toggleReorderPopup(onePastWashing)
                                  }
                                >
                                  RE-ORDER
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : null}
                      {pastOrdersOneTime?.length !== 0 ? (
                        <div className="pastoneTime">
                          {pastOrdersOneTime?.map((pastOneTime) => (
                            <div className="onePastOrderBox">
                              <div className="PastOrderField">
                                <small>SERVICE</small>
                                <div id="pastOrderValue">
                                  {pastOneTime.service
                                    .toLowerCase()
                                    .charAt(0)
                                    .toUpperCase() +
                                    pastOneTime.service.toLowerCase().slice(1)}
                                </div>
                              </div>
                              <div className="PastOrderField">
                                <small>PACKAGE</small>
                                <div
                                  id="pastOrderValue"
                                  className="packageOldOrder"
                                >
                                  <p>
                                    {pastOneTime.package
                                      .toLowerCase()
                                      .charAt(0)
                                      .toUpperCase() +
                                      pastOneTime.package
                                        .toLowerCase()
                                        .slice(1)
                                        .replace(/_/g, " ")}
                                  </p>
                                </div>
                              </div>
                              <div className="PastOrderField">
                                <small>AMOUNT PAID</small>
                                <div id="pastOrderValue">
                                  Rs {pastOneTime.amountPaid / 100}
                                </div>
                              </div>
                              <div className="PastOrderField">
                                <small>SERVICE DATE</small>
                                <div id="pastOrderValue">
                                  {`${format(
                                    new Date(pastOneTime.serviceStartDate),
                                    "MMMM"
                                  )}  
                      ${format(new Date(pastOneTime.serviceStartDate), "dd")}  
                      ${format(
                        new Date(pastOneTime.serviceStartDate),
                        "yyyy"
                      )} `}
                                </div>
                              </div>
                              <div className="pastOrderBoxButton">
                                <button
                                  onClick={() =>
                                    toggleReorderPopup(pastOneTime)
                                  }
                                >
                                  RE-ORDER
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default MyOrders;
