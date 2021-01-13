import React from "react";
import PropTypes from "prop-types";
import { Layout, Menu, Breadcrumb, Button } from "antd";
import { useHistory } from "react-router-dom";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ManageUser from "../pages/ManageUser/ManageUser";
import "./MainLayout.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import MatchManagement from "../pages/MatchManagement/MatchManagement";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

MainLayout.propTypes = {};

function MainLayout(props) {
  const [collapsed, setCollapsed] = React.useState(false);
  const onCollapse = (collapsed) => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };
  const [menuActive, setMenuActive] = React.useState(1);
  const menu = [
    {
      key: 1,
      text: "Player Management",
      path: "/admin/user-management",
      icon: <TeamOutlined />,
    },
    {
      key: 2,
      text: "Match Management",
      path: "/admin/match-management",
      icon: <DesktopOutlined />,
    },
  ];

  const handleClick = (e) => {
    console.log("click ", e);
    setMenuActive(e.key);
    // switch (e.key) {
    //   case '1':
    //     history.push("/admin/user-management");
    //     // <Link to="/manage-user" />;
    //     break;
    //   case '2':
    //     history.push('admin/match-management');
    //     // <Link to="/match-management" />;
    //     break;
    //   default:
    //     break;
    // }
  };
  const Signout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
  console.log(props.menu);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo">CARO ONLINE</div>
        <Menu
          theme="dark"
          defaultSelectedKeys={[`${menuActive}`]}
          mode="inline"
          onClick={handleClick}
        >
          {menu.map((menu) => (
          <Menu.Item key={menu.key} icon={menu.icon}>
            <Link to= {menu.path}>{menu.text}</Link>
              
            </Menu.Item>
          ))}
        
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, backgroundColor: "#1890ff" }}
        >
          <h2
            className="header-content"
            style={{
              paddingLeft: "16px",
              color: "white",
            }}
          >
            {menu[menuActive-1].text}
            <Button type="text" onClick={() => Signout()}>
          Sign out
        </Button>
          </h2>
        </Header>
        <Content
          style={{
            margin: "0 16px",
            backgroundColor: "white",
            marginTop: "20px",
          }}
        >
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {props.children}
            {/* <Route exact path="/manage-user">
              <ManageUser />
            </Route>
            <Route exact path="/match-management">
              <MatchManagement />
            </Route> */}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
