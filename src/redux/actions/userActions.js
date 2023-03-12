import axios from "axios";
import { message, Alert } from "antd";

const BASE_URL = "http://localhost:5000";

export const userRegister = (values) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    await axios.post(BASE_URL + "/api/users/register", values);
    dispatch({ type: "LOADING", payload: false });
    message.success("User registered successfully");
    window.location.href = "/login";
  } catch (e) {
    console.log(e);
    dispatch({ type: "LOADING", payload: false });
    message.error("Something went wrong");
  }
};

export const userLogin = (values) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.post(BASE_URL + "/api/users/login", values);
    dispatch({ type: "LOADING", payload: false });

    if(response.data == "Invalid credentials"){
      message.warning("Invalid credentials");
    }else{
      message.success("Login success");
      localStorage.setItem("user", JSON.stringify(response.data));
      window.location.href = "/";
    }

  } catch (e) {
    console.log(e);
    dispatch({ type: "LOADING", payload: false });
    message.error("Something went wrong while logging in");
  }
};

export const getAllUsers = (values) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.get(BASE_URL + "/api/users/getallusers");
    dispatch({ type: "LOADING", payload: false });
    dispatch({ type: "GET_ALL_USERS", payload: response.data });
  } catch (e) {
    console.log(e);
    dispatch({ type: "LOADING", payload: false });
    message.error("Something went wrong");
  }
};

export const followUser = (values) => async (dispatch) => {
  dispatch({ type: "FOLLOW_LOADING", payload: true });
  console.log("values", values);
  try {
    const response = await axios.post(
      BASE_URL + "/api/users/followuser",
      values
    );
    dispatch({ type: "FOLLOW_LOADING", payload: false });
    message.success("Followed successfully");
  } catch (e) {
    console.log(e);
    dispatch({ type: "FOLLOW_LOADING", payload: false });
    message.error("Something went wrong");
  }
};

export const unfollowUser = (values) => async (dispatch) => {
  dispatch({ type: "UNFOLLOW_LOADING", payload: true });
  console.log("values", values);
  try {
    const response = await axios.post(
      BASE_URL + "/api/users/unfollowuser",
      values
    );
    dispatch({ type: "UNFOLLOW_LOADING", payload: false });
    message.success("UnFollowed successfully");
  } catch (e) {
    console.log(e);
    dispatch({ type: "UNFOLLOW_LOADING", payload: false });
    message.error("Something went wrong");
  }
};

export const editUser = (values) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.post(BASE_URL + "/api/users/edit", values);
    dispatch({ type: "LOADING", payload: false });
    message.success("User profile updated successfully");

    localStorage.setItem("user", JSON.stringify(response.data));
    window.location.href = `profile/${response.data._id}`;
  } catch (e) {
    console.log(e);
    dispatch({ type: "LOADING", payload: false });
    message.error("Something went wrong");
  }
};
