import React, { useState } from "react";

import Toolbar from "./components/UI/Toolbar/Toolbar";
import SideDrawer from "./components/UI/SideDrawer/SideDrawer";
import { Backdrop } from "./components/UI/Backdrop/Backdrop";
import { LoginBackdrop } from "./components/UI/Backdrop/Backdrop";
import ServicePage from "./components/Pages/ServicePage/ServicePage";
import history from "./history/history";
import { loginOpen } from "./Redux/LoginToggle/LoginActions";
import { Router, Route, Redirect } from "react-router-dom";
import About from "./components/Pages/About/about";
import Home from "./components/Pages/Home/Home";
import Contact from "./components/Pages/ContactUs/contact";
import Services from "./components/Pages/Services/services";
 import LoginAndSignup from "./components/LoginAndSignUp/LoginAndSignup";
import UserProfile from "./components/Pages/user/UserProfile";
import MyOrders from "./components/Pages/MyOrders/myOrders";
import CartItem from "../src/components/UI/content/CartComponent/cartitem/cartitemcomponent";
import CheckoutPage from "./components/Pages/Checkout/Checkoutpage";
import { Confirmationpage } from "./components/UI/content/checkoutComponent/Confirmation";
import AddCar from "./components/Pages/AddCar/AddCar";
import Test from "./components/Pages/testing";
import { useSelector, useDispatch } from "react-redux";
import EditUser from "./components/Pages/edituser/editUser";
import { SigninMobile } from "./components/Pages/signIn/signInMobile";
import { SignupMobile } from "./components/Pages/signIn/signUpMobile";
import ForgotPassword  from "./components/Pages/signIn/ForgotPassword";
import ResetPassword from "./components/Pages/signIn/ResetPassword";
import Footer from "./components/UI/content/footer/footer";
import Terms from './components/Pages/Terms/Terms';
import Privacy from './components/Pages/privacy/Privacy';
import SignInMobile from "./components/Pages/signIn/SignInMobile/SignInMobile";
import IoclMainPage from "./ioclPages/IoclMainPage";
import IoclPastCustomers from "./ioclPages/IoclPastCustomers";
import IoclAdduserpage from "./ioclPages/IoclAdduserpage";
import IoclAddcarpage from "./ioclPages/IoclAddcarpage";
function App() {
  const LoginToggle = useSelector((state) => state.loginToggle);
  const [state, setState] = useState({
    sideDrawerOpen: false,
  });
  const userSignedIn = useSelector((state) => state.user.UserSignedIn);
  const userInfo = useSelector((state) => state.user.customer);
  console.log(userInfo)
  const dispacth = useDispatch();
  const drawerToggleClickHandler = () => {
    setState({ sideDrawerOpen: !state.sideDrawerOpen });
  };

  const backdropClickHandler = () => {
    setState({ sideDrawerOpen: false });
  };

  let backDrop;
  const LoginbackdropClickHandler = () => {
    dispacth(loginOpen());
  };

 
  if (state.sideDrawerOpen) {
    backDrop = <Backdrop click={backdropClickHandler} />;
  }
  if (LoginToggle.Toggle) {
    backDrop = <LoginBackdrop click={LoginbackdropClickHandler} />;
  }
  const width = { matches: window.matchMedia("(min-width: 768px)").matches };
  const navbarHeight = width.matches ? "5rem" : "4rem";
  return (
    <Router history={history}>
      <div>
        <div>
          <Toolbar
            drawerClickHandler={drawerToggleClickHandler}
            click={backdropClickHandler}
            height={navbarHeight}
          />
        </div>

        <SideDrawer show={state.sideDrawerOpen} click={backdropClickHandler} />
        {backDrop}

        <switch>
          <Route
            exact
            path="/about"
            render={(props) => <About click={backdropClickHandler} />}
          />
          <Route
            exact
            path="/servicesOld"
            render={(props) => <Services click={backdropClickHandler} />}
          />
          <Route
            path="/services"
            render={(props) => <ServicePage click={backdropClickHandler} />}
          />
          <Route
            exact
            path="/contact"
            render={(props) => <Contact click={backdropClickHandler} />}
          />
          <Route
            exact
            path="/"
            render={(props) => <Home click={backdropClickHandler} />}
          />
          <Route
            exact
            path="/signUp"
            render={(props) =>
              !userSignedIn ? (
                <SignupMobile click={backdropClickHandler} {...props} />
              ) : (
                <Redirect exact to="/" />
              )
            }
          />
          <Route
            exact
            path="/cart"
            render={(props) => <CartItem click={backdropClickHandler} />}
          />

          <Route path="/testing" exact component={Test} />

          <Route
            path="/edituser"
            exact
            render={(props) =>
              userSignedIn ? (
                <EditUser click={backdropClickHandler} {...props} />
              ) : (
                <Redirect exact to="/" />
              )
            }
          />
          <Route
            exact
            path="/myorders"
            render={(props) =>
              userSignedIn ? (
                <MyOrders click={backdropClickHandler} {...props} />
              ) : (
                <Redirect exact to="/" />
              )
            }
          />
          <Route
            exact
            path="/signin"
            render={(props) =>
              userSignedIn ? (
                <Redirect to="/" />
              ) : (
                <SignInMobile click={backdropClickHandler} {...props} />
              )
            }
          />
          {/* <Route
            exact
            path="/signinm"
            render={(props) =>
              userSignedIn ? (
                <Redirect to="/" />
              ) : (
                <SignInMobile click={backdropClickHandler} {...props} />
              )
            }
          /> */}
          <Route
            exact
            path="/UserProfile"
            render={(props) =>
              userSignedIn ? (
                <UserProfile click={backdropClickHandler} {...props} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            exact
            path="/forgotpass"
            render={(props) =>
              userSignedIn ? (
                <UserProfile click={backdropClickHandler} {...props} />
              ) : (
                <ForgotPassword />
              )
            }
          />
          <Route
            path="/resetpassword"
            render={(props) =>
              userSignedIn ? (
                <UserProfile click={backdropClickHandler} {...props} />
              ) : (
                <ResetPassword {...props} />
              )
            }
          />
          <Route
            path="/checkout"
            exact
            render={(props) =>
              !userSignedIn ? (
                <Redirect exact to="/" {...props} />
              ) : (
                <CheckoutPage {...props} />
              )
            }
          />
          <Route
            path="/confirmation"
            exact
            render={(props) =>
              !userSignedIn ? (
                <Redirect exact to="/" {...props} />
              ) : (
                <Confirmationpage {...props} />
              )
            }
          />
          <Route
            path="/iocl"
            exact
            render={(props) =>
              !userSignedIn && userInfo.name !== "dhullo_iocl" ? (
                <Redirect exact to="/" {...props} />
              ) : (
                <IoclMainPage {...props} />
              )
            }
          />
          <Route
            path="/ioclPast"
            exact
            render={(props) =>
              !userSignedIn && userInfo.name !== "dhullo_iocl" ? (
                <Redirect exact to="/" {...props} />
              ) : (
                <IoclPastCustomers {...props} />
              )
            }
          />
          <Route
            path="/ioclAddCustomer"
            exact
            render={(props) =>
              !userSignedIn && userInfo.name !== "dhullo_iocl" ? (
                <Redirect exact to="/" {...props} />
              ) : (
                <IoclAdduserpage {...props} />
              )
            }
          />
          <Route
            path="/ioclAddCarPage"
            exact
            render={(props) =>
              !userSignedIn && userInfo.name !== "dhullo_iocl" ? (
                <Redirect exact to="/" {...props} />
              ) : (
                <IoclAddcarpage {...props} />
              )
            }
          />

          <Route path="/addcar" exact component={AddCar} />
          <Route path="/privacy" exact component={Privacy} />
          <Route path="/terms" exact component={Terms} />
          <Route path="/test" exact component={LoginAndSignup} />

          <Footer />
        </switch>
      </div>
    </Router>
  );
}

export default App;
