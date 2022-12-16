import React from "react";
import { compareAsc, differenceInDays } from "date-fns";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { baseUrl } from "../../../variables/variables";
import { updateOrder, updateImage } from "../../../Redux/UserRedux/UserActions";
export default function Myordersuseform(props) {
  //variables
  const width = { matches: window.matchMedia("(min-width: 768px)").matches };
  const scrollOffset = 800;
  const txtLength = -4;
  const renrewBuffer = 5;
  //useSelectors
  const user = useSelector((state) => state.user.customer);
  //useDispacth4
  const dispatch = useDispatch();
  //states
  const [myCar, setCar] = useState(
    user.cars[0]?.orders.length !== 0 ? user.cars[0] : user.cars[1]
  );
  //useEffects

  const filteredCars = user.cars.filter(
    (car) => car?.details === myCar?.details
  );

  const filteredServices = filteredCars[0]?.orders?.filter(
    (oneCar) => oneCar.service === "WASHING"
  );
  console.log(filteredServices,"filtered")
  const subScriptionOrders = filteredCars[0]?.orders?.filter(
    (oneCar) =>
      oneCar?.service === "WASHING" && oneCar?.packageDuration !== "ONE TIME"
  );
//todo counts from 5 4 3 2 1 if -ve value it means the renew buffer is over
  const ordersToBeRenewed = subScriptionOrders?.filter(
    (oneOrder) =>
      differenceInDays(
        new Date(
          oneOrder?.dailySchedules[oneOrder?.dailySchedules?.length - 1]?.start
        ),
        new Date()
      ) > 0 &&
      differenceInDays(
        new Date(
          oneOrder?.dailySchedules[oneOrder?.dailySchedules?.length - 1]?.start
        ),
        new Date()
      ) < renrewBuffer
  );
  console.log(ordersToBeRenewed,"renewed");
//todo diffrence from today and previous day will give a +ve value
  const pastOrders = filteredCars[0]?.orders?.filter(
    (oneOrder) =>
      differenceInDays(
        new Date(),
        new Date(
          oneOrder?.dailySchedules[oneOrder.dailySchedules?.length - 1]?.start
        )
      ) > 0
  );
  function log(data) {
    console.log(data)
  }
 
  console.log("past orders", pastOrders)
  
  const FindOnlySubcriptions = () => {
    //todo get only subscriptions
    console.log(ordersToBeRenewed, "ORDERS TO BE RENEWED");
    console.log(pastOrders,"PAST ORDERS")

  };

 
  const [refresh,setRefresh] = useState(false)
  useEffect(() => {
    document.body.scrollTop = 0;
    !width.matches ? props.click() : (document.body.scrollTop = 0);
    updateOrders(myCar?.id);
    FindOnlySubcriptions();
    if (user.cars.length !== 0) {
      user.cars.map((oneCar) => updateOrders(oneCar?.id));
    }
  }, []);

  

  useEffect(() => {
    setRightData({ filteredOrders: temp });
    updateOrders(myCar?.id);
  }, [myCar]);

  const updateOrders = async (carId) => {
    await fetch(`${baseUrl}orders/car/${carId}`)
      .then((res) => res.json())
      .then((resp) => {
        if (resp.ordersOfCar !== undefined) {
          console.log(resp.ordersOfCar);
          dispatch(updateOrder({ carId: carId, orders: resp.ordersOfCar }));
          setRefresh(!refresh)
        }
      })
      .catch((err) => console.log("unable to update"));
  };

  const [rightData, setRightData] = useState({
    service: "",
    package: "",
    filteredOrders: [],
  });
  const superdailyStatus = [];
  if (filteredCars !== undefined) {
    filteredCars.map((car) =>
      car.orders?.map((order) =>
        order.dailySchedules?.map((l) => superdailyStatus.push(l))
      )
    );
  }

  const returnTodaysEvent = () => {
    const temp = superdailyStatus.filter(
      (oneOrder) =>
        new Date(oneOrder.start).toDateString() === new Date().toDateString()
    );
    if (temp.length !== null) {
      return temp;
    }
  };

  const temp = returnTodaysEvent();

  const carsWithOrder = user.cars.filter((car) => car.orders?.length !== 0);

  const DoubleClickHandler = (day, event) => {
    const filteredOrders = superdailyStatus.filter(
      (dailyjob) =>
        new Date(dailyjob.start).toDateString() === new Date(day).toDateString()
    );
console.log(event,"event")
    setRightData({
      service: event.service,
      serviceStatus: event.serviceStatus,
      package: event.serviceType,
      filteredOrders: filteredOrders,
    });
    console.log(filteredOrders);
    let JobSToFetcImage = [];
    if (filteredOrders.length !== 0) {
      JobSToFetcImage = filteredOrders.filter(
        (oneOrder) =>
          //checking if base^4 already exists
          oneOrder.imageUrl !== undefined &&
          oneOrder.imageUrl.substr(txtLength) === ".txt"
      );
      width.matches
        ? document.body.scrollTo({
            top: scrollOffset,
            behavior: "smooth",
          })
        : document.body.scrollTo({
            top: scrollOffset,
            behavior: "smooth",
          });
    }
    console.log(JobSToFetcImage, "jobs to upload");
    JobSToFetcImage.map((oneJob) => getBase64(oneJob._id));
  };
  const getBase64 = (eventId) => {
    console.log(eventId);
    fetch(`${baseUrl}imageUpload/${eventId}`)
      .then((resp) => resp.json())
      .then((res) => {
        if (res.imgSource !== undefined) {
          console.log("success");

          dispatch(updateImage({ eventId: eventId, image: res.imgSource }));
        }
      })
      .catch((err) => {
        console.log("failed to get ");
      });
  };

  return {
    width,
    myCar,
    setCar,
    getBase64,
    DoubleClickHandler,
    baseUrl,
    filteredCars,
    filteredServices,
    rightData,
    temp,
    carsWithOrder,
    superdailyStatus,
    user,
    ordersToBeRenewed,
    pastOrders
  };
}
