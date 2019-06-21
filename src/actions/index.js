import { SIGN_IN, SIGN_OUT, ERROR } from "./types";
import api from "../services/api";

export const logout = () => {
  return {
    type: SIGN_OUT
  };
};

export const login = (email, password) => async dispatch => {
  try {
    const response = await api.post("/auth/login", { email, password });
    dispatch({ type: SIGN_IN, payload: response.data.access_token });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};
