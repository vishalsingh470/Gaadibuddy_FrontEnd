import React from "react";
import "./Backdrop.css";
import { useSelector } from "react-redux";
export const Backdrop = (props) => (
  <div className="backdrop" onClick={props.click} />
);

export const LoginBackdrop = (props) => {
  const isSignedIn = useSelector((state) => state.user.UserSignedIn);
  const LoginToggle = useSelector((state) => state.loginToggle.Toggle);

  return (
    <div
      className={
        !isSignedIn && LoginToggle ? "Loginbackdrop" : "LoginbackdropClosed"
      }
      onClick={props.click}
    />
  );
};
