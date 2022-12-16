export const setMyError = (message) => {
  return {
    type: "SET_ERROR",
    payload: message,
  };
};
export const resetMyError = ( ) => {
  return {
    type: "RESET_ERROR",
    
  };
};
