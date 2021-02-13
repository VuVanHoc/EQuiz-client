import React from "react";
import { connect } from "react-redux";
import { Avatar, Menu, Dropdown } from "antd";
import { Link } from "react-router-dom";
import {
  LogoutOutlined,
  UserOutlined,
  SettingOutlined,
  BellOutlined,
} from "@ant-design/icons";
import "../styles/common.scss";
import { ROUTES_PATH } from "../Constants";
import { requestLogout } from "../../store/auth/actions";

function UserMenu(props) {
  const { currentUser } = props;

  const requestLogout = () => {
    props.requestLogout();
  };
  const menu = (
    <Menu>
      <Menu.Item icon={<UserOutlined />}>
        <Link to={ROUTES_PATH.MY_PROFILE}>Thông tin cá nhân</Link>
      </Menu.Item>
      <Menu.Item icon={<BellOutlined />}>
        <Link to={ROUTES_PATH.NOTIFICATIONS}>Thông báo</Link>
      </Menu.Item>
      <Menu.Item icon={<SettingOutlined />}>
        <Link to={ROUTES_PATH.SETTINGS}>Cài đặt</Link>
      </Menu.Item>
      <Menu.Item icon={<LogoutOutlined />} onClick={requestLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );
  return (
    <Menu>
      <Dropdown overlay={menu}>
        <div style={{ cursor: "pointer", marginRight: 8 }}>
          <Avatar
            icon={<UserOutlined />}
            src={currentUser?.avatar}
            style={{ backgroundColor: currentUser?.defaultColor }}
          ></Avatar>
          <span className="display-name">{currentUser?.fullName}</span>
        </div>
      </Dropdown>
    </Menu>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.user,
});

const mapDispatchToProps = {
  requestLogout,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
