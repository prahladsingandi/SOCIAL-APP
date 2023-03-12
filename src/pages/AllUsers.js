import { Button, Col, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import {
  followUser,
  getAllUsers,
  unfollowUser,
} from "../redux/actions/userActions";

import { UserAddOutlined, CheckOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import moment from "moment";
function AllUsers() {
  const { users } = useSelector((state) => state.usersReducer);
  const { followLoading, unfollowLoading } = useSelector(
    (state) => state.alertsReducer
  );
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    dispatch(getAllUsers());
  }, [followLoading, unfollowLoading]);

  return (
    <DefaultLayout>
      <div>
        <Row justify="center">
          <Col lg={20} className="d-flex mt-3">
            <Input
              className="search users"
              style={{ width: "80%" }}
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder="search users"
            />
          </Col>
        </Row>

        <Row justify="center" gutter={16} className="mt-3">
          {users
            .filter((obj) =>
              obj.username.toLowerCase().includes(searchKey.toLowerCase())
            )
            .map((user) => {
              return (
                <>
                  {currentUser._id !== user._id && (
                    <Col lg={5} xs={24} className="text-left">
                      <div className="bs1 p-2 mt-3">
                        {user.profilePicture === "" &&
                        user.profilePicture !== null ? (
                          <p className="profilepic2 ">{user.username[0]}</p>
                        ) : (
                          <img
                            src={user.profilePicture}
                            alt=""
                            height="60"
                            width="60"
                            style={{ borderRadius: "50%" }}
                          />
                        )}

                        <div>
                          <Link to={`/profile/${user._id}`}>
                            {user.username}
                          </Link>
                        </div>

                        <p>{moment(user.createdAt).format("MMM DD yyyy")}</p>
                        {user.followers.find(
                          (obj) => obj == currentUser._id
                        ) ? (
                          <div className="d-flex">
                            <Button icon={<CheckOutlined />}>Following</Button>
                            <Button
                              className="ml-2"
                              onClick={() => {
                                dispatch(
                                  unfollowUser({
                                    currentuserid: currentUser._id,
                                    receiveruserid: user._id,
                                  })
                                );
                              }}
                            >
                              UnFollow
                            </Button>
                          </div>
                        ) : (
                          <Button
                            icon={<UserAddOutlined />}
                            onClick={() => {
                              dispatch(
                                followUser({
                                  currentuserid: currentUser._id,
                                  receiveruserid: user._id,
                                })
                              );
                            }}
                          >
                            Follow
                          </Button>
                        )}
                      </div>
                    </Col>
                  )}
                </>
              );
            })}
        </Row>
      </div>
    </DefaultLayout>
  );
}

export default AllUsers;
