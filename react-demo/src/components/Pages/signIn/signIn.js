import React, { useEffect, useState } from "react";
import Loader from 'react-loader-spinner';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import back from "../../../Image/back.svg";
import eyeclose from '../../../Image/eye-closed.svg';
import eye from '../../../Image/eye.png';
import eyeopen from '../../../Image/eye.svg';
import { resetMyError } from "../../../Redux/Error/errorActions";
import { loginOpen } from "../../../Redux/LoginToggle/LoginActions";
import { baseUrl } from '../../../variables/variables';
import useFormSignup from "../SignUp/useForm";
import ValidateSignUp from "../SignUp/validateSignup";
import "./signin.css";
import useForm from "./useForm";
import ValidateSignIn from "./validateLogin";
 
const SignInUPComponent = (props) => {
  const dispatch = useDispatch();
 
  const [LoadingSignin, setLoading] = React.useState(false);
  const [mailSent, setMailSent] = React.useState({status:'nothing'});
 const [Email, setEmail] = React.useState({
   email: "",
  
 });
    const [PassWord, setPassWord] = React.useState({
      password: "",
      confirmedPassword: "",
    });
  
 
  const onChangeHandlerEmail = (e) => {
    setEmail({ ...Email, [e.target.name]: e.target.value });
  };
useEffect(()=>{dispatch(resetMyError())} ,[])

  const onSuBmitHandlerEmail = async() => {
     setLoading(true)
    console.log("Scuccsess");
    setSignState('WAITING')
    const response = await fetch(`${baseUrl.toString()}users/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email:Email.email
      }),
    });
    const responseData = await response.json();
    console.log(responseData);
    if (responseData.message !== undefined) {
      setMailSent({status:'sent'})
    }
    else {
       setMailSent({ status: "failed" });
    }
    
      //TODO:here link will be sent to user after response (until response loading screen)

    
  };





  useEffect(() => {
    document.body.scrollTop = 0;
  }, []);
  const [signState, setSignState] = useState("SIGNIN");

  useEffect(() => {
    document.body.scrollTop = 0;
  }, []);

  const myerror = useSelector((state) => state.error.errorMessage);
  const isSignedIn = useSelector((state) => state.user.UserSignedIn);
  const { Item, handleChange, handleSubmit, error,Loading,setItem } = useForm(
    submit,
    ValidateSignIn
  );
  console.log(Item);
  const {
    ItemSingUp,
    handleChangeUp,
    handleSubmitUp,
    errorSignUp,
  } = useFormSignup(submit, ValidateSignUp);

  function submit() {}
  const [textType, setTextType] = useState(true);
  const passwordToggle = () => {
    setTextType(!textType);
  };
  return (
    <div>
      {!isSignedIn ? (
        <div>
          {
            signState === "SIGNIN" ? (
              <div className="signinContainer">
                <div className="signinForm">
                  <form noValidate onSubmit={handleSubmit} id="sigin">
                    <div>
                      <p className="Login-login">LOGIN</p>

                      <div className="phoneContainerLogin">
                        <input
                          maxLength="10"
                          style={
                            error.phone
                              ? {
                                  border: "2px solid red",
                                  height: "2rem",
                                  width: "120%",
                                }
                              : { height: "2rem", width: "120%" }
                          }
                          name="phone"
                          type="text"
                          value={Item.phone}
                          onChange={(event) =>
                            setItem({
                              ...Item,
                              phone: event.target.value.replace(/\D/, ""),
                            })
                          }
                          placeholder="Enter Mobile No"
                        />
                        {error.phone && <p>{error.phone}</p>}
                      </div>
                    </div>
                    <div>
                      <div className="paswwordContainerLogin">
                        <input
                          style={
                            error.password
                              ? {
                                  border: "2px solid red",
                                  height: "2rem",
                                  width: "120%",
                                }
                              : { height: "2rem", width: "120%" }
                          }
                          id="passwordLogin"
                          placeholder=" Enter Password"
                          name="password"
                          type="password"
                          value={Item.password}
                          onChange={handleChange}
                        />
                        {error.password && <p>{error.password}</p>}
                      </div>
                      {!error.password ? (
                        <label
                          style={{
                            position: "relative",
                            top: "-3rem",
                            left: "6rem",
                          }}
                          onClick={() => {
                            passwordToggle();
                            const i = document.getElementById("passwordLogin");
                            i.type = textType ? "text" : "password";
                          }}
                        >
                          <div className="eyeContaineDesktop">
                            {!textType ? (
                              <img src={eyeopen} alt={eye} height="20"></img>
                            ) : (
                              <img src={eyeclose} alt={eye} height="20"></img>
                            )}
                          </div>
                        </label>
                      ) : null}
                    </div>{" "}
                    <div className="errorContainerLoginDesktop" style={{maxHeight:'2rem',minHeight:'2rem'}}>
{myerror ? (
                      <small style={{ color: "red",  }}>
                        {myerror}
                      </small>
                    ) : null}
                    </div>
                    
                    <button
                      type="submit"
                      style={{ marginTop: "0rem", marginBottom: "1rem" }}
                    >
                      LOGIN
                    </button>
                    <div className="signupContainerTextDesktop">
                      <Link onClick={() => setSignState("SIGNUP")}>
                        <small style={{ color: "black" }}>
                          Not Registered ? 
                          <strong style={{ color: "#024126" }}>SIGNUP </strong>
                        </small>
                      </Link>
                    </div>
                    <small
                      style={{
                        cursor: "pointer",
                        position: "relative",
                        left: "0%",
                        marginTop: "2%",
                      }}
                      onClick={() => setSignState("FORGOT")}
                    >
                      Forgot Password
                    </small>
                    <div>
                      {Loading ? (
                        <Loader
                          type="Oval"
                          color="#024126"
                          height="40"
                          width="70"
                          visible={Loading}
                          style={{
                            width: "50%",

                            zIndex: 3000,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        />
                      ) : null}
                    </div>
                  </form>
                </div>
              </div>
            ) : null
            //SIGNUP CONTAIBER STARTS HERE
          }
          {signState === "SIGNUP" ? (
            <div className="signUpContainer">
              <div className="closeNback">
                <strong onClick={() => setSignState("SIGNIN")}>
                  <img alt={back} src={back}></img>{" "}
                </strong>
                <label onClick={() => dispatch(loginOpen())}> {"X"} </label>
              </div>

              <div id="right-side right-sideSP">
                <form noValidate onSubmit={handleSubmitUp} id="signup">
                  <p className="Login-login">SIGN UP</p>
                  <div>
                    <div className="inputContainerSignup">
                      <input
                        style={
                          errorSignUp.name
                            ? {
                                border: "2px solid red",
                                height: "2rem",
                                width: "120%",
                              }
                            : { height: "2rem", width: "120%" }
                        }
                        placeholder="Name"
                        name="name"
                        type="text"
                        value={ItemSingUp.name}
                        onChange={handleChangeUp}
                      />
                      {errorSignUp.name && <p>{errorSignUp.name}</p>}
                    </div>
                  </div>
                  <div>
                    <div className="inputContainerSignup">
                      <input
                        style={
                          errorSignUp.email
                            ? {
                                border: "2px solid red",
                                height: "2rem",
                                width: "120%",
                              }
                            : { height: "2rem", width: "120%" }
                        }
                        placeholder="Email"
                        name="email"
                        type="email"
                        value={ItemSingUp.email}
                        onChange={handleChangeUp}
                      />
                      {errorSignUp.email && <p>{errorSignUp.email}</p>}
                    </div>
                  </div>
                  <div>
                    <div className="inputContainerSignup">
                      <input
                        style={
                          errorSignUp.phone
                            ? {
                                border: "2px solid red",
                                height: "2rem",
                                width: "120%",
                              }
                            : { height: "2rem", width: "120%" }
                        }
                        placeholder="Phone No"
                        name="phone"
                        type="text"
                        value={ItemSingUp.phone}
                        onChange={handleChangeUp}
                      />
                      {errorSignUp.phone && <p>{errorSignUp.phone}</p>}
                    </div>
                  </div>
                  <div>
                    <div className="inputContainerSignup">
                      <input
                        style={
                          errorSignUp.password
                            ? {
                                border: "2px solid red",
                                height: "2rem",
                                width: "120%",
                              }
                            : { height: "2rem", width: "120%" }
                        }
                        id="password"
                        placeholder="Password"
                        name="password"
                        type="password"
                        value={ItemSingUp.password}
                        onChange={handleChangeUp}
                      />

                      {errorSignUp.password && <p>{errorSignUp.password}</p>}
                    </div>
                  </div>
                  {myerror ? (
                    <small style={{ margin: "1vw" }}>{myerror}</small>
                  ) : null}

                  <button style={{ marginTop: "3rem" }} type="submit">
                    SIGN UP
                  </button>
                </form>
              </div>
            </div>
          ) : null}
          {signState === "FORGOT" ? (
            <div className="forgotContainer">
              <div className="closeNbackForgot">
                <strong onClick={() => setSignState("SIGNIN")}>
                  <img alt={back} src={back}></img>{" "}
                </strong>
              </div>

              <form noValidate onSubmit={handleSubmitUp}>
                <p
                  className="Login-login"
                  style={{
                    fontSize: "1.1rem",
                    position: "relative",
                    left: "0.1rem",
                    top: "-2rem",
                  }}
                >
                  PLEASE ENTER YOUR EMAIL
                </p>
                <div>
                  <div className="inputContainerSignup">
                    <input
                      style={{ height: "2rem", width: "12rem" }}
                      placeholder="Enter email"
                      name="email"
                      type="email"
                      value={Email.email}
                      onChange={onChangeHandlerEmail}
                    />
                  </div>
                </div>

                <button type="submit" onClick={onSuBmitHandlerEmail}>
                  SEND
                </button>
              </form>
            </div>
          ) : null}
          {mailSent.status === "sent" ? (
            <div
              className="forgotContainer"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div style={{}}>
                <p>Mail has been sent</p>
                <Loader
                  type="Plane"
                  height="50"
                  width="50"
                  color="#024126"
                ></Loader>
              </div>
            </div>
          ) : null}
          {mailSent.status === "failed" ? (
            <div
              className="forgotContainer"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div style={{}}>
                <p>Email does not exist.</p>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        props.togglepress()
      )}
    </div>
  );
};
export default SignInUPComponent;
