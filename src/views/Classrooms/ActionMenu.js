import { Menu, Dropdown } from "antd";
import React from "react";
import { connect } from "react-redux";
import { MoreOutlined, EditTwoTone, DeleteTwoTone } from "@ant-design/icons";

const ActionMenu = (props) => {
  const menu = (
    <Menu>
      <Menu.Item icon={<EditTwoTone twoToneColor="#6AC3E8" />}>
        Cập nhật
      </Menu.Item>
      <Menu.Item icon={<DeleteTwoTone twoToneColor="red" />}>Xoá</Menu.Item>
    </Menu>
  );
  return (
    <Dropdown trigger="click" overlay={menu}>
      <MoreOutlined />
    </Dropdown>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ActionMenu);
