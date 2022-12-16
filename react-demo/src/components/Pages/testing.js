// import React, { useState } from "react";
// import './testing.css'
 
// const Test = () => {
//   const [state, setState] = useState({
//     selectedcar: true,
//     mycars: [],
//     date: '',
//     time:''
//   });
//   let tempcars = [];
//   const handleChange = (e) => {
//     const { name, value, checked, type } = e.target;
//     if (type === "checkbox") {
//       if (checked === true) {
//         tempcars = state.mycars.concat(value);
//         setState({ ...state,selectedcar:false, mycars: tempcars });
//       } else  {
//         setState({...state,
//           mycars: state.mycars.filter(function (val) {return val!== value})
//         })
//       }
//     } else setState({...state, [name]: value });
//   };
//   console.log(state);

//   const cars = [
//     {
//       carId: 1,
//       carName: "benz",
//       address: "road",
//       category: "SEDAN",
//     },
//     {
//       carId: 2,
//       carName: "Audi",
//       address: "Sky",
//       category: "hatchback",
//     },
//     {
//       carId: 3,
//       carName: "BMW",
//       address: "air",
//       category: "SUV",
//     },
//   ];
//   let finaltempcars = [];
//   for (let i = 0; i < state.mycars.length; i++) {
//     finaltempcars.push(state)
    
//   }
//   for (let i = 0; i <finaltempcars.length; i++){
//     finaltempcars[i].date = state.date
//     finaltempcars[i].time = state.time
//     finaltempcars[i].mycar = state.mycars[finaltempcars.length - 1];
    
//   }
    
//   console.log(finaltempcars)
//   return (
//     <div
//       style={{
//         height: "40rem",
//         margin: "5rem",
//         border: "2px solid darkblue",
//         padding: "2rem",
//       }}
//     >
//       <h2>COMPONENT</h2>
//       {cars.map((onecar) => (
//         <div key={onecar.id}>
//           <div
//             style={{
//               height: "5rem",
//               width: "12rem",
//               border: "2px solid black",
//               margin: "2rem",
//             }}
//           >
//             <input
//               type="checkbox"
//               name={onecar.carName}
//               value={onecar.carName}
//               onChange={handleChange}
//             />

//             <label>{onecar.carName}</label>
//           </div>
//         </div>
//       ))}
//       <div>
//         <input
//           className={state.selectedcar ? "disabled" : "enabled"}
//           type="date"
//           name="date"
//           onChange={handleChange}
//           disabled={state.selectedcar}
//         ></input>
//       </div>
//       <div>
//         <input
//           className={state.selectedcar ? "disabled" : "enabled"}
//           type="time"
//           name="time"
//           onChange={handleChange}
//           disabled={state.selectedcar}
//         ></input>
//       </div>
//     </div>
//   );
// };
// export default Test;
