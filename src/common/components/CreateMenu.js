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
import { ROLE_TYPE } from "../Constants";

export const CreateMenu = (props) => {
  const { currentUser } = props;

  const createClassroom = () => {
    props.setVisibleModal("createClassroom", true);
  };
  const createActivity = () => {
    props.setVisibleModal("createActivity", true);
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
            Thêm lớp học
          </Menu.Item>
          <Menu.Item icon={<AppstoreOutlined />} onClick={createActivity}>
            Thêm hoạt động
          </Menu.Item>
          <Menu.Item icon={<QuestionCircleOutlined />} onClick={createQuestion}>
            Thêm câu hỏi
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateMenu);
