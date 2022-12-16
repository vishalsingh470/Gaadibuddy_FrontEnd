import React, { useState ,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import {editUser} from '../../../Redux/UserRedux/UserActions'
import './editUser.css';
import history from '../../../history/history'
import { baseUrl } from '../../../variables/variables';
import { setMyError, resetMyError } from "../../../Redux/Error/errorActions";
const EditUser = (props) => {
const myerror = useSelector((state) => state.error.errorMessage);
    useEffect(() => {
      document.body.scrollTop = 0;
     
    }, []);
  const [error, setError] = useState({
    status: false,
    message:""
  })
  const dispacth = useDispatch();
    const userInfo = useSelector((state) => state.user.customer);
console.log(userInfo)
    const [user, setUser] = useState({
        name: userInfo.name,
        mobile: userInfo.mobileNo,
        email:userInfo.email
    })
  var newUser =null;
  const handleChange = (e) => {
    if (e.target.name === "mobile") {
        setUser({ ...user, mobile: e.target.value.replace(/\D/, "")});
    }
    else {
      
      setUser({ ...user, [e.target.name]: e.target.value })  
    }
      newUser = user
      console.log(userInfo.id)
  }

    const handleSubmit = async(e) => {
      e.preventDefault();
      console.log(user.name.length ,user.mobile.length,user.email.length)
      if (user.name.length <3) {
   setError({status:"name",message:"Invalid Name"})
      }
      else if (user.mobile.length !== 10) {
        setError({...error,status:"mobile",message:"Incorrect Mobile No"})
      }
      else if (user.email.length < 4) {
        setError({...error,status:"email",message:"Incorrect Email"})
        
      }
      else {
        setError({status:false,message:""})
        const updatedUser = await fetch(`${baseUrl}users/${userInfo.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: user.name,
            mobileNo: user.mobile,
            email: user.email,
          }),
        }).then((t) => t.json());
        if (updatedUser.customer === undefined) {
          dispacth(setMyError(updatedUser));
          setTimeout(() => {
            dispacth(resetMyError());
          }, 5000);
        } else {
          await dispacth(editUser(updatedUser.customer));
          await history.goBack();
        }
      }
      
 
     
    }
    return (
      <div className="editpage-container">
        <form>
          <h1>Personal Details</h1>
          <div className="edit-form">
            <div className="edit-input-container">
              <div className="edit-input-top">
                <label>Name:</label>
                <input
                  name="name"
                  type="text"
                  value={user.name}
                  onChange={handleChange}
                  placeholder={user.name}
                />
              </div>
              <div className="edit-input-bottom">
                {error.status === "name" ? (
                  <small>{error.message}</small>
                ) : null}
              </div>
            </div>
            <div className="edit-input-container">
              <div className="edit-input-top">
                <label>Phone:</label>
                <input
                  name="mobile"
                  maxLength="10"
                  type="text"
                  value={user.mobile}
                  onChange={handleChange}
                  placeholder={user.mobile}
                />
              </div>
              <div className="edit-input-bottom">
                {error.status === "mobile" ? (
                  <small>{error.message}</small>
                ) : null}
              </div>
            </div>
            <div className="edit-input-container">
              <div className="edit-input-top">
                <label>Email:</label>
                <input
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder={user.email}
                />
              </div>
              <div className="edit-input-bottom">
                {error.status === "email" ? (
                  <small>{error.message}</small>
                ) : null}
              </div>
            </div>

            <div className="buttonContainer">
              <button
                onClick={handleSubmit}
                disabled={
                  userInfo.name === user.name &&
                  userInfo.mobileNo.toString() === user.mobile.toString() &&
                  userInfo.email === user.email
                }
                style={
                  userInfo.name === user.name &&
                  userInfo.mobileNo.toString() === user.mobile.toString() &&
                  userInfo.email === user.email
                    ? { opacity: "60%", background: "gray" }
                    : {}
                }
              >
                SAVE
              </button>
              <button onClick={() => history.replace("/userprofile")}>
                CANCEL
              </button>
            </div>
            {myerror ? <p>{myerror}</p> : null}
          </div>
        </form>
      </div>
    );
}
export default EditUser;