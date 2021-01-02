import React from "react";
import PropTypes from "prop-types";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ManageUser from "../pages/ManageUser/ManageUser";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

MainLayout.propTypes = {};

function MainLayout(props) {
  const [collapsed, setCollapsed] = React.useState(false);
  const onCollapse = (collapsed) => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" >CARO ONLINE</div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<TeamOutlined />}>
            Player Management
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Match Management 
          </Menu.Item>
         
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0, backgroundColor: '#89bbff' }} ><h2 style={{paddingLeft: '40px'}}>Player Management</h2></Header>
        <Content style={{ margin: "0 16px", backgroundColor: 'white', marginTop: '20px' }}>
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <ManageUser/>
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
