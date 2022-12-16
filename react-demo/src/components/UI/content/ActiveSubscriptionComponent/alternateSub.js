import React, { useEffect, useState } from "react";
import SANITIZATION from "../../../../Image/sanit.webp";
import DETAILING from "../../../../Image/detailing.svg";
import COMPLETECAREDONE from "../../../../Image/ccDone.svg";
import COMPLETECAREMISSED from "../../../../Image/ccMissed.svg";
import COMPLETECAREPENDING from "../../../../Image/ccPending.svg";
import { Calendar, momentLocalizer } from "react-big-calendar";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./styles.scss";

import moment from "moment";

const Alternatesub = (props) => {
  
  const [refresh,setRefresh] = useState(false)
  const width = { matches: window.matchMedia("(min-width: 768px)").matches };
 

  const CustomToolbar = (toolbar) => {
    const goToBack = () => {
      toolbar.date.setMonth(toolbar.date.getMonth() - 1);
      toolbar.onNavigate("prev");
    };

    const goToNext = () => {
      toolbar.date.setMonth(toolbar.date.getMonth() + 1);
      toolbar.onNavigate("next");
    };

   
    const label = () => {
      
    };
    const date = moment(toolbar.date);
    return (
      <div>
        <label>{label()}</label>

        <div
          className="dateContainerMyOrders"
          style={
            width.matches
              ? {
                  position: "relative",
                  top: "0rem",
                  paddingTop: "3%",
                  paddingBottom: "2%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#D6CECE",
                  border: "none",
                  fontSize: "600",
                }
              : {
                  position: "relative",
                  top: "0rem",

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#D6CECE",
                  border: "none",
                  fontSize: "bold",
                }
          }
        >
          <button
            style={
              width.matches
                ? {
                    color: "#024126",
                    fontSize: "4rem",
                    marginRight: "-1.8rem",
                    width: "100px",
                    background: "none",
                    marginTop: "-3rem",
                  }
                : {
                    color: "#024126",
                    fontSize: "3rem",

                    width: "100px",
                    background: "none",
                    marginTop: "-2rem",
                  }
            }
            onClick={() => {
              goToBack();
              setRefresh(!refresh);
              setRefresh(!refresh);
            }}
          >
            &#8249;
          </button>
          <button
            style={
              width.matches
                ? {
                    background: "#D6CECE",
                    color: "#024126",
                    fontSize: "1.4rem",
                    padding: "0%",
                    width: "15vw",
                  }
                : {
                    background: "#D6CECE",
                    color: "#024126",
                    fontSize: "1rem",
                    padding: "0%",
                    width: "fit-content",
                    minWidth: "40vw",
                  }
            }
            // onClick={goToCurrent}
          >
            <div
              style={
                width.matches
                  ? {
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }
                  : {
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }
              }
            >
              <p
                style={{ marginRight: "5%", fontWeight: "600" }}
              >{`${date.format("MMM")}`}</p>

              <p
                style={{ marginLeft: "5%", fontWeight: "600" }}
              >{`${date.format("YYYY")}`}</p>
            </div>
          </button>
          <button
            style={
              width.matches
                ? {
                    color: "#024126",
                    fontSize: "4rem",
                    marginTop: "-2.8rem",
                    marginLeft: "-2rem",
                    width: "100px",
                    background: "none",
                  }
                : {
                    color: "#024126",
                    fontSize: "3rem",
                    marginRight: "-1.8rem",
                    width: "100px",
                    background: "none",
                    marginTop: "-2rem",
                  }
            }
            onClick={() => {
              goToNext();
              setRefresh(!refresh);
              setRefresh(!refresh);
            }}
          >
            &#8250;
          </button>
        </div>
      </div>
    );
  };
  const localizer = momentLocalizer(moment);

  // const customeEvent = () => {

  //   return (
  //     <div>

  //           <img
  //             src={
  //               SANITIZATION
  //             }
  //             style={{ zIndex: "100" }}
  //             height="30px"
  //             width="30px"
  //           ></img>

  //     </div>
  //   );
  // }
  // const slothandler = (date) => {
  //   console.log("date is",date)
  // }
  return (
    <div>
      <Calendar
        popup
        onShowMore={false}
        onDrillDown={(date, event) => props.doubleClickHandler(date,event)}
        //  onSelectEvent={(date,events) => props.doubleClickHandler(date,events)}
        longPressThreshold={10}
        eventPropGetter={(event) => {
          let newStyle = {};
          if (width.matches === true) {
            if (event.service === "DETAILING") {
              newStyle.backgroundColor = "white";
              newStyle.position = "absolute";
              newStyle.marginTop = "-1%";
              newStyle.marginLeft = "1%";
              newStyle.borderRadius = "0%";
              newStyle.height = "35px";
              newStyle.width = "35px";
              
              newStyle.repeat = "no-repeat";

              newStyle.backgroundImage = `url(${DETAILING})`;
              newStyle.backgroundRepeat = "no-repeat";
              newStyle.backgroundSize = "100% 100%";
            }
            if (event.service === "WASHING") {
              newStyle.backgroundColor = "grey";
              newStyle.borderRadius = "100%";

              newStyle.position = "relative";
              newStyle.marginTop = "20%";
              newStyle.marginLeft = "75%";

              newStyle.height = "20px";
              newStyle.width = "20px";
            }
            if (event.service === "SANITIZATION") {
              newStyle.backgroundColor = "inherit";

              newStyle.position = "absolute";
              newStyle.marginTop = "0.3vw";
              newStyle.marginLeft = "3.5vw";

              newStyle.height = "28px";
              newStyle.width = "28px";
              newStyle.backgroundImage = `url(${SANITIZATION})`;
              newStyle.backgroundRepeat = "no-repeat";
              newStyle.backgroundSize = "100% 100%";
            }
          } else {
            if (event.service === "DETAILING") {
              newStyle.position = "relative";
              newStyle.marginTop = "-3vw";
              newStyle.marginLeft = "0.5vw";
              newStyle.borderRadius = "0%";
              newStyle.height = "20px";
              newStyle.width = "20px";

              newStyle.repeat = "no-repeat";
              newStyle.backgroundColor = "inherit";
              newStyle.backgroundImage = `url(${DETAILING})`;
              newStyle.backgroundRepeat = "no-repeat";
              newStyle.backgroundSize = "100% 100%";
            }
            if (event.service === "WASHING") {
              newStyle.backgroundColor = "grey";
              newStyle.borderRadius = "100%";

              newStyle.position = "relative";
              newStyle.bottom = "0.2vh";
              newStyle.marginLeft = "8.5vw";

              newStyle.height = "2vh";
              newStyle.width = "2vh";
            }
            if (event.service === "SANITIZATION") {
              newStyle.backgroundColor = "inherit";
              newStyle.borderRadius = "0%";
              newStyle.position = "absolute";
              newStyle.marginTop = "1vw";
              newStyle.marginLeft = "4.6vw";

              newStyle.height = "16px";
              newStyle.width = "16px";
              newStyle.backgroundImage = `url(${SANITIZATION})`;
              newStyle.backgroundRepeat = "no-repeat";
              newStyle.backgroundSize = "100% 100%";
            }
             
          }

          if (event.serviceStatus === "Complete") {
            newStyle.backgroundColor = "#137120";
          }

          if (event.serviceStatus === "Incomplete") {
            newStyle.background = "red";
          }
          if (event.serviceStatus === "CarNotPresent") {
            newStyle.background = "white";
            newStyle.border = "3px solid  #137120";

          }
         
          if (event.serviceSurface === "COMPLETECARE") {
            // newStyle.backgroundColor = "black";
            newStyle.borderRadius = "100%";
            newStyle.position = "absolute";
            newStyle.marginTop = "1.5vw";
            newStyle.marginLeft = "5.6vw";
             newStyle.bottom = "-2.5vh";
            newStyle.backgroundImage = `url(${
              event.serviceStatus === "Pending"
                ? COMPLETECAREPENDING
                : null || event.serviceStatus === "Complete"
                ? COMPLETECAREDONE
                : null || event.serviceStatus === "Incomplete"
                ? COMPLETECAREMISSED
                : null
            })`;
           
            newStyle.height = "18px";
            newStyle.width = "18px";
            newStyle.padding="10px"

            newStyle.backgroundRepeat = "no-repeat";
            newStyle.backgroundSize = "100% 100%";
          }
            return {
              className: "",
              style: newStyle,
            };
        }}
        localizer={localizer}
        events={props.superdailyStatus}
        views={["month"]}
        toolbar={true}
        showMultiDayTimes
        // components={{
        //   dateCellWrapper: ColoredDateCellWrapper,
        // }}

        //

        components={{
          toolbar: CustomToolbar,
        }}
      />
    </div>
  );
};
export default Alternatesub;
