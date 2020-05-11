import { combineReducers } from "redux";
import coinRedcuer from "./coinReducer";
import authReducer from "./authReducer";

// const initialState = {
//     currencies: [],
// };

export default combineReducers({
    coins: coinRedcuer,
    auth: authReducer,
});
