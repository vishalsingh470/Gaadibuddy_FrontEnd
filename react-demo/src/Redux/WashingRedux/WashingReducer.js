// import { OneTimeToggle } from './WashingActions'
// import serviceimage from '../../Image/servicewashing.webp'

const INITIAL_STATE = {
  OneToggle: false,
  SilverToggle: false,
  GoldToggle: false,
  PlatinumToggle: false,
  category: " ",
  price: "",
};

const WashingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ONETIME_TOGGLE":
      return {
        OneToggle: !state.OneToggle,
        category: action.payload,
        price: 399,
      };
    case "SILVER_TOGGLE":
      return {
        SilverToggle: !state.SilverToggle,
        category: action.payload,
        price: 499,
      };
    case "GOLD_TOGGLE":
      return {
        GoldToggle: !state.GoldToggle,
        category: action.payload,
        price: 599,
      };
    case "PLATINUM_TOGGLE":
      return {
        PlatinumToggle: !state.PlatinumToggle,
        category: action.payload,
        price: 699,
      };
    default:
      return state;
  }
};
export default WashingReducer;
