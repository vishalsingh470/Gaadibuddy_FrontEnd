export const OneTimeToggle = category =>{
    return{
        type: 'ONETIME_TOGGLE',
        payload:category
        
    }
}
export const SilverToggle = (category)=>{
    return{
        type: 'SILVER_TOGGLE',
        payload:category
    }
}

export const GoldToggle = (category)=>{
    return{
        type: 'GOLD_TOGGLE',
        payload:category
    }
}

export const PlatinumToggle = (category)=>{
    return{
        type: 'PLATINUM_TOGGLE',
        payload:category
    }
}


