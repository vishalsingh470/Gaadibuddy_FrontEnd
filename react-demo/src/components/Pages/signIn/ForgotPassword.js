import React from 'react';
import Loader from 'react-loader-spinner';
import { baseUrl } from '../../../variables/variables';
export default function ForgotPassword() {

  const [Loading, setLoading] = React.useState(false)
  const [messageSent, setMessageSent] = React.useState({
    status: 'nothing'
  })

  const [Email, setEmail] = React.useState({
    email: '',
        
  })

  const onChangeHandler = (e) => {
    setEmail({ ...Email, [e.target.name]: e.target.value })
  }
  const onSuBmitHandler = async () => {
        
       
    const response = await fetch(
      `${baseUrl}users/auth/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: Email.email,
        }),
      }
    );
    const responseData = await response.json();
    console.log(responseData);
    if (responseData.message !== undefined) {
      setMessageSent({ status: 'sent' })
    }
    else {
       setMessageSent({ status: "failed" });
    }
   
    // TODO://LINK WIL BE SENT
        
  }
  return (
    <div>
      {messageSent.status === "nothing" ? (
        <div
          className="ForgotPage"
          style={{
            display: "flex",
            justifyContent: "top",
            alignItems: "center",
            textAlign: "center",
            flexDirection: "column",
            margin: "2%",
            width: "96vw",

            marginTop: "10%",
          }}
        >
          <div className="forgot-top-mobile">
            <h1 className="Forgot-Heading">Forgot Password?</h1>
            <small>We will send you an email to reset your password.</small>
          </div>

          <div>
            <div className="forgotFields">
              <input
                style={{ height: "2rem", width: "15rem" }}
                type="email"
                name="email"
                value={Email.email}
                onChange={onChangeHandler}
                placeholder="Email"
              ></input>
              
              
            </div>

            <div className="SubmitContainerPassword">
              <button onClick={onSuBmitHandler}>SEND</button>
            </div>
          </div>
        </div>
      ) : null}

      {messageSent.status === "sent" ? (
        <div
          className="ForgotPage"
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Loader type="Plane" height="50" width="50" color="#024126"></Loader>
          <p>Reset mail has been sent</p>
        </div>
      ) : null}
      {messageSent.status === "failed" ? (
        <div
          className="ForgotPage"
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Loader
            type="NotSpecified"
            height="50"
            width="50"
            color="#024126"
          ></Loader>
          <p>Email does not exist.</p>
        </div>
      ) : null}
    </div>
  );
}