import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetMyError, setMyError } from "../../../Redux/Error/errorActions";
import { isLogged } from "../../../Redux/UserRedux/UserActions";
import { baseUrl } from '../../../variables/variables';
const useFormSignup = (callback, ValidateSignUp) => {
  
const myError =useSelector((state)=>state.error.errorMessage)
  const [ItemSingUp, setItem] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });
  const [errorSignUp, setError] = useState(false);
  const [isSubmitting, SetisSubmitting] = useState(false);
  const handleChangeUp = (e) => {
    const { name, value } = e.target; //destructured here
    setItem({ ...ItemSingUp, [name]: value });
  };
  const dispatch = useDispatch();
  
function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}


  const handleSubmitUp = async (e) => {

     console.log("ERROR IS",errorSignUp);
    console.log(ItemSingUp);
    e.preventDefault();

    setError(ValidateSignUp(ItemSingUp));
    SetisSubmitting(true);
    if (ItemSingUp.email !== '' && ItemSingUp.name!== '' && ItemSingUp.password !== "" && ItemSingUp.phone !== "") {
      try {
        const response = await fetch(`${baseUrl.toString()}users/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: ItemSingUp.name,

            mobileNo: ItemSingUp.phone,
            email: ItemSingUp.email,
            password: ItemSingUp.password,
          }),
        });

        const responseData = await response.json();
        console.log(responseData);
        responseData.customer !== undefined
          ? await dispatch(isLogged(responseData.customer))
          : await dispatch(setMyError(responseData));
        setTimeout(() => {
          dispatch(resetMyError());
        }, 5000);

        //dispatch item and push to add car page
      } catch (error) {
        console.log(error);
        dispatch(setMyError(error));
      }
    }
    
  };

  useEffect(() => {
    if (Object.keys(errorSignUp).length === 0 && isSubmitting) {
      callback();
    }
  }, [errorSignUp, callback, isSubmitting]);

  return {
    handleChangeUp,
    handleSubmitUp,
    ItemSingUp,
    errorSignUp,
  };
};
export default useFormSignup;
