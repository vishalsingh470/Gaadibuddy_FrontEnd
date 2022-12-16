const INITIAL_STATE = {
  Toggle: false,
  
};
const LoginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "TOGGLE":
      return {
        Toggle: !state.Toggle,
       
      };

    default:
      return state;
  }
};
export default LoginReducer;
