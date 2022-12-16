import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import history from "../../../../history/history";
import happy from "../../../../Image/happy.png";
import sad from "../../../../Image/sad.png";
import { addOrder, RemoveFromCart } from "../../../../Redux/UserRedux/UserActions";
import { baseUrl } from "../../../../variables/variables";
import "./Confirmation.css";
export const Confirmationpage = (props) => {
  const user = useSelector((state) => state.user.customer);
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  console.log("props in confirmation are:",props);

  // const passOrders = async () => {
  
  // props.location !== undefined 
  //   ?await props.location.orders.map((oneOrder) => fetchUpdatedOrders(oneOrder._id))
  //   :await history.goBack()
  // };
  // async function fetchUpdatedOrders(orderId) {
  //   //todo generating dailySchedules
  //   await setLoading(true);
  //   const Confimed = await fetch(`${baseUrl}orders/dailyStatus/${orderId}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }).then((response) => response.json());
  //   console.log(Confimed);
  //   await fetch(`${baseUrl}orders/dailyStatus/${Confimed.order.id}`)
  //     .then((response) => response.json())
  //     .then((result) =>
  //     {
  //       if(result.order !== undefined)
  //      { dispatch(addOrder(result.order))
  //        setLoading(false)}
  //     }
  //     )
       
          
         
       
        
        
     
  //     }

  
  useEffect(() => {
    document.body.scrollTop = 0;
    props.location?.status === "success"
      ? console.log("recieved successfully")
      :  history.push("myorders")
    // passOrders();
  }, []);

  return (
    <div className="confirmationPageContainer">
      {props.location?.status === "success" ? (
        <div className="successContainer">
          <div className="imagecontainerConfirm">
            <img alt={happy} src={happy}></img>
          </div>
          <div className="confirmationHeader">
            <h1>Order Confirmed!!</h1>
          </div>
          <div>
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
          <div className="confirmationMessage">
            
              <p>
                Track your order in My Orders page.
              </p>
            
          </div>
          {/* <div className="exploreMore">
            <button>
              <Link
                style={{ textDecoration: "none" }}
                to={{ pathname: "/services/washing" }}
              >
                <p>EXPLORE MORE SERVICES >></p>
              </Link>
            </button>
          </div> */}
        </div>
      ) : (
        <div className="failureContainer">
          <div className="imagecontainerConfirm">
            <img alt={sad} src={sad}></img>
          </div>
          <div className="confirmationHeader">
            <h1>Payment Failed</h1>
          </div>

          <div className="confirmationMessage">
            <p>We're having trouble while processing your payment.Try again</p>
          </div>
          <div className="exploreMore">
            <button
              onClick={() => history.goBack()}
              style={{
                color: "white",
                backgroundColor: "#024126",
                marginTop: "1vw",
                width: "10rem",
                border: "none",
              }}
            >
              TRY AGAIN
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
