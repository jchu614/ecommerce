import { CHANGE_NAVBAR } from "../constants/websiteConstants";

export const changeNavbar = () => (dispatch) => {
    const value = window.scrollY >= 120 ? false : true
    dispatch({type: CHANGE_NAVBAR, payload: {value}});
}
