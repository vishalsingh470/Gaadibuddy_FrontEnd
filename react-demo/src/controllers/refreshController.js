import React from 'react'
import { useDispatch } from 'react-redux';
import { editUser,refreshCars,replaceCars } from '../Redux/UserRedux/UserActions';
import { baseUrl } from '../variables/variables';

const success = true;
const failure = false;
export default function RefreshController() {
    const dispatch = useDispatch();


    const updateUser = async (data) => {
      //todo update user details
      fetch(`${baseUrl}users/refresh/${data.id}`)
        .then((res) => res.json())
        .then((response) => {
          if (response.customer !== undefined) {
            dispatch(editUser(response.customer));
          }
        })
        .catch((err) => console.log(err));
    };
    
    const updateCars = (data) => {
        fetch(`${baseUrl}users/refreshCars/${data.id}`)
        .then((res) => res.json())
        .then((response) => {
          if (response.cars !== undefined) {
            dispatch(refreshCars(response.cars));
          }
        })
        .catch((err) => console.log(err));
    };

    
function update(data) {
  switch (data.type) {
      case "CARS": {
          updateCars(data)
    }
    case "USER": {
      updateUser(data);
    }
    default:
      return failure;
  }
}
     return {update}
}
