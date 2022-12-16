import React from 'react'
import './ServicePage.css';
import ServicePageComponent from '../../UI/PageComponents/ServicePageComponent/ServicePageComponent';
import { ServiceDetailDecider } from './ServicePage.controller';
export default function ServicePage() {
  const fullUrl = window.location.href;
  const stringToSee = "/services/"
  const serviceFromURL = fullUrl.substr(
    fullUrl.indexOf(stringToSee) + stringToSee.length
  );
 const serviceDetails =ServiceDetailDecider(serviceFromURL);
  
//todo take a constant which holds all properties returned from a function after checking enum

  console.log(serviceFromURL);
    return (
        <div className="servicePageContainer">
        <ServicePageComponent
          serviceName={serviceFromURL}
          serviceDetails ={serviceDetails}
        />
        </div>
    )
}
