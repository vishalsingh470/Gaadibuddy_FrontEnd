import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import WebFont from "webfontloader";
import RootReducer from "../src/Redux/RootReducer";
import { persistStore } from "redux-persist";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import swDev from "./swDev";
import { PersistGate } from "redux-persist/integration/react";
import { applyMiddleware } from "redux";
import logger from "redux-logger";
import history from "./history/history";
import { Router } from "react-router-dom";

import { unregister } from "./serviceWorker";
// navigator.onLine ? unregister() : console.log("offline");
//
WebFont.load({
  google: {
    families: ["Niconne", "sans-serif"],
  },
});

const middlewares = [logger];
export const store = createStore(RootReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);
const app = (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router history={history}>
        <App />
      </Router>
    </PersistGate>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register({
  onUpdate: (registration) => {
    const waitingServiceWorker = registration.waiting;

    if (waitingServiceWorker) {
      waitingServiceWorker.addEventListener("statechange", (event) => {
        if (event.target.state === "activated") {
          window.location.reload();
        }
      });
      waitingServiceWorker.postMessage({ type: "SKIP_WAITING" });
    }
  },
});

// swDev();
