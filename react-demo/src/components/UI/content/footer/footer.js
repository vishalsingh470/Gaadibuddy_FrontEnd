import React from "react";
import { Link } from "react-router-dom";
import facebook from '../../../../Image/facebookNew.svg';
// import twitter from '../../../../Image/twitter.svg';
import youtube from '../../../../Image/youtube.svg';
import instagram from "../../../../Image/instagramNew.svg";
import copyRight from "../../../../Image/copyWhite.svg";
import "./footer.css";
 

const Footer = () => {
  
   
  return (
    <div className="footer">
      <div className="footer__navigation-items grow">
        <ul className="grow footer__grow">
          <div>
            <li>
              <a href="https://www.facebook.com/DhulloCarCare/?ref=py_c">
                <div className="footersocials">
                  <img
                    src={facebook}
                    height="20px"
                    width="20px"
                    alt="facebook logo"
                  ></img>
                </div>
              </a>
            </li>
          </div>

          <li>
            <a href="https://instagram.com/dhullo_o?igshid=15qwpio3dk9nz">
              <div className="footersocials">
                <img
                  src={instagram}
                  height="20px"
                  width="20px"
                  alt="twitter logo"
                ></img>
              </div>
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/channel/UCAgDi2GThBUVRCw0A8mAb3Q">
              <div className="footersocials">
                <img
                  src={youtube}
                  height="20px"
                  width="20px"
                  alt="twitter logo"
                ></img>
              </div>
            </a>
          </li>
          <div className="nonSocials">
            <li>
              <Link
                path
                to="/privacy"
                style={{ fontSize: "0.9rem", fontWeight: "200" }}
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                path
                to="/terms"
                style={{ fontSize: "0.9rem", fontWeight: "200" }}
              >
                Terms and Conditions
              </Link>
            </li>
            <li className="tccontainer">
              <small
                path
                to="#"
                style={{
                  fontSize: "smaller",
                  position: "absolute",
                  right: "5%",
                }}
              >
                <img style={{height:'12px',width:'12px',position:'relative',top:'2%',left:'-1%' }} alt={copyRight} src={copyRight}></img> 2021-Dhullo Global Car Care Pvt. Ltd. - All Rights
                Reserved
              </small>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
