import "./App.css";
import {
  Route,
  BrowserRouter,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home";
import Addpost from "./pages/AddPost";
import Profile from "./pages/Profile";
import "antd/dist/antd.less";
import "antd/dist/antd.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllPosts } from "./redux/actions/postAction";
import { getAllUsers } from "./redux/actions/userActions";
import AllUsers from "./pages/AllUsers";
import EditProfile from "./pages/EditProfile";
import About from "./pages/About";

function App() {
  const { loading, likeOrUnlikeLoading } = useSelector(
    (state) => state.alertsReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getAllUsers());
  }, []);

  console.log(localStorage.getItem("user"));
  return (
    <div className="App">
      {(loading || likeOrUnlikeLoading) && (
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      )}
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" exact element={<Home />} />
            <Route path="/addpost" element={<Addpost />} />
            <Route path="/profile/:userid" element={<Profile />} />
            <Route path="/allusers" element={<AllUsers />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/about" element={<About />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

const ProtectedRoutes = () => {
  return localStorage.getItem("user") ? <Outlet /> : <Navigate to="/login" />;
};
