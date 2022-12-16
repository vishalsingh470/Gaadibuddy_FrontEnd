import React,{useEffect} from "react";
 
import { useSelector } from "react-redux";
 
import SignInUPComponent from "../../Pages/signIn/signIn";
 
import AddCarComponent from "../../UI/content/addcarcomponent/addcarcomponent";
 


function AddCar(props) {
  const LoginToggle = useSelector((state) => state.loginToggle.Toggle);
   
  useEffect(() => {
    document.body.scrollTop = 0;
    
  }, [])
  const isSignedIn = useSelector((state) => state.user.UserSignedIn);
   
  return (
    <div>
      {isSignedIn ? (
        <AddCarComponent click={props.location.click} />
      ) : (
        <div>
          {LoginToggle ? (
            <SignInUPComponent
              
              
            />
          ) : null}
        </div>
      )}
    </div>
  );
}
export default AddCar;
