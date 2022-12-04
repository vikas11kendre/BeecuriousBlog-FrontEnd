import {SETID } from '../constants/actionTypes';


 const id=(id=null,action) => {
    switch (action.type) {
        case SETID:
            return action.payload;
        default:
            return id;
    }
} 

export default id;
