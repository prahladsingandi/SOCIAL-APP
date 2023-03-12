import { Button, Col, Modal, Row } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import Post from "../components/Post";

function Profile(props) {
  const { users } = useSelector((state) => state.usersReducer);
  const { posts } = useSelector((state) => state.postReducers);
  const { userid } = useParams();
  const user = users.find((obj) => obj._id == userid);
  const usersPost = posts.filter((obj) => obj.user._id == userid);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [followersModalDisplay, setfollowersModalDisplay] = useState(false);
  const [followingModalDisplay, setfollowingModalDisplay] = useState(false);

  return (
    <DefaultLayout>
      {users.length > 0 && (
        <>
          <Row justify="center">
            <Col lg={12} sm={24} xs={24}>
              <div className="bs1 m-2 p-2 text-left">
                <div className="d-flex align-items-center">
                  {user.profilePicture === "" &&
                  user.profilePicture !== null ? (
                    <p className="profilepic2 ">{user.username[0]}</p>
                  ) : (
                    <img src={user.profilePicture} height="60" width="60" />
                  )}

                  <div className="text-left ml-3">
                    <p style={{ color: "black" }}>{user.username}</p>
                    <p style={{ fontSize: 14 }}>
                      {moment(user.createdAt).format("MMM dd yyyy")}
                    </p>
                    {currentUser._id == userid && (
                      <Button>
                        <Link to="/editprofile">Edit Profile</Link>
                      </Button>
                    )}
                  </div>
                </div>

                <p style={{ fontSize: 14, color: "black" }}>
                  {user.bio == "" ? "Fullstack developer" : user.bio}
                </p>
                <div className="text-left">
                  <Button
                    className="mr-2"
                    onClick={() => setfollowersModalDisplay(true)}
                  >
                    Followers : {user.followers.length}
                  </Button>
                  <Button onClick={() => setfollowingModalDisplay(true)}>
                    Following : {user.following.length}
                  </Button>
                </div>
                <p style={{ fontSize: 14, color: "black" }}>
                  Total posts {usersPost.length}
                </p>
              </div>
            </Col>
          </Row>

          {user.followers.find((obj) => obj == currentUser._id) ||
          user.privateAccount == false ||
          user._id == currentUser._id ? (
            <Row gutter={16} justify="center">
              {usersPost.map((post) => {
                return (
                  <Col lg={5} sm={24} xs={24}>
                    <Post post={post} postInProfilePage={true} />
                  </Col>
                );
              })}
            </Row>
          ) : (
            <p>This account is private</p>
          )}
          <Modal
            title="Followers"
            visible={followersModalDisplay}
            closable={false}
            onCancel={() => setfollowersModalDisplay(false)}
            onOk={() => setfollowersModalDisplay(false)}
          >
            {user.followers.map((obj) => {
              const followerUser = users.find((o) => o._id == obj);
              return (
                <div className="d-flex align-items-center bs1 p-1 mt-2">
                  {followerUser.profilePicture === "" ? (
                    <span className="profilepic1 d-flex align-items-center">
                      {followerUser.username[0]}
                    </span>
                  ) : (
                    <img
                      src={followerUser.profilePicture}
                      alt=""
                      height="35"
                      width="35"
                      style={{ borderRadius: "50%" }}
                    />
                  )}
                  <div className="ml-2">
                    <div style={{ margin: 2 }}>
                      <Link>{followerUser.username}</Link>
                    </div>

                    <div style={{ margin: 2, color: "black", fontSize: 14 }}>
                      Since{" - "}
                      {moment(followerUser.createdAt).format("MMM DD yyy")}
                    </div>
                  </div>
                </div>
              );
            })}
          </Modal>

          <Modal
            title="Following"
            visible={followingModalDisplay}
            closable={false}
            onCancel={() => setfollowingModalDisplay(false)}
            onOk={() => setfollowingModalDisplay(false)}
          >
            {user.following.map((obj) => {
              const followingUser = users.find((o) => o._id == obj);
              return (
                <div className="d-flex align-items-center bs1 p-1 mt-2">
                  {followingUser.profilePicture === "" ? (
                    <span className="profilepic1 d-flex align-items-center">
                      {followingUser.username[0]}
                    </span>
                  ) : (
                    <img
                      src={followingUser.profilePicture}
                      alt=""
                      height="35"
                      width="35"
                      style={{ borderRadius: "50%" }}
                    />
                  )}
                  <div className="ml-2">
                    <div style={{ margin: 2 }}>
                      <Link>{followingUser.username}</Link>
                    </div>

                    <div style={{ margin: 2, color: "black", fontSize: 14 }}>
                      Since{" - "}
                      {moment(followingUser.createdAt).format("MMM DD yyyy")}
                    </div>
                  </div>
                </div>
              );
            })}
          </Modal>
        </>
      )}
    </DefaultLayout>
  );
}

export default Profile;
