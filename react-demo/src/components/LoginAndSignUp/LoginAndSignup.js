 import React, { useState, useEffect } from "react";
 import Loader from "react-loader-spinner";
 import { useDispatch, useSelector } from "react-redux";
 import { Link } from "react-router-dom";
 import "./LoginAndSignup.css";
 import eyeclose from "../../Image/eye-closed.svg";
 import eye from "../../Image/eye.png";
 import eyeopen from "../../Image/eye.svg";
 import { loginOpen } from "../../Redux/LoginToggle/LoginActions";
 import { resetMyError } from "../../Redux/Error/errorActions";
 import { baseUrl } from "../../variables/variables";

 import useFormSignup from "../Pages/SignUp/useForm";
 import ValidateSignUp from "../Pages/SignUp/validateSignup"

 import useForm from "../Pages/signIn/useForm"
 import ValidateSignIn from "../Pages/signIn/validateLogin";


 import backArrow from '../../Image/arrow left.svg'





 export default function LoginAndSignup(props) {
  const dispatch = useDispatch();// vishal make our own Dispatch function
  const user = useSelector((state) => state.user.customer);
  const [LoadingSignin, setLoading] = React.useState(false);
  const [mailSent, setMailSent] = React.useState({ status: "nothing" });
  const [Email, setEmail] = React.useState({
    email: "",
    password: "",
    confirmedPassword:""
  });
  const [PassWord, setPassWord] = React.useState({
    password: "",
    confirmedPassword: "",
  });
  
  const onChangeHandlerEmail = (e) => {
    setEmail({ ...Email, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    dispatch(resetMyError());
   }, []);
 
  const [emailForgot,setEmailForgot] = useState(false)
  const onSuBmitHandlerEmail = async () => {
    setEmailForgot(true);
    setLoading(true);
    
    setSignState("WAITING");
    const response = await fetch(
      `${baseUrl.toString()}users/${user.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: Email.email,
          password:Email.password
        }),
      }
    );
    const responseData = await response.json();
    console.log(responseData);
    if (responseData.message !== undefined) {
      setMailSent({ status: "sent" });
    } else {
      setMailSent({ status: "failed" });
    }

    //TODO:here link will be sent to user after response (until response loading screen)
  };



  const [signState, setSignState] = useState("SIGNIN");
  
  useEffect(() => {
    dispatch(resetMyError());
  }, [signState]);
 

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
    console.log(signState,"here")
 
  return (
    <div>
      {!isSignedIn ? (
        <div className="LoginAndSignupDesktopConatiner">
          {signState === "SIGNIN" ? (
            <form
              className="LoginContainerDeskTop"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="top-login-desktop">
                <p>LOGIN</p>
              </div>
              <div className="middle-login-desktop">
                <div className="middle-1">
                  <div className="middle-1-top">
                    <input
                      maxLength="10"
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
                    ></input>
                  </div>
                  <div className="middle-1-bottom">
                    {error.phone && <p>{error.phone}</p>}
                  </div>
                </div>
                <div className="middle-2">
                  <div className="middle-2-top">
                    <input
                      id="passwordLogin"
                      placeholder=" Enter Password"
                      name="password"
                      type="password"
                      value={Item.password}
                      onChange={handleChange}
                    ></input>
                  </div>

                  <div className="middle-2-bottom">
                    {error.password && <p>{error.password}</p>}
                  </div>
                </div>
                <label
                  style={{
                    position: "relative",
                    top: "-4rem",
                    left: "7rem",
                    cursor: "pointer",
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
                <div className="middle-3">
                  <div className="middle-3-top">
                    {!error.phone && !error.password && myerror ? (
                      <p>{myerror}</p>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="bottom-login-desktop">
                <div className="bottom-1-login">
                  <button type="submit">
                    {Loading ? (
                      <Loader
                        type="Oval"
                        color="white"
                        height="30"
                        width="40"
                        visible={Loading}
                        style={{
                          width: "100%",

                          zIndex: 3000,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      />
                    ) : (
                      "LOGIN"
                    )}
                  </button>
                </div>
                <div className="bottom-2-login">
                  <small>Not registred ?</small>
                  <small
                    onClick={() => {
                      setSignState("SIGNUP");
                    }}
                    style={{
                      marginLeft: "2%",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    SIGNUP
                  </small>
                </div>
                <div className="bottom-3-login">
                  <p onClick={() => setSignState("FORGOT")}>Forgot Password</p>{" "}
                </div>
              </div>
            </form>
          ) : null}
          {signState === "SIGNUP" ? (
            <form
              onSubmit={(e) => handleSubmitUp(e)}
              className="LoginContainerDeskTop SignUpContainerDeskTop"
            >
              <div className="backImage">
                <img
                  onClick={() => setSignState("SIGNIN")}
                  src={backArrow}
                  alt={backArrow}
                ></img>{" "}
              </div>
              <div className="top-login-desktop top-signup-desktop">
                <p>SIGNUP</p>
              </div>
              <div className="middle-signup-desktop">
                <div className="middle-1 middle-1-signup">
                  <div className="middle-1-top middle-1-top-signup ">
                    <input
                      placeholder="Name"
                      name="name"
                      type="text"
                      value={ItemSingUp.name}
                      onChange={handleChangeUp}
                    ></input>
                  </div>
                  <div className="middle-1-bottom middle-1-bottom-signup ">
                    {errorSignUp.name && <p>{errorSignUp.name}</p>}
                  </div>
                </div>

                <div className="middle-1 middle-1-signup">
                  <div className="middle-1-top middle-1-top-signup ">
                    <input
                      placeholder="Email"
                      name="email"
                      type="email"
                      value={ItemSingUp.email}
                      onChange={handleChangeUp}
                    ></input>
                  </div>
                  <div className="middle-1-bottom middle-1-bottom-signup ">
                    {errorSignUp.email && <p>{errorSignUp.email}</p>}
                  </div>
                </div>
                <div className="middle-1 middle-1-signup">
                  <div className="middle-1-top middle-1-top-signup ">
                    <input
                      placeholder="Phone No"
                      name="phone"
                      type="text"
                      value={ItemSingUp.phone}
                      onChange={handleChangeUp}
                    ></input>
                  </div>
                  <div className="middle-1-bottom middle-1-bottom-signup ">
                    {errorSignUp.phone && <p>{errorSignUp.phone}</p>}
                  </div>
                </div>
                <div className="middle-1 middle-1-signup">
                  <div className="middle-1-top middle-1-top-signup ">
                    <input
                      id="password"
                      placeholder="Password"
                      name="password"
                      type="password"
                      value={ItemSingUp.password}
                      onChange={handleChangeUp}
                    ></input>
                  </div>
                  <div className="middle-1-bottom middle-1-bottom-signup ">
                    {errorSignUp.password && <p>{errorSignUp.password}</p>}
                  </div>
                </div>

                <div className="middle-3 middle-3-signup">
                  <div className="middle-3-top">
                    {ItemSingUp.email !== "" &&
                    ItemSingUp.name !== "" &&
                    ItemSingUp.password !== "" &&
                    ItemSingUp.phone !== "" &&
                    !errorSignUp.phone &&
                    !errorSignUp.password &&
                    !errorSignUp.email &&
                    !errorSignUp.name &&
                    myerror ? (
                      <p>{myerror}</p>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="bottom-login-desktop bottom-login-desktop-signup">
                <div className="bottom-1-login  ">
                  <button type="submit">
                    {Loading ? (
                      <Loader
                        type="Oval"
                        color="white"
                        height="30"
                        width="40"
                        visible={Loading}
                        style={{
                          width: "100%",

                          zIndex: 3000,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      />
                    ) : (
                      "SIGNUP"
                    )}
                  </button>
                </div>
              </div>
            </form>
          ) : null}
          {signState === "FORGOT" ? (
            <div className="LoginContainerDeskTop SignUpContainerDeskTop forgotContainer-new">
              <div className="backImage">
                {" "}
                <img
                  onClick={() => setSignState("SIGNIN")}
                  src={backArrow}
                  alt={backArrow}
                ></img>{" "}
              </div>
              <div className="top-login-desktop top-forgot-desktop">
                <h1>Fogot Password?</h1>
                <small>We will send you an email to reset your password</small>
              </div>
              <div className="middle-signup-desktop middle-forgot-desktop ">
                <div className="middle-1 middle-1-forgot">
                  <div className="middle-1-top middle-1-top-signup  ">
                    <input
                      placeholder="Email"
                      name="email"
                      type="email"
                      value={Email.email}
                      onChange={onChangeHandlerEmail}
                    ></input>
                  </div>
                  
                   
                  <div className="middle-1-bottom middle-1-bottom-forgot ">
                    {Email.email === "" || Email.password === "" || Email.confirmedPassword === "" && emailForgot ? (
                      <p>Details cannot be empty</p>
                    ) : null}
                  </div>
                </div>

                {/* <div className="middle-3">
                  <div className="middle-3-top">
                    {" "}
                    {mailSent.status === "failed" ?? <p>Please check your mail address</p>}
                  </div>
                </div> */}
              </div>
              <div className="bottom-login-desktop bottom-login-desktop-forgot">
                <div className="bottom-1-login forgotFiled">
                  <button
                    disabled={Email.email === ""}
                    onClick={() => {
                      if (Email.email !== "" || Email.password !== "" || Email.confirmedPassword !== "") {
                        onSuBmitHandlerEmail();
                      }
                    }}
                  >
                    SEND
                  </button>
                </div>
              </div>
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
                <p>Password has been reset..Please login again</p>
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
 }
