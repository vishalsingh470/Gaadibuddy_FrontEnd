import * as actionTypes from './actions'

const initialState = {
    services: [
        {
            id: 1,
            name: 'Washing',
            price: 599,
            car: {
                type: 'SUV',
                details: 'Hyundai I20 KA 20 1984',
                address: {
                    building: 'Sobha',
                    street: 'Harlur',
                    pincode: 0
                },
                package: 'gold',
                start_date: '30 - 06 - 2020',
                duration: 30
            },
        },
        {
            id: 2,
            name: 'Detailing',
            price: 1599,
            car: {
                type: 'SUV',
                details: 'Hyundai I20 KA 20 1984',
                address: {
                    building: 'Sobha',
                    street: 'Harlur',
                    pincode: 0
                },
                package: 'gold',
                start_date: '25 - 06 - 2020',
                duration: 30
            }
        }
    ],
    addedServices: 0,
    totalPrice: 0
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ITEM:
            let addedItem = state.services.find(item => item.id === action.id)
            let newTotal = state.totalPrice + addedItem.price
            return {
                ...state,
                addedServices: [...state.addedServices, addedItem],
                totalPrice: newTotal
            };
        case actionTypes.REMOVE_ITEM:
            let itemToRemove = state.addedServices.find(item => action.id === item.id)
            let new_items = state.addedServices.filter(item => action.id !== item.id)

            //calculating the total
            newTotal = state.totalPrice - itemToRemove.price
            console.log(itemToRemove)
            return {
                ...state,
                addedServices: new_items,
                totalPrice: newTotal
            };
        default:
            return state;
    }
};

export default reducer;
