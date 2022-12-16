const INITIAL_STATE = {
  errorMessage:null
};
const setErrorMessage = (message) => {
    if (typeof message === "object") return "No Internet Connection.";
    else if (message.includes("Invalid credentials")) return "Invalid credentials.";
    else if (message.includes("User already exists..Login instead."))
      return "Account already exists, please login instead";
    else if (message.includes("ValidationError: email"))
      return "Email already exists.";
    else if (message.includes("ValidationError: mobileNo"))
      return "Mobile already exists.";
    else if (message.includes("User does not exist"))
      return "Not registered";
 
  
}
const errorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_ERROR":
      return {
       errorMessage:setErrorMessage(action.payload)
      };
    case "RESET_ERROR":
      return {
        errorMessage:null
      };

    default:
      return state;
  }
};
export default errorReducer;
