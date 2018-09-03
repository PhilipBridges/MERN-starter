import axios from "axios";
import jwt_decode from "jwt-decode";

import { setAuthToken } from "../utils";
import { GET_ERRORS, SET_CURRENT_USER } from "./constants";

export const registerUser = (data, history) => dispatch => {
  axios
    .post("/api/users/register", data)
    .then(res => history.push("/login"))
    .then(() =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const loginUser = data => dispatch => {
  axios
    .post("/api/users/login", data)
    .then(res => {
      const { token } = res.data;
      
      localStorage.setItem("token", token);

      setAuthToken(token);

      const jwt = jwt_decode(token);

      dispatch(setCurrentUser(jwt));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = jwt => {
  return {
    type: SET_CURRENT_USER,
    payload: jwt
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("token");

  setAuthToken(false);

  dispatch(setCurrentUser({}));
};
