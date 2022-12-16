import React,{useEffect,useState} from 'react'
import { baseUrl } from '../variables/variables';
export default function IoclPastCustomers() {
const [pastUsers,setPastUsers] = useState([])
    const fetchAllIoclCustomers = async () => {
      await fetch(`${baseUrl}ioclCustomers`)
        .then((res) => res.json())
        .then((resp) => {
          if (resp.IndianOilCustomerss !== undefined) {
            setPastUsers(resp.IndianOilCustomerss);
           
          }
        }); //setState
    };


console.log(pastUsers)
    useEffect(() => {
        fetchAllIoclCustomers()
},[])
    return (
        <div className="iocl-pastCustomers">
            {
                pastUsers.map((onePastUser) => <div className="iocl-onePastOrder">
                    <p>{onePastUser.name}</p>
                    <p>{onePastUser.mobileNo}</p>
                    <p>{onePastUser.email}</p>
                    <p>{onePastUser?.cars[0]?.carType}</p>
                    <p>{onePastUser?.cars[0]?.details}</p>
                    <p>{onePastUser?.cars[0]?.carNo}</p>
                </div>)
            }
        </div>
    )
}
