import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router';
import "./iocl.css";
import { baseUrl } from '../variables/variables';
export default function IoclMainPage() {

    const [user, setUser] = useState({
        name: null,
        email: null,
        mobileNo: null,
        cars: [{
            details: null,
            carName: null,
            carNo: null,
            carType: null,
            id:null
        }],
        order:[{
            service: null,
            package: null,
            orderDate: null,
            price:null
        }]
    
    })
    
    const getUserById = async () => {
        const userId = localStorage.getItem("ioclUserId")
        if (userId === undefined || userId === null) {
             await fetch(`${baseUrl}ioclCustomers/${userId}`).then((res) =>
               res.json()
             ).res((result) => {
                 if (result.customer === undefined) {
                     setUser({
                       name: result.customer.name,
                       email: result.customer.email,
                       mobileNo: result.customer.mobileNo,
                       cars: result.customer?.cars,
                       order:
                         result.customer?.cars[0]?.orders === undefined
                           ? []
                           : result.customer?.cars[0]?.orders,
                     });
                 }
             })
        }
    }


    const history = useHistory();

    useEffect(() => {
        
    }, [])
    
    return (
      <div className="ioclMainPageContainer">
        <div className="past-order" onClick={() => history.push("/ioclPast")}>
          past customers
        </div>
        <div
          className="iocl-customer-card"
          onClick={() => history.push("/ioclAddCustomer")}
        >
          {user.name === null ? (
            <h1>ADD CUSTOMER</h1>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p>{user.name}</p>
              <p>{user.mobileNo}</p>
              <p>{user.email}</p>
            </div>
          )}
        </div>
        <div
          className="iocl-car-card"
          onClick={() => history.push("/ioclAddCarPage")}
        >
          {user.cars[0]?.carNo === null ? (
            <h1>ADD CAR</h1>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p>{user.cars[0].carType}</p>
              <p>{user.cars[0].carNo}</p>
              <p>{user.cars[0].details}</p>
              <p>{user.cars[0].carMake}</p>
            </div>
          )}
        </div>
        <div
          className="iocl-order-card"
          onClick={() => history.push("/ioclOrder")}
        >
          {user.order[0]?.orderDate === null ? (
            <h1>ADD ORDER</h1>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p>{user.order[0]?.orderDate}</p>
              <p>{user.order[0]?.service}</p>
              <p>{user.order[0]?.package}</p>
            </div>
          )}
        </div>
        <div className="iocl-button">
          <button>RESET</button>
        </div>
      </div>
    );
}
