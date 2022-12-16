import React, { useState,useEffect }from 'react'
import './SignInMobile.css'
import { resetMyError } from '../../../../Redux/Error/errorActions';
import { useDispatch,useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import useForm from '../useForm';
import ValidateSignIn from '../validateLogin'
import eyeclose from '../../../../Image/eye-closed.svg';
import eyeopen from '../../../../Image/eye.svg';
import eye from '../../../../Image/eye.svg';
import Loader from "react-loader-spinner";


export default function SignInMobile(props) {
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
    <div className="signInMobileContainer">
      <div className="top-SigninMobile">
        <p>LOGIN</p>
      </div>
      <div className="middle-SigninMobile">
        <div className="middle-loginmobile-1">
          <div className="signin-input">
            <input
              name="phone"
              type="text"
              value={Item.phone}
              onChange={handleChange}
              placeholder="Enter Mobile No"
            ></input>
          </div>
          <div className="signin-error">
            {error.phone && <p>{error.phone}</p>}
          </div>
        </div>
        <div className="middle-loginmobile-2">
          <div className="signin-input">
            <input
              id="passwordLogin"
              placeholder=" Enter Password"
              name="password"
              type="password"
              value={Item.password}
              onChange={handleChange}
            ></input>
          </div>
          <div className="signin-error">
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
        <div className="middle-loginmobile-3">
          {myerror ?? <p>{myerror}</p>}
        </div>
      </div>
      <div className="bottom-SigninMobile">
        <div className="bottom-signinMobile-1">
          <button onClick={(e) => handleSubmitMobile(e)}>
            {Loading ? (
              <Loader
                type="Oval"
                color="white"
                height="30"
                width="60"
                visible={Loading}
                style={{
                  width: "60%",

                  zIndex: 3000,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "7vw",
                }}
              />
            ) : (
              "LOGIN"
            )}
          </button>
        </div>
        <div className="bottom-signinMobile-2">
          <small style={{ color: "black" }}>Not Registered ? </small>
          <Link to="signup">
            <strong style={{ color: "#024126" }}>SIGNUP </strong>
          </Link>
        </div>
        <div className="bottom-signinMobile-3">
          <Link to={{ pathname: "/forgotpass" }}>Forgot Password</Link>
        </div>
      </div>
    </div>
  );
}
