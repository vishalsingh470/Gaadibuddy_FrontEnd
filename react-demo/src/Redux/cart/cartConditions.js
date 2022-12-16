export const addItemsToCart = (CartItems, CartItemToAdd) => {
  const existingCartItem = CartItems.find(
    (CartItem) =>
      CartItem.carId === CartItemToAdd.carId &&
      CartItem.service === CartItemToAdd.service &&
      CartItem.serviceStartDate === CartItemToAdd.serviceStartDate &&
      CartItem.package === CartItemToAdd.package 
  );

  if (existingCartItem) {
    alert("already added to cart")
    return(CartItems)
  }

  return [...CartItems, CartItemToAdd];
};

export const removeFromCart = (CartItems, RemoveItem) => {
const filteredItems= CartItems.filter(item=>(item.id!==RemoveItem.id ))
  return  filteredItems
};
export const updateFromCart = (CartItems, UpdateItem) => {
  const newCartItems = []
  for (let i = 0; i < CartItems.length; i++){
    if (CartItems[i].id === UpdateItem.id) {
      newCartItems.push(UpdateItem)
    } else {
      newCartItems.push(CartItems[i])
    }
  }
  return newCartItems;
};
