export default function ValidateSignUp(Item) {
  let errors = {};
  if (!Item.email) {
    errors.email = "Email is Required";
  } else if (!/\S+@\S+\.\S+/.test(Item.email)) {
    errors.email = "Email ID is invalid";
  }
  if (!Item.password) {
    errors.password = "Password is required";
  } else if (Item.password.length < 6) {
    errors.password = "Minimum 6 charecters required";
  }
  if (!Item.name) {
    errors.name = "Name is required";
  } else if (Item.name.length < 3) {
    errors.name = " Minimum 3 characters allowed";
  }

  if (!Item.phone) {
    errors.phone = "Phone number is required";
  } else if (Item.phone.length !== 10) {
    errors.phone = "Incorrect Phone number";
  }

  return errors;
}
