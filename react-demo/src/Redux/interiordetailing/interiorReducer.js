const INITIAL_STATE = {
    Toggle: false,
    category: "Interior Detailing",
    price: "",
};
const InteriorReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "INTERIOR_TOGGLE":
        return {
          Toggle: !state.Toggle,
          category: action.payload,
          price: 399,
        };
     
      default:
        return state;
    }
  };
  export default InteriorReducer;
  