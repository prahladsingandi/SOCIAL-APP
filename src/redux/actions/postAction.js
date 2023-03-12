import axios from "axios";
import { message } from "antd";

const BASE_URL = "http://localhost:5000";

export const addPost = (values) => async (dispatch) => {
  values.user = JSON.parse(localStorage.getItem("user"))._id;
  values.likes = [];
  values.comments = [];
  dispatch({ type: "LOADING", payload: true });
  try {
    await axios.post(BASE_URL + "/api/posts/addpost", values);
    dispatch({ type: "LOADING", payload: false });
    message.success("Post added successfully");
    window.location.href = "/";
  } catch (e) {
    console.log(e);
    dispatch({ type: "LOADING", payload: false });
    message.error("Something went wrong");
  }
};

export const getAllPosts = () => async (dispatch) => {
  console.log("on get all posts");
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.get(BASE_URL + "/api/posts/getallposts");
    dispatch({ type: "LOADING", payload: false });
    dispatch({ type: "GET_ALL_POSTS", payload: response.data });
  } catch (e) {
    console.log(e);
    dispatch({ type: "LOADING", payload: false });
    message.error("Something went wrong");
  }
};

export const likeOrUnlikePost = (values) => async (dispatch) => {
  values.userid = JSON.parse(localStorage.getItem("user"))._id.toString();

  dispatch({ type: "LIKE_UNLIKE_LOADING", payload: true });
  try {
    await axios.post(BASE_URL + "/api/posts/likeorunlikepost", values);
    dispatch({ type: "LIKE_UNLIKE_LOADING", payload: false });
  } catch (e) {
    console.log(e);
    dispatch({ type: "LIKE_UNLIKE_LOADING", payload: false });
    message.error("Something went wrong");
  }
};

export const addComment = (values) => async (dispatch) => {
  values.userid = JSON.parse(localStorage.getItem("user"))._id.toString();

  dispatch({ type: "ADD_COMMENT_LOADING", payload: true });
  try {
    await axios.post(BASE_URL + "/api/posts/addcomment", values);
    dispatch({ type: "ADD_COMMENT_LOADING", payload: false });
  } catch (e) {
    console.log(e);
    dispatch({ type: "ADD_COMMENT_LOADING", payload: false });
    message.error("Something went wrong");
  }
};

export const editPost = (values) => async (dispatch) => {
  dispatch({ type: "EDIT_POST_LOADING", payload: true });
  try {
    await axios.post(BASE_URL + "/api/posts/editpost", values);
    dispatch({ type: "EDIT_POST_LOADING", payload: false });
    message.success("Post updated successfully");
  } catch (e) {
    console.log(e);
    dispatch({ type: "EDIT_POST_LOADING", payload: false });
    message.error("Something went wrong");
  }
};

export const deletePost = (values) => async (dispatch) => {
  dispatch({ type: "DELETE_POST_LOADING", payload: true });
  try {
    await axios.post(BASE_URL + "/api/posts/deletepost", values);
    dispatch({ type: "DELETE_POST_LOADING", payload: false });
    message.success("Post deleted successfully");
  } catch (e) {
    console.log(e);
    dispatch({ type: "DELETE_POST_LOADING", payload: false });
    message.error("Something went wrong");
  }
};
