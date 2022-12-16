import React from "react";
import history from "../../../history/history";
import { baseUrl } from "../../../variables/variables";

export default function ResetPassword() {
  console.log(baseUrl,"BASEurL")
  const [PassWord, setPassWord] = React.useState({
    password: "",
    confirmedPassword: "",
  });

    const Url = window.location.href;
    const rPassword = "/resetpassword/";
    const serverURL = "https://dhullo.com/api/";
    
 
  const Token = Url.substr(Url.indexOf(rPassword)+rPassword.length);
  console.log("Token is ",Token);
  console.log("base url is ", baseUrl);
  const onChangeHandler = (e) => {
    setPassWord({ ...PassWord, [e.target.name]: e.target.value });
  };
  const onSuBmitHandler = async () => {
    console.log(PassWord);
    if (PassWord.password === PassWord.confirmedPassword) {
      const response = await fetch(
        `${serverURL}users/auth/reset-password/${Token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newPassword: PassWord.password,
            confirmPassword: PassWord.confirmedPassword,
          }),
        }
      );

      const responseData = await response.json();
      console.log(responseData);
      if (responseData.message !== undefined) {
        history.push("/");
        alert("updated");
      }
    } else {
      alert("passwords dont match");
    }
  };
  return (
    <div
      className="ForgotPage"
      style={{
        display: "flex",
        justifyContent: "top",
        alignItems: "center",
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <p>PLEASE ENTER YOUR NEW PASSWORD</p>
      <div>
        <div className="forgotFields">
          <label
          // style={{ position: "relative", left: "-25vw" }}
          >
            Enter password
          </label>
          <input
            style={{ height: "2rem", width: "15rem" }}
            type="password"
            name="password"
            value={PassWord.password}
            onChange={onChangeHandler}
          ></input>
        </div>
        <div className="forgotFields">
          <label>Confirm password</label>
          <input
            style={{ height: "2rem", width: "15rem" }}
            type="password"
            name="confirmedPassword"
            value={PassWord.confirmedPassword}
            onChange={onChangeHandler}
          ></input>
        </div>
        <div className="SubmitContainerPassword">
          <button onClick={onSuBmitHandler}>SEND</button>
        </div>
      </div>
    </div>
  );
}
