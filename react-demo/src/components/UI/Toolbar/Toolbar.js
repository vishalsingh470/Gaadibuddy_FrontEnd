import React, { useState } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Userpopup, ServiceDropDown } from "../../../globaStyles/styleElements";
import logo from "../../../Image/Logo.png";
import { useHistory } from "react-router";
import UserLoggedIn from "../../../Image/UserLoggedIn.svg";
// import history from "../../../history/history";
import cart from "../../../Image/shopping_cart.svg";
import user from "../../../Image/user.svg";
import { serviceSubMenu } from "../SideDrawer/sideDrawe.data";
// import SignUp from "../../Pages/SignUp/SignUp";
import { loginOpen } from "../../../Redux/LoginToggle/LoginActions";
import { isLoggedout } from "../../../Redux/UserRedux/UserActions";
import SignInUPComponent from "../../Pages/signIn/signIn";
import LoginAndSignup from "../../LoginAndSignUp/LoginAndSignup";
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import "./Toolbar.css";
const width = { matches: window.matchMedia("(min-width: 768px)").matches };
export default function Toolbar(props) {
  const LoginToggle = useSelector((state) => state.loginToggle.Toggle);
  const isSignedIn = useSelector((state) => state.user.UserSignedIn);
  const userName = useSelector((state) => state.user.customer.name);

  const cartItems = useSelector((state) => state.user?.customer?.cart);
  const [serviceToggle, setServiceToggle] = useState(false);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  // const [signinToggle, setSignInTogggle] = useState(false)
  const [scrolled, setScroll] = useState(false);
  const scrollHandler = () => {
    console.log("navbar scroll", window.scrollY);
    window.scrollY > 10 ? setScroll(true) : setScroll(false);
  };
  React.useEffect(() => {
    window.addEventListener("scroll", scrollHandler());
  });

  const history = useHistory();

  const fullUrl = window.location.href;
  const stringToSee = "/services";
  const isServicepage = fullUrl.includes(stringToSee);
  //  const openSignin =() =>setSignInTogggle(!signinToggle)
  return (
    <div>
      <header
        style={{ height: props.height }}
        className={scrolled ? "toolbarscrolled" : "toolbar"}
      >
        <nav className="toolbar__navigation">
          <div className="toolbar__toggle-button">
            <DrawerToggleButton click={props.drawerClickHandler} />
          </div>

          <div className="toolbar__logo  ">
            <Link path to="/" className="logoimg">
              <img
                className="logoheader"
                onClick={LoginToggle ? () => dispatch(loginOpen()) : null}
                src={logo}
                alt=""
              />
            </Link>
          </div>
          <div className="cart">
            <Link style={{ textDecoration: "none" }} path to="/cart">
              {cartItems?.length > 0 ? (
                <small
                  style={
                    width.matches
                      ? {
                          color: "white",
                          border: "2px solid white",
                          paddingLeft: "10%",
                          paddingRight: "10%",
                          paddingTop: "3%",
                          paddingBottom: "3%",
                          borderRadius: "100%",
                          position: "relative",
                          left: "01.8rem",
                          top: "-0.2rem",
                        }
                      : {
                          color: "white",
                          border: "1px solid white",
                          paddingLeft: "2%",
                          paddingRight: "2%",
                          paddingTop: "2%",
                          paddingBottom: "2%",
                          borderRadius: "100%",
                          position: "absolute",
                          left: "88vw",
                          top: "0.5vh",
                          height: "3px",
                          width: "3px",
                          textAlign: "center",
                          display: "flex",
                          justifyContent: "center",
                          alignContent: "center",
                          alignItems: "center",
                        }
                  }
                >
                  {cartItems?.length}
                </small>
              ) : null}
              <img
                style={
                  width.matches
                    ? {
                        position: "relative",
                        top: "-0.5rem",
                        left: "-0.8rem",
                        width: "10vw",
                      }
                    : {
                        position: "absolute",
                        top: "-0vh",
                        left: "80vw",
                        width: "10vw",
                      }
                }
                className="cart-contain"
                src={cart}
                alt=""
              />
            </Link>
          </div>

          <div className="spacer" />
          <div className="toolbar__navigation-items grow">
            <ul className="grow">
              <li>
                <Link
                  path
                  to="#"
                  onClick={() => {
                    setServiceToggle(!serviceToggle);
                    setToggle(false);
                  }}
                >
                  SERVICES
                </Link>
              </li>
              <li>
                <Link path to="/about">
                  ABOUT US
                </Link>
              </li>
              <li>
                <Link path to="/contact">
                  CONTACT
                </Link>
              </li>

              <li>
                <div className="cart_list">
                  <Link path to="/cart">
                    <img
                      src={cart}
                      alt=""
                      style={{ width: 100, height: 38, marginTop: "0.8rem" }}
                    />
                    {cartItems?.length ? (
                      <div className="small">
                        <h4>{cartItems?.length}</h4>
                      </div>
                    ) : null}
                  </Link>
                </div>
              </li>
              <li style={{ marginTop: "-0.5rem" }}>
                <div className="userImageToolbar">
                  {isSignedIn ? (
                    <img
                      onClick={() => setToggle(!toggle)}
                      src={UserLoggedIn}
                      alt={UserLoggedIn}
                    />
                  ) : (
                    <img onClick={() => setToggle(!toggle)} src={user} alt="" />
                  )}
                </div>
                {serviceToggle ? (
                  <OutsideClickHandler
                    onOutsideClick={() => {
                      setServiceToggle(false);
                    }}
                  >
                    <ServiceDropDown>
                      {serviceSubMenu.map((oneMenu) => (
                        <div>
                          <li>
                            <Link
                              onClick={() => setServiceToggle(false)}
                              to={
                                isServicepage
                                  ? `${oneMenu.route}`
                                  : `services/${oneMenu.route} `
                              }
                            >
                              {oneMenu.serviceName}
                            </Link>
                          </li>
                          <hr></hr>
                        </div>
                      ))}
                    </ServiceDropDown>
                  </OutsideClickHandler>
                ) : null}
                {toggle ? (
                  isSignedIn ? (
                    <OutsideClickHandler
                      onOutsideClick={() => {
                        setToggle(false);
                      }}
                    >
                      <Userpopup>
                        <Link
                          path
                          to="/userprofile"
                          id="popuplist"
                          onClick={() => setToggle(false)}
                        >
                          <p> My Profile</p>
                        </Link>
                        <Link
                          path
                          to="/myorders"
                          id="popuplist"
                          onClick={() => setToggle(false)}
                        >
                          <p>My Orders</p>
                        </Link>
                        <p
                          onClick={() =>
                            confirmAlert({
                              customUI: ({ onClose }) => {
                                return (
                                  <div className="custom-ui">
                                    <h3
                                      style={{
                                        textAlign: "center",
                                        marginTop: "3%",
                                      }}
                                    >
                                      <p>Are you sure to logout?</p>
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
                          id="popuplist"
                        >
                          Log Out
                        </p>
                      </Userpopup>
                    </OutsideClickHandler>
                  ) : (
                    <OutsideClickHandler
                      onOutsideClick={() => {
                        setToggle(false);
                      }}
                    >
                      <Userpopup onMouseLeave={() => setToggle(!toggle)}>
                        <p onClick={() => dispatch(loginOpen())}>Login</p>
                      </Userpopup>
                    </OutsideClickHandler>
                  )
                ) : null}
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {LoginToggle && !isSignedIn ? (
        <LoginAndSignup togglepress={() => dispatch(loginOpen())} />
      ) : null}
    </div>
  );
}
