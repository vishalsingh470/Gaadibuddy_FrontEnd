import React from 'react'
import './totalprice.css'
export const TotalPrice = (props) => {
    return (
      <div className="totalPriceContainer">
        <h2>Total Price</h2>
        <table>
          <tbody>
            <tr className="SubtotalTable">
              <td id="td1">
                <h3> Sub Total </h3>
              </td>
              <td id="td2">
                <h3> : </h3>
              </td>
              <td id="td3">
                <h3>Rs {props.subTotal}</h3>
              </td>
            </tr>
            <tr className="gstTbale">
              <td id="td1">
                <h3>GST (18%)</h3>
              </td>
              <td id="td2">
                <h3> : </h3>
              </td>
              <td id="td3">
                {" "}
                <h3>Rs {props.GST}</h3>
              </td>
            </tr>
            <div className="totalPriceHr">
              <hr></hr>
            </div>

            <tr className="totalTable">
              <td id="td1">
                <h3>Total</h3>
              </td>
              <td id="td2">
                <h3> : </h3>
              </td>
              <td id="td3">
                <h3>
                  Rs {Math.round((props.subTotal + props.GST) * 100) / 100}
                </h3>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
}