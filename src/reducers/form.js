import {TOGGLE } from '../constants/actionTypes';


 const form=(form=false,action) => {
    switch (action.type) {
        case TOGGLE:
            return action.payload;
        default:
            return form;
    }
} 

export default form;
