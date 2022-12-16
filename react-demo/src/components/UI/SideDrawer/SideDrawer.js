import React,{useState} from "react";
import { Link } from "react-router-dom";
import "./SideDrawer.css";
import { useSelector, useDispatch } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import profile from "../../../Image/userProfileOrange.svg";
import { isLoggedout } from "../../../Redux/UserRedux/UserActions";
import { loginOpen } from "../../../Redux/LoginToggle/LoginActions";
import {serviceSubMenu} from './sideDrawe.data'
import { sub } from "date-fns";
function SideDrawer(props) {


 const fullUrl = window.location.href;
 const stringToSee = "/services";
  const isServicepage = fullUrl.includes(stringToSee);
  console.log(isServicepage, "is service page");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.customer);
  const LoginToggle = useSelector((state) => state.loginToggle);
  const isSignedIn = useSelector((state) => state.user.UserSignedIn);
  const [subMenuToggle,setSubMenuToggle] = useState(false)
  let drawerClasses = "side-drawer";
  if (props.show) {
    drawerClasses = "side-drawer open";
  }
  console.log(LoginToggle);
  return (
    <div className="noSelect">
      {isSignedIn ? (
        <nav className={drawerClasses}>
          <div className="userprofilecomp">
            <div className="userimagecomp">
              <Link to="/userprofile" onClick={props.click}>
                <img
                  className="userimage"
                  src={profile}
                  alt="profileimage"
                ></img>
              </Link>
            </div>
            <Link to="/userprofile" onClick={props.click}>
              <div className="usernamecomp">
                <p className="usernametext">{user.name}</p>
              </div>
            </Link>
          </div>
          <div className="profileSeperator">
            <hr></hr>
          </div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <div className="linkSeperator">
              <hr></hr>
            </div>
            <li>
              <Link to="/myorders">My Orders</Link>
            </li>
            <div className="linkSeperator">
              <hr></hr>
            </div>
            <li>
              <a onClick={() => setSubMenuToggle(!subMenuToggle)}>Services</a>
            </li>
            <div className={!subMenuToggle ? "hiddenSubmenu" : "subMenu"}>
              {subMenuToggle
                ? serviceSubMenu.map((oneMenu) => (
                    <li>
                      <Link
                        onClick={props.click}
                        to={
                          isServicepage
                            ? `${oneMenu.route}`
                            : `services/${oneMenu.route} `
                        }
                      >
                        {oneMenu.serviceName}
                      </Link>
                    </li>
                  ))
                : null}
            </div>
            <div className="linkSeperator">
              <hr></hr>
            </div>
            <li>
              <Link to="/about">About us</Link>
            </li>
            <div className="linkSeperator">
              <hr></hr>
            </div>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <div className="linkSeperator">
              <hr></hr>
            </div>
            <div className="tc-container">
              <li id="termsLi">
                <Link to="/terms" onClick={props.click}>
                  Terms and Conditions
                </Link>
              </li>
              <div className="linkSeperator">
                <hr></hr>
              </div>
              <li id="privacyLi">
                <Link to="/privacy" onClick={props.click}>
                  Privacy Policy
                </Link>
              </li>
              <div className="linkSeperator">
                <hr></hr>
              </div>
              <div className="logoutSidebar">
                <button
                  onClick={() =>
                    confirmAlert({
                      customUI: ({ onClose }) => {
                        return (
                          <div className="custom-ui">
                            <h3
                              style={{ textAlign: "center", marginTop: "3%" }}
                            >
                              Are you sure to Logout?
                            </h3>
                            <div className="promptbuttoncontainer">
                              <button
                                className="promptbuttonNo"
                                onClick={onClose}
                              >
                                No
                              </button>
                              <button
                                className="promptbuttonYes"
                                onClick={async () => {
                                  await dispatch(isLoggedout());
                                  await dispatch(loginOpen());

                                  await onClose();
                                  window.location.reload(false);
                                }}
                              >
                                Yes
                              </button>
                            </div>
                          </div>
                        );
                      },
                    })
                  }
                >
                  <p>Log Out</p>
                </button>
              </div>
            </div>
          </ul>
        </nav>
      ) : (
        <nav className={drawerClasses}>
          <div className="userprofilecomp">
            <div className="userimagecomp">
              <img className="userimage" src={profile} alt="profileimage"></img>
            </div>
            <Link onClick={props.click} to={"/signin"}>
              <div className="usernamecomp">
                <p className="usernametext">Login / Signup</p>
              </div>
            </Link>
          </div>
          <div className="profileSeperator">
            <hr></hr>
          </div>
          <ul>
            <li>
              <Link
                to="/"
                onClick={
                  LoginToggle.Toggle ? () => dispatch(loginOpen()) : null
                }
              >
                Home
              </Link>
            </li>
            <div className="linkSeperator">
              <hr></hr>
            </div>
            <li>
              <a onClick={() => setSubMenuToggle(!subMenuToggle)}>Services</a>
            </li>
            <div className={!subMenuToggle ? "hiddenSubmenu" : "subMenu"}>
              {subMenuToggle
                ? serviceSubMenu.map((oneMenu) => (
                    <li>
                      <Link
                        onClick={props.click}
                        to={
                          isServicepage
                            ? `${oneMenu.route}`
                            : `services/${oneMenu.route} `
                        }
                      >
                        {oneMenu.serviceName}
                      </Link>
                    </li>
                  ))
                : null}
            </div>
            <div className="linkSeperator">
              <hr></hr>
            </div>
            <li>
              <Link
                to="/about"
                onClick={
                  LoginToggle.Toggle ? () => dispatch(loginOpen()) : null
                }
              >
                About
              </Link>
            </li>
            <div className="linkSeperator">
              <hr></hr>
            </div>
            <li>
              <Link
                to="/contact"
                onClick={
                  LoginToggle.Toggle ? () => dispatch(loginOpen()) : null
                }
              >
                Contact Us
              </Link>
            </li>
            <div className="linkSeperator">
              <hr></hr>
            </div>
            {/* <li>
              <Link path to="#" onClick={() => dispatch(loginOpen())}>
                Sign In
              </Link>
            </li> */}
            <div className="tc-container">
              <li id="termsLi">
                <Link to="/terms" onClick={props.click}>
                  Terms And Conditions
                </Link>
              </li>
              <div className="linkSeperator">
                <hr></hr>
              </div>
              <li id="privacyLi">
                <Link to="/privacy" onClick={props.click}>
                  Privacy policy
                </Link>
              </li>
              <div className="linkSeperator">
                <hr></hr>
              </div>
              <div style={{ visibility: "hidden" }} className="logoutSidebar">
                <button
                  style={{ color: "#" }}
                  onClick={() =>
                    confirmAlert({
                      customUI: ({ onClose }) => {
                        return (
                          <div className="custom-ui">
                            <h3
                              style={{ textAlign: "center", marginTop: "3%" }}
                            >
                              Are you sure to Logout?
                            </h3>
                            <div className="promptbuttoncontainer">
                              <button
                                className="promptbuttonNo"
                                onClick={onClose}
                              >
                                NO
                              </button>
                              <button
                                className="promptbuttonYes"
                                onClick={async () => {
                                  await dispatch(isLoggedout());
                                  await dispatch(loginOpen());

                                  await onClose();
                                  window.location.reload(false);
                                }}
                              >
                                YES
                              </button>
                            </div>
                          </div>
                        );
                      },
                    })
                  }
                >
                  <p>LOGOUT</p>
                </button>
              </div>
            </div>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default SideDrawer;
