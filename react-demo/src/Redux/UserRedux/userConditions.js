import { editCar } from "./UserActions";
import produce from "immer";
export const addcarfunc = (customer, newcar) => {
  customer.cars.push(newcar);
  const newCustomer = { ...customer }
  return newCustomer
};
// export const addaddressfunc = (prevaddress, newaddress) => {
//   return [...prevaddress, newaddress];
// };
export const removecarfunc = (customer, cartoberemoved) => {
  const items = customer.cars.filter((item) => item.id !== cartoberemoved);
  customer.cars = [];
  items.map((item) => customer.cars.push(item));
  const newCustomer = { ...customer }
  return newCustomer;
};
export const addSchedulesFunc = (prevSchedules, newId) => {
  if (
    prevSchedules === undefined &&
    newId === null &&
    prevSchedules.length === null
  ) {
    return [prevSchedules, newId];
  } else {
    for (let i = 0; i < prevSchedules.length; i++) {
      if (prevSchedules[i].id !== newId.id) return [...prevSchedules, newId];
      else return prevSchedules;
    }
  }
};

export const updateWithOrder = (Customer, newOrder) => {
 
  for (let i = 0; i < Customer.cars.length; i++){
    if (Customer.cars[i].id === newOrder.carId) {
      Customer.cars[i].orders.push(newOrder)
    }
  }
 

  
  return Customer;
};
export const editcarfunc = (prevCustomer, editedCar) => {
  const updatedCars = prevCustomer.cars.map((onecar) =>
    onecar.id === editedCar.id ? editedCar : onecar
  );
  prevCustomer.cars = [];
  updatedCars.map((car) => prevCustomer.cars.push(car));
  const newCars = { ...prevCustomer.cars }
  const newCustomer = { ...prevCustomer }
  return newCustomer;
  
  
};

// export const removeaddressfunc = (prevaddress, addresstoberemoved) => {
//   const items = prevaddress.filter((item) => item.id !== addresstoberemoved);

//   return items;
// };
export const replaceUserFunction = (user, newUser) => {
  user.name = newUser.name;
  user.mobileNo = newUser.mobileNo;
  user.email = newUser.email;
const newUSer = {...user}
  return newUSer;
};
 
export const refreshCarsFunc = (user, newCars) => {
  var i = 0;
  var j = 0;
  if (user.cars !== undefined || user.cars?.length !== 0) {
    
    for (i = 0; i < user.cars.length; i++) {
      for (j = 0; j < newCars.length; j++) {
        if (user.cars[i].id === newCars[j].id)
        {
          user.cars[i].details = newCars[j].details;
          user.cars[i].carType = newCars[j].carType;
          user.cars[i].houseName = newCars[j].houseName;
          user.cars[i].streetName = newCars[j].streetName;
          user.cars[i].pincode = newCars[j].pincode;
          user.cars[i].carMake = newCars[j].carMake;
          user.cars[i].carNo = newCars[j].carNo;
          }
      }
    }
    const newCarsTemp = { ...user.cars }
    const newUser = { ...user }
    return newUser;
 
  };
}
 

export const addItemsToCart = (CartItems, CartItemToAdd) => {
  const existingCartItem = CartItems.find(
    (CartItem) =>
      CartItem.carId === CartItemToAdd.carId &&
      CartItem.service === CartItemToAdd.service &&
      CartItem.serviceStartDate === CartItemToAdd.serviceStartDate &&
      CartItem.package === CartItemToAdd.package
  );

  if (existingCartItem) {
    alert("already added to cart");
    return CartItems;
  }

  return [...CartItems, CartItemToAdd];
};

export const refreshCartFunc = (user, newCart) => {
  user.cart = newCart;
  return user;
};
export const removeFromCart = (customer, RemoveItem) => {
  const index = customer.cart.findIndex((x) =>
    x.amountPaid === RemoveItem.amountPaid &&
    x.carId === RemoveItem.carId &&
    x.service === RemoveItem.service &&
    x.package === RemoveItem.package &&
    x.packageDuration === RemoveItem.packageDuration
    );
  console.log(index);
  if (index !== -1) {
    customer.cart.splice(index,1)
    
  }
    return customer;
};
export const updateOrderFunc = (prevCustomer, carAndOrders) => {
   for (let i = 0; i < prevCustomer.cars.length; i++) {
     if (prevCustomer.cars[i].id === carAndOrders.carId) {

       prevCustomer.cars[i].orders = carAndOrders.orders;
      
     }
   }
  return prevCustomer;


};
export const updateImageFunc = (prevCustomer, orderAndImage) => {
    console.log(orderAndImage)
 
  prevCustomer.cars.map((oneCar) => {
    oneCar.orders.map((oneOrder) => {
      oneOrder.dailySchedules.map((oneJob) => {
        console.log(oneJob)
        if (oneJob._id === orderAndImage.eventId) {
          console.log("job  Is ", oneJob)
           oneJob.updatedImage = orderAndImage.image;
           console.log("job after  Is ", oneJob);
        }
       })
     })
  })
      
  const newCustomer = Object.assign({},prevCustomer); ;
  return newCustomer;
   
 
 
};
