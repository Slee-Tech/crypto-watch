// will keep auth actions
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from "./types";

export const loadUser = () => (dispatch, getState) => {
    // dispatch user loading initially
    dispatch({
        type: USER_LOADING,
    });

    //get token from local storage, using getState to get from auth reducer
    const token = getState().auth.token;
    const authHeader = new Headers();

    if (token) {
        authHeader.append("Content-Type", "application/json");
        authHeader.append("x-auth-token", token);
    }

    fetch("http://localhost:5000/auth/user", {
        method: "get",
        headers: authHeader,
    })
        .then((response) => {
            // throw error is status is code is not successful from API
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then((res) => {
            dispatch({
                type: USER_LOADED,
                payload: res,
            });

            // may want to parse JSON first?
        })
        .catch((err) => {
            dispatch({
                type: AUTH_ERROR,
            });
            console.log(`Error in loadUser: ${err}`);
        });
};

export const register = ({ name, email, password }) => (dispatch) => {
    fetch("http://127.0.0.1:5000/auth/register", {
        method: "post",
        body: JSON.stringify({ name, email, password }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            // throw error is status is code is not successful from API
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const data = response.json();
            console.log(data);
            return data;
        })
        .then((res) =>
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res,
            })
        )
        .catch((err) => {
            dispatch({
                type: REGISTER_FAIL,
            });
            console.log(`Error in register: ${err}`);
        });
};

// login user
export const login = ({ email, password }) => (dispatch) => {
    fetch("http://127.0.0.1:5000/auth/login", {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            // this checks to make HTTP status is ok before continuing, a 400 response won't
            // necessarily result in hitting the catch block
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then((res) =>
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res,
            })
        )
        .catch((err) => {
            dispatch({
                type: LOGIN_FAIL,
            });
            console.log(`Error in login: ${err}`);
        });
};
// logout user
export const logout = () => (dispatch) => {
    dispatch({
        type: LOGOUT_SUCCESS,
    });
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
    // Get token from localstorage
    const token = getState().auth.token;
    const authHeader = new Headers();
    if (token) {
        authHeader.append("Content-Type", "application/json");
        authHeader.append("Authorization", `bearer ${token}`);
    }

    return authHeader;
};
