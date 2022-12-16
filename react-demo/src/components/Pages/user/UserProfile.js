import React, { useState, useEffect } from "react";
import profile from "../../../Image/profilepic.svg";
import edit from "../../../Image/edit.svg";
import Loader from "react-loader-spinner";
import emptycart from "../../../Image/emptycart.webp";
import { useDispatch, useSelector } from "react-redux";
import SUV from "../../../Image/Suv.webp";
import PREMIUM from "../../../Image/Premium.webp";
import SEDAN from "../../../Image/Sedan.webp";
import HATCHBACK from "../../../Image/Hatchback.webp";
import TWOWHEELER from "../../../Image/bikeIcon.png";
import { removeCar } from "../../../Redux/UserRedux/UserActions";
import "./UserProfile.css";
import RefreshController from "../../../controllers/refreshController";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { baseUrl } from "../../../variables/variables";
const width = { matches: window.matchMedia("(min-width: 768px)").matches };
function UserProfile() {
  const user = useSelector((state) => state.user.customer);
  const cars = useSelector((state) => state.user.customer.cars);

  const dispatch = useDispatch();

  const [Loading, setLoading] = useState(false);

  const { update } = RefreshController();
  useEffect(() => {
    update({ id: user.id, type: "USER" });
    update({ id: user.id, type: "CARS" });
  }, []);

  function deletecar(car) {
    console.log(car, "hello");
    if (car.orders?.length !== 0) {
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
                Car has Active Orders
              </p>
              <div className="promptbuttoncontainer">
                <button
                  className="promptbuttonYes"
                  onClick={() => {
                    onClose();
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
    } else {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="custom-ui">
              <p style={{ textAlign: "center", marginTop: "3%" }}>
                Delete this car?
              </p>
              <div className="promptbuttoncontainer">
                <button className="promptbuttonNo" onClick={onClose}>
                  <small>No</small>
                </button>
                <button
                  className="promptbuttonYes"
                  onClick={() => {
                    setLoading(true);
                    fetch(` ${baseUrl}cars/${car.id}`, {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({}),
                    })
                      .then((res) => res.json())
                      .then((resp) => {
                        console.log(resp);
                        if (!resp.message.includes("Deleted car.")) {
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
                                    Error deleting Car
                                  </p>
                                  <div className="promptbuttoncontainer">
                                    <button
                                      className="promptbuttonYes"
                                      onClick={() => {
                                        onClose();
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
                        } else {
                          dispatch(removeCar(car.id));
                          console.log(resp);
                          setLoading(false);
                        }
                      })

                      .catch((err) => console.log(err));
                    onClose();
                  }}
                >
                  <small>Yes</small>
                </button>
              </div>
            </div>
          );
        },
      });
      setLoading(false);
    }
  }

  return (
    <div className="userprofilecomponent">
      <div className="profiledetailscontainer">
        <img className="profileimg" src={profile} alt="profileimage"></img>

        <h2>{`Hi ${user.name}`}</h2>
        <section className="mobileUserProfile">
          <h4>{`${user.mobileNo}`}</h4>
          <Link
            to={{
              pathname: "/edituser",
            }}
          >
            <img src={edit} alt="icon"></img>
          </Link>
        </section>

        <section className="addCarContainerUser">
          <button>
            <Link to="/addcar">ADD CAR</Link>
          </button>
        </section>
      </div>

      {cars.length === 0 ? null : (
        <h1 style={{ textAlign: "center" }}>Car Details</h1>
      )}
      <div className="personaldeatils">
        {cars.length === 0
          ? null
          : user.cars.map((onecar) => (
              <div key={onecar.details} className="cars">
                <div className="editicon">
                  <Link
                    to={{
                      pathname: "/addcar",
                      state: onecar,
                    }}
                  >
                    <img src={edit} alt="icon"></img>
                  </Link>
                </div>
                <div className="carImage">
                  <img
                    src={
                      onecar.carType === "SUV"
                        ? SUV
                        : null || onecar.carType === "SEDAN"
                        ? SEDAN
                        : null || onecar.carType === "HATCHBACK"
                        ? HATCHBACK
                        : null || onecar.carType === "PREMIUM"
                        ? PREMIUM
                        : null || onecar.carType === "TWO WHEELER"
                        ? TWOWHEELER
                        : null
                    }
                    alt={emptycart}
                  ></img>
                </div>

                <div className="addresscar">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      maxHeight: "2rem",
                    }}
                  >
                    <h2> {onecar.details}</h2>
                  </div>

                  <p>{onecar.carNo}</p>
                  <p>{onecar.houseName} </p>
                  <p>{onecar.streetName} </p>
                  <p>{onecar.pincode}</p>
                </div>

                <div className="editAndRemove">
                  <div className="carbuttonsremove">
                    <button
                      style={{ marginTop: "1rem" }}
                      onClick={() => deletecar(onecar)}
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              </div>
            ))}
        <Loader
          type="Oval"
          color="#024126"
          height="70"
          width="70"
          visible={Loading}
          style={{
            width: "100%",
            height: "100",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </div>
    </div>
  );
}
export default UserProfile;
