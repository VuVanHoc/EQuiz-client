import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Layout, Menu } from "antd";
import AppBody from "./AppBody";
import logoEquiz from "../../assets/logoEQuiz.png";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { ROUTES_PATH } from "../../common/Constants";
import "./App.scss";
import UserMenu from "../../common/components/UserMenu";
import {
  HomeOutlined,
  BookOutlined,
  AppstoreOutlined,
  CalendarOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import CreateMenu from "../../common/components/CreateMenu";

export const App = (props) => {
  const { currentUser } = props;
  const { Sider, Header, Content } = Layout;

  const [currentMenu, setCurrentMenu] = useState("classrooms");

  useEffect(() => {
    setCurrentMenu(window.location.pathname.slice(1));
    console.log("IOIO:" + window.location.pathname.slice(1) + "--");
  }, [currentUser]);

  return (
    <Router>
      <Layout>
        <Header className="header">
          <img src={logoEquiz} height={64} />
          <div className="header-right">
            <CreateMenu />
            <UserMenu />
          </div>
        </Header>
        <Layout className="body">
          <Sider className="sider" collapsible theme="light">
            <Menu theme="light" mode="inline">
              <Menu.Item key="classrooms" icon={<HomeOutlined />}>
                <Link to={ROUTES_PATH.CLASSROOMS}>Quản lý lớp học</Link>
              </Menu.Item>
              <Menu.Item key="activities" icon={<AppstoreOutlined />}>
                <Link to={ROUTES_PATH.ACTIVITIES}>Quản lý hoạt động</Link>
              </Menu.Item>
              <Menu.Item key="questions" icon={<BookOutlined />}>
                <Link to={ROUTES_PATH.QUESTIONS}>Quản lý câu hỏi</Link>
              </Menu.Item>
              <Menu.Item key="documents" icon={<FileSearchOutlined />}>
                <Link to={ROUTES_PATH.DOCUMENTS}>Tài liệu</Link>
              </Menu.Item>
              <Menu.Item key="calendar" icon={<CalendarOutlined />}>
                <Link to={ROUTES_PATH.CALENDAR}>Lịch</Link>
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

const mapStateToProps = (state) => ({
  currentUser: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
