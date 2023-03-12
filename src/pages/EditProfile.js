import React, { useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { editUser } from "../redux/actions/userActions";

function EditProfile() {
  //const { users } = useSelector(state => state.usersReducer)
  const { posts } = useSelector((state) => state.postReducers);

  const user = JSON.parse(localStorage.getItem("user"));
  const [profilePicUrl, setProfilePicUrl] = useState(user.profilePicture);
  const dispatch = useDispatch();

  function handleFileInput(e) {
    const file = e.target.files[0];
    const reader = new FileReader(file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfilePicUrl(reader.result);
    };
  }

  function edit(values){
    values.profilePicture = profilePicUrl
    values._id = user._id
    console.log(values);
    dispatch(editUser(values))
  }
  return (
    <DefaultLayout>
      <Row justify="center mt-5">
        <Col className="mt-5" lg={10} sm = {24} xs={24}>
          <div>
            <Form layout="vertical" initialValues={user} className="p-2 bs1" onFinish={edit}>
                <h1>Edit Profile</h1>
              <Form.Item name="username" label="Username">
                <Input />
              </Form.Item>

              <Form.Item name="bio" label="Bio">
                <Input />
              </Form.Item>

              <Form.Item name="profilePicture" label="Profile Pic">
                <div className="d-flex align-items-center">
                  {profilePicUrl === "" && profilePicUrl !== null ? (
                    <p className="profilepic2 ">{user.username[0]}</p>
                  ) : (
                    <img src={profilePicUrl} height="60" width="60" />
                  )}
                  <Input type="file" onChange={handleFileInput} />
                </div>
              </Form.Item>
              <Form.Item name="privateAccount">
                <Select>
                  <Select.Option value={true}>Private</Select.Option>
                  <Select.Option value={false}>Public</Select.Option>
                </Select>
              </Form.Item>
              <Button htmlType="submit">Edit</Button>
            </Form>
          </div>
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default EditProfile;
