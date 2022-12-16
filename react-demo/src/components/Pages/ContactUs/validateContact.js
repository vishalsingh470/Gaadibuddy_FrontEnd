export default function ValidateContact(values) {
    console.log(values)
    let errors = {}
    if (values.user_name ==='' ) {
        errors.userName = "Username Required"
        return errors
    }
    if (values.user_email === "") {
      errors.email = "Email Required";
      return errors;
    }
    if (values.user_mobileno === "") {
      errors.mobileNo = "Phone Number Required";
      return errors;
    }
    if (values.message === "") {
      errors.message = "Message Required";
      return errors;
    } else {
      return errors;
    }
    
   
}