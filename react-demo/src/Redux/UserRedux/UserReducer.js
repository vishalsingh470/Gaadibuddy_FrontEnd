import {
  addcarfunc,
  removecarfunc,
  addSchedulesFunc,
  editcarfunc,
  updateWithOrder,
  replaceUserFunction,
  refreshCartFunc,
  removeFromCart,
  updateOrderFunc,
  updateImageFunc,
  refreshCarsFunc
} from "./userConditions.js";

const INITIAL_STATE = {
  UserSignedIn: false,
  CartToggle: false,
  customer: [],
  cars: [],
  orders: [],
  schedules: [],
  addcarPage: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGGED_IN":
      return {
        ...state,
        UserSignedIn: true,
        customer: action.payload,
      };
    case "LOGGED_OUT":
      return {
        ...state,
        UserSignedIn: false,
        addcarPage: false,
        customer: [],
        cars: [],
        orders: [],
        schedules: [],
        temp: "",
      };

    case "EDIT_USER":
      return {
        ...state,
        customer: replaceUserFunction(state.customer, action.payload),
      };
    case "ADD_CAR":
      return {
        ...state,

        cars: addcarfunc(state.customer, action.payload),
      };

    case "EDIT_CAR":
      return {
        ...state,

        cars: editcarfunc(state.customer, action.payload),
      };

    case "RETAIN":
      return {
        ...state,
      };
    case "REMOVE_CAR":
      return {
        ...state,

        cars: removecarfunc(state.customer, action.payload),
      };
    case "UPDATE_CAR":
      return {
        ...state,
        temp: action.payload,
      };
    case "ADD_ORDER":
      return {
        ...state,
        customer: updateWithOrder(state.customer, action.payload),
      };
    case "ADD_SCHEDULE":
      return {
        ...state,
        schedules: addSchedulesFunc(state.orders, action.payload),
      };
    // case "ADD_TO_CART":
    //   return {
    //     ...state,
    //     customer: addItemsToCart(state.customer, action.payload),
    //   };
    case "REFRESH_CART":
      return {
        ...state,
        customer: refreshCartFunc(state.customer, action.payload),
      };
    case "REFRESH_CARS":
      return {
        ...state,
        customer: refreshCarsFunc(state.customer, action.payload),
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        customer: removeFromCart(state.customer, action.payload),
      };
    case "ADD_CAR_PAGE":
      return {
        ...state,
        addcarPage: action.payload === true ? true : false,
      };
    case "UPDATE_ORDERS":
      return {
        ...state,
        customer: updateOrderFunc(state.customer, action.payload),
      };
    case "UPDATE_IMAGE":
      return {
        ...state,
        customer: updateImageFunc(state.customer, action.payload),
      };

    default:
      return state;
  }
};
export default userReducer;
