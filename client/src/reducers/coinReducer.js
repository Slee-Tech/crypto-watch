import {
    GET_COINS,
    GET_CACHED_COINS,
    GET_FILTERED_COINS,
    GET_DETAILS,
    TOGGLE_LOADING,
    GET_USER_COINS,
    ADD_CURRENT_COIN,
} from "../actions/types";

const initialState = {
    coins: [],
    filterResults: [],
    currentDetails: {},
    currentDayDetails: {},
    isLoading: false,
    currentUserCoins: ["coin1", "coin2"],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_COINS:
            return {
                ...state,
                coins: [...action.payload],
                isLoading: false,
            };
        case GET_FILTERED_COINS:
            console.log(action.payload);
            const currentCoinsToBeFiltered = state.coins.filter((result) => {
                return (
                    result.name.includes(action.payload) ||
                    result.symbol.includes(action.payload.toUpperCase())
                );
            });

            return {
                ...state,
                filterResults: currentCoinsToBeFiltered,
                isLoading: false,
            };
        case GET_DETAILS:
            const details = state.coins.find(
                (result) => result.id === action.payload
            );
            console.log(`In reducer: ${Object.keys(details)}`);
            const oneDayDetails = details["1d"] || {};
            console.log(oneDayDetails.price_change);
            return {
                ...state,
                currentDetails: details,
                currentDayDetails: oneDayDetails,
            };
        case TOGGLE_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case GET_USER_COINS:
            return {
                ...state,
                currentUserCoins: [...action.payload],
            };
        case ADD_CURRENT_COIN:
            return {
                ...state,
                currentUserCoins: [action.payload, ...state.currentUserCoins],
            };
        default:
            return state;
    }
}
