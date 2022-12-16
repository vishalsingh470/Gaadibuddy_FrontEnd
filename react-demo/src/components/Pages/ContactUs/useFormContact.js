import React, { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { baseUrl } from '../../../variables/variables';

//*FUNCTION TO FIND EMPTY OBJECT
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}


export default function UseFormContact(ValidateContact) {

  const [contact, setContact] = useState({
    user_name: "",
    user_email: "",
    user_mobileno: "",
    message: "",
  });


  const onChangehandler = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const [error, setError] = useState(false);
  
  const onsubmitHandler = async (e) => {
    
     
    e.preventDefault();
    setError(ValidateContact(contact));
    console.log(error);
    if (isEmpty(error)) {
      
      const response = await fetch(`${baseUrl.toString()}users/enquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: contact.user_name,
          mobileNo: contact.user_mobileno,
          email: contact.user_email,
          message: contact.message,
          enquiredAt:new Date()
        }),
      })
        .then((res) => res.json())
        .then((resp) => {
          confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className="custom-ui">
                  <p
                    style={{
                      textAlign: "center",
                      marginTop: "3%",
                    }}
                  >
                    {resp}
                  </p>
                  <div className="promptbuttoncontainer">
                    <button
                      className="promptbuttonYes"
                      onClick={() => {
                        onClose();
                        setContact({
                          message: "",
                          user_email: "",
                          user_mobileno: "",
                          user_name: "",
                        });
                        // dispatch(RemoveFromCart(item));
                      }}
                    >
                      <small>OK</small>
                    </button>
                  </div>
                </div>
              );
            },
          });
        });
    }
  };

  return { contact, onsubmitHandler, onChangehandler, error };
}
