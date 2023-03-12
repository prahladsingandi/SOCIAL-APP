import React from "react";
import { Row, Form, Input, Button, Col } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/actions/userActions";

function Login() {
  const dispatch = useDispatch();
  function login(values) {
    console.log(values);
    dispatch(userLogin(values));
  }
  return (
    <div className="login-main-div">
      <Row justify="center" className="register-div align-items-center">
        <Col lg={5} sx={24} xs={24}>
          <h1 className="left-title "> Social</h1>
        </Col>

        <Col lg={10} xs={24}>
          <Form layout="vertical" className="bs1 p-3 ml-5 mr-5 " onFinish={login}>
            <h3>User Login</h3>
            <hr />
            <Form.Item
              label="username"
              name="username"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="password"
              name="password"
              rules={[{ required: true }]}
            >
              <Input type='password'/>
            </Form.Item>

            <div className="text-left">
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </div>
            <Link to="/register">
              Not yet registered ? click here to register
            </Link>
          </Form>
        </Col>
        <Col lg={5} sx={24} xs={24}>
          <h1 className="right-title"> App</h1>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
