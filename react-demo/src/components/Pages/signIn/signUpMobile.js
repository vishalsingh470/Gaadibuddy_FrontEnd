import React, { useEffect } from "react";
import "./signin.css";
import history from "../../../history/history";
import { useSelector, useDispatch } from "react-redux";
import { resetMyError } from "../../../Redux/Error/errorActions";
import useForm from "./useForm";
import back from "../../../Image/back.svg";

import useFormSignup from "../SignUp/useForm";
import ValidateSignUp from "../SignUp/validateSignup";
import ValidateSignIn from "./validateLogin";

export const SignupMobile = (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    document.body.scrollTop = 0;
  }, []);
  
  useEffect(() => {
   dispatch(resetMyError())
  },[]);

  console.log(localStorage);
  const myerror = useSelector((state) => state.error.errorMessage);
  // const isSignedIn = useSelector((state) => state.user.UserSignedIn);
  const { Item } = useForm(submit, ValidateSignIn);
  console.log(Item);
  const {
    ItemSingUp,
    handleChangeUp,
    handleSubmitUp,
    errorSignUp,
  } = useFormSignup(submit, ValidateSignUp);

  function submit() {}
  return (
    <div className="mobileSignUpContainer">
      <div className="closeNback">
        <strong onClick={() => history.goBack()}>
          <img alt={back} src={back}></img>{" "}
        </strong>
      </div>

      <form className="signUpForm" noValidate onSubmit={handleSubmitUp}>
        <p className="Login-login">SIGN UP</p>
        <div className="signupMobileForm">
          <div className="inputContainerSignup">
            <input
              placeholder="Name"
              name="name"
              type="text"
              value={ItemSingUp.name}
              onChange={handleChangeUp}
            />
            {errorSignUp.name && <p>{errorSignUp.name}</p>}
          </div>
          <div className="inputContainerSignup">
            <input
              placeholder="Email"
              name="email"
              type="email"
              value={ItemSingUp.email}
              onChange={handleChangeUp}
            />
            {errorSignUp.email && <p>{errorSignUp.email}</p>}
          </div>
          <div className="inputContainerSignup">
            <input
              placeholder="Phone No"
              name="phone"
              type="text"
              value={ItemSingUp.phone}
              onChange={handleChangeUp}
            />
            {errorSignUp.phone && <p>{errorSignUp.phone}</p>}
          </div>
          <div className="inputContainerSignup">
            <input
              placeholder="Password"
              name="password"
              type="password"
              value={ItemSingUp.password}
              onChange={handleChangeUp}
            />
            {errorSignUp.password && <p>{errorSignUp.password}</p>}
          </div>

          {myerror ? <small style={{ margin: "1vw" }}>{myerror}</small> : null}
          <div className="buttonContainerSignup">

          <button type="submit" style={{width:'7rem'}}>SIGN UP</button>
          </div>
        </div>
      </form>
    </div>
  );
};
