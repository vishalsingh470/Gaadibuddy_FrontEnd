import React from "react";
import "./HowItWorksComp.css";
import relax from "../../../../Image/relax.webp";
import agent from "../../../../Image/agent1.webp";
import bookservice from "../../../../Image/bookservice.webp";
import selectservice from "../../../../Image/selectservice.webp";

const HowItWorks = () => {
  return (
    <div>
      <h1 style={{ marginBottom: "5%" ,textAlign:'center'}}>HOW IT WORKS</h1>
      <div className="howitworks-container">
        <div className="howItWorks1">
          <div className="top left">
            <img src={selectservice} alt={selectservice}></img>
          </div>

          <div className="middle">
            <li></li>
          </div>

          <div className="bottom right">
            <p style={{ marginBottom: "-0.2vh",fontWeight:'600' }}>SELECT A SERVICE</p>
            <label>Select a service best suited for your car.</label>
          </div>
        </div>

        <div className="howItWorks2">
          <div className="top left">
            <p style={{ marginBottom: "-0.2vh",fontWeight:'600' }}>BOOK A SERVICE</p>
            <label>After choosing, book the service with just a click.</label>
          </div>
          <div className="middle">
            <div>
              <li></li>
            </div>

            <div className="dots">
              <hr></hr>
            </div>
          </div>
          <div className="bottom right">
            <img src={bookservice} alt={bookservice}></img>
          </div>
        </div>

        <div className="howItWorks3">
          <div className="top left">
            <img src={agent} alt={relax}></img>
          </div>
          <div className="middle">
            <div className="dots">
              <hr></hr>
            </div>
            <li></li>
          </div>
          <div className="bottom right">
            <p style={{ marginBottom: "-0.2vh",fontWeight:'600' }}>WAIT FOR AGENT</p>
            <label>Our agent will arrive at your doorstep.</label>
          </div>
        </div>

        <div className="howItWorks4">
          {" "}
          <div className="top left">
            <p style={{ marginBottom: "-0.2vh",fontWeight:'600' }}>RELAX</p>
            <label>Sit and relax while we take care of your car.</label>
          </div>
          <div className="middle">
            {" "}
            <li></li>
            <div className="dots">
              <hr></hr>
            </div>
          </div>
          <div className="bottom right">
            {" "}
            <img src={relax} alt={relax}></img>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HowItWorks;
