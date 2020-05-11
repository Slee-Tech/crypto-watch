import {
    GET_COINS,
    GET_CACHED_COINS,
    GET_FILTERED_COINS,
    GET_DETAILS,
    TOGGLE_LOADING,
    GET_USER_COINS,
    ADD_CURRENT_COIN,
} from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";

// fetch coins from API here
export const getCoins = () => (dispatch, getState) => {
    // only calls the api once if already fetched coins
    // console.log(getState().coins.coins);
    // if (getState().coins.coins.length === 0) {
    dispatch({
        type: TOGGLE_LOADING,
    });

    console.log("fetching from API");
    axios
        .get(
            "https://api.nomics.com/v1/currencies/ticker?key=24e295ec3c16f93ee8f38c7a4569b3bb&interval=1d,30&convert=EUR"
        )
        .then((res) => {
            dispatch({
                type: GET_COINS,
                payload: res.data,
            });
        })
        .catch((err) => console.log(err));

    // } else {
    // console.log("Coins already in state, API not called");
    // dispatch({
    //     type: GET_CACHED_COINS,
    // });
    //}
};

export const getCachedCoins = () => (dispatch) => {
    console.log("Coins already cached, not calling API.");
    dispatch({
        type: GET_CACHED_COINS,
    });
};

// will need to add a loading state/action dispatch here
export const getFilteredCoins = (currencySearch) => (dispatch) => {
    console.log("Calling coin filter action");
    dispatch({
        type: TOGGLE_LOADING,
    });

    dispatch({
        type: GET_FILTERED_COINS,
        payload: currencySearch,
    });

    // dispatch({
    //     type: TOGGLE_LOADING,
    // });
};

export const getDetails = (currency) => (dispatch) => {
    dispatch({
        type: GET_DETAILS,
        payload: currency,
    });
};

export const toggleLoading = () => (dispatch) => {
    dispatch({
        type: TOGGLE_LOADING,
    });
};

export const getUserCoins = () => (dispatch, getState) => {
    const token = getState().auth.token;
    axios
        .get("http://localhost:5000/currencies", {
            headers: { Authorization: `bearer ${token}` },
        })
        .then((res) => {
            dispatch({
                type: GET_USER_COINS,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

export const addCurrentCoin = (coinData) => (dispatch, getState) => {
    const token = getState().auth.token;
    axios
        .post("http://localhost:5000/currencies", coinData, {
            headers: { Authorization: `bearer ${token}` },
        })
        .then((res) => {
            dispatch({
                type: ADD_CURRENT_COIN,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
