const INITIAL_STATE = {
    Toggle: false,
    category: "Sanitization",
    price: "",
};
const SanitizationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "SANITIZATION_TOGGLE":
        return {
          Toggle: !state.Toggle,
          category: action.payload,
          price: 399,
        };
     
      default:
        return state;
    }
  };
  export default SanitizationReducer;
  