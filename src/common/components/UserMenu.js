import React from "react";
import { connect } from "react-redux";
import { Avatar, Menu, Dropdown, Badge } from "antd";
import {
  PoweroffOutlined,
  UserOutlined,
  SettingOutlined,
  BellOutlined,
} from "@ant-design/icons";
import "../styles/common.scss";
import { ROUTES_PATH } from "../Constants";
import { requestLogout } from "../../store/auth/actions";
import { withRouter } from "react-router-dom";

function UserMenu(props) {
  const { currentUser } = props;

  const requestLogout = () => {
    props.requestLogout();
  };
  const gotoPage = (to) => {
    props.history.push(to);
  };
  const menu = (
    <Menu>
      <Menu.Item
        icon={<UserOutlined />}
        onClick={() => gotoPage(ROUTES_PATH.PROFILE)}
      >
        Thông tin cá nhân
      </Menu.Item>
      <Menu.Item
        icon={<BellOutlined />}
        onClick={() => gotoPage(ROUTES_PATH.NOTIFICATIONS)}
      >
        Thông báo
      </Menu.Item>
      <Menu.Item
        icon={<SettingOutlined />}
        onClick={() => gotoPage(ROUTES_PATH.SETTINGS)}
      >
        Cài đặt
      </Menu.Item>
      <Menu.Item icon={<PoweroffOutlined />} onClick={requestLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu} trigger="click">
      <div style={{ cursor: "pointer", marginRight: "1em" }}>
        <Avatar
          icon={<UserOutlined />}
          src={currentUser?.avatar}
          style={{ backgroundColor: currentUser?.defaultColor }}
        ></Avatar>
        <span className="display-name">{currentUser?.fullName}</span>
      </div>
    </Dropdown>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.user,
});

const mapDispatchToProps = {
  requestLogout,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserMenu)
);
