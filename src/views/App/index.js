import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Layout, Menu } from "antd";
import AppBody from "./AppBody";
import logoEquiz from "../../assets/logoEQuiz.png";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { ROUTES_PATH, ROLE_TYPE } from "../../common/Constants";
import "./App.scss";
import UserMenu from "../../common/components/UserMenu";
import {
  HomeOutlined,
  BookOutlined,
  AppstoreOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  ImportOutlined,
} from "@ant-design/icons";
import CreateMenu from "../../common/components/CreateMenu";
import CreateClassroomModal from "../../common/components/modals/CreateClassroomModal";
import Join2Classroom from "../../common/components/modals/Join2Classroom";
import CreateQuestionModal from "../../common/components/modals/CreateQuestionModal";

export const App = (props) => {
  const { currentUser } = props;
  const { Sider, Header, Content } = Layout;

  const [currentMenu, setCurrentMenu] = useState("");

  const menus = [
    {
      key: "classrooms",
      title: "Quản lý lớp học",
      icon: <HomeOutlined />,
      path: ROUTES_PATH.CLASSROOMS,
    },
    {
      key: "activities",
      title: "Quản lý hoạt động",
      icon: <AppstoreOutlined />,
      path: ROUTES_PATH.ACTIVITIES,
    },
    {
      key: "questions",
      title: "Quản lý câu hỏi",
      icon: <BookOutlined />,
      path: ROUTES_PATH.QUESTIONS,
    },
    // {
    //   key: "documents",
    //   title: "Tài liệu",
    //   icon: <FileSearchOutlined />,
    //   path: ROUTES_PATH.DOCUMENTS,
    // },
    // {
    //   key: "calendar",
    //   title: "Lịch",
    //   icon: <CalendarOutlined />,
    //   path: ROUTES_PATH.CALENDAR,
    // },
    {
      key: "import",
      title: "Nhập dữ liệu",
      icon: <ImportOutlined />,
      path: ROUTES_PATH.IMPORT,
    },
  ];
  const menusStudent = [
    {
      key: "classrooms",
      title: "Lớp học của tôi",
      icon: <HomeOutlined />,
      path: ROUTES_PATH.CLASSROOMS,
    },
    {
      key: "activities",
      title: "Luyện tập ngay",
      icon: <AppstoreOutlined />,
      path: `${ROUTES_PATH.ACTIVITIES}/practice`,
    },
    {
      key: "history",
      title: "Lịch sử học tập",
      icon: <ClockCircleOutlined />,
      path: `${ROUTES_PATH.ACTIVITIES}/history`,
    },
    // {
    //   key: "calendar",
    //   title: "Lịch",
    //   icon: <CalendarOutlined />,
    //   path: ROUTES_PATH.CALENDAR,
    // },
  ];
  return (
    <Router>
      <Layout>
        <Header className="header-app">
          <img src={logoEquiz} height={64} />
          <div className="header-right">
            <CreateMenu />

            <UserMenu />
          </div>
        </Header>
        <Layout className="body">
          <Sider
            className="sider"
            defaultCollapsed={true}
            collapsible
            theme="light"
          >
            <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={[currentMenu]}
            >
              {currentUser.userType === ROLE_TYPE.TEACHER
                ? menus.map((e) => (
                    <Menu.Item key={e.key} icon={e.icon}>
                      <Link to={e.path}>{e.title}</Link>
                    </Menu.Item>
                  ))
                : menusStudent.map((e) => (
                    <Menu.Item key={e.key} icon={e.icon}>
                      <Link to={e.path}>{e.title}</Link>
                    </Menu.Item>
                  ))}
            </Menu>
          </Sider>
          <Content className="container">
            <AppBody />

            {/* common modal here */}
            <CreateClassroomModal />
            <CreateQuestionModal />
            <Join2Classroom />
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
