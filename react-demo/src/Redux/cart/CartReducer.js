import { addItemsToCart } from "./cartConditions";
import { removeFromCart } from "./cartConditions";
import { updateFromCart } from "./cartConditions";
 
 

const INITIAL_STATE = {
  CartToggle: false,
  CartItems: [],
};

const CartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case "CART_TOGGLE":
    //   return {
    //     CartToggle: !state.CartToggle,
    //   };
    case "ADD_TO_CART":
      return {
        ...state,
        CartItems: addItemsToCart(state.CartItems, action.payload),
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        CartItems: removeFromCart(state.CartItems, action.payload),
      };
    case "UPDATE_FROM_CART":
      return {
        ...state,
        CartItems: updateFromCart(state.CartItems, action.payload),
      };
    case "EMPTY_CART":
      return {
        ...state,
        CartItems: [],
      };
    case "LOGGED_OUT":
      return {
        ...state,
        CartItems: [],
      };
    case "REFRESH_CART":
      return {
        ...state,
        CartItems: action.payload,
      };

    default:
      return state;
  }
};
export default CartReducer;
