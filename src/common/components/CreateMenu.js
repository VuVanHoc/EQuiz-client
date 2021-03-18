import { Dropdown, Menu } from "antd";
import React from "react";
import { connect } from "react-redux";
import {
  PlusOutlined,
  HomeOutlined,
  AppstoreOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { setVisibleModal } from "../../store/common/actions";
import { ROLE_TYPE, ROUTES_PATH } from "../Constants";
import { withRouter } from "react-router-dom";

export const CreateMenu = (props) => {
  const { currentUser } = props;

  const createClassroom = () => {
    props.setVisibleModal("createClassroom", true);
  };
  const createActivity = () => {
    props.history.push(`${ROUTES_PATH.ACTIVITIES}/create-activity`);
  };
  const createQuestion = () => {
    props.setVisibleModal("createQuestion", true);
  };
  const joinToClassroom = () => {
    props.setVisibleModal("join2Classroom", true);
  };

  const menu = (
    <Menu>
      {currentUser?.userType === ROLE_TYPE.TEACHER ? (
        <>
          <Menu.Item icon={<HomeOutlined />} onClick={createClassroom}>
            Tạo lớp học
          </Menu.Item>
          <Menu.Item icon={<AppstoreOutlined />} onClick={createActivity}>
            Tạo hoạt động
          </Menu.Item>
          <Menu.Item icon={<QuestionCircleOutlined />} onClick={createQuestion}>
            Tạo câu hỏi
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item icon={<HomeOutlined />} onClick={joinToClassroom}>
            Tham gia lớp học
          </Menu.Item>
        </>
      )}
    </Menu>
  );
  return (
    <Dropdown trigger="click" overlay={menu} placement="topRight" arrow>
      <PlusOutlined className="icon" />
    </Dropdown>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth.user,
});

const mapDispatchToProps = {
  setVisibleModal,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateMenu)
);
