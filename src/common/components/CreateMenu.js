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
  const joinToClassroom = () => {};
  const menu = (
    <Menu>
      {currentUser?.userType === ROLE_TYPE.TEACHER ? (
        <>
          <Menu.Item icon={<HomeOutlined />} onClick={createClassroom}>
            Thêm lớp học
          </Menu.Item>
          <Menu.Item icon={<AppstoreOutlined />}>Thêm hoạt động</Menu.Item>
          <Menu.Item icon={<QuestionCircleOutlined />}>Thêm câu hỏi</Menu.Item>
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
