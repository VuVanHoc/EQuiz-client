import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Layout, Menu, Badge } from "antd";
import AppBody from "./AppBody";
import logoEquiz from "../../assets/logoEQuiz.png";
import { Link, BrowserRouter as Router } from "react-router-dom";
import history from "../../utils/history";
import { ROUTES_PATH } from "../../common/Constants";
import "./App.scss";
import UserMenu from "../../common/components/UserMenu";
import { HomeOutlined } from "@ant-design/icons";
export const index = () => {
  const { Sider, Header, Content } = Layout;

  const [collapsed, setCollapsed] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("");

  useEffect(() => {
    setCurrentMenu(window.location.pathname.slice(1));
  }, []);
  return (
    <Router history={history}>
      <Layout>
        <Header className="header">
          <img src={logoEquiz} height={64} />
          <div className="header-right">
            {/* <BellOutlined className="icon" /> */}
            <UserMenu />
          </div>
        </Header>
        <Layout>
          <Sider className="sider" collapsible theme="light">
            <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={[currentMenu]}
            >
              <Menu.Item key="classrooms" icon={<HomeOutlined />}>
                <Link to={ROUTES_PATH.CLASSROOMS}>Quản lý lớp học</Link>
              </Menu.Item>
              <Menu.Item key="questions">
                <Link to={ROUTES_PATH.QUESTIONS}>Quản lý câu hỏi</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content className="container">
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
