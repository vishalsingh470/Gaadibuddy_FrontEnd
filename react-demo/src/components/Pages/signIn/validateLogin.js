export default function Validate(Item) {
  let errors = {};
  if (!Item.phone) {
    errors.phone = "Phone number is required";
  } else if (Item.phone.length !== 10  ) {
    errors.phone = "Invalid Phone Number.";
  }
  if (!Item.password) {
    errors.password = "Password is required";
  } else if (Item.password.length < 6) {
    errors.password = "Incorrect Password";
  }

  return errors;
}
