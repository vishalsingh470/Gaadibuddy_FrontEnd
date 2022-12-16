import React from 'react';
import './RenewNotification.css'
import format from 'date-fns/format';
export default function RenewNotification(props) {
  console.log(props)
    return (
      <div>
        {props.orders.map((oneOrder) => (
          <div className="notificationContainer">
            <p>
              {`${oneOrder.package} package for ${
                props.car.details
              } is expiring on ${format(
                new Date(oneOrder.serviceEndDate),
                "  MMMM dd yyyy"
              )} `}{" "}
            </p>
            <strong
              style={{}}
              onClick={() => props.toggleReorderPopup(oneOrder)}
            >
              RENEW
            </strong>{" "}
            {/* <button onClick={() => props.toggleReorderPopup(oneOrder)}></button> */}
          </div>
        ))}
      </div>
    );
}
