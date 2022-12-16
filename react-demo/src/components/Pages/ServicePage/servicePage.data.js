import WashingImage from "../../../Image/washing.webp";
import WaxingImage from "../../../Image/waxing.jpg";
import DetailingImage from "../../../Image/detailingTop.webp";
import SanitizationImage from "../../../Image/servicesanitization.webp";
import JumpStartImage from "../../../Image/jumpstart.jpg";
import interiorDetailingImage from "../../../Image/Interior_big.webp";
import exteriorDetailingImage from "../../../Image/Exterior_big.webp";
import interiorSanitization from "../../../Image/sanitization-interior.jpg";
import exteriorSanitization from "../../../Image/sanitization-exterior.jpg";

export const ServiceDetails = [
  {
    service: "washing",
    serviceDescription:
      "At Dhullo, we are reinventing the car wash and detailing concept.We use only 1.5 liters of water to make your car sparkle.We use different microfiber towels for glass and body to avoid swirls.We use separate brushes for the tyre rim and interior.",
    serviceOptions: ["ONE TIME", "SILVER", "GOLD", "PLATINUM"],
    servicePoints: [],
    serviceImage: WashingImage,
    oneTimePoints: [
      "Outer wash, interior cleaning",
      "Vacuuming and underhood dusting ",
      "Starts from Rs. 399",
    ],
    silverPoints: [
      "Thrice a week outer wash",
      "Twice a month basic interior cleaning",
      "Starts from Rs. 699",
    ],
    goldPoints: [
      "6 times a week outer wash",
      "Weekly once basic interior cleaning",
      "Starts from Rs. 999",
    ],
    platinumPoints: [
      "6 times a week outer wash",
      "Weekly once interior cleaning ",
      "One complete care - waxing, underhood dusting, deep interior cleaning, dashboard and tyre polish.",
      "Starts from Rs. 1999",
    ],
    interiorimage: null,
    exteriorImage: null,
    interiorPoints: [],
    exteriorPoints: [],
  },
  {
    service: "waxing",
    serviceDescription:
      "Every Car deserves a shine once a while. At Dhullo our professionals shine your car with Branded wax adding new life to your car.",
    interiorPoints: [],
    exteriorPoints: [],
    serviceOptions: [],

    servicePoints: [
      "Exterior Waxing",
      "Helps your car look brand new",
      "Carefully performed by professionals",
      "Starts at Rs. 1599",
    ],
    oneTimePoints: [],
    silverPoints: [],
    goldPoints: [],
    platinumPoints: [],
    serviceImage: WaxingImage,
    fullPoints: [],
  },
  {
    service: "detailing",
    serviceDescription:
      "Our car detailing services focuses on eliminating the imperceptible dust and dirt that sticks on to your car’s body. Thus, we ensure we provide your car a showroom finish. Further, we deliver shiny exteriors, crystal clean windows and maintain car’s cleanliness",
    serviceOptions: ["INTERIOR", "EXTERIOR", "FULL"],
    servicePoints: [],
    interiorPoints: [
      "Deep interior cleaning",
      "Interior germ treatment",
      "Seat and AC vents cleaning",
      "Dashboard cleaning and polishing",
      "Starts from Rs. 1599",
    ],
    exteriorPoints: [
      "Claying",
      "Underhood cleaning",
      "Tyre polishing and rim shining",
      "Waxing and polishing ",
      "Starts from Rs. 3499",
    ],
    fullPoints: [
      "Deep interior cleaning",
      "Interior germ treatment",
      "Tyre polishing and rim shining",
      "Waxing and polishing ",
      "Starts from Rs. 4999",
    ],
    oneTimePoints: [],
    silverPoints: [],
    goldPoints: [],
    platinumPoints: [],
    serviceImage: DetailingImage,
    interiorimage: interiorDetailingImage,
    exteriorImage: exteriorDetailingImage,
  },
  {
    service: "sanitization",
    serviceDescription:
      "We offer exterior, interior and, complete sanitization packages for our customers. We follow a deep-clean sanitization procedure that cleans every inch of the car. Our disinfection methods will shield you from viruses and bacteria thus, protecting you and your family.",
    serviceOptions: ["INTERIOR", "EXTERIOR", "FULL"],
    servicePoints: [],
    interiorPoints: [
      "Complete Interior Wash with a vacuum.",
      "Germ and virus treatment for dashboard, seats and key interior parts.",
      "Starts from Rs. 599",
    ],
    exteriorPoints: [
      "Complete Exterior Wash",
      "Germ and Virus treatment for complete exterior and interior body.",
      "Starts from Rs. 599",
    ],
    fullPoints: [
      "Complete Exterior and Interior Wash.",
      "Germ and Virus treatment for complete exterior and interior body.",
      "Starts from Rs. 999",
    ],
    oneTimePoints: [],
    silverPoints: [],
    goldPoints: [],
    platinumPoints: [],
    serviceImage: SanitizationImage,
    interiorimage: interiorSanitization,
    exteriorImage: exteriorSanitization,
  },
  {
    service: "jumpstart",
    serviceDescription:
      "Dead Battery should not be a roadblock on your journey. At Dhullo our professionals will inspect your Car battery and add spark to it using a jumpstart cable and external battery.",
    serviceOptions: [],
    servicePoints: [
      "Battery voltage check",
      "Battery jump start by professionals",
      "Tips and Tricks for battery maintenance by professionals ",
      "Starts from Rs. 349 ",
    ],
    fullPoints: [],
    interiorPoints: [],
    exteriorPoints: [],
    oneTimePoints: [],
    silverPoints: [],
    goldPoints: [],
    platinumPoints: [],
    serviceImage: JumpStartImage,
    interiorimage: null,
    exteriorImage: null,
  },
];
