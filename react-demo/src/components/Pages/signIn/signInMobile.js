import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import eyeclose from "../../../Image/eye-closed.svg";
import eye from "../../../Image/eye.png";
import eyeopen from "../../../Image/eye.svg";
import { resetMyError } from "../../../Redux/Error/errorActions";
import "./signin.css";
import useForm from "./useForm";
import ValidateSignIn from "./validateLogin";
 
 
export const SigninMobile = (props) => {
  const dispatch = useDispatch();
  const [forgotPassWord, setForPassword] = useState(false);

  const myerror = useSelector((state) => state.error.errorMessage);

  const {
    Item,
    handleChange,
    handleSubmit,
    error,
    Loading,
    handleSubmitMobile,
  } = useForm(submit, ValidateSignIn);
  console.log(Item);

  useEffect(() => {
    document.body.scrollTop = 0;

    dispatch(resetMyError());
  }, []);

  const [textType, setTextType] = useState(true);
  const passwordToggle = () => {
    setTextType(!textType);
  };
  function submit() {}
  return (
    <div
      className="mobileSigniContainer"
      style={{ minHeight: "100vh", height: "100%", marginBottom: "2rem" }}
    >
      {!forgotPassWord ? (
        <div className="signinFormMobile">
          <h1 className="Login-login">LOGIN</h1>
          <div className="mobileSignupInputContainer">
            <div className="phoneContainerLogin">
              <input
                name="phone"
                type="text"
                value={Item.phone}
                onChange={handleChange}
                placeholder="Enter Mobile No"
              />
              <div style={{minHeight:'10%'}}>

              {error.phone && <p>{error.phone}</p>}
              </div>
            </div>

            <div className="paswwordContainerLogin">
              <input
                id="passwordLogin"
                placeholder=" Enter Password"
                name="password"
                type="password"
                value={Item.password}
                onChange={handleChange}
                
              />
              {error.password && <p>{error.password}</p>}
            </div>
          </div>
          <div className="eyeContainer">
            {!textType ? (
              <img
                onClick={() => {
                  passwordToggle();
                  const i = document.getElementById("passwordLogin");
                  i.type = textType ? "text" : "password";
                }}
                src={eyeopen}
                alt={eye}
                height="20"
              ></img>
            ) : (
              <img
                onClick={() => {
                  passwordToggle();
                  const i = document.getElementById("passwordLogin");
                  i.type = textType ? "text" : "password";
                }}
                src={eyeclose}
                alt={eye}
                height="20"
              ></img>
            )}
          </div>
          <div className="errorContainer" style={{minHeight:'2%'}}>
            {myerror ? (
              <small style={{  color: "red" }}>
                {myerror}
              </small>
            ) : null}
          </div>
          <div className="buttonContainer">
            <button
              type="submit"
              onClick={(e) => handleSubmitMobile(e)}
              style={{ marginTop: "1rem", marginBottom: "1rem",width:'6rem' }}
            >
              {Loading ? (
                <Loader
                  type="Oval"
                  color="white"
                  height="30"
                  width="60"
                  visible={Loading}
                  style={{
                    width: "40%",

                    zIndex: 3000,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: '7vw'
                  }}
                />
              ) : "LOGIN"}
            </button>
          </div>

          <div className="signupContainerText">
            <Link to="signup">
              <small style={{ color: "black" }}>
                Not Registered ?{" "}
                <strong style={{ color: "#024126" }}>SIGNUP </strong>
              </small>
            </Link>
          </div>
          <div className="forGotContainer">
            <Link to={{ pathname: "/forgotpass" }}>Forgot Password</Link>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {}
          </div>
        </div>
      ) : (
        <div>
          <h1>hello</h1>
        </div>
      )}
    </div>
  );
};
