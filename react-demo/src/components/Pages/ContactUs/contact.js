import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import call from "../../../Image/call.svg";
import contactTop from "../../../Image/contactus.webp";
import mailbox from "../../../Image/mailbox.svg";
import Location from "../../../Image/location.svg";
import { loginOpen } from "../../../Redux/LoginToggle/LoginActions";
import "./contact.css";
import {
  contactUsHeading,
  email,
  messageHeading,
  adressContact,
  phoneNo,
} from "./contactUs.utils";
import UseFormContact from "./useFormContact";
import ValidateContact from "./validateContact";
const Contact = (props) => {
  const isLogPopup = useSelector((state) => state.loginToggle.Toggle);
  const dispacth = useDispatch();
  useEffect(() => {
    document.body.scrollTop = 0;
    props.click();
    isLogPopup ? dispacth(loginOpen()) : console.log("popup closed");
  }, []);

  const { contact, onChangehandler, onsubmitHandler, error } =
    UseFormContact(ValidateContact);

  return (
    <div className="contactcontainer">
      <div className="upperContact">
        <div>
          <p>{contactUsHeading}</p>
        </div>
        <div>
          <img src={contactTop} alt={contactTop}></img>
        </div>
      </div>
      <div className="middleContact">
        <div className="contactEmail">
          <img src={mailbox} alt={mailbox}></img>
          <p>{email}</p>
        </div>
        <div className="contactPhone">
          <img src={call} alt={call}></img>
          <p>{phoneNo}</p>
        </div>
        <div className="contactAddress">
          <img src={Location} alt={Location}></img>
          <p>{adressContact}</p>
        </div>
      </div>
      <div className="lowerContact">
        <div className="messageHeader">
          <p >Drop in a message</p>
        </div>
        <div className="lowerContact-up">
          <div className="nameInputFiled">
            <label>Name *</label>
            <input
              type="text"
              value={contact.user_name}
              name="user_name"
              onChange={(e) => onChangehandler(e)}
            ></input>
            {error.userName ? <p id="errorContact">{error.userName}</p> : null}
          </div>
          <div className="nameInputFiled">
            <label>Mobile *</label>
            <input
              type="text"
              value={contact.user_mobileno}
              name="user_mobileno"
              onChange={(e) => onChangehandler(e)}
            ></input>
            {error.mobileNo ? <p id="errorContact">{error.mobileNo}</p> : null}
          </div>
          <div className="nameInputFiled">
            <label>Email *</label>
            <input
              type="text"
              value={contact.user_email}
              name="user_email"
              onChange={(e) => onChangehandler(e)}
            ></input>
            {error.email ? <p id="errorContact">{error.email}</p> : null}
          </div>
        </div>
        <div className="loweContact-down">
          <div className="messageInputFiled">
            <label>Message *</label>
            <textarea
              type="text"
              value={contact.message}
              name="message"
              onChange={(e) => onChangehandler(e)}
            ></textarea>
            {error.message ? <p id="errorContact">{error.message}</p> : null}
          </div>
        </div>
      </div>
      <div className="buttonContactContainer">
        <button onClick={(e) => onsubmitHandler(e)}>SEND</button>
      </div>
    </div>
  );
};
export default Contact;
