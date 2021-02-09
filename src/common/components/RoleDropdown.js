import React from "react";
import { Select } from "antd";
import { ROLE_TYPE } from "../Constants";
function RoleDropdown(props) {
  const menu = {};
  const { Option } = Select;
  return (
    <Select {...props}>
      <Option value={ROLE_TYPE.TEACHER}>Giáo viên</Option>
      <Option value={ROLE_TYPE.STUDENT}>Học sinh</Option>
    </Select>
  );
}

export default RoleDropdown;
