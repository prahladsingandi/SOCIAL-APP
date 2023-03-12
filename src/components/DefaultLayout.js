import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  PlusOutlined,
  UsergroupAddOutlined,
  InfoCircleOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import MenuItem from "antd/lib/menu/MenuItem";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./defaultlayout.css";
const { Header, Sider, Content } = Layout;

const DefaultLayout = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Layout>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            position: "sticky",
            top: 0,
            width: "100%",
            left: 0,
            zIndex: 9999,
          }}
        >
          <div className="d-flex justify-content-between align-items-center bs1">
            <div className="d-flex align-items-center">
              <div className="ml-1">
                {user.profilePicture === "" ? (
                  <span className="profilepic1 d-flex align-items-center">
                    {user.username[0]}
                  </span>
                ) : (
                  <img
                    src={user.profilePicture}
                    alt=""
                    height="35"
                    width="35"
                    style={{ borderRadius: "50%" }}
                  />
                )}
              </div>

              <h4 className="pt-3 pl-1">
                {JSON.parse(localStorage.getItem("user")).username
                  ? JSON.parse(localStorage.getItem("user")).username
                  : "abc"}
              </h4>
            </div>

            <h2 className="logotext pt-1 mt-1">
              <b>Social App</b>
            </h2>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </div>
        </Header>
        <Content className="site-layout-background" style={{}}>
          {props.children}
        </Content>
      </Layout>

      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          position: "sticky",
          top: 0,
          bottom: 0,
          overflow: "auto",
          height: "100vh",
        }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[window.location.pathname]}
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/addpost" icon={<PlusOutlined />}>
            <Link to="/addpost">Add Post</Link>
          </Menu.Item>
          <Menu.Item key={`/profile/${user._id}`} icon={<UserOutlined />}>
            <Link to={`/profile/${user._id}`}>Profile</Link>
          </Menu.Item>

          <Menu.Item key="/allusers" icon={<UsergroupAddOutlined />}>
            <Link to="/allusers">All Users</Link>
          </Menu.Item>

          <Menu.Item key="/about" icon={<InfoCircleOutlined />}>
            <Link to="/about">About app</Link>
          </Menu.Item>

          <Menu.Item icon={<LogoutOutlined />}>
            <Link
              onClick={() => {
                localStorage.removeItem("user", window.location.reload());
              }}
            >
              Logout
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  );
};
export default DefaultLayout;
