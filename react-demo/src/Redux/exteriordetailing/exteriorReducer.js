const INITIAL_STATE = {
  Toggle: false,
  category: "Exterior Detailing",
  price: "",
};
const ExteriorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "EXTERIOR_TOGGLE":
      return {
        Toggle: !state.Toggle,
        category: action.payload,
        price: 399,
      };

    default:
      return state;
  }
};
export default ExteriorReducer;
