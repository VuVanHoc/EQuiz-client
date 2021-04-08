import React from "react";
import { Select } from "antd";

function SubjectDropdown(props) {
  const subjects = [
    { text: "Nhiều chủ đề", value: "ALL" },
    { text: "Tiếng Anh", value: "ENGLISH" },
    { text: "Toán học", value: "MATH" },
  ];
  return (
    <Select {...props} placeholder="Lựa chọn chủ đề">
      {subjects.map((type, index) => {
        return (
          <Select.Option value={type.value} key={index}>
            {type.text}
          </Select.Option>
        );
      })}
    </Select>
  );
}

export default SubjectDropdown;
