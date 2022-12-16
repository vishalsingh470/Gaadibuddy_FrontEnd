import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import history from "../../../history/history";
import { setMyError } from "../../../Redux/Error/errorActions";
import {
  isLogged,
  addCarPage
   
} from "../../../Redux/UserRedux/UserActions";
import { baseUrl } from '../../../variables/variables';

const useForm = (callback, Validate) => {
 
  const [Item, setItem] = useState({
    phone: "",
    password: "",
  });
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isSubmitting, SetisSubmitting] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target; //destructured here
    setItem({ ...Item, [name]: value });
  };
  const dispatch = useDispatch();
  async function handleSubmit(e) {
  
    e.preventDefault();

    setError(Validate(Item));
    SetisSubmitting(true);
    if (Item.phone !== '' && Item.password !== '') {
       setLoading(true);
   try {
     const response = await fetch(`${baseUrl.toString()}users/login`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         mobileNo: Item.phone,
         password: Item.password,
       }),
     });
     setLoading(false);
     const responseData = await response.json();

     console.log(responseData);
     // removed later

     if (responseData.customer !== undefined) {
       dispatch(isLogged(responseData.customer));
         dispatch(addCarPage(true));
       setLoading(false);
   
     } else {
       dispatch(setMyError(responseData));
       setLoading(false);
     }
   } catch (err) {
     console.log(err);
     dispatch(setMyError(err));
   }
   setLoading(false);
}
   
  }
    async function handleSubmitMobile(e) {
      e.preventDefault();

      setError(Validate(Item));
      SetisSubmitting(true);
      if (Item.phone !== "" && Item.password !== "") {
        setLoading(true);
        try {
          const response = await fetch(`${baseUrl.toString()}users/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              mobileNo: Item.phone,
              password: Item.password,
            }),
          });
          setLoading(false);
          const responseData = await response.json();

          console.log(responseData);
          // removed later

          if (responseData.customer !== undefined) {
            dispatch(isLogged(responseData.customer));
             dispatch(addCarPage(true));
            setLoading(false);
            history.goBack()

          } else {
            dispatch(setMyError(responseData));
            setLoading(false);
          }
        } catch (err) {
          console.log(err);
          dispatch(setMyError(err));
        }
        setLoading(false);
      }
    }
  //dispatch prevebent with recieved array from backend

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmitting) {
      
      callback();
     
    }
     
  }, [error, callback, isSubmitting]);

  return {
    handleChange,
    handleSubmit,
    Item,
    error,
    Loading,
    setItem,
    handleSubmitMobile,
  };
};
export default useForm;
