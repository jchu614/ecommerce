import { CHANGE_NAVBAR, CHANGE_NAVBAR_RESET } from "../constants/websiteConstants";

export const navbarChangeReducer = (state = {value: true}, action) => {
    switch(action.type) {
        case CHANGE_NAVBAR:
            return {value: action.payload};
        case CHANGE_NAVBAR_RESET:
            return {value: true}
    default:
        return state;
    }
}