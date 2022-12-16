import { ServiceDetails } from "./servicePage.data"
export const ServiceDetailDecider = (serviceName) => {

    const requiredService = ServiceDetails.filter((oneService) => oneService.service === serviceName)
    if(requiredService.length !== 0)
        return requiredService[0];
    else
        return []
    
}