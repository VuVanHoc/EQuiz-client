import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { Layout, Menu } from "antd";
import AppBody from "./AppBody";
import logoEquiz from "../../assets/logoEQuiz.png";
import { Link, BrowserRouter as Router } from "react-router-dom";
import history from "../../utils/history";

import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

export const index = () => {
  const { Sider, Header, Content } = Layout;

  const [collapsed, setCollapsed] = useState(false);
  return (
    <Router history={history}>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div>
            <img src={logoEquiz} height={64} />
          </div>
          <Menu theme="light" mode="inline">
            <Menu.Item key="classroom">
              <Link to="/classrooms">Quản lý lớp học</Link>
            </Menu.Item>
            <Menu.Item key="questions">
              <Link to="/questions">Quản lý câu hỏi</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header>
            {collapsed ? (
              <MenuUnfoldOutlined color="#fff" />
            ) : (
              <MenuFoldOutlined color="#fff" />
            )}
          </Header>
          <Content>
            <AppBody />
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
